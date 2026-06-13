/* ===========================================================================
   Procédures de forage MRI — logique applicative (vanilla JS, sans build)
   =========================================================================== */
(function () {
  'use strict';

  var CFG   = window.SITE_CONFIG || {};
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
    doc: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>'
  };

  /* ---------- porte d'accès ---------- */
  function unlocked() { try { return localStorage.getItem('mri_ok') === '1'; } catch (e) { return false; } }
  function reveal() {
    $('#gate').classList.add('hide');
    $('#appbar').hidden = false; $('#view').hidden = false; $('#foot').hidden = false;
    route();
  }
  function initGate() {
    if (unlocked()) { reveal(); return; }
    var form = $('#gateForm'), err = $('#gateErr');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = $('#gateInput').value.trim();
      if (v && v.toLowerCase() === String(CFG.accessCode || '').toLowerCase()) {
        try { localStorage.setItem('mri_ok', '1'); } catch (e2) {}
        reveal();
      } else {
        err.textContent = 'Mot de passe incorrect.';
        $('#gateInput').value = ''; $('#gateInput').focus();
      }
    });
    $('#gateInput').focus();
  }
  function initLock() {
    $('#lockBtn').addEventListener('click', function () {
      try { localStorage.removeItem('mri_ok'); } catch (e) {}
      location.hash = '#/'; location.reload();
    });
  }

  /* ---------- routage ---------- */
  function route() {
    if (!unlocked()) return;
    var h = location.hash || '#/';
    var view = $('#view');
    window.scrollTo(0, 0);
    if (h.indexOf('#/p/') === 0) { renderProcedure(view, h.slice(4)); setNav(''); }
    else if (h.indexOf('#/quiz') === 0) { renderQuiz(view); setNav('quiz'); }
    else if (h.indexOf('#/code') === 0) { renderCode(view); setNav('code'); }
    else { renderHome(view); setNav('home'); }
  }
  function setNav(which) {
    document.querySelectorAll('.appbar nav a[data-nav]').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === which);
    });
  }

  /* ---------- vue : accueil ---------- */
  var state = { q: '', cat: '', mach: '' };
  function renderHome(view) {
    var cats = {}, machs = {};
    DATA.forEach(function (p) {
      cats[p.categorie] = (cats[p.categorie] || 0) + 1;
      (p.machines || []).forEach(function (m) { machs[m] = (machs[m] || 0) + 1; });
    });
    var nbConsignes = DATA.reduce(function (a, p) { return a + ((p.consignes_securite || []).length); }, 0);

    var catChips = Object.keys(cats).sort().map(function (c) {
      return '<button class="chip" data-cat="' + esc(c) + '" style="--c:' + catColor(c) + '">' +
        esc(c) + ' <span class="ct">' + cats[c] + '</span></button>';
    }).join('');
    var machChips = Object.keys(machs).sort().map(function (m) {
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
      '<div class="toolbar"><div class="wrap">' +
        '<div class="search">' + ICON.search +
          '<input id="q" type="search" placeholder="Rechercher une procédure, une machine, une consigne…" autocomplete="off">' +
        '</div>' +
        '<div class="chips" id="catChips">' +
          '<button class="chip on" data-cat="">Toutes</button>' + catChips +
        '</div>' +
        '<div class="chips" id="machChips">' +
          '<button class="chip on" data-mach="">Toutes machines</button>' + machChips +
        '</div>' +
      '</div></div>' +
      '<div class="wrap"><div class="count" id="count"></div><div class="grid" id="grid"></div></div>';

    var q = $('#q');
    q.value = state.q;
    q.addEventListener('input', function () { state.q = q.value; drawList(); });
    bindChips('#catChips', 'cat');
    bindChips('#machChips', 'mach');
    drawList();
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
    if (state.mach && (p.machines || []).indexOf(state.mach) < 0) return false;
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
    return '<a class="pcard" href="#/p/' + esc(p.id) + '" style="--cat:' + col + '">' +
      '<div class="tags"><span class="cat-tag" style="--cat:' + col + '">' + esc(p.categorie) + '</span>' +
        (p.code ? '<span class="code-tag">' + esc(p.code) + '</span>' : '') + '</div>' +
      '<h3>' + esc(p.titre) + '</h3>' +
      '<p>' + esc(p.resume) + '</p>' +
      (p.machines && p.machines.length ? '<div class="mach">' + p.machines.map(function (m) {
        return '<span class="mbadge">' + esc(m) + '</span>'; }).join('') + '</div>' : '') +
      '<span class="go">Consulter ' + ICON.arrow + '</span>' +
    '</a>';
  }

  /* ---------- vue : procédure ---------- */
  function renderProcedure(view, id) {
    var p = DATA.filter(function (x) { return x.id === id; })[0];
    if (!p) { view.innerHTML = '<div class="wrap"><a class="back" href="#/">' + ICON.back + ' Accueil</a><div class="empty">Procédure introuvable.</div></div>'; return; }
    var col = catColor(p.categorie);
    var dates = [p.date_creation, p.date_revision ? 'Rév. ' + p.date_revision : ''].filter(Boolean).join(' · ');
    var h = '<div class="wrap"><a class="back" href="#/">' + ICON.back + ' Toutes les procédures</a>' +
      '<div class="phead">' +
        '<div class="tags"><span class="cat-tag" style="--cat:' + col + '">' + esc(p.categorie) + '</span>' +
          (p.code ? '<span class="code-tag">' + esc(p.code) + '</span>' : '') + '</div>' +
        '<h1>' + esc(p.titre) + '</h1>' +
        '<div class="meta">' +
          (p.machines || []).map(function (m) { return '<span>' + esc(m) + '</span>'; }).join('<span class="dot"></span>') +
          (dates ? '<span class="dot"></span><span>' + esc(dates) + '</span>' : '') +
        '</div>' +
        (p.valeurs_cles && p.valeurs_cles.length ? '<div class="kv">' + p.valeurs_cles.map(function (k) {
          return '<div class="k"><span>' + esc(k.libelle) + '</span><b>' + esc(k.valeur) + '</b></div>'; }).join('') + '</div>' : '') +
      '</div>';

    if (p.resume) h += '<div class="sec"><div class="lead2">' + esc(p.resume) + '</div></div>';

    // Renvoi au PDF : la marche à suivre détaillée demeure dans le document officiel
    var pdfUrl = 'pdf/' + encodeURIComponent(p.id) + '.pdf';
    h += '<div class="sec"><div class="pdfcue">' + ICON.doc +
      '<div class="cuetxt"><b>La marche à suivre complète est dans le document officiel (PDF).</b>' +
      '<span>Cette fiche présente uniquement les mises en garde, interdictions, responsabilités et consignes de sécurité. Pour les étapes détaillées, consultez le PDF officiel.</span></div>' +
      '<a class="btn" href="' + pdfUrl + '" target="_blank" rel="noopener">Ouvrir le PDF</a></div></div>';

    if (p.objectif) h += sec('Objectif', '<p>' + esc(p.objectif) + '</p>');
    var ap = '';
    if (p.application) ap += '<p><b>Application :</b> ' + esc(p.application) + '</p>';
    if (p.responsabilites) ap += '<p style="margin-top:.5rem"><b>Responsabilités :</b> ' + esc(p.responsabilites) + '</p>';
    if (ap) h += sec('Portée et responsabilités', ap);

    if (p.epi && p.epi.length) h += sec('Équipements de protection', pills(p.epi, 'epi'));

    // Mises en garde = encadrés d'avertissement + avertissements intégrés aux étapes (sans le texte des étapes)
    var warns = (p.avertissements || []).slice();
    (p.etapes || []).forEach(function (s) { if (s.danger) warns.push(s.danger); });
    if (warns.length) h += sec('Mises en garde et avertissements', warns.map(function (w) {
      return '<div class="warn"><span class="wic">' + ICON.warn + '</span><p>' + esc(w) + '</p></div>'; }).join(''));

    if (p.consignes_securite && p.consignes_securite.length) {
      var ckhead = '<div class="ckhead"><div class="ckbar"><i></i></div><span class="ckcount"></span>' +
        '<button class="ckreset" type="button">Réinitialiser</button></div>';
      var ckitems = p.consignes_securite.map(function (c, i) {
        return '<label class="ck"><input type="checkbox" data-i="' + i + '"><span class="ckbox">' + ICON.check + '</span>' +
          '<span class="rt">' + esc(c.regle) +
          (c.source ? '<span class="rsrc">' + esc(c.source) + (c.theme ? ' · ' + esc(c.theme) : '') + '</span>' : '') +
          '</span></label>';
      }).join('');
      h += sec('Liste de vérification — consignes et interdictions',
        '<div class="checklist" data-proc="' + esc(p.id) + '">' + ckhead + ckitems + '</div>');
    }

    if (p.historique && p.historique.length) {
      h += sec('Historique des révisions', '<table class="hist"><thead><tr><th>Date</th><th>Modification</th><th>Par</th></tr></thead><tbody>' +
        p.historique.map(function (r) { return '<tr><td>' + esc(r.date) + '</td><td>' + esc(r.description) + '</td><td>' + esc(r.par) + '</td></tr>'; }).join('') +
        '</tbody></table>');
    }

    // PDF officiel
    var pdf = 'pdf/' + encodeURIComponent(p.id) + '.pdf';
    h += '<div class="sec"><h2>Document officiel (PDF)</h2><div class="pdfbox">' +
      '<div class="bar">' + ICON.doc + '<b>' + esc(p.code || p.titre) + '</b><span class="sp"></span>' +
        '<a class="dl" href="' + pdf + '" target="_blank" rel="noopener">Ouvrir</a>' +
        '<a class="dl" href="' + pdf + '" download>Télécharger</a></div>' +
      '<iframe src="' + pdf + '#view=FitH" title="PDF de la procédure" loading="lazy"></iframe>' +
    '</div>';
    if (p.id === 'centralisateur') {
      h += '<div class="pdfbox" style="margin-top:1rem"><div class="bar">' + ICON.doc + '<b>Dessin technique du centralisateur</b><span class="sp"></span>' +
        '<a class="dl" href="pdf/centralisateur-dessin.pdf" target="_blank" rel="noopener">Ouvrir</a></div>' +
        '<iframe src="pdf/centralisateur-dessin.pdf#view=FitH" title="Dessin technique" loading="lazy"></iframe></div>';
    }
    h += '</div></div>';
    view.innerHTML = h;
    initChecklistState();
  }
  function sec(title, inner) { return '<div class="sec"><h2>' + esc(title) + '</h2>' + inner + '</div>'; }

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
    var msg = pct >= 80 ? 'Excellent — des réflexes solides.' : pct >= 60 ? 'Correct, mais quelques consignes à revoir.' : 'À retravailler : consulte les fiches et les PDF officiels.';
    view.innerHTML = '<div class="wrap quizwrap"><div class="qresult">' +
      '<div class="qring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
      '<h2>' + s.score + ' / ' + s.pool.length + '</h2><p class="lead">' + esc(msg) + '</p>' +
      '<div class="qacts"><button class="btn" id="qAgain">Recommencer</button>' +
        '<a class="btn ghost" href="#/">Retour aux procédures</a></div></div></div>';
    $('#qAgain').onclick = function () { renderQuiz(view); };
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
    initGate(); initLock(); initInstall(); initChecklistEvents();
  });
})();
