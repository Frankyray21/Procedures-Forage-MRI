/* ===========================================================================
   CONFIGURATION DU SITE
   (Aucun mot de passe : l'accès est libre.)
   =========================================================================== */
window.SITE_CONFIG = {
  org: "Machines Roger International",
  title: "Procédures de forage",

  /* -------------------------------------------------------------------------
     ATTESTATION DE LECTURE (par procédure) → Airtable via un Worker Cloudflare.
     Sur chaque fiche, une fois le QUIZ RÉUSSI À 80 %, une section « Attestation
     de lecture » apparaît : le travailleur tape son nom (suggestions tirées du
     registre des employés), puis « Attester la lecture » enregistre le tout
     dans Airtable (base « Formations », table « Attestations procédures (web) »).
     Exactement la même mécanique que le site Prévention TMS.

     • endpoint : l'URL du Worker Cloudflare « attestations-procedures »
                  (voir worker/README.md pour le déploiement en 5 min).

     Tant que le Worker n'est pas déployé, le site fonctionne : la section
     s'affiche, mais l'envoi indique « service injoignable ». Mettre endpoint
     à "" (vide) masque complètement la section.
  ------------------------------------------------------------------------- */
  attestation: {
    endpoint: "https://attestations-procedures.frankyray-21.workers.dev"
  }
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
