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
import { clone as clonerSquelette } from '../vendor/three/SkeletonUtils.js';
// Textes et cadrages : même numéro de version que ce module (app.js le charge
// avec le ?v= du site), pour qu'une correction de texte arrive avec le déploiement.
const V = new URL(import.meta.url).searchParams.get('v') || '0';
const { ETAPES } = await import('./etapes.js?v=' + V);

const MODELE = 'plancher.glb?v=26';
const ETIQUETTES = 'plancher-etiquettes.json?v=26';
// Foreuse STM-1500 allégée (pieces-3d : scripts/export-stm-app.mjs), posée sur le plancher ;
// chargée seulement à l'écran qui la montre (étape 18), puis gardée.
const FOREUSE = 'stm1500.glb?v=9';
let foreuse = null;
function chargerForeuse() {
  if (!foreuse) foreuse = new Promise((resolve, reject) => {
    new GLTFLoader().load(new URL(FOREUSE, base).href, (g) => resolve(g.scene), undefined, reject);
  });
  return foreuse;
}
// Travailleur réaliste (avatar Ready Player Me des exemples three.js), habillé en mineur dans l'app
// (casque, lampe frontale, veste haute visibilité, bottes) et posé par cinématique inverse ;
// chargé seulement aux écrans qui en montrent.
const TRAVAILLEUR = 'travailleur.glb?v=1';
let travailleur = null;
function chargerTravailleur() {
  if (!travailleur) travailleur = new Promise((resolve, reject) => {
    new GLTFLoader().load(new URL(TRAVAILLEUR, base).href, (g) => resolve(g.scene), undefined, reject);
  });
  return travailleur;
}
function habiller(m) {
  const os = {};
  m.traverse((o) => { if (o.isBone) os[o.name] = o; });
  m.userData.os = os;
  m.updateMatrixWorld(true);
  const bleu = new THREE.MeshStandardMaterial({ color: 0x24324f, roughness: 0.85 });
  m.traverse((o) => {
    if (!o.isMesh) return;
    o.frustumCulled = false;
    if (/Headwear/.test(o.name)) o.visible = false;           // chapeau d'origine
    if (/Outfit_(Top|Bottom)/.test(o.name)) o.material = bleu;  // habit de travail
    if (/Footwear/.test(o.name)) o.material = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.6 });   // bottes
  });
  const v = new THREE.Vector3();
  const casque = new THREE.Group();
  const jaune = new THREE.MeshStandardMaterial({ color: 0xf3c316, roughness: 0.45 });
  const calotte = new THREE.Mesh(new THREE.SphereGeometry(0.118, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), jaune); calotte.scale.set(1, 0.95, 1.12);
  const bord = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.012, 28), jaune); bord.scale.set(1, 1, 1.18); bord.position.set(0, 0.004, 0.012);
  const lampe = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.03, 14), new THREE.MeshStandardMaterial({ color: 0x222222 }));
  lampe.rotation.x = Math.PI / 2; lampe.position.set(0, 0.05, 0.13);
  const verre = new THREE.Mesh(new THREE.CircleGeometry(0.017, 14), new THREE.MeshBasicMaterial({ color: 0xfff6d0 })); verre.position.set(0, 0.05, 0.146);
  casque.add(calotte, bord, lampe, verre);
  os.HeadTop_End.getWorldPosition(v); casque.position.set(v.x, v.y - 0.115, v.z - 0.005);
  m.add(casque); m.updateMatrixWorld(true); os.Head.attach(casque);
  const veste = new THREE.Group();
  const orange = new THREE.MeshStandardMaterial({ color: 0xff6f0f, roughness: 0.7, side: THREE.DoubleSide });
  const bande = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, emissive: 0x777777, roughness: 0.3, side: THREE.DoubleSide });
  const tronc = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.178, 0.44, 28, 1, true), orange); tronc.scale.set(1.08, 1, 0.9);
  veste.add(tronc);
  for (const y of [-0.08, 0.05]) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.193, 0.19, 0.035, 28, 1, true), bande); b.scale.set(1.09, 1, 0.91); b.position.y = y; veste.add(b); }
  os.Spine1.getWorldPosition(v); veste.position.set(v.x, v.y + 0.04, v.z + 0.02);
  m.add(veste); m.updateMatrixWorld(true); os.Spine1.attach(veste);
  m.userData.repos = new Map();
  m.traverse((o) => { if (o.isBone) m.userData.repos.set(o, [o.quaternion.clone(), o.position.clone()]); });
  return m;
}
/* Poses par cinématique inverse à deux os (bras, jambes), dans le repère du personnage (il regarde
   +Z) : « debout », « marche » (phase en tours), « porter » (6 × 6 sur l'épaule droite, en marchant),
   « genoux ». */
const ikA = new THREE.Vector3(), ikB = new THREE.Vector3(), ikC = new THREE.Vector3(), ikQ = new THREE.Quaternion(), ikW = new THREE.Quaternion(), ikP = new THREE.Quaternion();
function viserOs(os, enfant, cible) {
  os.updateWorldMatrix(true, true);
  os.getWorldPosition(ikA); enfant.getWorldPosition(ikB);
  const v1 = ikB.sub(ikA).normalize(), v2 = cible.clone().sub(ikA).normalize();
  ikQ.setFromUnitVectors(v1, v2);
  os.getWorldQuaternion(ikW); os.parent.getWorldQuaternion(ikP);
  os.quaternion.copy(ikP.invert().multiply(ikQ.multiply(ikW)));
  os.updateWorldMatrix(false, true);
}
function ik2(b1, b2, b3, cible, pole) {
  b1.updateWorldMatrix(true, true);
  const A = b1.getWorldPosition(new THREE.Vector3()), B = b2.getWorldPosition(ikB), C = b3.getWorldPosition(ikC);
  const a = A.distanceTo(B), b = B.distanceTo(C);
  const AT = cible.clone().sub(A), d = Math.min(Math.max(AT.length(), Math.abs(a - b) + 1e-3), a + b - 1e-3), n = AT.normalize();
  const x = (a * a - b * b + d * d) / (2 * d), h = Math.sqrt(Math.max(0, a * a - x * x));
  const p = pole.clone().sub(n.clone().multiplyScalar(n.dot(pole))).normalize();
  viserOs(b1, b2, A.clone().add(n.clone().multiplyScalar(x)).add(p.multiplyScalar(h)));
  viserOs(b2, b3, A.clone().add(n.multiplyScalar(d)));
}
function poserTravailleur(m, pose, phase = 0, opt = {}) {
  const os = m.userData.os;
  for (const [o, [q, p]] of m.userData.repos) { o.quaternion.copy(q); o.position.copy(p); }
  m.updateMatrixWorld(true);
  const L = (x, y, z) => m.localToWorld(new THREE.Vector3(x, y, z));
  const wq = m.getWorldQuaternion(new THREE.Quaternion());
  const D = (x, y, z) => new THREE.Vector3(x, y, z).applyQuaternion(wq);
  const bras = (s, main, pole) => { const c = s < 0 ? 'Right' : 'Left'; ik2(os[c + 'Arm'], os[c + 'ForeArm'], os[c + 'Hand'], main, pole || D(s * 0.3, -0.2, -1)); };
  const jambe = (s, pied, pole) => { const c = s < 0 ? 'Right' : 'Left'; ik2(os[c + 'UpLeg'], os[c + 'Leg'], os[c + 'Foot'], pied, pole || D(0, 0, 1)); };
  if (pose === 'genoux') {
    os.Hips.position.y -= 0.42 / Math.max(1e-6, os.Hips.parent.getWorldScale(ikA).y); m.updateMatrixWorld(true);
    jambe(1, L(0.1, 0.12, 0.42)); jambe(-1, L(-0.1, 0.1, -0.35), D(0, -0.2, 1));
    bras(1, L(0.18, 0.35, 0.5)); bras(-1, L(-0.12, 0.3, 0.55));
    return;
  }
  if (pose === 'accroupi') {
    // Soulever avec les jambes : dos droit, genoux pliés, la charge près du corps (opt.a : profondeur 0 à 1).
    const a = opt.a ?? 1;
    os.Hips.position.y -= (0.48 * a) / Math.max(1e-6, os.Hips.parent.getWorldScale(ikA).y); m.updateMatrixWorld(true);
    jambe(1, L(0.14, 0.1, 0.08)); jambe(-1, L(-0.14, 0.1, -0.06));
    if (opt.main) { bras(-1, opt.main.clone(), D(-1, 0, -0.3)); bras(1, opt.main2 || opt.main.clone(), D(1, 0, -0.3)); }
    return;
  }
  const pas = pose === 'debout' || pose === 'travail' ? 0 : 0.28, s1 = Math.sin(phase * Math.PI * 2);
  for (const s of [1, -1]) {
    const lev = pose === 'debout' ? 0 : Math.max(0, s * Math.cos(phase * Math.PI * 2)) * 0.09;
    jambe(s, L(s * 0.1, 0.1 + lev, s * s1 * pas));
  }
  if (pose === 'travail' && opt.main) {
    // Mains au point de travail (entre la taille et les coudes), dos droit.
    bras(1, opt.main.clone().add(D(0.12, 0, 0)), D(0.6, -1, 0)); bras(-1, opt.main.clone().add(D(-0.12, 0, 0)), D(-0.6, -1, 0));
    return;
  }
  if (pose === 'porter') { bras(-1, L(-0.2, 1.62, 0.22), D(-1, -0.6, 0)); bras(1, L(0.22, 0.85, -s1 * 0.12)); }
  else { const sw = pose === 'debout' ? 0 : 0.15; bras(1, L(0.2, 0.86, 0.04 - s1 * sw)); bras(-1, L(-0.2, 0.86, 0.04 + s1 * sw)); }
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
        '<button type="button" class="p3d-num" aria-haspopup="dialog" aria-label="Voir toutes les étapes" style="display:inline-flex;align-items:center;gap:4px;background:none;border:0;padding:4px 8px 4px 0;margin-top:.5rem;cursor:pointer;color:inherit;font:inherit"><span></span><svg viewBox="0 0 24 24" width="16" height="16" style="width:16px;height:16px;flex:0 0 16px" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
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
      '<div class="p3d-menu" role="dialog" aria-label="Toutes les étapes" hidden>' +
        '<div class="p3d-menu-t"><b>Toutes les étapes</b><button type="button" class="p3d-menu-x" aria-label="Fermer la liste">✕</button></div>' +
        '<ol class="p3d-menu-l"></ol>' +
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
    $('.p3d-num span').textContent = e.variante ? 'Variante' : e.groupe ? (e.etiquette || 'À savoir') : e.n === 0 ? 'Avant de commencer' : 'Étape ' + e.n + ' sur ' + TOTAL;
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
  renderer.localClippingEnabled = true;   // peinture tracée progressivement (étape 1)
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
      poserForeuse(cf ? cf[casCourant] || cf[1] : { angle: 0, glisse: 0, recul: 0 });
      sale = true;
    }).catch(() => {});
    if (root.userData.trucCoupe) root.userData.trucCoupe.visible = false;
    if (laserG) laserG.visible = false;
    if (clotureG) clotureG.visible = false;
    for (const t of travs) t.visible = false;
    if (poutreDemo) poutreDemo.visible = false;
    majTrav = null;
    if (e.travailleurs) chargerTravailleur().then((g) => {
      if (fini) return;
      while (travs.length < 3) { const t = habiller(clonerSquelette(g)); t.visible = false; scene.add(t); travs.push(t); }
      if (majTrav) majTrav();
    }).catch(() => {});
    planPeinture.constant = 1e3;
    if (cycleS) {
      secondaires(e, anime);
    } else if (cycle) {
      marches(e, anime);
    } else if (anime && grp === 'demantelement' && e.demontage) {
      demonter(e);
    } else if (anime && !v8 && !grp && e.laser) {
      laser(e, frais);
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

  /* Démantèlement, dans l'ordre sécuritaire de la procédure : d'abord le plancher secondaire
     (récupérable) ; puis les planches, du fond de la galerie vers la sortie (on recule toujours sur du
     plancher encore en place), tire-fonds à mesure, chaque garde-corps et les marches seulement avec les
     planches qu'ils protègent (jamais de bord sans protection) ; puis les 6 × 6, soutiens et blocages,
     de la sortie vers le fond, sur le sol déjà dégagé : on n'enjambe jamais le bois (grosses pièces :
     toujours à deux) ; enfin la clôture orange et la carte de ruban rouge devant le
     front de taille. Chaque pièce se lève, part vers la sortie (X positif) et disparaît. */
  // Travailleurs (instances habillées, réutilisées d'un écran à l'autre) et 6 × 6 porté à deux.
  const travs = [];
  let poutreDemo = null, majTrav = null;
  const rayS = new THREE.Raycaster(), hautS = new THREE.Vector3(), basS = new THREE.Vector3(0, -1, 0);
  function solSous(x, z) {   // dessus de ce qui est visible sous (x, z) : sol, bois encore en place
    hautS.set(x, 3, z); rayS.set(hautS, basS);
    const h = rayS.intersectObject(root, true).find((i) => { for (let q = i.object; q; q = q.parent) if (!q.visible) return false; return !i.object.isLineSegments2 && !i.object.userData.d; });
    return h ? h.point.y : 0;
  }
  function placer(t, x, y, z, ry, pose, phase, opt) {
    t.visible = true; t.position.set(x, y, z); t.rotation.set(0, ry, 0);
    t.updateMatrixWorld(true);
    poserTravailleur(t, pose, phase, opt);
  }
  let clotureG = null;
  function demonter(e) {
    const T = e.demontage.t, t0 = horloge;
    animT0 = t0;
    const vus = root.userData.pieces.filter((o) => o.visible && o.userData.s >= 3);
    const c = (o) => o.userData.centre;
    const parX = (a, b) => (Math.abs(c(a)[0] - c(b)[0]) > 0.05 ? c(a)[0] - c(b)[0] : c(b)[1] - c(a)[1]);
    const A = vus.filter((o) => o.userData.s === 18).sort((a, b) => c(b)[1] - c(a)[1]);
    const B = vus.filter((o) => [6, 7, 12, 13, 14, 15, 16].includes(o.userData.s)).sort(parX);
    const C = vus.filter((o) => !A.includes(o) && !B.includes(o)).sort((a, b) => -parX(a, b) || c(b)[1] - c(a)[1]);   // de la sortie vers le fond
    const plan = new Map();
    for (const [liste, [a, b]] of [[A, T.a], [B, T.b], [C, T.c]]) {
      const pas = liste.length > 1 ? (b - a - 600) / (liste.length - 1) : 0;
      liste.forEach((o, k) => plan.set(o, a + k * pas));
    }
    // Clôture orange et carte de ruban rouge devant le front de taille (trou non arpenté, non cimenté).
    if (!clotureG) {
      clotureG = new THREE.Group();
      const orange = new THREE.MeshStandardMaterial({ color: 0xff6a00, roughness: 0.7, transparent: true, opacity: 0.85, side: THREE.DoubleSide });
      const bois = new THREE.MeshStandardMaterial({ color: 0x6e6e6e, roughness: 0.6 });
      const ray = new THREE.Raycaster(), haut = new THREE.Vector3(), bas = new THREE.Vector3(0, -1, 0);
      const sol = (x, z) => {
        haut.set(x, 3, z); ray.set(haut, bas);
        const h = ray.intersectObject(root, true).find((i) => { for (let q = i.object; q; q = q.parent) if (!q.visible) return false; return !i.object.isLineSegments2; });
        return h ? h.point.y : 0;
      };
      const zs = [-1.9, -0.95, 0, 0.95, 1.9], X = 0.75;
      clotureG.userData.sol = sol;
      clotureG.userData.poser = () => {
        while (clotureG.children.length) clotureG.remove(clotureG.children[0]);
        const ys = zs.map((z) => sol(X, z));
        zs.forEach((z, i) => {
          const pq = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.25, 8), bois);
          pq.position.set(X, ys[i] + 0.5, z); clotureG.add(pq);
          if (i) {
            const w = z - zs[i - 1], y0 = (ys[i] + ys[i - 1]) / 2;
            const filet = new THREE.Mesh(new THREE.PlaneGeometry(w, 1.0, 1, 1), orange);
            filet.rotation.y = Math.PI / 2; filet.position.set(X, y0 + 0.55, (z + zs[i - 1]) / 2); clotureG.add(filet);
          }
        });
        const carte = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.2, 0.28), new THREE.MeshStandardMaterial({ color: 0xd8141a, roughness: 0.6 }));
        carte.position.set(X + 0.03, ys[2] + 0.85, 0.45); clotureG.add(carte);
      };
      scene.add(clotureG);
    }
    let pose = false;
    function etat(t) {
      for (const [o, d] of plan) {
        const p = Math.min(1, Math.max(0, (t - d) / 600));
        o.position.copy(o.userData.cible);
        o.visible = p < 1;
        o.position.y += 0.45 * lisse(Math.min(1, p * 2));
        o.position.x += 1.4 * lisse(Math.max(0, p * 2 - 1));
      }
      // Travailleurs : à genoux au bord des planches qui restent (ils reculent vers la sortie) ;
      // puis deux qui portent un 6 × 6 sur l'épaule, sur le sol déjà dégagé, vers la sortie.
      if (travs.length) {
        for (const tr of travs) tr.visible = false;
        if (poutreDemo) poutreDemo.visible = false;
        if (t >= T.b[0] && t < T.b[1]) {
          let xf = 0;
          for (const o of B) if (t >= plan.get(o)) xf = Math.max(xf, c(o)[0]);
          placer(travs[0], Math.min(xf + 0.55, 9.3), 0.2286, -0.6, -Math.PI / 2, 'genoux');
        }
        const p0 = T.c[0] + 0.5 * (T.c[1] - T.c[0]), p1 = T.c[1] - 300;   // une fois la moitié dégagée : rien à enjamber
        if (t >= p0 && t < p1) {
          if (!poutreDemo) {
            poutreDemo = new THREE.Mesh(new THREE.BoxGeometry(4.75, 0.14, 0.14), new THREE.MeshStandardMaterial({ color: 0xb98a56, roughness: 0.85 }));
            scene.add(poutreDemo);
          }
          // D'abord soulever à deux avec les jambes (dos droit, la charge près du corps), puis marcher.
          const lev = 1400, kL = Math.min(1, (t - p0) / lev), k2 = Math.max(0, (t - p0 - lev) / (p1 - p0 - lev));
          const xc = 10.6 + 2.8 * k2, z = 1.25, ph = (xc - 10.6) / 1.12;
          const yA = solSous(xc + 2.05, z), yB = solSous(xc - 2.05, z);
          if (kL < 1) {
            const mon = lisse(Math.max(0, (kL - 0.3) / 0.7));       // la poutre monte, les jambes se déplient
            for (const [i, dx, y] of [[1, 2.05, yA], [2, -2.05, yB]]) {
              const yb = y + 0.07 + (1.6 - 0.07) * mon;
              placer(travs[i], xc + dx, y, z, Math.PI / 2, mon < 0.55 ? 'accroupi' : 'porter', 0,
                { a: 1 - mon / 0.55, main: new THREE.Vector3(xc + dx + 0.12, yb, z + 0.17), main2: new THREE.Vector3(xc + dx - 0.12, yb, z + 0.17) });
            }
            poutreDemo.visible = true;
            poutreDemo.position.set(xc, (yA + yB) / 2 + 0.07 + (1.53) * mon, z + 0.17);
            poutreDemo.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), new THREE.Vector3(4.1, yA - yB, 0).normalize());
          } else {
          for (const [i, dx] of [[1, 2.05], [2, -2.05]]) placer(travs[i], xc + dx, i === 1 ? yA : yB, z, Math.PI / 2, 'porter', ph + (i === 2 ? 0.5 : 0));
          // Le 6 × 6 repose sur l'épaule droite des deux : il suit la pente du sol entre eux.
          const pA = new THREE.Vector3(xc + 2.05, travs[1].position.y + 1.6, z + 0.17), pB = new THREE.Vector3(xc - 2.05, travs[2].position.y + 1.6, z + 0.17);
          poutreDemo.visible = true;
          poutreDemo.position.addVectors(pA, pB).multiplyScalar(0.5);
          poutreDemo.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), pA.sub(pB).normalize());
          }
        }
      }
      const k = Math.min(1, Math.max(0, (t - T.e[0]) / 900));
      if (k > 0 && !pose) { root.updateMatrixWorld(true); clotureG.userData.poser(); pose = true; }
      clotureG.visible = k > 0;
      clotureG.position.y = 0.6 * Math.pow(1 - lisse(k), 3);
      sale = true;
    }
    etat(0);
    majTrav = () => etat(Math.min(horloge - t0, T.e[1]));
    tweens.push({ pose: true, debut: t0, duree: T.e[1], pas(x) { etat(x * T.e[1]); }, fin() { etat(T.e[1]); } });
  }

  /* Étape 1 : la ligne de référence au laser Bosch. Le laser de ligne est posé au sol au bout du
     plancher, sur la rive ; il projette sa ligne rouge le long de la rive (éventail vertical), puis on
     trace la ligne à la peinture en suivant le laser (la peinture apparaît derrière la canette, plan de
     coupe). La caméra suit de près, puis revient à la vue de l'étape. */
  let laserG = null;
  const planPeinture = new THREE.Plane(new THREE.Vector3(1, 0, 0), 1e3);
  function laser(e, frais) {
    const T = e.laser.t, t0 = horloge;
    animT0 = t0;
    const peinture = frais[0];
    if (!peinture) return;
    surligner(peinture, false);
    peinture.traverse((m) => {
      if (!m.isMesh || m.userData.coupe) return;
      m.material = m.material.clone();
      m.material.clippingPlanes = [planPeinture];
      m.userData.coupe = true;
    });
    // Profil du sol le long de la rive : sommets de la peinture sur la ligne Z = −W/2.
    const Z = e.laser.z, prof = [], v = new THREE.Vector3();
    peinture.updateMatrixWorld(true);
    peinture.traverse((m) => {
      if (!m.isMesh) return;
      const a = m.geometry.attributes.position;
      for (let i = 0; i < a.count; i++) {
        v.fromBufferAttribute(a, i).applyMatrix4(m.matrixWorld);
        if (Math.abs(v.z - Z) < 0.02 && v.y > -2) prof.push([v.x, v.y]);
      }
    });
    prof.sort((p, q) => p[0] - q[0]);
    const solA = (x) => {   // hauteur de la ligne de peinture en x (plus proche sommet)
      let b = prof[0] || [x, 0];
      for (const p of prof) if (Math.abs(p[0] - x) < Math.abs(b[0] - x)) b = p;
      return b[1];
    };
    const [xa, xb] = [prof.length ? prof[0][0] : -0.3, prof.length ? prof[prof.length - 1][0] : 10.05];
    const xl = xb + 0.25, yl = solA(xb);
    if (!laserG) {
      laserG = new THREE.Group();
      const bleu = new THREE.MeshStandardMaterial({ color: 0x0b5a86, metalness: 0.2, roughness: 0.5 });
      const noir = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.7 });
      const verre = new THREE.MeshBasicMaterial({ color: 0xff3b2a });
      const corps = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.11, 0.11), bleu); corps.position.y = 0.085;
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.03, 20), noir); base.position.y = 0.015;
      const tete = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.05, 0.06), verre); tete.position.set(-0.04, 0.1, 0);
      const poignee = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.08), noir); poignee.position.y = 0.15;
      const appareil = new THREE.Group(); appareil.add(corps, base, tete, poignee); appareil.name = 'appareil';
      appareil.scale.setScalar(1.6);   // un peu plus gros que nature, pour bien le voir
      // Faisceau : ligne au sol (rouge vif) et éventail vertical, construits de la tête vers la peinture.
      const n = 60, ligne = new Float32Array((n + 1) * 3), evt = new Float32Array(n * 9);
      const gL = new THREE.BufferGeometry(); gL.setAttribute('position', new THREE.BufferAttribute(ligne, 3));
      const gE = new THREE.BufferGeometry(); gE.setAttribute('position', new THREE.BufferAttribute(evt, 3));
      const trait = new THREE.Line(gL, new THREE.LineBasicMaterial({ color: 0xff2a1a }));
      const eventail = new THREE.Mesh(gE, new THREE.MeshBasicMaterial({ color: 0xff2a1a, transparent: true, opacity: 0.14, side: THREE.DoubleSide, depthWrite: false }));
      const bombe = new THREE.Group();
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.033, 0.033, 0.2, 16), new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.4 }));
      const bouchon = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.03, 12), new THREE.MeshStandardMaterial({ color: 0xff3d1f, roughness: 0.5 }));
      cyl.position.y = 0.1; bouchon.position.y = -0.015; bombe.add(cyl, bouchon); bombe.rotation.z = 0.35;
      laserG.add(appareil, trait, eventail, bombe);
      laserG.userData = { appareil, trait, eventail, bombe, n };
      scene.add(laserG);
    }
    const { appareil, trait, eventail, bombe, n } = laserG.userData;
    appareil.position.set(xl, yl, Z);
    const head = new THREE.Vector3(xl - 0.09, yl + 0.16, Z);
    const sp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    function etat(t) {
      laserG.visible = true;
      appareil.visible = t >= 0;
      appareil.position.y = yl + 0.35 * Math.pow(1 - lisse(sp(t, 0, T.pose)), 3);
      // Faisceau qui s'allonge de la tête vers le bout de la galerie (X petit).
      const k = lisse(sp(t, T.pose, T.faisceau)), xf = xl - 0.06 - k * (xl - 0.06 - (xa - 0.25));
      const L = trait.geometry.attributes.position.array, E = eventail.geometry.attributes.position.array;
      for (let i = 0; i <= n; i++) { const x = xl - 0.06 + (xf - xl + 0.06) * (i / n); L[3 * i] = x; L[3 * i + 1] = solA(x) + 0.004; L[3 * i + 2] = Z; }
      for (let i = 0; i < n; i++) {
        E.set([head.x, head.y, head.z, L[3 * i], L[3 * i + 1], Z, L[3 * i + 3], L[3 * i + 4], Z], 9 * i);
      }
      trait.visible = eventail.visible = k > 0;
      trait.geometry.attributes.position.needsUpdate = true; eventail.geometry.attributes.position.needsUpdate = true;
      trait.geometry.computeBoundingSphere(); eventail.geometry.computeBoundingSphere();
      // Peinture : la bombe suit la ligne du laser, du laser vers le front de taille.
      const kp = sp(t, T.peinture, T.fin), xp = xb + 0.3 - kp * (xb + 0.3 - (xa - 0.1));
      planPeinture.constant = kp <= 0 ? -1e3 : kp >= 1 ? 1e3 : -xp;
      bombe.visible = kp > 0 && kp < 1;
      bombe.position.set(xp, solA(xp) + 0.12, Z + 0.06);
      sale = true;
    }
    etat(0);
    tweens.push({ pose: true, debut: t0, duree: T.fin + T.reste, pas(x) { etat(x * (T.fin + T.reste)); }, fin() { etat(T.fin + T.reste); } });
    // Caméra : près du laser, puis le long de la ligne, puis la vue de l'étape.
    let c1 = false, c2 = false;
    tweens.push({ pose: true, debut: t0, duree: 1, pas() { if (!c1) { c1 = true; allerA(e.laser.cam); } }, fin() {} });
    let c3 = false;
    tweens.push({ pose: true, debut: t0 + T.peinture, duree: 1, pas() { if (!c2) { c2 = true; allerA(e.laser.cam2); } }, fin() {} });
    tweens.push({ pose: true, debut: t0 + T.fin, duree: 1, pas() { if (!c3) { c3 = true; allerA(e.cam); } }, fin() {} });
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

  /* Pose de la STM-1500 (stm1500.glb : nœud « stm1500 » posé sur le plancher, l'avant vers le front
     de taille ; groupes stm-fixe, stm-support à l'axe de bascule arrière, stm-poutre enfant du
     support, dans le repère du modèle : +X vers l'avant, Y vers le haut) : recul du traîneau sur
     son axe, glisse de la poutre le long de l'avance, bascule de l'avance vers le haut. */
  const avantF = new THREE.Vector3();
  function poserForeuse(p) {
    if (!stm) return;
    const pose = stm.getObjectByName('stm1500') || stm;
    const sup = stm.getObjectByName('stm-support'), pou = stm.getObjectByName('stm-poutre');
    avantF.set(1, 0, 0).applyQuaternion(pose.quaternion);
    stm.position.copy(avantF).multiplyScalar(-(p.recul || 0));
    if (sup) sup.rotation.z = (p.angle * Math.PI) / 180;
    if (pou) pou.position.x = p.glisse;
    deformerSouples(sup, pou);
    poserJambes(p.angle > 3);
    sale = true;
  }
  /* Boyaux et câble du treuil (groupe stm-souple, repère du modèle) : chaque sommet suit le traîneau,
     le support ou la poutre selon son attribut « _poids » (part du support, part de la poutre), pour
     rester raccordé quand l'avance glisse et bascule. */
  let souples = null, pivot0 = null;
  const mS = new THREE.Matrix4(), mP = new THREE.Matrix4(), mT = new THREE.Matrix4(), vA = new THREE.Vector3(), vS = new THREE.Vector3(), vP = new THREE.Vector3();
  function deformerSouples(sup, pou) {
    if (!sup || !pou) return;
    if (!souples) {
      souples = [];
      stm.getObjectByName('stm-souple')?.traverse((o) => {
        const g = o.geometry;
        if (o.isMesh && g.attributes._poids) souples.push({ g, base: g.attributes.position.array.slice(), w: g.attributes._poids.array });
      });
      pivot0 = sup.position.clone();
    }
    sup.updateMatrix(); pou.updateMatrix();
    mT.makeTranslation(-pivot0.x, -pivot0.y, -pivot0.z);
    mS.multiplyMatrices(sup.matrix, mT);
    mP.multiplyMatrices(sup.matrix, pou.matrix).multiply(mT);
    for (const s of souples) {
      const a = s.g.attributes.position.array, b = s.base, w = s.w;
      for (let k = 0, n = b.length / 3; k < n; k++) {
        const ws = w[2 * k], wp = w[2 * k + 1], wf = 1 - ws - wp;
        vA.set(b[3 * k], b[3 * k + 1], b[3 * k + 2]);
        vS.copy(vA).applyMatrix4(mS); vP.copy(vA).applyMatrix4(mP);
        a[3 * k] = wf * vA.x + ws * vS.x + wp * vP.x;
        a[3 * k + 1] = wf * vA.y + ws * vS.y + wp * vP.y;
        a[3 * k + 2] = wf * vA.z + ws * vS.z + wp * vP.z;
      }
      s.g.attributes.position.needsUpdate = true;
      s.g.computeBoundingSphere();
    }
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
    const mix = (a, b, k) => ({ angle: a.angle + (b.angle - a.angle) * k, glisse: a.glisse + (b.glisse - a.glisse) * k, recul: a.recul + (b.recul - a.recul) * k });
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
      // Travailleur à l'arrière de la tête de forage, face à la foreuse, debout sur le plancher
      // (principal au cas 1, secondaire une fois posé aux autres cas).
      if (travs.length && e.trav) {
        const lc = parCas.get(n) || [], q = e.trav[n];
        const prete = lc.length ? Math.max(...lc.map((o) => C.sol + 200 + rangs.indexOf(o.userData.m) * C.pas)) + 450 : C.sol;
        if (q && tl >= prete) placer(travs[0], q.p[0], q.p[1], q.p[2], Math.PI, 'travail', 0, { main: new THREE.Vector3(...q.main) });
        else travs[0].visible = false;
      }
      sale = true;
    }
    majTrav = () => etat(Math.min(horloge - t0, C.cas.length * C.duree));
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

  /* Liste de toutes les étapes (touche « Étape N sur 18 ») : aller directement à une étape. */
  const menu = $('.p3d-menu'), liste = $('.p3d-menu-l');
  const nomEcran = (e) => (e.variante ? 'Variante' : e.groupe ? (e.etiquette || 'À savoir') : e.n === 0 ? 'Avant de commencer' : 'Étape ' + e.n);
  function ouvrirMenu() {
    liste.replaceChildren(...ETAPES.map((e, i) => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'p3d-menu-i' + (i === idx ? ' p3d-ici' : '') + (e.variante || (e.groupe && e.groupe !== 'secondaire') ? ' p3d-sous' : '');
      const n = document.createElement('span'); n.textContent = nomEcran(e);
      const t = document.createElement('b'); t.textContent = e.n === 0 ? 'Inspection et matériel de sécurité' : e.titre;
      b.append(n, t);
      b.addEventListener('click', () => { fermerMenu(); etape(i); });
      li.append(b);
      return li;
    }));
    menu.hidden = false;
    const ici = liste.querySelector('.p3d-ici');
    if (ici) ici.scrollIntoView({ block: 'center' });
  }
  function fermerMenu() { menu.hidden = true; }
  $('.p3d-num').addEventListener('click', ouvrirMenu);
  $('.p3d-menu-x').addEventListener('click', fermerMenu);
  bPrev.addEventListener('click', () => etape(idx - 1));
  bNext.addEventListener('click', () => etape(idx + 1));
  function clavier(e) {
    if (e.key === 'ArrowRight') etape(idx + 1);
    else if (e.key === 'ArrowLeft') etape(idx - 1);
    else if (e.key === 'Escape') { if (!menu.hidden) fermerMenu(); else if (fermer) fermer(); }
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
