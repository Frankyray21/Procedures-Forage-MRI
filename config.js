/* ===========================================================================
   CONFIGURATION DU SITE
   (Aucun mot de passe : l'accès est libre.)
   =========================================================================== */
window.SITE_CONFIG = {
  org: "Machines Roger International",
  title: "Procédures de forage"
};

/* ---------------------------------------------------------------------------
   IA locale (optionnel). Défaut en prod = WebLLM / Qwen3-1.7B (recommandé).
   Option EXPÉRIMENTALE : Gemma 3n E2B (LiteRT-LM) — PAS Gemma 4 (en attente
   d'un bundle .litertlm officiel). Fichier web officiel actuel, ex. :
     gemma-3n-E2B-it-int4-Web.litertlm
     (source : huggingface.co/google/gemma-3n-E2B-it-litert-lm)
   IMPORTANT : ne pointe pas directement un repo Hugging Face « gated » en prod.
   Télécharge le fichier après acceptation des conditions, puis héberge-le sur
   TON CDN / hébergement statique avec CORS + cache corrects, et mets l'URL ici :
     window.MRI_LLM_GEMMA_URL = "https://TON-CDN/gemma-3n-E2B-it-int4-Web.litertlm";
   Laisser commenté = l'assistant IA utilise WebLLM (Qwen3-1.7B).
--------------------------------------------------------------------------- */
// window.MRI_LLM_GEMMA_URL = "https://TON-CDN/gemma-3n-E2B-it-int4-Web.litertlm";
