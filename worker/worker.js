/* ─────────────────────────────────────────────────────────────────────────
   Worker Cloudflare · Attestations procédures (web)
   ---------------------------------------------------------------------------
   Reçoit les attestations de lecture des procédures de forage complétées sur
   le site (quiz de la fiche réussi à 80 % minimum) et les enregistre
   automatiquement dans Airtable. Relie aussi chaque attestation au bon
   employé (recherche au fil de la frappe sur le site) — même mécanique que le
   Worker « attestations-tms » du site Prévention TMS.

   • Base Airtable   : « Formations »                        → appmq82YjvEUglYZU
   • Table attest.   : « Attestations procédures (web) »     → tblKKK7xpP1MwRvYw
   • Liste employés  : « Liste employé (registre formation) »→ tbllKuNePDWZMr1cz

   SECRET REQUIS (Cloudflare → Settings → Variables and Secrets) :
   • AIRTABLE_TOKEN  = jeton d'accès personnel Airtable (Personal Access Token)
                       avec : data.records:read + data.records:write
                       et l'accès à la base « Formations ».
                       (Le jeton du Worker attestations-tms convient tel quel.)

   ENDPOINTS :
   • GET  /?q=<texte>  → recherche d'employés (autocomplétion). Renvoie
                         { ok:true, results:[{ id, name }, ...] }
   • GET  /?roster=1   → annuaire COMPLET des employés (autocomplétion hors-ligne).
                         Le site le télécharge quand il a du réseau et le range
                         sur l'appareil, pour que la recherche de nom fonctionne
                         SOUS TERRE. Renvoie { ok:true, results:[{ id, name }, ...] }.
   • GET  /?hist=<nom> → historique des attestations de ce nom (correspondance
                         exacte, casse/accents ignorés) pour la page « Mon
                         suivi » du site. Renvoie { ok:true, results:[{ proc,
                         titre, date }, ...], progress:{...}|null } — volontairement
                         minimal (pas de statut ni de temps : l'endpoint est
                         public). `progress` = progression sauvegardée (meilleurs
                         scores de quiz), pour restaurer sur un nouvel appareil.
   • GET  /            → page d'état { ok:true, service:"attestations-procedures" }
   • POST / (type:"feedback") → retour sur une question de quiz (pouce ↑/↓ +
       commentaire), ANONYME. Enregistré dans « Retours quiz procédures (web) »
       (même convention que « Retours quiz TMS/RodBot (web) »). Corps :
       { "type":"feedback", "vote":"up"|"down", "question":"énoncé…",
         "questionId":"centralisateur#3", "quiz":"centralisateur"|"Quiz éclair",
         "titre":"…", "comment":"(optionnel)", "name":"(optionnel)" }
       → "questionId" va dans « Question » (repère), "question" dans « Énoncé »,
       "vote" dans « Avis ». Renvoie { ok:true, id:"rec…" }. Pour AJOUTER un
       commentaire ou CHANGER le pouce d'un retour déjà créé, renvoyer le même
       corps AVEC "id":"rec…" (met à jour la ligne au lieu d'en créer une).
   • POST / (type:"progress") → sauvegarde la progression du travailleur dans
       son dossier « Liste employé (registre formation) », champ « Progression
       procédures (web) ». Corps JSON :
       { "type":"progress", "name":"Prénom Nom",
         "data":{ "v":1, "pq":{ "pro-op-ith-004":{ "s":10, "n":12 }, ... } } }
       Renvoie { ok:true, linked:bool } — linked=false si le nom ne correspond
       à aucun employé (rien n'est stocké, sans erreur).
   • POST /            → enregistre une attestation. Corps JSON :
       { "name":"...", "employeeId":"rec...(opt)",
         "proc":"PRO-OP-ITH-004", "titre":"Forage en longtrou (ITH / CUBEX)",
         "score":"12/13 — 92 %", "revision":"Juin 2024", "date":"AAAA-MM-JJ",
         "readTime":"3 min 42 s", "quizTime":"2 min 10 s",
         "readSeconds":222, "quizSeconds":130 }

   SUIVI DU TEMPS (pour les gestionnaires) : le site mesure le temps ACTIF passé
   sur la fiche et sur le quiz (écran visible), NON affiché au travailleur. Écrit
   dans « Temps sur la fiche » / « Temps sur le quiz » (lisible) et « Secondes
   fiche » / « Secondes quiz » (nombres, pour tri/analyse). Si ces colonnes
   manquent, le Worker réessaie sans elles : l'attestation est enregistrée quand même.
   ───────────────────────────────────────────────────────────────────────── */

const AIRTABLE_BASE  = "appmq82YjvEUglYZU";   // base « Formations »
const AIRTABLE_TABLE = "tblKKK7xpP1MwRvYw";   // table « Attestations procédures (web) »

/* Liste des employés, pour relier l'attestation au bon dossier. */
const EMP_TABLE      = "tbllKuNePDWZMr1cz";   // « Liste employé (registre formation) »
const EMP_NAME_FIELD = "Name";                // champ principal = nom complet
/* Progression du site (meilleurs scores de quiz), sauvegardée sur le dossier
   de l'employé pour être restaurée sur un nouvel appareil / appareil partagé. */
const PROG_FIELD     = "Progression procédures (web)";

/* Retours des questions de quiz (pouce ↑/↓ + commentaire) — quiz des fiches ET
   « Quiz éclair ». MÊME convention que « Retours quiz TMS (web) » et « Retours
   quiz RodBot (web) ». Référencée par NOM (aucun ID à copier). Un enregistrement
   par question notée. Colonnes utilisées (voir worker/README) :
     • « Question »        repère stable (champ principal), ex. « centralisateur#3 »
     • « Avis »            sélection unique : « Pouce en haut » / « Pouce en bas »
     • « Commentaire »     texte long
     • « Quiz »            texte (id de la procédure, ou « Quiz éclair »)
     • « Énoncé »          texte long (texte de la question au moment du vote)
     • « Titre procédure » texte
     • « Nom »             texte (rempli seulement si un profil est actif)
     • « Date »            date
     • « Source »          texte
     • « Statut »          sélection (triage manuel — non écrit par le Worker)
   Colonnes manquantes : le Worker réessaie sans les colonnes de contexte, le
   pouce + commentaire est enregistré quand même. */
const FEEDBACK_TABLE = "Retours quiz procédures (web)";

/* Origines autorisées à appeler le Worker depuis un navigateur (CORS). */
const ALLOWED_ORIGINS = [
  "https://frankyray21.github.io",
  "https://procedures-forage-mri.pages.dev",
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin);

    // Requête préliminaire CORS (envoyée automatiquement par le navigateur).
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // GET : recherche d'employés (?q=...), historique (?hist=...) ou état.
    if (request.method === "GET") {
      const url = new URL(request.url);
      if (url.searchParams.has("q")) {
        return searchEmployees(url.searchParams.get("q") || "", env, cors);
      }
      if (url.searchParams.has("roster")) {
        return listRoster(env, cors);
      }
      if (url.searchParams.has("hist")) {
        return listAttestations(url.searchParams.get("hist") || "", env, cors);
      }
      return json({ ok: true, service: "attestations-procedures" }, 200, cors);
    }

    if (request.method !== "POST") {
      return json({ ok: false, error: "Méthode non autorisée." }, 405, cors);
    }

    // Lecture du corps JSON envoyé par le site.
    let body;
    try {
      body = await request.json();
    } catch (_) {
      return json({ ok: false, error: "Corps JSON invalide." }, 400, cors);
    }

    // Évaluation d'une question de quiz (pouce ↑/↓ + commentaire). ANONYME par
    // défaut : ne requiert pas de nom — traité AVANT la vérification du nom.
    if (body && body.type === "feedback") {
      return saveFeedback(body, env, cors);
    }

    const name = clean(body.name, 120);
    if (!name) {
      return json({ ok: false, error: "Nom manquant." }, 400, cors);
    }

    // Sauvegarde de progression (pas une attestation).
    if (body.type === "progress") {
      return saveProgress(name, body.data, env, cors);
    }

    const proc = clean(body.proc, 60);
    if (!proc) {
      return json({ ok: false, error: "Procédure manquante." }, 400, cors);
    }

    const titre    = clean(body.titre, 200);
    const score    = clean(body.score, 40);      // ex. « 12/13 — 92 % »
    const revision = clean(body.revision, 60);   // ex. « Juin 2024 »
    const date     = isoDate(body.date);         // « AAAA-MM-JJ »
    const readTime = clean(body.readTime, 40);   // ex. « 3 min 42 s »
    const quizTime = clean(body.quizTime, 40);   // ex. « 2 min 10 s »
    const readSec  = intOrNull(body.readSeconds);
    const quizSec  = intOrNull(body.quizSeconds);
    let empId = validRecId(body.employeeId);     // lien vers la liste d'employés

    if (!env.AIRTABLE_TOKEN) {
      return json(
        { ok: false, error: "AIRTABLE_TOKEN non configuré sur le Worker." },
        500, cors
      );
    }

    // Repli : si aucun employé n'a été choisi explicitement dans la liste, on
    // tente une correspondance EXACTE du nom (casse/accents ignorés). Ainsi le
    // lien se fait même si la personne a tapé son nom sans cliquer la suggestion.
    if (!empId) empId = await findEmployeeByName(name, env);

    // Champs envoyés à Airtable (les noms correspondent exactement aux colonnes).
    // typecast:true → Airtable crée automatiquement l'option « Procédure »
    // quand une nouvelle procédure est attestée pour la première fois.
    const fields = {
      "Nom": name,
      "Procédure": proc,
      "Date": date,
      "Source": "site procédures",
      // Relié à un employé → « Reçu ». Sinon → « À relier » (vérif manuelle).
      "Statut": empId ? "Reçu" : "À relier",
    };
    if (titre)    fields["Titre procédure"] = titre;
    if (score)    fields["Score quiz"] = score;
    if (revision) fields["Révision procédure"] = revision;
    if (empId)    fields["Employé"] = [empId];

    // Colonnes de suivi du temps (gestionnaires). Envoyées d'abord ; si Airtable
    // les refuse (colonnes absentes), on réessaie SANS elles pour ne jamais
    // bloquer l'enregistrement de l'attestation.
    const timeFields = {};
    if (readTime)       timeFields["Temps sur la fiche"] = readTime;
    if (quizTime)       timeFields["Temps sur le quiz"] = quizTime;
    if (readSec != null) timeFields["Secondes fiche"] = readSec;
    if (quizSec != null) timeFields["Secondes quiz"] = quizSec;

    let at = await postRecord({ ...fields, ...timeFields }, env);
    if (at && !at.ok && Object.keys(timeFields).length) {
      at = await postRecord(fields, env);   // repli sans les colonnes de temps
    }
    if (!at) {
      return json({ ok: false, error: "Airtable injoignable." }, 502, cors);
    }
    if (!at.ok) {
      const detail = await at.text();
      return json(
        { ok: false, error: "Airtable a refusé l'enregistrement.", detail },
        502, cors
      );
    }

    const rec = await at.json();
    return json({ ok: true, id: rec.id, linked: !!empId }, 200, cors);
  },
};

/* POST d'un enregistrement. Table par défaut = « Attestations procédures (web) »,
   ou celle passée en 3e argument (nom ou id). Renvoie la Response Airtable, ou
   null en cas de panne réseau. */
async function postRecord(fields, env, table) {
  try {
    return await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(table || AIRTABLE_TABLE)}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        // typecast: laisse Airtable convertir la date et créer les options.
        body: JSON.stringify({ fields, typecast: true }),
      }
    );
  } catch (e) {
    return null;
  }
}

/* PATCH partiel d'un enregistrement (mise à jour de quelques champs). Renvoie la
   Response Airtable, ou null en cas de panne réseau. */
async function patchRecord(table, id, fields, env) {
  try {
    return await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(table)}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields, typecast: true }),
      }
    );
  } catch (e) {
    return null;
  }
}

/* ── évaluation d'une question de quiz (pouce + commentaire) ─────────────────
   Un enregistrement par question notée. Le clic sur le pouce CRÉE la ligne
   (renvoie son id) ; l'ajout d'un commentaire OU le changement de pouce MET À
   JOUR la même ligne (body.id fourni). Anonyme, sauf si un profil est actif
   sur le site (body.name). Table « Feedback quiz (web) », base « Formations ». */
async function saveFeedback(body, env, cors) {
  if (!env.AIRTABLE_TOKEN) {
    return json({ ok: false, error: "AIRTABLE_TOKEN non configuré sur le Worker." }, 500, cors);
  }
  const recId      = validRecId(body.id);
  const vote       = clean(body.vote, 8).toLowerCase();   // « up » ou « down »
  const hasVote    = (vote === "up" || vote === "down");
  const hasComment = (body.comment != null);              // clé présente = on écrit
  const comment    = clean(body.comment, 2000);

  // Mise à jour d'un retour existant (commentaire ajouté, pouce changé).
  if (recId) {
    const upd = {};
    if (hasVote)    upd["Avis"] = avisLabel(vote);
    if (hasComment) upd["Commentaire"] = comment;
    if (!Object.keys(upd).length) return json({ ok: true, id: recId }, 200, cors);
    const r = await patchRecord(FEEDBACK_TABLE, recId, upd, env);
    if (!r) return json({ ok: false, error: "Airtable injoignable." }, 502, cors);
    if (!r.ok) {
      const detail = await r.text();
      return json({ ok: false, error: "Airtable a refusé la mise à jour.", detail }, 502, cors);
    }
    return json({ ok: true, id: recId }, 200, cors);
  }

  // Création : le pouce est requis.
  if (!hasVote) return json({ ok: false, error: "Vote manquant (up/down)." }, 400, cors);
  const enonce = clean(body.question, 1000);   // texte de la question au moment du vote
  const repere = clean(body.questionId, 80);   // clé stable (repère) de la question
  const fields = {
    "Avis": avisLabel(vote),
    "Question": repere || enonce || "(question)",   // repère = champ principal
    "Date": isoDate(body.date),
    "Source": "site procédures",
  };
  if (enonce)  fields["Énoncé"] = enonce;
  if (comment) fields["Commentaire"] = comment;

  // Colonnes de contexte : envoyées d'abord ; si Airtable les refuse (colonne
  // absente), on réessaie SANS elles pour ne jamais perdre le pouce + commentaire.
  const extra = {};
  if (clean(body.quiz, 80))    extra["Quiz"]            = clean(body.quiz, 80);
  if (clean(body.titre, 200))  extra["Titre procédure"] = clean(body.titre, 200);
  if (clean(body.name, 120))   extra["Nom"]             = clean(body.name, 120);

  let at = await postRecord({ ...fields, ...extra }, env, FEEDBACK_TABLE);
  if (at && !at.ok && Object.keys(extra).length) {
    at = await postRecord(fields, env, FEEDBACK_TABLE);   // repli sans les colonnes de contexte
  }
  if (!at) return json({ ok: false, error: "Airtable injoignable." }, 502, cors);
  if (!at.ok) {
    const detail = await at.text();
    return json({ ok: false, error: "Airtable a refusé l'enregistrement.", detail }, 502, cors);
  }
  const rec = await at.json();
  return json({ ok: true, id: rec.id }, 200, cors);
}

function avisLabel(v) { return v === "up" ? "Pouce en haut" : "Pouce en bas"; }

/* ── recherche d'employés (autocomplétion, insensible casse + accents) ────── */
async function searchEmployees(q, env, cors) {
  const term = deburr(clean(q, 50).toLowerCase());
  if (term.length < 2) return json({ ok: true, results: [] }, 200, cors);
  if (!env.AIRTABLE_TOKEN) {
    return json({ ok: false, error: "AIRTABLE_TOKEN non configuré." }, 500, cors);
  }

  // Le champ « Name » est mis en minuscules + accents retirés, puis comparé.
  const safe = term.replace(/["\\]/g, " ");
  const field = stripAccentsFormula(`LOWER({${EMP_NAME_FIELD}})`);
  const formula = `SEARCH("${safe}", ${field})`;
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${EMP_TABLE}`
            + `?filterByFormula=${encodeURIComponent(formula)}`
            + `&maxRecords=8&fields%5B%5D=${encodeURIComponent(EMP_NAME_FIELD)}`;

  let at;
  try {
    at = await fetch(url, { headers: { "Authorization": `Bearer ${env.AIRTABLE_TOKEN}` } });
  } catch (e) {
    return json({ ok: false, results: [] }, 502, cors);
  }
  if (!at.ok) return json({ ok: false, results: [] }, 200, cors);

  const data = await at.json();
  const results = (data.records || [])
    .map((r) => ({ id: r.id, name: String((r.fields && r.fields[EMP_NAME_FIELD]) || "").trim() }))
    .filter((r) => r.name)
    .sort((a, b) => {
      // Les noms qui COMMENCENT par le terme tapé d'abord, puis alphabétique.
      const sa = deburr(a.name.toLowerCase()).startsWith(safe) ? 0 : 1;
      const sb = deburr(b.name.toLowerCase()).startsWith(safe) ? 0 : 1;
      return sa - sb || a.name.localeCompare(b.name, "fr");
    });
  return json({ ok: true, results }, 200, cors);
}

/* ── annuaire complet des employés (mis en cache par le site) ───────────────
   Renvoie tous les noms d'un coup pour que l'autocomplétion fonctionne
   hors-ligne (sous terre). Paginé côté Airtable, borné à 2000 employés. */
async function listRoster(env, cors) {
  if (!env.AIRTABLE_TOKEN) {
    return json({ ok: false, error: "AIRTABLE_TOKEN non configuré." }, 500, cors);
  }
  const results = [];
  let offset = "";
  try {
    do {
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${EMP_TABLE}`
                + `?pageSize=100&fields%5B%5D=${encodeURIComponent(EMP_NAME_FIELD)}`
                + (offset ? `&offset=${encodeURIComponent(offset)}` : "");
      const at = await fetch(url, { headers: { "Authorization": `Bearer ${env.AIRTABLE_TOKEN}` } });
      if (!at.ok) return json({ ok: false, results: [] }, 200, cors);
      const data = await at.json();
      (data.records || []).forEach((r) => {
        const name = String((r.fields && r.fields[EMP_NAME_FIELD]) || "").trim();
        if (name) results.push({ id: r.id, name });
      });
      offset = data.offset || "";
    } while (offset && results.length < 2000);
  } catch (e) {
    return json({ ok: false, results: [] }, 502, cors);
  }
  results.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  // L'annuaire bouge rarement : court cache navigateur/Cloudflare.
  return json({ ok: true, results }, 200, { ...cors, "Cache-Control": "public, max-age=3600" });
}

/* ── historique des attestations d'un nom (page « Mon suivi » du site) ──────
   Correspondance EXACTE du nom (casse/accents ignorés). Ne renvoie JAMAIS les
   champs de temps (« Temps sur la fiche », etc.) : réservés aux gestionnaires. */
async function listAttestations(name, env, cors) {
  const term = deburr(clean(name, 120).toLowerCase()).replace(/["\\]/g, " ").trim();
  if (term.length < 2) return json({ ok: true, results: [] }, 200, cors);
  if (!env.AIRTABLE_TOKEN) {
    return json({ ok: false, error: "AIRTABLE_TOKEN non configuré." }, 500, cors);
  }
  const field = stripAccentsFormula(`LOWER({Nom})`);
  const formula = `TRIM(${field})="${term}"`;
  // Vie privée : pas de score ni de statut nominatifs sur un endpoint public.
  const wanted = ["Procédure", "Titre procédure", "Date"];
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`
            + `?filterByFormula=${encodeURIComponent(formula)}`
            + `&maxRecords=200`
            + `&sort%5B0%5D%5Bfield%5D=Date&sort%5B0%5D%5Bdirection%5D=desc`
            + wanted.map((f) => `&fields%5B%5D=${encodeURIComponent(f)}`).join("");
  // Attestations + progression sauvegardée, en parallèle.
  let at, emp;
  try {
    [at, emp] = await Promise.all([
      fetch(url, { headers: { "Authorization": `Bearer ${env.AIRTABLE_TOKEN}` } }),
      findEmployee(name, env, true),
    ]);
  } catch (e) {
    return json({ ok: false, results: [] }, 502, cors);
  }
  if (!at.ok) return json({ ok: false, results: [] }, 200, cors);
  const data = await at.json();
  const results = (data.records || []).map((r) => {
    const f = r.fields || {};
    return {
      proc:  String(f["Procédure"] || ""),
      titre: String(f["Titre procédure"] || ""),
      date:  String(f["Date"] || ""),
    };
  }).filter((r) => r.proc);
  return json({ ok: true, results, progress: (emp && emp.progress) || null }, 200, cors);
}

/* ── sauvegarde de la progression (meilleurs scores de quiz) ────────────────
   Écrite sur le dossier de l'employé (champ « Progression procédures (web) »)
   quand le nom correspond EXACTEMENT à un employé — sinon on répond quand même
   ok:true (linked:false) : rien n'est stocké, le site garde la copie locale. */
async function saveProgress(name, data, env, cors) {
  if (!env.AIRTABLE_TOKEN) {
    return json({ ok: false, error: "AIRTABLE_TOKEN non configuré." }, 500, cors);
  }
  const prog = sanitizeProgress(data);
  if (!prog) return json({ ok: false, error: "Progression invalide." }, 400, cors);
  const emp = await findEmployee(name, env, false);
  if (!emp || !emp.id) return json({ ok: true, linked: false }, 200, cors);
  try {
    const at = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${EMP_TABLE}/${emp.id}`,
      {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: { [PROG_FIELD]: JSON.stringify(prog) } }),
      }
    );
    if (!at.ok) return json({ ok: false, error: "Airtable a refusé la sauvegarde." }, 502, cors);
    return json({ ok: true, linked: true }, 200, cors);
  } catch (e) {
    return json({ ok: false, error: "Airtable injoignable." }, 502, cors);
  }
}

/* Ne garde que la forme attendue : { v:1, pq:{ <id proc>:{ s, n } } } — borné
   (300 procédures max, ids ≤ 60 car., scores entiers 0…999). Renvoie null si
   le corps n'a pas cette forme. */
function sanitizeProgress(data) {
  if (!data || typeof data !== "object" || !data.pq || typeof data.pq !== "object") return null;
  const pq = {};
  let count = 0;
  for (const key of Object.keys(data.pq)) {
    if (count >= 300) break;
    const id = clean(key, 60);
    const v = data.pq[key];
    if (!id || !v || typeof v !== "object") continue;
    const s = Math.round(Number(v.s)), n = Math.round(Number(v.n));
    if (!isFinite(s) || !isFinite(n) || s < 0 || n < 1 || n > 999 || s > n) continue;
    pq[id] = { s, n };
    count++;
  }
  return { v: 1, pq };
}

/* Cherche UN employé dont le nom complet correspond exactement (casse/accents
   ignorés). Renvoie son record id, ou "" si aucun / plusieurs (ambigu). */
async function findEmployeeByName(name, env) {
  const emp = await findEmployee(name, env, false);
  return (emp && emp.id) || "";
}

/* Comme ci-dessus, mais renvoie { id, progress } — progress (objet ou null)
   n'est lu que si withProgress est vrai. null si aucun employé unique. */
async function findEmployee(name, env, withProgress) {
  const term = deburr(clean(name, 120).toLowerCase()).replace(/["\\]/g, " ").trim();
  if (term.length < 2) return null;
  const field = stripAccentsFormula(`LOWER({${EMP_NAME_FIELD}})`);
  const formula = `TRIM(${field})="${term}"`;
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${EMP_TABLE}`
            + `?filterByFormula=${encodeURIComponent(formula)}`
            + `&maxRecords=2&fields%5B%5D=${encodeURIComponent(EMP_NAME_FIELD)}`
            + (withProgress ? `&fields%5B%5D=${encodeURIComponent(PROG_FIELD)}` : "");
  try {
    const at = await fetch(url, { headers: { "Authorization": `Bearer ${env.AIRTABLE_TOKEN}` } });
    if (!at.ok) return null;
    const data = await at.json();
    const recs = data.records || [];
    if (recs.length !== 1) return null;
    let progress = null;
    if (withProgress) {
      try { progress = sanitizeProgress(JSON.parse(recs[0].fields[PROG_FIELD] || "")); } catch (e) {}
    }
    return { id: recs[0].id, progress };
  } catch (e) {
    return null;
  }
}

/* ── utilitaires ────────────────────────────────────────────────────────── */
function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.indexOf(origin) >= 0 ? origin : (origin || "*");
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(obj, status, extra) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...extra },
  });
}

function clean(v, max) {
  if (v == null) return "";
  return String(v).trim().slice(0, max);
}

function isoDate(v) {
  const d = v ? new Date(v) : new Date();
  if (isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function validRecId(v) {
  return (typeof v === "string" && /^rec[A-Za-z0-9]{14}$/.test(v)) ? v : "";
}

/* Entier ≥ 0 borné (secondes de suivi), sinon null. */
function intOrNull(v) {
  const n = Math.round(Number(v));
  return (isFinite(n) && n >= 0 && n < 100000000) ? n : null;
}

/* Retire les accents d'une chaîne JS (terme recherché). */
function deburr(s) {
  return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/* Construit une formule Airtable qui retire les accents FR d'une expression. */
function stripAccentsFormula(expr) {
  const map = [
    ["à", "a"], ["â", "a"], ["ä", "a"], ["á", "a"], ["ã", "a"],
    ["é", "e"], ["è", "e"], ["ê", "e"], ["ë", "e"],
    ["î", "i"], ["ï", "i"], ["í", "i"],
    ["ô", "o"], ["ö", "o"], ["ó", "o"], ["õ", "o"],
    ["ù", "u"], ["û", "u"], ["ü", "u"], ["ú", "u"],
    ["ç", "c"], ["ñ", "n"],
  ];
  let f = expr;
  for (const [a, b] of map) f = `SUBSTITUTE(${f},"${a}","${b}")`;
  return f;
}
