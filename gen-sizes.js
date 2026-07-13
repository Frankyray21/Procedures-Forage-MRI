/* Génère sizes.js — manifeste des tailles de fichiers pour l'estimation du
   téléchargement hors-ligne. À relancer après tout ajout/retrait de PDF ou
   d'images :  node gen-sizes.js  */
const fs = require('fs');
const path = require('path');
const root = __dirname;
const out = {};
const rootFiles = ['index.html', 'styles.css', 'manifest.webmanifest', 'config.js', 'data.js',
  'data-diamant.js', 'data-securite.js', 'data-ith-new.js', 'quiz.js',
  'essentiel.js', 'figures.js', 'pages.js', 'quiz_proc.js', 'quiz-diamant.js', 'quiz-diamant2.js',
  'quiz-hard3.js', 'quiz-dd-equip.js', 'quiz-securite.js', 'quiz-ith-new.js', 'quiz-atelier-sec.js', 'quiz-cadenassage.js', 'quiz-types.js', 'pdftext.js',
  'llm.js', 'chatbot.js', 'app.js', 'sizes.js'];
function add(rel) {
  try { out[rel] = fs.statSync(path.join(root, rel)).size; } catch (e) {}
}
rootFiles.forEach(add);
function walk(dir) {
  fs.readdirSync(path.join(root, dir), { withFileTypes: true }).forEach((d) => {
    const rel = dir + '/' + d.name;
    if (d.isDirectory()) walk(rel); else add(rel);
  });
}
['pdf', 'images', 'icons'].forEach(walk);
const total = Object.values(out).reduce((a, b) => a + b, 0);
const body = '/* Tailles (octets) des fichiers du site — généré par `node gen-sizes.js`.\n' +
  '   Sert à estimer le volume et le temps du téléchargement hors-ligne. */\n' +
  'window.ASSET_SIZES = {\n' +
  Object.keys(out).sort().map((k) => ' ' + JSON.stringify(k) + ':' + out[k]).join(',\n') +
  '\n};\n';
fs.writeFileSync(path.join(root, 'sizes.js'), body);
console.log(Object.keys(out).length + ' fichiers, ' + (total / 1048576).toFixed(1) + ' Mo -> sizes.js');
