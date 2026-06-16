/* Service worker — cache hors-ligne (app shell + données + PDF consultés).
   Stratégie :
   - data.js / config.js / pages : RÉSEAU D'ABORD (toujours frais en ligne,
     cache en secours hors-ligne) → les modifications de contenu s'affichent
     immédiatement après rechargement.
   - autres ressources (css, js, icônes, logo, PDF) : cache d'abord, puis mise
     à jour en arrière-plan. Les PDF sont mis en cache à la première
     consultation, donc consultables ensuite hors-ligne. */
const VERSION = 'mri-proc-v33';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './config.js',
  './data.js',
  './quiz.js',
  './formation.js',
  './essentiel.js',
  './figures.js',
  './quiz_proc.js',
  './app.js',
  './manifest.webmanifest',
  './images/logo_roger.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(VERSION).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => null))))
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

  const isPDF = /\.pdf$/i.test(url.pathname);
  const netFirst = req.mode === 'navigate' ||
    url.pathname === '/' ||
    /\/(index\.html|app\.js|styles\.css|data\.js|config\.js|quiz\.js|formation\.js|essentiel\.js|figures\.js|quiz_proc\.js)$/.test(url.pathname);

  // Réseau d'abord (avec revalidation) pour l'app shell, les données ET les PDF :
  // un PDF déposé en nouvelle version s'affiche dès le rechargement quand on est
  // en ligne ; le cache sert de secours hors-ligne.
  if (netFirst || isPDF) {
    e.respondWith(
      fetch(req, { cache: isPDF ? 'no-cache' : 'reload' }).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req).then((r) => r || (isPDF ? undefined : caches.match('./index.html'))))
    );
    return;
  }

  // stale-while-revalidate
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
