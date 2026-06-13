/* ===========================================================================
   Éditeur de procédures — génère un data.js prêt à committer (aucun serveur).
   =========================================================================== */
(function () {
  'use strict';
  var CFG = window.SITE_CONFIG || {};
  var PROCS = JSON.parse(JSON.stringify(window.PROCEDURES || []));
  var CODE = JSON.parse(JSON.stringify(window.CODE_SECURITE || { preambule: '', chapitres: [] }));
  var editing = null; // référence vers l'objet en cours d'édition

  var CATS = ['Forage', 'Alésage', 'Installation', 'Maintenance', 'Manutention', 'Démobilisation', 'Intervention'];
  var THEMES = ['EPI', 'Énergie & cadenassage', 'Air comprimé & boyaux', 'Zones d\'exclusion & positionnement',
    'Manutention & levage', 'Inspection & vérification', 'Communication & signalisation',
    'Pièces en mouvement & mât', 'Explosifs & terrain', 'Outils & clés', 'Eau & ventilation'];

  function $(s, r) { return (r || document).querySelector(s); }
  function h(tag, attrs, kids) {
    var e = document.createElement(tag); attrs = attrs || {};
    for (var k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  function toast(m) { var t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 3500); }

  /* ---- gate ---- */
  function unlocked() { try { return localStorage.getItem('mri_ok') === '1'; } catch (e) { return false; } }
  function reveal() { $('#gate').classList.add('hide'); $('#bar').hidden = false; $('#wrap').hidden = false; renderList(); }
  function initGate() {
    if (unlocked()) { reveal(); return; }
    $('#gateForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var v = $('#gateInput').value.trim();
      if (v && v.toLowerCase() === String(CFG.accessCode || '').toLowerCase()) {
        try { localStorage.setItem('mri_ok', '1'); } catch (e2) {}
        reveal();
      } else { $('#gateErr').textContent = 'Mot de passe incorrect.'; }
    });
  }

  /* ---- liste ---- */
  function renderList() {
    var q = ($('#filter').value || '').toLowerCase();
    var box = $('#plist'); box.innerHTML = '';
    PROCS.forEach(function (p, i) {
      var hay = ((p.titre || '') + ' ' + (p.code || '') + ' ' + (p.categorie || '')).toLowerCase();
      if (q && hay.indexOf(q) < 0) return;
      var b = h('button', { class: editing === p ? 'on' : '' }, [
        h('span', { class: 'pc', text: p.code || '—' }),
        h('span', { text: p.titre || '(sans titre)' })
      ]);
      b.onclick = function () { editing = p; renderList(); buildForm(p); };
      box.appendChild(b);
    });
  }

  /* ---- champs ---- */
  function input(val, ph, cls) { var e = h('input', { class: 'f ' + (cls || ''), placeholder: ph || '' }); e.value = val == null ? '' : val; return e; }
  function area(val, ph) { var e = h('textarea', { class: 'f', placeholder: ph || '' }); e.value = val == null ? '' : val; return e; }
  function select(val, opts) { var e = h('select', { class: 'f' }); opts.forEach(function (o) { e.appendChild(h('option', { value: o, text: o })); }); e.value = val || opts[0]; return e; }
  function field(lbl, el, hint) { var w = h('div'); w.appendChild(h('label', { class: 'fl', text: lbl })); w.appendChild(el); if (hint) w.appendChild(h('div', { class: 'hint', text: hint })); return w; }
  function linesArea(arr, ph) { var e = area((arr || []).join('\n'), ph); e._lines = true; return e; }
  function readLines(el) { return el.value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean); }

  function repeater(items, fields, addLabel) {
    var wrap = h('div'); var list = h('div', { class: 'rep' });
    function addRow(item) { list.appendChild(row(fields, item || {})); }
    (items || []).forEach(addRow);
    var add = h('button', { class: 'addbtn', type: 'button', text: addLabel || '＋ Ajouter' });
    add.onclick = function () { addRow({}); };
    wrap.appendChild(list); wrap.appendChild(add);
    wrap._read = function () {
      return [].map.call(list.children, function (r) { return r._read(); })
        .filter(function (o) { return Object.keys(o).some(function (k) { return o[k]; }); });
    };
    return wrap;
  }
  function row(fields, item) {
    var r = h('div', { class: 'reprow' }); var gr = h('div', { class: 'gr' }); var inputs = {};
    fields.forEach(function (fd) {
      var inp;
      if (fd.select) inp = select(item[fd.key], fd.select);
      else if (fd.ta) { inp = area(item[fd.key], fd.ph || fd.key); }
      else inp = input(item[fd.key], fd.ph || fd.key, fd.cls);
      inputs[fd.key] = inp;
      if (fd.cls === 'num') r.appendChild(inp); else gr.appendChild(inp);
    });
    r.appendChild(gr);
    var del = h('button', { class: 'del', type: 'button', text: '×' }); del.onclick = function () { r.remove(); };
    r.appendChild(del);
    r._read = function () { var o = {}; fields.forEach(function (fd) { o[fd.key] = inputs[fd.key].value.trim(); }); return o; };
    return r;
  }

  /* ---- formulaire procédure ---- */
  function buildForm(p) {
    var area_ = $('#formArea'); area_.innerHTML = '';
    var F = {};
    function add(node) { area_.appendChild(node); }

    add(h('div', { class: 'formhead' }, [h('h2', { text: p.titre || 'Nouvelle procédure' })]));

    F.id = input(p.id, 'ex. pro-op-ith-020');
    F.code = input(p.code, 'ex. PRO-OP-ITH-020');
    var g1 = h('div', { class: 'grid2' }); g1.appendChild(field('Identifiant (id)', F.id, 'sert d\'URL et de nom du PDF : pdf/<id>.pdf')); g1.appendChild(field('Code', F.code)); add(g1);

    F.titre = input(p.titre, 'Titre lisible'); add(field('Titre', F.titre));

    F.categorie = select(p.categorie, CATS); F.langue_source = select(p.langue_source, ['fr', 'en']);
    var g2 = h('div', { class: 'grid2' }); g2.appendChild(field('Catégorie', F.categorie)); g2.appendChild(field('Langue source', F.langue_source)); add(g2);

    F.machines = linesArea(p.machines, 'Une machine par ligne (ITH, V-30…)'); add(field('Machines (une par ligne)', F.machines));
    F.resume = area(p.resume, 'Phrase de présentation (carte d\'accueil)'); add(field('Résumé', F.resume));
    F.objectif = area(p.objectif); add(field('Objectif', F.objectif));
    F.application = area(p.application); add(field('Application', F.application));
    F.responsabilites = area(p.responsabilites); add(field('Responsabilités', F.responsabilites));
    F.epi = linesArea(p.epi, 'Un EPI par ligne'); add(field('EPI (une par ligne)', F.epi));
    F.equipements = linesArea(p.equipements, 'Un équipement par ligne'); add(field('Équipements & outils (une par ligne)', F.equipements));
    F.prerequis = linesArea(p.prerequis, 'Un prérequis par ligne'); add(field('Avant de commencer (une par ligne)', F.prerequis));
    F.avertissements = linesArea(p.avertissements, 'Un avertissement par ligne'); add(field('Avertissements (une par ligne)', F.avertissements));

    add(h('label', { class: 'fl', text: 'Étapes' }));
    F.etapes = repeater(p.etapes, [
      { key: 'num', ph: '#', cls: 'num' },
      { key: 'texte', ph: 'Texte de l\'étape', ta: true },
      { key: 'danger', ph: 'Avertissement intégré (optionnel)', ta: true }
    ], '＋ Ajouter une étape'); add(F.etapes);

    add(h('label', { class: 'fl', text: 'Consignes de sécurité' }));
    F.consignes_securite = repeater(p.consignes_securite, [
      { key: 'regle', ph: 'Règle', ta: true },
      { key: 'theme', select: THEMES },
      { key: 'source', ph: 'Source (ex. Étape 8)' }
    ], '＋ Ajouter une consigne'); add(F.consignes_securite);

    add(h('label', { class: 'fl', text: 'Valeurs clés' }));
    F.valeurs_cles = repeater(p.valeurs_cles, [
      { key: 'libelle', ph: 'Libellé' }, { key: 'valeur', ph: 'Valeur' }
    ], '＋ Ajouter une valeur'); add(F.valeurs_cles);

    add(h('label', { class: 'fl', text: 'Historique des révisions' }));
    F.historique = repeater(p.historique, [
      { key: 'date', ph: 'Date' }, { key: 'description', ph: 'Modification', ta: true }, { key: 'par', ph: 'Par' }
    ], '＋ Ajouter une ligne'); add(F.historique);

    F.date_creation = input(p.date_creation, 'ex. Mars 2002'); F.date_revision = input(p.date_revision, 'ex. Juin 2024');
    var g3 = h('div', { class: 'grid2' }); g3.appendChild(field('Date de création', F.date_creation)); g3.appendChild(field('Dernière révision', F.date_revision)); add(g3);

    F.source_pdf = input(p.source_pdf, 'nom du PDF d\'origine'); add(field('Nom du PDF source', F.source_pdf, 'Le fichier affiché reste pdf/<id>.pdf — déposez-le manuellement dans le dossier pdf/.'));
    F.notes = area(p.notes); add(field('Notes internes', F.notes));

    var acts = h('div', { class: 'actions' });
    var saveBtn = h('button', { class: 'btn' }, ['✓ Enregistrer']);
    var delBtn = h('button', { class: 'btn ghost' }, ['Supprimer']);
    acts.appendChild(saveBtn); acts.appendChild(delBtn); add(acts);

    saveBtn.onclick = function () {
      var id = F.id.value.trim();
      if (!id) { toast('L\'identifiant (id) est obligatoire.'); F.id.focus(); return; }
      if (PROCS.some(function (x) { return x !== p && x.id === id; })) { toast('Cet identifiant existe déjà.'); return; }
      p.id = id; p.code = F.code.value.trim(); p.titre = F.titre.value.trim();
      p.categorie = F.categorie.value; p.langue_source = F.langue_source.value;
      p.machines = readLines(F.machines); p.resume = F.resume.value.trim();
      p.objectif = F.objectif.value.trim(); p.application = F.application.value.trim();
      p.responsabilites = F.responsabilites.value.trim();
      p.epi = readLines(F.epi); p.equipements = readLines(F.equipements); p.prerequis = readLines(F.prerequis);
      p.avertissements = readLines(F.avertissements);
      p.etapes = F.etapes._read(); p.consignes_securite = F.consignes_securite._read();
      p.valeurs_cles = F.valeurs_cles._read(); p.historique = F.historique._read();
      p.date_creation = F.date_creation.value.trim(); p.date_revision = F.date_revision.value.trim();
      p.source_pdf = F.source_pdf.value.trim(); p.notes = F.notes.value.trim();
      if (!p.figures) p.figures = [];
      renderList(); buildForm(p); toast('Enregistré (n\'oubliez pas d\'exporter data.js).');
    };
    delBtn.onclick = function () {
      if (!confirm('Supprimer cette procédure de la liste ?')) return;
      var i = PROCS.indexOf(p); if (i >= 0) PROCS.splice(i, 1);
      editing = null; renderList();
      $('#formArea').innerHTML = '<div class="empty2">Procédure supprimée. Pensez à exporter data.js et à retirer le PDF correspondant.</div>';
    };
  }

  function blank() {
    return { id: '', code: '', titre: '', categorie: 'Forage', machines: [], resume: '', objectif: '',
      application: '', responsabilites: '', epi: [], equipements: [], prerequis: [], etapes: [],
      avertissements: [], consignes_securite: [], valeurs_cles: [], figures: [], historique: [],
      date_creation: '', date_revision: '', source_pdf: '', langue_source: 'fr', notes: '' };
  }

  /* ---- éditeur Code de sécurité (JSON) ---- */
  function editCode() {
    editing = null; renderList();
    var area_ = $('#formArea'); area_.innerHTML = '';
    area_.appendChild(h('div', { class: 'formhead' }, [h('h2', { text: 'Code de sécurité' })]));
    var ta = h('textarea', { class: 'f', style: 'min-height:60vh;font-family:monospace;font-size:.82rem' });
    ta.value = JSON.stringify(CODE, null, 2);
    area_.appendChild(field('Structure JSON (préambule + chapitres + articles)', ta,
      'Format : { "preambule": "...", "chapitres": [ { "id","titre","intro","articles":[ {"num","titre","texte","sources":[]} ] } ] }'));
    var acts = h('div', { class: 'actions' });
    var save = h('button', { class: 'btn' }, ['✓ Enregistrer le Code']);
    acts.appendChild(save); area_.appendChild(acts);
    save.onclick = function () {
      try { var obj = JSON.parse(ta.value); CODE = obj; toast('Code de sécurité enregistré (exportez data.js).'); }
      catch (e) { toast('JSON invalide : ' + e.message); }
    };
  }

  /* ---- export ---- */
  function buildDataJS() {
    var head = '/* ===========================================================================\n' +
      '   DONNÉES DES PROCÉDURES — édité via admin.html.\n' +
      '   =========================================================================== */\n';
    return head + 'window.PROCEDURES = ' + JSON.stringify(PROCS, null, 2) + ';\n\n' +
      'window.CODE_SECURITE = ' + JSON.stringify(CODE, null, 2) + ';\n';
  }
  function exportFile() {
    var blob = new Blob([buildDataJS()], { type: 'text/javascript;charset=utf-8' });
    var a = h('a', { href: URL.createObjectURL(blob), download: 'data.js' });
    document.body.appendChild(a); a.click(); a.remove();
    toast('data.js téléchargé — remplacez le fichier dans le dossier du site.');
  }
  function copyJSON() {
    var txt = buildDataJS();
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(function () { toast('Copié dans le presse-papiers.'); }, function () { toast('Copie impossible.'); });
    else toast('Copie non supportée par ce navigateur.');
  }

  document.addEventListener('DOMContentLoaded', function () {
    initGate();
    $('#newProc').addEventListener('click', function () { var o = blank(); PROCS.push(o); editing = o; renderList(); buildForm(o); });
    $('#filter').addEventListener('input', renderList);
    $('#editCode').addEventListener('click', editCode);
    $('#exportBtn').addEventListener('click', exportFile);
    $('#copyBtn').addEventListener('click', copyJSON);
  });
})();
