/* Wiki RPS — moteur de rendu.
   Réplique les mécaniques d'un wiki Obsidian sans aucune compilation :
   - markdown restreint (titres, listes, callouts, gras/italique, liens) ;
   - wikiliens [[Cible|Alias]] résolus vers les pages existantes, les autres
     devenant des « liens rouges » qui mènent à une page-souche listant qui
     les référence ;
   - propriétés (frontmatter) affichées, rétroliens calculés, recherche.
   Routage par hash (#/ et #/page/<slug>) — compatible GitHub Pages. */
(function () {
  'use strict';

  /* ───────── Registre des pages ───────── */

  // Slug commun aux ancres de titres et aux cibles de wikiliens : minuscules,
  // accents conservés (comme Obsidian), ponctuation retirée, espaces → tirets.
  function slug(s) {
    return String(s).normalize('NFC').toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim()
      .replace(/[\s-]+/g, '-');
  }

  var PAGES = window.WIKI_PAGES || [];
  var BY_SLUG = {};      // slug (titre ou alias) → page
  var HOME = null;
  PAGES.forEach(function (p) {
    p.slug = slug(p.title);
    BY_SLUG[p.slug] = p;
    (p.aliases || []).forEach(function (a) { BY_SLUG[slug(a)] = p; });
    if (p.home) HOME = p;
  });

  // Recense tous les wikiliens : rétroliens des pages existantes et registre
  // des pages référencées mais pas encore créées (les « liens rouges »).
  var BACKLINKS = {};    // slug de page existante → { slug source : nombre }
  var MISSING = {};      // slug inexistant → { name, refs: { slug source : n } }
  var LINK_COUNT = 0;
  var WL_RE = /\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g;
  PAGES.forEach(function (p) {
    var m;
    WL_RE.lastIndex = 0;
    while ((m = WL_RE.exec(p.body))) {
      LINK_COUNT++;
      var name = m[1].trim();
      var s = slug(name);
      var target = BY_SLUG[s];
      if (target) {
        var b = BACKLINKS[target.slug] || (BACKLINKS[target.slug] = {});
        if (target.slug !== p.slug) b[p.slug] = (b[p.slug] || 0) + 1;
      } else {
        var e = MISSING[s] || (MISSING[s] = { name: name, refs: {} });
        e.refs[p.slug] = (e.refs[p.slug] || 0) + 1;
      }
    }
  });

  /* ───────── Rendu markdown ───────── */

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function wikilink(name, label) {
    var s = slug(name);
    var page = BY_SLUG[s];
    var txt = esc(label || name);
    if (page) {
      if (page === HOME) return '<a class="wl" href="#/">' + txt + '</a>';
      return '<a class="wl" href="#/page/' + encodeURIComponent(page.slug) + '">' + txt + '</a>';
    }
    return '<a class="wl red" href="#/page/' + encodeURIComponent(s) +
      '" title="' + esc(name) + ' — page pas encore créée">' + txt + '</a>';
  }

  function inline(s) {
    var out = esc(s);
    out = out.replace(/\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g, function (_, name, label) {
      // déjà échappé : on ré-échappe l'inverse pour retrouver le texte brut
      var un = function (t) {
        return t.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      };
      return wikilink(un(name), label ? un(label) : '');
    });
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, txt, href) {
      if (href.charAt(0) === '#') {
        return '<a class="anc" data-anchor="' + esc(slug(decodeURIComponent(href.slice(1)))) + '" href="' +
          esc(location.hash || '#/') + '">' + txt + '</a>';
      }
      return '<a href="' + esc(href) + '" target="_blank" rel="noopener">' + txt + '</a>';
    });
    out = out.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
    return out;
  }

  var CALLOUT_ICONS = {
    warning: '⚠️', danger: '⛔', note: '📝', info: 'ℹ️', tip: '💡', question: '❓'
  };

  function renderMd(md) {
    var lines = md.split('\n');
    var html = [], para = [], list = null; // list = {tag:'ul'|'ol', items:[]}

    function flushPara() {
      if (para.length) { html.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; }
    }
    function flushList() {
      if (list) {
        html.push('<' + list.tag + '>' + list.items.map(function (i) {
          return '<li>' + inline(i) + '</li>';
        }).join('') + '</' + list.tag + '>');
        list = null;
      }
    }
    function flush() { flushPara(); flushList(); }

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var t = line.trim();
      var m;

      if (!t) { flush(); continue; }

      if ((m = t.match(/^(#{2,4})\s+(.*)$/))) {
        flush();
        var lvl = m[1].length;
        html.push('<h' + lvl + ' id="' + esc(slug(m[2])) + '">' + inline(m[2]) + '</h' + lvl + '>');
        continue;
      }

      if ((m = t.match(/^>\s*\[!(\w+)\]\s*(.*)$/))) {
        flush();
        var kind = m[1].toLowerCase();
        var body = [];
        while (i + 1 < lines.length && /^\s*>/.test(lines[i + 1])) {
          i++;
          body.push(lines[i].replace(/^\s*>\s?/, ''));
        }
        html.push('<div class="callout ' + esc(kind) + '"><div class="co-title"><span class="co-ic">' +
          (CALLOUT_ICONS[kind] || '📌') + '</span>' + inline(m[2] || kind) + '</div><div class="co-body"><p>' +
          inline(body.join(' ')) + '</p></div></div>');
        continue;
      }

      if (/^>/.test(t)) {
        flush();
        var q = [t.replace(/^>\s?/, '')];
        while (i + 1 < lines.length && /^\s*>/.test(lines[i + 1])) {
          i++;
          q.push(lines[i].replace(/^\s*>\s?/, ''));
        }
        html.push('<blockquote><p>' + inline(q.join(' ')) + '</p></blockquote>');
        continue;
      }

      if ((m = t.match(/^[-*]\s+(.*)$/)) || (m = t.match(/^[-*]\s*$/))) {
        flushPara();
        if (!list || list.tag !== 'ul') { flushList(); list = { tag: 'ul', items: [] }; }
        if (m[1] && m[1].trim()) list.items.push(m[1]);
        continue;
      }

      if ((m = t.match(/^\d+[.)]\s+(.*)$/))) {
        flushPara();
        if (!list || list.tag !== 'ol') { flushList(); list = { tag: 'ol', items: [] }; }
        list.items.push(m[1]);
        continue;
      }

      flushList();
      para.push(t);
    }
    flush();
    return html.join('\n');
  }

  /* ───────── Vues ───────── */

  var view = document.getElementById('wview');

  function badge(cls, label, value) {
    return '<span class="badge ' + cls + '" title="' + esc(label) + '">' + esc(value) + '</span>';
  }

  function pageBadges(meta) {
    if (!meta) return '';
    var b = [];
    if (meta['statut']) b.push(badge('st', 'Statut', meta['statut']));
    if (meta['qualité']) b.push(badge('q-' + slug(meta['qualité']), 'Qualité', meta['qualité']));
    if (meta['niveau-sensibilité'] != null) {
      b.push(badge('s' + meta['niveau-sensibilité'], 'Niveau de sensibilité', 'S' + meta['niveau-sensibilité']));
    }
    if (meta['révision']) b.push(badge('rev', 'Dernière révision', 'rév. ' + meta['révision']));
    return '<div class="pmeta">' + b.join('') + '</div>';
  }

  function propsPanel(meta) {
    if (!meta) return '';
    var order = ['tags', 'type', 'niveau-sensibilité', 'statut', 'qualité', 'révision',
      'publication-travailleur', 'publication-gestionnaire', 'traitement-publication',
      'version-jumelle', 'archive-candidat'];
    var rows = order.filter(function (k) { return k in meta; }).map(function (k) {
      var v = meta[k], cell;
      if (Array.isArray(v)) {
        cell = v.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join(' ');
      } else if (typeof v === 'boolean') {
        cell = v ? 'oui' : 'non';
      } else if (v === '' || v == null) {
        cell = '<span class="empty">—</span>';
      } else {
        cell = esc(String(v));
      }
      return '<div class="prow"><div class="pk">' + esc(k) + '</div><div class="pv">' + cell + '</div></div>';
    }).join('');
    return '<details class="props"><summary>Propriétés</summary><div class="pgrid">' + rows + '</div></details>';
  }

  function backlinksBlock(s) {
    var b = BACKLINKS[s];
    var keys = b ? Object.keys(b) : [];
    if (!keys.length) return '';
    keys.sort(function (x, y) { return b[y] - b[x]; });
    return '<section class="backlinks"><h2 class="bl-title">Pages qui pointent ici</h2><ul>' +
      keys.map(function (k) {
        var p = BY_SLUG[k];
        var href = p === HOME ? '#/' : '#/page/' + encodeURIComponent(p.slug);
        return '<li><a class="wl" href="' + href + '">' + esc(p.title) + '</a>' +
          (b[k] > 1 ? ' <span class="cnt">×' + b[k] + '</span>' : '') + '</li>';
      }).join('') + '</ul></section>';
  }

  function renderPage(p) {
    var notice = '';
    if (p.meta && p.meta['publication-travailleur'] === 'non') {
      notice = '<div class="notice">🔒 Ébauche interne — diffusion non validée (voir les propriétés de publication).</div>';
    }
    view.innerHTML = '<article class="article">' + notice +
      '<header class="phead"><h1>' + esc(p.title) + '</h1>' + pageBadges(p.meta) + '</header>' +
      propsPanel(p.meta) +
      '<div class="pbody">' + renderMd(p.body) + '</div>' +
      backlinksBlock(p.slug) +
      '</article>';
    document.title = (p.home ? 'Wiki RPS — SST psychosociale' : p.title + ' — Wiki RPS');
  }

  function renderMissing(s) {
    var e = MISSING[s];
    var name = e ? e.name : decodeURIComponent(s).replace(/-/g, ' ');
    var refs = e ? Object.keys(e.refs) : [];
    refs.sort(function (x, y) { return e.refs[y] - e.refs[x]; });
    view.innerHTML = '<article class="article missing">' +
      '<header class="phead"><h1>' + esc(name) + '</h1>' +
      '<div class="pmeta"><span class="badge red">page à créer</span></div></header>' +
      '<div class="missnote"><p>Cette page n’existe pas encore dans le wiki : c’est un <a class="wl red nohov">lien rouge</a> — ' +
      'une notion référencée dont la note reste à rédiger.</p></div>' +
      (refs.length ? '<section class="backlinks"><h2 class="bl-title">Référencée par</h2><ul>' +
        refs.map(function (k) {
          var p = BY_SLUG[k];
          var href = p === HOME ? '#/' : '#/page/' + encodeURIComponent(p.slug);
          return '<li><a class="wl" href="' + href + '">' + esc(p.title) + '</a>' +
            (e.refs[k] > 1 ? ' <span class="cnt">×' + e.refs[k] + '</span>' : '') + '</li>';
        }).join('') + '</ul></section>' : '') +
      '<p class="backhome"><a class="wl" href="#/">← Retour à l’accueil</a></p>' +
      '</article>';
    document.title = name + ' (à créer) — Wiki RPS';
  }

  /* ───────── Barre latérale ───────── */

  var side = document.getElementById('side');

  function buildSidebar() {
    var themes = PAGES.filter(function (p) { return !p.home; });
    var missKeys = Object.keys(MISSING);
    missKeys.sort(function (a, b) {
      var ra = MISSING[a].refs, rb = MISSING[b].refs;
      var na = Object.keys(ra).reduce(function (n, k) { return n + ra[k]; }, 0);
      var nb = Object.keys(rb).reduce(function (n, k) { return n + rb[k]; }, 0);
      return nb - na || MISSING[a].name.localeCompare(MISSING[b].name, 'fr');
    });

    side.innerHTML =
      '<nav class="snav">' +
      '<div class="sgroup"><a class="sitem home" data-slug="' + HOME.slug + '" href="#/">🏠 Accueil</a></div>' +
      '<div class="stitle">Thèmes</div>' +
      '<div class="sgroup">' + themes.map(function (p) {
        var q = p.meta && p.meta['qualité'] ? p.meta['qualité'] : '';
        return '<a class="sitem" data-slug="' + p.slug + '" href="#/page/' + encodeURIComponent(p.slug) + '">' +
          '<span class="dot q-' + slug(q) + '" title="qualité : ' + esc(q) + '"></span>' + esc(p.title) + '</a>';
      }).join('') + '</div>' +
      '<details class="smiss"><summary>Pages à créer <span class="cnt">' + missKeys.length + '</span></summary>' +
      '<div class="sgroup">' + missKeys.map(function (s) {
        var e = MISSING[s];
        var n = Object.keys(e.refs).reduce(function (t, k) { return t + e.refs[k]; }, 0);
        return '<a class="sitem miss" data-slug="' + esc(s) + '" href="#/page/' + encodeURIComponent(s) + '">' +
          '<span class="mname">' + esc(e.name) + '</span>' + (n > 1 ? '<span class="cnt">' + n + '</span>' : '') + '</a>';
      }).join('') + '</div></details>' +
      '<div class="sstats">' + PAGES.length + ' pages · ' + LINK_COUNT + ' liens · ' +
      missKeys.length + ' à créer</div>' +
      '</nav>';
  }

  function markActive(s) {
    side.querySelectorAll('.sitem').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-slug') === s);
    });
  }

  /* ───────── Routage ───────── */

  function route() {
    var h = location.hash || '#/';
    var m = h.match(/^#\/page\/(.+?)(?:$|\?)/);
    closeDrawer();
    if (m) {
      var s = decodeURIComponent(m[1]);
      var p = BY_SLUG[s];
      if (p) { renderPage(p); markActive(p.slug); }
      else { renderMissing(s); markActive(s); }
    } else {
      renderPage(HOME); markActive(HOME.slug);
    }
    window.scrollTo(0, 0);
  }

  // Liens d'ancre internes (table des matières) : défilement dans la page.
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[data-anchor]') : null;
    if (!a) return;
    var el = document.getElementById(a.getAttribute('data-anchor'));
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  /* ───────── Recherche ───────── */

  function plainText(md) {
    return md
      .replace(/\[\[([^\]|]+)\|([^\]]*)\]\]/g, '$2')
      .replace(/\[\[([^\]|]+)\]\]/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[#>*`]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  var INDEX = PAGES.map(function (p) {
    return { p: p, title: p.title.toLowerCase(), text: plainText(p.body), low: '' };
  });
  INDEX.forEach(function (r) { r.low = r.text.toLowerCase(); });

  var q = document.getElementById('q');
  var qres = document.getElementById('qres');

  function excerpt(text, low, term) {
    var i = low.indexOf(term);
    if (i < 0) return '';
    var a = Math.max(0, i - 55), b = Math.min(text.length, i + term.length + 65);
    var s = (a > 0 ? '… ' : '') + text.slice(a, b) + (b < text.length ? ' …' : '');
    return esc(s).replace(new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'i'),
      '<mark>$1</mark>');
  }

  function doSearch() {
    var raw = q.value.trim().toLowerCase();
    if (!raw) { qres.hidden = true; qres.innerHTML = ''; return; }
    var terms = raw.split(/\s+/);
    var hits = [];
    INDEX.forEach(function (r) {
      var ok = terms.every(function (t) { return r.title.indexOf(t) >= 0 || r.low.indexOf(t) >= 0; });
      if (!ok) return;
      var inTitle = terms.some(function (t) { return r.title.indexOf(t) >= 0; });
      hits.push({ r: r, score: inTitle ? 1 : 0 });
    });
    hits.sort(function (a, b) { return b.score - a.score; });
    if (!hits.length) {
      qres.innerHTML = '<div class="qempty">Aucune page ne correspond.</div>';
      qres.hidden = false;
      return;
    }
    qres.innerHTML = hits.slice(0, 8).map(function (h) {
      var p = h.r.p;
      var href = p === HOME ? '#/' : '#/page/' + encodeURIComponent(p.slug);
      return '<a class="qhit" href="' + href + '"><b>' + esc(p.title) + '</b>' +
        '<span class="qx">' + excerpt(h.r.text, h.r.low, terms[0]) + '</span></a>';
    }).join('');
    qres.hidden = false;
  }

  if (q) {
    q.addEventListener('input', doSearch);
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = qres.querySelector('.qhit');
        if (first) { location.hash = first.getAttribute('href'); q.blur(); }
      }
      if (e.key === 'Escape') { q.value = ''; qres.hidden = true; q.blur(); }
    });
    document.addEventListener('click', function (e) {
      if (!document.getElementById('searchBox').contains(e.target)) qres.hidden = true;
    });
    qres.addEventListener('click', function () { qres.hidden = true; q.value = ''; });
  }

  /* ───────── Thème, tiroir mobile ───────── */

  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      if (light) document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', 'light');
      try { localStorage.setItem('theme', light ? 'dark' : 'light'); } catch (err) {}
    });
  }

  var menuBtn = document.getElementById('menuBtn');
  var scrim = document.getElementById('scrim');
  function closeDrawer() {
    side.classList.remove('open');
    document.body.classList.remove('drawer');
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      side.classList.toggle('open');
      document.body.classList.toggle('drawer', side.classList.contains('open'));
    });
    scrim.addEventListener('click', closeDrawer);
  }

  /* ───────── Démarrage ───────── */

  buildSidebar();
  window.addEventListener('hashchange', route);
  route();
})();
