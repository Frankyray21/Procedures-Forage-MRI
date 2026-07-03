/* ===========================================================================
   QUIZ — FORAGE AU DIAMANT (par procédure). Mêmes règles que quiz_proc.js :
   { q, o:[options], a:index, e:"citation fidèle de la procédure" }.
   Chaque réponse cite le texte du PDF officiel. Aucune interprétation.
   =========================================================================== */
(function () {
  var DD = {
    "pro-dd-st-001": [
      { "q": "Avant de visser la tige de forage de 3 m avec le water swivel, quelle précaution est très importante ?",
        "o": ["Chauffer les filets", "Bien graisser les filets", "Serrer au pipe wrench", "Mouiller la tige"], "a": 1,
        "e": "« Mettre la tige de forage de 3 mètres avec le water swivel. Il est très important de bien graisser les filets. »" }    ],
    "pro-dd-st-002": [
      { "q": "Comment vérifier si le tube carottier est vide ?",
        "o": ["Regarder dans le tube", "Insérer une tige de métal d'un pied dans l'extrémité, sans jamais regarder dans le tube", "Souffler dedans", "Le peser"], "a": 1,
        "e": "« Ne jamais regarder dans le tube pour voir s'il est vide, insérer plutôt une tige de métal d'un pied dans l'extrémité et la faire glisser dans le tube. »" }    ],
    "pro-dd-st-003": [
      { "q": "À quelle distance place-t-on les 8''X8'' et les 6''X6'' ?",
        "o": ["Tous à 24''", "8''X8'' à 48'' et 6''X6'' à 36''", "Tous à 48''", "Au hasard"], "a": 1,
        "e": "« Placer les 8''X8'' à une distance de 48'', et les 6''X6'' à une distance de 36''. »" },
      { "q": "Quel niveau utilise-t-on pour mettre le plancher au niveau ?",
        "o": ["Un niveau de 24''", "Un niveau de 48''", "Un fil à plomb", "Aucun"], "a": 1,
        "e": "« Placer le plancher au niveau en utilisant un niveau de 48'' et un morceau de 3''X8'' de 8 pieds minimum... »" }
    ],
    "pro-dd-st-004": [
      { "q": "Quel outil est INTERDIT pour dévisser la water swivel ?",
        "o": ["La clé dynamométrique", "Le pipe wrench", "La tête de la foreuse", "La clé à molette"], "a": 1,
        "e": "« IL EST INTERDIT D'UTILISER UN PIPE WRENCH POUR DÉVISSER LA WATER SWIVELL. »" },
      { "q": "Avant de dévisser la water swivel avec la foreuse, quelle vitesse mettre ?",
        "o": ["La marche arrière", "La première vitesse", "La vitesse maximale", "Le neutre"], "a": 1,
        "e": "« Mettre la transmission en première vitesse avant de dévisser la water swivell. »" }
    ],
    "pro-dd-st-006": [
      { "q": "Quel outil ne doit en aucun cas servir à dévisser la water swivel ?",
        "o": ["La clé ¾", "Le pipe wrench", "La foreuse", "L'overshot"], "a": 1,
        "e": "« EN AUCUN CAS LE PIPE WRENCH NE DOIT ÊTRE UTILISÉ POUR DÉVISSER LA WATER SWIVEL. »" },
    ],
    "pro-dd-st-007": [
      { "q": "Quel masque respiratoire est obligatoire pour la cimentation ?",
        "o": ["Un masque jetable", "Le masque powerflow", "Aucun", "Des lunettes seulement"], "a": 1,
        "e": "« ÉPI OBLIGATOIRES : […] Masque powerflow […] » (avec fit test pour masque powerflow)." },
      { "q": "Avec quoi huile-t-on les composantes en contact avec le ciment ?",
        "o": ["De l'huile à moteur", "De l'huile végétale, au pulvérisateur", "De l'eau", "De la graisse"], "a": 1,
        "e": "« Bien huiler avec de l'huile végétale avec un pulvérisateur toutes les composantes du mélangeur et de la pompe qui seront en contact avec le ciment. »" },
      { "q": "Quel type de ciment est utilisé ?",
        "o": ["Type 10", "Type 30 HE ou GU", "Type 50", "Mortier"], "a": 1,
        "e": "« Ciment type 30 HE ou GU. »" }
    ],
    "pro-dd-st-008": [
      { "q": "Quelle profondeur et quelle hauteur pour le trou du eye bolt au mur ?",
        "o": ["6 po, au sol", "18 po de profond, à ± 5 pi du plancher", "1 m, au plafond", "12 po, à 2 pi"], "a": 1,
        "e": "« Au mur, situer le centre du support et faire un trou de 18 po de profond avec la foreuse à percussion électrique à ± 5 pi du plancher. »" },
      { "q": "Quel angle doit avoir le support de tiges ?",
        "o": ["45°", "Entre 75° et 80°", "90°", "Entre 20° et 30°"], "a": 1,
        "e": "« S'assurer d'avoir un angle entre 75° et 80°. »" },
      { "q": "Comment placer les tiges dans le support ?",
        "o": ["En vrac", "En quinconce, par rangée à partir de la gauche, appuyées sur la barre transversale du fond", "Debout", "Sur les côtés"], "a": 1,
        "e": "« Placer les tiges dans le support en quinconce […] par rangée à partir de la gauche » et « S'assurer d'appuyer les tiges sur la barre transversale du fond et non sur les côtés. »" }
    ],
    "pro-dd-st-009-1": [
      { "q": "Pour la STM-1500 / DR-600 #2907, quel pendage minimum nécessite une analyse ?",
        "o": ["+ 10 degrés", "+ 21 degrés", "+ 45 degrés", "+ 5 degrés"], "a": 1,
        "e": "« Le pendage minimum qui nécessite une analyse est toujours de + 21 degrés. »" },
      { "q": "Quels boulons sont nécessaires (matériel) ?",
        "o": ["6 boulons ¾", "9 nouveaux boulons ½ grade #8 de 2''¼", "4 boulons 1''", "Aucun"], "a": 1,
        "e": "« 9 nouveaux boulons ½ grade #8 de 2''¼. »" },
      { "q": "Pour la STM-1500 AVEC lift kit, quel ajustement ?",
        "o": ["Ancrage en bas", "Plancher de 24 pouces", "Aucun", "Plancher de 48 pouces"], "a": 1,
        "e": "« STM 1500 AVEC lift kit : Plancher de 24 pouces. »" }
    ],
    "pro-dd-st-009-2": [
      { "q": "Pour la DR-600 #2923, quel pendage minimum nécessite une analyse ?",
        "o": ["+ 20 degrés", "+ 21 degrés", "+ 30 degrés", "+ 10 degrés"], "a": 0,
        "e": "« Le pendage minimum qui nécessite une analyse est de +20 Degrés. »" }    ],
    "pro-dd-st-011": [
      { "q": "Pression d'eau lue entre 200 et 300 psi : que faire ?",
        "o": ["Arrêter tout", "Poursuite des travaux avec vigilance", "Installer le frein manuel", "Évacuer"], "a": 1,
        "e": "« Entre 200 et 300 psi = poursuite des travaux avec vigilance. »" },
    ],
    "pro-op-dd-005": [
      { "q": "Avant de démonter le clam/chuck, dans quelle position mettre les manettes ?",
        "o": ["Ouvertes", "Fermées, pour que les ressorts soient étirés au maximum", "Au neutre", "Peu importe"], "a": 1,
        "e": "« S'assurer que les manettes pour barrer le clam ou le chuck (mandrin) soient en position fermée pour que les ressorts soient étirés au maximum. »" },
    ],
    "pro-op-dd-012": [
      { "q": "Quels articles du Règlement encadrent le forage à distance au diamant ?",
        "o": ["Les articles 12 et 13", "Les articles 439 et 440", "L'article 100", "Aucun"], "a": 1,
        "e": "« Les articles 439 et 440 du Règlement sur la Santé et la Sécurité du travail dans les Mines prévoient… »" },
      { "q": "Distance minimale interdite de forer d'un fond de trou chargé et sauté ?",
        "o": ["150 mm (5,9 po)", "1,5 m", "10 cm", "1 m"], "a": 0,
        "e": "« Il est interdit de forer à une distance inférieure à : 1° 150 mm (5,9 po) d'un fond de trou qui a été chargé et qui a sauté. »" },
      { "q": "Si la présence d'explosifs ne peut être déterminée, où débuter le trou le plus proche — sinon ?",
        "o": ["À 50 cm", "À 1,5 m de la roche abattue, OU forer à distance", "Directement", "À 7 m"], "a": 1,
        "e": "« Le départ du trou le plus proche doit être à 1,5 mètre de la roche abattue, OU le forage doit se faire à distance. »" }
    ],
    "pro-op-dd-013": [
      { "q": "Où doit-on toujours se tenir lors de tout mouvement de la foreuse ?",
        "o": ["Devant la foreuse", "Dans la zone d'exclusion", "Sur le plancher", "Près du mur"], "a": 1,
        "e": "« TOUJOURS ÊTRE DANS LA ZONE D'EXCLUSION LORS DE TOUT MOUVEMENT DE LA FOREUSE. »" },
      { "q": "Qu'est-ce que la « zone d'exclusion » ?",
        "o": ["La zone autour du trou", "La zone du côté de la barrière (clôture et porte) où l'opérateur et les contrôles sont situés", "La zone interdite à tous", "Le rack à rod"], "a": 1,
        "e": "« On entend par 'ZONE D'EXCLUSION', la zone du côté de la barrière (clôture et porte) où l'opérateur et les contrôles sont situés. »" },
      { "q": "Combien de tiges minimum garder sous la foreuse si on en utilise pour la rouler ?",
        "o": ["Une", "Au moins deux (2)", "Trois minimum", "Aucune"], "a": 1,
        "e": "« Toujours s'assurer d'avoir au moins deux (2) tiges sous la foreuse si on en utilise pour rouler la foreuse. »" }
    ],
    "ss-dd-st-001": [
      { "q": "À quelle distance minimale de la tour de la foreuse positionner le dead man ?",
        "o": ["0,5 m", "1,5 mètre", "3 m", "5 m"], "a": 1,
        "e": "« Le dead man doit être positionné à un minimum de 1,5 mètre de la tour de la foreuse, à côté du rack à rod… »" },
      { "q": "De combien de pièces se compose l'inter-verrouillage « FORTRESS » ?",
        "o": ["Une", "Deux : la coulisse et la serrure", "Trois", "Quatre"], "a": 1,
        "e": "« Le système d'interverrouillage « FORTRESS » comprend 2 pièces : la coulisse et la serrure. »" }
    ],
    "dr600-op-002": [
      { "q": "Que faut-il savoir si les planétaires (engagement des roues) sont désengagés ?",
        "o": ["La foreuse freine seule", "Il n'y a AUCUN frein sur la foreuse", "Les roues se bloquent", "Le moteur s'arrête"], "a": 1,
        "e": "« ATTENTION, IL N'Y A AUCUN FREIN SUR LA FOREUSE SI LES PLANÉTAIRES SONT DÉSENGAGÉS. »" },
      { "q": "Combien d'arrêts d'urgence la DR-600-MU comporte-t-elle (à désactiver avant le déplacement) ?",
        "o": ["Un seul", "3 au total (un sur chaque boîtier électrique et un « Pull cord »)", "Deux", "Aucun"], "a": 1,
        "e": "« Assurez-vous que tous les arrêts d'urgence sont désactivés […]. Il y en a 3 au total : Un sur chaque boîtier électrique et un « Pull cord » qu'on réactive avec le bouton bleu. »" }
    ],
    "std-dd-installation": [
      { "q": "Combien d'extincteur faut-il à l'entrée du site de forage ?",
        "o": ["Aucun", "1 extincteur à l'entrée du site", "2 à l'entrée", "Selon le client"], "a": 1,
        "e": "« 1 extincteur à l'entrée du site. »" },
      { "q": "De quel côté sont toujours les contrôles de la STM ?",
        "o": ["À gauche", "À droite", "Au centre", "À l'arrière"], "a": 1,
        "e": "« Les contrôles de STM sont toujours à droite. »" }
    ]
  };
  var Q = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(DD).forEach(function (id) { Q[id] = (Q[id] || []).concat(DD[id]); });
})();
