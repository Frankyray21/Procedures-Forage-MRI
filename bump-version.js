#!/usr/bin/env node
/* Synchronise les trois numéros de version du site en une commande :
     node bump-version.js
   - index.html : tous les « ?v=NNN » (cache-busting des fichiers)
   - index.html : le « vX.YY » affiché au pied de page (+ date du jour)
   - service-worker.js : const VERSION = 'mri-proc-vNN'
   Évite la dérive des compteurs (ils doivent toujours bouger ensemble). */
const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
let sw = fs.readFileSync('service-worker.js', 'utf8');

const vAsset = parseInt((html.match(/\?v=(\d+)/) || [])[1], 10);
const vSite = (html.match(/>v(\d+\.\d+)</) || [])[1];
const vSw = parseInt((sw.match(/VERSION = 'mri-proc-v(\d+)'/) || [])[1], 10);
if (!vAsset || !vSite || !vSw) {
  console.error('Version introuvable (index.html ?v= / vX.YY / service-worker VERSION).');
  process.exit(1);
}

const nAsset = vAsset + 1;
const [maj, min] = vSite.split('.');
const nSite = maj + '.' + String(parseInt(min, 10) + 1).padStart(2, '0');
const nSw = vSw + 1;
const date = new Date().toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' });

html = html.replace(new RegExp('\\?v=' + vAsset, 'g'), '?v=' + nAsset)
  .replace('>v' + vSite + '<', '>v' + nSite + '<')
  .replace(/Version <span class="ver">v[\d.]+<\/span> — [^<]+/,
    'Version <span class="ver">v' + nSite + '</span> — ' + date);
sw = sw.replace("VERSION = 'mri-proc-v" + vSw + "'", "VERSION = 'mri-proc-v" + nSw + "'");

fs.writeFileSync('index.html', html);
fs.writeFileSync('service-worker.js', sw);
console.log('v' + vSite + ' → v' + nSite + '  ·  ?v=' + nAsset + '  ·  SW mri-proc-v' + nSw);
