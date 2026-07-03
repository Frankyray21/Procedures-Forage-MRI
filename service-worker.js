/* Service worker — cache hors-ligne (app shell + données + PDF).
   Stratégie (v57) :
   - DEUX caches : l'application (versionné — remplacé à chaque déploiement)
     et les MÉDIAS pdf/images (persistant — les ~70 Mo de PDF et d'images ne
     sont PAS re-téléchargés quand le site est mis à jour).
   - index.html / navigations : RÉSEAU D'ABORD (toujours frais en ligne, cache
     en secours hors-ligne). C'est lui qui porte les ?v=NNN : tout fichier
     modifié change d'URL et est donc re-téléchargé automatiquement.
   - fichiers de l'app (js/css/icônes) : CACHE D'ABORD (réponse instantanée,
     zéro donnée consommée s'ils sont déjà là) ; réseau si absents. Hors-ligne,
     repli sur une version précédente (?v différent) plutôt que rien.
   - médias (pdf/, images/pages/, images/figures/) : cache d'abord, SANS
     revalidation en arrière-plan (grosse économie de données sous terre).
   - fetch(url, {cache:'reload'}) — bouton « Mettre à jour » : réseau forcé.
   - Les médias sont pré-téléchargés en ARRIÈRE-PLAN après l'activation
     (4 à la fois, en sautant ce qui est déjà sur l'appareil) sans bloquer ni
     retarder l'installation. Le bouton « Tout télécharger » de l'accueil
     affiche la liste des fichiers, le volume et le temps estimé. */
const VERSION = 'mri-proc-v60';
const MEDIA = 'mri-media-v1';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './config.js',
  './data.js',
  './data-diamant.js',
  './data-securite.js',
  './data-ith-new.js',
  './pdftext.js',
  './chatbot.js',
  './llm.js',
  './quiz.js',
  './essentiel.js',
  './figures.js',
  './pages.js',
  './quiz_proc.js',
  './quiz-diamant.js',
  './quiz-diamant2.js',
  './quiz-hard3.js',
  './quiz-dd-equip.js',
  './quiz-securite.js',
  './quiz-ith-new.js',
  './quiz-types.js',
  './app.js',
  './sizes.js',
  './manifest.webmanifest',
  './images/logo_roger.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

/* Ressources média (PDF + images), dérivées du contenu. data.js fait
   `window.PROCEDURES = [...]` : on fournit un shim `window` (inexistant dans
   un service worker) puis on importe les fichiers — obligatoirement ici, à
   l'évaluation (importScripts est interdit après l'installation). En cas
   d'échec, liste vide : les médias restent mis en cache à la consultation
   ou via le bouton « Tout télécharger ». */
function mediaAssets() {
  try {
    self.window = self;
    importScripts('./data.js', './data-diamant.js', './data-securite.js', './data-ith-new.js', './figures.js', './pages.js');
    const list = (self.PROCEDURES || []).map(
      (p) => './pdf/' + encodeURIComponent(p.id) + '.pdf'
    );
    list.push('./pdf/centralisateur-dessin.pdf');
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
const MEDIA_LIST = mediaAssets();

/* Pré-téléchargement des médias : 4 requêtes à la fois, en sautant ce qui est
   déjà en cache — une interruption reprend donc là où elle s'était arrêtée. */
function precacheMedia() {
  if (!MEDIA_LIST.length) return Promise.resolve();
  return caches.open(MEDIA).then((cache) => new Promise((resolve) => {
    let i = 0, active = 0;
    const next = () => {
      if (i >= MEDIA_LIST.length) { if (active === 0) resolve(); return; }
      const u = MEDIA_LIST[i++]; active++;
      cache.match(u)
        .then((hit) => (hit ? null : cache.add(u).catch(() => null)))
        .catch(() => null)
        .then(() => { active--; next(); });
    };
    for (let k = 0; k < 4; k++) next();
  }));
}

/* Installation rapide et fiable : seulement l'app (~2 Mo), pas les 70 Mo de
   médias — eux partent en arrière-plan à l'activation. */
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(VERSION).then((c) =>
      Promise.all(CORE.map((u) => c.add(u).catch(() => null)))
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== MEDIA).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
  e.waitUntil(precacheMedia());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const path = url.pathname;
  const isMedia = path.includes('/pdf/') || path.includes('/images/pages/') || path.includes('/images/figures/');
  const cacheName = isMedia ? MEDIA : VERSION;

  // Navigations / index.html : réseau d'abord — c'est lui qui versionne tout le reste.
  if (req.mode === 'navigate' || path === '/' || path.endsWith('/') || /index\.html$/.test(path)) {
    e.respondWith(
      fetch(req, { cache: 'reload' }).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // « Mettre à jour » : la page demande explicitement du frais (cache:'reload').
  if (req.cache === 'reload') {
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(cacheName).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true }))
    );
    return;
  }

  // Cache d'abord : réponse instantanée et zéro donnée consommée si déjà là
  // (les URLs de l'app sont versionnées par ?v=, les médias ne changent pas
  // sans redéploiement). Réseau si absent, puis mise en cache. Hors-ligne :
  // repli sur une version précédente du même fichier plutôt que rien.
  e.respondWith(
    caches.match(req).then((hit) => hit ||
      fetch(req).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(cacheName).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true }))
    )
  );
});
