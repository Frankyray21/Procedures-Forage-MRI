/* ===========================================================================
   CONFIGURATION DU SITE
   (Aucun mot de passe : l'accès est libre.)
   =========================================================================== */
window.SITE_CONFIG = {
  org: "Machines Roger International",
  title: "Procédures de forage",

  /* -------------------------------------------------------------------------
     ATTESTATION DE LECTURE (par procédure) — formulaire Airtable.
     Quand c'est configuré, un bouton « Attester la lecture » apparaît au bas de
     CHAQUE fiche de procédure et ouvre un formulaire Airtable pré-rempli avec la
     procédure (verrouillée). Le travailleur choisit son nom et valide.

     • formUrl  : l'URL du formulaire partagé Airtable (commence par
                  https://airtable.com/app…/pag… ou /shr…).
     • procField: le NOM EXACT du champ « Procédure » dans le formulaire
                  (par défaut « Procédure »). Le pré-remplissage utilise la
                  valeur du champ primaire de la table Procédures = le Code
                  (ex. PRO-OP-ITH-002).

     Laisser en commentaire = pas de bouton (tant que la base n'est pas prête).
  ------------------------------------------------------------------------- */
  // attestation: {
  //   formUrl: "https://airtable.com/appXXXXXXXXXXXXXX/pagYYYYYYYYYYYYYY/form",
  //   procField: "Procédure"
  // }
};

/* ---------------------------------------------------------------------------
   IA locale (optionnel). Défaut en prod = WebLLM / Qwen3-1.7B (recommandé).
   Option EXPÉRIMENTALE : Gemma 3n E2B (LiteRT-LM) — PAS Gemma 4 (en attente
   d'un bundle .litertlm officiel). Fichier web officiel actuel, ex. :
     gemma-3n-E2B-it-int4-Web.litertlm
     (source : huggingface.co/google/gemma-3n-E2B-it-litert-lm)
   IMPORTANT : ne pointe pas directement un repo Hugging Face « gated » en prod.
   Télécharge le fichier après acceptation des conditions, puis héberge-le sur
   TON CDN / hébergement statique. En-têtes attendus sur l'URL :
     • Access-Control-Allow-Origin (CORS) — OBLIGATOIRE (fetch cross-origin),
     • Content-Length — pour la barre de progression,
     • Accept-Ranges: bytes — utile (reprise/range),
     • Cache-Control: long (ex. immutable, max-age 1 an) — nom de fichier VERSIONNÉ.
   Mets l'URL ici (nom versionné recommandé) :
     window.MRI_LLM_GEMMA_URL = "https://cdn.example.com/models/gemma-3n-E2B-it-int4-Web.v1.litertlm";
   Laisser commenté = l'assistant IA utilise WebLLM (Qwen3-1.7B).
--------------------------------------------------------------------------- */
// window.MRI_LLM_GEMMA_URL = "https://cdn.example.com/models/gemma-3n-E2B-it-int4-Web.v1.litertlm";
