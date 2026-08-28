#!/usr/bin/env node
/* ===========================================================================
   SYNCHRONISATION AIRTABLE → SITE  (node sync-airtable.js)

   Airtable est la source de vérité des PDF officiels : base « Documents »,
   table « Procédures » (un enregistrement par code de procédure, le PDF en
   pièce jointe). Quand un PDF y est remplacé (procédure révisée), ce script
   rapatrie la mise à jour dans le site :

     1. télécharge le nouveau PDF → pdf/<id>.pdf ;
     2. régénère les images des pages (images/pages/<id>-N.jpg + pages.js)
        avec pdftoppm — si l'outil est disponible (poppler-utils) ;
     3. régénère le texte de recherche du PDF (pdftext.js) avec pdftotext ;
     4. met à jour "date_revision" de la fiche (data*.js) — c'est elle qui
        alimente le cache-busting ?r= du service worker ET le badge
        « Mis à jour » affiché aux travailleurs dans l'app ;
     5. mémorise l'empreinte de la pièce jointe dans .github/airtable/state.json
        (committé) pour ne détecter que les VRAIS changements.

   Le premier passage (state.json absent) est une PRISE DE RÉFÉRENCE : rien
   n'est téléchargé, les empreintes actuelles sont simplement enregistrées.
   Idem pour tout nouvel appariement fiche ↔ enregistrement : on considère le
   site à jour, et seuls les remplacements de PDF OBSERVÉS ensuite se
   synchronisent. (Pour forcer une fiche : FORCE_IDS="pro-mec-011" ou "all".)

   APPARIEMENT fiche ↔ enregistrement Airtable :
     • par CODE normalisé (majuscules, alphanumérique seulement) quand la
       LANGUE concorde (famille 'english' ↔ « Anglais », sinon « Français ») ;
     • sinon via la table ALIASES ci-dessous (record id, stable à vie) pour
       les fiches sans code (cadenassages…).
   Les enregistrements à PLUSIEURS pièces jointes ne sont jamais synchronisés
   automatiquement (ex. serrage de marteau = 4 planches fusionnées à la main) :
   ils sont seulement signalés dans le rapport.

   Ce script ne touche NI aux textes des fiches (étapes, avertissements…),
   NI aux quiz : l'adaptation d'un PDF révisé en fiche web reste une décision
   humaine (voir AIRTABLE-SYNC.md). Il rend la révision visible et disponible
   immédiatement (PDF + pages + recherche + badge).

   Requis : AIRTABLE_TOKEN (jeton avec data.records:read sur la base
   « Documents »). Exécuté par .github/workflows/airtable-sync.yml, qui
   enchaîne ensuite gen-sizes.js, bump-version.js, commit et déploiement.
   =========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync, spawnSync } = require('child_process');

const ROOT = __dirname;
const BASE_ID = 'app6CktyL081e7pZG';            // base « Documents »
const TABLE_ID = 'tblrG1iZLixfmvd17';           // table « Procédures »
const F = {                                     // champs (par id — stables)
  code: 'fldIyPbWDMwDLJffT',                    // champ principal = code
  nom: 'fldOJk9PtfxiR5eno',                     // titre lisible
  doc: 'fldDr3ZjHFir2Kvqu',                     // pièce(s) jointe(s) PDF
  langue: 'fldgaDSUV1C7mlk9z',                  // « Français » / « Anglais »
  modif: 'fldYYDjegof5WGEgs'                    // dernière modification
};
const STATE_FILE = path.join(ROOT, '.github', 'airtable', 'state.json');
const DATA_FILES = ['data.js', 'data-diamant.js', 'data-securite.js', 'data-ith-new.js', 'data-english.js'];

/* Fiches SANS code (ou dont le code ne correspond pas au champ principal
   Airtable) : appariement explicite par record id — imperturbable aux
   renommages. Le nom en commentaire n'est qu'un repère humain. */
const ALIASES = {
  'cadenassage-cat-416': 'recHXVwbevHU1MSe3',        // Fiche de cadenassage CAT 416
  'cadenassage-cubex': 'recJaGd6NnNUlcsV1',          // Fiche de cadenassage CUBEX
  'cadenassage-toyota-landcruiser': 'recPLeAwU0XaR725o', // TOYOTA-LANDCRUISER
  'cadenassage-kovatera-kt200': 'recpBVt6Fn61bg2Xs', // Fiche cadenassage Kovatera KT-200
  'cadenassage-manitou': 'recNlu1BGeeZ4ATsd',        // Fiche cadenassage MANITOU
  'cadenassage-pegasus-du311': 'recfsGkHfGnmXp9fj',  // Cadenassage PEGASUS/DU-311
  'cadenassage-stopemaster': 'rec6DBSyG3b335GGF',    // Cadenassage-STOPEMASTER
  'cadenassage-u6-epiroc': 'rec5WOgAiyNbm0Kht',      // Cadenassage U-6 EPIROC
  'cadenassage-dr600mu-btidr': 'recJ9ISCTLDe4vIAD',  // Cadenassage DD MOBILES DR-600 MU et BTI-DR
  'cadenassage-dd-stm1500': 'recfECNCJhqJifcWH',     // Cadenassage DD STM-1500
  'procedure-serrage-marteau': 'recFVQsg9Zb2Nwydn',  // Procédure serrage de marteau (4 planches)
  'std-dd-installation': 'recYy8GPM27fEiSDM',        // STANDARD D'INSTALLATION SITES DE FORAGE
  'pro-op-cat-416-001': 'rec1dgSNCFJogm9gZ',         // PRO-OP-CAT416-001A (fiche FR basée sur le PDF anglais)
  'en-lockout-stopemaster': 'recjv9UUgbC6trIiy',     // Lock-out -STOPEMASTER
  'en-installation-rod-centralizer': 'recYDEqsTxqQhc5ZH', // Operating Procedure Installation of rod centralizer
  'en-ges-san-sec-001a': 'recVgs1mpm9mxaWUt'         // GES-SAN-SEC-001 (le PDF joint est la version anglaise)
};

/* trim() : un jeton collé avec une espace ou un retour de ligne casserait
   l'en-tête Authorization — erreur 401 incompréhensible pour rien. */
const TOKEN = String(process.env.AIRTABLE_TOKEN || '').trim();
const DRY = process.env.AIRTABLE_SYNC_DRY === '1';
const FORCE = String(process.env.FORCE_IDS || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);

function normCode(s) { return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }
function hasTool(bin) {
  try { return spawnSync(bin, ['-v'], { stdio: 'ignore' }).error == null; } catch (e) { return false; }
}
function frDate(d) {
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

/* ── 1. Fiches du site : id, code, famille + fichier d'origine ───────────── */
function loadSiteProcedures() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  const owner = {};                     // id → fichier data*.js qui le définit
  let seen = 0;
  DATA_FILES.forEach(function (f) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
    const list = ctx.window.PROCEDURES || [];
    for (; seen < list.length; seen++) owner[list[seen].id] = f;
  });
  return { list: ctx.window.PROCEDURES || [], owner: owner, ctx: ctx };
}

function loadWindowVar(file, name) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  return vm.runInNewContext(src + '\n;window.' + name, { window: {} });
}

/* ── 2. Enregistrements Airtable (REST, paginé) ─────────────────────────── */
async function fetchRecords() {
  const fields = Object.values(F).map(function (id) { return 'fields%5B%5D=' + id; }).join('&');
  let url = 'https://api.airtable.com/v0/' + BASE_ID + '/' + TABLE_ID +
    '?returnFieldsByFieldId=true&pageSize=100&' + fields;
  const records = [];
  let offset = '';
  do {
    const r = await fetch(url + (offset ? '&offset=' + encodeURIComponent(offset) : ''), {
      headers: { Authorization: 'Bearer ' + TOKEN }
    });
    if (r.status === 401) {
      throw new Error('Airtable a répondu 401 (jeton refusé). Le secret AIRTABLE_TOKEN ne contient pas ' +
        'un jeton valide : recopier la VALEUR COMPLÈTE du jeton (commence par « pat », montré une seule ' +
        'fois à la création sur https://airtable.com/create/tokens) et recréer le secret.');
    }
    if (r.status === 403 || r.status === 404) {
      throw new Error('Airtable a répondu ' + r.status + ' : le jeton est valide mais n\'a pas accès à la ' +
        'base « Documents » (ou il lui manque la portée data.records:read). Modifier le jeton sur ' +
        'https://airtable.com/create/tokens : Scopes → data.records:read, Access → base « Documents ».');
    }
    if (!r.ok) throw new Error('Airtable a répondu ' + r.status + ' : ' + (await r.text()).slice(0, 300));
    const data = await r.json();
    (data.records || []).forEach(function (rec) { records.push(rec); });
    offset = data.offset || '';
  } while (offset);
  return records.map(function (rec) {
    const f = rec.fields || {};
    const atts = (f[F.doc] || []).map(function (a) {
      return { id: a.id, url: a.url, filename: a.filename || '', size: a.size || 0 };
    });
    return {
      id: rec.id,
      code: String(f[F.code] || '').trim(),
      nom: String(f[F.nom] || '').trim(),
      langue: (f[F.langue] && f[F.langue].name) || '',
      modif: f[F.modif] || '',
      atts: atts,
      fp: atts.map(function (a) { return a.id + ':' + a.size; }).join('|')
    };
  });
}

/* ── 3. Édition ciblée de "date_revision" dans le bon data*.js ──────────── */
function setDateRevision(file, id, newRev) {
  const p = path.join(ROOT, file);
  let src = fs.readFileSync(p, 'utf8');
  const idRe = new RegExp('"id"\\s*:\\s*' + JSON.stringify(id).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const m = idRe.exec(src);
  if (!m) throw new Error(id + ' introuvable dans ' + file);
  const start = m.index;
  const next = src.slice(start + m[0].length).search(/"id"\s*:/);
  const end = next < 0 ? src.length : start + m[0].length + next;
  const win = src.slice(start, end);
  const revRe = /("date_revision"\s*:\s*)"[^"]*"/;
  let out;
  if (revRe.test(win)) {
    out = src.slice(0, start) + win.replace(revRe, '$1' + JSON.stringify(newRev)) + src.slice(end);
  } else {
    // Champ absent : on l'insère juste après la ligne "id", même indentation.
    const lineStart = src.lastIndexOf('\n', start) + 1;
    const indent = src.slice(lineStart, start);
    const insertAt = start + m[0].length + (src[start + m[0].length] === ',' ? 1 : 0);
    out = src.slice(0, insertAt) + '\n' + indent + '"date_revision": ' + JSON.stringify(newRev) + ',' + src.slice(insertAt);
  }
  fs.writeFileSync(p, out);
  const chk = spawnSync(process.execPath, ['--check', p], { encoding: 'utf8' });
  if (chk.status !== 0) throw new Error(file + ' invalide après édition : ' + chk.stderr);
}

/* ── 4. Téléchargement d'un PDF ─────────────────────────────────────────── */
async function downloadPdf(att, dest) {
  const r = await fetch(att.url);
  if (!r.ok) throw new Error('téléchargement ' + att.filename + ' : HTTP ' + r.status);
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1024 || buf.slice(0, 5).toString('latin1') !== '%PDF-') {
    throw new Error(att.filename + ' ne ressemble pas à un PDF (' + buf.length + ' octets)');
  }
  if (buf.length > 60 * 1024 * 1024) throw new Error(att.filename + ' trop volumineux (' + buf.length + ' octets)');
  fs.writeFileSync(dest, buf);
}

/* ── 5. Images des pages (pdftoppm) + pages.js ──────────────────────────── */
function serializePages(pages) {
  const keys = Object.keys(pages);
  return '/* Pages des PDF rendues en images — affichage in-page (mobile, hors-ligne). ~125 DPI.\n' +
    '   Entrées régénérées par sync-airtable.js quand un PDF officiel change. */\n' +
    'window.PAGES = {\n' +
    keys.map(function (k) {
      const items = pages[k].map(function (s) { return '  ' + JSON.stringify(s); }).join(',\n');
      return ' ' + JSON.stringify(k) + ': [\n' + items + '\n ]';
    }).join(',\n') +
    '\n};\n';
}
function regenPages(id, pages) {
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'mri-pages-'));
  try {
    execFileSync('pdftoppm', ['-jpeg', '-r', '125', '-jpegopt', 'quality=85',
      path.join(ROOT, 'pdf', id + '.pdf'), path.join(tmp, 'p')]);
    const made = fs.readdirSync(tmp)
      .map(function (n) { const m = n.match(/^p-0*(\d+)\.jpg$/); return m ? { n: +m[1], f: n } : null; })
      .filter(Boolean).sort(function (a, b) { return a.n - b.n; });
    if (!made.length) throw new Error('pdftoppm n\'a produit aucune page pour ' + id);
    // Retire les anciennes pages de CETTE fiche (nombre de pages peut changer).
    const dir = path.join(ROOT, 'images', 'pages');
    const oldRe = new RegExp('^' + id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '-(\\d+)\\.jpg$');
    fs.readdirSync(dir).forEach(function (n) { if (oldRe.test(n)) fs.unlinkSync(path.join(dir, n)); });
    const list = made.map(function (pg) {
      const rel = 'images/pages/' + id + '-' + pg.n + '.jpg';
      fs.copyFileSync(path.join(tmp, pg.f), path.join(ROOT, rel));
      return rel;
    });
    pages[id] = list;
    return list.length;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

/* ── 6. Texte de recherche (pdftotext) + pdftext.js ─────────────────────── */
function extractPdfText(id) {
  const raw = execFileSync('pdftotext', ['-layout', '-enc', 'UTF-8',
    path.join(ROOT, 'pdf', id + '.pdf'), '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const chunks = [];
  raw.split('\f').forEach(function (pageTxt, i) {
    // Blocs = groupes de lignes séparés par une ligne vide ; ~400 car. max.
    pageTxt.split(/\n\s*\n/).forEach(function (block) {
      let t = block.replace(/\s+/g, ' ').trim();
      while (t.length > 400) {
        let cut = t.lastIndexOf('. ', 400);
        if (cut < 120) cut = t.lastIndexOf(' ', 400);
        if (cut < 120) cut = 400;
        chunks.push({ p: i + 1, t: t.slice(0, cut + 1).trim() });
        t = t.slice(cut + 1).trim();
      }
      if (t) chunks.push({ p: i + 1, t: t });
    });
  });
  return chunks;
}
function serializePdfText(obj) {
  return '/* TEXTE INTEGRAL DES PDF (extrait, pour la recherche de l assistant). */\n' +
    'window.PDFTEXT=' + JSON.stringify(obj) + ';';
}

/* ── programme principal ────────────────────────────────────────────────── */
async function main() {
  if (!TOKEN) {
    console.error('AIRTABLE_TOKEN manquant. Créer le secret de dépôt AIRTABLE_TOKEN\n' +
      '(jeton Airtable avec data.records:read sur la base « Documents »).');
    process.exit(1);
  }
  const site = loadSiteProcedures();
  const records = await fetchRecords();
  const firstRun = !fs.existsSync(STATE_FILE);
  const state = firstRun ? {} : JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));

  // Index Airtable : par record id et par code normalisé (+ langue).
  const byRec = {}, byCode = {};
  records.forEach(function (r) {
    byRec[r.id] = r;
    const c = normCode(r.code);
    if (!c) return;
    if (byCode[c]) byCode[c].push(r); else byCode[c] = [r];
  });

  const matches = [];                          // { proc, rec, via }
  const unmatchedSite = [];
  site.list.forEach(function (p) {
    if (ALIASES[p.id] && byRec[ALIASES[p.id]]) {
      matches.push({ proc: p, rec: byRec[ALIASES[p.id]], via: 'alias' });
      return;
    }
    const c = normCode(p.code);
    const wantLang = p.famille === 'english' ? 'Anglais' : 'Français';
    const cands = (c && byCode[c] || []).filter(function (r) { return !r.langue || r.langue === wantLang; });
    if (cands.length === 1) matches.push({ proc: p, rec: cands[0], via: 'code' });
    else unmatchedSite.push(p.id + (p.code ? ' (' + p.code + ')' : '') + (cands.length > 1 ? ' — code ambigu' : ''));
  });
  const matchedRecIds = {};
  matches.forEach(function (m) { matchedRecIds[m.rec.id] = true; });
  const unmatchedAirtable = records.filter(function (r) { return !matchedRecIds[r.id] && r.atts.length; })
    .map(function (r) { return (r.code || '(sans code)') + (r.nom ? ' — ' + r.nom : '') + (r.langue ? ' [' + r.langue + ']' : ''); });

  const canPages = hasTool('pdftoppm');
  const canText = hasTool('pdftotext');
  const pagesObj = loadWindowVar('pages.js', 'PAGES');
  const pdftextObj = loadWindowVar('pdftext.js', 'PDFTEXT');

  const synced = [], baselined = [], multi = [], errors = [];
  let pagesTouched = false, textTouched = false;
  const today = frDate(new Date());

  for (const m of matches) {
    const id = m.proc.id, rec = m.rec;
    const prev = state[id];
    const forced = FORCE.indexOf('all') >= 0 || FORCE.indexOf(id) >= 0;
    const changed = prev ? prev.fp !== rec.fp : false;
    if (!rec.atts.length) continue;                       // rien de joint : ignorer
    if (!prev || (!changed && !forced)) {
      if (!prev) baselined.push(id);
      state[id] = { fp: rec.fp, file: rec.atts[0].filename, rec: rec.id, seen: new Date().toISOString().slice(0, 10) };
      continue;
    }
    if (rec.atts.length > 1) {
      // Plusieurs pièces jointes (documents fusionnés à la main) : signaler
      // sans rien écraser, et mémoriser pour ne pas re-signaler à chaque run.
      multi.push(id + ' ← « ' + (rec.code || rec.nom) + ' » (' + rec.atts.length + ' pièces jointes)');
      state[id] = { fp: rec.fp, file: rec.atts[0].filename, rec: rec.id, seen: new Date().toISOString().slice(0, 10) };
      continue;
    }
    const att = rec.atts[0];
    console.log((DRY ? '[dry] ' : '') + 'Mise à jour ' + id + ' ← ' + att.filename);
    if (DRY) { synced.push(id); continue; }
    try {
      await downloadPdf(att, path.join(ROOT, 'pdf', id + '.pdf'));
      setDateRevision(site.owner[id], id, today);
      if (pagesObj[id]) {
        if (canPages) { regenPages(id, pagesObj); pagesTouched = true; }
        else console.warn('  ! pdftoppm absent : images de pages NON régénérées pour ' + id);
      }
      if (pdftextObj[id]) {
        if (canText) { pdftextObj[id] = extractPdfText(id); textTouched = true; }
        else console.warn('  ! pdftotext absent : texte de recherche NON régénéré pour ' + id);
      }
      state[id] = { fp: rec.fp, file: att.filename, rec: rec.id, seen: new Date().toISOString().slice(0, 10) };
      synced.push(id);
    } catch (e) {
      errors.push(id + ' : ' + e.message);
      console.error('  ✗ ' + id + ' : ' + e.message);
    }
  }

  if (!DRY) {
    if (pagesTouched) fs.writeFileSync(path.join(ROOT, 'pages.js'), serializePages(pagesObj));
    if (textTouched) fs.writeFileSync(path.join(ROOT, 'pdftext.js'), serializePdfText(pdftextObj));
    fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 1) + '\n');
    ['pages.js', 'pdftext.js'].forEach(function (f) {
      const chk = spawnSync(process.execPath, ['--check', path.join(ROOT, f)], { encoding: 'utf8' });
      if (chk.status !== 0) throw new Error(f + ' invalide après régénération : ' + chk.stderr);
    });
  }

  /* ── rapport ── */
  const lines = [];
  lines.push('# Synchronisation Airtable → site');
  lines.push('');
  lines.push('- Enregistrements Airtable : ' + records.length + ' · fiches du site : ' + site.list.length + ' · appariés : ' + matches.length);
  if (firstRun) lines.push('- **Premier passage** : prise de référence seulement (aucun téléchargement).');
  if (synced.length) lines.push('- **Procédures mises à jour (' + synced.length + ')** : ' + synced.join(', '));
  else lines.push('- Aucun PDF modifié depuis le dernier passage.');
  if (baselined.length) lines.push('- Nouvellement suivies (référence prise, sans téléchargement) : ' + baselined.join(', '));
  if (multi.length) lines.push('- ⚠ À fusionner MANUELLEMENT (plusieurs pièces jointes) : ' + multi.join(' ; '));
  if (errors.length) lines.push('- ✗ Erreurs : ' + errors.join(' ; '));
  if (unmatchedSite.length) lines.push('- Fiches sans enregistrement Airtable correspondant : ' + unmatchedSite.join(', '));
  if (unmatchedAirtable.length) lines.push('- Enregistrements Airtable sans fiche sur le site (à adapter ?) : ' + unmatchedAirtable.join(' ; '));
  const report = lines.join('\n');
  console.log('\n' + report);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + '\n');
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT,
      'synced=' + synced.join(' ') + '\n' +
      'synced_count=' + synced.length + '\n');
  }
  if (errors.length) process.exit(2);
}

if (require.main === module) {
  main().catch(function (e) { console.error(e && e.stack || String(e)); process.exit(1); });
} else {
  module.exports = { loadSiteProcedures: loadSiteProcedures, setDateRevision: setDateRevision,
    serializePages: serializePages, serializePdfText: serializePdfText, extractPdfText: extractPdfText,
    regenPages: regenPages, loadWindowVar: loadWindowVar, normCode: normCode, frDate: frDate, ALIASES: ALIASES };
}
