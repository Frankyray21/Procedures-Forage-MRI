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
  },

  /* -------------------------------------------------------------------------
     ÉVALUATION DES QUESTIONS DE QUIZ (pouce 👍 / 👎 + commentaire) → Airtable.
     Après CHAQUE question (quiz des fiches ET « Quiz éclair »), un petit pouce
     « Cette question t'a-t-elle été utile ? ». Au clic, un champ commentaire
     (optionnel) apparaît, puis « Envoyer ». Tout part vers le MÊME Worker
     Cloudflare que les attestations (endpoint ci-dessus), qui l'enregistre dans
     la table Airtable « Feedback quiz (web) » de la base « Formations ».
     Exactement la même mécanique que les sites Prévention TMS et RodBot.

       • enabled  : false pour masquer complètement le pouce partout.
       • endpoint : à renseigner UNIQUEMENT pour viser un AUTRE Worker que celui
                    des attestations ci-dessus (sinon, laisser vide = réutilise
                    le même Worker).

     Rien à déployer de plus : il suffit de créer la table « Feedback quiz (web) »
     dans la base « Formations » (colonnes détaillées dans worker/README.md).
     Fonctionne hors ligne : un vote/commentaire envoyé sous terre est mis en
     file sur l'appareil et repart tout seul au retour du réseau.
  ------------------------------------------------------------------------- */
  feedback: {
    enabled: true,
    endpoint: ""
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
