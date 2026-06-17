/* ===========================================================================
   CONFIGURATION DU SITE
   (Aucun mot de passe : l'accès est libre.)
   =========================================================================== */
window.SITE_CONFIG = {
  org: "Machines Roger International",
  title: "Procédures de forage"
};

/* ---------------------------------------------------------------------------
   IA locale (optionnel). Pour activer Gemma 4 E2B au lieu de WebLLM, fournis
   l'URL d'un bundle modèle LiteRT/MediaPipe (.task / .litertlm) accessible :
     window.MRI_LLM_GEMMA_URL = "https://.../gemma-4-E2B-it.task";
   Laisser commenté = l'assistant IA (bêta) utilise WebLLM (Qwen3-1.7B).
   À valider : disponibilité/format du bundle Gemma 4 pour MediaPipe Web.
--------------------------------------------------------------------------- */
// window.MRI_LLM_GEMMA_URL = "https://EXEMPLE/gemma-4-E2B-it.task";
