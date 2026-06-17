/* Service worker — cache hors-ligne (app shell + données + PDF).
   Stratégie :
   - data.js / config.js / pages : RÉSEAU D'ABORD (toujours frais en ligne,
     cache en secours hors-ligne) → les modifications de contenu s'affichent
     immédiatement après rechargement.
   - autres ressources (css, js, icônes, logo, PDF) : cache d'abord, puis mise
     à jour en arrière-plan.
   - PDF, FIGURES et documents : désormais PRÉ-TÉLÉCHARGÉS automatiquement
     dès l'installation (plus besoin d'attendre une première consultation ni
     de cliquer sur « Tout télécharger »). Les listes sont construites à
     partir de data.js (PDF) et figures.js (images) pour rester synchronisées
     avec le contenu. L'app est ainsi entièrement consultable hors-ligne. */
const VERSION = 'mri-proc-v40';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './config.js',
  './data.js',
  './data-diamant.js',
  './data-outils.js',
  './pdftext.js',
  './chatbot.js',
  './quiz.js',
  './formation.js',
  './essentiel.js',
  './figures.js',
  './pages.js',
  './quiz_proc.js',
  './app.js',
  './manifest.webmanifest',
  './images/logo_roger.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

/* Ressources média à pré-télécharger (PDF + figures), dérivées du contenu.
   data.js fait `window.PROCEDURES = [...]` et figures.js `window.FIGURES = {}`
   : on fournit un shim `window` (inexistant dans un service worker) puis on
   importe les fichiers. En cas d'échec (hors-ligne au moment de
   l'installation), on retombe sur une liste vide — les ressources restent
   alors mises en cache à la première consultation. */
function mediaAssets() {
  try {
    self.window = self;
    importScripts('./data.js', './data-diamant.js', './data-outils.js', './figures.js', './pages.js');
    const list = (self.PROCEDURES || []).map(
      (p) => './pdf/' + encodeURIComponent(p.id) + '.pdf'
    );
    list.push('./pdf/centralisateur-dessin.pdf');
    // Fiches d'analyse SST des outils (JSA-SYN-01 … 11)
    const outils = self.OUTILS || {};
    Object.keys(outils).forEach((id) => { list.push('./pdf/' + encodeURIComponent(id) + '.pdf'); });
    const figs = self.FIGURES || {};
    Object.keys(figs).forEach((id) => {
      (figs[id] || []).forEach((f) => { if (f && f.src) list.push('./' + f.src); });
    });
    const pages = self.PAGES || {};
    Object.keys(pages).forEach((key) => {
      (pages[key] || []).forEach((src) => { if (src) list.push('./' + src); });
    });
    return list;
  } catch (err) {
    return [];
  }
}
const MEDIA = mediaAssets();

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(VERSION).then((c) =>
      Promise.all(CORE.concat(MEDIA).map((u) => c.add(u).catch(() => null)))
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const netFirst = req.mode === 'navigate' ||
    url.pathname === '/' ||
    /\/(index\.html|app\.js|styles\.css|data\.js|config\.js|quiz\.js|formation\.js|essentiel\.js|figures\.js|quiz_proc\.js)$/.test(url.pathname);

  // Réseau d'abord pour l'app shell et les données (déjà versionnés par ?v=NNN,
  // donc toujours frais après un déploiement). Cache en secours hors-ligne.
  if (netFirst) {
    e.respondWith(
      fetch(req, { cache: 'reload' }).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Cache d'abord (réponse INSTANTANÉE), mise à jour en arrière-plan.
  // Les PDF et les images suivent cette stratégie : une fois en cache, ils
  // s'affichent immédiatement hors-ligne ou en réseau faible (sous terre),
  // sans attendre le réseau. Le bouton « Mettre à jour » force le rafraîchissement.
  e.respondWith(
    caches.open(VERSION).then((cache) =>
      cache.match(req).then((cached) => {
        const network = fetch(req).then((res) => {
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    )
  );
});
