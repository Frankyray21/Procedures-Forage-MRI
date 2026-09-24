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
     retarder l'installation — mais SEULEMENT si la page ne s'en charge pas
     déjà (voir packOwnedByPage) : elle télécharge les mêmes URLs, et les deux
     à la fois doublerait la facture de données. Le bouton « Tout télécharger »
     de l'accueil affiche la liste des fichiers, le volume et le temps estimé. */
const VERSION = 'mri-proc-v192';
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
  './apk.html',
  './affiche-apk.html',
  './qr-apk.svg',
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

/* La PAGE télécharge elle aussi le pack (Background Fetch app fermée, ou
   pré-chargement premier plan) avec EXACTEMENT les mêmes URLs. Rien ne
   dédoublonne entre les deux : un cache.add() lancé d'ici ne passe pas par le
   handler fetch, et un Background Fetch court-circuite complètement le service
   worker (il ne range ses réponses qu'à la toute fin). Sans arbitrage, la
   première installation tirait les ~162 Mo DEUX FOIS.
   La page revendique donc le pack (message « pack-claim », renouvelé toutes les
   20 s tant qu'elle télécharge) et le pré-chargement d'ici s'efface. */
let packClaimAt = 0;
const PACK_CLAIM_MS = 90 * 1000;
self.addEventListener('message', (e) => {
  if (e && e.data && e.data.type === 'pack-claim') packClaimAt = Date.now();
});
async function packOwnedByPage() {
  if (Date.now() - packClaimAt < PACK_CLAIM_MS) return true;
  try {
    if (self.registration.backgroundFetch) {
      const r = await self.registration.backgroundFetch.get(BG_ID);
      if (r && !r.result) return true;          // téléchargement d'arrière-plan en cours
    }
  } catch (err) {}
  return false;
}

/* Pré-téléchargement des médias : 4 requêtes à la fois, en sautant ce qui est
   déjà en cache — une interruption reprend donc là où elle s'était arrêtée.
   Filet de sécurité seulement : si la page mène le téléchargement, on s'arrête. */
function precacheMedia() {
  if (!MEDIA_LIST.length) return Promise.resolve();
  return (async () => {
    // Laisse à la page le temps de revendiquer le pack (elle le fait dès que
    // navigator.serviceWorker.ready se résout, c'est-à-dire maintenant).
    await new Promise((r) => setTimeout(r, 5000));
    if (await packOwnedByPage()) return;
    const cache = await caches.open(MEDIA);
    let i = 0, stop = false;
    const worker = async () => {
      while (!stop && i < MEDIA_LIST.length) {
        const idx = i++;
        // Re-contrôle régulier : la page peut démarrer son téléchargement après nous.
        if (idx > 0 && idx % 25 === 0 && await packOwnedByPage()) { stop = true; return; }
        const u = MEDIA_LIST[idx];
        try {
          const hit = await cache.match(u);
          if (!hit) {
            await cache.add(u);
            await purgeOldRevs(cache, new URL(u, self.location.href));
          }
        } catch (err) {}
      }
    };
    await Promise.all([worker(), worker(), worker(), worker()]);
  })();
}

/* Installation rapide et fiable : seulement l'app (~2 Mo), pas les 70 Mo de
   médias — eux partent en arrière-plan à l'activation.
   Un échec sur un fichier CRITIQUE (js/css/données) fait échouer l'install :
   le navigateur retentera, plutôt que de déclarer l'app « prête » avec un
   script manquant (= page blanche sous terre). Seuls polices/icônes/logo
   sont tolérés en absence. */
function optional(u) {
  return u.indexOf('/fonts/') >= 0 || u.indexOf('./icons/') === 0 || u.indexOf('logo_roger') >= 0 ||
    u === './suivi.html' || u === './admin.html' || u === './apk.html' || u === './affiche-apk.html' || u === './qr-apk.svg';
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
      // Ne purger QUE nos propres caches (préfixe « mri- ») : l'origine
      // frankyray21.github.io est partagée avec les autres sites (Wiki SST, TMS,
      // RodBot…) — leurs caches hors-ligne ne doivent jamais être touchés.
      .then((keys) => Promise.all(keys.filter((k) => k.indexOf('mri-') === 0 && k !== VERSION && k !== MEDIA).map((k) => caches.delete(k))))
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
  // js/css : ils sont mis en cache SOUS LEUR URL VERSIONNÉE à l'installation,
  // donc la correspondance doit ignorer le ?v= — sinon chaque déploiement les
  // re-télécharge tous alors qu'ils sont déjà là, à l'octet près.
  const bare = /\.(js|css)$/.test(path) ? { ignoreSearch: true } : undefined;
  e.respondWith(
    caches.match(req, bare).then((hit) => hit ||
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

/* ─────────────── Background Fetch (pack hors-ligne, app fermée) ───────────────
   Sur Android/Chrome, la page lance un « background fetch » de tout le pack : le
   téléchargement continue MÊME si l'app est fermée (avec une notification
   système). Ici on RANGE les réponses reçues dans le Cache Storage (Background
   Fetch ne le fait pas tout seul), média dans MEDIA, reste dans VERSION. iOS ne
   supporte pas l'API : la page retombe alors sur le pré-chargement premier-plan. */
const BG_ID = 'mri-offline-pack';

function bgIsMedia(path) {
  return path.includes('/pdf/') || path.includes('/images/pages/') || path.includes('/images/figures/');
}
/* Purge en UNE passe les anciennes révisions des chemins qu'on vient de ranger.
   purgeOldRevs relit toutes les clés du cache : l'appeler fichier par fichier
   sur ~1000 médias serait quadratique (1000 × 1000 lectures de clés). */
async function bgPurge(cache, keep) {          // keep : Map pathname → href gardé
  const ks = await cache.keys();
  await Promise.all(ks.map((k) => {
    const want = keep.get(new URL(k.url).pathname);
    return (want && k.url !== want) ? cache.delete(k) : null;
  }));
}
// Range dans le cache toutes les réponses 200 d'un background fetch.
async function bgStore(registration) {
  let stored = 0, failed = 0;
  const records = await registration.matchAll();
  const media = await caches.open(MEDIA);
  const shell = await caches.open(VERSION);
  const keep = new Map();
  /* Par LOTS : le pack fait ~170 Mo sur ~1100 fichiers. Tout ouvrir d'un coup
     tiendrait les corps de réponse en mémoire en même temps et ferait tuer le
     service worker par le système avant la fin de la mise en cache. */
  for (let i = 0; i < records.length; i += 12) {
    await Promise.all(records.slice(i, i + 12).map(async (record) => {
      try {
        const resp = await record.responseReady;
        if (!resp || resp.status !== 200) { failed++; return; }
        const url = new URL(record.request.url);
        const isMedia = bgIsMedia(url.pathname);
        await (isMedia ? media : shell).put(record.request, resp);
        if (isMedia) keep.set(url.pathname, url.href);
        stored++;
      } catch (e) { failed++; }
    }));
  }
  if (keep.size) { try { await bgPurge(media, keep); } catch (e) {} }
  return { stored, failed };
}
async function bgNotifyPages(done) {
  try {
    const cs = await self.clients.matchAll({ includeUncontrolled: true });
    cs.forEach((c) => c.postMessage({ type: done ? 'offline-pack-done' : 'offline-pack-partial' }));
  } catch (e) {}
}

self.addEventListener('backgroundfetchsuccess', (event) => {
  if (event.registration.id !== BG_ID) return;
  event.waitUntil((async () => {
    const r = await bgStore(event.registration);
    const complete = r.failed === 0;
    await bgNotifyPages(complete);
    // La notification ne doit pas annoncer « disponible hors-ligne » si des
    // réponses n'ont pas pu être rangées : la page complètera le reste.
    try {
      await event.updateUI({
        title: complete ? 'Procédures disponibles hors-ligne ✓'
                        : 'Procédures — téléchargement partiel, à compléter'
      });
    } catch (e) {}
  })());
});

/* Échec partiel (réseau coupé) ou annulation par l'utilisateur : on garde quand
   même ce qui a été reçu — sinon les octets déjà téléchargés seraient perdus. Le
   reste sera complété à la prochaine ouverture (page → nouveau background fetch
   avec seulement les fichiers manquants, ou pré-chargement premier-plan). */
function bgSalvage(event) {
  if (event.registration.id !== BG_ID) return;
  event.waitUntil((async () => {
    await bgStore(event.registration);
    await bgNotifyPages(false);
  })());
}
self.addEventListener('backgroundfetchfail', bgSalvage);
self.addEventListener('backgroundfetchabort', bgSalvage);   // updateUI interdit ici : on n'en fait pas

// Clic sur la notification → ouvre / ramène l'app au premier plan.
self.addEventListener('backgroundfetchclick', (event) => {
  if (event.registration.id !== BG_ID) return;
  event.waitUntil((async () => {
    const cs = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (cs.length) return cs[0].focus();
    return self.clients.openWindow('./');
  })());
});

/* ─────────── Attestations : envoi en arrière-plan (Background Sync) ───────────
   Le trou le plus grave de la file hors-ligne était qu'AUCUN code ne tourne
   quand l'app est fermée : une attestation signée sous terre attendait que le
   travailleur rouvre l'app en surface. Ici, le système réveille le service
   worker dès qu'il y a du réseau — même app fermée, même après un redémarrage
   du téléphone — et c'est LUI qui poste au Worker Cloudflare.

   Portée réelle : Chrome Android (PWA installée ou onglet). Ni iOS ni le
   WebView de l'APK ne connaissent cette API — là, l'envoi reste au premier
   plan, avec la pastille « N à envoyer » comme rappel (voir renderAqChip).

   La file est lue dans IndexedDB (« mri-attest », store 'queue') : un service
   worker n'a PAS accès à localStorage. Le schéma doit rester identique à celui
   de la page (voir aqdbOpen dans app.js) — même version, mêmes stores. */
const AQDB_NAME = 'mri-attest', AQDB_V = 1;

function aqdbOpen() {
  return new Promise((resolve) => {
    try {
      const rq = indexedDB.open(AQDB_NAME, AQDB_V);
      rq.onupgradeneeded = () => {
        const db = rq.result;
        if (!db.objectStoreNames.contains('queue')) db.createObjectStore('queue', { keyPath: 'sig' });
        if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'k' });
      };
      rq.onsuccess = () => resolve(rq.result);
      rq.onerror = () => resolve(null);
      rq.onblocked = () => resolve(null);
    } catch (e) { resolve(null); }
  });
}
function aqdbRun(db, store, mode, fn) {
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(store, mode);
      const rq = fn(tx.objectStore(store));
      tx.oncomplete = () => resolve(rq ? rq.result : true);
      tx.onerror = () => resolve(null);
      tx.onabort = () => resolve(null);
    } catch (e) { resolve(null); }
  });
}

/* Envoi de la file. Renvoie true s'il reste des éléments à envoyer : le
   gestionnaire 'sync' rejette alors la promesse pour que le système REPLANIFIE
   l'événement au lieu de le considérer comme réglé. */
async function aqSyncAll() {
  /* Une page visible s'en occupe déjà : poster des deux côtés ferait deux
     enregistrements (le dédoublonnage du Worker n'est pas atomique). */
  const cs = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  if (cs.some((c) => c.visibilityState === 'visible')) return false;

  const db = await aqdbOpen();
  if (!db) return false;
  const meta = await aqdbRun(db, 'meta', 'readonly', (st) => st.get('endpoint'));
  const endpoint = meta && meta.v ? String(meta.v).replace(/\/+$/, '') : '';
  if (!endpoint) return false;
  const recs = await aqdbRun(db, 'queue', 'readonly', (st) => st.getAll());
  if (!Array.isArray(recs) || !recs.length) return false;

  /* Même envoi en DEUX TEMPS que la page (voir aqSendItem dans app.js) :
     l'attestation seule d'abord (environ 1 Ko, elle passe dans une fenêtre de
     réseau très courte), le PDF signé ensuite, rattaché à l'enregistrement
     déjà créé. Deux passes : une attestation peut ainsi franchir ses deux
     temps dans le même réveil quand la connexion tient. Le PDF est lu tel
     quel — un service worker n'a ni DOM ni canvas pour le regénérer. */
  let left = 0;
  for (let passe = 0; passe < 2; passe++) {
    left = 0;
    const encore = await aqdbRun(db, 'queue', 'readonly', (st) => st.getAll());
    if (!Array.isArray(encore) || !encore.length) break;
    let avance = false;
    for (const rec of encore) {
      if (!rec || rec.rejected || !rec.payload) continue;
      if (rec.sentAt && !rec.needPdf) continue;                  // terminée
      if (!rec.sentAt) left++;                                   // le temps 1 seul est urgent
      if (rec.sentAt && rec.pdfNextAt && Date.now() < rec.pdfNextAt) continue;

      const leger = !rec.sentAt;
      const body = {};
      Object.keys(rec.payload).forEach((k) => { if (k !== 'signature') body[k] = rec.payload[k]; });
      if (!leger && rec.pdf) {
        body.pdfBase64 = rec.pdf;
        body.pdfName = 'attestation-' + String(rec.payload.proc || rec.pid || '').replace(/[^\w.-]+/g, '-') + '.pdf';
      }
      let st = 0, j = null;
      try {
        const r = await fetch(endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
        st = r.status;
        try { j = await r.json(); } catch (e) { j = null; }
      } catch (e) { continue; }                                  // réseau : on réessaiera

      if (st >= 200 && st < 300 && j && j.ok) {
        /* Enregistré. On ne supprime PAS : on marque, et la page finira le
           ménage à sa prochaine ouverture (aqReconcile) — c'est ainsi qu'elle
           apprend que l'attestation est partie et met la fiche à jour. */
        const at = Date.now();
        if (j.pdf === true) {
          rec.sentAt = at; rec.needPdf = false;
        } else {
          if (!leger) {
            rec.pdfTries = (rec.pdfTries || 0) + 1;
            rec.pdfNextAt = at + (rec.pdfTries >= 3 ? 24 * 3600000 : 10 * 60000);
          } else {
            rec.pdfNextAt = 0;                                   // enchaîner le temps 2
          }
          rec.sentAt = at; rec.needPdf = true;
        }
        await aqdbRun(db, 'queue', 'readwrite', (s2) => s2.put(rec));
        if (leger) { left--; avance = true; }
        continue;
      }
      // Refus explicite du Worker (corps JSON { ok:false }) : mis de côté, jamais
      // jeté. Tout autre 4xx/5xx (portail captif, 429, panne) : on réessaiera.
      if (st >= 400 && st < 500 && j && j.ok === false) {
        rec.rejected = true; rec.why = (j && j.error) || ('HTTP ' + st);
        await aqdbRun(db, 'queue', 'readwrite', (s2) => s2.put(rec));
        if (leger) left--;
      }
    }
    if (!avance) break;                                          // rien n'a bougé : inutile d'insister
  }
  return left > 0;
}

self.addEventListener('sync', (e) => {
  if (e.tag !== 'attest-flush') return;
  // Une promesse REJETÉE demande au système de replanifier l'événement.
  e.waitUntil(aqSyncAll().then((left) => { if (left) throw new Error('attest-queue non vide'); }));
});
// PWA installée : nouvelle chance périodique (intervalle minimal ~12 h côté
// Chrome). Sans effet là où l'API n'existe pas — c'est un filet, pas le plan.
self.addEventListener('periodicsync', (e) => {
  if (e.tag !== 'attest-flush') return;
  e.waitUntil(aqSyncAll());
});
