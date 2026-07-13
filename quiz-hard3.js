/* ===========================================================================
   QUIZ — Questions TRÈS DIFFICILES (ITH + DD). Valeurs chiffrées et détails
   précis qui exigent d'avoir lu attentivement la procédure.
   Citations fidèles des PDF officiels. Fusion dans window.QUIZ_PROC.
   =========================================================================== */
(function () {
  var HARD3 = {
    /* ---------------- FORAGE DE PRODUCTION (ITH) ---------------- */
    "pro-op-ith-002": [
    ],
    "pro-op-ith-003": [
    ],
    "pro-op-ith-004": [
    ],
    "pro-op-ith-005": [
    ],

    /* ---------------- FORAGE AU DIAMANT (DD) ---------------- */
    "pro-dd-st-002": [
      { "q": "Pourquoi ne pas faire de va-et-vient avec le core knocker ?",
        "o": ["Pour ne pas bosser le tube", "Pour ne pas se coincer les doigts entre le core knocker et le tube", "Pour économiser de l'effort", "Pour ne pas user la carotte"], "a": 1,
        "e": "« Ne jamais effectuer de mouvement de va-et-vient avec le core knocker pour ne pas se coincer les doigts entre le core knocker et le tube. »" }
    ],
    "pro-dd-st-007": [
      { "q": "Après le pompage, on plie le boyau en deux avec 2 ty-rap. Combien de temps doit-il rester plié ?",
        "o": ["6 heures", "12 heures", "24 heures", "48 heures"], "a": 2,
        "e": "« …le boyau où l'on pompe le ciment doit être plié en deux et 2 ty-rap doivent le tenir plié jusqu'à ce que le temps de cure de 24 hrs soit complété pour empêcher le ciment de ressortir du boyau. »" }
    ],
    "pro-dd-st-008": [
      { "q": "À quelle hauteur du sol doivent être les crochets de la chaîne ?",
        "o": ["Entre 40 et 50 pouces", "Entre 66 et 72 pouces", "Entre 80 et 90 pouces", "Au ras du sol"], "a": 1,
        "e": "« Les crochets doivent être à maximum 72 pouces et minimum 66 pouces du sol pour s'assurer que la chaîne ''lousse'' ne sera jamais moins de 5 pieds du sol au centre. »" },
      { "q": "Une tige tombe vers un travailleur. La chaîne doit l'arrêter avant quel angle ?",
        "o": ["45 degrés", "60 degrés", "80 degrés", "90 degrés"], "a": 2,
        "e": "« La chaîne doit être ajustée de façon que les tiges ne puissent dépasser 80° si elles chutent vers un travailleur. »" }
    ],
    "pro-dd-st-009-1": [
      { "q": "À partir de quel pendage faut-il toujours faire une analyse de risque avant d'installer la foreuse?",
        "o": ["+ 15 degrés", "+ 20 degrés", "+ 21 degrés", "+ 30 degrés"], "a": 2,
        "e": "« Le pendage minimum qui nécessite une analyse est toujours de + 21 degrés. »" }
    ],
    "pro-dd-st-011": [
      { "q": "À partir de quelle pression d'eau poses-tu le frein manuel (brake tube) ?",
        "o": ["100 psi", "200 psi", "300 psi", "500 psi"], "a": 2,
        "e": "« Supérieur à 300 psi = installation du frein manuel (brake tube). »" },
      { "q": "Le câble se détend pendant que tu sors le tube. Qu'est-ce que ça veut dire ?",
        "o": ["Le treuil est brisé", "L'eau pousse sur le tube pendant sa sortie", "Le tube est vide", "Le câble est trop long"], "a": 1,
        "e": "« Un câble qui se détend signifie qu'une pression d'eau pousse sur le tube carottier dans sa sortie. »" }
    ],
    "pro-op-dd-012": [
      { "q": "On installe le système à distance entre le foreur et le trou. Distance minimale ?",
        "o": ["5 mètres", "10 mètres", "15 mètres (50 pieds)", "25 mètres"], "a": 2,
        "e": "« Installer le système à distance entre le foreur et le trou à forer à un minimum de 50' (15 mètres). »" }
    ]
  };
  var Q = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(HARD3).forEach(function (id) { Q[id] = (Q[id] || []).concat(HARD3[id]); });
})();
