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
    else if (h.indexOf('#/formation/') === 0) { renderModule(view, h.slice(12)); setNav('formation'); }
    else if (h.indexOf('#/formation') === 0) { renderFormation(view); setNav('formation'); }
    else if (h.indexOf('#/attestation') === 0) { renderAttestation(view); setNav('formation'); }
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
  function famData() {
    return DATA.filter(function (p) {
      return state.fam === 'diamant' ? p.famille === 'diamant' : p.famille !== 'diamant';
    });
  }
  // Classement des filtres : catégories par flux de travail, machines regroupées
  var CAT_ORDER = ['Forage', 'Alésage', 'Carottage & tube', 'Cimentation', 'Installation', 'Installation & plancher',
    'Manutention', 'Maintenance', 'Intervention', 'Déplacement', 'Équipements & véhicules', 'Démobilisation', 'Sécurité'];
  var MACH_ORDER = ['ITH', 'V-30', 'Centralisateur', 'Marteau', 'Compresseur'];
  function mainMachine(m) {
    var s = norm(m);
    if (s.indexOf('cubex') >= 0) return 'ITH';   // CUBEX = foreuse ITH (même chose)
    if (s.indexOf('v-30') >= 0 || s.indexOf('v30') >= 0 || s.indexOf('aleseuse') >= 0) return 'V-30';
    if (s.indexOf('centralisateur') >= 0) return 'Centralisateur';
    if (s.indexOf('marteau') >= 0) return 'Marteau';
    if (s.indexOf('compresseur') >= 0 || s.indexOf('booster') >= 0) return 'Compresseur';
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
    q.addEventListener('input', function () { state.q = q.value; drawList(); });
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

  /* ---------- disponibilité hors-ligne (pré-téléchargement des PDF) ---------- */
  var DL_ICON = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>';
  var INSTALL_ICON = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M12 7v7m0 0l-3-3m3 3l3-3"/><line x1="11" y1="18.5" x2="13" y2="18.5"/></svg>';
  function offlineAssets() {
    var u = ['./', 'index.html', 'styles.css', 'config.js', 'data.js', 'quiz.js', 'app.js',
      'manifest.webmanifest', 'images/logo_roger.png', 'icons/icon-192.png', 'icons/icon-512.png'];
    DATA.forEach(function (p) { u.push('pdf/' + encodeURIComponent(p.id) + '.pdf'); });
    u.push('pdf/centralisateur-dessin.pdf');
    if (window.FIGURES) {
      Object.keys(window.FIGURES).forEach(function (id) {
        (window.FIGURES[id] || []).forEach(function (f) { if (f && f.src) u.push(f.src); });
      });
    }
    if (window.PAGES) {
      Object.keys(window.PAGES).forEach(function (key) {
        (window.PAGES[key] || []).forEach(function (src) { if (src) u.push(src); });
      });
    }
    return u;
  }
  function offlineReady() { try { return localStorage.getItem('offline_ready') === '1'; } catch (e) { return false; } }
  /* Les PDF sont désormais pré-téléchargés automatiquement par le service
     worker dès l'installation. On vérifie leur présence réelle dans le Cache
     Storage pour afficher « Disponible hors-ligne » sans attendre un clic. */
  function verifyOfflineCache() {
    if (DEMO || !('caches' in window)) return;
    var pdfs = DATA.map(function (p) { return 'pdf/' + encodeURIComponent(p.id) + '.pdf'; });
    pdfs.push('pdf/centralisateur-dessin.pdf');
    if (window.FIGURES) {
      Object.keys(window.FIGURES).forEach(function (id) {
        (window.FIGURES[id] || []).forEach(function (f) { if (f && f.src) pdfs.push(f.src); });
      });
    }
    if (window.PAGES) {
      Object.keys(window.PAGES).forEach(function (key) {
        (window.PAGES[key] || []).forEach(function (src) { if (src) pdfs.push(src); });
      });
    }
    Promise.all(pdfs.map(function (u) { return caches.match(u).then(function (r) { return !!r; }); }))
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
    var nPdf = DATA.length + 1;
    if (offlineReady()) {
      box.innerHTML = '<div class="offcard ok"><span class="offic">' + ICON.check + '</span>' +
        '<div class="offtxt"><b>Disponible hors-ligne</b><span>Toutes les fiches, les ' + nPdf + ' PDF et les figures sont enregistrés sur cet appareil.</span></div>' +
        '<button class="btn ghost" id="offBtn">Mettre à jour</button></div>';
    } else {
      box.innerHTML = '<div class="offcard"><span class="offic">' + DL_ICON + '</span>' +
        '<div class="offtxt"><b>Préparer la consultation hors-ligne</b><span>Télécharge toutes les fiches, les ' + nPdf + ' PDF et les figures pour les consulter sans réseau (sous terre).</span></div>' +
        '<button class="btn" id="offBtn">Tout télécharger</button></div>';
    }
    $('#offBtn').onclick = startPrecache;
  }
  function startPrecache() {
    var box = $('#offline'); if (!box) return;
    var urls = offlineAssets(), total = urls.length, done = 0, failed = 0, i = 0;
    box.innerHTML = '<div class="offcard"><span class="offic">' + DL_ICON + '</span>' +
      '<div class="offtxt" style="flex:1"><b>Téléchargement en cours…</b>' +
      '<div class="offbar"><i id="offbar"></i></div><span id="offstat">0 / ' + total + '</span></div></div>';
    function step() {
      if (i >= urls.length) {
        try { localStorage.setItem('offline_ready', '1'); } catch (e) {}
        renderOffline();
        if (failed) toast(failed + ' fichier(s) non téléchargé(s) — réessayez avec une meilleure connexion.');
        return;
      }
      var u = urls[i++];
      fetch(u, { cache: 'reload' }).then(function (r) { if (!r || r.status !== 200) failed++; }, function () { failed++; })
        .then(function () {
          done++;
          var pct = Math.round(done / total * 100);
          var bar = $('#offbar'); if (bar) bar.style.width = pct + '%';
          var st = $('#offstat'); if (st) st.textContent = done + ' / ' + total;
          step();
        });
    }
    step();
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
    if (state.fam === 'diamant' ? p.famille !== 'diamant' : p.famille === 'diamant') return false;
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
    var list = DATA.filter(matches);
    $('#count').textContent = list.length + (list.length > 1 ? ' procédures' : ' procédure');
    if (!list.length) { $('#grid').innerHTML = '<div class="empty">Aucune procédure ne correspond à votre recherche.</div>'; return; }
    $('#grid').innerHTML = list.map(card).join('');
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
    var backHref = p.famille === 'diamant' ? '#/diamant' : '#/procedures';
    var backLbl = p.famille === 'diamant' ? ' Forage au diamant' : ' Toutes les procédures';
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

    // Outils utilisés (analyses de sécurité de tâche — JSA) : information
    // ressortie sur la fiche, détail consultable sans quitter la page.
    var toolIds = (window.OUTILS_MAP && window.OUTILS_MAP[p.id]) || [];
    if (toolIds.length && window.OUTILS) {
      h += '<div class="sec"><h2>Outils utilisés — analyse SST</h2>' +
        '<p class="outils-lead">Outils susceptibles d\'être utilisés pour cette procédure. Touchez un outil pour voir son analyse de sécurité (risques, contrôles, ÉPI) sans quitter la page.</p>' +
        '<div class="outils-grid">' + toolIds.map(function (tid) {
          var o = window.OUTILS[tid]; if (!o) return '';
          return '<button type="button" class="outil-card" data-tool="' + esc(tid) + '">' +
            '<span class="outil-ic">' + ICON.tool + '</span>' +
            '<span class="outil-tx"><b>' + esc(o.nom) + '</b><span class="outil-code">' + esc(o.code) + '</span></span>' +
            '<span class="risk-badge ' + riskClass(o.niveau) + '" title="Niveau de risque après contrôles">' + o.niveau + '</span>' +
          '</button>';
        }).join('') + '</div></div>';
    }

    if (p.epi && p.epi.length) h += sec('Équipements de protection', pills(p.epi, 'epi'));

    // Quiz de la procédure (couvre l'information importante) — questions mélangées
    var pqList = (window.QUIZ_PROC && window.QUIZ_PROC[p.id]) || [];
    if (pqList.length) {
      shuffle(pqList);                                         // mélange faciles + difficiles
      var best = pqGetBest(p.id);
      var pqitems = pqList.map(function (it, i) {
        return '<div class="pq" data-i="' + i + '"><p class="pq-q"><b>' + (i + 1) + '.</b> ' + esc(it.q) + '</p>' +
          '<div class="pq-opts">' + it.o.map(function (opt, j) {
            return '<label class="pq-opt"><input type="radio" name="pq_' + i + '" value="' + j + '"><span class="pq-mark"></span><span class="pq-txt">' + esc(opt) + '</span></label>';
          }).join('') + '</div>' +
          '<div class="pq-fb"></div><div class="pq-exp"></div></div>';
      }).join('');
      h += '<div class="sec"><h2>Quiz — valider mes connaissances</h2>' +
        '<details class="pquiz" data-proc="' + esc(p.id) + '">' +
          '<summary><span class="pqs-t">' + pqList.length + ' questions · réponse corrigée immédiatement</span>' +
          '<span class="pqs-b">' + (best ? 'Meilleur : ' + best.s + '/' + best.n : 'Commencer') + '</span></summary>' +
          '<div class="pqbody">' + pqitems +
            '<div class="pq-actions"><button type="button" class="btn ghost pq-reset">Recommencer</button>' +
            '<span class="pq-score" aria-live="polite"></span></div>' +
          '</div>' +
        '</details></div>';
    }

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
    initOutils();
  }
  function sec(title, inner) { return '<div class="sec"><h2>' + esc(title) + '</h2>' + inner + '</div>'; }

  /* ---------- outils (analyses SST / JSA) : détail en modale ---------- */
  // Pictogrammes ÉPI officiels (images, comme sur les fiches JSA d'origine)
  function epiImg(file, alt) {
    return '<img src="images/epi/' + file + '" alt="' + alt + '" loading="lazy">';
  }
  var EPI_PICTO = {
    'Lunettes de protection': epiImg('lunettes_protection.png', 'Lunettes de protection'),
    'Casque de sécurité': epiImg('casque_securite.png', 'Casque de sécurité'),
    'Protection auditive': epiImg('protection_auditive.png', 'Protection auditive'),
    'Protection respiratoire': epiImg('protection_respiratoire.png', 'Protection respiratoire'),
    'Bottes de protection': epiImg('bottes_protection.png', 'Bottes de protection'),
    'Gants': epiImg('gants.png', 'Gants'),
    'Combinaison': epiImg('combinaison.png', 'Combinaison'),
    'Protection faciale': epiImg('protection_faciale.png', 'Protection faciale'),
    'Harnais de sécurité': epiImg('harnais_securite.png', 'Harnais de sécurité'),
    'Vêtements haute visibilité': epiImg('vetements_haute_visibilite.png', 'Vêtements haute visibilité')
  };
  var epiGeneric = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17a9 9 0 0 1 18 0"/><path d="M2 17h20"/></svg>';
  // Petites icônes de catégorie de risque
  var RISK_ICO = {
    secu: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>',
    sante: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.6-9.2-9.2A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.2 5.8C19 16.4 12 21 12 21z"/></svg>',
    env: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21c0-7 4-12 14-13-1 10-6 14-13 13z"/><path d="M5 21 12 13"/></svg>',
    ctrl: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    epi: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17a9 9 0 0 1 18 0"/><path d="M2 17h20"/><path d="M9 9.5V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3.5"/></svg>'
  };
  function riskClass(n) { return n >= 8 ? 'r-high' : n >= 4 ? 'r-med' : 'r-low'; }
  function riskLabel(n) { return n >= 8 ? 'Élevé' : n >= 4 ? 'Modéré' : 'Faible'; }
  function outilList(title, arr, ico) {
    if (!arr || !arr.length) return '';
    return '<div class="ot-block"><h4>' + (ico ? '<span class="ot-ico">' + ico + '</span>' : '') + esc(title) + '</h4><ul class="ot-ul">' +
      arr.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
  }
  // ÉPI de base déjà obligatoires sous terre — non répétés par outil.
  // La protection auditive n'est pas un pictogramme permanent : on la rappelle
  // par un avis « outil bruyant » quand l'outil présente le risque de bruit.
  var EPI_BASE = ['Lunettes de protection', 'Casque de sécurité', 'Bottes de protection', 'Gants', 'Vêtements haute visibilité', 'Protection auditive'];
  function epiChip(x) {
    return '<span class="epi-chip"><span class="epi-ic">' + (EPI_PICTO[x] || epiGeneric) + '</span><span class="epi-lb">' + esc(x) + '</span></span>';
  }
  function epiPicto(arr) {
    if (!arr || !arr.length) return '';
    var extra = arr.filter(function (x) { return EPI_BASE.indexOf(x) < 0; });
    var inner = extra.length
      ? '<div class="epi-grid">' + extra.map(epiChip).join('') + '</div>'
      : '<p class="epi-base-note">Aucun ÉPI additionnel : seuls les ÉPI de base souterrains sont requis.</p>';
    return '<div class="om-epi"><h4><span class="ot-ico">' + RISK_ICO.epi + '</span>ÉPI additionnels (propres à l\'outil)</h4>' +
      '<p class="epi-base-note">En plus des ÉPI de base obligatoires sous terre (casque, lunettes, bottes, gants, dossard).</p>' +
      inner + '</div>';
  }
  function initOutils() {
    var cards = document.querySelectorAll('.outil-card');
    if (!cards.length || !window.OUTILS) return;
    var ov = document.getElementById('outil-modal');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'outil-modal';
      ov.className = 'outil-ov';
      ov.innerHTML = '<div class="outil-modal" role="dialog" aria-modal="true"><div class="om-body"></div></div>';
      document.body.appendChild(ov);
    }
    var body = ov.querySelector('.om-body');
    function close() { ov.classList.remove('on'); document.body.style.overflow = ''; }
    function open(tid) {
      var o = window.OUTILS[tid]; if (!o) return;
      var pdf = 'pdf/' + encodeURIComponent(tid) + '.pdf';
      body.innerHTML =
        '<div class="om-head"><div><div class="om-code">' + esc(o.code) + '</div><h3>' + esc(o.nom) + '</h3>' +
          '<div class="om-tache">' + esc(o.tache) + '</div></div>' +
          '<button type="button" class="om-x" aria-label="Fermer">' + ICON.close + '</button></div>' +
        '<div class="om-risk ' + riskClass(o.niveau) + '"><span class="om-rk">Niveau de risque (après contrôles)</span>' +
          '<span class="om-rv">' + o.niveau + ' · ' + riskLabel(o.niveau) + '</span></div>' +
        ((o.sante || []).indexOf('Bruit') >= 0
          ? '<div class="om-noise">🔊 <b>Outil bruyant</b> — port de la protection auditive requis.</div>'
          : '') +
        '<div class="om-cols">' +
          outilList('Risques — Sécurité', o.securite, RISK_ICO.secu) +
          outilList('Risques — Santé', o.sante, RISK_ICO.sante) +
          outilList('Risques — Environnement', o.environnement, RISK_ICO.env) +
          outilList('Mesures de contrôle', o.controles, RISK_ICO.ctrl) +
        '</div>' +
        epiPicto(o.epi) +
        '<div class="om-foot"><a class="dl" href="' + pdf + '" target="_blank" rel="noopener">Ouvrir la fiche PDF</a>' +
          '<a class="dl" href="' + pdf + '" download>Télécharger</a>' +
          '<span class="om-src">Source : analyse SST ' + esc(o.code) + ' · ' + esc(o.date) + '</span></div>';
      ov.classList.add('on');
      document.body.style.overflow = 'hidden';
      var x = body.querySelector('.om-x'); if (x) x.focus();
    }
    [].forEach.call(cards, function (c) {
      c.addEventListener('click', function () { open(c.getAttribute('data-tool')); });
    });
    ov.addEventListener('click', function (e) {
      if (e.target === ov || (e.target.closest && e.target.closest('.om-x'))) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------- quiz intégré à la fiche de procédure ---------- */
  function pqGetBest(id) { try { var v = JSON.parse(localStorage.getItem('pq_' + id)); return (v && typeof v.s === 'number') ? v : null; } catch (e) { return null; } }
  function pqSetBest(id, s, n) {
    var b = pqGetBest(id);
    if (!b || s > b.s) { try { localStorage.setItem('pq_' + id, JSON.stringify({ s: s, n: n })); } catch (e) {} }
  }
  function initProcQuiz(id) {
    var list = (window.QUIZ_PROC && window.QUIZ_PROC[id]) || [];
    var box = document.querySelector('.pquiz[data-proc="' + id + '"]');
    if (!list.length || !box) return;
    var resetBtn = box.querySelector('.pq-reset');
    var scoreEl = box.querySelector('.pq-score');
    var n = list.length;

    function updateScore() {
      var answered = box.querySelectorAll('.pq.answered').length;
      var correct = box.querySelectorAll('.pq.correct').length;
      if (!answered) { scoreEl.textContent = ''; scoreEl.className = 'pq-score'; return; }
      scoreEl.textContent = correct + ' bonne' + (correct > 1 ? 's' : '') + ' / ' + answered + ' répondue' + (answered > 1 ? 's' : '') + ' (sur ' + n + ')';
      if (answered === n) {
        scoreEl.className = 'pq-score ' + (correct === n ? 'perfect' : correct >= Math.ceil(n * 0.8) ? 'pass' : 'fail');
        pqSetBest(id, correct, n);
        var sb = box.querySelector('.pqs-b'); if (sb) sb.textContent = 'Meilleur : ' + Math.max(correct, (pqGetBest(id) || { s: 0 }).s) + '/' + n;
      } else { scoreEl.className = 'pq-score'; }
    }

    // rétroaction immédiate dès qu'une réponse est cochée
    box.addEventListener('change', function (e) {
      if (!e.target || e.target.type !== 'radio') return;
      var card = e.target.closest('.pq');
      if (!card || card.classList.contains('answered')) return;
      var i = parseInt(card.getAttribute('data-i'), 10);
      var q = list[i];
      var pick = parseInt(e.target.value, 10);
      var opts = card.querySelectorAll('.pq-opt');
      var good = pick === q.a;
      if (opts[q.a]) opts[q.a].classList.add('good');           // toujours montrer la bonne réponse
      if (!good && opts[pick]) opts[pick].classList.add('bad');
      [].forEach.call(card.querySelectorAll('input[type="radio"]'), function (r) { r.disabled = true; });
      var fb = card.querySelector('.pq-fb');
      fb.innerHTML = '<span class="pq-fi">' + (good ? ICON.check : ICON.close) + '</span>' + (good ? 'Bonne réponse' : 'Mauvaise réponse');
      fb.className = 'pq-fb on ' + (good ? 'ok' : 'no');
      var exp = card.querySelector('.pq-exp');                  // explication TOUJOURS (même si bonne), citée de la procédure
      exp.innerHTML = '<span class="pq-ref">Référence à la procédure</span>' + esc(q.e);
      exp.classList.add('on');
      card.classList.add('answered', good ? 'correct' : 'incorrect');
      updateScore();
    });

    resetBtn.onclick = function () {
      [].forEach.call(box.querySelectorAll('.pq'), function (c) { c.classList.remove('answered', 'correct', 'incorrect'); });
      [].forEach.call(box.querySelectorAll('input[type="radio"]'), function (r) { r.checked = false; r.disabled = false; });
      [].forEach.call(box.querySelectorAll('.pq-opt'), function (o) { o.classList.remove('good', 'bad'); });
      [].forEach.call(box.querySelectorAll('.pq-fb'), function (f) { f.className = 'pq-fb'; f.innerHTML = ''; });
      [].forEach.call(box.querySelectorAll('.pq-exp'), function (ex) { ex.classList.remove('on'); ex.innerHTML = ''; });
      scoreEl.textContent = ''; scoreEl.className = 'pq-score';
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
      'dd-support-tiges': '⛓️', 'dd-forage-distance': '🎯', 'dd-cimentation-entretien': '🧱'
    };
    // Le Code affiché suit la section courante : Forage au diamant (DD) si on
    // vient de la section Diamant, sinon Forage de production (ITH). On ne
    // montre que le code concerné (pas les deux).
    codeFam = (state.fam === 'diamant') ? 'dd' : 'ith';
    var chapitres = CODE.chapitres.filter(function (c) { return (c.famille || 'ith') === codeFam; });
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
  var QUIZ = window.QUIZ || [];
  var quizSt = null;
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function renderQuiz(view) {
    if (!QUIZ.length) { view.innerHTML = '<div class="wrap"><div class="empty">Le quiz n\'est pas encore disponible.</div></div>'; return; }
    quizSt = null;
    var cats = {}; QUIZ.forEach(function (q) { cats[q.categorie] = (cats[q.categorie] || 0) + 1; });
    var catOpts = '<option value="">Toutes les catégories</option>' + Object.keys(cats).sort().map(function (c) {
      return '<option value="' + esc(c) + '">' + esc(c) + ' (' + cats[c] + ')</option>'; }).join('');
    view.innerHTML = '<section class="quizhero"><div class="wrap">' +
      '<span class="eyebrow">Auto-vérification · pas une formation</span>' +
      '<h1>Quiz éclair <span class="hl">sécurité</span></h1>' +
      '<p class="lead">Teste tes réflexes sur les consignes, distances et interdictions des procédures. ' + QUIZ.length + ' questions au total, tirées au hasard.</p>' +
      '<div class="quizstart">' +
        '<label class="qsf"><span>Nombre de questions</span><select class="f" id="qN"><option>5</option><option selected>10</option><option>15</option><option value="999">Toutes</option></select></label>' +
        '<label class="qsf"><span>Catégorie</span><select class="f" id="qCat">' + catOpts + '</select></label>' +
        '<button class="btn" id="qStart">Démarrer le quiz</button>' +
      '</div>' +
    '</div></section>';
    $('#qStart').onclick = function () {
      var n = parseInt($('#qN').value, 10), cat = $('#qCat').value;
      var pool = QUIZ.filter(function (q) { return !cat || q.categorie === cat; });
      pool = shuffle(pool).slice(0, Math.min(n, pool.length));
      quizSt = { pool: pool, idx: 0, score: 0, answered: false };
      renderQ(view);
    };
  }
  function renderQ(view) {
    var s = quizSt, q = s.pool[s.idx];
    view.innerHTML = '<div class="wrap quizwrap">' +
      '<div class="qtop"><a class="back" href="#/quiz">' + ICON.back + ' Quitter</a>' +
        '<span class="qscore">Score : ' + s.score + '</span></div>' +
      '<div class="qbar"><i style="width:' + Math.round(s.idx / s.pool.length * 100) + '%"></i></div>' +
      '<div class="qcard"><div class="qtag">' + esc(q.code || q.categorie) + ' · Question ' + (s.idx + 1) + '/' + s.pool.length + '</div>' +
        '<h2 class="qq">' + esc(q.question) + '</h2>' +
        '<div class="qopts">' + q.options.map(function (o, i) { return '<button class="qopt" data-i="' + i + '">' + esc(o) + '</button>'; }).join('') + '</div>' +
        '<div class="qfb" id="qfb"></div>' +
      '</div></div>';
    [].forEach.call(document.querySelectorAll('.qopt'), function (b) {
      b.onclick = function () { pick(view, parseInt(b.getAttribute('data-i'), 10)); };
    });
  }
  function pick(view, i) {
    var s = quizSt; if (s.answered) return; s.answered = true;
    var q = s.pool[s.idx], correct = q.answer;
    if (i === correct) s.score++;
    [].forEach.call(document.querySelectorAll('.qopt'), function (b, bi) {
      b.classList.add('locked');
      if (bi === correct) b.classList.add('ok'); else if (bi === i) b.classList.add('bad');
    });
    var src = q.sourceId ? '<div class="qsrc">Source : <a href="#/p/' + esc(q.sourceId) + '">' + esc(q.code || q.titre) + '</a></div>' : '';
    $('#qfb').innerHTML = '<div class="qexp ' + (i === correct ? 'good' : 'wrong') + '">' +
      '<b>' + (i === correct ? '✓ Bonne réponse' : '✗ Mauvaise réponse') + '</b>' +
      '<p>' + esc(q.explication) + '</p>' + src +
      '<button class="btn" id="qNext">' + (s.idx + 1 < s.pool.length ? 'Question suivante' : 'Voir le résultat') + '</button></div>';
    $('#qNext').onclick = function () { s.idx++; s.answered = false; if (s.idx >= s.pool.length) renderResult(view); else renderQ(view); };
  }
  function renderResult(view) {
    var s = quizSt, pct = Math.round(s.score / s.pool.length * 100);
    if (s.moduleId) { renderModuleResult(view, s, pct); return; }
    var msg = pct >= 80 ? 'Excellent — des réflexes solides.' : pct >= 60 ? 'Correct, mais quelques consignes à revoir.' : 'À retravailler : consulte les fiches et les PDF officiels.';
    view.innerHTML = '<div class="wrap quizwrap"><div class="qresult">' +
      '<div class="qring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
      '<h2>' + s.score + ' / ' + s.pool.length + '</h2><p class="lead">' + esc(msg) + '</p>' +
      '<div class="qacts"><button class="btn" id="qAgain">Recommencer</button>' +
        '<a class="btn ghost" href="#/procedures">Retour aux procédures</a></div></div></div>';
    $('#qAgain').onclick = function () { renderQuiz(view); };
  }
  function renderModuleResult(view, s, pct) {
    fScoreSet(s.moduleId, pct);
    var passed = pct >= 80;
    if (passed) fMark(s.moduleId);
    var msg = passed ? 'Module réussi — bravo, tu maîtrises les consignes !' : 'Pas encore : il faut 80 %. Revois les notions de sécurité et réessaie.';
    view.innerHTML = '<div class="wrap quizwrap"><div class="qresult">' +
      '<div class="qring ' + (passed ? 'pass' : 'fail') + '" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
      '<h2>' + s.score + ' / ' + s.pool.length + '</h2><p class="lead">' + esc(msg) + '</p>' +
      '<div class="qacts">' + (passed ? '' : '<button class="btn" id="qAgain">Réessayer</button>') +
        '<a class="btn ' + (passed ? '' : 'ghost') + '" href="#/formation/' + esc(s.moduleId) + '">Retour au module</a>' +
        (passed ? '<a class="btn ghost" href="#/attestation">Mon attestation</a>' : '') + '</div></div></div>';
    var ag = $('#qAgain'); if (ag) ag.onclick = function () { startModuleQuiz(view, s.moduleId); };
  }

  /* ---------- portail + formation ---------- */
  var FORMATION = window.FORMATION || [];
  var FMAP = {}; FORMATION.forEach(function (m) { FMAP[m.sourceId] = m; });
  var CAP_ICON = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 3 2.5 6 2.5S18 18 18 17v-5"/></svg>';

  function fDone() { try { return JSON.parse(localStorage.getItem('fdone') || '[]'); } catch (e) { return []; } }
  function fIsDone(id) { return fDone().indexOf(id) >= 0; }
  function fMark(id) { var d = fDone(); if (d.indexOf(id) < 0) { d.push(id); try { localStorage.setItem('fdone', JSON.stringify(d)); } catch (e) {} } }
  function fScoreGet(id) { try { return parseInt(localStorage.getItem('fscore_' + id) || '0', 10); } catch (e) { return 0; } }
  function fScoreSet(id, pct) { try { if (pct > fScoreGet(id)) localStorage.setItem('fscore_' + id, String(pct)); } catch (e) {} }
  function modules() { return DATA.filter(function (p) { return FMAP[p.id]; }); }

  function renderPortail(view) {
    var nMod = modules().length;
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
        '<a class="portal-card form" href="#/formation"><div class="pc-ic">' + CAP_ICON + '</div>' +
          '<h2>Formation</h2><p>Apprends et qualifie-toi, tâche par tâche : objectifs, notions de sécurité, vidéos, évaluation et attestation.</p>' +
          '<div class="pc-meta">' + nMod + ' modules · progression &amp; attestation</div>' +
          '<span class="go">Commencer ' + ICON.arrow + '</span></a>' +
      '</div>' +
    '</div></section>';
  }

  function renderFormation(view) {
    var mods = modules();
    if (!mods.length) { view.innerHTML = '<div class="wrap"><div class="empty">La formation n\'est pas encore disponible.</div></div>'; return; }
    var done = mods.filter(function (p) { return fIsDone(p.id); }).length;
    var MNORM = { 'Foreuse ITH': 'ITH' };
    var groups = {}; mods.forEach(function (p) { var m = (p.machines && p.machines[0]) || 'Autres'; m = MNORM[m] || m; (groups[m] = groups[m] || []).push(p); });
    var groupsHtml = Object.keys(groups).sort().map(function (mach) {
      return '<h3 class="sub-h">' + esc(mach) + '</h3><div class="grid">' + groups[mach].map(moduleCard).join('') + '</div>';
    }).join('');
    view.innerHTML = '<section class="quizhero"><div class="wrap">' +
      '<span class="eyebrow">Formation · tâche par tâche</span>' +
      '<h1>Formation <span class="hl">sécurité</span></h1>' +
      '<p class="lead">Modules d\'apprentissage par tâche et par machine : notions de sécurité, évaluation et attestation.</p>' +
      '<div class="fprog"><div class="ckbar"><i style="width:' + Math.round(done / mods.length * 100) + '%"></i></div>' +
        '<span>' + done + ' / ' + mods.length + ' modules complétés</span>' +
        '<a class="btn ghost" href="#/attestation">Mon attestation</a></div>' +
    '</div></section><div class="wrap">' + groupsHtml + '</div>';
  }
  function moduleCard(p) {
    var done = fIsDone(p.id), sc = fScoreGet(p.id), col = catColor(p.categorie);
    var t = (FMAP[p.id] && FMAP[p.id].intro) || p.resume || '';
    return '<a class="pcard" href="#/formation/' + esc(p.id) + '" style="--cat:' + col + '">' +
      '<div class="tags"><span class="cat-tag" style="--cat:' + col + '">' + esc(p.categorie) + '</span>' +
        (done ? '<span class="done-badge">✓ Complété' + (sc ? ' · ' + sc + '%' : '') + '</span>' : '') + '</div>' +
      '<h3>' + esc(p.titre) + '</h3><p>' + esc(t.slice(0, 150)) + (t.length > 150 ? '…' : '') + '</p>' +
      '<span class="go">' + (done ? 'Revoir' : 'Commencer') + ' ' + ICON.arrow + '</span></a>';
  }

  function renderModule(view, id) {
    var p = DATA.filter(function (x) { return x.id === id; })[0], m = FMAP[id];
    if (!p || !m) { view.innerHTML = '<div class="wrap"><a class="back" href="#/formation">' + ICON.back + ' Formation</a><div class="empty">Module introuvable.</div></div>'; return; }
    var col = catColor(p.categorie), done = fIsDone(id), sc = fScoreGet(id);
    var qn = QUIZ.filter(function (q) { return q.sourceId === id; }).length;
    var h = '<div class="wrap"><a class="back" href="#/formation">' + ICON.back + ' Tous les modules</a>' +
      '<div class="phead"><div class="tags"><span class="cat-tag" style="--cat:' + col + '">' + esc(p.categorie) + '</span>' +
        '<span class="code-tag">Module · ' + esc((p.machines || []).join(', ')) + '</span>' +
        (done ? '<span class="done-badge">✓ Complété' + (sc ? ' · ' + sc + '%' : '') + '</span>' : '') + '</div>' +
        '<h1>' + esc(p.titre) + '</h1></div>';
    if (m.intro) h += '<div class="sec"><div class="lead2">' + esc(m.intro) + '</div></div>';
    if (m.objectifs && m.objectifs.length) h += sec('Objectifs d\'apprentissage', '<div class="rules">' + m.objectifs.map(function (o) {
      return '<div class="rule"><span class="chk">' + ICON.check + '</span><div class="rt">' + esc(o) + '</div></div>'; }).join('') + '</div>');
    if (m.video) h += sec('Vidéo', '<div class="vidwrap"><iframe src="' + esc(m.video) + '" allowfullscreen title="Vidéo du module"></iframe></div>');
    if (m.notions && m.notions.length) h += sec('Notions de sécurité', '<div class="notions">' + m.notions.map(function (n) {
      return '<div class="notion"><h4>' + esc(n.titre) + '</h4><p>' + esc(n.texte) + '</p></div>'; }).join('') + '</div>');
    if (m.vigilance && m.vigilance.length) h += sec('Points de vigilance', m.vigilance.map(function (w) {
      return '<div class="warn"><span class="wic">' + ICON.warn + '</span><p>' + esc(w) + '</p></div>'; }).join(''));
    var pdf = 'pdf/' + encodeURIComponent(p.id) + '.pdf';
    h += '<div class="sec"><div class="pdfcue">' + ICON.doc + '<div class="cuetxt"><b>La marche à suivre est dans le PDF officiel.</b>' +
      '<span>Consulte la procédure complète et sa fiche de consignes dans la base de connaissances.</span></div>' +
      '<a class="btn ghost" href="#/p/' + esc(p.id) + '">Voir la fiche</a>' + (DEMO ? '' : '<a class="btn" href="' + pdf + '" target="_blank" rel="noopener">Ouvrir le PDF</a>') + '</div></div>';
    h += '<div class="sec"><h2>Évaluation</h2>';
    if (qn) h += '<div class="evalcard"><p>' + qn + ' questions pour valider ce module — réussite à 80 %.' + (sc ? ' Meilleur score : <b>' + sc + ' %</b>.' : '') + '</p>' +
      '<button class="btn" id="mEval">' + (done ? 'Refaire l\'évaluation' : 'Démarrer l\'évaluation') + '</button></div>';
    else h += '<p class="muted">Pas de question d\'évaluation pour ce module.</p><button class="btn" id="mDone">Marquer comme complété</button>';
    h += '</div></div>';
    view.innerHTML = h;
    var ev = $('#mEval'); if (ev) ev.onclick = function () { startModuleQuiz(view, id); };
    var dn = $('#mDone'); if (dn) dn.onclick = function () { fMark(id); toast('Module complété.'); route(); };
  }
  function startModuleQuiz(view, id) {
    var pool = shuffle(QUIZ.filter(function (q) { return q.sourceId === id; }));
    if (!pool.length) { fMark(id); location.hash = '#/formation/' + id; return; }
    quizSt = { pool: pool, idx: 0, score: 0, answered: false, moduleId: id };
    renderQ(view);
  }

  function renderAttestation(view) {
    var mods = modules(), done = mods.filter(function (p) { return fIsDone(p.id); });
    var dateStr = new Date().toLocaleDateString('fr-CA'), name = '';
    try { name = localStorage.getItem('worker_name') || ''; } catch (e) {}
    var rows = done.map(function (p) {
      var s = fScoreGet(p.id);
      return '<tr><td>' + esc(p.titre) + '</td><td>' + esc((p.machines || []).join(', ')) + '</td><td>' + (s ? s + ' %' : '—') + '</td></tr>';
    }).join('');
    view.innerHTML = '<div class="wrap"><a class="back" href="#/formation">' + ICON.back + ' Formation</a>' +
      '<div class="attest" id="attest">' +
        '<div class="att-head"><img src="images/logo_roger.png" alt="MRI"><div><b>Machines Roger International</b><span>Attestation de formation — Sécurité du forage</span></div></div>' +
        '<div class="att-name"><label>Nom du travailleur</label><input id="wName" value="' + esc(name) + '" placeholder="Prénom et nom"></div>' +
        '<p class="att-line">atteste avoir suivi et réussi les modules de formation sécurité suivants :</p>' +
        (done.length ? '<table class="att-table"><thead><tr><th>Module (tâche)</th><th>Machine</th><th>Score</th></tr></thead><tbody>' + rows + '</tbody></table>'
          : '<p class="att-empty">Aucun module complété pour l\'instant — complète au moins un module pour générer ton attestation.</p>') +
        '<div class="att-foot"><span>Date : ' + esc(dateStr) + '</span><span>' + done.length + ' / ' + mods.length + ' modules</span></div>' +
      '</div>' +
      '<div class="qacts" style="justify-content:flex-start">' +
        '<button class="btn" id="attPrint">Imprimer / Enregistrer en PDF</button>' +
        '<a class="btn ghost" href="#/formation">Retour</a></div></div>';
    var wn = $('#wName'); if (wn) wn.addEventListener('input', function () { try { localStorage.setItem('worker_name', wn.value); } catch (e) {} });
    var pr = $('#attPrint'); if (pr) pr.onclick = function () { window.print(); };
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
