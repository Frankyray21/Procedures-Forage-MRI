/* ===========================================================================
   Procédures de forage MRI — logique applicative (vanilla JS, sans build)
   =========================================================================== */
(function () {
  'use strict';

  var CFG   = window.SITE_CONFIG || {};
  var DEMO  = !!(CFG && CFG.demo);
  var DATA  = (window.PROCEDURES || []).slice();

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

  /* ---------- profil travailleur (appareil partagé, changement d'appareil) ----
     Les données personnelles (scores de quiz, attestations vues, checklists,
     chronos) sont rangées PAR TRAVAILLEUR : clé « u:<nom normalisé>:<clé> ».
     Tant qu'aucun profil n'existe (premier usage), les clés restent nues ; au
     premier profil, elles sont adoptées dans son espace. CHANGER de profil ne
     supprime rien : chaque travailleur retrouve ses données en revenant — même
     hors ligne. La progression est aussi sauvegardée dans Airtable (dossier de
     l'employé) pour survivre à un changement d'appareil : voir progPush(). */
  var P_KEYS = /^(pq_|attest_hist_|attest_sent_|attest_pending_|ck_|pt_read_|pt_quiz_|prog_)/;
  function profName() { try { return localStorage.getItem('prof_name') || ''; } catch (e) { return ''; } }
  function profSlug(name) { return norm(name).replace(/\s+/g, ' ').trim(); }
  function pkeyFor(slug, base) { return slug ? 'u:' + slug + ':' + base : base; }
  function pkey(base) { return pkeyFor(profSlug(profName()), base); }
  function profSet(name) {
    name = String(name || '').replace(/\s+/g, ' ').trim();
    if (!name) return;
    if (!profName()) migrateToProfile(profSlug(name));
    try { localStorage.setItem('prof_name', name); localStorage.setItem('suivi_name', name); } catch (e) {}
  }
  /* Premier profil de l'appareil : les données déjà présentes (clés nues)
     appartiennent à cette personne — on les déplace dans son espace. */
  function migrateToProfile(slug) {
    if (!slug) return;
    try {
      var move = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (P_KEYS.test(k) || k === 'last_proc') move.push(k);
      }
      move.forEach(function (k) {
        localStorage.setItem('u:' + slug + ':' + k, localStorage.getItem(k));
        localStorage.removeItem(k);
      });
    } catch (e) {}
  }
  /* Attestation sous un AUTRE nom (appareil partagé) : le quiz qui vient d'être
     réussi appartient au nouveau nom — les données de CETTE fiche déménagent
     dans son espace, le reste de l'ancien profil ne bouge pas. */
  function profAdopt(pid, name) {
    var cur = profName();
    if (!cur || profSlug(cur) === profSlug(name)) { profSet(name); return; }
    var to = profSlug(name);
    ['pq_' + pid, 'pq_fail_' + pid, 'pt_read_' + pid, 'pt_quiz_' + pid].forEach(function (base) {
      try {
        var v = localStorage.getItem(pkey(base));
        if (v != null) { localStorage.setItem(pkeyFor(to, base), v); localStorage.removeItem(pkey(base)); }
      } catch (e) {}
    });
    profSet(name);
  }
  // NOTE : shuffle (mélange sur COPIE) est déclarée une seule fois, plus bas
  // avec les utilitaires du quiz éclair — une 2e déclaration ici créait deux
  // sémantiques concurrentes (en place vs copie) départagées par le hoisting.
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
  // Position de défilement des listes, restaurée au retour d'une fiche
  // (sinon l'utilisateur repart toujours du haut de la liste).
  var listScroll = {};
  var prevHash = location.hash || '#/';
  function route() {
    var h = location.hash || '#/';
    var view = $('#view');
    view.removeAttribute('data-boot');   // le contenu réel remplace l'état « Chargement… »
    if (prevHash.indexOf('#/diamant') === 0) listScroll.diamant = window.scrollY;
    else if (prevHash.indexOf('#/procedures') === 0) listScroll[''] = window.scrollY;
    var fromFiche = prevHash.indexOf('#/p/') === 0;
    prevHash = h;
    window.scrollTo(0, 0);
    if (h.indexOf('#/p/') !== 0) ptLeavePage();      // quitte une fiche → fige le temps de consultation
    if (h.indexOf('#/p/') === 0) { var pid = h.slice(4); renderProcedure(view, pid); var pp = DATA.filter(function (x) { return x.id === pid; })[0]; setNav(pp && pp.famille === 'diamant' ? 'diamant' : 'procedures'); }
    else if (h.indexOf('#/quiz') === 0) { renderQuiz(view); setNav('quiz'); }
    else if (h.indexOf('#/suivi') === 0) { renderSuivi(view); setNav('suivi'); }
    // Code de sécurité : retiré du site (non publié) — anciens liens redirigés.
    else if (h.indexOf('#/code') === 0) { location.replace('#/procedures'); return; }
    else if (h.indexOf('#/diamant') === 0) { if (state.fam !== 'diamant') { state.fam = 'diamant'; state.cat = ''; state.mach = ''; state.q = ''; } renderHome(view); setNav('diamant'); if (fromFiche) window.scrollTo(0, listScroll.diamant || 0); }
    else if (h.indexOf('#/procedures') === 0) { if (state.fam !== '') { state.fam = ''; state.cat = ''; state.mach = ''; state.q = ''; } renderHome(view); setNav('procedures'); if (fromFiche) window.scrollTo(0, listScroll[''] || 0); }
    else { renderPortail(view); setNav(''); }
  }
  function setNav(which) {
    document.querySelectorAll('.appbar nav a[data-nav]').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === which);
    });
  }

  /* ---------- chronométrage (consultation fiche + quiz) ----------
     Mesure le temps ACTIF (page visible) passé sur une fiche et sur son quiz.
     Destiné au suivi des GESTIONNAIRES : envoyé à Airtable avec l'attestation,
     JAMAIS affiché au travailleur. Persisté par procédure (cumule les visites,
     tant que l'attestation n'a pas été envoyée). En pause quand l'app est
     masquée (téléphone verrouillé, autre onglet) pour ne pas gonfler le temps. */
  var PT = { pid: null, page: null, quiz: null, quizOpen: false };
  function ptGet(k) { try { var v = parseInt(localStorage.getItem(k), 10); return (isFinite(v) && v > 0) ? v : 0; } catch (e) { return 0; } }
  function ptSet(k, ms) { try { localStorage.setItem(k, String(Math.round(ms))); } catch (e) {} }
  function mkClock(base) {
    return { acc: base || 0, t0: 0, on: false,
      start: function () { if (!this.on) { this.t0 = Date.now(); this.on = true; } },
      pause: function () { if (this.on) { this.acc += Date.now() - this.t0; this.on = false; } },
      ms: function () { return this.acc + (this.on ? Date.now() - this.t0 : 0); } };
  }
  function ptFlush() {
    if (!PT.pid) return;
    if (PT.page) ptSet(pkey('pt_read_' + PT.pid), PT.page.ms());
    if (PT.quiz) ptSet(pkey('pt_quiz_' + PT.pid), PT.quiz.ms());
  }
  function ptStartPage(id) {
    ptFlush();
    PT.pid = id; PT.quizOpen = false;
    PT.page = mkClock(ptGet(pkey('pt_read_' + id)));
    PT.quiz = mkClock(ptGet(pkey('pt_quiz_' + id)));
    if (!document.hidden) PT.page.start();      // le quiz démarre à l'ouverture du quiz
  }
  function ptLeavePage() { ptFlush(); if (PT.page) PT.page.pause(); if (PT.quiz) PT.quiz.pause(); PT.pid = null; PT.quizOpen = false; }
  function ptQuizOpen(open) {
    PT.quizOpen = !!open;
    if (!PT.quiz) return;
    if (open && !document.hidden) PT.quiz.start();
    else { PT.quiz.pause(); ptFlush(); }
  }
  document.addEventListener('visibilitychange', function () {
    if (!PT.pid) return;
    if (document.hidden) { if (PT.page) PT.page.pause(); if (PT.quiz) PT.quiz.pause(); ptFlush(); }
    else { if (PT.page) PT.page.start(); if (PT.quizOpen && PT.quiz) PT.quiz.start(); }
  });
  window.addEventListener('beforeunload', ptFlush);
  // Instantané (ms) sans arrêter les chronos — utilisé au moment d'attester.
  function ptSnapshot(id) {
    if (PT.pid === id) ptFlush();
    return { read: ptGet(pkey('pt_read_' + id)), quiz: ptGet(pkey('pt_quiz_' + id)) };
  }
  // « 3 min 42 s », « 45 s », « 1 h 05 min ».
  function fmtDuration(ms) {
    var s = Math.round((ms || 0) / 1000);
    if (s < 60) return s + ' s';
    var m = Math.floor(s / 60), r = s % 60;
    if (m < 60) return m + ' min' + (r ? ' ' + r + ' s' : '');
    var h = Math.floor(m / 60); m = m % 60;
    return h + ' h' + (m ? ' ' + ('0' + m).slice(-2) + ' min' : '');
  }

  /* ---------- vue : accueil ---------- */
  var state = { q: '', cat: '', mach: '', fam: '' };
  // fam '' = foreuses ITH/CUBEX/V-30 (par défaut) ; 'diamant' = forage au diamant
  // Appartenance d'une procédure à une section. famille 'commun' = les deux.
  function inSection(p, fam) {
    if (p.famille === 'commun') return true;
    return fam === 'diamant' ? p.famille === 'diamant' : p.famille !== 'diamant';
  }
  function famData() {
    return DATA.filter(function (p) { return inSection(p, state.fam); });
  }
  /* Tri par code de procédure (PRO-OP-ITH-002 → 002A → 004 → 012…) : les
     segments numériques sont comparés en NOMBRES (002 avant 012, pas l'ordre
     alphabétique). Les fiches sans code vont à la fin, triées par titre. */
  function cmpCode(a, b) {
    var ca = String(a.code || '').toUpperCase(), cb = String(b.code || '').toUpperCase();
    if (!ca && !cb) return String(a.titre || '').localeCompare(String(b.titre || ''), 'fr');
    if (!ca) return 1;
    if (!cb) return -1;
    var ra = ca.match(/\d+|\D+/g) || [], rb = cb.match(/\d+|\D+/g) || [];
    for (var i = 0; i < Math.max(ra.length, rb.length); i++) {
      var x = ra[i], y = rb[i];
      if (x === undefined) return -1;
      if (y === undefined) return 1;
      var nx = /^\d/.test(x), ny = /^\d/.test(y);
      if (nx && ny) { var d = parseInt(x, 10) - parseInt(y, 10); if (d) return d; }
      else { var c = x.localeCompare(y, 'fr'); if (c) return c; }
    }
    return 0;
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
          ? 'Procédures de forage au diamant de Machines Roger International : carottage, planchers, déplacements, sécurité. Chaque fiche contient le PDF officiel de la procédure, consultable même sans réseau.'
          : 'Toutes les procédures de travail de Machines Roger International, sur ton téléphone, même sans réseau. Chaque fiche contient le PDF officiel de la procédure.') + '</p>' +
        '<div class="stats">' +
          '<div class="stat"><b>' + D.length + '</b><span>Procédures</span></div>' +
          '<div class="stat"><b>' + Object.keys(cats).length + '</b><span>Catégories</span></div>' +
          (diamant
            ? '<div class="stat"><b><a href="#/procedures" style="color:var(--accent-l)">ITH&nbsp;»</a></b><span>Foreuses ITH/CUBEX</span></div>'
            : '<div class="stat"><b>' + nbConsignes + '</b><span>Consignes</span></div>') +
          '<div class="stat"><b><a href="#/suivi" style="color:var(--accent-l)">Suivi&nbsp;»</a></b><span>de mes formations</span></div>' +
        '</div>' +
      '</div></section>' +
      '<div class="wrap"><div class="offline" id="offline"></div></div>' +
      '<div class="toolbar"><div class="wrap">' +
        '<div class="search">' + ICON.search +
          '<input id="q" type="search" placeholder="Rechercher une procédure, un équipement, une consigne…" aria-label="Rechercher une procédure" autocomplete="off">' +
        '</div>' +
        '<div class="chips" id="catChips">' +
          '<button class="chip on" data-cat="">Toutes</button>' + catChips +
        '</div>' +
        '<div class="chips" id="machChips"></div>' +
      '</div></div>' +
      '<div class="wrap"><div id="resumeRow"></div><div class="lrow"><div class="count" id="count"></div><div class="lmode" id="lmode"></div></div><div class="plist2" id="grid"></div></div>' +
      // Installation après le contenu ; le hors ligne est en haut (compact).
      '<div class="wrap"><div class="install" id="install"></div></div>';

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

  /* Suffixe ?r=<révision> sur les URLs de médias : quand un PDF officiel est
     révisé (date_revision change), seule cette URL change — le service worker
     re-télécharge CE fichier et purge l'ancien, au lieu de garder à jamais la
     vieille version en cache. Hors-ligne, l'ancienne copie reste servie en
     secours tant que la nouvelle n'est pas descendue. */
  var MEDIA_CACHE = 'mri-media-v1';        // même nom que dans service-worker.js
  var REV_BY_ID = null;
  function mediaRev(id) {
    if (!REV_BY_ID) {
      REV_BY_ID = {};
      DATA.forEach(function (p) { REV_BY_ID[p.id] = p.date_revision || p.date_creation || ''; });
    }
    return REV_BY_ID[id] || '';
  }
  function withRev(u, id) { var r = mediaRev(id); return r ? u + '?r=' + encodeURIComponent(r) : u; }
  function offlineGroups() {
    var pdfs = [], pages = [], figs = [];
    DATA.forEach(function (p) { pdfs.push(withRev('pdf/' + encodeURIComponent(p.id) + '.pdf', p.id)); });
    pdfs.push('pdf/centralisateur-dessin.pdf');
    if (window.PAGES) {
      Object.keys(window.PAGES).forEach(function (key) {
        (window.PAGES[key] || []).forEach(function (src) { if (src) pages.push(withRev(src, key)); });
      });
    }
    if (window.FIGURES) {
      Object.keys(window.FIGURES).forEach(function (id) {
        (window.FIGURES[id] || []).forEach(function (f) { if (f && f.src) figs.push(withRev(f.src, id)); });
      });
    }
    return [
      { label: 'Application et fiches', files: APP_FILES },
      // Optionnel : chaque page des PDF est déjà incluse en image dans les
      // fiches — le fichier PDF lui-même ne sert qu'aux boutons Ouvrir /
      // Télécharger (et reste pré-téléchargé en arrière-plan par le service
      // worker quand le réseau le permet).
      { label: 'PDF officiels', files: pdfs, media: true, optional: true },
      { label: 'Pages des PDF (images)', files: pages, media: true },
      { label: 'Photos et schémas', files: figs, media: true },
      { label: 'Logo et icônes', files: BRAND_FILES }
    ];
  }
  function includePdfs() { try { return localStorage.getItem('offline_pdfs') === '1'; } catch (e) { return false; } }
  function activeGroups() {
    return offlineGroups().filter(function (g) { return !g.optional || includePdfs(); });
  }
  function offlineAssets() {
    var u = [];
    activeGroups().forEach(function (g) { u = u.concat(g.files); });
    return u;
  }
  function sizeOf(u) { return SIZES[u.split('?')[0]] || 0; }
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
    var name = decodeURIComponent((u.split('?')[0].split('/').pop() || u));
    if (u.indexOf('pdf/') === 0) {
      var code = PDF_CODE[name.replace(/\.pdf$/, '')];
      if (code) return name + ' — ' + code;
    }
    return name;
  }
  // Liste complète des fichiers, groupée, repliée sous « Voir les fichiers ».
  function offlineListHTML() {
    var groups = activeGroups(), count = 0, total = 0;
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
  // Supprime du cache les anciennes révisions (même chemin, ?r= différent).
  function purgeOldRevs(c, u) {
    var target = new URL(u, location.href);
    return c.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) {
        var ku = new URL(k.url);
        if (ku.pathname === target.pathname && k.url !== target.href) return c.delete(k);
      }));
    }).catch(function () {});
  }
  // Tout est-il RÉELLEMENT sur l'appareil ? (médias exacts + coquille app)
  function verifyAll() {
    if (!('caches' in window)) return Promise.resolve(false);
    var media = [];
    activeGroups().forEach(function (g) { if (g.media) media = media.concat(g.files); });
    return Promise.all(media.map(function (u) {
      return caches.match(u).then(function (r) { return !!r; });
    })).then(function (found) {
      if (!found.every(Boolean)) return false;
      return caches.match('./index.html', { ignoreSearch: true }).then(function (ix) {
        return ix ? caches.match('app.js', { ignoreSearch: true }).then(function (a) { return !!a; }) : false;
      });
    }).catch(function () { return false; });
  }
  /* Les médias sont aussi pré-téléchargés en arrière-plan par le service
     worker après son activation. On vérifie leur présence réelle dans le
     Cache Storage pour afficher « Disponible hors-ligne » sans attendre un clic. */
  function verifyOfflineCache() {
    if (DEMO || !('caches' in window) || offlineReady()) return;
    var media = [];
    activeGroups().forEach(function (g) { if (g.media) media = media.concat(g.files); });
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
      box.innerHTML = '<div class="offcard ok slim"><span class="offic">' + ICON.check + '</span>' +
        '<div class="offtxt"><b>Disponible hors ligne</b><span>Toutes les fiches' +
        (includePdfs() ? ', les ' + nPdf + ' PDF' : '') + ' et les figures (' + fmtMo(totalBytes) +
        ') sont sur cet appareil.</span></div>' +
        '<button class="btn ghost" id="offBtn">Mettre à jour</button></div>';
    } else {
      box.innerHTML = '<div class="offcard slim"><span class="offic">' + DL_ICON + '</span>' +
        '<div class="offtxt"><b>Consulter sans réseau (sous terre)</b>' +
        '<span>' + files.length + ' fichiers · ' + fmtMo(totalBytes) + ' · ' +
          fmtDur(estimateSecs(totalBytes, files.length)) + ' sur cette connexion</span>' +
        '<details class="offlist offmore"><summary>Options et liste des fichiers</summary>' +
          '<label class="offopt"><input type="checkbox" id="offPdf"' + (includePdfs() ? ' checked' : '') + '> ' +
          'Inclure aussi les ' + nPdf + ' fichiers PDF officiels (chaque page est déjà incluse en image)</label>' +
        '</details>' +
        offlineListHTML() + '</div>' +
        '<button class="btn" id="offBtn">Tout télécharger</button></div>';
      var pdfCb = $('#offPdf');
      if (pdfCb) pdfCb.onchange = function () {
        try { localStorage.setItem('offline_pdfs', pdfCb.checked ? '1' : '0'); } catch (e) {}
        renderOffline();
      };
    }
    $('#offBtn').onclick = function () { startPrecache(offlineReady()); };
  }
  /* Téléchargement : 4 fichiers en parallèle ; les fichiers déjà sur
     l'appareil sont sautés (reprise après interruption) sauf en mode
     « Mettre à jour » (force=true) qui re-télécharge tout. Progression en
     fichiers ET en Mo, vitesse mesurée et temps restant réel. */
  function startPrecache(force) {
    var box = $('#offline'); if (!box) return;
    if (!navigator.onLine) {
      toast('Pas de réseau : lance le téléchargement quand tu as du Wi-Fi ou du signal.');
      return;
    }
    // Stockage persistant (au mieux) : évite que le système purge le pack.
    try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch (e) {}
    var urls = ['./'].concat(offlineAssets());
    var total = urls.length, totalBytes = sumBytes(urls);
    box.innerHTML = '<div class="offcard"><span class="offic">' + DL_ICON + '</span>' +
      '<div class="offtxt" style="flex:1"><b>' + (force ? 'Mise à jour' : 'Téléchargement') + ' en cours…</b>' +
      '<div class="offbar"><i id="offbar"></i></div>' +
      '<span id="offcur" class="offcur" aria-live="polite"></span>' +
      '<span id="offstat">0 / ' + total + ' fichiers · 0 Ko / ' + fmtMo(totalBytes) + '</span>' +
      '<span id="offeta" class="offeta">Temps restant : calcul en cours…</span>' +
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
      var cur = $('#offcur'); if (cur) cur.textContent = u ? 'Télécharge : ' + fileLabel(u) : '';
    }
    function finish() {
      // « Prêt hors ligne » seulement après VÉRIFICATION réelle du Cache
      // Storage (médias présents + coquille de l'app en cache) — plus de faux
      // « tout est enregistré ».
      verifyAll().then(function (ok) {
        if (!failed && ok) { try { localStorage.setItem('offline_ready', '1'); } catch (e) {} }
        renderOffline();
        if (!failed && !ok) {
          toast('Téléchargement terminé, mais la vérification est incomplète — rouvre l\'app puis réessaie « Tout télécharger ».');
          return;
        }
        toast(failed
        ? (failed > 1
          ? failed + ' fichiers n\'ont pas été téléchargés. Appuie encore sur « Tout télécharger » pour compléter — ce qui est déjà sur l\'appareil est conservé.'
          : 'Un fichier n\'a pas été téléchargé. Appuie encore sur « Tout télécharger » pour compléter — ce qui est déjà sur l\'appareil est conservé.')
        : 'Terminé : tout est disponible hors ligne (' + fmtMo(bytesDone) + ').');
      });
    }
    function next() {
      if (i >= urls.length) { if (active === 0) finish(); return; }
      var u = urls[i++]; active++;
      var precheck = (!force && 'caches' in window) ? caches.match(u) : Promise.resolve(null);
      precheck.then(function (hit) {
        if (hit) { bytesDone += sizeOf(u); mark(u, 'ok'); return; }   // déjà sur l'appareil
        return fetch(u, force ? { cache: 'reload' } : {}).then(function (r) {
          if (!r || r.status !== 200) { failed++; mark(u, 'ko'); return; }
          // Refuse une réponse de repli du service worker (ancienne révision
          // servie via ignoreSearch) : la révision de r.url doit être celle
          // demandée, sinon on marquerait du périmé comme à jour.
          var wantQ = (u.indexOf('?') >= 0) ? u.slice(u.indexOf('?')) : '';
          if (r.url) {
            var gotQ = '';
            try { gotQ = new URL(r.url).search; } catch (e2) {}
            if (wantQ && gotQ !== wantQ) { failed++; mark(u, 'ko'); return; }
          }
          // Mise en cache EXPLICITE des médias (sans dépendre de l'interception
          // par le service worker, absente au tout premier chargement) + purge
          // des anciennes révisions du même fichier.
          var putP = Promise.resolve();
          var isMedia = u.indexOf('pdf/') === 0 || u.indexOf('images/pages/') >= 0 || u.indexOf('images/figures/') >= 0;
          if (isMedia && 'caches' in window) {
            var copy = r.clone();
            putP = caches.open(MEDIA_CACHE).then(function (c) {
              return c.put(u, copy).then(function () { return purgeOldRevs(c, u); });
            }).catch(function () {});
          }
          return r.blob().then(function (b) {           // attend le fichier COMPLET
            var n = (b && b.size) || sizeOf(u);
            bytesDone += n; netBytes += n; mark(u, 'ok');
            return putP;
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
    renderListMode();
    // « Reprendre » : dernière fiche consultée de cette section (navigation seulement)
    var rr = $('#resumeRow');
    if (rr) {
      var lp = '';
      try { lp = localStorage.getItem(pkey('last_proc')) || ''; } catch (e) {}
      var p0 = lp ? DATA.filter(function (x) { return x.id === lp; })[0] : null;
      rr.innerHTML = (p0 && inSection(p0, state.fam))
        ? '<a class="resume-l" href="#/p/' + esc(p0.id) + '"><span>Reprendre</span><b>' + esc(p0.titre) + '</b>' + ICON.arrow + '</a>'
        : '';
    }
    var list = DATA.filter(matches).sort(cmpCode);
    count.textContent = list.length + (list.length > 1 ? ' procédures' : ' procédure');
    if (!list.length) { grid.innerHTML = '<div class="empty">Aucune procédure ne correspond à votre recherche.</div>'; return; }
    // Sections par TÂCHE (ordre du flux de travail) ou par MACHINE, au choix ;
    // à l'intérieur de chaque section, l'ordre reste celui des codes.
    var groups = buildGroups(list);
    grid.innerHTML = groups.map(function (g) {
      return '<div class="lgrp"><h3 class="lgrp-h">' + esc(g.label) +
        ' <span class="ct">' + g.items.length + '</span></h3>' +
        '<div class="lgrp-rows">' + g.items.map(card).join('') + '</div></div>';
    }).join('');
  }
  function listMode() { try { return localStorage.getItem('list_mode') === 'mach' ? 'mach' : 'cat'; } catch (e) { return 'cat'; } }
  function renderListMode() {
    var box = $('#lmode'); if (!box) return;
    var m = listMode();
    box.innerHTML = '<button type="button" class="lmode-b' + (m === 'cat' ? ' on' : '') + '" data-m="cat">Par tâche</button>' +
      '<button type="button" class="lmode-b' + (m === 'mach' ? ' on' : '') + '" data-m="mach">Par machine</button>';
    [].forEach.call(box.querySelectorAll('.lmode-b'), function (b) {
      b.onclick = function () {
        try { localStorage.setItem('list_mode', b.getAttribute('data-m')); } catch (e) {}
        drawList();
      };
    });
  }
  function buildGroups(list) {
    if (listMode() === 'mach') {
      // Par machine : une procédure utilisée avec plusieurs machines apparaît
      // sous chacune (c'est comme ça qu'on la cherche sur le terrain).
      var by = {}, autres = [];
      list.forEach(function (p) {
        var ms = machinesOf(p);
        var extra = (p.machines || []).some(function (m) { return norm(m).indexOf('diamant') >= 0; }) ? ['Foreuse au diamant'] : [];
        var all = ms.concat(extra.filter(function (m) { return ms.indexOf(m) < 0; }));
        if (!all.length) { autres.push(p); return; }
        all.forEach(function (m) { (by[m] = by[m] || []).push(p); });
      });
      var groups = MACH_ORDER.filter(function (m) { return by[m]; })
        .map(function (m) { return { label: m, items: by[m] }; });
      Object.keys(by).forEach(function (m) {
        if (MACH_ORDER.indexOf(m) < 0) groups.push({ label: m, items: by[m] });
      });
      if (autres.length) groups.push({ label: 'Autres', items: autres });
      return groups;
    }
    var byCat = {};
    list.forEach(function (p) { (byCat[p.categorie] = byCat[p.categorie] || []).push(p); });
    return CAT_ORDER.filter(function (c) { return byCat[c]; })
      .concat(Object.keys(byCat).filter(function (c) { return CAT_ORDER.indexOf(c) < 0; }))
      .map(function (c) { return { label: c, items: byCat[c] }; });
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
          '<span class="pcat"><i style="background:var(--dim)"></i>' + esc(p.categorie) + '</span>' +
          (p.code ? '<span class="pcode">' + esc(p.code) + '</span>' : '') +
          procState(p) +
        '</div>' +
      '</div>' +
      '<span class="parrow">' + ICON.arrow + '</span></a>';
  }
  // État de formation en toutes lettres (mêmes données locales que Mon suivi) :
  // vert = attestée ; ambre = quiz complété, il ne manque que l'attestation ;
  // gris = quiz commencé mais pas terminé. Rien = pas commencé.
  function procState(p) {
    var hasQuiz = !!(window.QUIZ_PROC && (window.QUIZ_PROC[p.id] || []).length);
    if (attestInfo(p.id)) return '<span class="pstate2 ok">' + ICON.check + ' Complétée</span>';
    if (hasQuiz && pqCompleted(p)) return '<span class="pstate2 todo">Pas complétée</span>';
    if (pqGetBest(p.id)) return '<span class="pstate2 mid">Quiz en cours</span>';
    return '';
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
        var pdf = withRev('pdf/' + encodeURIComponent(key) + '.pdf', key);
        var pages = (window.PAGES && window.PAGES[key]) || [];
        var body = pages.length
          ? '<div class="pdfpages">' + pages.map(function (src, i) {
              return '<img src="' + esc(withRev(src, key)) + '" alt="' + esc(label) + ' — page ' + (i + 1) + '" loading="lazy">';
            }).join('') + '</div>'
          : '<iframe src="' + pdf + '#view=FitH" title="' + esc(label) + '" loading="lazy"></iframe>';
        // Visionneuse repliée par défaut : la fiche reste courte sur téléphone
        // (plus de bloc gris de 78vh) et les images de pages ne se chargent
        // qu'à l'ouverture. Un APERÇU (première page, rognée) reste visible
        // sous le pli : le toucher ouvre le document en PLEIN ÉCRAN
        // (visionneuse #docfs — voir initDocViewer).
        var thumb = pages.length
          ? '<button type="button" class="pv-thumb" data-doc="' + esc(key) + '" data-label="' + esc(label) + '">' +
            '<img src="' + esc(withRev(pages[0], key)) + '" alt="Aperçu : ' + esc(label) + ', page 1" loading="lazy">' +
            '<span class="pv-more">Aperçu — toucher pour lire en plein écran (' + pages.length + ' page' + (pages.length > 1 ? 's' : '') + ')</span></button>'
          : '';
        return '<div class="pdfbox">' +
          '<div class="bar">' + ICON.doc + '<b>' + esc(label) + '</b><span class="sp"></span>' +
            '<a class="dl" href="' + pdf + '" target="_blank" rel="noopener">Ouvrir</a>' +
            '<a class="dl" href="' + pdf + '" download>Télécharger</a></div>' +
          '<details class="pdfview"><summary>Feuilleter le document ici' +
            (pages.length ? '<span class="pv-n">' + pages.length + ' page' + (pages.length > 1 ? 's' : '') + '</span>' : '') +
          '</summary>' + body + '</details>' +
          thumb + '</div>';
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
            '<img src="' + esc(withRev(f.src, p.id)) + '" alt="Photo ou schéma, page ' + esc(f.page) + '" loading="lazy">' +
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
    ptStartPage(p.id);          // démarre le chrono de consultation (suivi gestionnaire)
    try { localStorage.setItem(pkey('last_proc'), p.id); } catch (e) {}
    initChecklistState();
    initGallery(figs, p.id);
    initDocViewer();
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
        'Attester la lecture (complète d\'abord le quiz)</button></div>';
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
        '<p class="attest-hint">Commence à taper, puis choisis ton nom dans la liste.</p>' +
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
    // Une attestation attend déjà son envoi pour cette fiche : pas de re-saisie.
    var pending = '';
    try { pending = localStorage.getItem(pkey('attest_pending_' + p.id)) || ''; } catch (e) {}
    if (pending && !aqGet().some(function (it) { return it.pid === p.id && (it.u == null || it.u === profSlug(profName())); })) {
      // Marqueur orphelin (file corrompue ou écriture échouée) : on rouvre le
      // formulaire plutôt que d'afficher pour toujours « sera envoyée ».
      try { localStorage.removeItem(pkey('attest_pending_' + p.id)); } catch (e) {}
      pending = '';
    }
    if (pending) { attestQueued(sec, suiviName(), null); return; }
    var input = form.querySelector('.attest-name');
    var sugg = form.querySelector('.attest-sugg');
    var hint = form.querySelector('.attest-hint');
    var sendBtn = form.querySelector('.attest-send');
    var msg = form.querySelector('.attest-msg');
    var pickedId = '', pickedName = '';
    var HINT0 = 'Commence à taper, puis choisis ton nom dans la liste.';
    try { input.value = profName() || localStorage.getItem('attest_name') || ''; } catch (e) {}

    function db(s) { try { return s.normalize('NFD').replace(/[̀-ͯ]/g, ''); } catch (e) { return s; } }
    function setHint(t, ok) { hint.textContent = t; hint.className = 'attest-hint' + (ok ? ' ok' : ''); }
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
      if (!list.length) {
        hideSugg();
        hint.innerHTML = '<b>Ton nom n\'est pas encore dans la liste des employés.</b> ' +
          'Tu peux quand même attester : écris ton nom au complet et envoie — ' +
          'le bureau le reliera à ton dossier.';
        hint.className = 'attest-hint warn';
        return;
      }
      // Positionne la liste juste sous le champ (et non sous tout le formulaire).
      sugg.style.top = (input.offsetTop + input.offsetHeight + 4) + 'px';
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
      // Appareil partagé : ce nom devient le profil actif de l'appareil (le
      // quiz de cette fiche le suit si le nom diffère de l'ancien profil).
      profAdopt(p.id, name);
      var best = pqBestPct(p.id);
      var t = ptSnapshot(p.id);      // temps de consultation + temps de quiz (suivi gestionnaire)
      var payload = { name: name, employeeId: pickedId || '', proc: p.code || p.id,
        titre: p.titre || '', date: new Date().toISOString().slice(0, 10),
        score: best ? (best.s + '/' + best.n + ' — ' + best.pct + ' %') : '',
        revision: p.date_revision || p.date_creation || '',
        readTime: fmtDuration(t.read), quizTime: fmtDuration(t.quiz),
        readSeconds: Math.round(t.read / 1000), quizSeconds: Math.round(t.quiz / 1000) };
      var sig = attestSig(p.id, name);
      var done = '';
      try { done = localStorage.getItem(pkey('attest_sent_' + p.id)) || ''; } catch (e) {}
      if (done === sig) { attestSuccess(sec, name, true, payload, ''); return; }
      try { localStorage.setItem('attest_name', name); } catch (e) {}
      // Hors-ligne (cas normal sous terre) : on met en file d'attente locale,
      // l'envoi partira tout seul au retour du réseau.
      if (!navigator.onLine) { aqAdd(p.id, sig, payload); attestQueued(sec, name, payload); return; }
      sendBtn.disabled = true; msg.className = 'attest-msg'; msg.textContent = 'Envoi…';
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r ? r.json().then(function (j) { return { ok: r.ok, j: j }; }) : null; })
        .then(function (res) {
          sendBtn.disabled = false;
          if (res && res.ok && res.j && res.j.ok) {
            try { localStorage.setItem(pkey('attest_sent_' + p.id), sig); } catch (e) {}
            attestSuccess(sec, name, res.j.linked, payload, res.j.id || '');
            progPushSoon();
          } else {
            msg.className = 'attest-msg no';
            msg.textContent = 'Enregistrement impossible pour le moment. Réessaie dans un instant.';
          }
        })
        .catch(function () {
          // Réseau tombé pendant l'envoi : même filet de sécurité que hors-ligne.
          sendBtn.disabled = false;
          aqAdd(p.id, sig, payload);
          attestQueued(sec, name, payload);
        });
    };
    setHint(HINT0, false);
  }

  /* ---------- file d'attente hors-ligne des attestations ----------
     Sous terre, pas de réseau : l'attestation est enregistrée sur l'appareil
     (attest_queue + marqueur attest_pending_<id>) puis envoyée automatiquement
     dès que la connexion revient (événement online, ou à l'ouverture de l'app). */
  function aqGet() { try { var v = JSON.parse(localStorage.getItem('attest_queue')); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function aqSet(q) { try { localStorage.setItem('attest_queue', JSON.stringify(q)); } catch (e) {} }
  function aqAdd(pid, sig, payload) {
    var q = aqGet().filter(function (it) { return it.sig !== sig; });
    q.push({ pid: pid, sig: sig, payload: payload, u: profSlug(profName()) });
    aqSet(q);
    try { localStorage.setItem(pkey('attest_pending_' + pid), payload.date || ''); } catch (e) {}
  }
  var aqBusy = false;
  function aqFlush() {
    if (aqBusy || !navigator.onLine) return;
    var endpoint = attestEndpoint(); if (!endpoint) return;
    var q = aqGet(); if (!q.length) return;
    aqBusy = true;
    var it = q[0];
    function aqDrop() { aqSet(aqGet().filter(function (x) { return x.sig !== it.sig; })); }
    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(it.payload) })
      .then(function (r) {
        return r.json().catch(function () { return null; }).then(function (j) { return { st: r.status, j: j }; });
      })
      .then(function (res) {
        aqBusy = false;
        if (res.st >= 200 && res.st < 300 && res.j && res.j.ok) {          // envoyé
          aqDrop();
          var uSlug = (it.u != null) ? it.u : profSlug(profName());
          try {
            localStorage.removeItem(pkeyFor(uSlug, 'attest_pending_' + it.pid));
            localStorage.setItem(pkeyFor(uSlug, 'attest_sent_' + it.pid), it.sig);
          } catch (e) {}
          toast('Attestation « ' + (it.payload.titre || it.payload.proc) + ' » envoyée.');
          aqRefreshView(it.pid, uSlug);
          progPushSoon();
          aqFlush();                                   // suivante, s'il y en a
          return;
        }
        if (res.st >= 400 && res.st < 500) {
          // Rejet DÉFINITIF du serveur (donnée invalide) : on retire l'élément
          // pour ne pas bloquer les attestations suivantes, et on rouvre la
          // possibilité d'attester cette fiche.
          aqDrop();
          try { localStorage.removeItem(pkeyFor((it.u != null) ? it.u : profSlug(profName()), 'attest_pending_' + it.pid)); } catch (e) {}
          toast('Attestation « ' + (it.payload.titre || it.payload.proc) + ' » refusée — refais-la depuis la fiche.');
          aqFlush();
          return;
        }
        // 5xx / réponse inattendue : panne passagère → réessai programmé.
        aqRetryLater();
      })
      .catch(function () { aqBusy = false; aqRetryLater(); });   // réseau : réessai programmé
  }
  // Réessai automatique borné (le seul événement « online » ne suffit pas :
  // un 5xx peut arriver alors que le réseau est déjà là).
  var aqRetryT = null, aqRetries = 0;
  function aqRetryLater() {
    if (aqRetryT || aqRetries >= 10 || !aqGet().length) return;
    aqRetries++;
    aqRetryT = setTimeout(function () { aqRetryT = null; aqFlush(); }, 60000);
  }
  // Si la fiche ou le suivi de cette attestation est à l'écran, refléter l'envoi.
  function aqRefreshView(pid, uSlug) {
    if (uSlug != null && uSlug !== profSlug(profName())) return;   // autre profil : rien à rafraîchir
    var h = location.hash || '';
    if (h === '#/p/' + pid) {
      var sec = document.querySelector('.attest-sec[data-proc="' + pid + '"]');
      var p = DATA.filter(function (x) { return x.id === pid; })[0];
      if (sec && p) attestSuccess(sec, suiviName(), true, null, '');
    } else if (h.indexOf('#/suivi') === 0) {
      renderSuivi($('#view'));
    }
  }
  window.addEventListener('online', aqFlush);

  /* ---------- sauvegarde serveur de la progression ----------
     À chaque quiz complété ou amélioré, les meilleurs scores du profil actif
     partent dans Airtable (dossier de l'employé, champ « Progression
     procédures (web) ») quand le réseau est là — sinon marqué « à pousser »
     et envoyé au retour du réseau. À l'ouverture (au plus toutes les 6 h), la
     progression serveur est relue et fusionnée : un nouvel appareil retrouve
     tout dès que le travailleur s'est identifié une fois. */
  function progCollect() {
    var pq = {};
    DATA.forEach(function (p) {
      var b = pqGetBest(p.id);
      if (b) pq[p.id] = { s: b.s, n: b.n };
    });
    return { v: 1, pq: pq };
  }
  /* Fusion local/serveur : le total ACTUEL du quiz fait foi ; à total égal, le
     meilleur score gagne. Écrit directement (sans re-déclencher un envoi). */
  function progMerge(remote) {
    if (!remote || !remote.pq) return 0;
    var applied = 0;
    Object.keys(remote.pq).forEach(function (id) {
      if (!DATA.some(function (p) { return p.id === id; })) return;
      var r = remote.pq[id];
      if (!r || typeof r.s !== 'number' || typeof r.n !== 'number') return;
      var total = (window.QUIZ_PROC && window.QUIZ_PROC[id] || []).length;
      var b = pqGetBest(id);
      var take = !b || (total && r.n === total && b.n !== total) || (b.n === r.n && r.s > b.s);
      if (take) {
        try { localStorage.setItem(pkey('pq_' + id), JSON.stringify({ s: r.s, n: r.n })); applied++; } catch (e) {}
      }
    });
    return applied;
  }
  var progT = null;
  function progPushSoon() { if (progT) clearTimeout(progT); progT = setTimeout(progPush, 4000); }
  function progPush() {
    var name = profName();
    if (!name || !attestEndpoint()) return;
    if (!navigator.onLine) { try { localStorage.setItem(pkey('prog_dirty'), '1'); } catch (e) {} return; }
    var data = progCollect();
    if (!Object.keys(data.pq).length) return;
    fetch(attestEndpoint(), { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'progress', name: name, data: data }) })
      .then(function (r) { if (r && r.ok) { try { localStorage.removeItem(pkey('prog_dirty')); } catch (e) {} } })
      .catch(function () { try { localStorage.setItem(pkey('prog_dirty'), '1'); } catch (e) {} });
  }
  /* Applique l'historique d'attestations du serveur au profil actif.
     Renvoie le nombre de procédures retrouvées. */
  function applyHist(list) {
    var seen = {}, found = 0;
    (list || []).forEach(function (r) {
      var pid = CODE_TO_ID[String(r.proc || '').toUpperCase()] ||
        (DATA.some(function (p) { return p.id === r.proc; }) ? r.proc : '');
      if (!pid) return;
      if (!seen[pid]) { seen[pid] = 1; found++; }
      try {
        var prev = JSON.parse(localStorage.getItem(pkey('attest_hist_' + pid)) || 'null');
        if (!prev || String(r.date) > String(prev.date)) {
          localStorage.setItem(pkey('attest_hist_' + pid), JSON.stringify({ date: r.date || '', score: r.score || '' }));
        }
      } catch (e) {}
    });
    return found;
  }
  /* Relecture silencieuse de la progression serveur (profil actif). */
  function progPullAuto() {
    var name = profName();
    if (!name || !attestEndpoint() || !navigator.onLine) return;
    var last = 0;
    try { last = parseInt(localStorage.getItem(pkey('prog_pull_t')), 10) || 0; } catch (e) {}
    if (Date.now() - last < 6 * 3600 * 1000) return;
    fetch(attestEndpoint() + '?hist=' + encodeURIComponent(name))
      .then(function (r) { return r && r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.ok) return;
        try { localStorage.setItem(pkey('prog_pull_t'), String(Date.now())); } catch (e) {}
        var a = applyHist(d.results || []);
        var m = progMerge(d.progress);
        if ((a || m) && (location.hash || '').indexOf('#/suivi') === 0) renderSuivi($('#view'));
      })
      .catch(function () {});
  }
  function progDirtyFlush() {
    var dirty = false;
    try { dirty = localStorage.getItem(pkey('prog_dirty')) === '1'; } catch (e) {}
    if (dirty) progPush();
  }
  window.addEventListener('online', function () { progDirtyFlush(); progPullAuto(); });
  // État « enregistrée sur l'appareil, envoi au retour du réseau ».
  function attestQueued(sec, name, payload) {
    sec.innerHTML = '<h2>Attestation de lecture</h2>' +
      '<div class="attest-done attest-wait"><span class="attest-done-ic">…</span>' +
      '<div><strong>Attestation enregistrée sur l\'appareil</strong>' +
      '<span>' + (name ? 'Merci ' + esc(name) + '. ' : '') + 'Pas de réseau pour le moment : ton attestation sera envoyée ' +
      'automatiquement dès que la connexion revient. Rien d\'autre à faire.</span></div></div>';
  }
  /* ---------- PDF (attestation travailleur + fiche gestionnaire) ----------
     Générés dans le navigateur (jsPDF, chargé à la demande seulement) à partir
     des mêmes données que l'envoi Airtable — aucun appel serveur de plus. */
  var JSPDF_SRC = 'vendor/jspdf.umd.min.js';
  var jsPdfReady = null;
  function ensureJsPDF() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve();
    if (jsPdfReady) return jsPdfReady;
    jsPdfReady = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = JSPDF_SRC;
      s.onload = function () { resolve(); };
      s.onerror = function () { jsPdfReady = null; reject(new Error('jspdf')); };
      document.head.appendChild(s);
    });
    return jsPdfReady;
  }
  var logoDataUrl = null;
  function getLogo() {
    if (logoDataUrl) return Promise.resolve(logoDataUrl);
    return fetch('images/logo_roger.png').then(function (r) { return r.ok ? r.blob() : null; })
      .then(function (blob) {
        if (!blob) return null;
        return new Promise(function (resolve) {
          var fr = new FileReader();
          fr.onload = function () { logoDataUrl = fr.result; resolve(logoDataUrl); };
          fr.onerror = function () { resolve(null); };
          fr.readAsDataURL(blob);
        });
      }).catch(function () { return null; });
  }
  function pdfSlug(s) {
    var t = String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return t || 'document';
  }
  function fmtDateFR(iso) {
    try {
      var d = new Date((iso || '') + 'T00:00:00');
      if (isNaN(d.getTime())) return iso || '';
      return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) { return iso || ''; }
  }
  function pdfHeader(doc, logo, title) {
    var x0 = 20;
    if (logo) { try { doc.addImage(logo, 'PNG', x0, 10, 20, 20); x0 = 44; } catch (e) {} }
    doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.setTextColor(20);
    doc.text('Machines Roger International', x0, 18);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(110);
    doc.text('Procédures de forage — sécurité', x0, 24);
    doc.setDrawColor(200); doc.line(20, 34, 190, 34);
    doc.setTextColor(20); doc.setFont('helvetica', 'bold'); doc.setFontSize(15);
    doc.text(title, 20, 46);
    return 60;
  }
  function pdfField(doc, y, label, value) {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10.5); doc.setTextColor(20);
    doc.text(label, 20, y);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(40);
    doc.text(doc.splitTextToSize(String(value || '—'), 105), 78, y);
    return y + 9;
  }
  function pdfFooter(doc) {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(150);
    doc.text('Document généré automatiquement le ' + new Date().toLocaleString('fr-FR') +
      ' — Machines Roger International', 20, 285);
  }
  function buildWorkerPdf(payload, logo) {
    var doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4' });
    var y = pdfHeader(doc, logo, 'Attestation de lecture');
    y = pdfField(doc, y, 'Nom', payload.name);
    y = pdfField(doc, y, 'Procédure', (payload.proc || '') + (payload.titre ? ' — ' + payload.titre : ''));
    y = pdfField(doc, y, 'Date', fmtDateFR(payload.date));
    if (payload.revision) y = pdfField(doc, y, 'Révision de la procédure', payload.revision);
    if (payload.score) y = pdfField(doc, y, 'Résultat au quiz', payload.score);
    y += 8;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10.5); doc.setTextColor(40);
    doc.text(doc.splitTextToSize('Cette personne atteste avoir consulté cette fiche de procédure ' +
      'et complété le quiz associé sur le site des procédures de forage de Machines Roger International.', 170), 20, y);
    pdfFooter(doc);
    return doc;
  }
  function buildManagerPdf(payload, linked, recordId, logo) {
    var doc = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4' });
    var y = pdfHeader(doc, logo, 'Fiche de suivi — gestionnaire');
    doc.setFont('helvetica', 'italic'); doc.setFontSize(8.5); doc.setTextColor(130);
    doc.text('Usage interne — gestion des formations. Ne pas remettre au travailleur.', 20, y - 8);
    y = pdfField(doc, y, 'Nom', payload.name);
    y = pdfField(doc, y, 'Procédure', (payload.proc || '') + (payload.titre ? ' — ' + payload.titre : ''));
    y = pdfField(doc, y, 'Date', fmtDateFR(payload.date));
    if (payload.revision) y = pdfField(doc, y, 'Révision de la procédure', payload.revision);
    if (payload.score) y = pdfField(doc, y, 'Résultat au quiz', payload.score);
    y = pdfField(doc, y, 'Relié au registre employé', linked ? 'Oui' : 'Non — à relier manuellement');
    y = pdfField(doc, y, 'Temps sur la fiche', (payload.readTime || '—') +
      (payload.readSeconds != null ? ' (' + payload.readSeconds + ' s)' : ''));
    y = pdfField(doc, y, 'Temps sur le quiz', (payload.quizTime || '—') +
      (payload.quizSeconds != null ? ' (' + payload.quizSeconds + ' s)' : ''));
    y = pdfField(doc, y, 'Source', 'Site procédures (web)');
    if (recordId) y = pdfField(doc, y, 'Référence Airtable', recordId);
    pdfFooter(doc);
    return doc;
  }
  function attestSuccess(sec, name, linked, payload, recordId) {
    sec.innerHTML = '<h2>Attestation de lecture</h2>' +
      '<div class="attest-done"><span class="attest-done-ic">✓</span>' +
      '<div><strong>Attestation enregistrée</strong>' +
      '<span>Merci ' + esc(name) + '. Ta lecture de cette procédure est enregistrée' +
      (linked ? ' et reliée à ton dossier employé' : '') + '.</span>' +
      (payload ?
        '<div class="attest-pdfs">' +
          '<button type="button" class="attest-pdf-btn attest-pdf-w">' + ICON.doc + ' Mon attestation (PDF)</button>' +
          '<button type="button" class="attest-pdf-btn attest-pdf-m">' + ICON.doc + ' Fiche gestionnaire (PDF)</button>' +
          '<p class="attest-pdf-hint">La fiche gestionnaire contient les détails de suivi (temps, statut) — à remettre à ton superviseur.</p>' +
          '<div class="attest-pdf-msg" aria-live="polite"></div>' +
        '</div>' : '') +
      '<p class="attest-next"><a href="#/suivi">Voir mon suivi de formation ' + ICON.arrow + '</a></p>' +
      '</div></div>';
    if (!payload) return;
    var msgEl = sec.querySelector('.attest-pdf-msg');
    function fail() { msgEl.textContent = 'PDF indisponible pour le moment — réessaie quand tu as du réseau.'; }
    sec.querySelector('.attest-pdf-w').onclick = function () {
      msgEl.textContent = '';
      Promise.all([ensureJsPDF(), getLogo()]).then(function (r) {
        buildWorkerPdf(payload, r[1]).save(pdfSlug(payload.proc) + '-' + pdfSlug(name) + '-attestation.pdf');
      }).catch(fail);
    };
    sec.querySelector('.attest-pdf-m').onclick = function () {
      msgEl.textContent = '';
      Promise.all([ensureJsPDF(), getLogo()]).then(function (r) {
        buildManagerPdf(payload, linked, recordId, r[1]).save(pdfSlug(payload.proc) + '-' + pdfSlug(name) + '-gestionnaire.pdf');
      }).catch(fail);
    };
  }

  /* ---------- quiz intégré à la fiche de procédure ---------- */
  // Questions ratées (mode révision) : indices d'origine, persistés par fiche.
  function pqGetFails(id) { try { var v = JSON.parse(localStorage.getItem(pkey('pq_fail_' + id))); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function pqSetFails(id, arr) { try { localStorage.setItem(pkey('pq_fail_' + id), JSON.stringify(arr)); } catch (e) {} }
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
  function pqGetBest(id) { try { var v = JSON.parse(localStorage.getItem(pkey('pq_' + id))); return (v && typeof v.s === 'number') ? v : null; } catch (e) { return null; } }
  function pqSetBest(id, s, n) {
    var b = pqGetBest(id);
    // Écrase aussi quand le NOMBRE de questions a changé (quiz mis à jour) :
    // sinon un ancien record 9/10 rend un nouveau 8/8 imbattable et
    // l'attestation reste verrouillée pour toujours.
    if (!b || b.n !== n || s > b.s) { try { localStorage.setItem(pkey('pq_' + id), JSON.stringify({ s: s, n: n })); } catch (e) {} progPushSoon(); }
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
        ' <span class="pq-hint">Coche TOUTES les affirmations vraies, puis valide.</span></p>' +
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
        ' <span class="pq-hint">Touche les étapes dans l\'ordre (1, 2, 3…), puis valide.</span></p>' +
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
        ' <span class="pq-hint">Choisis la valeur officielle de chaque paramètre, puis valide.</span></p>' +
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
    // Chrono du quiz : court tant que le panneau du quiz est ouvert (et l'app visible).
    box.addEventListener('toggle', function () { ptQuizOpen(box.open); });
    if (box.open) ptQuizOpen(true);
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
          var sb = box.querySelector('.pqs-b'); var nb = pqGetBest(id);
          if (sb && nb) sb.textContent = 'Meilleur : ' + nb.s + '/' + nb.n;
          updateAttestGate(id);
        }
      } else { scoreEl.className = 'pq-score'; }
    }
    function showExp(card, q) {
      var exp = card.querySelector('.pq-exp');
      exp.innerHTML = '<span class="pq-ref">Référence à la procédure</span>' + refsHTML(q.e);
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
          (q.e ? '<span class="pq-ref">Référence à la procédure</span>' + refsHTML(q.e) : '');
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

  /* ---------- document officiel : lecture en plein écran ----------
     Ouverte en touchant l'aperçu (première page) de la fiche : toutes les
     pages du document, à pleine largeur, avec barre de titre et « Fermer ».
     Mêmes URLs versionnées (?r=) que la fiche → fonctionne hors-ligne. */
  function initDocViewer() {
    var btns = document.querySelectorAll('.pv-thumb');
    if (!btns.length) return;
    var fs = document.getElementById('docfs');
    if (!fs) {
      fs = document.createElement('div');
      fs.id = 'docfs';
      fs.className = 'docfs';
      fs.innerHTML =
        '<div class="docfs-bar"><b class="docfs-t"></b><span class="docfs-n"></span>' +
          '<button class="docfs-close" type="button">' + ICON.close + ' Fermer</button></div>' +
        '<div class="docfs-pages"></div>';
      document.body.appendChild(fs);
      fs.querySelector('.docfs-close').onclick = function () {
        fs.classList.remove('on');
        fs.querySelector('.docfs-pages').innerHTML = '';   // libère les images
      };
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && fs.classList.contains('on')) fs.querySelector('.docfs-close').click();
      });
    }
    [].forEach.call(btns, function (b) {
      b.onclick = function () {
        var key = b.getAttribute('data-doc'), label = b.getAttribute('data-label') || '';
        var pages = (window.PAGES && window.PAGES[key]) || [];
        if (!pages.length) return;
        fs.querySelector('.docfs-t').textContent = label;
        fs.querySelector('.docfs-n').textContent = pages.length + ' page' + (pages.length > 1 ? 's' : '');
        var box = fs.querySelector('.docfs-pages');
        box.innerHTML = pages.map(function (src, i) {
          return '<img src="' + esc(withRev(src, key)) + '" alt="' + esc(label) + ' — page ' + (i + 1) + '" loading="lazy">';
        }).join('');
        box.scrollTop = 0;
        fs.classList.add('on');
      };
    });
  }

  /* ---------- galerie photos / schémas + visionneuse plein écran ---------- */
  function initGallery(figs, pid) {
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
      img.src = withRev(figs[cur].src, pid);
      img.alt = 'Photo ou schéma agrandi, page ' + figs[cur].page;
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
    // Un seul écouteur clavier global, posé une fois (document.onkeydown
    // écrasait tout autre gestionnaire et survivait à la fiche).
    lbKeys.show = show; lbKeys.close = close;
    if (!lbKeys.bound) {
      lbKeys.bound = true;
      document.addEventListener('keydown', function (e) {
        var box = document.getElementById('lightbox');
        if (!box || !box.classList.contains('on')) return;
        if (e.key === 'Escape') lbKeys.close();
        else if (e.key === 'ArrowLeft') lbKeys.show(lbKeys.cur() - 1);
        else if (e.key === 'ArrowRight') lbKeys.show(lbKeys.cur() + 1);
      });
    }
    lbKeys.cur = function () { return cur; };
  }
  var lbKeys = { bound: false, show: null, close: null, cur: function () { return 0; } };

  /* ---------- liste de vérification (checklist) ---------- */
  function ckGet(id) { try { return JSON.parse(localStorage.getItem(pkey('ck_' + id)) || '[]'); } catch (e) { return []; } }
  function ckSet(id, a) { try { localStorage.setItem(pkey('ck_' + id), JSON.stringify(a)); } catch (e) {} }
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
  /* Référence(s) à la procédure : s'il y a PLUSIEURS citations « … » (questions
     à plusieurs réponses, remises en ordre…), chacune va sur sa propre ligne à
     puce — au lieu d'un bloc de texte où l'on se perd. Les commentaires entre
     les citations restent attachés à la citation qu'ils suivent. */
  function refsHTML(e) {
    var txt = String(e || '');
    var quotes = txt.match(/«[^»]*»/g) || [];
    if (quotes.length < 2) return esc(txt);
    var first = txt.indexOf(quotes[0]);
    var prefix = txt.slice(0, first).replace(/[\s:;…]+$/, '').trim();
    var out = prefix ? '<span class="pq-refpre">' + esc(prefix) + '</span>' : '';
    out += '<ul class="pq-refs">';
    var pos = first;
    quotes.forEach(function (q, i) {
      var at = txt.indexOf(q, pos);
      pos = at + q.length;
      var nextAt = (i + 1 < quotes.length) ? txt.indexOf(quotes[i + 1], pos) : txt.length;
      var between = txt.slice(pos, nextAt).replace(/^[\s;:…]+|[\s;:…]+$/g, '').trim();
      out += '<li>' + esc(q) + (between ? ' <span class="pq-refnote">' + esc(between) + '</span>' : '') + '</li>';
      pos = nextAt;
    });
    return out + '</ul>';
  }
  function pills(arr, cls) {
    return '<div class="pill-list">' + arr.map(function (x) { return '<span class="pill ' + cls + '">' + esc(x) + '</span>'; }).join('') + '</div>';
  }

  /* (Vue « Code de sécurité » retirée du site — données conservées dans
     code-securite-data.js, non chargé ; historique complet dans git.) */
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
      '<p class="lead">Questions tirées au hasard des procédures : consignes, distances, interdictions. ' + POOL.length + ' questions au total (choix de réponse, vrai ou faux, textes à trous, remises en ordre…).</p>' +
      '<div class="quizstart">' +
        '<label class="qsf"><span>Nombre de questions</span><select class="f" id="qN"><option>5</option><option selected>10</option><option>15</option><option value="999">Toutes</option></select></label>' +
        '<label class="qsf"><span>Catégorie</span><select class="f" id="qCat">' + catOpts + '</select></label>' +
        '<button class="btn" id="qStart">Démarrer le quiz</button>' +
      '</div>' +
      '<div class="chips qcatchips" id="qCatChips">' +
        '<button type="button" class="chip on" data-qcat="">Toutes</button>' +
        Object.keys(cats).sort().map(function (c) {
          return '<button type="button" class="chip" data-qcat="' + esc(c) + '">' + esc(c) + ' <span class="ct">' + cats[c] + '</span></button>';
        }).join('') +
      '</div>' +
    '</div></section>';
    // les puces règlent la catégorie (plus faciles à toucher que le menu)
    $('#qCatChips').addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.chip'); if (!b) return;
      $('#qCat').value = b.getAttribute('data-qcat') || '';
      [].forEach.call(document.querySelectorAll('#qCatChips .chip'), function (c) { c.classList.remove('on'); });
      b.classList.add('on');
    });
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
        '<span class="qscore" aria-live="polite">Score\u00a0: ' + s.score + '</span></div>' +
      '<div class="qbar"><i style="width:' + Math.round(s.idx / s.pool.length * 100) + '%"></i></div>' +
      '<div class="qcard"><div class="qtag">' + esc(q.code || q.categorie) +
        (q.type && QTYPE_LBL[q.type] ? ' · ' + QTYPE_LBL[q.type] : '') +
        ' · Question ' + (s.idx + 1) + '/' + s.pool.length + '</div>' +
        '<h2 class="qq">' + esc(q.question) + '</h2>' +
        (hint ? '<p class="qhint">' + hint + '</p>' : '') +
        body +
        (needV ? '<div class="qvald"><button class="btn" id="qValider"' + (q.type === 'ordre' ? ' disabled' : '') + '>Valider</button></div>' : '') +
        '<div class="qfb" id="qfb" role="status" aria-live="polite"></div>' +
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
    var qsc = document.querySelector('.qscore'); if (qsc) qsc.textContent = 'Score\u00a0: ' + s.score;
    var src = q.sourceId ? '<div class="qsrc">Source : <a href="#/p/' + esc(q.sourceId) + '">' + esc(q.code || q.titre) + '</a></div>' : '';
    $('#qfb').innerHTML = '<div class="qexp ' + (good ? 'good' : 'wrong') + '">' +
      '<b>' + (good ? '✓ Bonne réponse' : '✗ Mauvaise réponse') + '</b>' +
      '<p>' + refsHTML(q.explication) + '</p>' + src +
      '<button class="btn" id="qNext">' + (s.idx + 1 < s.pool.length ? 'Question suivante' : 'Voir le résultat') + '</button></div>';
    $('#qNext').onclick = function () { s.idx++; s.answered = false; if (s.idx >= s.pool.length) renderResult(view); else renderQ(view); };
  }
  function renderResult(view) {
    var s = quizSt, pct = Math.round(s.score / s.pool.length * 100);
    var msg = pct >= 80 ? 'Très bon résultat.' : pct >= 60 ? 'Bien. Quelques consignes sont à revoir.' : 'À retravailler. Relis les fiches, puis réessaie.';
    view.innerHTML = '<div class="wrap quizwrap"><div class="qresult">' +
      '<div class="qring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
      '<h2>' + s.score + ' / ' + s.pool.length + '</h2><p class="lead">' + esc(msg) + '</p>' +
      '<div class="qacts"><button class="btn" id="qAgain">Recommencer</button>' +
        '<a class="btn ghost" href="#/procedures">Retour aux procédures</a></div></div></div>';
    $('#qAgain').onclick = function () { renderQuiz(view); };
  }

  /* ---------- vue : Mon suivi (progression + résultats détaillés) ----------
     Tout est calculé à partir des données DE CET APPAREIL (localStorage) :
     meilleurs scores de quiz (pq_*), attestations envoyées (attest_sent_*),
     fiches consultées (pt_read_*). La page fonctionne entièrement hors-ligne.
     « Récupérer mon historique » interroge le Worker (Airtable) par nom exact
     pour retrouver les attestations faites depuis un autre appareil — sans mot
     de passe. Les temps de consultation ne sont JAMAIS montrés ici : ils sont
     réservés aux gestionnaires (Airtable). */
  function suiviName() {
    try { return localStorage.getItem('prof_name') || localStorage.getItem('suivi_name') || localStorage.getItem('attest_name') || ''; } catch (e) { return ''; }
  }
  // Attestation connue pour cette fiche : envoyée depuis CET appareil
  // (attest_sent_) ou retrouvée dans l'historique Airtable (attest_hist_).
  function attestInfo(id) {
    var raw = '';
    try { raw = localStorage.getItem(pkey('attest_sent_' + id)) || ''; } catch (e) {}
    if (raw) { var parts = raw.split('|'); return { date: parts[2] || '', score: '', src: 'local' }; }
    try {
      var pd = localStorage.getItem(pkey('attest_pending_' + id));
      if (pd) return { date: pd, score: '', src: 'pending' };
    } catch (e) {}
    try {
      var h = JSON.parse(localStorage.getItem(pkey('attest_hist_' + id)));
      if (h && h.date) return { date: h.date, score: h.score || '', src: 'hist' };
    } catch (e) {}
    return null;
  }
  function suiviRowHTML(p) {
    var total = (window.QUIZ_PROC && window.QUIZ_PROC[p.id] || []).length;
    var best = pqGetBest(p.id);
    var att = attestInfo(p.id);
    var read = ptGet(pkey('pt_read_' + p.id)) > 0;
    var quizDone = !!(best && total && best.n === total);
    var pct = (best && best.n) ? Math.round(best.s / best.n * 100) : null;
    var toReview = quizDone ? pqGetFails(p.id).filter(function (i) { return i < total; }).length : 0;

    var badges = '';
    if (!total) badges += '<span class="sv-b sv-mute">Pas de quiz</span>';
    else if (quizDone) badges += '<span class="sv-b ' + (pct === 100 ? 'sv-ok' : pct >= 80 ? 'sv-pass' : 'sv-warn') + '">Quiz ' + best.s + '/' + best.n + ' · ' + pct + ' %</span>';
    else if (best) badges += '<span class="sv-b sv-warn">Quiz à refaire (questions mises à jour)</span>';
    else badges += '<span class="sv-b sv-mute">Quiz à faire</span>';
    if (toReview) badges += '<span class="sv-b sv-rev">' + toReview + ' question' + (toReview > 1 ? 's' : '') + ' à réviser</span>';
    if (att && att.src === 'pending') badges += '<span class="sv-b sv-warn">Complétée — envoi au retour du réseau</span>';
    else if (att) badges += '<span class="sv-b sv-ok">' + ICON.check + ' Complétée' + (att.date ? ' le ' + esc(fmtDateFR(att.date)) : '') + '</span>';
    else if (read && !best) badges += '<span class="sv-b sv-mute">Consultée</span>';

    return '<a class="sv-row" href="#/p/' + esc(p.id) + '">' +
      '<span class="sv-dot" style="--c:' + catColor(p.categorie) + '"></span>' +
      '<span class="sv-t"><b>' + esc(p.titre) + '</b>' +
        (p.code ? '<span class="sv-code">' + esc(p.code) + '</span>' : '') + '</span>' +
      '<span class="sv-badges">' + badges + '</span>' + ICON.arrow + '</a>';
  }
  function suiviGroupHTML(titre, procs) {
    var att = procs.filter(function (p) { return !!attestInfo(p.id); }).length;
    var pctA = procs.length ? Math.round(att / procs.length * 100) : 0;
    return '<div class="sec sv-group"><h2>' + esc(titre) + '</h2>' +
      '<div class="sv-gbar"><div class="sv-gfill" style="width:' + pctA + '%"></div></div>' +
      '<p class="sv-gtxt">' + att + ' / ' + procs.length + ' procédures attestées</p>' +
      '<div class="sv-rows">' + procs.map(suiviRowHTML).join('') + '</div></div>';
  }
  function renderSuivi(view) {
    var withQuiz = DATA.filter(function (p) { return (window.QUIZ_PROC && window.QUIZ_PROC[p.id] || []).length > 0; });
    var quizDone = withQuiz.filter(function (p) {
      var b = pqGetBest(p.id), t = (window.QUIZ_PROC[p.id] || []).length;
      return !!(b && b.n === t);
    });
    var attested = DATA.filter(function (p) { return !!attestInfo(p.id); });
    var played = withQuiz.map(function (p) { return pqBestPct(p.id); }).filter(Boolean);
    var avg = played.length ? Math.round(played.reduce(function (a, b) { return a + b.pct; }, 0) / played.length) : null;
    var name = suiviName();

    // Ordre utile : d'abord « quiz fait, pas complétée » (il ne manque qu'un
    // geste), puis quiz en cours, puis pas commencées ; les complétées à la fin.
    function svRank(p) {
      if (attestInfo(p.id)) return 3;
      var total = (window.QUIZ_PROC && window.QUIZ_PROC[p.id] || []).length;
      var b = pqGetBest(p.id);
      if (b && total && b.n === total) return 0;
      if (b) return 1;
      return 2;
    }
    function svCmp(a, b) { return svRank(a) - svRank(b) || cmpCode(a, b); }
    var ith = DATA.filter(function (p) { return p.famille !== 'diamant'; }).sort(svCmp);
    var diam = DATA.filter(function (p) { return p.famille === 'diamant'; }).sort(svCmp);

    view.innerHTML =
      '<section class="hero herosm"><div class="wrap">' +
        '<span class="eyebrow">Suivi de formation</span>' +
        '<h1>Mon <span class="hl">suivi</span></h1>' +
        '<p class="lead">Ta progression sur les procédures : quiz complétés, attestations envoyées et résultats détaillés.' +
        (name ? ' Travailleur actif : <b>' + esc(name) + '</b>.' : '') + '</p>' +
        '<div class="stats">' +
          '<div class="stat"><b>' + attested.length + ' / ' + DATA.length + '</b><span>Attestations</span></div>' +
          '<div class="stat"><b>' + quizDone.length + ' / ' + withQuiz.length + '</b><span>Quiz complétés</span></div>' +
          '<div class="stat"><b>' + (avg == null ? '—' : avg + ' %') + '</b><span>Score moyen</span></div>' +
        '</div>' +
      '</div></section>' +
      '<div class="wrap">' +
        suiviSyncHTML() +
        '<div class="secwrap"><h2 class="sv-h2">Résultats détaillés</h2>' +
          suiviGroupHTML('Foreuses ITH / CUBEX', ith) +
          suiviGroupHTML('Forage au diamant', diam) +
        '</div>' +
        '<p class="sv-note">Les résultats affichés ici restent sur ton appareil. Les gestionnaires font le suivi officiel à partir des attestations envoyées.</p>' +
      '</div>';
    initSuiviSync(view);
  }
  function suiviSyncHTML() {
    if (!attestEndpoint()) return '';
    return '<div class="sv-sync">' +
      '<b>Nouveau téléphone ou appareil partagé ?</b>' +
      '<p>Ta progression (quiz et attestations) est sauvegardée avec ton nom. Entre ton nom exact pour la retrouver ici — sur un appareil partagé, chaque travailleur retrouve ses propres résultats en entrant le sien.</p>' +
      '<div class="sv-form">' +
        '<input type="text" class="sv-name" placeholder="Prénom Nom" autocomplete="off" value="' + esc(suiviName()) + '">' +
        '<button type="button" class="btn sv-fetch">Récupérer ma progression</button>' +
      '</div><div class="sv-msg" aria-live="polite"></div></div>';
  }
  function initSuiviSync(view) {
    var box = view.querySelector('.sv-sync'); if (!box) return;
    var input = box.querySelector('.sv-name');
    var btn = box.querySelector('.sv-fetch');
    var msg = box.querySelector('.sv-msg');
    btn.onclick = function () {
      var name = (input.value || '').replace(/\s+/g, ' ').trim();
      if (name.length < 2) { msg.className = 'sv-msg no'; msg.textContent = 'Entre ton nom complet.'; input.focus(); return; }
      // Ce nom devient le profil actif de l'appareil : ses données locales
      // (appareil partagé) reviennent tout de suite, même hors ligne.
      var switched = profSlug(name) !== profSlug(profName());
      profSet(name);
      function setMsg2(cls, txt) {           // le rendu recrée la boîte → viser la nouvelle
        var m2 = document.querySelector('.sv-msg');
        if (m2) { m2.className = 'sv-msg' + (cls ? ' ' + cls : ''); m2.textContent = txt; }
      }
      if (!navigator.onLine) {
        renderSuivi($('#view'));
        setMsg2('no', (switched ? 'Profil actif : ' + name + '. ' : '') +
          'Hors ligne — la progression enregistrée avec ce nom sera récupérée au retour du réseau.');
        return;
      }
      btn.disabled = true; msg.className = 'sv-msg'; msg.textContent = 'Recherche…';
      fetch(attestEndpoint() + '?hist=' + encodeURIComponent(name))
        .then(function (r) { return r && r.ok ? r.json() : null; })
        .then(function (d) {
          btn.disabled = false;
          if (!d || !d.ok) { msg.className = 'sv-msg no'; msg.textContent = 'Service injoignable pour le moment. Réessaie plus tard.'; return; }
          var found = applyHist(d.results || []);
          var merged = progMerge(d.progress);
          try { localStorage.setItem(pkey('prog_pull_t'), String(Date.now())); } catch (e) {}
          renderSuivi($('#view'));
          if (found || merged) {
            setMsg2('', 'Profil actif : ' + name + ' — ' + found + ' attestation' + (found > 1 ? 's' : '') +
              (merged ? ' et ' + merged + ' quiz' : '') + ' retrouvé' + (found + merged > 1 ? 's' : '') + '.');
            toast('Progression de ' + name + ' restaurée.');
          } else {
            setMsg2('no', 'Profil actif : ' + name + ' — aucune donnée enregistrée à ce nom. ' +
              'Nouveau départ, ou vérifie l\'orthographe exacte (Prénom Nom).');
          }
        })
        .catch(function () {
          btn.disabled = false;
          msg.className = 'sv-msg no'; msg.textContent = 'Service injoignable. Vérifie le réseau et réessaie.';
        });
    };
  }

  /* ---------- portail ---------- */
  function renderPortail(view) {
    var nProd = DATA.filter(function (p) { return p.famille !== 'diamant'; }).length;
    var nDiam = DATA.filter(function (p) { return p.famille === 'diamant'; }).length;
    view.innerHTML = '<section class="portal"><div class="wrap">' +
      '<div class="phead2"><div><h1>Sécurité du forage</h1><p>Machines Roger International</p></div></div>' +
      '<p class="plead">Choisis ton secteur.</p>' +
      '<div class="portal-cards">' +
        '<a class="portal-card kb" href="#/procedures"><div class="pc-ic">' + ICON.doc + '</div>' +
          '<h2>Foreuses ITH / CUBEX</h2><p>Procédures de forage et d\'alésage (ITH, CUBEX, V-30) : consignes, valeurs-clés, PDF officiel et quiz.</p>' +
          '<div class="pc-meta">' + nProd + ' procédures · disponible hors ligne</div>' +
          '<span class="go">Entrer ' + ICON.arrow + '</span></a>' +
        '<a class="portal-card diam" href="#/diamant"><div class="pc-ic">' + ICON.doc + '</div>' +
          '<h2>Forage au diamant</h2><p>Procédures de forage au diamant : carottage, planchers, déplacements (DR-600, STM-1500), sécurité. PDF officiel visionnable et recherchable.</p>' +
          '<div class="pc-meta">' + nDiam + ' procédures · disponible hors ligne</div>' +
          '<span class="go">Entrer ' + ICON.arrow + '</span></a>' +
      '</div>' +
      '<a class="portal-suivi" href="#/suivi">' + ICON.check +
        ' <b>Mon suivi de formation</b><span>Quiz complétés, attestations, résultats détaillés</span>' + ICON.arrow + '</a>' +
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
      toast('Sur iPhone/iPad : touchez « Partager » puis « Sur l\'écran d\'accueil ».');
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
      ? 'Sur iPhone/iPad : touchez <b>Partager</b> puis <b>« Sur l\'écran d\'accueil »</b>.'
      : 'Installe l\'application sur ton téléphone : accès rapide, même sans réseau.';
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
    toast('Application installée. Retrouve-la sur ton écran d\'accueil.');
  });

  var toastT;
  function toast(msg) {
    var t = $('#toast'); t.innerHTML = '<b>' + esc(msg) + '</b>';
    t.classList.add('show'); clearTimeout(toastT);
    toastT = setTimeout(function () { t.classList.remove('show'); }, 5000);
  }

  /* ---------- démarrage ---------- */
  window.addEventListener('hashchange', route);
  // Thème clair / sombre : sombre par défaut (sous terre), choix mémorisé.
  var THEME_ICONS = {
    sun: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
  };
  function themeBtnIcon() {
    var b = $('#themeBtn'); if (!b) return;
    var light = document.documentElement.getAttribute('data-theme') === 'light';
    b.innerHTML = light ? THEME_ICONS.moon : THEME_ICONS.sun;
    b.title = light ? 'Repasser au thème sombre' : 'Passer au thème clair';
  }
  function initTheme() {
    var b = $('#themeBtn'); if (!b) return;
    themeBtnIcon();
    b.addEventListener('click', function () {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      if (light) document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', 'light');
      try { localStorage.setItem('theme', light ? 'dark' : 'light'); } catch (e) {}
      themeBtnIcon();
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    route(); initInstall(); initChecklistEvents(); initTheme();
    aqFlush();      // attestations en attente d'envoi (mises en file hors-ligne)
    progDirtyFlush();   // progression marquée « à pousser » pendant une panne
    progPullAuto();     // et relecture serveur (profil actif, au plus toutes les 6 h)
  });
})();
