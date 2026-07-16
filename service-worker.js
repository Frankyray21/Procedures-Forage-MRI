/* Service worker — cache hors-ligne (app shell + données + PDF).
   Stratégie (v68) :
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
const VERSION = 'mri-proc-v129';
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
  './data-english.js',
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
  './quiz-atelier-sec.js',
  './quiz-cadenassage.js',
  './quiz-english.js',
  './quiz-types.js',
  './app.js',
  './sizes.js',
  './vendor/jspdf.umd.min.js',
  './vendor/fonts/barlow-latin-400-normal.woff2',
  './vendor/fonts/barlow-latin-500-normal.woff2',
  './vendor/fonts/barlow-latin-600-normal.woff2',
  './vendor/fonts/barlow-latin-700-normal.woff2',
  './vendor/fonts/barlow-latin-800-normal.woff2',
  './vendor/fonts/barlow-condensed-latin-600-normal.woff2',
  './vendor/fonts/barlow-condensed-latin-700-normal.woff2',
  './vendor/fonts/barlow-condensed-latin-800-normal.woff2',
  './manifest.webmanifest',
  './suivi.html',
  './admin.html',
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
    importScripts('./data.js', './data-diamant.js', './data-securite.js', './data-ith-new.js', './data-english.js', './figures.js', './pages.js');
    // Suffixe ?r=<révision> : un PDF révisé change d'URL → re-téléchargé, et
    // l'ancienne copie est purgée (voir purgeOldRevs). Mêmes URLs que la page.
    const REV = {};
    (self.PROCEDURES || []).forEach((p) => { REV[p.id] = p.date_revision || p.date_creation || ''; });
    const withRev = (u, id) => (REV[id] ? u + '?r=' + encodeURIComponent(REV[id]) : u);
    const list = (self.PROCEDURES || []).map(
      (p) => withRev('./pdf/' + encodeURIComponent(p.id) + '.pdf', p.id)
    );
    list.push('./pdf/centralisateur-dessin.pdf');
    const figs = self.FIGURES || {};
    Object.keys(figs).forEach((id) => {
      (figs[id] || []).forEach((f) => { if (f && f.src) list.push(withRev('./' + f.src, id)); });
    });
    const pages = self.PAGES || {};
    Object.keys(pages).forEach((key) => {
      (pages[key] || []).forEach((src) => { if (src) list.push(withRev('./' + src, key)); });
    });
    return list;
  } catch (err) {
    return [];
  }
}

/* Purge les anciennes révisions d'un fichier (même chemin, ?r= différent). */
function purgeOldRevs(cache, absUrl) {
  return cache.keys().then((ks) => Promise.all(ks.map((k) => {
    const ku = new URL(k.url);
    if (ku.pathname === absUrl.pathname && k.url !== absUrl.href) return cache.delete(k);
    return null;
  }))).catch(() => null);
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
        .then((hit) => (hit ? null :
          cache.add(u).then(() => purgeOldRevs(cache, new URL(u, self.location.href))).catch(() => null)))
        .catch(() => null)
        .then(() => { active--; next(); });
    };
    for (let k = 0; k < 4; k++) next();
  }));
}

/* Installation rapide et fiable : seulement l'app (~2 Mo), pas les 70 Mo de
   médias — eux partent en arrière-plan à l'activation.
   Un échec sur un fichier CRITIQUE (js/css/données) fait échouer l'install :
   le navigateur retentera, plutôt que de déclarer l'app « prête » avec un
   script manquant (= page blanche sous terre). Seuls polices/icônes/logo
   sont tolérés en absence. */
function optional(u) {
  return u.indexOf('/fonts/') >= 0 || u.indexOf('./icons/') === 0 || u.indexOf('logo_roger') >= 0 ||
    u === './suivi.html' || u === './admin.html';
}
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    // Découvre le ?v= courant en lisant index.html : les js/css sont mis en
    // cache SOUS LEUR URL VERSIONNÉE — correspondance exacte ensuite, donc ni
    // fichier périmé servi après un déploiement, ni double téléchargement.
    let v = '';
    const ix = await fetch('./index.html', { cache: 'reload' });
    if (!ix || ix.status !== 200) throw new Error('index.html indisponible');
    const txt = await ix.clone().text();
    const m = txt.match(/\?v=(\d+)/);
    if (m) v = '?v=' + m[1];
    await c.put('./index.html', ix);
    await Promise.all(CORE.map((u) => {
      const vu = (v && /\.(js|css)$/.test(u) && u.indexOf('/vendor/') < 0) ? u + v : u;
      return optional(u) ? c.add(vu).catch(() => null) : c.add(vu);
    }));
  })());
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

  // Navigations / index.html : réseau d'abord — c'est lui qui versionne tout
  // le reste — mais avec un DÉLAI MAXIMAL : en réseau dégradé (une barre de
  // signal), on sert le cache après ~3 s au lieu de geler le lancement ; le
  // fetch continue en arrière-plan et rafraîchit le cache pour la fois suivante.
  if (req.mode === 'navigate' || path === '/' || path.endsWith('/') || /index\.html$/.test(path)) {
    const net = fetch(req, { cache: 'reload' }).then((res) => {
      if (res && res.status === 200) {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
      }
      return res;
    });
    const fromCache = () => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('./index.html'));
    const timer = new Promise((resolve) => setTimeout(() => resolve(null), 3000));
    e.respondWith(
      Promise.race([net.then((r) => (r && r.status === 200 ? r : null)).catch(() => null), timer])
        .then((res) => res || fromCache().then((hit) => hit || net))
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

  // Cache d'abord : réponse instantanée et zéro donnée consommée si déjà là.
  // Pour les fichiers de l'APP, la correspondance ignore le ?v= : le cache
  // VERSION est reconstruit à chaque déploiement, donc './app.js' précaché
  // répond aussi à './app.js?v=213' — sinon chaque fichier serait re-téléchargé
  // au premier lancement de chaque nouvelle version. Les médias gardent la
  // correspondance exacte. Réseau si absent, puis mise en cache. Hors-ligne :
  // repli sur une version précédente du même fichier plutôt que rien.
  e.respondWith(
    caches.match(req).then((hit) => hit ||
      fetch(req).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(cacheName).then((c) =>
            c.put(req, copy).then(() => (isMedia ? purgeOldRevs(c, url) : null))
          );
        }
        return res;
      // Hors-ligne : à défaut de la révision demandée, servir l'ancienne copie
      // du même fichier (?r= différent) plutôt que rien.
      }).catch(() => caches.match(req, { ignoreSearch: true }))
    )
  );
});
