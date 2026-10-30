/* Outil « Voir en 3D » du plancher PRO-DD-ST-003 : un seul écran, la 3D en
   haut (tourner à un doigt, zoomer à deux doigts), le panneau de l'étape en
   bas (en paysage : à droite). À chaque étape, les pièces des étapes
   précédentes sont en place, celles de l'étape se posent une à une en
   surbrillance orange, la caméra se place et les étiquettes de l'étape
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
// Textes et cadrages : même numéro de version que ce module (app.js le charge
// avec le ?v= du site), pour qu'une correction de texte arrive avec le déploiement.
const V = new URL(import.meta.url).searchParams.get('v') || '0';
const { ETAPES } = await import('./etapes.js?v=' + V);

const MODELE = 'plancher.glb?v=3';
const ETIQUETTES = 'plancher-etiquettes.json?v=3';
const ORANGE = new THREE.Color(0xff8a1f);
const FOV = 42;
const CLE = 'p3d_etape';           // dernière étape vue, reprise à la réouverture
const TOTAL = Math.max(...ETAPES.map((e) => e.n));   // étapes numérotées (sans « Avant de commencer » ni la variante)
// Clé des étiquettes d'un écran : son numéro, ou 'v8' pour l'écran de la variante 8 pi.
const cleDe = (e) => (e.variante ? 'v8' : e.n);

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
  const pieces = [], seules = [], v8 = [];
  root.updateMatrixWorld(true);
  const box = new THREE.Box3(), c = new THREE.Vector3();
  root.traverse((o) => {
    const u = o.userData || {};
    if (u.o) seules.push(o);
    else if (u.v8) { u.cible = o.position.clone(); v8.push(o); }
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
  }
}

/* Serrage des planches (étape 7), comme la vidéo de formation : les planches 1
   à 10 sont posées avec un petit écart (exagéré pour qu'il se voie). Le dernier
   3 × 8 (rang 11) est posé plus loin et vissé ; les coins enfoncés entre lui et la
   planche 10 ferment les écarts vers la première planche (vissée) ; la planche
   devant les coins est vissée ; les tire-fonds du dernier 3 × 8 sont retirés, les
   coins enlevés, et il reprend sa place ; puis la pose continue. Instants en s. */
const SERRAGE = {
  etape: 7, tension: 10, ancre: 11, ecart: 0.025, place: 0.05, P8: 8 * 0.0254,
  t: { ancre: [0, 0.5], visA: [1.0, 1.4], coins: [1.8, 2.3], serre: [2.6, 4.6], visT: [5.0, 5.4],
    devisse: [6.6, 7.2], sortie: [7.4, 7.9], retour: [7.8, 8.5], suite: 8.8 },
  duree: 11,
};
const lisse = (k) => k * k * (3 - 2 * k);

/* Matériau en surbrillance (orange), un par matériau d'origine. */
const surb = new Map();
function enOrange(m) {
  let h = surb.get(m);
  if (!h) {
    h = m.clone();
    if (h.color) h.color.lerp(ORANGE, 0.55);
    if (h.emissive) { h.emissive.copy(ORANGE); h.emissiveIntensity = 0.32; }
    surb.set(m, h);
  }
  return h;
}
function surligner(obj, on) {
  obj.traverse((m) => {
    if (!m.isMesh || m.material.isMeshBasicMaterial) return;   // cotes et faisceau laser : couleur gardée
    if (on) {
      if (!m.userData.mat0) m.userData.mat0 = m.material;
      m.material = enOrange(m.userData.mat0);
    } else if (m.userData.mat0) m.material = m.userData.mat0;
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
      '</div>' +
      '<div class="p3d-pan">' +
        '<div class="p3d-prog" aria-hidden="true"><i></i></div>' +
        '<div class="p3d-num"></div>' +
        '<h2 class="p3d-t"></h2>' +
        '<p class="p3d-x"></p>' +
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
    $('.p3d-num').textContent = e.variante ? 'Variante' : e.n === 0 ? 'Avant de commencer' : 'Étape ' + e.n + ' sur ' + TOTAL;
    $('.p3d-t').textContent = e.n === 0 ? 'Inspection et matériel de sécurité' : e.titre;
    $('.p3d-x').textContent = e.texte;
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
  controls.addEventListener('change', () => { sale = true; });

  function taille() {
    const w = vue.clientWidth, h = vue.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
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
    if (instant) {
      camera.position.copy(to.pos);
      controls.target.copy(to.tgt);
      controls.update();
      sale = true;
      return;
    }
    const p0 = camera.position.clone(), t0 = controls.target.clone();
    for (let i = tweens.length - 1; i >= 0; i--) if (tweens[i].cam) tweens.splice(i, 1);
    tweens.push({ cam: true, debut: performance.now(), duree: 900, pas(k) {
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
      return { el, pos: new THREE.Vector3(...l.pos), steps: l.steps };
    });
  }
  /* Étiquettes de l'étape posées sur leur point ; une étiquette qui en
     chevauche une autre déjà placée remonte au-dessus d'elle. */
  const pv = new THREE.Vector3();
  function placerEtiquettes() {
    const n = cleDe(ETAPES[idx]);
    const w = vue.clientWidth, h = vue.clientHeight;
    const vues = [];
    for (const e of etiq) {
      let on = e.steps.includes(n);
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
  let root = null, frais = [], outils = [];
  function etape(i, { anime = true } = {}) {
    idx = Math.max(0, Math.min(ETAPES.length - 1, i));
    try { localStorage.setItem(CLE, String(idx)); } catch (e) {}
    panneau();
    if (!root) return;
    const e = ETAPES[idx], n = e.n, v8 = !!e.variante;
    for (let k = tweens.length - 1; k >= 0; k--) if (tweens[k].pose) { tweens[k].fin(); tweens.splice(k, 1); }
    frais.forEach((o) => surligner(o, false));
    outils.forEach((o) => surligner(o, false));
    const pieces = root.userData.pieces;
    for (const o of pieces) {
      o.visible = o.userData.s <= n && !(v8 && (o.userData.x8 || o.userData.pl));
      o.position.copy(o.userData.cible);
    }
    for (const o of root.userData.v8) { o.visible = v8; o.position.copy(o.userData.cible); }
    for (const o of root.userData.seules) o.visible = !v8 && o.userData.o.includes(n);
    const sr = root.userData.serrage;
    if (sr) { sr.visA.visible = false; sr.coins.position.copy(sr.coins.userData.cible); }
    frais = v8 ? root.userData.v8 : pieces.filter((o) => o.userData.s === n);
    frais.forEach((o) => surligner(o, true));
    // Outils propres à l'étape (coins de serrage, niveau, laser) aussi en orange.
    outils = root.userData.seules.filter((o) => o.visible && !o.userData.d);
    outils.forEach((o) => surligner(o, true));
    if (anime && sr && !v8 && n === SERRAGE.etape) {
      serrer(sr);
      const ajout = [sr.planches[SERRAGE.ancre], sr.visA];
      ajout.forEach((o) => surligner(o, true));
      frais = frais.concat(ajout);
    } else if (anime && frais.length) {
      const pasMs = Math.max(35, Math.min(320, 2600 / frais.length));
      const t0 = performance.now();
      frais.forEach((o, k) => {
        const chute = o.userData.nd ? 0 : 0.45;
        o.visible = false;
        tweens.push({ pose: true, debut: t0 + k * pasMs, duree: 380,
          pas(e) {
            o.visible = true;
            o.position.copy(o.userData.cible);
            o.position.y += chute * Math.pow(1 - e, 3);
          },
          fin() { o.visible = true; o.position.copy(o.userData.cible); } });
      });
    }
    allerA(ETAPES[idx].cam, !anime);
    sale = true;
  }

  /* Animation du serrage (voir SERRAGE) : une seule pose qui dure toute la séquence. */
  function serrer(sr) {
    const T = SERRAGE.t, P = sr.planches, nT = SERRAGE.tension, nA = SERRAGE.ancre;
    const sp = (t, [a, b]) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const x0 = (i) => P[i].userData.cible.x;
    const face0 = x0(nT) - SERRAGE.P8 / 2;   // face de la planche 10 où sont posés les coins du modèle
    function etat(t) {
      const k = lisse(sp(t, T.serre));
      const lache = (i) => i * SERRAGE.ecart * (1 - k);
      const ancre = (nT * SERRAGE.ecart + SERRAGE.place) * (1 - lisse(sp(t, T.retour)));
      P.forEach((o, i) => {
        if (!o || i === 0) return;
        o.position.copy(o.userData.cible);
        if (i <= nA) o.position.x -= i === nA ? ancre : lache(i);
        if (i === nA) o.position.y += 0.35 * Math.pow(1 - sp(t, T.ancre), 3);
        if (i > nA) {
          const t0 = T.suite + (i - nA - 1) * 0.12;
          o.visible = t >= t0;
          o.position.y += 0.35 * Math.pow(1 - Math.min(1, Math.max(0, (t - t0) / 0.38)), 3);
        }
      });
      // Tire-fonds temporaires du dernier 3 × 8 : posés, puis retirés (ils remontent).
      const haut = sp(t, T.devisse);
      sr.visA.visible = t >= T.visA[0] && haut < 1;
      sr.visA.position.copy(sr.visA0);
      sr.visA.position.x -= ancre;
      sr.visA.position.y += 0.25 * (1 - sp(t, T.visA)) + 0.12 * haut;
      // Coins : insérés au-dessus de l'écart, enfoncés, puis enlevés.
      const sortie = sp(t, T.sortie), entre = sp(t, T.coins);
      const xAvant = x0(nT) - lache(nT) - SERRAGE.P8 / 2, xArriere = x0(nA) - ancre + SERRAGE.P8 / 2;
      sr.coins.visible = t >= T.coins[0] && sortie < 1;
      sr.coins.position.copy(sr.coins.userData.cible);
      sr.coins.position.x += (xAvant + xArriere) / 2 - face0;
      sr.coins.position.y += 0.25 * (1 - entre) - 0.06 * k + 0.35 * sortie;
      // Tire-fonds de la planche devant les coins, une fois les planches serrées.
      sr.visT.visible = t >= T.visT[0];
      sr.visT.position.copy(sr.visT.userData.cible);
      sr.visT.position.y += 0.25 * (1 - sp(t, T.visT));
    }
    etat(0);
    tweens.push({ pose: true, debut: performance.now(), duree: SERRAGE.duree * 1000,
      pas(e) { etat(e * SERRAGE.duree); },
      fin() {
        P.forEach((o) => { if (o) { o.visible = true; o.position.copy(o.userData.cible); } });
        sr.visA.visible = false;
        sr.coins.visible = false;
        sr.visT.visible = true;
        sr.visT.position.copy(sr.visT.userData.cible);
      } });
  }

  bPrev.addEventListener('click', () => etape(idx - 1));
  bNext.addEventListener('click', () => etape(idx + 1));
  function clavier(e) {
    if (e.key === 'ArrowRight') etape(idx + 1);
    else if (e.key === 'ArrowLeft') etape(idx - 1);
    else if (e.key === 'Escape') fermer && fermer();
  }
  document.addEventListener('keydown', clavier);
  $('.p3d-fermer').addEventListener('click', () => { fermer && fermer(); });

  // ------------------------------------------------------------ boucle
  let raf = 0;
  function boucle(t) {
    raf = requestAnimationFrame(boucle);
    if (controls.update()) sale = true;
    for (let k = tweens.length - 1; k >= 0; k--) {
      const tw = tweens[k];
      const e = (t - tw.debut) / tw.duree;
      if (e < 0) continue;
      tw.pas(Math.min(1, e));
      sale = true;
      if (e >= 1) tweens.splice(k, 1);
    }
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
      for (const e of ETAPES) for (const l of e.etiquettes || []) extra.push({ steps: [cleDe(e)], kind: 'note', ...l });
      creerEtiquettes(c.etiquettes.concat(extra));
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
    if (root) { for (const o of root.userData.pieces) { o.visible = true; o.position.copy(o.userData.cible); } scene.remove(root); }
    env.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    hote.innerHTML = '';
  };
}
