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
  // Repli d'accents 1:1 (préserve la longueur, contrairement à NFD) pour pouvoir
  // surligner le mot d'origine à la bonne position.
  function fold(s) {
    return String(s || '').toLowerCase()
      .replace(/[àâäáã]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[îïíì]/g, 'i')
      .replace(/[ôöóòõ]/g, 'o').replace(/[ûüúù]/g, 'u').replace(/ç/g, 'c').replace(/œ/g, 'o');
  }
  // Surligne (en jaune, via <mark class="cbhl">) les mots recherchés dans un
  // passage, sans toucher aux accents/casse d'origine.
  function highlight(text, terms) {
    if (!terms || !terms.length) return esc(text);
    var folded = fold(text), ranges = [];
    terms.forEach(function (t) {
      if (!t) return;
      var isNum = /[0-9]/.test(t);
      var re = new RegExp('(^|[^a-z0-9])(' + rxesc(t) + ')' + (isNum ? '(?=[^a-z0-9]|$)' : ''), 'g');
      var m;
      while ((m = re.exec(folded))) {
        var start = m.index + m[1].length;
        ranges.push([start, start + m[2].length]);
        re.lastIndex = start + m[2].length;
      }
    });
    if (!ranges.length) return esc(text);
    ranges.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    var merged = [ranges[0].slice()];
    for (var i = 1; i < ranges.length; i++) {
      var last = merged[merged.length - 1];
      if (ranges[i][0] <= last[1]) last[1] = Math.max(last[1], ranges[i][1]);
      else merged.push(ranges[i].slice());
    }
    var out = '', pos = 0;
    merged.forEach(function (r) {
      out += esc(text.slice(pos, r[0])) + '<mark class="cbhl">' + esc(text.slice(r[0], r[1])) + '</mark>';
      pos = r[1];
    });
    return out + esc(text.slice(pos));
  }
  // poids de correspondance d'un mot dans un texte normalisé.
  // nombre → mot ENTIER obligatoire (« 6 » ne matche pas « 60 ») ; mot → entier=3, sous-chaîne=1.
  function wmatch(w, hay) {
    if (hay.indexOf(w) < 0) return 0;
    if (/[0-9]/.test(w)) return new RegExp('(^|[^a-z0-9])' + rxesc(w) + '([^a-z0-9]|$)').test(hay) ? 4 : 0;
    return new RegExp('(^|[^a-z0-9])' + rxesc(w)).test(hay) ? 3 : 1;
  }

  // ----- "Plus malin" : lemmatisation légère (FR) + correction de fautes -----
  // Radicalisation approximative : forer/forage/foreuse/foré → « for ».
  function lightStem(w) {
    if (/[0-9]/.test(w) || w.length < 4) return w;
    var sufs = ['issements', 'issement', 'ations', 'ation', 'ements', 'ement', 'ables', 'able',
      'ances', 'ance', 'ites', 'euses', 'euse', 'trices', 'trice', 'eurs', 'eur', 'ages', 'age',
      'ions', 'ion', 'ees', 'ers', 'er', 'irs', 'ir'];
    for (var i = 0; i < sufs.length; i++) {
      var s = sufs[i];
      if (w.length - s.length >= 3 && w.slice(-s.length) === s) return w.slice(0, -s.length);
    }
    w = w.replace(/aux$/, 'al');
    if (w.length >= 5) w = w.replace(/(s|x|e)$/, '');
    return w;
  }
  // Distance d'édition ≤ 1 (tolère une faute de frappe).
  function edit1(a, b) {
    if (a === b) return true;
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 1) return false;
    if (la === lb) { var d = 0; for (var i = 0; i < la; i++) if (a[i] !== b[i] && ++d > 1) return false; return d === 1; }
    var s = la < lb ? a : b, l = la < lb ? b : a, j = 0, k = 0, diff = 0;
    while (j < s.length && k < l.length) { if (s[j] === l[k]) { j++; k++; } else { if (++diff > 1) return false; k++; } }
    return true;
  }
  // Vocabulaire réel des procédures (rempli au build de l'index).
  var VOCAB = [], VOCABSET = {}, EXP_CACHE = {};
  function addVocab(txt) {
    txt.split(/[^a-z0-9]+/).forEach(function (w) {
      if (w && (w.length >= 3 || /[0-9]/.test(w)) && !VOCABSET[w]) { VOCABSET[w] = 1; VOCAB.push(w); }
    });
  }
  // Étend un mot tapé vers les vrais mots du corpus : exact, même radical,
  // préfixe, ou faute de frappe (≤ 1). Les nombres restent exacts.
  function expandToVocab(w) {
    if (EXP_CACHE[w]) return EXP_CACHE[w];
    var res = {};
    if (VOCABSET[w]) res[w] = 1;
    if (/[0-9]/.test(w)) { var rn = Object.keys(res); if (!rn.length) rn = [w]; return (EXP_CACHE[w] = rn); }
    var sw = lightStem(w);
    var fuzzy = !VOCABSET[w] && w.length >= 4;   // correction de faute : seulement si le mot n'existe pas tel quel
    for (var i = 0; i < VOCAB.length; i++) {
      var v = VOCAB[i];
      if (res[v] || /[0-9]/.test(v)) continue;
      if (v === w) { res[v] = 1; continue; }
      if (sw.length >= 3 && lightStem(v) === sw) { res[v] = 1; continue; }
      if (w.length >= 4 && (v.indexOf(w) === 0 || w.indexOf(v) === 0) && Math.abs(v.length - w.length) <= 3) { res[v] = 1; continue; }
      if (fuzzy && v.length >= 5 && Math.abs(v.length - w.length) <= 1 && edit1(w, v)) { res[v] = 1; }
    }
    var keys = Object.keys(res);
    if (!keys.length) keys = [w];
    return (EXP_CACHE[w] = keys);
  }
  // Prépare une requête : termes étendus (pour matcher + surligner) + couverture des mots « cœur ».
  function expandQuery(query) {
    var core = uniq(tokens(query, false));
    var exp = uniq(tokens(query, true));
    var set = {};
    exp.forEach(function (w) { expandToVocab(w).forEach(function (v) { set[v] = 1; }); });
    return { terms: Object.keys(set), core: core, coreSets: core.map(expandToVocab) };
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
        var tnorm = norm(pas.t);
        addVocab(tnorm);
        INDEX.push({ text: pas.t, kind: 'PDF', source: 'PDF · p.' + pas.p,
          pid: (key === 'centralisateur-dessin' ? 'centralisateur' : key), ptitre: titre,
          txt: tnorm, meta: meta });
      });
      addVocab(meta);
    });
  }

  function search(query, eq) {
    eq = eq || expandQuery(query);
    var qt = eq.terms, core = eq.core, coreSets = eq.coreSets;
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
      // bonus : tous les mots-clés « cœur » couverts (via leurs variantes) dans la réponse
      var coreInTxt = coreSets.filter(function (set) {
        return set.some(function (w) { return wmatch(w, item.txt) > 0; });
      }).length;
      if (core.length >= 2 && coreInTxt === core.length) score += 7;
      else if (core.length >= 2) score += coreInTxt / core.length * 3;
      // bonus de phrase : deux termes voisins proches dans la réponse
      var pos = qt.map(function (w) { return item.txt.indexOf(w); }).filter(function (p) { return p >= 0; }).sort(function (a, b) { return a - b; });
      for (var j = 0; j + 1 < pos.length; j++) { if (pos[j + 1] - pos[j] <= 28) { score += 2; break; } }
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
    var eq = expandQuery(query);
    var res = search(query, eq);
    if (!res.length) {
      return '<p>Je n\'ai pas trouvé de réponse précise dans les procédures. ' +
        'Reformule ta question (ex. « distance foreuse surcompresseur », « bris de tige », ' +
        '« cadenassage »), ou consulte <a href="#/procedures">toutes les procédures</a>.</p>';
    }
    var terms = eq.terms;   // mots recherchés (étendus : variantes, fautes…) à surligner
    var html = '<p>Voici ce que disent les procédures&nbsp;:</p>';
    res.forEach(function (r) {
      var it = r.item;
      html += '<div class="cbans">' +
        '<span class="cbk">' + esc(it.kind) + '</span>' +
        '<div class="cbtxt">« ' + highlight(it.text, terms) + ' »' +
          '<a class="cbsrc" href="#/p/' + esc(it.pid) + '">' + esc(it.ptitre) +
          (it.source ? ' · ' + esc(it.source) : '') + ' →</a>' +
        '</div></div>';
    });
    html += '<p class="cbnote">Réponses citées des procédures officielles. Toujours valider sur la fiche complète.</p>';
    return html;
  }

  var panel, body, opened = false, aiOn = false;
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
    // Mode IA (bêta) actif + prêt → réponse en langage naturel, ancrée (RAG) ;
    // sinon, recherche lexicale classique (toujours dispo, hors-ligne).
    if (aiOn && window.MRI_LLM && window.MRI_LLM.isReady()) { askAI(text); return; }
    pushMsg('bot', answerHTML(text));
  }

  // ---- Assistant IA (bêta) : WebLLM + RAG sur les procédures ----
  function setAiBadge() {
    var b = panel && panel.querySelector('#cbAi'); if (!b) return;
    b.classList.toggle('on', aiOn);
    b.title = aiOn ? 'Assistant IA actif — cliquer pour revenir à la recherche'
                   : 'Activer l\'assistant IA (bêta)';
  }
  function enableAI() {
    if (!window.MRI_LLM) return;
    var msg = pushMsg('bot', '<p>⏳ Téléchargement du modèle d\'IA (≈ 1 Go, <b>une seule fois</b>, ' +
      'Wi-Fi conseillé). Ensuite il fonctionne hors-ligne.</p><div class="cbprog"><i></i></div>' +
      '<div class="cbprogt">Initialisation…</div>');
    var bar = msg.querySelector('.cbprog i'), txt = msg.querySelector('.cbprogt');
    window.MRI_LLM.init(function (r) {
      var pct = (r && typeof r.progress === 'number') ? Math.round(r.progress * 100) : null;
      if (bar && pct != null) bar.style.width = pct + '%';
      if (txt) txt.textContent = (r && r.text) ? r.text : (pct != null ? pct + ' %' : '…');
    }).then(function (id) {
      aiOn = true; setAiBadge();
      msg.innerHTML = '<p>✅ Assistant IA prêt (<span class="cbmono">' + esc(id || 'modèle local') + '</span>). ' +
        'Je réponds en langage naturel, <b>en citant</b> les procédures. Pose ta question.</p>';
    }).catch(function (e) {
      aiOn = false; setAiBadge();
      msg.innerHTML = '<p>⚠️ Impossible d\'activer l\'IA (' + esc((e && e.message) || 'erreur') +
        '). Je continue en recherche classique.</p>';
    });
  }
  function askAI(text) {
    var eq = expandQuery(text);
    var res = search(text, eq);
    if (!res.length) { pushMsg('bot', answerHTML(text)); return; }   // rien à citer → repli
    var passages = res.slice(0, 5).map(function (r) {
      return { text: r.item.text, ptitre: r.item.ptitre, source: r.item.source, pid: r.item.pid };
    });
    var msg = pushMsg('bot', '<p class="cbtyping">…</p>');
    var p = msg.querySelector('p');
    window.MRI_LLM.answer(text, passages, function (partial) {
      p.innerHTML = highlight(partial, eq.terms); body.scrollTop = body.scrollHeight;
    }).then(function (full) {
      p.classList.remove('cbtyping');
      p.innerHTML = highlight(full || 'Ce n\'est pas précisé dans les procédures consultées.', eq.terms);
      var src = '<div class="cbsources"><span>Sources citées&nbsp;:</span>' + passages.map(function (pp, i) {
        return '<a href="#/p/' + esc(pp.pid) + '">[' + (i + 1) + '] ' + esc(pp.ptitre) +
          (pp.source ? ' · ' + esc(pp.source) : '') + ' →</a>';
      }).join('') + '</div>' +
      '<p class="cbnote">Réponse générée localement à partir des procédures citées. Toujours valider sur la fiche.</p>';
      msg.insertAdjacentHTML('beforeend', src);
      body.scrollTop = body.scrollHeight;
    }).catch(function (e) {
      p.classList.remove('cbtyping');
      p.innerHTML = '⚠️ Erreur de génération. Voici les passages trouvés&nbsp;:';
      msg.insertAdjacentHTML('beforeend', answerHTML(text));
    });
  }
  function aiBtnClick() {
    if (!window.MRI_LLM || !window.MRI_LLM.available()) return;
    if (window.MRI_LLM.isReady()) { aiOn = !aiOn; setAiBadge();
      pushMsg('bot', aiOn ? '<p>Mode IA activé.</p>' : '<p>Retour à la recherche classique.</p>'); return; }
    var opts = window.MRI_LLM.options ? window.MRI_LLM.options() : [];
    if (!opts.length) { enableAI(); return; }
    pushMsg('bot', '<p>Choisis un modèle d\'IA local — téléchargé <b>une seule fois</b> ' +
      '(Wi-Fi conseillé), puis hors-ligne. L\'assistant <b>ne cite que les procédures</b>.</p>' +
      '<div class="cbopts">' + opts.map(function (o) {
        return '<button class="cbopt" type="button" data-prov="' + esc(o.provider) + '" data-tier="' + esc(o.tier || '') + '">' +
          '<b>' + esc(o.label) + '</b><span>' + esc(o.note) + '</span></button>';
      }).join('') + '</div>');
  }

  function buildUI() {
    var btn = el('<button class="cbbtn" id="cbBtn" aria-label="Assistant procédures" title="Assistant procédures">' + ICON_CHAT + '</button>');
    var aiCanRun = !!(window.MRI_LLM && window.MRI_LLM.available());
    panel = el('<div class="cbpanel" role="dialog" aria-label="Assistant procédures">' +
      '<div class="cbhead"><b>Assistant procédures</b><span class="cboff">hors-ligne</span>' +
        (aiCanRun ? '<button class="cbai" id="cbAi" type="button" aria-label="Assistant IA (bêta)" title="Activer l\'assistant IA (bêta)">IA</button>' : '') +
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
    var aiBtn = panel.querySelector('#cbAi'); if (aiBtn) aiBtn.onclick = aiBtnClick;
    panel.querySelector('#cbForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var inp = panel.querySelector('#cbInput');
      handleSend(inp.value); inp.value = '';
    });
    // clic sur une suggestion / le bouton « activer IA » / un lien de fiche
    body.addEventListener('click', function (e) {
      var opt = e.target.closest && e.target.closest('.cbopt');
      if (opt) { window.MRI_LLM.choose(opt.getAttribute('data-prov'), opt.getAttribute('data-tier') || null); enableAI(); return; }
      if (e.target && e.target.id === 'cbAiGo') { enableAI(); return; }
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
