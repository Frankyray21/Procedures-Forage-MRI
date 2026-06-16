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
    'Intervention': '#ef4444'
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
  var ICON = {
    arrow: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6l6 6-6 6"/></svg>',
    back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m6 6l-6-6 6-6"/></svg>',
    search: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>',
    warn: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    doc: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
    fwd: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6l6 6-6 6"/></svg>',
    close: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>'
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
    if (h.indexOf('#/p/') === 0) { renderProcedure(view, h.slice(4)); setNav('procedures'); }
    else if (h.indexOf('#/formation/') === 0) { renderModule(view, h.slice(12)); setNav('formation'); }
    else if (h.indexOf('#/formation') === 0) { renderFormation(view); setNav('formation'); }
    else if (h.indexOf('#/attestation') === 0) { renderAttestation(view); setNav('formation'); }
    else if (h.indexOf('#/quiz') === 0) { renderQuiz(view); setNav('quiz'); }
    else if (h.indexOf('#/code') === 0) { renderCode(view); setNav('code'); }
    else if (h.indexOf('#/procedures') === 0) { renderHome(view); setNav('procedures'); }
    else { renderPortail(view); setNav(''); }
  }
  function setNav(which) {
    document.querySelectorAll('.appbar nav a[data-nav]').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === which);
    });
  }

  /* ---------- vue : accueil ---------- */
  var state = { q: '', cat: '', mach: '' };
  // Classement des filtres : catégories par flux de travail, machines regroupées
  var CAT_ORDER = ['Forage', 'Alésage', 'Installation', 'Manutention', 'Maintenance', 'Intervention', 'Démobilisation'];
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
    var cats = {}, machs = {};
    DATA.forEach(function (p) {
      cats[p.categorie] = (cats[p.categorie] || 0) + 1;
      machinesOf(p).forEach(function (m) { machs[m] = (machs[m] || 0) + 1; });
    });
    var nbConsignes = DATA.reduce(function (a, p) { return a + ((p.consignes_securite || []).length); }, 0);

    var catChips = CAT_ORDER.filter(function (c) { return cats[c]; }).map(function (c) {
      return '<button class="chip" data-cat="' + esc(c) + '" style="--c:' + catColor(c) + '">' +
        esc(c) + ' <span class="ct">' + cats[c] + '</span></button>';
    }).join('');
    var machChips = MACH_ORDER.filter(function (m) { return machs[m]; }).map(function (m) {
      return '<button class="chip" data-mach="' + esc(m) + '">' + esc(m) + ' <span class="ct">' + machs[m] + '</span></button>';
    }).join('');

    view.innerHTML =
      '<section class="hero"><div class="wrap">' +
        '<span class="eyebrow">Santé-Sécurité · Forage</span>' +
        '<h1>Procédures de <span class="hl">forage</span></h1>' +
        '<p class="lead">Toutes les procédures de travail de Machines Roger International, accessibles, recherchables et consultables hors-ligne. Chaque procédure conserve son PDF officiel.</p>' +
        '<div class="stats">' +
          '<div class="stat"><b>' + DATA.length + '</b><span>Procédures</span></div>' +
          '<div class="stat"><b>' + Object.keys(machs).length + '</b><span>Équipements</span></div>' +
          '<div class="stat"><b>' + nbConsignes + '</b><span>Consignes</span></div>' +
          '<div class="stat"><b><a href="#/code" style="color:var(--accent-l)">Code&nbsp;»</a></b><span>de sécurité</span></div>' +
        '</div>' +
      '</div></section>' +
      '<div class="wrap"><div class="offline" id="offline"></div></div>' +
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
    renderOffline();
    verifyOfflineCache();
  }
  // Filtre machine conditionnel à la tâche : visible seulement si une catégorie
  // est choisie ET qu'elle compte plusieurs machines pertinentes.
  function updateMachChips() {
    var box = $('#machChips'); if (!box) return;
    var machs = {};
    DATA.forEach(function (p) {
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
        '<div class="offtxt"><b>Disponible hors-ligne</b><span>Toutes les fiches et les ' + nPdf + ' PDF sont enregistrés sur cet appareil.</span></div>' +
        '<button class="btn ghost" id="offBtn">Mettre à jour</button></div>';
    } else {
      box.innerHTML = '<div class="offcard"><span class="offic">' + DL_ICON + '</span>' +
        '<div class="offtxt"><b>Préparer la consultation hors-ligne</b><span>Télécharge toutes les fiches et les ' + nPdf + ' PDF pour les consulter sans réseau (sous terre).</span></div>' +
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
    var dates = [p.date_creation, p.date_revision ? 'Rév. ' + p.date_revision : ''].filter(Boolean).join(' · ');
    var h = '<div class="wrap"><a class="back" href="#/procedures">' + ICON.back + ' Toutes les procédures</a>' +
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
      var pdf = 'pdf/' + encodeURIComponent(p.id) + '.pdf';
      var pdfInner = '<div class="pdfbox">' +
        '<div class="bar">' + ICON.doc + '<b>' + esc(p.code || p.titre) + '</b><span class="sp"></span>' +
          '<a class="dl" href="' + pdf + '" target="_blank" rel="noopener">Ouvrir</a>' +
          '<a class="dl" href="' + pdf + '" download>Télécharger</a></div>' +
        '<iframe src="' + pdf + '#view=FitH" title="PDF de la procédure" loading="lazy"></iframe></div>';
      if (p.id === 'centralisateur') {
        pdfInner += '<div class="pdfbox" style="margin-top:1rem"><div class="bar">' + ICON.doc + '<b>Dessin technique du centralisateur</b><span class="sp"></span>' +
          '<a class="dl" href="pdf/centralisateur-dessin.pdf" target="_blank" rel="noopener">Ouvrir</a></div>' +
          '<iframe src="pdf/centralisateur-dessin.pdf#view=FitH" title="Dessin technique" loading="lazy"></iframe></div>';
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

    if (p.objectif) h += sec('Objectif', '<p>' + esc(p.objectif) + '</p>');

    if (p.epi && p.epi.length) h += sec('Équipements de protection', pills(p.epi, 'epi'));

    // Mises en garde = encadrés d'avertissement + avertissements intégrés aux étapes (sans le texte des étapes)
    var warns = (p.avertissements || []).slice();
    (p.etapes || []).forEach(function (s) { if (s.danger) warns.push(s.danger); });
    if (warns.length) h += sec('Mises en garde et avertissements', warns.map(function (w) {
      return '<div class="warn"><span class="wic">' + ICON.warn + '</span><p>' + esc(w) + '</p></div>'; }).join(''));

    var essList = (window.ESSENTIEL && window.ESSENTIEL[p.id]);
    var ckData;
    if (essList && essList.length) {
      ckData = essList.map(function (it) {
        return (typeof it === 'string') ? { regle: it, type: '', valeur: '' }
          : { regle: it.texte, type: it.type || '', valeur: it.valeur || '' };
      });
    } else {
      ckData = (p.consignes_securite || []).map(function (c) { return { regle: c.regle, type: '', valeur: '', source: c.source, theme: c.theme }; });
    }
    if (ckData.length) {
      var ckhead = '<div class="ckhead"><div class="ckbar"><i></i></div><span class="ckcount"></span>' +
        '<button class="ckreset" type="button">Réinitialiser</button></div>';
      var ckitems = ckData.map(function (c, i) {
        var ico = TYPE_ICON[c.type] || ICON.check;
        var val = c.valeur ? ' <b class="ckval">' + esc(c.valeur) + '</b>' : '';
        return '<label class="ck' + (c.type ? ' ck-' + c.type : '') + '"><input type="checkbox" data-i="' + i + '">' +
          '<span class="cktype">' + ico + '</span>' +
          '<span class="rt">' + esc(c.regle) + val +
          (c.source ? '<span class="rsrc">' + esc(c.source) + (c.theme ? ' · ' + esc(c.theme) : '') + '</span>' : '') + '</span>' +
          '<span class="ckbox">' + ICON.check + '</span></label>';
      }).join('');
      h += sec('Liste de vérification — points essentiels',
        '<div class="checklist" data-proc="' + esc(p.id) + '">' + ckhead + ckitems + '</div>');
    }

    // Quiz de la procédure (couvre l'information importante)
    var pqList = (window.QUIZ_PROC && window.QUIZ_PROC[p.id]) || [];
    if (pqList.length) {
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
  }
  function sec(title, inner) { return '<div class="sec"><h2>' + esc(title) + '</h2>' + inner + '</div>'; }

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
    var toc = CODE.chapitres.map(function (c) { return '<a href="#chap-' + esc(c.id) + '">' + esc(c.titre) + '</a>'; }).join('');
    var body = CODE.chapitres.map(function (c) {
      var arts = (c.articles || []).map(function (a) {
        var srcs = (a.sources || []).map(function (s) {
          var sid = CODE_TO_ID[String(s).toUpperCase()];
          return sid ? '<a href="#/p/' + esc(sid) + '">' + esc(s) + '</a>' : '<a>' + esc(s) + '</a>';
        }).join('');
        return '<div class="art"><h3><span class="an">' + esc(a.num) + '</span> ' + esc(a.titre) + '</h3>' +
          '<p>' + esc(a.texte) + '</p>' + (srcs ? '<div class="srcs">' + srcs + '</div>' : '') + '</div>';
      }).join('');
      return '<section class="chap" id="chap-' + esc(c.id) + '"><h2>' + esc(c.titre) + '</h2>' +
        (c.intro ? '<p class="ci">' + esc(c.intro) + '</p>' : '') + arts + '</section>';
    }).join('');

    view.innerHTML =
      '<section class="code-hero"><div class="wrap">' +
        '<span class="eyebrow">Règlement interne</span>' +
        '<h1>Code de sécurité du forage</h1>' +
        '<div class="preamble">' + esc(CODE.preambule || '') + '</div>' +
      '</div></section>' +
      '<div class="wrap"><div class="code-layout">' +
        '<nav class="code-toc" id="codeToc">' + toc + '</nav>' +
        '<div>' + body + '</div>' +
      '</div></div>';
    initScrollspy();
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
    view.innerHTML = '<section class="portal"><div class="wrap">' +
      '<div class="phead2"><img src="images/logo_roger.png" alt="Machines Roger International"><div><h1>Sécurité du forage</h1><p>Machines Roger International</p></div></div>' +
      '<p class="plead">Choisis ton espace.</p>' +
      '<div class="portal-cards">' +
        '<a class="portal-card kb" href="#/procedures"><div class="pc-ic">' + ICON.doc + '</div>' +
          '<h2>Base de connaissances</h2><p>Consulte vite une procédure : mises en garde, consignes, liste de vérification et PDF officiel. Quiz éclair et Code de sécurité.</p>' +
          '<div class="pc-meta">' + DATA.length + ' procédures · disponible hors-ligne</div>' +
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
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferredPrompt = e;
    var b = $('#installBtn'); if (b) b.style.display = 'inline-flex';
  });
  function initInstall() {
    var b = $('#installBtn'); if (!b) return;
    b.addEventListener('click', function () {
      if (!deferredPrompt) { toast('Pour installer : menu du navigateur → « Ajouter à l\'écran d\'accueil ».'); return; }
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () { deferredPrompt = null; b.style.display = 'none'; });
    });
  }
  window.addEventListener('appinstalled', function () { var b = $('#installBtn'); if (b) b.style.display = 'none'; });

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
