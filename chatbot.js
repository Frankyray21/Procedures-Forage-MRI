/* ===========================================================================
   ASSISTANT DE RECHERCHE — chatbot 100 % HORS-LIGNE.
   Cherche dans les procédures (consignes, valeurs, avertissements) et répond
   en CITANT le texte officiel + un lien vers la fiche. N'invente jamais rien :
   si rien ne correspond, il le dit et propose de consulter les procédures.
   Aucun réseau requis : tout est calculé sur l'appareil à partir de data.js.
   =========================================================================== */
(function () {
  'use strict';
  if (window.__CHATBOT_LOADED) return; window.__CHATBOT_LOADED = true;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  // Mots vides (ignorés dans la recherche) + synonymes du domaine du forage.
  var STOP = norm('le la les un une de des du d l à a au aux et ou en que qui quoi est sont ' +
    'il elle on pour dans sur avec quel quelle quels quelles combien comment quand pourquoi ' +
    'faut faire fait doit dois je tu vous nous se sa son ses ce cet cette mes mon ma votre ' +
    'plus moins entre lors si ne pas y the').split(/\s+/);
  var STOPSET = {}; STOP.forEach(function (w) { STOPSET[w] = 1; });

  // Synonymes : on étend la requête pour mieux matcher le vocabulaire des procédures.
  var SYN = {
    'casse': ['bris', 'brise', 'rompu'], 'casser': ['bris', 'brise'], 'cassee': ['bris', 'brise'],
    'brisee': ['bris', 'brise'], 'rod': ['tige'], 'tiges': ['tige'],
    'cadenas': ['cadenassage', 'verrouillage', 'lockout'], 'cadenasser': ['cadenassage'],
    'distance': ['metre', 'metres', 'pied', 'pieds', 'm'],
    'marteaux': ['marteau'], 'compresseur': ['surcompresseur'], 'surcompresseur': ['compresseur'],
    'explosif': ['explosifs', 'anfo', 'amex', 'dynamite'], 'explosifs': ['explosif'],
    'monterie': ['trou', 'raise'], 'centralisateur': ['centralisateurs'],
    'poids': ['livres', 'lbs', 'kg'], 'temperature': ['degres', 'chaud', 'brulure'],
    'eau': ['boyau'], 'air': ['boyau', 'pression'], 'whip': ['fouettement'],
    'harnais': ['antichute', 'chute', 'longe'], 'masse': ['coup'],
    'foreuse': ['foreuses', 'cubex', 'ith', 'v-30', 'v30'], 'taillant': ['taillants', 'bit', 'foret', 'forets']
  };

  // expand=false → mots-clés « cœur » (tels que tapés) ; expand=true → + synonymes
  function tokens(s, expand) {
    var raw = norm(s).replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean);
    var out = [];
    raw.forEach(function (w) {
      if (w.length < 2 && !/[0-9]/.test(w)) return;
      if (STOPSET[w]) return;
      out.push(w);
      if (expand && SYN[w]) SYN[w].forEach(function (x) { out.push(x); });
    });
    return out;
  }
  function uniq(arr) { var s = {}; return arr.filter(function (w) { return s[w] ? false : (s[w] = 1); }); }
  function rxesc(w) { return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  // poids de correspondance d'un mot dans un texte normalisé.
  // nombre → mot ENTIER obligatoire (« 6 » ne matche pas « 60 ») ; mot → entier=3, sous-chaîne=1.
  function wmatch(w, hay) {
    if (hay.indexOf(w) < 0) return 0;
    if (/[0-9]/.test(w)) return new RegExp('(^|[^a-z0-9])' + rxesc(w) + '([^a-z0-9]|$)').test(hay) ? 4 : 0;
    return new RegExp('(^|[^a-z0-9])' + rxesc(w)).test(hay) ? 3 : 1;
  }

  // ----- Construction de l'index à partir des procédures -----
  var INDEX = [];
  function buildIndex() {
    var DATA = window.PROCEDURES || [];
    // L'assistant cherche UNIQUEMENT dans le texte intégral des PDF des
    // procédures (pdftext.js). Les titres viennent de data.js pour l'affichage.
    var PT = window.PDFTEXT || {};
    var titreById = {};
    DATA.forEach(function (p) { titreById[p.id] = p.titre || p.id; });
    titreById['centralisateur-dessin'] = 'Dessin technique du centralisateur';
    Object.keys(PT).forEach(function (key) {
      var titre = titreById[key] || key;
      var meta = norm(titre);
      (PT[key] || []).forEach(function (pas) {
        if (!pas || !pas.t) return;
        INDEX.push({ text: pas.t, kind: 'PDF', source: 'PDF · p.' + pas.p,
          pid: (key === 'centralisateur-dessin' ? 'centralisateur' : key), ptitre: titre,
          txt: norm(pas.t), meta: meta });
      });
    });
  }

  function search(query) {
    var qt = uniq(tokens(query, true));
    var core = uniq(tokens(query, false));
    if (!qt.length) return [];
    var scored = [];
    INDEX.forEach(function (item) {
      var score = 0, hits = 0;
      qt.forEach(function (w) {
        var inTxt = wmatch(w, item.txt);
        if (inTxt) { score += inTxt; hits++; return; }        // match dans la réponse = poids plein
        var inMeta = wmatch(w, item.meta);
        if (inMeta) { score += inMeta * 0.4; hits++; }        // match seulement dans le titre = faible
      });
      if (!hits) return;
      score += hits / qt.length * 4;                          // couverture globale
      // bonus : tous les mots-clés « cœur » présents dans la réponse elle-même
      var coreInTxt = core.filter(function (w) { return wmatch(w, item.txt) > 0; }).length;
      if (core.length >= 2 && coreInTxt === core.length) score += 7;
      else if (core.length >= 2) score += coreInTxt / core.length * 3;
      // bonus de phrase : deux mots-clés voisins proches dans la réponse
      for (var j = 0; j + 1 < core.length; j++) {
        var a = item.txt.indexOf(core[j]), b = item.txt.indexOf(core[j + 1]);
        if (a >= 0 && b >= 0 && Math.abs(a - b) <= 28) score += 2;
      }
      scored.push({ item: item, score: score, hits: hits, core: coreInTxt });
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    // garde les meilleurs, en évitant les doublons de texte
    var seen = {}, out = [];
    for (var i = 0; i < scored.length && out.length < 4; i++) {
      var k = scored[i].item.text;
      if (seen[k]) continue; seen[k] = 1;
      if (scored[i].hits < Math.min(2, qt.length) && scored[i].score < 4) continue;
      out.push(scored[i]);
    }
    return out;
  }

  // ----- Interface -----
  var ICON_CHAT = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
  var ICON_CLOSE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';

  function el(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; }

  function answerHTML(query) {
    var res = search(query);
    if (!res.length) {
      return '<p>Je n\'ai pas trouvé de réponse précise dans les procédures. ' +
        'Reformule ta question (ex. « distance foreuse surcompresseur », « bris de tige », ' +
        '« cadenassage »), ou consulte <a href="#/procedures">toutes les procédures</a>.</p>';
    }
    var html = '<p>Voici ce que disent les procédures&nbsp;:</p>';
    res.forEach(function (r) {
      var it = r.item;
      html += '<div class="cbans">' +
        '<span class="cbk">' + esc(it.kind) + '</span>' +
        '<div class="cbtxt">« ' + esc(it.text) + ' »' +
          '<a class="cbsrc" href="#/p/' + esc(it.pid) + '">' + esc(it.ptitre) +
          (it.source ? ' · ' + esc(it.source) : '') + ' →</a>' +
        '</div></div>';
    });
    html += '<p class="cbnote">Réponses citées des procédures officielles. Toujours valider sur la fiche complète.</p>';
    return html;
  }

  var panel, body, opened = false;
  function pushMsg(role, html) {
    var m = el('<div class="cbmsg ' + role + '">' + html + '</div>');
    body.appendChild(m); body.scrollTop = body.scrollHeight;
    return m;
  }
  function handleSend(text) {
    text = (text || '').trim(); if (!text) return;
    pushMsg('user', esc(text));
    var q = norm(text);
    if (/(bonjour|salut|allo|merci|bonsoir)/.test(q) && tokens(text).length <= 1) {
      pushMsg('bot', '<p>Bonjour&nbsp;! Pose-moi une question sur les procédures de forage ' +
        '(consignes, distances, valeurs, marche à suivre). Je réponds en citant le document officiel.</p>');
      return;
    }
    pushMsg('bot', answerHTML(text));
  }

  function buildUI() {
    var btn = el('<button class="cbbtn" id="cbBtn" aria-label="Assistant procédures" title="Assistant procédures">' + ICON_CHAT + '</button>');
    panel = el('<div class="cbpanel" role="dialog" aria-label="Assistant procédures">' +
      '<div class="cbhead"><b>Assistant procédures</b><span class="cboff">hors-ligne</span>' +
        '<button class="cbx" id="cbClose" aria-label="Fermer">' + ICON_CLOSE + '</button></div>' +
      '<div class="cbbody" id="cbBody"></div>' +
      '<form class="cbform" id="cbForm">' +
        '<input id="cbInput" type="text" autocomplete="off" placeholder="Pose ta question…">' +
        '<button type="submit" aria-label="Envoyer">▶</button>' +
      '</form></div>');
    document.body.appendChild(btn);
    document.body.appendChild(panel);
    body = panel.querySelector('#cbBody');

    function toggle(open) {
      opened = (open == null) ? !opened : open;
      panel.classList.toggle('on', opened);
      btn.classList.toggle('hide', opened);
      if (opened) {
        if (!body.childElementCount) {
          pushMsg('bot', '<p>Bonjour&nbsp;! Je cherche dans les procédures et réponds en citant ' +
            'le texte officiel. Exemples&nbsp;:</p><div class="cbsugg">' +
            ['Distance foreuse ↔ surcompresseur', 'Que faire si une tige casse ?', 'Cadenassage avant intervention',
             'Poids d\'un marteau de 6 pouces'].map(function (s) {
              return '<button class="cbchip" type="button">' + esc(s) + '</button>';
            }).join('') + '</div>');
        }
        setTimeout(function () { var i = panel.querySelector('#cbInput'); if (i) i.focus(); }, 50);
      }
    }
    btn.onclick = function () { toggle(true); };
    panel.querySelector('#cbClose').onclick = function () { toggle(false); };
    panel.querySelector('#cbForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var inp = panel.querySelector('#cbInput');
      handleSend(inp.value); inp.value = '';
    });
    // clic sur une suggestion ou un lien de fiche → envoyer / fermer
    body.addEventListener('click', function (e) {
      var chip = e.target.closest && e.target.closest('.cbchip');
      if (chip) { handleSend(chip.textContent); return; }
      if (e.target.closest && e.target.closest('a')) { toggle(false); }
    });
  }

  function init() {
    if (!window.PDFTEXT || !Object.keys(window.PDFTEXT).length) { setTimeout(init, 300); return; }
    buildIndex();
    buildUI();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
