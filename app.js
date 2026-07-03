/* ===========================================================================
   Procédures de forage MRI — logique applicative (vanilla JS, sans build)
   =========================================================================== */
(function () {
  'use strict';

  var CFG   = window.SITE_CONFIG || {};
  var DEMO  = !!(CFG && CFG.demo);
  var DATA  = (window.PROCEDURES || []).slice();
  var CODE  = window.CODE_SECURITE || null;

  var CAT_COLORS = {
    'Forage': '#d22325', 'Alésage': '#3b82f6', 'Installation': '#10b981',
    'Maintenance': '#f59e0b', 'Manutention': '#8b5cf6', 'Démobilisation': '#ec4899',
    'Intervention': '#ef4444',
    'Carottage & tube': '#06b6d4', 'Installation & plancher': '#10b981',
    'Déplacement': '#ec4899', 'Cimentation': '#a16207', 'Sécurité': '#ef4444',
    'Équipements & véhicules': '#0d9488'
  };
  function catColor(c) { return CAT_COLORS[c] || '#d22325'; }

  // index code -> procedure id (pour les liens du Code de sécurité)
  var CODE_TO_ID = {};
  DATA.forEach(function (p) { if (p.code) CODE_TO_ID[p.code.toUpperCase()] = p.id; });

  /* ---------- utilitaires ---------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var ICON = {
    arrow: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6l6 6-6 6"/></svg>',
    back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m6 6l-6-6 6-6"/></svg>',
    search: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>',
    warn: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    doc: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
    fwd: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6l6 6-6 6"/></svg>',
    close: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    tool: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0 5 5l-7.6 7.6a2.1 2.1 0 0 1-3-3l7.6-7.6a4 4 0 0 0-2-2z"/><path d="M3 21l4-4"/></svg>'
  };
  // pictogrammes par type de point de la checklist
  var TYPE_ICON = {
    interdiction: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>',
    verification: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    danger: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>',
    epi: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17a9 9 0 0 1 18 0"/><path d="M2 17h20"/><path d="M9 9.5V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3.5"/></svg>',
    valeur: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5l5-5 12 12-5 5z"/><path d="M8 9l1.5 1.5M11 6l1.5 1.5M14 9l1.5 1.5"/></svg>'
  };

  /* ---------- routage ---------- */
  function route() {
    var h = location.hash || '#/';
    var view = $('#view');
    window.scrollTo(0, 0);
    if (h.indexOf('#/p/') === 0) { var pid = h.slice(4); renderProcedure(view, pid); var pp = DATA.filter(function (x) { return x.id === pid; })[0]; setNav(pp && pp.famille === 'diamant' ? 'diamant' : 'procedures'); }
    else if (h.indexOf('#/quiz') === 0) { renderQuiz(view); setNav('quiz'); }
    else if (h.indexOf('#/code') === 0) { renderCode(view); setNav('code'); }
    else if (h.indexOf('#/diamant') === 0) { if (state.fam !== 'diamant') { state.fam = 'diamant'; state.cat = ''; state.mach = ''; state.q = ''; } renderHome(view); setNav('diamant'); }
    else if (h.indexOf('#/procedures') === 0) { if (state.fam !== '') { state.fam = ''; state.cat = ''; state.mach = ''; state.q = ''; } renderHome(view); setNav('procedures'); }
    else { renderPortail(view); setNav(''); }
  }
  function setNav(which) {
    document.querySelectorAll('.appbar nav a[data-nav]').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === which);
    });
  }

  /* ---------- vue : accueil ---------- */
  var state = { q: '', cat: '', mach: '', fam: '' };
  var codeFam = 'ith';   // Code de sécurité affiché : 'ith' (production) ou 'dd' (diamant)
  // fam '' = foreuses ITH/CUBEX/V-30 (par défaut) ; 'diamant' = forage au diamant
  // Appartenance d'une procédure à une section. famille 'commun' = les deux.
  function inSection(p, fam) {
    if (p.famille === 'commun') return true;
    return fam === 'diamant' ? p.famille === 'diamant' : p.famille !== 'diamant';
  }
  function famData() {
    return DATA.filter(function (p) { return inSection(p, state.fam); });
  }
  // Classement des filtres : catégories par flux de travail, machines regroupées
  var CAT_ORDER = ['Forage', 'Alésage', 'Carottage & tube', 'Cimentation', 'Installation', 'Installation & plancher',
    'Manutention', 'Maintenance', 'Intervention', 'Déplacement', 'Équipements & véhicules', 'Démobilisation', 'Sécurité'];
  // 'Foreuse au diamant' est volontairement absent : il équivaut à toute la
  // section Diamant (redondant comme filtre). On le regroupe quand même (pour
  // ne pas le confondre avec ITH), mais il ne s'affiche pas comme chip.
  var MACH_ORDER = ['ITH', 'V-30', 'Centralisateur', 'Marteau', 'Compresseur', 'DR-600', 'STM-1500', 'STOPEMASTER', 'VKING'];
  function mainMachine(m) {
    var s = norm(m);
    if (s.indexOf('cubex') >= 0) return 'ITH';   // CUBEX = foreuse ITH (même chose)
    if (s.indexOf('diamant') >= 0) return 'Foreuse au diamant';   // foreuse au diamant ≠ ITH
    if (s.indexOf('dr-600') >= 0 || s.indexOf('dr600') >= 0) return 'DR-600';
    if (s.indexOf('stm') >= 0) return 'STM-1500';
    if (s.indexOf('v-30') >= 0 || s.indexOf('v30') >= 0 || s.indexOf('aleseuse') >= 0) return 'V-30';
    if (s.indexOf('centralisateur') >= 0) return 'Centralisateur';
    if (s.indexOf('marteau') >= 0) return 'Marteau';
    if (s.indexOf('compresseur') >= 0 || s.indexOf('booster') >= 0) return 'Compresseur';
    if (s.indexOf('stopemaster') >= 0) return 'STOPEMASTER';
    if (s.indexOf('vking') >= 0 || s.indexOf('v-king') >= 0) return 'VKING';
    if (s.indexOf('ith') >= 0 || s.indexOf('foreuse') >= 0) return 'ITH';
    return null;
  }
  function machinesOf(p) {
    var set = {};
    (p.machines || []).forEach(function (m) { var g = mainMachine(m); if (g) set[g] = true; });
    return Object.keys(set);
  }

  function renderHome(view) {
    var D = famData();
    var diamant = state.fam === 'diamant';
    var cats = {}, machs = {};
    D.forEach(function (p) {
      cats[p.categorie] = (cats[p.categorie] || 0) + 1;
      machinesOf(p).forEach(function (m) { machs[m] = (machs[m] || 0) + 1; });
    });
    var nbConsignes = D.reduce(function (a, p) { return a + ((p.consignes_securite || []).length); }, 0);

    var catChips = CAT_ORDER.filter(function (c) { return cats[c]; }).map(function (c) {
      return '<button class="chip" data-cat="' + esc(c) + '" style="--c:' + catColor(c) + '">' +
        esc(c) + ' <span class="ct">' + cats[c] + '</span></button>';
    }).join('');
    var machChips = MACH_ORDER.filter(function (m) { return machs[m]; }).map(function (m) {
      return '<button class="chip" data-mach="' + esc(m) + '">' + esc(m) + ' <span class="ct">' + machs[m] + '</span></button>';
    }).join('');

    view.innerHTML =
      '<section class="hero"><div class="wrap">' +
        '<span class="eyebrow">' + (diamant ? 'Santé-Sécurité · Forage au diamant' : 'Santé-Sécurité · Forage') + '</span>' +
        '<h1>' + (diamant ? 'Forage au <span class="hl">diamant</span>' : 'Procédures de <span class="hl">forage</span>') + '</h1>' +
        '<p class="lead">' + (diamant
          ? 'Procédures de forage au diamant de Machines Roger International (carottage, planchers, déplacements, sécurité). Chaque fiche conserve son PDF officiel, visionnable et recherchable hors-ligne.'
          : 'Toutes les procédures de travail de Machines Roger International, accessibles, recherchables et consultables hors-ligne. Chaque procédure conserve son PDF officiel.') + '</p>' +
        '<div class="stats">' +
          '<div class="stat"><b>' + D.length + '</b><span>Procédures</span></div>' +
          '<div class="stat"><b>' + Object.keys(cats).length + '</b><span>Catégories</span></div>' +
          (diamant
            ? '<div class="stat"><b><a href="#/procedures" style="color:var(--accent-l)">ITH&nbsp;»</a></b><span>Foreuses ITH/CUBEX</span></div>'
            : '<div class="stat"><b>' + nbConsignes + '</b><span>Consignes</span></div>') +
          '<div class="stat"><b><a href="#/code" style="color:var(--accent-l)">Code&nbsp;»</a></b><span>de sécurité</span></div>' +
        '</div>' +
      '</div></section>' +
      '<div class="wrap"><div class="install" id="install"></div><div class="offline" id="offline"></div></div>' +
      '<div class="toolbar"><div class="wrap">' +
        '<div class="search">' + ICON.search +
          '<input id="q" type="search" placeholder="Rechercher une procédure, un équipement, une consigne…" autocomplete="off">' +
        '</div>' +
        '<div class="chips" id="catChips">' +
          '<button class="chip on" data-cat="">Toutes</button>' + catChips +
        '</div>' +
        '<div class="chips" id="machChips"></div>' +
      '</div></div>' +
      '<div class="wrap"><div class="count" id="count"></div><div class="plist2" id="grid"></div></div>';

    var q = $('#q');
    q.value = state.q;
    var qTimer = null;      // léger debounce : la recherche plein-texte balaie tous les PDF
    q.addEventListener('input', function () {
      state.q = q.value;
      clearTimeout(qTimer);
      qTimer = setTimeout(drawList, state.q.trim() ? 160 : 0);
    });
    // « voir plus / voir moins » des passages cités dans les résultats
    $('#grid').addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.srmore-b'); if (!b) return;
      e.preventDefault();
      var more = b.previousElementSibling;
      if (more && more.classList.contains('srmore')) {
        var on = more.classList.toggle('open');
        b.textContent = on ? 'Voir moins' : '+ ' + more.childElementCount + ' autre' +
          (more.childElementCount > 1 ? 's' : '') + ' passage' + (more.childElementCount > 1 ? 's' : '');
      }
    });
    $('#catChips').addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      state.cat = b.getAttribute('data-cat') || '';
      $('#catChips').querySelectorAll('.chip').forEach(function (c) { c.classList.remove('on'); });
      b.classList.add('on');
      state.mach = '';            // la machine dépend de la tâche : on réinitialise
      updateMachChips();
      drawList();
    });
    bindChips('#machChips', 'mach');
    updateMachChips();
    drawList();
    renderInstall();
    renderOffline();
    verifyOfflineCache();
  }
  // Filtre machine conditionnel à la tâche : visible seulement si une catégorie
  // est choisie ET qu'elle compte plusieurs machines pertinentes.
  function updateMachChips() {
    var box = $('#machChips'); if (!box) return;
    var machs = {};
    famData().forEach(function (p) {
      if (!state.cat || p.categorie === state.cat) machinesOf(p).forEach(function (m) { machs[m] = (machs[m] || 0) + 1; });
    });
    var keys = MACH_ORDER.filter(function (m) { return machs[m]; });
    if (keys.length < 2) { box.innerHTML = ''; box.style.display = 'none'; return; }
    var chips = keys.map(function (m) {
      return '<button class="chip' + (state.mach === m ? ' on' : '') + '" data-mach="' + esc(m) + '">' +
        esc(m) + ' <span class="ct">' + machs[m] + '</span></button>';
    }).join('');
    box.innerHTML = '<button class="chip' + (state.mach === '' ? ' on' : '') + '" data-mach="">Tous les équipements</button>' + chips;
    box.style.display = 'flex';
  }

  /* ---------- disponibilité hors-ligne (pré-téléchargement) ---------- */
  var DL_ICON = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>';
  var INSTALL_ICON = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M12 7v7m0 0l-3-3m3 3l3-3"/><line x1="11" y1="18.5" x2="13" y2="18.5"/></svg>';
  var SIZES = window.ASSET_SIZES || {};

  // Fichiers de l'application — doit refléter les <script> d'index.html.
  // (La liste CORE du service-worker.js doit rester synchronisée.)
  var APP_FILES = ['index.html', 'styles.css', 'manifest.webmanifest', 'config.js', 'data.js',
    'data-diamant.js', 'data-securite.js', 'data-ith-new.js', 'quiz.js', 'essentiel.js',
    'figures.js', 'pages.js', 'quiz_proc.js', 'quiz-diamant.js', 'quiz-diamant2.js',
    'quiz-hard3.js', 'quiz-dd-equip.js', 'quiz-securite.js', 'quiz-ith-new.js', 'quiz-types.js',
    'pdftext.js', 'llm.js', 'chatbot.js', 'app.js', 'sizes.js'];
  var BRAND_FILES = ['images/logo_roger.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png'];

  function offlineGroups() {
    var pdfs = [], pages = [], figs = [];
    DATA.forEach(function (p) { pdfs.push('pdf/' + encodeURIComponent(p.id) + '.pdf'); });
    pdfs.push('pdf/centralisateur-dessin.pdf');
    if (window.PAGES) {
      Object.keys(window.PAGES).forEach(function (key) {
        (window.PAGES[key] || []).forEach(function (src) { if (src) pages.push(src); });
      });
    }
    if (window.FIGURES) {
      Object.keys(window.FIGURES).forEach(function (id) {
        (window.FIGURES[id] || []).forEach(function (f) { if (f && f.src) figs.push(f.src); });
      });
    }
    return [
      { label: 'Application et fiches', files: APP_FILES },
      { label: 'PDF officiels', files: pdfs, media: true },
      { label: 'Pages des PDF (images)', files: pages, media: true },
      { label: 'Photos et schémas', files: figs, media: true },
      { label: 'Logo et icônes', files: BRAND_FILES }
    ];
  }
  function offlineAssets() {
    var u = [];
    offlineGroups().forEach(function (g) { u = u.concat(g.files); });
    return u;
  }
  function sizeOf(u) { return SIZES[u] || 0; }
  function sumBytes(files) { var b = 0; files.forEach(function (u) { b += sizeOf(u); }); return b; }
  function fmtMo(bytes) {
    if (bytes >= 1048576) {
      var mo = bytes / 1048576;
      return String(mo >= 10 ? Math.round(mo) : Math.round(mo * 10) / 10).replace('.', ',') + ' Mo';
    }
    return Math.max(1, Math.round(bytes / 1024)) + ' Ko';
  }
  function fmtDur(secs) {
    if (secs < 50) return '~' + Math.max(5, Math.round(secs / 5) * 5) + ' s';
    var m = Math.round(secs / 60);
    if (m < 60) return '~' + Math.max(1, m) + ' min';
    return '~' + Math.floor(m / 60) + ' h ' + ('0' + (m % 60)).slice(-2);
  }
  /* Estimation du temps de téléchargement : débit réel de la connexion
     (navigator.connection.downlink, en Mbit/s) quand le navigateur l'expose,
     sinon hypothèse prudente de 10 Mbit/s ; + latence par requête (4 en parallèle). */
  function estimateSecs(bytes, nFiles) {
    var mbps = (navigator.connection && navigator.connection.downlink) || 0;
    if (!mbps || mbps <= 0) mbps = 10;
    return (bytes * 8) / (mbps * 1e6) + (nFiles * 0.09) / 4;
  }
  var PDF_CODE = null;
  function fileLabel(u) {
    if (!PDF_CODE) {
      PDF_CODE = {};
      DATA.forEach(function (p) { PDF_CODE[p.id] = p.code || p.titre || ''; });
    }
    var name = decodeURIComponent((u.split('/').pop() || u));
    if (u.indexOf('pdf/') === 0) {
      var code = PDF_CODE[name.replace(/\.pdf$/, '')];
      if (code) return name + ' — ' + code;
    }
    return name;
  }
  // Liste complète des fichiers, groupée, repliée sous « Voir les fichiers ».
  function offlineListHTML() {
    var groups = offlineGroups(), count = 0, total = 0;
    var inner = groups.map(function (g) {
      var b = sumBytes(g.files); count += g.files.length; total += b;
      return '<div class="offgrp"><b>' + esc(g.label) + '</b><span>' + g.files.length +
        ' fichiers · ' + fmtMo(b) + '</span></div><ul class="offul">' +
        g.files.map(function (u) {
          return '<li data-u="' + esc(u) + '"><span class="offname">' + esc(fileLabel(u)) +
            '</span><span class="offsize">' + fmtMo(sizeOf(u)) + '</span></li>';
        }).join('') + '</ul>';
    }).join('');
    return '<details class="offlist"><summary>Voir les ' + count + ' fichiers (' + fmtMo(total) +
      ')</summary><div class="offlist-body">' + inner + '</div></details>';
  }
  function offlineReady() { try { return localStorage.getItem('offline_ready') === '1'; } catch (e) { return false; } }
  /* Les médias sont aussi pré-téléchargés en arrière-plan par le service
     worker après son activation. On vérifie leur présence réelle dans le
     Cache Storage pour afficher « Disponible hors-ligne » sans attendre un clic. */
  function verifyOfflineCache() {
    if (DEMO || !('caches' in window) || offlineReady()) return;
    var media = [];
    offlineGroups().forEach(function (g) { if (g.media) media = media.concat(g.files); });
    Promise.all(media.map(function (u) { return caches.match(u).then(function (r) { return !!r; }); }))
      .then(function (found) {
        if (found.length && found.every(Boolean)) {
          try { localStorage.setItem('offline_ready', '1'); } catch (e) {}
          renderOffline();
        }
      }).catch(function () {});
  }
  function renderOffline() {
    var box = $('#offline'); if (!box) return;
    if (DEMO || !('serviceWorker' in navigator)) { box.innerHTML = ''; return; }
    var files = offlineAssets(), totalBytes = sumBytes(files), nPdf = DATA.length + 1;
    if (offlineReady()) {
      box.innerHTML = '<div class="offcard ok"><span class="offic">' + ICON.check + '</span>' +
        '<div class="offtxt"><b>Disponible hors-ligne</b><span>Toutes les fiches, les ' + nPdf +
        ' PDF et les figures (' + fmtMo(totalBytes) + ') sont enregistrés sur cet appareil.</span></div>' +
        '<button class="btn ghost" id="offBtn">Mettre à jour</button></div>';
    } else {
      box.innerHTML = '<div class="offcard"><span class="offic">' + DL_ICON + '</span>' +
        '<div class="offtxt"><b>Préparer la consultation hors-ligne</b>' +
        '<span>' + files.length + ' fichiers · ' + fmtMo(totalBytes) + ' : toutes les fiches, les ' + nPdf +
        ' PDF et leurs images, pour consulter sans réseau (sous terre).</span>' +
        '<span class="offeta">Temps de téléchargement estimé : ' + fmtDur(estimateSecs(totalBytes, files.length)) +
        ' sur cette connexion</span>' + offlineListHTML() + '</div>' +
        '<button class="btn" id="offBtn">Tout télécharger</button></div>';
    }
    $('#offBtn').onclick = function () { startPrecache(offlineReady()); };
  }
  /* Téléchargement : 4 fichiers en parallèle ; les fichiers déjà sur
     l'appareil sont sautés (reprise après interruption) sauf en mode
     « Mettre à jour » (force=true) qui re-télécharge tout. Progression en
     fichiers ET en Mo, vitesse mesurée et temps restant réel. */
  function startPrecache(force) {
    var box = $('#offline'); if (!box) return;
    var urls = ['./'].concat(offlineAssets());
    var total = urls.length, totalBytes = sumBytes(urls);
    box.innerHTML = '<div class="offcard"><span class="offic">' + DL_ICON + '</span>' +
      '<div class="offtxt" style="flex:1"><b>' + (force ? 'Mise à jour' : 'Téléchargement') + ' en cours…</b>' +
      '<div class="offbar"><i id="offbar"></i></div>' +
      '<span id="offstat">0 / ' + total + ' fichiers · 0 Ko / ' + fmtMo(totalBytes) + '</span>' +
      '<span id="offeta" class="offeta">Temps restant : calcul en cours…</span>' +
      '<span id="offcur" class="offcur"></span>' +
      offlineListHTML() + '</div></div>';
    var done = 0, failed = 0, bytesDone = 0, netBytes = 0, netStart = Date.now(), i = 0, active = 0;
    var listEls = {};
    [].forEach.call(box.querySelectorAll('.offul li'), function (li) { listEls[li.getAttribute('data-u')] = li; });
    function mark(u, cls) { var li = listEls[u]; if (li) li.className = cls; }
    function refresh(u) {
      var pct = totalBytes ? Math.min(100, Math.round(bytesDone / totalBytes * 100)) : Math.round(done / total * 100);
      var bar = $('#offbar'); if (bar) bar.style.width = pct + '%';
      var st = $('#offstat'); if (st) st.textContent = done + ' / ' + total + ' fichiers · ' + fmtMo(bytesDone) + ' / ' + fmtMo(totalBytes);
      var elapsed = (Date.now() - netStart) / 1000;
      if (elapsed > 3 && netBytes > 0) {
        var speed = netBytes / elapsed;
        var eta = $('#offeta');
        if (eta) eta.textContent = 'Temps restant : ' + fmtDur(Math.max(0, totalBytes - bytesDone) / speed) +
          ' (' + fmtMo(speed) + '/s)';
      }
      var cur = $('#offcur'); if (cur) cur.textContent = u ? 'En cours : ' + fileLabel(u) : '';
    }
    function finish() {
      if (!failed) { try { localStorage.setItem('offline_ready', '1'); } catch (e) {} }
      renderOffline();
      toast(failed
        ? failed + ' fichier(s) non téléchargé(s) — réessayez : ce qui est déjà téléchargé ne sera pas repris.'
        : 'Terminé : tout est disponible hors-ligne (' + fmtMo(bytesDone) + ').');
    }
    function next() {
      if (i >= urls.length) { if (active === 0) finish(); return; }
      var u = urls[i++]; active++;
      var precheck = (!force && 'caches' in window) ? caches.match(u) : Promise.resolve(null);
      precheck.then(function (hit) {
        if (hit) { bytesDone += sizeOf(u); mark(u, 'ok'); return; }   // déjà sur l'appareil
        return fetch(u, force ? { cache: 'reload' } : {}).then(function (r) {
          if (!r || r.status !== 200) { failed++; mark(u, 'ko'); return; }
          return r.blob().then(function (b) {           // attend le fichier COMPLET
            var n = (b && b.size) || sizeOf(u);
            bytesDone += n; netBytes += n; mark(u, 'ok');
          });
        });
      }).catch(function () { failed++; mark(u, 'ko'); })
        .then(function () { done++; active--; refresh(urls[i]); next(); });
    }
    refresh(urls[0]);
    for (var k = 0; k < 4; k++) next();
  }
  function bindChips(sel, key) {
    var box = $(sel);
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      state[key] = b.getAttribute('data-' + key) || '';
      box.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('on'); });
      b.classList.add('on');
      drawList();
    });
  }
  function matches(p) {
    if (!inSection(p, state.fam)) return false;
    if (state.cat && p.categorie !== state.cat) return false;
    if (state.mach && machinesOf(p).indexOf(state.mach) < 0) return false;
    if (state.q) {
      var hay = norm([p.titre, p.code, p.resume, p.categorie, (p.machines || []).join(' '),
        (p.consignes_securite || []).map(function (c) { return c.regle; }).join(' ')].join(' '));
      var ok = norm(state.q).split(/\s+/).every(function (t) { return hay.indexOf(t) >= 0; });
      if (!ok) return false;
    }
    return true;
  }
  function drawList() {
    var grid = $('#grid'), count = $('#count');
    if (!grid) return;
    var qStr = (state.q || '').trim();
    // Recherche « comme l'assistant » : dès qu'on tape 2 caractères et que
    // l'index plein-texte des PDF est prêt, on utilise le même moteur que la
    // bulle de conversation (chatbot.js) — synonymes, radicaux, tolérance aux
    // fautes, score par passage — et on affiche les passages cités.
    var S = window.MRI_SEARCH;
    if (qStr.length >= 2 && S && S.ready()) { grid.classList.add('srmode'); drawSearch(qStr, S, grid, count); return; }
    grid.classList.remove('srmode');
    var list = DATA.filter(matches);
    count.textContent = list.length + (list.length > 1 ? ' procédures' : ' procédure');
    if (!list.length) { grid.innerHTML = '<div class="empty">Aucune procédure ne correspond à votre recherche.</div>'; return; }
    grid.innerHTML = list.map(card).join('');
  }
  function passageHTML(r, terms) {
    var it = r.item;
    return '<div class="srp"><div class="srp-t">« ' + window.MRI_SEARCH.highlight(it.text, terms) + ' »</div>' +
      '<a class="srp-src" href="#/p/' + esc(it.pid) + '">Ouvrir la fiche' + (it.source ? ' · ' + esc(it.source) : '') + ' →</a></div>';
  }
  function drawSearch(qStr, S, grid, count) {
    var eq = S.expandQuery(qStr);
    var res = S.search(qStr, eq, { noCut: true });
    // Portée = section courante + filtres actifs (catégorie, équipement).
    var inScope = {};
    DATA.forEach(function (p) {
      if (inSection(p, state.fam) &&
          (!state.cat || p.categorie === state.cat) &&
          (!state.mach || machinesOf(p).indexOf(state.mach) >= 0)) inScope[p.id] = p;
    });
    // Coupe de la traîne faible APRÈS filtrage (mêmes seuils que l'assistant :
    // ≥ 45 % du meilleur score de la portée, au moins les 3 meilleurs gardés).
    res = res.filter(function (r) { return !!inScope[r.item.pid]; });
    if (res.length) {
      var top = res[0].score, MINKEEP = 3;
      res = res.filter(function (r, idx) { return idx < MINKEEP || r.score >= top * 0.45; });
    }
    // Passages regroupés par procédure, groupes ordonnés par pertinence
    // (même logique que la bulle de conversation).
    var groups = [], gmap = {};
    res.forEach(function (r) {
      var p = inScope[r.item.pid];
      var g = gmap[p.id];
      if (!g) { g = gmap[p.id] = { p: p, best: r.score, items: [] }; groups.push(g); }
      g.items.push(r);
      if (r.score > g.best) g.best = r.score;
    });
    groups.sort(function (a, b) { return b.best - a.best; });
    // Procédures qui correspondent par leur fiche (titre, code, résumé,
    // consignes) via les mêmes variantes (radical, faute, synonyme) : chaque
    // mot tapé doit matcher par au moins une de ses variantes. Ajoutées après
    // les procédures citées.
    Object.keys(inScope).forEach(function (id) {
      if (gmap[id]) return;
      var p = inScope[id];
      var hay = norm([p.titre, p.code, p.resume, p.categorie, (p.machines || []).join(' '),
        (p.consignes_securite || []).map(function (c) { return c.regle; }).join(' ')].join(' '));
      var ok = eq.coreSets.length && eq.coreSets.every(function (set) {
        return set.some(function (w) { return hay.indexOf(w) >= 0; });
      });
      if (ok) groups.push({ p: p, best: 0, items: [] });
    });
    var nPass = groups.reduce(function (a, g) { return a + g.items.length; }, 0);
    if (!groups.length) {
      count.textContent = '0 procédure';
      grid.innerHTML = '<div class="empty">Aucune procédure ne correspond à votre recherche.<br>' +
        '<span class="srhint">Essaie d\'autres mots — ex. « bris de tige », « cadenassage », « distance surcompresseur ».</span></div>';
      return;
    }
    count.textContent = groups.length + (groups.length > 1 ? ' procédures' : ' procédure') +
      (nPass ? ' · ' + nPass + ' passage' + (nPass > 1 ? 's' : '') + ' cité' + (nPass > 1 ? 's' : '') + ' des PDF officiels' : '');
    var PER_GROUP = 3;   // passages visibles par procédure (le reste derrière « voir plus »)
    grid.innerHTML = groups.map(function (g, gi) {
      var h = card(g.p);
      if (g.items.length) {
        var head = g.items.slice(0, PER_GROUP), rest = g.items.slice(PER_GROUP);
        var inner = head.map(function (r) { return passageHTML(r, eq.terms); }).join('');
        if (rest.length) {
          inner += '<div class="srmore">' + rest.map(function (r) { return passageHTML(r, eq.terms); }).join('') + '</div>' +
            '<button type="button" class="srmore-b">+ ' + rest.length + ' autre' + (rest.length > 1 ? 's' : '') +
            ' passage' + (rest.length > 1 ? 's' : '') + '</button>';
        }
        h += '<details class="srdet"' + (gi === 0 ? ' open' : '') + '>' +
          '<summary>' + g.items.length + ' passage' + (g.items.length > 1 ? 's' : '') + ' du PDF officiel</summary>' +
          '<div class="srpass">' + inner + '</div></details>';
      }
      return '<div class="srgrp">' + h + '</div>';
    }).join('');
  }
  function card(p) {
    var col = catColor(p.categorie);
    return '<a class="prow" href="#/p/' + esc(p.id) + '" style="--cat:' + col + '">' +
      '<div class="prow-main">' +
        '<span class="ptitle">' + esc(p.titre) + '</span>' +
        '<div class="prow-tags">' +
          '<span class="pcat"><i style="background:' + col + '"></i>' + esc(p.categorie) + '</span>' +
          (p.code ? '<span class="pcode">' + esc(p.code) + '</span>' : '') +
        '</div>' +
      '</div>' +
      '<span class="parrow">' + ICON.arrow + '</span></a>';
  }

  /* ---------- vue : procédure ---------- */
  function renderProcedure(view, id) {
    var p = DATA.filter(function (x) { return x.id === id; })[0];
    if (!p) { view.innerHTML = '<div class="wrap"><a class="back" href="#/procedures">' + ICON.back + ' Procédures</a><div class="empty">Procédure introuvable.</div></div>'; return; }
    var col = catColor(p.categorie);
    // Pour une procédure 'commun', le retour suit la section d'où l'on vient.
    var viaDiamant = (p.famille === 'commun') ? (state.fam === 'diamant') : (p.famille === 'diamant');
    var backHref = viaDiamant ? '#/diamant' : '#/procedures';
    var backLbl = viaDiamant ? ' Forage au diamant' : ' Toutes les procédures';
    var dates = [p.date_creation, p.date_revision ? 'Rév. ' + p.date_revision : ''].filter(Boolean).join(' · ');
    var h = '<div class="wrap"><a class="back" href="' + backHref + '">' + ICON.back + backLbl + '</a>' +
      '<div class="phead">' +
        '<h1>' + esc(p.titre) + '</h1>' +
        '<div class="tags" style="margin-top:.55rem">' +
          (p.code ? '<span class="code-tag">' + esc(p.code) + '</span>' : '') +
          '<span class="cat-tag" style="--cat:' + col + '">' + esc(p.categorie) + '</span></div>' +
        '<div class="meta">' +
          (p.machines || []).map(function (m) { return '<span>' + esc(m) + '</span>'; }).join('<span class="dot"></span>') +
          (dates ? '<span class="dot"></span><span>' + esc(dates) + '</span>' : '') +
        '</div>' +
      '</div>';

    if (p.resume) h += '<div class="sec"><div class="lead2">' + esc(p.resume) + '</div></div>';

    // Document officiel (PDF) — AU DÉBUT de la fiche
    if (DEMO) {
      h += '<div class="sec"><h2>Document officiel (PDF)</h2>' +
        '<div class="pdfcue"><span class="offic">' + ICON.doc + '</span><div class="cuetxt"><b>PDF non inclus dans cette démonstration publique</b>' +
        '<span>Les documents officiels (PDF) sont réservés à la version interne de Machines Roger International.</span></div></div></div>';
    } else {
      // Visionneuse in-page : pages du PDF rendues en images (fiable sur
      // mobile et hors-ligne, contrairement aux <iframe> de PDF). Repli sur
      // une <iframe> si les images de pages ne sont pas disponibles.
      var pdfBox = function (key, label) {
        var pdf = 'pdf/' + encodeURIComponent(key) + '.pdf';
        var pages = (window.PAGES && window.PAGES[key]) || [];
        var body = pages.length
          ? '<div class="pdfpages">' + pages.map(function (src, i) {
              return '<img src="' + esc(src) + '" alt="' + esc(label) + ' — page ' + (i + 1) + '" loading="lazy">';
            }).join('') + '</div>'
          : '<iframe src="' + pdf + '#view=FitH" title="' + esc(label) + '" loading="lazy"></iframe>';
        return '<div class="pdfbox">' +
          '<div class="bar">' + ICON.doc + '<b>' + esc(label) + '</b><span class="sp"></span>' +
            '<a class="dl" href="' + pdf + '" target="_blank" rel="noopener">Ouvrir</a>' +
            '<a class="dl" href="' + pdf + '" download>Télécharger</a></div>' +
          body + '</div>';
      };
      var pdfInner = pdfBox(p.id, p.code || p.titre);
      if (p.id === 'centralisateur') {
        pdfInner += '<div style="margin-top:1rem">' + pdfBox('centralisateur-dessin', 'Dessin technique du centralisateur') + '</div>';
      }
      h += '<div class="sec"><h2>Document officiel (PDF)</h2>' + pdfInner + '</div>';
    }

    // Photos et schémas — galerie visuelle (extraits des PDF)
    var figs = (window.FIGURES && window.FIGURES[p.id]) || [];
    if (figs.length) {
      h += '<div class="sec"><h2>Photos et schémas</h2>' +
        '<div class="gallery">' + figs.map(function (f, i) {
          return '<button class="gfig" type="button" data-i="' + i + '">' +
            '<img src="' + esc(f.src) + '" alt="Image ' + (i + 1) + '" loading="lazy">' +
            '<span class="gpage">p. ' + esc(f.page) + '</span></button>';
        }).join('') + '</div></div>';
    }

    // (Section « Objectif » retirée à la demande.)

    if (p.epi && p.epi.length) h += sec('Équipements de protection', pills(p.epi, 'epi'));

    // Quiz de la procédure (couvre l'information importante) — questions et
    // types mélangés (choix de réponse, vrai/faux, plusieurs réponses, ordre).
    var pqList = (window.QUIZ_PROC && window.QUIZ_PROC[p.id]) || [];
    if (pqList.length) {
      var best = pqGetBest(p.id);
      // ordre d'affichage mélangé ; data-i garde l'index d'origine pour la correction
      var pqOrder = shuffle(pqList.map(function (_, j) { return j; }));
      var pqitems = pqOrder.map(function (oi, disp) { return pqItemHTML(pqList[oi], oi, disp + 1); }).join('');
      h += '<div class="sec"><h2>Quiz — valider mes connaissances</h2>' +
        '<details class="pquiz" data-proc="' + esc(p.id) + '">' +
          '<summary><span class="pqs-t">' + pqList.length + ' questions · réponse corrigée immédiatement</span>' +
          '<span class="pqs-b">' + (best ? 'Meilleur : ' + best.s + '/' + best.n : 'Commencer') + '</span></summary>' +
          '<div class="pqbody">' + pqitems +
            '<div class="pq-actions"><button type="button" class="btn ghost pq-reset">Recommencer</button>' +
            (pqGetFails(p.id).length ? '<button type="button" class="btn ghost pq-review">Réviser mes erreurs (' + pqGetFails(p.id).length + ')</button>' : '') +
            '<span class="pq-score" aria-live="polite"></span></div>' +
          '</div>' +
        '</details></div>';
    }

    // Attestation de lecture — DIRECTEMENT après le quiz (formulaire toujours visible).
    h += attestationHTML(p);

    if (p.historique && p.historique.length) {
      h += sec('Historique des révisions', '<table class="hist"><thead><tr><th>Date</th><th>Modification</th><th>Par</th></tr></thead><tbody>' +
        p.historique.map(function (r) { return '<tr><td>' + esc(r.date) + '</td><td>' + esc(r.description) + '</td><td>' + esc(r.par) + '</td></tr>'; }).join('') +
        '</tbody></table>');
    }

    h += '</div>';
    view.innerHTML = h;
    initChecklistState();
    initGallery(figs);
    initProcQuiz(p.id);
    initAttestation(p);
  }
  function sec(title, inner) { return '<div class="sec"><h2>' + esc(title) + '</h2>' + inner + '</div>'; }

  /* ---------- Attestation de lecture par procédure ----------
     Ouvre un formulaire Airtable pré-rempli (procédure verrouillée). Le bouton
     n'apparaît que si window.SITE_CONFIG.attestation.formUrl est configuré.
     Le travailleur choisit son nom dans la liste, coche « lu et compris », envoie. */
  function attestEndpoint() {
    var c = (window.SITE_CONFIG && window.SITE_CONFIG.attestation) || null;
    return (c && typeof c.endpoint === 'string' && c.endpoint) ? c.endpoint.replace(/\/+$/, '') : '';
  }
  // Meilleur score exprimé en % (ou null si jamais joué).
  function pqBestPct(id) {
    var b = pqGetBest(id);
    return (b && b.n > 0) ? { s: b.s, n: b.n, pct: Math.round(b.s / b.n * 100) } : null;
  }
  // Le quiz de la fiche a-t-il été COMPLÉTÉ (toutes les questions répondues au
  // moins une fois, peu importe le score) ? pqSetBest n'est enregistré que
  // lorsque le quiz complet a été répondu, avec n = nombre total de questions.
  function pqCompleted(p) {
    var total = (window.QUIZ_PROC && window.QUIZ_PROC[p.id] || []).length;
    if (!total) return true;                 // pas de quiz → rien à compléter
    var b = pqGetBest(p.id);
    return !!(b && b.n === total);
  }
  function attestationHTML(p) {
    if (!attestEndpoint()) return '';
    var head = '<div class="sec attest-sec" data-proc="' + esc(p.id) + '"><h2>Attestation de lecture</h2>';
    // Conditionnel à la PASSATION du quiz : le formulaire n'apparaît qu'une
    // fois toutes les questions répondues (le score n'a pas d'importance).
    if (!pqCompleted(p)) {
      return head +
        '<p class="attest-lead">Réponds d\'abord à <b>toutes les questions du quiz</b> ci-dessus pour pouvoir attester ' +
        'ta lecture (le score n\'a pas d\'importance).</p>' +
        '<button type="button" class="btn attest-btn attest-locked" disabled>' +
        '🔒 Attester la lecture (complète d\'abord le quiz)</button></div>';
    }
    var best = pqBestPct(p.id);
    var scoreTxt = best ? best.s + '/' + best.n + ' — ' + best.pct + ' %' : '';
    return head +
      '<p class="attest-lead">Confirme que tu as <b>lu et compris</b> cette procédure.' +
      (scoreTxt ? ' Ton résultat au quiz : <b>' + scoreTxt + '</b>.' : '') +
      ' Tape ton nom (choisis-le dans la liste) puis valide — ton attestation est enregistrée pour le suivi des formations.</p>' +
      '<div class="attest-form">' +
        '<label class="attest-field"><span>Ton nom complet</span>' +
          '<input type="text" class="attest-name" placeholder="Prénom Nom" autocomplete="off" ' +
          'role="combobox" aria-autocomplete="list" aria-expanded="false"></label>' +
        '<div class="attest-sugg" role="listbox" hidden></div>' +
        '<p class="attest-hint">Commence à taper : ton nom devrait apparaître dans la liste.</p>' +
        '<button type="button" class="btn attest-btn attest-send">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>' +
        ' Attester la lecture</button>' +
        '<div class="attest-msg" aria-live="polite"></div>' +
      '</div></div>';
  }
  // Anti-doublon : un même nom + procédure + jour n'est envoyé qu'une fois.
  function attestSig(pid, name) { return pid + '|' + norm(name).trim() + '|' + new Date().toISOString().slice(0, 10); }
  function initAttestation(p) {
    var sec = document.querySelector('.attest-sec[data-proc="' + p.id + '"]'); if (!sec) return;
    var form = sec.querySelector('.attest-form'); if (!form) return;      // section déjà envoyée (état confirmé)
    var endpoint = attestEndpoint(); if (!endpoint) return;
    var input = form.querySelector('.attest-name');
    var sugg = form.querySelector('.attest-sugg');
    var hint = form.querySelector('.attest-hint');
    var sendBtn = form.querySelector('.attest-send');
    var msg = form.querySelector('.attest-msg');
    var pickedId = '', pickedName = '';
    var HINT0 = 'Commence à taper : ton nom devrait apparaître dans la liste.';
    try { input.value = localStorage.getItem('attest_name') || ''; } catch (e) {}

    function db(s) { try { return s.normalize('NFD').replace(/[̀-ͯ]/g, ''); } catch (e) { return s; } }
    function setHint(t, ok) { hint.textContent = t; hint.classList.toggle('ok', !!ok); }
    function hideSugg() { sugg.hidden = true; sugg.innerHTML = ''; input.setAttribute('aria-expanded', 'false'); }
    function clearPick() { if (pickedId) { pickedId = ''; pickedName = ''; setHint(HINT0, false); } }
    function pick(it) {
      pickedId = it.id; pickedName = it.name; input.value = it.name;
      setHint('✓ Relié à ton dossier employé.', true); hideSugg();
    }
    function hl(name, term) {
      var t = db(name.toLowerCase()), qd = db((term || '').toLowerCase()), k = qd ? t.indexOf(qd) : -1;
      if (k < 0) return esc(name);
      return esc(name.slice(0, k)) + '<b>' + esc(name.slice(k, k + qd.length)) + '</b>' + esc(name.slice(k + qd.length));
    }
    function renderSugg(list, term) {
      if (!list.length) { hideSugg(); setHint('Aucun employé trouvé — vérifie l\'orthographe (tu peux quand même attester).', false); return; }
      sugg.innerHTML = '';
      list.forEach(function (it) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'attest-item'; b.setAttribute('role', 'option');
        b.innerHTML = hl(it.name, term);
        b.addEventListener('mousedown', function (e) { e.preventDefault(); pick(it); });
        sugg.appendChild(b);
      });
      sugg.hidden = false; input.setAttribute('aria-expanded', 'true');
    }
    var tmr = null, lastReq = 0;
    function doSearch() {
      var v = (input.value || '').trim();
      if (v.length < 2) { hideSugg(); return; }
      var myReq = ++lastReq;
      fetch(endpoint + '?q=' + encodeURIComponent(v), { method: 'GET' })
        .then(function (r) { return r && r.ok ? r.json() : null; })
        .then(function (d) { if (myReq === lastReq && document.activeElement === input) renderSugg((d && d.results) || [], v); })
        .catch(function () {});
    }
    input.addEventListener('input', function () {
      if (pickedId && input.value.toLowerCase() !== pickedName.toLowerCase()) clearPick();
      if (tmr) clearTimeout(tmr); tmr = setTimeout(doSearch, 220);
    });
    input.addEventListener('focus', function () { if (!pickedId && (input.value || '').trim().length >= 2) doSearch(); });
    input.addEventListener('blur', function () { setTimeout(hideSugg, 150); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideSugg(); });

    sendBtn.onclick = function () {
      var name = (input.value || '').trim();
      if (!name) { input.focus(); setHint('Entre ton nom avant d\'attester.', false); return; }
      if (!navigator.onLine) { msg.className = 'attest-msg no'; msg.textContent = '📴 Hors-ligne : reconnecte-toi au réseau pour envoyer ton attestation.'; return; }
      var sig = attestSig(p.id, name);
      var done = '';
      try { done = localStorage.getItem('attest_sent_' + p.id) || ''; } catch (e) {}
      if (done === sig) { attestSuccess(sec, name, true); return; }
      sendBtn.disabled = true; msg.className = 'attest-msg'; msg.textContent = 'Envoi…';
      var best = pqBestPct(p.id);
      var payload = { name: name, employeeId: pickedId || '', proc: p.code || p.id,
        titre: p.titre || '', date: new Date().toISOString().slice(0, 10),
        score: best ? (best.s + '/' + best.n + ' — ' + best.pct + ' %') : '',
        revision: p.date_revision || p.date_creation || '' };
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r ? r.json().then(function (j) { return { ok: r.ok, j: j }; }) : null; })
        .then(function (res) {
          sendBtn.disabled = false;
          if (res && res.ok && res.j && res.j.ok) {
            try { localStorage.setItem('attest_sent_' + p.id, sig); localStorage.setItem('attest_name', name); } catch (e) {}
            attestSuccess(sec, name, res.j.linked);
          } else {
            msg.className = 'attest-msg no';
            msg.textContent = '⚠️ Enregistrement impossible pour le moment. Réessaie dans un instant.';
          }
        })
        .catch(function () {
          sendBtn.disabled = false;
          msg.className = 'attest-msg no';
          msg.textContent = '⚠️ Service d\'attestation injoignable. Vérifie le réseau et réessaie.';
        });
    };
    setHint(HINT0, false);
  }
  function attestSuccess(sec, name, linked) {
    sec.innerHTML = '<h2>Attestation de lecture</h2>' +
      '<div class="attest-done"><span class="attest-done-ic">✓</span>' +
      '<div><strong>Attestation enregistrée</strong>' +
      '<span>Merci ' + esc(name) + '. Ta lecture de cette procédure est enregistrée' +
      (linked ? ' et reliée à ton dossier employé' : '') + '.</span></div></div>';
  }

  /* ---------- quiz intégré à la fiche de procédure ---------- */
  // Questions ratées (mode révision) : indices d'origine, persistés par fiche.
  function pqGetFails(id) { try { var v = JSON.parse(localStorage.getItem('pq_fail_' + id)); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function pqSetFails(id, arr) { try { localStorage.setItem('pq_fail_' + id, JSON.stringify(arr)); } catch (e) {} }
  // Re-rend la section attestation (déblocage en direct quand le quiz est réussi).
  function updateAttestGate(id) {
    var sec = document.querySelector('.attest-sec[data-proc="' + id + '"]'); if (!sec) return;
    if (sec.querySelector('.attest-form') || sec.querySelector('.attest-done')) return;  // déjà débloquée
    var p = DATA.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    var html = attestationHTML(p); if (!html) return;
    var d = document.createElement('div'); d.innerHTML = html;
    sec.parentNode.replaceChild(d.firstElementChild, sec);
    initAttestation(p);       // câble l'autocomplétion + l'envoi sur la section fraîchement débloquée
  }
  function pqGetBest(id) { try { var v = JSON.parse(localStorage.getItem('pq_' + id)); return (v && typeof v.s === 'number') ? v : null; } catch (e) { return null; } }
  function pqSetBest(id, s, n) {
    var b = pqGetBest(id);
    if (!b || s > b.s) { try { localStorage.setItem('pq_' + id, JSON.stringify({ s: s, n: n })); } catch (e) {} }
  }
  // Rend une question selon son type. it.t : absent = choix de réponse ;
  // 'vf' = vrai ou faux ; 'multi' = cocher les affirmations vraies ;
  // 'ordre' = remettre les étapes en ordre (it.o est DANS l'ordre correct,
  // l'affichage est mélangé). oi = index d'origine ; num = numéro affiché.
  function pqItemHTML(it, oi, num) {
    var qhead = '<p class="pq-q"><b>' + num + '.</b> ';
    if (it.t === 'vf') {
      return '<div class="pq pq-vf" data-i="' + oi + '">' +
        qhead + '<span class="pq-type">Vrai ou faux</span>' + esc(it.q) + '</p>' +
        '<div class="pq-opts pq-opts-vf">' + ['Vrai', 'Faux'].map(function (opt, j) {
          return '<label class="pq-opt"><input type="radio" name="pq_' + oi + '" value="' + j + '"><span class="pq-mark"></span><span class="pq-txt">' + opt + '</span></label>';
        }).join('') + '</div><div class="pq-fb"></div><div class="pq-exp"></div></div>';
    }
    if (it.t === 'multi') {
      // options mélangées à l'affichage ; value = index d'origine
      var mperm = shuffle(it.o.map(function (_, j) { return j; }));
      return '<div class="pq pq-multi" data-i="' + oi + '">' +
        qhead + '<span class="pq-type">Plusieurs réponses</span>' + esc(it.q) +
        ' <span class="pq-hint">Cochez TOUTES les affirmations vraies, puis validez.</span></p>' +
        '<div class="pq-opts">' + mperm.map(function (j) {
          return '<label class="pq-opt"><input type="checkbox" value="' + j + '"><span class="pq-mark pq-sq"></span><span class="pq-txt">' + esc(it.o[j]) + '</span></label>';
        }).join('') + '</div>' +
        '<div class="pq-actions-q"><button type="button" class="btn pq-check">Valider</button></div>' +
        '<div class="pq-fb"></div><div class="pq-exp"></div></div>';
    }
    if (it.t === 'ordre') {
      var ord = shuffle(it.o.map(function (_, j) { return j; }));
      var identity = ord.every(function (v, j) { return v === j; });
      if (identity) ord.push(ord.shift());     // jamais présenté déjà en ordre
      return '<div class="pq pq-ordre" data-i="' + oi + '">' +
        qhead + '<span class="pq-type">Remettre en ordre</span>' + esc(it.q) +
        ' <span class="pq-hint">Touchez les étapes dans l\'ordre d\'exécution (1, 2, 3…), puis validez.</span></p>' +
        '<div class="pq-steps">' + ord.map(function (k) {
          return '<button type="button" class="pq-step" data-k="' + k + '"><span class="pq-num"></span><span class="pq-txt">' + esc(it.o[k]) + '</span></button>';
        }).join('') + '</div>' +
        '<div class="pq-actions-q"><button type="button" class="btn pq-check" disabled>Valider</button>' +
        '<button type="button" class="btn ghost pq-clear">Effacer</button></div>' +
        '<div class="pq-fb"></div><div class="pq-exp"></div></div>';
    }
    if (it.t === 'assoc') {
      // paires paramètre ↔ valeur : mêmes choix (mélangés) pour chaque rangée
      var rperm = shuffle(it.pairs.map(function (_, j) { return j; }));
      var selOpts = '<option value="">Choisir…</option>' + rperm.map(function (j) {
        return '<option value="' + j + '">' + esc(it.pairs[j].r) + '</option>';
      }).join('');
      return '<div class="pq pq-assoc" data-i="' + oi + '">' +
        qhead + '<span class="pq-type">Association</span>' + esc(it.q) +
        ' <span class="pq-hint">Choisissez la valeur officielle de chaque paramètre, puis validez.</span></p>' +
        '<div class="pq-pairs">' + it.pairs.map(function (pr, k) {
          return '<div class="pq-pair" data-k="' + k + '"><span class="pq-pl">' + esc(pr.l) + '</span>' +
            '<select class="pq-sel">' + selOpts + '</select><span class="pq-cor"></span></div>';
        }).join('') + '</div>' +
        '<div class="pq-actions-q"><button type="button" class="btn pq-check" disabled>Valider</button></div>' +
        '<div class="pq-fb"></div><div class="pq-exp"></div></div>';
    }
    // choix de réponse (défaut), texte à trous et chasse à l'erreur : même
    // mécanique (une seule bonne option), seul le badge change.
    var badge = it.t === 'trou' ? 'Texte à trous' : it.t === 'erreur' ? 'Chasse à l\'erreur' : '';
    // options mélangées à l'affichage (évite tout patron « toujours la même
    // position ») ; value = index d'origine, la correction est inchangée.
    var perm = shuffle(it.o.map(function (_, j) { return j; }));
    return '<div class="pq" data-i="' + oi + '">' + qhead +
      (badge ? '<span class="pq-type">' + badge + '</span>' : '') + esc(it.q) + '</p>' +
      '<div class="pq-opts">' + perm.map(function (j) {
        return '<label class="pq-opt"><input type="radio" name="pq_' + oi + '" value="' + j + '"><span class="pq-mark"></span><span class="pq-txt">' + esc(it.o[j]) + '</span></label>';
      }).join('') + '</div><div class="pq-fb"></div><div class="pq-exp"></div></div>';
  }
  function initProcQuiz(id) {
    var list = (window.QUIZ_PROC && window.QUIZ_PROC[id]) || [];
    var box = document.querySelector('.pquiz[data-proc="' + id + '"]');
    if (!list.length || !box) return;
    var resetBtn = box.querySelector('.pq-reset');
    var reviewBtn = box.querySelector('.pq-review');
    var scoreEl = box.querySelector('.pq-score');
    var fails = pqGetFails(id).filter(function (i) { return i < list.length; });
    var reviewMode = false;

    function updateScore() {
      var cards = box.querySelectorAll('.pq:not(.pq-hidden)');
      var n = cards.length, answered = 0, correct = 0;
      [].forEach.call(cards, function (c) {
        if (c.classList.contains('answered')) answered++;
        if (c.classList.contains('correct')) correct++;
      });
      if (!answered) { scoreEl.textContent = ''; scoreEl.className = 'pq-score'; return; }
      scoreEl.textContent = correct + ' bonne' + (correct > 1 ? 's' : '') + ' / ' + answered + ' répondue' + (answered > 1 ? 's' : '') + ' (sur ' + n + ')';
      if (answered === n) {
        scoreEl.className = 'pq-score ' + (correct === n ? 'perfect' : correct >= Math.ceil(n * 0.8) ? 'pass' : 'fail');
        if (!reviewMode) {                       // la note de passage porte sur le quiz COMPLET
          pqSetBest(id, correct, n);
          var sb = box.querySelector('.pqs-b'); if (sb) sb.textContent = 'Meilleur : ' + Math.max(correct, (pqGetBest(id) || { s: 0 }).s) + '/' + n;
          updateAttestGate(id);
        }
      } else { scoreEl.className = 'pq-score'; }
    }
    function showExp(card, q) {
      var exp = card.querySelector('.pq-exp');
      exp.innerHTML = '<span class="pq-ref">Référence à la procédure</span>' + esc(q.e);
      exp.classList.add('on');
    }
    function settle(card, good, msg) {
      var fb = card.querySelector('.pq-fb');
      fb.innerHTML = '<span class="pq-fi">' + (good ? ICON.check : ICON.close) + '</span>' +
        (msg || (good ? 'Bonne réponse' : 'Mauvaise réponse'));
      fb.className = 'pq-fb on ' + (good ? 'ok' : 'no');
      card.classList.add('answered', good ? 'correct' : 'incorrect');
      // carnet d'erreurs (mode révision) : une bonne réponse retire la question,
      // une mauvaise l'ajoute.
      var oi = parseInt(card.getAttribute('data-i'), 10);
      var at = fails.indexOf(oi);
      if (good && at >= 0) fails.splice(at, 1);
      else if (!good && at < 0) fails.push(oi);
      pqSetFails(id, fails);
      if (reviewBtn && !reviewMode) {
        reviewBtn.textContent = 'Réviser mes erreurs (' + fails.length + ')';
        reviewBtn.style.display = fails.length ? '' : 'none';
      }
      updateScore();
    }

    // Choix de réponse + vrai/faux : rétroaction dès qu'une option est cochée.
    // Sélecteurs d'association : activer « Valider » quand tout est choisi.
    box.addEventListener('change', function (e) {
      if (e.target && e.target.tagName === 'SELECT') {
        var ac = e.target.closest('.pq-assoc');
        if (ac && !ac.classList.contains('answered')) {
          var all = [].slice.call(ac.querySelectorAll('.pq-sel'));
          var chk = ac.querySelector('.pq-check');
          if (chk) chk.disabled = !all.every(function (s) { return s.value !== ''; });
        }
        return;
      }
      if (!e.target || e.target.type !== 'radio') return;
      var card = e.target.closest('.pq');
      if (!card || card.classList.contains('answered')) return;
      var q = list[parseInt(card.getAttribute('data-i'), 10)];
      var correct = (q.t === 'vf') ? (q.vrai ? 0 : 1) : q.a;
      var pick = parseInt(e.target.value, 10);
      var good = pick === correct;
      var optByVal = function (v) {
        var inp = card.querySelector('.pq-opts input[value="' + v + '"]');
        return inp && inp.closest('.pq-opt');
      };
      var g = optByVal(correct); if (g) g.classList.add('good');   // toujours montrer la bonne réponse
      if (!good) { var bd = optByVal(pick); if (bd) bd.classList.add('bad'); }
      [].forEach.call(card.querySelectorAll('input[type="radio"]'), function (r) { r.disabled = true; });
      showExp(card, q);
      settle(card, good);
    });

    box.addEventListener('click', function (e) {
      // remise en ordre : touche les étapes pour bâtir la séquence (1, 2, 3…)
      var step = e.target.closest && e.target.closest('.pq-step');
      if (step) {
        var sc = step.closest('.pq');
        if (sc.classList.contains('answered')) return;
        var steps = [].slice.call(sc.querySelectorAll('.pq-step'));
        if (step.classList.contains('picked')) {
          var removed = parseInt(step.getAttribute('data-pos'), 10);
          step.classList.remove('picked'); step.removeAttribute('data-pos');
          step.querySelector('.pq-num').textContent = '';
          steps.forEach(function (s) {                    // renumérote les suivantes
            var pos = parseInt(s.getAttribute('data-pos') || '-1', 10);
            if (pos > removed) { s.setAttribute('data-pos', String(pos - 1)); s.querySelector('.pq-num').textContent = String(pos); }
          });
        } else {
          var picked = steps.filter(function (s) { return s.classList.contains('picked'); }).length;
          step.classList.add('picked'); step.setAttribute('data-pos', String(picked));
          step.querySelector('.pq-num').textContent = String(picked + 1);
        }
        var done = steps.filter(function (s) { return s.classList.contains('picked'); }).length;
        var chk = sc.querySelector('.pq-check'); if (chk) chk.disabled = done !== steps.length;
        return;
      }
      var clearB = e.target.closest && e.target.closest('.pq-clear');
      if (clearB) {
        var cc = clearB.closest('.pq');
        if (cc.classList.contains('answered')) return;
        [].forEach.call(cc.querySelectorAll('.pq-step'), function (s) {
          s.classList.remove('picked'); s.removeAttribute('data-pos');
          s.querySelector('.pq-num').textContent = '';
        });
        var chk2 = cc.querySelector('.pq-check'); if (chk2) chk2.disabled = true;
        return;
      }
      var check = e.target.closest && e.target.closest('.pq-check');
      if (!check) return;
      var card = check.closest('.pq');
      if (!card || card.classList.contains('answered')) return;
      var q = list[parseInt(card.getAttribute('data-i'), 10)];

      if (card.classList.contains('pq-multi')) {
        var okSet = {}; (q.a || []).forEach(function (j) { okSet[j] = 1; });
        var good = true, wrong = 0, foundGood = 0, totalTrue = (q.a || []).length;
        [].forEach.call(card.querySelectorAll('input[type="checkbox"]'), function (b) {
          var j = parseInt(b.value, 10);
          var opt = b.closest('.pq-opt');
          b.disabled = true;
          if (okSet[j]) {
            if (b.checked) { opt.classList.add('good'); foundGood++; }
            else { opt.classList.add('missed'); good = false; }
          } else if (b.checked) { opt.classList.add('bad'); wrong++; good = false; }
        });
        check.disabled = true;
        showExp(card, q);
        settle(card, good, good
          ? 'Bonne réponse — toutes les affirmations vraies trouvées'
          : foundGood + ' vraie' + (foundGood > 1 ? 's' : '') + ' sur ' + totalTrue + ' trouvée' + (foundGood > 1 ? 's' : '') +
            (wrong ? ' · ' + wrong + ' fausse' + (wrong > 1 ? 's' : '') + ' cochée' + (wrong > 1 ? 's' : '') : ''));
      } else if (card.classList.contains('pq-assoc')) {
        var right = 0, allGoodA = true;
        [].forEach.call(card.querySelectorAll('.pq-pair'), function (row) {
          var k = parseInt(row.getAttribute('data-k'), 10);
          var sel = row.querySelector('.pq-sel');
          var v = parseInt(sel.value, 10);
          sel.disabled = true;
          if (v === k) { row.classList.add('good'); right++; }
          else {
            row.classList.add('bad'); allGoodA = false;
            row.querySelector('.pq-cor').textContent = '→ ' + q.pairs[k].r;
          }
        });
        check.disabled = true;
        showExp(card, q);
        settle(card, allGoodA, allGoodA
          ? 'Bonne réponse — toutes les associations sont exactes'
          : right + '/' + q.pairs.length + ' association' + (right > 1 ? 's' : '') + ' exacte' + (right > 1 ? 's' : ''));
      } else if (card.classList.contains('pq-ordre')) {
        var allGood = true;
        [].forEach.call(card.querySelectorAll('.pq-step'), function (s) {
          var k = parseInt(s.getAttribute('data-k'), 10);      // bonne position (0-based)
          var pos = parseInt(s.getAttribute('data-pos'), 10);  // position choisie
          if (pos === k) { s.classList.add('good'); }
          else { s.classList.add('bad'); allGood = false;
                 s.querySelector('.pq-num').textContent = (pos + 1) + ' → ' + (k + 1); }
          s.disabled = true;
        });
        check.disabled = true;
        var clr = card.querySelector('.pq-clear'); if (clr) clr.disabled = true;
        var exp = card.querySelector('.pq-exp');
        exp.innerHTML = '<span class="pq-ref">Ordre correct selon la procédure</span>' +
          '<ol class="pq-ol">' + q.o.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' +
          (q.e ? '<span class="pq-ref">Référence à la procédure</span>' + esc(q.e) : '');
        exp.classList.add('on');
        settle(card, allGood, allGood ? 'Bon ordre'
          : 'Ordre incorrect — sur chaque étape en rouge : votre position → la bonne position');
      }
    });

    function resetAll() {
      [].forEach.call(box.querySelectorAll('.pq'), function (c) { c.classList.remove('answered', 'correct', 'incorrect'); });
      [].forEach.call(box.querySelectorAll('.pq input'), function (r) { r.checked = false; r.disabled = false; });
      [].forEach.call(box.querySelectorAll('.pq-opt'), function (o) { o.classList.remove('good', 'bad', 'missed'); });
      [].forEach.call(box.querySelectorAll('.pq-step'), function (s) {
        s.classList.remove('picked', 'good', 'bad'); s.removeAttribute('data-pos'); s.disabled = false;
        var nEl = s.querySelector('.pq-num'); if (nEl) nEl.textContent = '';
      });
      [].forEach.call(box.querySelectorAll('.pq-pair'), function (row) {
        row.classList.remove('good', 'bad');
        var sel = row.querySelector('.pq-sel'); sel.value = ''; sel.disabled = false;
        row.querySelector('.pq-cor').textContent = '';
      });
      [].forEach.call(box.querySelectorAll('.pq-check'), function (b) { b.disabled = !!(b.closest('.pq-ordre') || b.closest('.pq-assoc')); });
      [].forEach.call(box.querySelectorAll('.pq-clear'), function (b) { b.disabled = false; });
      [].forEach.call(box.querySelectorAll('.pq-fb'), function (f) { f.className = 'pq-fb'; f.innerHTML = ''; });
      [].forEach.call(box.querySelectorAll('.pq-exp'), function (ex) { ex.classList.remove('on'); ex.innerHTML = ''; });
      scoreEl.textContent = ''; scoreEl.className = 'pq-score';
    }
    resetBtn.onclick = resetAll;

    // Mode révision : ne montrer que les questions ratées lors des passages
    // précédents ; « Revoir tout le quiz » restaure la liste complète.
    if (reviewBtn) reviewBtn.onclick = function () {
      reviewMode = !reviewMode && fails.length > 0;
      resetAll();
      var failSet = {};
      fails.forEach(function (i) { failSet[i] = 1; });
      [].forEach.call(box.querySelectorAll('.pq'), function (c) {
        var oi = parseInt(c.getAttribute('data-i'), 10);
        c.classList.toggle('pq-hidden', reviewMode && !failSet[oi]);
      });
      reviewBtn.textContent = reviewMode ? 'Revoir tout le quiz' : 'Réviser mes erreurs (' + fails.length + ')';
      reviewBtn.style.display = (reviewMode || fails.length) ? '' : 'none';
    };
  }

  /* ---------- galerie photos / schémas + visionneuse plein écran ---------- */
  function initGallery(figs) {
    if (!figs || !figs.length) return;
    var lb = document.getElementById('lightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'lightbox';
      lb.className = 'lightbox';
      lb.innerHTML =
        '<button class="lb-close" type="button" aria-label="Fermer">' + ICON.close + '</button>' +
        '<button class="lb-nav lb-prev" type="button" aria-label="Précédent">' + ICON.back + '</button>' +
        '<img class="lb-img" alt="">' +
        '<button class="lb-nav lb-next" type="button" aria-label="Suivant">' + ICON.fwd + '</button>' +
        '<span class="lb-count"></span>';
      document.body.appendChild(lb);
    }
    var img = lb.querySelector('.lb-img'), count = lb.querySelector('.lb-count'), cur = 0;
    function show(i) {
      cur = (i + figs.length) % figs.length;
      img.src = figs[cur].src;
      count.textContent = (cur + 1) + ' / ' + figs.length + '  ·  p. ' + figs[cur].page;
    }
    function open(i) { show(i); lb.classList.add('on'); }
    function close() { lb.classList.remove('on'); img.src = ''; }
    var gal = document.querySelector('.gallery');
    if (gal) gal.onclick = function (e) {
      var b = e.target.closest ? e.target.closest('.gfig') : null;
      if (b) open(parseInt(b.getAttribute('data-i'), 10));
    };
    lb.querySelector('.lb-close').onclick = close;
    lb.querySelector('.lb-prev').onclick = function (e) { e.stopPropagation(); show(cur - 1); };
    lb.querySelector('.lb-next').onclick = function (e) { e.stopPropagation(); show(cur + 1); };
    lb.onclick = function (e) { if (e.target === lb) close(); };
    document.onkeydown = function (e) {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'ArrowRight') show(cur + 1);
    };
  }

  /* ---------- liste de vérification (checklist) ---------- */
  function ckGet(id) { try { return JSON.parse(localStorage.getItem('ck_' + id) || '[]'); } catch (e) { return []; } }
  function ckSet(id, a) { try { localStorage.setItem('ck_' + id, JSON.stringify(a)); } catch (e) {} }
  function ckUpdate(box) {
    var cbs = box.querySelectorAll('input[type=checkbox]');
    var n = cbs.length, c = [].filter.call(cbs, function (x) { return x.checked; }).length;
    box.querySelector('.ckbar i').style.width = (n ? Math.round(c / n * 100) : 0) + '%';
    box.querySelector('.ckcount').textContent = c + ' / ' + n + ' vérifié' + (c > 1 ? 's' : '');
    box.classList.toggle('done', n > 0 && c === n);
  }
  function initChecklistState() {
    var box = document.querySelector('.checklist'); if (!box) return;
    var done = ckGet(box.getAttribute('data-proc'));
    [].forEach.call(box.querySelectorAll('input[type=checkbox]'), function (cb) {
      cb.checked = done.indexOf(parseInt(cb.getAttribute('data-i'), 10)) >= 0;
    });
    ckUpdate(box);
  }
  function initChecklistEvents() {
    document.addEventListener('change', function (e) {
      var box = e.target.closest ? e.target.closest('.checklist') : null;
      if (!box || e.target.type !== 'checkbox') return;
      var checked = [].filter.call(box.querySelectorAll('input[type=checkbox]'), function (x) { return x.checked; })
        .map(function (x) { return parseInt(x.getAttribute('data-i'), 10); });
      ckSet(box.getAttribute('data-proc'), checked); ckUpdate(box);
    });
    document.addEventListener('click', function (e) {
      if (!e.target.classList || !e.target.classList.contains('ckreset')) return;
      var box = e.target.closest('.checklist'); if (!box) return;
      [].forEach.call(box.querySelectorAll('input[type=checkbox]'), function (cb) { cb.checked = false; });
      ckSet(box.getAttribute('data-proc'), []); ckUpdate(box);
    });
  }
  function pills(arr, cls) {
    return '<div class="pill-list">' + arr.map(function (x) { return '<span class="pill ' + cls + '">' + esc(x) + '</span>'; }).join('') + '</div>';
  }

  /* ---------- vue : Code de sécurité ---------- */
  function renderCode(view) {
    if (!CODE || !CODE.chapitres) { view.innerHTML = '<div class="wrap"><div class="empty">Le Code de sécurité n\'est pas encore disponible.</div></div>'; return; }
    var CHAP_ICON = {
      'energie-cadenassage': '🔒', 'air-comprime-boyaux': '💨', 'zones-exclusion-positionnement': '🚧',
      'pieces-mouvement-mat': '⚙️', 'protection-chutes-explosifs': '💥', 'manutention-levage': '⛓️',
      'outils-cles': '🔧', 'inspection-verification': '🔍', 'communication-signalisation': '🚩',
      'epi-eau-ventilation': '🦺',
      'dd-tube-carottier': '🪨', 'dd-cable-treuil': '🪢', 'dd-planchers-hauteur': '🪜',
      'dd-support-tiges': '⛓️', 'dd-forage-distance': '🎯', 'dd-cimentation-entretien': '🧱',
      'dd-gaz': '💨', 'dd-vehicules': '🚜', 'ith-defoncage-accueil': '🧨'
    };
    // Le Code affiché suit la section courante : Forage au diamant (DD) si on
    // vient de la section Diamant, sinon Forage de production (ITH). On ne
    // montre que le code concerné (pas les deux).
    codeFam = (state.fam === 'diamant') ? 'dd' : 'ith';
    // 'commun' = chapitre affiché dans les deux codes.
    var chapitres = CODE.chapitres.filter(function (c) { var f = c.famille || 'ith'; return f === codeFam || f === 'commun'; });
    var isDD = codeFam === 'dd';
    var nbArt = chapitres.reduce(function (n, c) { return n + ((c.articles || []).length); }, 0);

    // ---- Valeurs-clés de référence : agrégées FIDÈLEMENT des procédures (aucune invention) ----
    var cats = [
      { t: 'Distances, zones et hauteurs', re: /(distance|zone|exclusion|hauteur|espacement|plancher|collet)/, rows: [] },
      { t: 'Air, pression et température', re: /(pression|temperature|degres|°f|boyau|air|psi)/, rows: [] },
      { t: 'Diamètres et dimensions', re: /(diametre|pouce|\bpo\b|casing|trou|monterie|alesage)/, rows: [] },
      { t: 'Poids, charges et gréage', re: /(poids|lbs|livres|charge|capacite|\bkg\b|manille|elingue|chaine|grade|ancrage)/, rows: [] },
      { t: 'Autres repères', re: null, rows: [] }
    ];
    var seenKV = {};
    (DATA || []).filter(function (p) { return (p.famille === 'diamant') === isDD; }).forEach(function (p) {
      (p.valeurs_cles || []).forEach(function (v) {
        if (!v || !v.libelle || v.valeur == null) return;
        var k = norm(v.libelle + '|' + v.valeur); if (seenKV[k]) return; seenKV[k] = 1;
        var nl = norm(v.libelle + ' ' + v.valeur);
        var cat = cats.find(function (c) { return c.re && c.re.test(nl); }) || cats[cats.length - 1];
        cat.rows.push({ l: v.libelle, v: v.valeur, src: p.code || p.titre, id: p.id });
      });
    });
    var nbKV = Object.keys(seenKV).length;
    var kvHTML = cats.filter(function (c) { return c.rows.length; }).map(function (c) {
      return '<div class="kvgrp"><h4>' + esc(c.t) + '</h4><table class="kvt"><tbody>' +
        c.rows.map(function (r) {
          return '<tr><td class="kvl">' + esc(r.l) + '</td><td class="kvv">' + esc(r.v) + '</td>' +
            '<td class="kvs"><a href="#/p/' + esc(r.id) + '">' + esc(r.src) + '</a></td></tr>';
        }).join('') + '</tbody></table></div>';
    }).join('');
    var valuesSection = nbKV ? '<section class="chap" id="chap-valeurs-cles"><h2><span class="cic">📊</span> Valeurs-clés de référence</h2>' +
      '<p class="ci">Repère rapide des valeurs chiffrées (distances, pressions, dimensions, charges) extraites des procédures. Le détail figure sur chaque fiche.</p>' +
      '<details class="kvbox"><summary>Afficher les ' + nbKV + ' valeurs-clés</summary>' + kvHTML + '</details></section>' : '';

    var toc = (nbKV ? '<a href="#chap-valeurs-cles">📊 Valeurs-clés de référence</a>' : '') +
      chapitres.map(function (c) {
        return '<a href="#chap-' + esc(c.id) + '">' + (CHAP_ICON[c.id] || '•') + ' ' + esc(c.titre) + '</a>';
      }).join('');
    var body = chapitres.map(function (c) {
      var arts = (c.articles || []).map(function (a) {
        var srcs = (a.sources || []).map(function (s) {
          var sid = CODE_TO_ID[String(s).toUpperCase()];
          return sid ? '<a href="#/p/' + esc(sid) + '">' + esc(s) + '</a>' : '<a>' + esc(s) + '</a>';
        }).join('');
        return '<div class="art"><h3><span class="an">' + esc(a.num) + '</span> ' + esc(a.titre) + '</h3>' +
          '<p>' + esc(a.texte) + '</p>' + (srcs ? '<div class="srcs">' + srcs + '</div>' : '') + '</div>';
      }).join('');
      return '<section class="chap" id="chap-' + esc(c.id) + '"><h2><span class="cic">' + (CHAP_ICON[c.id] || '•') + '</span> ' + esc(c.titre) + '</h2>' +
        (c.intro ? '<p class="ci">' + esc(c.intro) + '</p>' : '') + arts + '</section>';
    }).join('');

    var preamb = isDD
      ? "Ce volet du Code de sécurité regroupe les consignes propres au forage au diamant (carottage) — foreuses STM-1500 et DR-600. Les règles sont extraites des procédures de forage au diamant (PRO-DD-ST, PRO-OP-DD, DR-600, SS-DD-ST, STD-DD) et ont un caractère obligatoire. Pour les opérations communes (cadenassage, manutention, ÉPI…), se référer aussi au Code de sécurité du forage de production."
      : (CODE.preambule || '');
    var volet = isDD ? 'Forage au diamant (DD)' : 'Forage de production (ITH)';
    var metaKV = nbKV ? ' · ' + nbKV + ' valeurs-clés' : '';
    view.innerHTML =
      '<section class="code-hero"><div class="wrap">' +
        '<span class="eyebrow">Règlement interne</span>' +
        '<h1>Code de sécurité du forage</h1>' +
        '<div class="code-volet ' + (isDD ? 'dd' : 'ith') + '">' + (isDD ? '💎' : '🛠️') + ' Volet : ' + esc(volet) + '</div>' +
        '<div class="code-meta">' + chapitres.length + ' chapitres · ' + nbArt + ' articles' + metaKV + '</div>' +
        '<div class="preamble">' + esc(preamb) + '</div>' +
        '<div class="code-tools">' +
          '<div class="csearch">' + ICON.search + '<input id="codeSearch" type="search" placeholder="Rechercher dans le code…" autocomplete="off"></div>' +
          '<button class="btn ghost" id="codePrint" type="button">Imprimer</button>' +
        '</div>' +
      '</div></section>' +
      '<div class="wrap"><div class="code-layout">' +
        '<nav class="code-toc" id="codeToc">' + toc + '</nav>' +
        '<div id="codeBody">' + valuesSection + body + '<div class="empty" id="codeNoRes" style="display:none">Aucun article ne correspond à votre recherche.</div></div>' +
      '</div></div>';
    initScrollspy();
    initCodeTools();
  }
  function initCodeTools() {
    var inp = document.getElementById('codeSearch');
    var noRes = document.getElementById('codeNoRes');
    if (inp) inp.addEventListener('input', function () {
      var q = norm(inp.value), shown = 0;
      [].forEach.call(document.querySelectorAll('#codeBody .chap'), function (sec) {
        var arts = sec.querySelectorAll('.art'), any = false;
        if (arts.length) {
          [].forEach.call(arts, function (a) {
            var m = !q || norm(a.textContent).indexOf(q) >= 0;
            a.style.display = m ? '' : 'none'; if (m) any = true;
          });
          sec.style.display = any ? '' : 'none';
        } else { // section valeurs-clés (pas d'.art)
          any = !q || norm(sec.textContent).indexOf(q) >= 0;
          sec.style.display = any ? '' : 'none';
        }
        if (any) shown++;
      });
      if (noRes) noRes.style.display = shown ? 'none' : 'block';
    });
    var pr = document.getElementById('codePrint');
    if (pr) pr.addEventListener('click', function () {
      var kv = document.querySelector('#codeBody .kvbox'); if (kv) kv.open = true;  // imprimer les valeurs-clés
      document.body.classList.add('print-code');
      var done = function () { document.body.classList.remove('print-code'); window.removeEventListener('afterprint', done); };
      window.addEventListener('afterprint', done);
      window.print();
      setTimeout(done, 1500);
    });
  }
  function initScrollspy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('#codeToc a'));
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    if (!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          if (map[en.target.id]) map[en.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    document.querySelectorAll('.chap').forEach(function (s) { obs.observe(s); });
  }

  /* ---------- quiz éclair sécurité ---------- */
  var quizSt = null;
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var QTYPE_LBL = { vf: 'Vrai ou faux', multi: 'Plusieurs réponses', ordre: 'Remettre en ordre',
    trou: 'Texte à trous', erreur: 'Chasse à l\'erreur' };
  /* Pool du quiz éclair : les questions du pool historique (window.QUIZ) + les
     questions typées des fiches (vrai/faux, texte à trous, chasse à l'erreur,
     plusieurs réponses, remise en ordre) adaptées avec leur procédure source.
     Les associations restent sur les fiches. */
  function quizPool() {
    var pool = (window.QUIZ || []).slice();
    var QP = window.QUIZ_PROC || {};
    var byId = {};
    DATA.forEach(function (p) { byId[p.id] = p; });
    Object.keys(QP).forEach(function (pid) {
      var p = byId[pid]; if (!p) return;
      QP[pid].forEach(function (q) {
        if (!q.t || q.t === 'assoc') return;
        var item = { type: q.t, question: q.q, explication: q.e, sourceId: pid,
          code: p.code || '', titre: p.titre, categorie: p.categorie };
        if (q.t === 'vf') { item.options = ['Vrai', 'Faux']; item.answer = q.vrai ? 0 : 1; }
        else if (q.t === 'multi') { item.options = q.o; item.answers = q.a; }
        else if (q.t === 'ordre') { item.steps = q.o; }
        else { item.options = q.o; item.answer = q.a; }   // trou / erreur
        pool.push(item);
      });
    });
    return pool;
  }

  function renderQuiz(view) {
    var POOL = quizPool();
    if (!POOL.length) { view.innerHTML = '<div class="wrap"><div class="empty">Le quiz n\'est pas encore disponible.</div></div>'; return; }
    quizSt = null;
    var cats = {}; POOL.forEach(function (q) { cats[q.categorie] = (cats[q.categorie] || 0) + 1; });
    var catOpts = '<option value="">Toutes les catégories</option>' + Object.keys(cats).sort().map(function (c) {
      return '<option value="' + esc(c) + '">' + esc(c) + ' (' + cats[c] + ')</option>'; }).join('');
    view.innerHTML = '<section class="quizhero"><div class="wrap">' +
      '<span class="eyebrow">Auto-vérification · pas une formation</span>' +
      '<h1>Quiz éclair <span class="hl">sécurité</span></h1>' +
      '<p class="lead">Teste tes réflexes sur les consignes, distances et interdictions des procédures. ' + POOL.length + ' questions au total (choix de réponse, vrai ou faux, textes à trous, remises en ordre…), tirées au hasard.</p>' +
      '<div class="quizstart">' +
        '<label class="qsf"><span>Nombre de questions</span><select class="f" id="qN"><option>5</option><option selected>10</option><option>15</option><option value="999">Toutes</option></select></label>' +
        '<label class="qsf"><span>Catégorie</span><select class="f" id="qCat">' + catOpts + '</select></label>' +
        '<button class="btn" id="qStart">Démarrer le quiz</button>' +
      '</div>' +
    '</div></section>';
    $('#qStart').onclick = function () {
      var n = parseInt($('#qN').value, 10), cat = $('#qCat').value;
      var pool = POOL.filter(function (q) { return !cat || q.categorie === cat; });
      pool = shuffle(pool).slice(0, Math.min(n, pool.length));
      quizSt = { pool: pool, idx: 0, score: 0, answered: false };
      renderQ(view);
    };
  }
  function renderQ(view) {
    var s = quizSt, q = s.pool[s.idx];
    var body, hint = '';
    if (q.type === 'multi') {
      body = '<div class="qopts">' + shuffle(q.options.map(function (_, i) { return i; })).map(function (i) {
        return '<button class="qopt qsel" data-i="' + i + '">' + esc(q.options[i]) + '</button>'; }).join('') + '</div>';
      hint = 'Sélectionne TOUTES les affirmations vraies, puis valide.';
    } else if (q.type === 'ordre') {
      var ord = shuffle(q.steps.map(function (_, i) { return i; }));
      if (ord.every(function (v, j) { return v === j; })) ord.push(ord.shift());
      body = '<div class="pq-steps qsteps">' + ord.map(function (k) {
        return '<button type="button" class="pq-step" data-k="' + k + '"><span class="pq-num"></span><span class="pq-txt">' + esc(q.steps[k]) + '</span></button>';
      }).join('') + '</div>';
      hint = 'Touche les étapes dans l\'ordre d\'exécution (1, 2, 3…), puis valide.';
    } else {
      body = '<div class="qopts">' + shuffle(q.options.map(function (_, i) { return i; })).map(function (i) {
        return '<button class="qopt" data-i="' + i + '">' + esc(q.options[i]) + '</button>'; }).join('') + '</div>';
    }
    var needV = (q.type === 'multi' || q.type === 'ordre');
    view.innerHTML = '<div class="wrap quizwrap">' +
      '<div class="qtop"><a class="back" href="#/quiz">' + ICON.back + ' Quitter</a>' +
        '<span class="qscore">Score : ' + s.score + '</span></div>' +
      '<div class="qbar"><i style="width:' + Math.round(s.idx / s.pool.length * 100) + '%"></i></div>' +
      '<div class="qcard"><div class="qtag">' + esc(q.code || q.categorie) +
        (q.type && QTYPE_LBL[q.type] ? ' · ' + QTYPE_LBL[q.type] : '') +
        ' · Question ' + (s.idx + 1) + '/' + s.pool.length + '</div>' +
        '<h2 class="qq">' + esc(q.question) + '</h2>' +
        (hint ? '<p class="qhint">' + hint + '</p>' : '') +
        body +
        (needV ? '<div class="qvald"><button class="btn" id="qValider"' + (q.type === 'ordre' ? ' disabled' : '') + '>Valider</button></div>' : '') +
        '<div class="qfb" id="qfb"></div>' +
      '</div></div>';

    if (q.type === 'multi') {
      [].forEach.call(document.querySelectorAll('.qsel'), function (b) {
        b.onclick = function () { if (!s.answered) b.classList.toggle('sel'); };
      });
      $('#qValider').onclick = function () {
        if (s.answered) return; s.answered = true;
        var okSet = {}; q.answers.forEach(function (i) { okSet[i] = 1; });
        var good = true;
        [].forEach.call(document.querySelectorAll('.qsel'), function (b) {
          var i = parseInt(b.getAttribute('data-i'), 10), sel = b.classList.contains('sel');
          b.classList.add('locked');
          if (okSet[i]) { b.classList.add(sel ? 'ok' : 'missed'); if (!sel) good = false; }
          else if (sel) { b.classList.add('bad'); good = false; }
        });
        $('#qValider').disabled = true;
        qFeedback(view, q, good);
      };
    } else if (q.type === 'ordre') {
      [].forEach.call(document.querySelectorAll('.qsteps .pq-step'), function (st) {
        st.onclick = function () {
          if (s.answered) return;
          var steps = [].slice.call(document.querySelectorAll('.qsteps .pq-step'));
          if (st.classList.contains('picked')) {
            var removed = parseInt(st.getAttribute('data-pos'), 10);
            st.classList.remove('picked'); st.removeAttribute('data-pos');
            st.querySelector('.pq-num').textContent = '';
            steps.forEach(function (x) {
              var pos = parseInt(x.getAttribute('data-pos') || '-1', 10);
              if (pos > removed) { x.setAttribute('data-pos', String(pos - 1)); x.querySelector('.pq-num').textContent = String(pos); }
            });
          } else {
            var picked = steps.filter(function (x) { return x.classList.contains('picked'); }).length;
            st.classList.add('picked'); st.setAttribute('data-pos', String(picked));
            st.querySelector('.pq-num').textContent = String(picked + 1);
          }
          var done = steps.filter(function (x) { return x.classList.contains('picked'); }).length;
          $('#qValider').disabled = done !== steps.length;
        };
      });
      $('#qValider').onclick = function () {
        if (s.answered || $('#qValider').disabled) return; s.answered = true;
        var good = true;
        [].forEach.call(document.querySelectorAll('.qsteps .pq-step'), function (st) {
          var k = parseInt(st.getAttribute('data-k'), 10), pos = parseInt(st.getAttribute('data-pos'), 10);
          if (pos === k) st.classList.add('good');
          else { st.classList.add('bad'); good = false; st.querySelector('.pq-num').textContent = (pos + 1) + ' → ' + (k + 1); }
          st.disabled = true;
        });
        $('#qValider').disabled = true;
        qFeedback(view, q, good);
      };
    } else {
      [].forEach.call(document.querySelectorAll('.qopt'), function (b) {
        b.onclick = function () { pick(view, parseInt(b.getAttribute('data-i'), 10)); };
      });
    }
  }
  function pick(view, i) {
    var s = quizSt; if (s.answered) return; s.answered = true;
    var q = s.pool[s.idx], correct = q.answer;
    [].forEach.call(document.querySelectorAll('.qopt'), function (b) {
      b.classList.add('locked');
      var bi = parseInt(b.getAttribute('data-i'), 10);
      if (bi === correct) b.classList.add('ok'); else if (bi === i) b.classList.add('bad');
    });
    qFeedback(view, q, i === correct);
  }
  function qFeedback(view, q, good) {
    var s = quizSt;
    if (good) s.score++;
    var qsc = document.querySelector('.qscore'); if (qsc) qsc.textContent = 'Score : ' + s.score;
    var src = q.sourceId ? '<div class="qsrc">Source : <a href="#/p/' + esc(q.sourceId) + '">' + esc(q.code || q.titre) + '</a></div>' : '';
    $('#qfb').innerHTML = '<div class="qexp ' + (good ? 'good' : 'wrong') + '">' +
      '<b>' + (good ? '✓ Bonne réponse' : '✗ Mauvaise réponse') + '</b>' +
      '<p>' + esc(q.explication) + '</p>' + src +
      '<button class="btn" id="qNext">' + (s.idx + 1 < s.pool.length ? 'Question suivante' : 'Voir le résultat') + '</button></div>';
    $('#qNext').onclick = function () { s.idx++; s.answered = false; if (s.idx >= s.pool.length) renderResult(view); else renderQ(view); };
  }
  function renderResult(view) {
    var s = quizSt, pct = Math.round(s.score / s.pool.length * 100);
    var msg = pct >= 80 ? 'Excellent — des réflexes solides.' : pct >= 60 ? 'Correct, mais quelques consignes à revoir.' : 'À retravailler : consulte les fiches et les PDF officiels.';
    view.innerHTML = '<div class="wrap quizwrap"><div class="qresult">' +
      '<div class="qring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
      '<h2>' + s.score + ' / ' + s.pool.length + '</h2><p class="lead">' + esc(msg) + '</p>' +
      '<div class="qacts"><button class="btn" id="qAgain">Recommencer</button>' +
        '<a class="btn ghost" href="#/procedures">Retour aux procédures</a></div></div></div>';
    $('#qAgain').onclick = function () { renderQuiz(view); };
  }

  /* ---------- portail ---------- */
  function renderPortail(view) {
    var nProd = DATA.filter(function (p) { return p.famille !== 'diamant'; }).length;
    var nDiam = DATA.filter(function (p) { return p.famille === 'diamant'; }).length;
    view.innerHTML = '<section class="portal"><div class="wrap">' +
      '<div class="phead2"><img src="images/logo_roger.png" alt="Machines Roger International"><div><h1>Sécurité du forage</h1><p>Machines Roger International</p></div></div>' +
      '<p class="plead">Choisis ton espace.</p>' +
      '<div class="portal-cards">' +
        '<a class="portal-card kb" href="#/procedures"><div class="pc-ic">' + ICON.doc + '</div>' +
          '<h2>Foreuses ITH / CUBEX</h2><p>Procédures de forage et d\'alésage (ITH, CUBEX, V-30) : consignes, valeurs-clés, PDF officiel, quiz et Code de sécurité.</p>' +
          '<div class="pc-meta">' + nProd + ' procédures · disponible hors-ligne</div>' +
          '<span class="go">Entrer ' + ICON.arrow + '</span></a>' +
        '<a class="portal-card diam" href="#/diamant"><div class="pc-ic">' + ICON.doc + '</div>' +
          '<h2>Forage au diamant</h2><p>Procédures de forage au diamant : carottage, planchers, déplacements (DR-600, STM-1500), sécurité. PDF officiel visionnable et recherchable.</p>' +
          '<div class="pc-meta">' + nDiam + ' procédures · disponible hors-ligne</div>' +
          '<span class="go">Entrer ' + ICON.arrow + '</span></a>' +
      '</div>' +
    '</div></section>';
  }

  /* ---------- installation PWA ---------- */
  var deferredPrompt = null;
  function isStandalone() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
      window.navigator.standalone === true;
  }
  function isIOS() {
    var ua = navigator.userAgent || '';
    return /iphone|ipad|ipod/i.test(ua) ||
      (/(macintosh)/i.test(ua) && 'ontouchend' in document); // iPadOS se fait passer pour Mac
  }
  function doInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () { deferredPrompt = null; renderInstall(); updateInstallBtn(); });
    } else if (isIOS()) {
      toast('Sur iPhone/iPad : touchez Partager ⬆️ puis « Sur l\'écran d\'accueil ».');
    } else {
      toast('Menu du navigateur (⋮) → « Installer l\'application » ou « Ajouter à l\'écran d\'accueil ».');
    }
  }
  function updateInstallBtn() {
    var b = $('#installBtn'); if (!b) return;
    b.style.display = (deferredPrompt && !isStandalone()) ? 'inline-flex' : 'none';
  }
  // Carte « Installer l'application » sur l'accueil — visible tant que l'app
  // n'est pas déjà installée (mode autonome).
  function renderInstall() {
    var box = $('#install'); if (!box) return;
    if (isStandalone()) { box.innerHTML = ''; return; }
    var hint = isIOS()
      ? 'Sur iPhone/iPad : touchez <b>Partager ⬆️</b> puis <b>« Sur l\'écran d\'accueil »</b>.'
      : 'Installez l\'application sur votre appareil pour un accès rapide et hors-ligne.';
    box.innerHTML = '<div class="offcard install"><span class="offic">' + INSTALL_ICON + '</span>' +
      '<div class="offtxt"><b>Installer l\'application</b><span>' + hint + '</span></div>' +
      '<button class="btn" id="installCardBtn">Installer</button></div>';
    var btn = $('#installCardBtn'); if (btn) btn.onclick = doInstall;
  }
  function initInstall() {
    updateInstallBtn();
    var b = $('#installBtn'); if (b) b.addEventListener('click', doInstall);
  }
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferredPrompt = e;
    updateInstallBtn(); renderInstall();
  });
  window.addEventListener('appinstalled', function () {
    deferredPrompt = null; updateInstallBtn(); renderInstall();
    toast('Application installée. Retrouvez-la sur votre écran d\'accueil.');
  });

  var toastT;
  function toast(msg) {
    var t = $('#toast'); t.innerHTML = '<b>' + esc(msg) + '</b>';
    t.classList.add('show'); clearTimeout(toastT);
    toastT = setTimeout(function () { t.classList.remove('show'); }, 5000);
  }

  /* ---------- démarrage ---------- */
  window.addEventListener('hashchange', route);
  document.addEventListener('DOMContentLoaded', function () {
    route(); initInstall(); initChecklistEvents();
  });
})();
