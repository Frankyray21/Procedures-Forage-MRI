#!/usr/bin/env node
/* ===========================================================================
   APK — ASSEMBLAGE DU CONTENU EMBARQUÉ (node apk/build-www.js)

   Construit apk/www/ (le webDir de Capacitor) à partir du site :
   - copie l'app (js/css), les médias (images, pdf), vendor et icônes ;
   - transforme index.html : plus de service worker (l'app EST le cache),
     les <script> statiques sont remplacés par apk-env.js + apk-boot.js
     (chargeur avec surcharge de mise à jour, voir apk/src/apk-boot.js) ;
   - génère apk-env.js : version embarquée, liste ordonnée des scripts,
     inventaire des médias embarqués (détection « nouveaux médias » côté
     mise à jour à chaud).

   La CI l'exécute avant `npx cap sync android` puis compile l'APK.
   =========================================================================== */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const WWW = path.join(__dirname, 'www');

function rmrf(p) { fs.rmSync(p, { recursive: true, force: true }); }
function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }
function copyFile(rel) {
  const src = path.join(ROOT, rel), dst = path.join(WWW, rel);
  mkdirp(path.dirname(dst));
  fs.copyFileSync(src, dst);
}
function copyDir(rel) {
  const src = path.join(ROOT, rel);
  if (!fs.existsSync(src)) return;
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const r = path.join(rel, e.name);
    if (e.isDirectory()) copyDir(r);
    else copyFile(r);
  }
}
function listFiles(rel, out) {
  const src = path.join(ROOT, rel);
  if (!fs.existsSync(src)) return out;
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const r = rel + '/' + e.name;
    if (e.isDirectory()) listFiles(r, out);
    else out.push(r);
  }
  return out;
}

rmrf(WWW);
mkdirp(WWW);

/* ---- index.html : version, liste des scripts, transformation ---- */
let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const mV = html.match(/\?v=(\d+)/);
if (!mV) { console.error('index.html : ?v= introuvable'); process.exit(1); }
const V = parseInt(mV[1], 10);
const mName = html.match(/>v(\d+\.\d+)</);
const NAME = mName ? 'v' + mName[1] : 'v' + V;

const scripts = [];
const scriptTagRe = /<script src="([^"?]+\.js)\?v=\d+" defer><\/script>\s*/g;
let m;
while ((m = scriptTagRe.exec(html))) scripts.push(m[1]);
if (scripts.length < 10) { console.error('index.html : liste de scripts suspecte (' + scripts.length + ')'); process.exit(1); }

// Remplace le BLOC de scripts statiques par env + boot (une seule fois).
let replaced = false;
html = html.replace(scriptTagRe, () => {
  if (replaced) return '';
  replaced = true;
  return '<script src="apk-env.js?v=' + V + '"></script>\n<script src="apk-boot.js?v=' + V + '"></script>\n';
});
// Retire l'enregistrement du service worker : dans l'app, le contenu est
// embarqué — un SW ne ferait que consommer des données en double.
html = html.replace(/if \('serviceWorker' in navigator\) \{[\s\S]*?\n\}\n/, '');
// Retire les liens sans objet dans l'app : « Mettre à jour les PDF »
// (admin.html a besoin du serveur) et « App Android » (on y est déjà).
html = html.replace(/\s*<a href="admin\.html"[^>]*>[^<]*<\/a>/, '');
html = html.replace(/\s*<a href="apk\.html"[^>]*>[^<]*<\/a>/, '');
// Le filet « Problème de chargement » d'index.html parle de réseau — faux
// dans l'app (tout est local) : message adapté, et délai porté à 12 s pour
// laisser le filet d'apk-boot (9 s : purge de l'override + redémarrage)
// agir en premier.
html = html.replace('Problème de chargement — vérifie le réseau puis recharge la page.',
  "Problème de démarrage — ferme complètement l'app puis rouvre-la.");
html = html.replace('}, 8000);', '}, 12000);');
fs.writeFileSync(path.join(WWW, 'index.html'), html);

/* ---- fichiers de l'app ---- */
const extraFiles = ['styles.css', 'manifest.webmanifest', 'suivi.html', 'qr-site.svg'];
for (const f of scripts.concat(extraFiles)) copyFile(f);
// suivi.html : mêmes retraits (admin + service worker n'existent pas ici).
{
  const p = path.join(WWW, 'suivi.html');
  let s = fs.readFileSync(p, 'utf8');
  s = s.replace(/\s*<a class="home" href="admin\.html">[^<]*<\/a>/, '');
  fs.writeFileSync(p, s);
}

/* ---- médias et ressources ---- */
for (const d of ['vendor', 'icons', 'images', 'pdf']) copyDir(d);

/* ---- couche APK ---- */
copySrc('apk-boot.js');
copySrc('apk-update.js');
function copySrc(name) {
  fs.copyFileSync(path.join(__dirname, 'src', name), path.join(WWW, name));
}

/* ---- apk-env.js : identité du build + inventaire ---- */
// TOUT images/ et pdf/ (pas seulement pages/figures) : la détection de
// « nouveaux médias » côté apk-update.js compare au même périmètre.
const mediaSet = {};
for (const d of ['images', 'pdf']) {
  for (const f of listFiles(d, [])) mediaSet[f] = 1;
}
const files = scripts.concat(['apk-update.js']);
fs.writeFileSync(path.join(WWW, 'apk-env.js'),
  '/* Généré par apk/build-www.js — identité du contenu embarqué. */\n' +
  'window.IS_APK = true;\n' +
  'window.APK_BUILD = ' + JSON.stringify({ v: V, name: NAME, files: files, css: 'styles.css', mediaSet: mediaSet }) + ';\n');

const nMedia = Object.keys(mediaSet).length;
console.log('apk/www assemblé : ' + NAME + ' (?v=' + V + ') · ' + scripts.length + ' scripts · ' + nMedia + ' médias');
