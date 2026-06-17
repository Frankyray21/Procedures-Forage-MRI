/* ===========================================================================
   QUIZ — Questions TRÈS DIFFICILES (ITH + DD). Valeurs chiffrées et détails
   précis qui exigent d'avoir lu attentivement la procédure.
   Citations fidèles des PDF officiels. Fusion dans window.QUIZ_PROC.
   =========================================================================== */
(function () {
  var HARD3 = {
    /* ---------------- FORAGE DE PRODUCTION (ITH) ---------------- */
    "pro-op-ith-002": [
      { "q": "À quelle charge l'ancrage du mât utilisé pour le tire-fort est-il certifié ?",
        "o": ["1 000 kg", "1 500 kg", "2 500 kg", "5 000 kg"], "a": 2,
        "e": "« Ancrage du mât certifié 2500 kg. »" }
    ],
    "pro-op-ith-003": [
      { "q": "Sans la remorque, à l'aide d'une barre de tir, où est-il interdit de déplacer la foreuse ?",
        "o": ["Sur un plancher", "Dans la rampe", "Près du mur", "À l'horizontale"], "a": 1,
        "e": "« Il est interdit de déplacer la foreuse sans la remorque dans la rampe. »" }
    ],
    "pro-op-ith-004": [
      { "q": "Quelle distance minimale doit OBLIGATOIREMENT être respectée entre le mât et la console ?",
        "o": ["1 mètre", "1,5 mètre", "2 mètres", "3 mètres"], "a": 1,
        "e": "« Une distance minimum de 1.5 mètre entre le mât et la console doit obligatoirement être respectée. »" },
      { "q": "À quelle température résistent les boyaux tressés haute-température des compresseurs (CUBEX et surcompresseurs) ?",
        "o": ["400 degrés F", "600 degrés F", "800 degrés F", "1 000 degrés F"], "a": 2,
        "e": "« …une attention particulière doit être portée sur les boyaux tressés haute-température (800 degrés F) des compresseurs. »" },
      { "q": "À quelle hauteur le câble électrique doit-il être accroché au mur ?",
        "o": ["Au sol", "Au niveau de la poitrine (4 à 5 pieds du banc)", "Au-dessus de la tête", "Au niveau des genoux"], "a": 1,
        "e": "« Accrocher le câble électrique au mur au niveau de la poitrine (4 à 5 pieds du banc) pour éliminer tout contact avec des roches branlantes ou des véhicules motorisés. »" },
      { "q": "Quelle distance minimale doit être laissée entre la barricade à l'entrée du chantier et les premières pièces de matériel ?",
        "o": ["1 mètre", "2 mètres", "3 mètres (10 pieds)", "5 mètres"], "a": 2,
        "e": "« Une distance d'au moins 3 mètres (10 pieds) doit être laissée entre la barricade à l'entrée du chantier et les premières pièces de matériel. »" }
    ],
    "pro-op-ith-005": [
      { "q": "À partir de quelle longueur de forage planifiée faut-il installer un centralisateur pour stabiliser les tiges ?",
        "o": ["Plus de 20 pieds", "Plus de 30 pieds", "Plus de 40 pieds", "Plus de 60 pieds"], "a": 2,
        "e": "« Si les monteries sont planifiées pour plus de 40 pieds de forage, le foreur de M.R.I. doit installer un centralisateur pour stabiliser les tiges. »" },
      { "q": "Il est strictement interdit d'entrer dans la monterie de quelle dimension pour récupérer quoi que ce soit ?",
        "o": ["24 pouces", "28 pouces", "30 pouces", "36 pouces"], "a": 2,
        "e": "« Il est strictement interdit à un employé d'entrer dans la monterie de 30 pouces pour récupérer quoi que ce soit. »" }
    ],

    /* ---------------- FORAGE AU DIAMANT (DD) ---------------- */
    "pro-dd-st-002": [
      { "q": "Comment vérifier de façon sécuritaire si le tube carottier est vide ?",
        "o": ["Regarder à l'intérieur du tube", "Insérer une tige de métal d'un pied dans l'extrémité et la faire glisser", "Souffler de l'air dedans", "Le secouer près du visage"], "a": 1,
        "e": "« Ne jamais regarder dans le tube pour voir s'il est vide, insérer plutôt une tige de métal d'un pied dans l'extrémité et la faire glisser dans le tube. »" },
      { "q": "Pourquoi ne jamais faire de mouvement de va-et-vient avec le core knocker ?",
        "o": ["Pour ne pas bosser le tube", "Pour ne pas se coincer les doigts entre le core knocker et le tube", "Pour économiser de l'effort", "Pour ne pas user la carotte"], "a": 1,
        "e": "« Ne jamais effectuer de mouvement de va-et-vient avec le core knocker pour ne pas se coincer les doigts entre le core knocker et le tube. »" }
    ],
    "pro-dd-st-006": [
      { "q": "Quel outil est formellement interdit pour dévisser la water swivel ?",
        "o": ["La clé à molette", "Le pipe wrench", "La clé dynamométrique", "La clé à tube"], "a": 1,
        "e": "« En aucun cas le pipe wrench ne doit être utilisé pour dévisser la water swivel. »" }
    ],
    "pro-dd-st-007": [
      { "q": "Après le pompage, pendant combien de temps le boyau d'injection doit-il rester plié en deux (retenu par 2 ty-rap) ?",
        "o": ["6 heures", "12 heures", "24 heures (temps de cure)", "48 heures"], "a": 2,
        "e": "« …le boyau où l'on pompe le ciment doit être plié en deux et 2 ty-rap doivent le tenir plié jusqu'à ce que le temps de cure de 24 hrs soit complété pour empêcher le ciment de ressortir du boyau. »" }
    ],
    "pro-dd-st-008": [
      { "q": "À quelle hauteur du sol les crochets de la chaîne de retenue doivent-ils se situer ?",
        "o": ["Entre 40 et 50 pouces", "Entre 66 et 72 pouces", "Entre 80 et 90 pouces", "Au ras du sol"], "a": 1,
        "e": "« Les crochets doivent être à maximum 72 pouces et minimum 66 pouces du sol pour s'assurer que la chaîne ''lousse'' ne sera jamais moins de 5 pieds du sol au centre. »" },
      { "q": "La chaîne doit être ajustée pour que les tiges ne puissent dépasser quel angle si elles chutent vers un travailleur ?",
        "o": ["45°", "60°", "80°", "90°"], "a": 2,
        "e": "« La chaîne doit être ajustée de façon que les tiges ne puissent dépasser 80° si elles chutent vers un travailleur. »" }
    ],
    "pro-dd-st-009-1": [
      { "q": "Quel pendage minimum nécessite TOUJOURS une analyse de risque avant l'installation de la foreuse ?",
        "o": ["+ 15 degrés", "+ 20 degrés", "+ 21 degrés", "+ 30 degrés"], "a": 2,
        "e": "« Le pendage minimum qui nécessite une analyse est toujours de + 21 degrés. »" }
    ],
    "pro-dd-st-011": [
      { "q": "Au-delà de quelle pression d'eau doit-on installer le frein manuel (brake tube) ?",
        "o": ["100 psi", "200 psi", "300 psi", "500 psi"], "a": 2,
        "e": "« Supérieur à 300 psi = installation du frein manuel (brake tube). »" },
      { "q": "Que signifie un câble qui se détend pendant la récupération du tube en présence d'eau ?",
        "o": ["Le treuil est brisé", "Une pression d'eau pousse sur le tube carottier dans sa sortie", "Le tube est vide", "Le câble est trop long"], "a": 1,
        "e": "« Un câble qui se détend signifie qu'une pression d'eau pousse sur le tube carottier dans sa sortie. »" }
    ],
    "pro-op-dd-012": [
      { "q": "À quelle distance minimale le système de forage à distance doit-il être installé entre le foreur et le trou ?",
        "o": ["5 mètres", "10 mètres", "15 mètres (50 pieds)", "25 mètres"], "a": 2,
        "e": "« Installer le système à distance entre le foreur et le trou à forer à un minimum de 50' (15 mètres). »" }
    ]
  };
  var Q = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(HARD3).forEach(function (id) { Q[id] = (Q[id] || []).concat(HARD3[id]); });
})();
