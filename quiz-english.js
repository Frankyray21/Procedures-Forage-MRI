/* ===========================================================================
   QUIZ — English procedures (one block per fiche, verbatim citations from
   the official PDFs). (Fichier en cours de remplissage.)
   =========================================================================== */
(function () {
  var Q = {};
  var T = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(Q).forEach(function (id) { T[id] = (T[id] || []).concat(Q[id]); });
})();
