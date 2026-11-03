/* Outil « Voir en 3D » du plancher PRO-DD-ST-003 : un seul écran, la 3D en
   haut (tourner à un doigt, zoomer à deux doigts), le panneau de l'étape en
   bas (en paysage : à droite). À chaque étape, les pièces des étapes
   précédentes sont en place, celles de l'étape se posent une à une en
   contour rouge, la caméra se place et les étiquettes de l'étape
   s'affichent.
   Module chargé à la demande par app.js (route #/3d/pro-dd-st-003). Tout est
   servi depuis le site (three.js dans vendor/three) : le service worker le
   garde sur l'appareil dès le premier affichage (cache persistant des
   médias). Le .glb et les étiquettes portent leur propre ?v= : le changer
   seulement quand on réexporte le modèle (2,5 Mo à re-télécharger). */
import * as THREE from '../vendor/three/three.module.min.js';
import { GLTFLoader } from '../vendor/three/GLTFLoader.js';
import { OrbitControls } from '../vendor/three/OrbitControls.js';
import { RoomEnvironment } from '../vendor/three/RoomEnvironment.js';
import { LineSegments2 } from '../vendor/three/LineSegments2.js';
import { LineSegmentsGeometry } from '../vendor/three/LineSegmentsGeometry.js';
import { LineMaterial } from '../vendor/three/LineMaterial.js';
// Textes et cadrages : même numéro de version que ce module (app.js le charge
// avec le ?v= du site), pour qu'une correction de texte arrive avec le déploiement.
const V = new URL(import.meta.url).searchParams.get('v') || '0';
const { ETAPES } = await import('./etapes.js?v=' + V);

const MODELE = 'plancher.glb?v=24';
const ETIQUETTES = 'plancher-etiquettes.json?v=24';
// Foreuse STM-1500 allégée (pieces-3d : scripts/export-stm-app.mjs), posée sur le plancher ;
// chargée seulement à l'écran qui la montre (étape 18), puis gardée.
const FOREUSE = 'stm1500.glb?v=6';
let foreuse = null;
function chargerForeuse() {
  if (!foreuse) foreuse = new Promise((resolve, reject) => {
    new GLTFLoader().load(new URL(FOREUSE, base).href, (g) => resolve(g.scene), undefined, reject);
  });
  return foreuse;
}
const FOV = 42;
const CLE = 'p3d_etape';           // dernière étape vue, reprise à la réouverture
const TOTAL = Math.max(...ETAPES.map((e) => e.n));   // étapes numérotées (sans « Avant de commencer » ni la variante)
// Clé des étiquettes d'un écran : son numéro, ou 'v8' pour l'écran de la variante 8 pi.
const cleDe = (e) => (e.variante ? 'v8' : e.groupe || e.n);

let charge = null;                 // { scene, etiquettes } gardés entre deux ouvertures

const base = new URL('./', import.meta.url);

function chargerModele(onProgress) {
  if (charge) return Promise.resolve(charge);
  const gltf = new Promise((resolve, reject) => {
    new GLTFLoader().load(new URL(MODELE, base).href, resolve, (e) => {
      if (e.lengthComputable) onProgress(e.loaded / e.total);
    }, reject);
  });
  const lab = fetch(new URL(ETIQUETTES, base).href).then((r) => {
    if (!r.ok) throw new Error('étiquettes ' + r.status);
    return r.json();
  });
  return Promise.all([gltf, lab]).then(([g, etiquettes]) => {
    charge = { scene: g.scene, etiquettes };
    preparer(g.scene);
    return charge;
  });
}

/* Repère les pièces d'étape (extras s), les objets propres à une étape
   (extras o : outils, laser, cotes) et les cotes (extras d, dessinées
   par-dessus la scène). Ordre de pose : seq, puis le long du plancher, en
   travers, de bas en haut (comme le montage du site pieces-3d).
   Variante 6 × 6 de 8 pi : pièces v8 (ordre de pose), affichées seulement sur
   l'écran de la variante, où les pièces de 16 pi remplacées (x8) et les
   planches (pl) sont enlevées pour voir la structure. */
function preparer(root) {
  const pieces = [], seules = [], v8 = [], cas = [];
  root.updateMatrixWorld(true);
  const box = new THREE.Box3(), c = new THREE.Vector3();
  root.traverse((o) => {
    const u = o.userData || {};
    if (u.o) seules.push(o);
    else if (u.v8) { u.cible = o.position.clone(); v8.push(o); }
    else if (u.grp) { u.cible = o.position.clone(); cas.push(o); }
    else if (u.s !== undefined) {
      box.setFromObject(o).getCenter(c);
      u.centre = c.toArray();
      u.cible = o.position.clone();
      pieces.push(o);
    }
    if (u.d) {
      o.traverse((m) => {
        if (!m.isMesh) return;
        m.material = m.material.clone();
        m.material.depthTest = false;
        m.material.depthWrite = false;
        m.material.transparent = true;
        m.renderOrder = 1000;
      });
    }
    if (o.isMesh && o.material && /^wood/.test(o.material.name)) o.material.envMapIntensity = 0.45;
  });
  const cle = (o) => [o.userData.q || 0, o.userData.centre[0], o.userData.centre[2], o.userData.centre[1]];
  pieces.sort((a, b) => {
    const ka = cle(a), kb = cle(b);
    for (let i = 0; i < 4; i++) if (Math.abs(ka[i] - kb[i]) > 1e-3) return ka[i] - kb[i];
    return 0;
  });
  root.userData.pieces = pieces;
  root.userData.seules = seules;
  root.userData.v8 = v8.sort((a, b) => a.userData.v8 - b.userData.v8);
  root.userData.cas = cas;
  preparerMarches(root, pieces, cas);
  // Serrage des planches (étape 7) : planches de la section 1 par rang de pose,
  // coins de serrage, tire-fonds de la planche devant les coins, et une copie de
  // ces tire-fonds pour le dernier 3 × 8 (vissé le temps du serrage).
  const planches = [];
  for (const o of pieces) if (o.userData.ord !== undefined) planches[o.userData.ord] = o;
  const coins = seules.find((o) => !o.userData.d && o.userData.o.length === 1 && o.userData.o[0] === SERRAGE.etape);
  const visT = pieces.find((o) => o.userData.s === SERRAGE.etape);
  if (planches[SERRAGE.ancre] && coins && visT) {
    if (!coins.userData.cible) coins.userData.cible = coins.position.clone();
    const visA = visT.clone();
    visA.userData = {};
    visA.position.x += planches[SERRAGE.ancre].userData.cible.x - planches[SERRAGE.tension].userData.cible.x;
    visA.visible = false;
    root.add(visA);
    root.userData.serrage = { planches, coins, visT, visA, visA0: visA.position.clone() };
    // Étape 12 : la section 2 est posée du bout vers le centre sans être serrée ; au centre, la
    // planche libre contre la section 1 (déjà serrée à l'étape 7) est vissée le temps du serrage
    // (copie des tire-fonds de l'étape 7) ; les coins enfoncés entre elle et la section 2
    // resserrent la section 2 vers le bout du plancher ; l'autre planche libre entre ensuite.
    const libres = pieces.filter((o) => o.userData.s === 12 && o.userData.pl && o.userData.q === 1)
      .sort((a, b) => a.userData.centre[0] - b.userData.centre[0]);   // [contre la section 1, contre la section 2]
    const vis12 = pieces.find((o) => o.userData.s === 12 && o.userData.q === 2);
    if (libres.length === 2 && vis12) {
      const c12 = coins.clone();
      const bc = new THREE.Box3().setFromObject(coins).getCenter(new THREE.Vector3());
      c12.userData = { cible: coins.userData.cible.clone(), dx: bc.x - coins.position.x };
      c12.visible = false;
      root.add(c12);
      const vA = visT.clone();
      vA.userData = {};
      vA.position.x += libres[0].userData.cible.x - planches[SERRAGE.tension].userData.cible.x;
      vA.visible = false;
      root.add(vA);
      root.userData.serrage12 = { libres, coins: c12, visA: vA, visA0: vA.position.clone(), vis: vis12 };
    }
  }
}

/* Écran des cas de marches (2, 3 ou 4) : l'escalier de chaque cas est posé au bout du vrai
   plancher. Le plancher ne bouge pas ; c'est la profondeur du sol sous le plancher qui change
   (sol de la galerie creusé sous le dessous des madriers, y = 0), pour que le dessus du
   plancher soit à n × 9 po du sol aux marches. À l'entrée, où les madriers sont presque au
   sol, rien ne change. Les appuis de chaque cas (extras ap) sont montés par pieces-3d sur ce
   sol, selon les règles du montage (blocages, 6 × 6, coins) : ils remplacent les vrais appuis. */
const MARCHE = 9 * 0.0254;
function preparerMarches(root, pieces, cas) {
  const m = cas.filter((o) => o.userData.grp === 'marches' && !o.userData.ap);
  if (!m.length) return;
  const box = new THREE.Box3();
  let sol = Infinity, xL = Infinity;
  for (const o of m) { box.setFromObject(o); sol = Math.min(sol, box.min.y); xL = Math.min(xL, box.min.x); }
  // Appuis du plancher (sous les madriers) et vraies marches (étape 14, cachées sur cet écran).
  const appuis = [];
  for (const o of pieces) {
    box.setFromObject(o);
    if (o.userData.s >= 1 && o.userData.s <= 14 && box.max.y <= 0.003) appuis.push(o);
    if (o.userData.s === 14 && o.userData.centre[0] > xL - 0.02) o.userData.esc = true;
  }
  // Sol et parois de la galerie (maillages « rock » du décor) : sommets sous y = 0 étirés ;
  // le reste du décor (barricade, armoire…) suit le sol sous lui.
  const coques = [], decor = [];
  root.traverse((o) => {
    if (!o.isMesh) return;
    for (let q = o; q && q !== root; q = q.parent) { const u = q.userData || {}; if ((u.s !== undefined && u.s > 0) || u.o || u.v8 || u.grp) return; }
    box.setFromObject(o);
    if (/^rock/.test(o.material.name) && o.geometry.attributes.position.count > 1000) {
      o.geometry = o.geometry.clone();
      coques.push({ o, y0: Float32Array.from(o.geometry.attributes.position.array) });
    } else if (box.min.y < 0.05) decor.push({ o, y: o.position.y, bas: Math.min(0, box.min.y) });
  });
  root.userData.marches = { sol, xL, appuis, coques, decor, f: 1 };
}
/** Profondeur du sol multipliée par f (1 : le vrai sol). */
function profondeur(root, f) {
  const M = root.userData.marches;
  if (!M || Math.abs(M.f - f) < 1e-6) return;
  M.f = f;
  for (const { o, y0 } of M.coques) {
    const a = o.geometry.attributes.position, e = o.matrixWorld.elements, sy = e[5], ty = e[13];
    for (let i = 1; i < y0.length; i += 3) {
      const yw = y0[i] * sy + ty;
      a.array[i] = yw < 0 ? (yw * f - ty) / sy : y0[i];
    }
    a.needsUpdate = true;
    o.geometry.computeVertexNormals();
    o.geometry.computeBoundingSphere();
  }
  for (const d of M.decor) d.o.position.y = d.y + (f - 1) * d.bas;
}

/* Serrage des planches (étape 7), comme la vidéo de formation : les planches 1
   à 10 sont posées avec un petit écart. Comme en vrai, le serrage les déplace
   de 1 po au plus au total (0,1 po par joint, ecart en mètres). Le dernier
   3 × 8 (rang 11) est posé plus loin et vissé ; les coins enfoncés entre lui et la
   planche 10 ferment les écarts vers la première planche (vissée) ; la planche
   devant les coins est vissée ; les tire-fonds du dernier 3 × 8 sont retirés, les
   coins enlevés, et il reprend sa place ; puis la pose continue. Instants en s. */
const SERRAGE = {
  etape: 7, tension: 10, ancre: 11, sens: -1, ecart: 0.1 * 0.0254, place: 0.05, P8: 8 * 0.0254,
  t: { ancre: [0, 0.5], visA: [1.0, 1.4], coins: [1.8, 2.3], serre: [2.6, 4.6], visT: [5.0, 5.4],
    devisse: [6.6, 7.2], sortie: [7.4, 7.9], retour: [7.8, 8.5], suite: 8.8 },
  duree: 11,
};
const lisse = (k) => k * k * (3 - 2 * k);

/* Nouvelles pièces : couleur du bois gardée, contour rouge (arêtes de chaque pièce),
   en trait épais (largeur en pixels, la même de près comme de loin). */
const traitMat = new LineMaterial({ color: 0xe3262b, linewidth: 2.5 });
const aretes = new Map();   // arêtes partagées par géométrie
function surligner(obj, on) {
  obj.traverse((m) => {
    // Cotes et faisceau laser : pas de contour ; le trait lui-même est un maillage (LineSegments2).
    if (!m.isMesh || m.isLineSegments2 || m.material.isMeshBasicMaterial) return;
    let l = m.userData.trait;
    if (on && !l) {
      let g = aretes.get(m.geometry);
      if (!g) { g = new LineSegmentsGeometry().fromEdgesGeometry(new THREE.EdgesGeometry(m.geometry, 35)); aretes.set(m.geometry, g); }
      l = m.userData.trait = new LineSegments2(g, traitMat);
      l.raycast = () => {};
      m.add(l);
    }
    if (l) l.visible = on;
  });
}

const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

export function ouvrir(hote, { fermer } = {}) {
  hote.innerHTML =
    '<div class="p3d" role="dialog" aria-label="Plancher PRO-DD-ST-003 en 3D">' +
      '<div class="p3d-vue">' +
        '<canvas class="p3d-cv" aria-label="Vue 3D : tourner à un doigt, zoomer à deux doigts"></canvas>' +
        '<div class="p3d-etiq" aria-hidden="true"></div>' +
        '<button type="button" class="p3d-fermer" aria-label="Fermer la 3D"><svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg></button>' +
        '<div class="p3d-msg">Chargement de la 3D…</div>' +
        '<div class="p3d-ctl" hidden>' +
          '<button type="button" class="p3d-c p3d-recul" aria-label="Reculer de 3 secondes"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 6L4 12l7 6zM20 6l-7 6 7 6z" fill="currentColor"/></svg></button>' +
          '<button type="button" class="p3d-c p3d-jouer" aria-label="Pause"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="p3d-ic-pause" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/><path class="p3d-ic-jouer" d="M8 5l11 7-11 7z" fill="currentColor"/></svg></button>' +
          '<button type="button" class="p3d-c p3d-avance" aria-label="Avancer de 3 secondes"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 6l7 6-7 6zM4 6l7 6-7 6z" fill="currentColor"/></svg></button>' +
          '<input type="range" class="p3d-temps" min="0" max="1000" step="10" value="0" aria-label="Position dans l\'animation">' +
          '<button type="button" class="p3d-c p3d-rejouer" aria-label="Rejouer l\'animation"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a7 7 0 1 1-6.6 4.7" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M3 4.5l2.6 5.6 5.4-2.8z" fill="currentColor"/></svg></button>' +
        '</div>' +
      '</div>' +
      '<div class="p3d-pan">' +
        '<div class="p3d-prog" aria-hidden="true"><i></i></div>' +
        '<div class="p3d-num"></div>' +
        '<h2 class="p3d-t"></h2>' +
        '<p class="p3d-casn" hidden></p>' +
        '<div class="p3d-truc" hidden><b>Truc</b><p></p></div>' +
        '<ul class="p3d-x"></ul>' +
        '<p class="p3d-d"></p>' +
        '<div class="p3d-btns">' +
          '<button type="button" class="p3d-b p3d-prev">Précédente</button>' +
          '<button type="button" class="p3d-b p3d-next">Suivante</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  const $ = (s) => hote.querySelector(s);
  const vue = $('.p3d-vue'), canvas = $('.p3d-cv'), calque = $('.p3d-etiq'), msg = $('.p3d-msg');
  const bPrev = $('.p3d-prev'), bNext = $('.p3d-next');
  let fini = false;

  let i0 = 0;
  try { const v = parseInt(localStorage.getItem(CLE), 10); if (v >= 0 && v < ETAPES.length) i0 = v; } catch (e) {}
  let idx = i0;

  function panneau() {
    const e = ETAPES[idx];
    $('.p3d-prog i').style.width = (100 * e.n / TOTAL) + '%';
    $('.p3d-num').textContent = e.variante ? 'Variante' : e.groupe ? (e.etiquette || 'À savoir') : e.n === 0 ? 'Avant de commencer' : 'Étape ' + e.n + ' sur ' + TOTAL;
    $('.p3d-t').textContent = e.n === 0 ? 'Inspection et matériel de sécurité' : e.titre;
    // Texte de l'écran : une liste de points courts.
    const ul = $('.p3d-x');
    ul.replaceChildren(...[].concat(e.texte).map((t) => { const li = document.createElement('li'); li.textContent = t; return li; }));
    $('.p3d-truc p').textContent = e.truc ? e.truc.texte : '';
    $('.p3d-truc').hidden = !e.truc;
    $('.p3d-casn').hidden = true;
    $('.p3d-d').textContent = e.detail || '';
    $('.p3d-d').hidden = !e.detail;
    bPrev.disabled = idx === 0;
    bNext.disabled = idx === ETAPES.length - 1;
    $('.p3d-pan').scrollTop = 0;
  }
  panneau();

  // ------------------------------------------------------------ rendu
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d1117);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.55;
  scene.add(new THREE.HemisphereLight(0xe8eef5, 0x2a241d, 1.1));
  const soleil = new THREE.DirectionalLight(0xffffff, 1.6);
  soleil.position.set(6, 12, 8);
  scene.add(soleil);
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.05, 200);
  const lampe = new THREE.PointLight(0xffffff, 0.6, 0, 0);   // lampe frontale : le côté vu reste éclairé
  camera.add(lampe);
  scene.add(camera);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.12;
  controls.rotateSpeed = 0.7;
  controls.minDistance = 0.6;
  controls.maxDistance = 28;
  controls.maxPolarAngle = Math.PI * 0.6;
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

  let sale = true;
  const tweens = [];
  /* Horloge de l'animation (ms) : avance avec l'écran sauf en pause. Toutes les
     animations d'étape s'y règlent, ce qui permet pause, recul et retour au début. */
  let horloge = 0, dernier = null, enPause = false, sautCam = false;
  let debutEtape = 0, dureeEtape = 0;
  controls.addEventListener('change', () => { sale = true; });

  function taille() {
    const w = vue.clientWidth, h = vue.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    traitMat.resolution.set(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    sale = true;
  }
  const ro = new ResizeObserver(() => { taille(); });
  ro.observe(vue);
  taille();

  /* Cadrage : la zone (rayon r autour du point visé) entre en entier dans la
     vue, quelle que soit sa forme (portrait ou paysage). */
  function cadrage(cam) {
    const v = THREE.MathUtils.degToRad(camera.fov) / 2;
    const h = Math.atan(Math.tan(v) * camera.aspect);
    const d = cam.r / Math.sin(Math.min(v, h));
    const dir = new THREE.Vector3(...cam.dir).normalize();
    const tgt = new THREE.Vector3(...cam.tgt);
    return { pos: tgt.clone().addScaledVector(dir, d), tgt };
  }
  function allerA(cam, instant) {
    const to = cadrage(cam);
    if (instant || sautCam) {
      camera.position.copy(to.pos);
      controls.target.copy(to.tgt);
      controls.update();
      sale = true;
      return;
    }
    const p0 = camera.position.clone(), t0 = controls.target.clone();
    for (let i = tweens.length - 1; i >= 0; i--) if (tweens[i].cam) tweens.splice(i, 1);
    tweens.push({ cam: true, debut: horloge, duree: 900, pas(k) {
      const e = ease(k);
      camera.position.lerpVectors(p0, to.pos, e);
      controls.target.lerpVectors(t0, to.tgt, e);
    } });
  }

  // ------------------------------------------------------------ étiquettes
  let etiq = [];
  function creerEtiquettes(liste) {
    calque.innerHTML = '';
    etiq = liste.map((l) => {
      const el = document.createElement('div');
      el.className = 'p3d-lb ' + (l.kind === 'cote' ? 'p3d-cote' : 'p3d-note');
      el.textContent = l.text;
      calque.appendChild(el);
      return { el, pos: new THREE.Vector3(...l.pos), steps: l.steps, fen: l.fen, cas: l.cas, cle: l.cle };
    });
  }
  /* Étiquettes de l'étape posées sur leur point ; une étiquette qui en
     chevauche une autre déjà placée remonte au-dessus d'elle. */
  const pv = new THREE.Vector3();
  function placerEtiquettes() {
    const n = cleDe(ETAPES[idx]);
    let finFen = 0;
    for (const e of etiq) if (e.fen && e.steps.includes(n)) for (const [, b] of e.fen) finFen = Math.max(finFen, b);
    const w = vue.clientWidth, h = vue.clientHeight;
    const vues = [];
    for (const e of etiq) {
      let on = e.steps.includes(n);
      // Étiquette d'une phase de l'animation (fen : fenêtres [début, fin] en ms depuis
      // l'arrivée à l'étape) : affichée seulement pendant ces fenêtres.
      if (on && e.cas) on = e.cas === casCourant;
      if (on && e.fen) { const t = horloge - animT0; on = e.fen.some(([a, b]) => t >= a && t < b); }
      // Pendant une animation commentée (étiquettes à fenêtres), les autres étiquettes attendent la fin.
      else if (on && finFen) on = horloge - animT0 >= finFen;
      if (on) {
        pv.copy(e.pos).project(camera);
        on = pv.z < 1 && pv.x > -1.1 && pv.x < 1.1 && pv.y > -1.1 && pv.y < 1.1;
        if (on) vues.push({ e, x: (pv.x + 1) / 2 * w, y: (1 - pv.y) / 2 * h });
      }
      e.el.style.display = on ? '' : 'none';
    }
    vues.sort((a, b) => b.y - a.y);
    const poses = [];
    for (const v of vues) {
      const lw = v.e.el.offsetWidth, lh = v.e.el.offsetHeight;
      const x0 = Math.max(4, Math.min(w - lw - 4, v.x - lw / 2));   // jamais coupée au bord
      const r = { x0, x1: x0 + lw, y0: v.y - lh, y1: v.y };
      for (let k = 0; k < 6; k++) {
        const o = poses.find((p) => r.x0 < p.x1 && r.x1 > p.x0 && r.y0 < p.y1 && r.y1 > p.y0);
        if (!o) break;
        const dy = r.y1 - o.y0 + 3;
        r.y0 -= dy; r.y1 -= dy;
      }
      poses.push(r);
      v.e.el.style.transform = 'translate(' + Math.round(r.x0) + 'px,' + Math.round(r.y0) + 'px)';
    }
  }

  // ------------------------------------------------------------ étapes
  let root = null, frais = [], outils = [], animT0 = 0, casCourant = 0, stm = null;
  function etape(i, { anime = true, saut = null } = {}) {
    if (i !== idx || saut === null) enPause = false;   // nouvel écran : l'animation repart
    idx = Math.max(0, Math.min(ETAPES.length - 1, i));
    try { localStorage.setItem(CLE, String(idx)); } catch (e) {}
    panneau();
    if (!root) return;
    const e = ETAPES[idx], n = e.n, v8 = !!e.variante, grp = e.groupe || null;
    for (let k = tweens.length - 1; k >= 0; k--) if (tweens[k].pose) { tweens[k].fin(); tweens.splice(k, 1); }
    debutEtape = animT0 = horloge;
    const sr12 = root.userData.serrage12;
    if (sr12) { sr12.coins.visible = false; sr12.visA.visible = false; }
    frais.forEach((o) => surligner(o, false));
    outils.forEach((o) => surligner(o, false));
    const pieces = root.userData.pieces;
    for (const o of pieces) {
      o.visible = o.userData.s <= n && !(v8 && (o.userData.x8 || o.userData.pl));
      o.position.copy(o.userData.cible);
    }
    for (const o of root.userData.v8) { o.visible = v8; o.position.copy(o.userData.cible); }
    for (const o of root.userData.cas) { o.visible = o.userData.grp === grp; o.position.copy(o.userData.cible); }
    profondeur(root, 1);
    casCourant = 0;
    const cycle = grp === 'marches' && e.cycle && root.userData.marches;
    const cycleS = grp === 'secondaire' && e.cycle;
    if (cycleS) for (const o of pieces) if (o.userData.s === n) o.visible = false;   // plancher secondaire fixe : remplacé par les 3 montages
    if (cycle) {
      for (const o of pieces) if (o.userData.esc) o.visible = false;
      for (const o of root.userData.marches.appuis) o.visible = false;   // remplacés par ceux du cas
    }
    for (const o of root.userData.seules) o.visible = !v8 && !grp && o.userData.o.includes(n);
    const sr = root.userData.serrage;
    if (sr) { sr.visA.visible = false; sr.coins.position.copy(sr.coins.userData.cible); }
    frais = v8 ? root.userData.v8 : grp ? root.userData.cas.filter((o) => o.userData.grp === grp && !o.userData.b) : pieces.filter((o) => o.userData.s === n);
    frais.forEach((o) => surligner(o, true));
    // Outils propres à l'étape (coins de serrage, niveau, laser) aussi avec un contour rouge.
    outils = root.userData.seules.filter((o) => o.visible && !o.userData.d);
    outils.forEach((o) => surligner(o, true));
    if (root.userData.trucPlanche) root.userData.trucPlanche.visible = false;
    // Foreuse STM-1500 : seulement sur l'écran qui la demande.
    if (e.foreuse || stm) chargerForeuse().then((o) => {
      if (fini) return;
      stm = o;
      if (o.parent !== scene) scene.add(o);
      o.visible = !!ETAPES[idx].foreuse;
      if (jambes) jambes.forEach((j) => { if (j.g.parent !== scene) scene.add(j.g); });
      const cf = ETAPES[idx].stm;
      poserForeuse(cf ? cf[casCourant] || cf[1] : { angle: 0, glisse: 0, z: 0.535 });
      sale = true;
    }).catch(() => {});
    if (root.userData.trucCoupe) root.userData.trucCoupe.visible = false;
    if (cycleS) {
      secondaires(e, anime);
    } else if (cycle) {
      marches(e, anime);
    } else if (anime && !v8 && !grp && e.truc) {
      truc(e, frais);
    } else if (anime && !v8 && !grp && e.jonction) {
      jonction(e, frais);
    } else if (anime && !v8 && !grp && e.reprise) {
      reprise(e, frais);
    } else if (anime && sr && !v8 && !grp && n === SERRAGE.etape) {
      serrer(sr, SERRAGE, horloge);
      const ajout = [sr.planches[SERRAGE.ancre], sr.visA];
      ajout.forEach((o) => surligner(o, true));
      frais = frais.concat(ajout);
    } else if (anime && frais.length) {
      const pasMs = Math.max(35, Math.min(320, 2600 / frais.length));
      const t0 = horloge;
      frais.forEach((o, k) => {
        const chute = o.userData.nd ? 0 : 0.45;
        o.visible = false;
        // Écrans de cas (marches…) : pièce par pièce selon leur rang m (module du bas d'abord),
        // tous les cas ensemble, une pause entre deux modules pour voir chaque étage se poser.
        const debut = o.userData.m ? t0 + 500 + (o.userData.m - 1) * 1300 + (k % 6) * 60 : t0 + k * pasMs;
        tweens.push({ pose: true, debut, duree: o.userData.m ? 600 : 380,
          pas(e) {
            o.visible = true;
            o.position.copy(o.userData.cible);
            o.position.y += chute * Math.pow(1 - e, 3);
          },
          fin() { o.visible = true; o.position.copy(o.userData.cible); } });
      });
    }
    if (saut !== null) sautCam = true;
    allerA(ETAPES[idx].cam, !anime);
    // Durée de l'animation de l'écran (barre de contrôle) : fin de la dernière pose.
    dureeEtape = 0;
    for (const tw of tweens) if (tw.pose || tw.cam) dureeEtape = Math.max(dureeEtape, tw.debut + tw.duree - debutEtape);
    ctl.hidden = !anime || dureeEtape < 1200;
    temps.max = String(Math.round(dureeEtape));
    // Saut à un instant de l'animation (recul, barre) : l'écran est reconstruit depuis le
    // début, puis toutes les poses déjà commencées sont appliquées dans l'ordre.
    if (saut !== null) {
      horloge = debutEtape + Math.max(0, Math.min(saut, dureeEtape));
      appliquer(true);
      sautCam = false;
    }
    majCtl();
   
    sale = true;
  }

  /* Étape 15, le truc des 2 × 4 de 8 pi, animé sur une vraie section de garde-corps (celle
     de 8 pi la plus près du point visé par la caméra) : un 2 × 4 de 8 pi est dressé debout à
     la place du montant du milieu (il dépasse nettement le garde-corps), coupé au milieu ; la
     moitié du bas est le montant du milieu (au 4 pi), celle du haut va au bout de la section ; puis trois autres 2 × 4 de 8 pi deviennent la lisse du haut, la lisse du milieu
     et le coup de pied. Les autres pièces de l'étape se posent d'abord, comme d'habitude. */
  function etiquettesTruc(U) {
    const T = U.t, D = T.debut, L3 = D + T.lisse, P = T.pasLisse;
    return [
      ['Un 2 × 4 de 8 pi debout', D, D + T.planche + 200],
      ['Coupé au milieu : 2 montants de 48 po, un au 4 pi et un au bout', D + T.planche + 200, D + T.lisse],
      ['2e 2 × 4 de 8 pi : la lisse du haut', L3, L3 + P],
      ['3e 2 × 4 de 8 pi : la lisse du milieu', L3 + P, L3 + 2 * P],
      ['4e 2 × 4 de 8 pi : le coup de pied', L3 + 2 * P, L3 + 3 * P],
      ['Quatre 2 × 4 de 8 pi = une section de garde-corps de 8 pi', L3 + 3 * P, D + T.fin],
    ].map(([text, a, b], k) => ({ text, fen: [[a, b]], cle: 'truc' + k, pos: [0, 0, 0] }));
  }
  function sectionTruc(frais, vise) {
    const bx = new THREE.Box3(), sz = new THREE.Vector3(), c = new THREE.Vector3();
    const info = frais.map((o) => { bx.setFromObject(o); bx.getSize(sz); bx.getCenter(c); return { o, sz: sz.clone(), c: c.clone(), min: bx.min.y }; });
    const poteaux = info.filter((p) => p.sz.y > 1.1 && p.sz.x < 0.15 && p.sz.z < 0.15);
    // Section de 8 pi : deux montants à environ 8 pi l'un de l'autre, sur le même bord, avec un
    // montant au milieu (tous les 4 pi). La plus près du point visé.
    let best = null;
    for (const a of poteaux) for (const b of poteaux) {
      if (a === b) continue;
      const enX = Math.abs(a.c.z - b.c.z) < 0.03, enZ = Math.abs(a.c.x - b.c.x) < 0.03;
      if (!enX && !enZ) continue;
      const d = enX ? b.c.x - a.c.x : b.c.z - a.c.z;
      if (d < 2.2 || d > 2.6) continue;
      const entre = poteaux.filter((p) => p !== a && p !== b && (enX ? Math.abs(p.c.z - a.c.z) < 0.03 && p.c.x > a.c.x && p.c.x < b.c.x : Math.abs(p.c.x - a.c.x) < 0.03 && p.c.z > a.c.z && p.c.z < b.c.z));
      if (entre.length !== 1) continue;
      const m = a.c.clone().add(b.c).multiplyScalar(0.5);
      const dist = Math.hypot(m.x - vise[0], m.z - vise[2]);
      if (!best || dist < best.dist) best = { a, b, enX, d, m, dist, mil: entre[0] };
    }
    if (!best) return null;
    const { a, b, enX, d, m } = best;
    const u = (p) => (enX ? p.x : p.z), w = (p) => (enX ? p.z : p.x);
    const lisses = info.filter((p) => p !== a && p !== b && p !== best.mil && (enX ? p.sz.x : p.sz.z) > 0.8 * d
      && u(p.c) > u(a.c) - 0.05 && u(p.c) < u(b.c) + 0.05 && Math.abs(w(p.c) - w(a.c)) < 0.2)
      .sort((p, q) => q.c.y - p.c.y).slice(0, 3);
    if (lisses.length < 3) return null;
    // Vers l'intérieur du plancher.
    const dedans = enX ? -Math.sign(a.c.z) : (a.c.x > 4.877 ? -1 : 1);
    // Le 2 × 4 coupé donne le montant du milieu et celui du bout ; celui du début est déjà là.
    return { poteaux: [best.mil, b], lisses, enX, m, dedans };
  }
  function truc(e, frais) {
    const U = e.truc, T = U.t, t0 = horloge;
    animT0 = t0;
    const S = sectionTruc(frais, ETAPES[idx].cam.tgt);
    const pris = S ? new Set([...S.poteaux, ...S.lisses].map((p) => p.o)) : new Set();
    const autres = frais.filter((o) => !pris.has(o));
    const pasMs = Math.max(35, Math.min(320, 2400 / Math.max(1, autres.length)));
    autres.forEach((o, k) => {
      const chute = o.userData.nd ? 0 : 0.45;
      o.visible = false;
      tweens.push({ pose: true, debut: t0 + k * pasMs, duree: 380,
        pas(x) { o.visible = true; o.position.copy(o.userData.cible); o.position.y += chute * Math.pow(1 - x, 3); },
        fin() { o.visible = true; o.position.copy(o.userData.cible); } });
    });
    if (!S) return;
    const D = T.debut, DECK = 9 * 0.0254, P4 = 1.5 * 0.0254, L4 = 3.5 * 0.0254, H8 = 96 * 0.0254;
    const ax = S.enX ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 0, 1);       // le long du garde-corps
    const ded = (S.enX ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0)).multiplyScalar(S.dedans);
    const tas = S.m.clone().addScaledVector(ded, 0.75);                                // où l'on pose les lisses
    tas.y = DECK;
    // Le 2 × 4 de 8 pi, debout à la place du premier montant (même bois, deux fois plus haut).
    const [pa, pb] = S.poteaux;
    let mat = null;
    pa.o.traverse((k) => { if (!mat && k.isMesh && !k.isLineSegments2) mat = k.userData.mat0 || k.material; });
    if (!root.userData.trucPlanche) { root.userData.trucPlanche = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat); root.add(root.userData.trucPlanche); }
    const pl = root.userData.trucPlanche;
    pl.material = mat;
    pl.scale.set(pa.sz.x, H8, pa.sz.z);
    surligner(pl, true);
    const bas = pa.min;                                   // pied du montant
    // Trait de coupe, au milieu du 2 × 4.
    if (!root.userData.trucCoupe) {
      root.userData.trucCoupe = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xe3262b }));
      root.add(root.userData.trucCoupe);
    }
    const tc = root.userData.trucCoupe;
    tc.scale.set(pa.sz.x + 0.03, 0.012, pa.sz.z + 0.03);
    const sp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const v = new THREE.Vector3();
    function etat(t) {
      // 1. le 2 × 4 de 8 pi se dresse à la place du premier montant ; 2. trait de coupe au milieu.
      pl.visible = t >= D && t < D + T.coupe;
      pl.position.copy(pa.o.userData.cible).setY(bas + H8 / 2 + 0.4 * Math.pow(1 - sp(t, D, D + T.planche), 3));
      tc.visible = t >= D + T.planche && t < D + T.coupe + 400 && Math.floor((t - D) / 180) % 2 === 0;
      tc.position.copy(pa.o.userData.cible).setY(bas + H8 / 2);
      // 3. coupé : la moitié du bas est le premier montant ; celle du haut va à la place du second.
      pa.o.visible = t >= D + T.coupe;
      pa.o.position.copy(pa.o.userData.cible);
      pb.o.visible = t >= D + T.coupe;
      const haut = pa.o.userData.cible.clone().setY(pb.o.userData.cible.y + H8 / 2);
      const lv = lisse(sp(t, D + T.debout, D + T.debout + 1600));
      v.lerpVectors(haut, pb.o.userData.cible, lv);
      v.y += 0.35 * Math.sin(Math.PI * lv) + 0.06 * sp(t, D + T.coupe, D + T.coupe + 400) * (1 - lv);
      pb.o.position.copy(v);
      // 4. les trois lisses, une à une : posées sur le plancher, puis mises en place.
      S.lisses.forEach((l, k) => {
        const o = l.o, a = D + T.lisse + k * T.pasLisse;
        o.visible = t >= a;
        const au = tas.clone().addScaledVector(ded, 0.12 * (k + 1));
        au.y = DECK + (o.userData.cible.y - l.min);
        const x = lisse(sp(t, a + 450, a + 1250));
        v.lerpVectors(au, o.userData.cible, x);
        v.y += 0.3 * Math.pow(1 - sp(t, a, a + 400), 3) + 0.2 * Math.sin(Math.PI * x);
        o.position.copy(v);
      });
      sale = true;
    }
    // Étiquettes du truc : posées au-dessus du tas, puis de la section.
    for (const el of etiq) {
      if (!el.cle || !el.cle.startsWith('truc')) continue;
      const k = Number(el.cle.slice(4));
      el.pos.copy(k < 2 ? pa.o.userData.cible : S.m).setY(k < 2 ? bas + (k === 0 ? H8 + 0.08 : H8 / 2 + 0.1) : 1.25 + (k === 5 ? 0.15 : 0));
    }
    etat(0);
    tweens.push({ pose: true, debut: t0, duree: D + T.fin, pas(x) { etat(x * (D + T.fin)); },
      fin() {
        pl.visible = false;
        tc.visible = false;
        S.poteaux.forEach((p) => { p.o.visible = true; p.o.position.copy(p.o.userData.cible); });
        S.lisses.forEach((l) => { l.o.visible = true; l.o.position.copy(l.o.userData.cible); });
      } });
    // Caméra : la section vue de l'intérieur du plancher, puis retour à la vue de l'étape.
    const cam = { tgt: S.m.clone().addScaledVector(ded, 0.4).setY(0.95).toArray(),
      dir: ded.clone().multiplyScalar(0.85).add(new THREE.Vector3(0, 0.35, 0)).addScaledVector(ax, 0.3).toArray(), r: 1.7 };
    let c1 = false, c2 = false;
    tweens.push({ pose: true, debut: t0 + D - 400, duree: 1, pas() { if (!c1) { c1 = true; allerA(cam); } }, fin() {} });
    tweens.push({ pose: true, debut: t0 + D + T.fin, duree: 1, pas() { if (!c2) { c2 = true; allerA(e.cam); } }, fin() {} });
  }

  /* Pose de la STM-1500 (stm1500.glb : groupes stm-fixe, stm-support à l'axe de bascule arrière,
     stm-poutre enfant du support) : recul du traîneau (Z), glisse de la poutre le long de
     l'avance, bascule de l'avance vers le haut sur l'axe arrière. */
  function poserForeuse(p) {
    if (!stm) return;
    const sup = stm.getObjectByName('stm-support'), pou = stm.getObjectByName('stm-poutre');
    // Le .glb est exporté au cas 1 (Z = 0,535), l'avant de l'avance vers Z positif : la bascule
    // lève ce côté (rotation négative autour de X) et la poutre glisse vers Z positif.
    stm.position.z = p.z - 0.535;
    if (sup) sup.rotation.x = -(p.angle * Math.PI) / 180;
    if (pou) pou.position.z = p.glisse;
    poserJambes(p.angle > 3);
    sale = true;
  }
  /* Jambes UM-064-400D (pattes de forage, page 1.10 du manuel) : de l'oreille avant du traîneau à
     la poutre levée. Ajustables : tracées entre les deux ancrages (nœuds jambe-bas/haut du .glb) ;
     section du bas, section centrale, section ajustable filetée, goupilles rouges aux bouts.
     Pas posées à 0°. */
  let jambes = null;
  const jA = new THREE.Vector3(), jB = new THREE.Vector3(), jD = new THREE.Vector3(), Y = new THREE.Vector3(0, 1, 0);
  function poserJambes(on) {
    if (!jambes) {
      jambes = [];
      const noir = new THREE.MeshStandardMaterial({ color: 0x1b1b1b, metalness: 0.4, roughness: 0.55 });
      const acier = new THREE.MeshStandardMaterial({ color: 0x9aa0a6, metalness: 0.8, roughness: 0.35 });
      const rouge = new THREE.MeshStandardMaterial({ color: 0xc8231e, metalness: 0.3, roughness: 0.5 });
      const cyl = (r, m) => new THREE.Mesh(new THREE.CylinderGeometry(r, r, 1, 16), m);
      for (const c of ['g', 'd']) {
        const bas = stm.getObjectByName('jambe-bas-' + c), haut = stm.getObjectByName('jambe-haut-' + c);
        if (!bas || !haut) continue;
        const g = new THREE.Group();
        const parts = [
          { o: cyl(0.032, noir), a: 0.0, b: 0.48 },      // section du bas
          { o: cyl(0.041, noir), a: 0.44, b: 0.86 },     // section centrale
          { o: cyl(0.018, acier), a: 0.84, b: 0.98 },    // section ajustable filetée
        ];
        for (const q of parts) g.add(q.o);
        const goupilles = [cyl(0.012, rouge), cyl(0.012, rouge)];
        goupilles.forEach((o) => g.add(o));
        scene.add(g);
        jambes.push({ g, bas, haut, parts, goupilles });
      }
    }
    stm.updateMatrixWorld(true);
    for (const j of jambes) {
      j.g.visible = on && stm.visible;
      if (!j.g.visible) continue;
      j.bas.getWorldPosition(jA); j.haut.getWorldPosition(jB);
      jD.subVectors(jB, jA);
      const L = jD.length();
      j.g.position.copy(jA);
      j.g.quaternion.setFromUnitVectors(Y, jD.normalize());
      for (const q of j.parts) { q.o.scale.set(1, (q.b - q.a) * L, 1); q.o.position.set(0, ((q.a + q.b) / 2) * L, 0); }
      j.goupilles.forEach((o, k) => { o.scale.set(1, 0.14, 1); o.rotation.set(0, 0, Math.PI / 2); o.position.set(0, k ? L : 0, 0); });
    }
  }

  /* Écran du plancher secondaire (étape 18) : les montages l'un après l'autre (sans marche,
     2 marches, 3 marches). La foreuse se place pour l'angle de forage du montage, puis le
     plancher secondaire se pose, pièce par pièce selon leur rang. */
  function secondaires(e, anime) {
    const C = e.cycle, t0 = horloge;
    animT0 = t0;
    const parCas = new Map(C.cas.map((n) => [n, frais.filter((o) => o.userData.cas === n)]));
    const rangs = [...new Set(frais.map((o) => o.userData.m))].sort((a, b) => a - b);
    const sp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const mix = (a, b, k) => ({ angle: a.angle + (b.angle - a.angle) * k, glisse: a.glisse + (b.glisse - a.glisse) * k, z: a.z + (b.z - a.z) * k });
    function etat(t) {
      const k = Math.min(C.cas.length - 1, Math.floor(t / C.duree)), n = C.cas[k], tl = t - k * C.duree;
      if (e.nomsCas && casCourant !== n) { const d = $('.p3d-casn'); d.textContent = e.nomsCas[n]; d.hidden = false; }
      casCourant = n;
      const avant = e.stm[k === 0 ? n : C.cas[k - 1]], ici = e.stm[n];
      // D'abord le recul et la glisse, puis la bascule (ou l'inverse en redescendant).
      const a = lisse(sp(tl, 0, C.sol * 0.5)), b = lisse(sp(tl, C.sol * 0.5, C.sol));
      const angle = (x) => avant.angle + (ici.angle - avant.angle) * x;
      const place = mix(avant, ici, ici.angle >= avant.angle ? a : b);   // recul et glisse
      poserForeuse({ ...place, angle: angle(ici.angle >= avant.angle ? b : a) });
      for (const [c, liste] of parCas) for (const o of liste) {
        o.position.copy(o.userData.cible);
        if (c !== n) { o.visible = false; continue; }
        const d = C.sol + 200 + rangs.indexOf(o.userData.m) * C.pas;
        o.visible = tl >= d;
        o.position.y += 0.35 * Math.pow(1 - sp(tl, d, d + 450), 3);
      }
      sale = true;
    }
    if (!anime) { etat(C.cas.length * C.duree); return; }
    etat(0);
    tweens.push({ pose: true, debut: t0, duree: C.cas.length * C.duree, pas(x) { etat(x * C.cas.length * C.duree); }, fin() {} });
  }

  /* Écran des cas de marches : un cas après l'autre (2, 3, puis 4 marches). Le sol se creuse
     ou remonte sous le plancher jusqu'à la bonne hauteur, puis l'escalier du cas se pose,
     module par module, au bout du plancher. Sans animation : le dernier cas. */
  function marches(e, anime) {
    const C = e.cycle, M = root.userData.marches, t0 = horloge;
    animT0 = t0;
    // Plancher à n × 9 po du sol : le sol aux marches est à (n - 1) × 9 po sous y = 0 (dessus du plancher à 9 po).
    const fDe = (n) => ((n - 1) * MARCHE) / -M.sol;
    const dy = (n) => -(n - 1) * MARCHE - M.sol;              // l'escalier du cas suit le sol
    const ap = frais.filter((o) => o.userData.ap);
    ap.forEach((o) => surligner(o, false));                   // appuis : pas de contour, seul l'escalier est nouveau
    frais = frais.filter((o) => !o.userData.ap);
    const parCas = new Map(C.cas.map((n) => [n, frais.filter((o) => o.userData.cas === n)]));
    const rangs = [...new Set(frais.map((o) => o.userData.m))].sort((a, b) => a - b);
    const sp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    function etat(t) {
      const k = Math.min(C.cas.length - 1, Math.floor(t / C.duree)), n = C.cas[k], tl = t - k * C.duree;
      casCourant = n;
      const f0 = k === 0 ? 1 : fDe(C.cas[k - 1]);
      profondeur(root, f0 + (fDe(n) - f0) * lisse(sp(tl, 0, C.sol)));
      // Appuis du cas : en place une fois le sol à la bonne profondeur.
      for (const o of ap) o.visible = o.userData.cas === n && tl >= C.sol;
      for (const [c, liste] of parCas) for (const o of liste) {
        o.position.copy(o.userData.cible);
        if (c !== n) { o.visible = false; continue; }
        const d = C.sol + 200 + rangs.indexOf(o.userData.m) * C.pas;
        o.visible = tl >= d;
        o.position.y += dy(n) + 0.35 * Math.pow(1 - sp(tl, d, d + 450), 3);
      }
      sale = true;
    }
    if (!anime) { etat(C.cas.length * C.duree); return; }
    etat(0);
    tweens.push({ pose: true, debut: t0, duree: C.cas.length * C.duree, pas(x) { etat(x * C.cas.length * C.duree); }, fin() {} });
  }

  /* Animation du serrage (voir SERRAGE) : une seule pose qui dure toute la séquence.
     C : réglages (SERRAGE à l'étape 7, ceux de la reprise à l'étape 12) ; sens : côté
     où s'ouvrent les écarts (-1 : vers le début du plancher ; +1 : vers la section 2). */
  function serrer(sr, C, debut) {
    const T = C.t, P = sr.planches, nT = C.tension, nA = C.ancre, s = C.sens;
    const sp = (t, [a, b]) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const x0 = (i) => P[i].userData.cible.x;
    const face0 = sr.face0 !== undefined ? sr.face0 : x0(nT) + s * SERRAGE.P8 / 2;   // face où sont posés les coins du modèle
    function etat(t) {
      const k = lisse(sp(t, T.serre));
      const lache = (i) => i * C.ecart * (1 - k);
      const ancre = (nT * C.ecart + C.place) * (1 - lisse(sp(t, T.retour)));
      P.forEach((o, i) => {
        if (!o || i === 0) return;
        o.position.copy(o.userData.cible);
        if (i <= nA) o.position.x += s * (i === nA ? ancre : lache(i));
        if (i === nA) o.position.y += 0.35 * Math.pow(1 - sp(t, T.ancre), 3);
        // Étape 12 : les planches du centre puis la planche d'appui se posent pendant la séquence.
        if (T.libres && i <= nA) o.visible = t >= (i === nA ? T.ancre[0] : T.libres[0] + (i - 1) * 0.4);
        if (i < nA && T.libres) o.position.y += 0.3 * Math.pow(1 - sp(t, [T.libres[0] + (i - 1) * 0.4, T.libres[0] + (i - 1) * 0.4 + 0.45]), 3);
        if (i > nA) {
          const t0 = T.suite + (i - nA - 1) * 0.12;
          o.visible = t >= t0;
          o.position.y += 0.35 * Math.pow(1 - Math.min(1, Math.max(0, (t - t0) / 0.38)), 3);
        }
      });
      // Tire-fonds temporaires de la planche d'appui : posés, puis retirés (ils remontent).
      const haut = sp(t, T.devisse);
      sr.visA.visible = t >= T.visA[0] && haut < 1;
      sr.visA.position.copy(sr.visA0);
      sr.visA.position.x += s * ancre;
      sr.visA.position.y += 0.25 * (1 - sp(t, T.visA)) + 0.12 * haut;
      // Coins : insérés au-dessus de l'écart, enfoncés, puis enlevés.
      const sortie = sp(t, T.sortie), entre = sp(t, T.coins);
      const xAvant = x0(nT) + s * (lache(nT) + SERRAGE.P8 / 2), xArriere = x0(nA) + s * (ancre - SERRAGE.P8 / 2);
      sr.coins.visible = t >= T.coins[0] && sortie < 1;
      sr.coins.position.copy(sr.coins.userData.cible);
      sr.coins.position.x += (xAvant + xArriere) / 2 - face0;
      sr.coins.position.y += 0.25 * (1 - entre) - 0.06 * k + 0.35 * sortie;
      // Tire-fonds de la planche devant les coins, une fois les planches serrées.
      sr.visT.visible = t >= T.visT[0];
      sr.visT.position.copy(sr.visT.userData.cible);
      sr.visT.position.y += 0.25 * (1 - sp(t, T.visT));
    }
    if (debut <= horloge) etat(0);
    tweens.push({ pose: true, debut, duree: C.duree * 1000,
      pas(e) { etat(e * C.duree); },
      fin() {
        P.forEach((o) => { if (o) { o.visible = true; o.position.copy(o.userData.cible); } });
        sr.visA.visible = false;
        sr.coins.visible = false;
        sr.visT.visible = true;
        sr.visT.position.copy(sr.visT.userData.cible);
      } });
  }

  /* Étape 11 : pose du bois de jonction, expliquée pas à pas. Les pièces de l'étape se
     posent ; la caméra s'approche de la jonction (madrier de rive) ; seuls le 3 × 6 et
     ses tire-fonds restent avec un contour rouge ; le 3 × 6 se pose contre le madrier, à cheval sur
     le joint, puis un tire-fond entre dans chaque section ; retour à la vue de l'étape. */
  function jonction(e, frais) {
    const J = e.jonction, t0 = horloge;
    animT0 = t0;
    const pres = (o) => Math.abs(o.userData.centre[0] - J.x) < 0.4 && Math.abs(o.userData.centre[2]) > J.zMin;
    const bois = frais.filter((o) => pres(o) && o.userData.q === 3);
    const vis = frais.filter((o) => pres(o) && o.userData.q === 4);
    const reste = frais.filter((o) => !bois.includes(o) && !vis.includes(o));
    // Le côté vu par la caméra d'abord.
    const cote = (o) => (Math.sign(o.userData.centre[2]) === Math.sign(J.cam.tgt[2]) ? 0 : 1);
    bois.sort((a, b) => cote(a) - cote(b));
    vis.sort((a, b) => cote(a) - cote(b) || a.userData.centre[0] - b.userData.centre[0]);
    const pasMs = Math.max(35, Math.min(200, 2400 / Math.max(1, reste.length)));
    const plus = (debut, duree, pas, fin) => tweens.push({ pose: true, debut, duree, pas, fin: fin || (() => {}) });
    reste.forEach((o, k) => {
      const chute = o.userData.nd ? 0 : 0.45;
      o.visible = false;
      plus(t0 + k * pasMs, 380, (x) => { o.visible = true; o.position.copy(o.userData.cible); o.position.y += chute * Math.pow(1 - x, 3); },
        () => { o.visible = true; o.position.copy(o.userData.cible); });
    });
    const T = J.t;
    let fait = false;
    // Gros plan : le reste de l'étape perd son contour.
    plus(t0 + T.approche, 1, () => { if (fait) return; fait = true; reste.forEach((o) => surligner(o, false)); allerA(J.cam); });
    bois.forEach((o, k) => {
      o.visible = false;
      plus(t0 + T.bois + k * 900, 700, (x) => { o.visible = true; o.position.copy(o.userData.cible); o.position.y += 0.35 * Math.pow(1 - x, 3); },
        () => { o.visible = true; o.position.copy(o.userData.cible); });
    });
    vis.forEach((o, k) => {
      const dz = -Math.sign(o.userData.centre[2]) * 0.3; // part de l'intérieur du plancher et entre dans le madrier
      o.visible = false;
      plus(t0 + T.vis + k * 700, 650, (x) => { o.visible = true; o.position.copy(o.userData.cible); o.position.z += dz * (1 - x); },
        () => { o.visible = true; o.position.copy(o.userData.cible); });
    });
    // Zoom sur le 3 × 6 pendant le vissage, puis on recule pour voir la pièce en entier.
    let zoom = false, recul = false;
    if (J.zoom) {
      plus(t0 + T.zoom, 1, () => { if (zoom) return; zoom = true; allerA(J.zoom); });
      plus(t0 + T.recul, 1, () => { if (recul) return; recul = true; allerA(J.cam); });
    }
    let retour = false;
    plus(t0 + T.retour, 1, () => { if (retour) return; retour = true; allerA(e.cam); });
  }

  /* Étape 12 : la section 2 se couvre du bout du plancher vers le centre, sans être serrée
     (petits écarts entre les planches). Au centre, l'espace ne tombe pas juste. La planche
     libre contre la section 1 (déjà serrée) est vissée le temps du serrage ; les coins
     enfoncés entre elle et la section 2 resserrent les planches de la section 2 vers le bout
     du plancher ; on retire coins et tire-fonds, l'autre planche libre entre dans l'espace
     gagné, puis on visse les planches du centre dans les deux sections. */
  function reprise(e, frais) {
    const R = e.reprise, T = R.t, t0 = horloge;
    const sr = root.userData.serrage12;
    animT0 = t0;
    const plus = (debut, duree, pas, fin) => tweens.push({ pose: true, debut, duree, pas, fin: fin || (() => {}) });
    const pris = new Set(sr ? [...sr.libres, sr.vis] : []);
    const sec2 = frais.filter((o) => !pris.has(o)).sort((a, b) => b.userData.centre[0] - a.userData.centre[0]);   // du bout vers le centre
    // Rang de chaque pièce depuis le bout du plancher (0 : planche du bout, vissée) : son écart
    // cumulé vers le centre avant le serrage.
    const bout = Math.max(...sec2.map((o) => o.userData.centre[0]));
    const rang = (o) => Math.max(0, Math.round((bout - o.userData.centre[0]) / SERRAGE.P8));
    const E = R.ecart;
    let k = 0;                                   // avancement du serrage (0 : lâche, 1 : serré)
    const place = (o) => { o.position.copy(o.userData.cible); o.position.x -= rang(o) * E * (1 - k); };
    const pasMs = Math.max(40, Math.min(220, T.couvert / Math.max(1, sec2.length)));
    sec2.forEach((o, n) => {
      o.visible = false;
      plus(t0 + n * pasMs, 380, (x) => { o.visible = true; place(o); o.position.y += 0.45 * Math.pow(1 - x, 3); },
        () => { o.visible = true; o.position.copy(o.userData.cible); });
    });
    let fait = false;
    plus(t0 + T.approche, 1, () => { if (fait) return; fait = true; allerA(R.cam); });
    if (sr) {
      const { libres, coins, visA, vis } = sr;
      [coins, visA].forEach((o) => surligner(o, true));
      const sp = (t, [a, b]) => Math.min(1, Math.max(0, (t - a) / (b - a)));
      const [l1, l2] = libres;
      const pres = sec2.find((o) => rang(o) === Math.max(...sec2.map(rang)) && o.userData.pl) || sec2[sec2.length - 1];
      function etat(t) {
        k = lisse(sp(t, T.serre));
        if (t >= T.libre1[0]) sec2.forEach(place);
        l1.visible = t >= T.libre1[0];
        l1.position.copy(l1.userData.cible);
        l1.position.y += 0.35 * Math.pow(1 - sp(t, T.libre1), 3);
        l2.visible = t >= T.libre2[0];
        l2.position.copy(l2.userData.cible);
        l2.position.y += 0.35 * Math.pow(1 - sp(t, T.libre2), 3);
        visA.visible = t >= T.visA[0] && sp(t, T.devisse) < 1;
        visA.position.copy(sr.visA0);
        visA.position.y += 0.25 * (1 - sp(t, T.visA)) + 0.12 * sp(t, T.devisse);
        // Coins au milieu de l'écart entre la planche d'appui et la planche de la section 2 la plus au centre.
        const faceA = l1.userData.cible.x + SERRAGE.P8 / 2;
        const faceS = pres.position.x - SERRAGE.P8 / 2;
        const sortie = sp(t, T.sortie);
        coins.visible = t >= T.coins[0] && sortie < 1;
        coins.position.copy(coins.userData.cible);
        coins.position.x = (faceA + faceS) / 2 - coins.userData.dx;
        coins.position.y += 0.25 * (1 - sp(t, T.coins)) - 0.06 * k + 0.35 * sortie;
        vis.visible = t >= T.vis[0];
        vis.position.copy(vis.userData.cible);
        vis.position.y += 0.25 * (1 - sp(t, T.vis));
      }
      etat(0);
      plus(t0 + T.libre1[0] - 1, T.fin - T.libre1[0] + 1, (x) => etat(T.libre1[0] - 1 + x * (T.fin - T.libre1[0] + 1)),
        () => {
          k = 1;
          sec2.forEach((o) => o.position.copy(o.userData.cible));
          libres.forEach((o) => { o.visible = true; o.position.copy(o.userData.cible); });
          visA.visible = false; coins.visible = false;
          vis.visible = true; vis.position.copy(vis.userData.cible);
        });
      // Le contour rouge quitte la section 2 une fois serrée.
      plus(t0 + T.libre2[0], 1, () => sec2.forEach((o) => surligner(o, false)));
    }
    let retour = false;
    plus(t0 + T.retour, 1, () => { if (retour) return; retour = true; allerA(e.cam); });
  }

  /* Contrôle de l'animation, comme une vidéo : reculer de 3 s, lecture / pause, avancer de 3 s,
     barre de position, rejouer. */
  const ctl = $('.p3d-ctl'), temps = $('.p3d-temps'), bJouer = $('.p3d-jouer');
  function position() { return Math.max(0, Math.min(dureeEtape, horloge - debutEtape)); }
  function majCtl() {
    const fin = position() >= dureeEtape;
    const arret = enPause || fin;
    ctl.classList.toggle('p3d-arret', arret);
    bJouer.setAttribute('aria-label', arret ? (fin ? 'Rejouer' : 'Lecture') : 'Pause');
    temps.value = String(Math.round(position()));
  }
  function sauter(ms) { if (root) etape(idx, { saut: ms }); }
  bJouer.addEventListener('click', () => {
    if (position() >= dureeEtape) { enPause = false; sauter(0); return; }
    enPause = !enPause;
    majCtl();
  });
  $('.p3d-recul').addEventListener('click', () => sauter(position() - 3000));
  $('.p3d-avance').addEventListener('click', () => sauter(position() + 3000));
  $('.p3d-rejouer').addEventListener('click', () => { const p = enPause; sauter(0); enPause = p; majCtl(); });
  let reprendre = false;
  temps.addEventListener('pointerdown', () => { reprendre = !enPause; enPause = true; majCtl(); });
  temps.addEventListener('input', () => sauter(Number(temps.value)));
  temps.addEventListener('change', () => { if (reprendre) { enPause = false; reprendre = false; majCtl(); } });

  bPrev.addEventListener('click', () => etape(idx - 1));
  bNext.addEventListener('click', () => etape(idx + 1));
  function clavier(e) {
    if (e.key === 'ArrowRight') etape(idx + 1);
    else if (e.key === 'ArrowLeft') etape(idx - 1);
    else if (e.key === 'Escape') fermer && fermer();
    else if (e.key === ' ' && !ctl.hidden && e.target.tagName !== 'BUTTON') { e.preventDefault(); bJouer.click(); }
  }
  document.addEventListener('keydown', clavier);
  $('.p3d-fermer').addEventListener('click', () => { fermer && fermer(); });

  // ------------------------------------------------------------ boucle
  let raf = 0;
  /* Applique les poses commencées à l'instant de l'horloge, dans l'ordre de leur début
     (une pièce peut en avoir plusieurs : chute, puis glissement). */
  function appliquer(tout) {
    const actifs = tweens.filter((tw) => horloge >= tw.debut).sort((a, b) => a.debut - b.debut);
    for (const tw of actifs) {
      const e = (horloge - tw.debut) / tw.duree;
      tw.pas(Math.min(1, e));
      sale = true;
      if (e >= 1) tweens.splice(tweens.indexOf(tw), 1);
    }
    if (tout) sale = true;
  }
  let posCtl = -1;
  function boucle(t) {
    raf = requestAnimationFrame(boucle);
    if (dernier !== null && !enPause) horloge += t - dernier;
    dernier = t;
    if (controls.update()) sale = true;
    appliquer(false);
    const p = Math.round(position() / 50);
    if (!ctl.hidden && p !== posCtl) { posCtl = p; majCtl(); }
    if (!sale) return;
    sale = false;
    renderer.render(scene, camera);
    placerEtiquettes();
  }
  raf = requestAnimationFrame(boucle);

  allerA(ETAPES[idx].cam, true);
  chargerModele((p) => { msg.textContent = 'Chargement de la 3D… ' + Math.round(p * 100) + ' %'; })
    .then((c) => {
      if (fini) return;
      root = c.scene;
      scene.add(root);
      // Étiquettes propres à l'outil (etapes.js), en plus de celles du modèle.
      const extra = [];
      for (const e of ETAPES) if (e.truc) for (const l of etiquettesTruc(e.truc)) extra.push({ steps: [cleDe(e)], kind: 'note', ...l });
      for (const e of ETAPES) for (const l of [...(e.etiquettes || []), ...((e.jonction && e.jonction.etiquettes) || []), ...((e.reprise && e.reprise.etiquettes) || [])]) extra.push({ steps: [cleDe(e)], kind: 'note', ...l });
      // Cas de marches : l'étiquette suit l'escalier posé au bout du plancher (dessus à 9 po + marge).
      creerEtiquettes(c.etiquettes.map((l) => (l.cas ? { ...l, pos: [l.pos[0], MARCHE + 0.07, l.pos[2]] } : l)).concat(extra));
      msg.remove();
      etape(idx);
    })
    .catch(() => {
      if (fini) return;
      msg.classList.add('err');
      msg.textContent = navigator.onLine === false
        ? 'La 3D n\'est pas encore sur cet appareil. Ouvre-la une fois avec du réseau : elle restera ensuite disponible hors ligne.'
        : 'La 3D n\'a pas pu être chargée. Réessaie dans un moment.';
    });

  // Fermeture : libère le contexte WebGL (la scène chargée est gardée).
  return function detruire() {
    fini = true;
    cancelAnimationFrame(raf);
    ro.disconnect();
    document.removeEventListener('keydown', clavier);
    controls.dispose();
    frais.forEach((o) => surligner(o, false));
    outils.forEach((o) => surligner(o, false));
    if (stm) scene.remove(stm);
    if (jambes) jambes.forEach((j) => scene.remove(j.g));
    if (root) { profondeur(root, 1); for (const o of root.userData.pieces) { o.visible = true; o.position.copy(o.userData.cible); } scene.remove(root); }
    env.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    hote.innerHTML = '';
  };
}
