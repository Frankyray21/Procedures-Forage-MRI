/* ===========================================================================
   QUIZ — FORAGE AU DIAMANT (par procédure). Mêmes règles que quiz_proc.js :
   { q, o:[options], a:index, e:"citation fidèle de la procédure" }.
   Chaque réponse cite le texte du PDF officiel. Aucune interprétation.
   =========================================================================== */
(function () {
  var DD = {
    "pro-dd-st-001": [
      { "q": "Tu vas visser la tige de 3 m avec le water swivel. Quoi faire avant ? C'est très important.",
        "o": ["Chauffer les filets", "Graisser les filets", "Serrer au pipe wrench", "Mouiller la tige"], "a": 1,
        "e": "« Mettre la tige de forage de 3 mètres avec le water swivel. Il est très important de bien graisser les filets. »" }    ],
    "pro-dd-st-002": [
      { "q": "Comment savoir si le tube carottier est vide ?",
        "o": ["Regarder dans le tube", "Glisser une tige de métal d'un pied dans le bout, sans regarder dans le tube", "Souffler dedans", "Le peser"], "a": 1,
        "e": "« Ne jamais regarder dans le tube pour voir s'il est vide, insérer plutôt une tige de métal d'un pied dans l'extrémité et la faire glisser dans le tube. »" }    ],
    "pro-dd-st-003": [
      { "q": "À quelle distance mets-tu les 8''X8'' et les 6''X6'' ?",
        "o": ["Les deux à 24''", "Les 8''X8'' à 48'' et les 6''X6'' à 36''", "Les deux à 48''", "N'importe où"], "a": 1,
        "e": "« Placer les 8''X8'' à une distance de 48'', et les 6''X6'' à une distance de 36''. »" },
      { "q": "Quel niveau sert à mettre le plancher bien droit ?",
        "o": ["Un niveau de 24''", "Un niveau de 48''", "Un fil à plomb", "Aucun"], "a": 1,
        "e": "« Placer le plancher au niveau en utilisant un niveau de 48'' et un morceau de 3''X8'' de 8 pieds minimum... »" }
    ],
    "pro-dd-st-004": [
      { "q": "Pour dévisser la water swivel, quel outil est interdit ?",
        "o": ["La clé dynamométrique", "Le pipe wrench", "La tête de la foreuse", "La clé à molette"], "a": 1,
        "e": "« IL EST INTERDIT D'UTILISER UN PIPE WRENCH POUR DÉVISSER LA WATER SWIVELL. »" },
      { "q": "Tu vas dévisser la water swivel avec la foreuse. Quelle vitesse mets-tu ?",
        "o": ["La marche arrière", "La première vitesse", "La vitesse maximale", "Le neutre"], "a": 1,
        "e": "« Mettre la transmission en première vitesse avant de dévisser la water swivell. »" }
    ],
    "pro-dd-st-006": [
      { "q": "Quel outil ne doit en aucun cas servir à dévisser la water swivel ?",
        "o": ["La clé ¾", "Le pipe wrench", "La foreuse", "L'overshot"], "a": 1,
        "e": "« EN AUCUN CAS LE PIPE WRENCH NE DOIT ÊTRE UTILISÉ POUR DÉVISSER LA WATER SWIVEL. »" },
    ],
    "pro-dd-st-007": [
      { "q": "Pour faire le ciment, quel masque faut-il porter ?",
        "o": ["Un masque jetable", "Le masque powerflow", "Aucun masque", "Juste des lunettes"], "a": 1,
        "e": "« ÉPI OBLIGATOIRES : […] Masque powerflow […] » (avec fit test pour masque powerflow)." },
      { "q": "Avec quoi huile-t-on les pièces qui touchent le ciment ?",
        "o": ["De l'huile à moteur", "De l'huile végétale, au pulvérisateur", "De l'eau", "De la graisse"], "a": 1,
        "e": "« Bien huiler avec de l'huile végétale avec un pulvérisateur toutes les composantes du mélangeur et de la pompe qui seront en contact avec le ciment. »" },
      { "q": "Quel ciment utilise-t-on ?",
        "o": ["Type 10", "Type 30 HE ou GU", "Type 50", "Mortier"], "a": 1,
        "e": "« Ciment type 30 HE ou GU. »" }
    ],
    "pro-dd-st-008": [
      { "q": "Tu fais le trou du eye bolt dans le mur. Quelle profondeur et quelle hauteur ?",
        "o": ["6 po de profond, au sol", "18 po de profond, à 5 pi du plancher", "1 m de profond, au plafond", "12 po de profond, à 2 pi"], "a": 1,
        "e": "« Au mur, situer le centre du support et faire un trou de 18 po de profond avec la foreuse à percussion électrique à ± 5 pi du plancher. »" },
      { "q": "Le support de tiges doit être penché à quel angle ?",
        "o": ["45 degrés", "Entre 75 et 80 degrés", "90 degrés", "Entre 20 et 30 degrés"], "a": 1,
        "e": "« S'assurer d'avoir un angle entre 75° et 80°. »" },
      { "q": "Comment ranges-tu les tiges dans le support ?",
        "o": ["En vrac", "En quinconce, rangée par rangée depuis la gauche, appuyées sur la barre du fond", "Debout", "Sur les côtés"], "a": 1,
        "e": "« Placer les tiges dans le support en quinconce […] par rangée à partir de la gauche » et « S'assurer d'appuyer les tiges sur la barre transversale du fond et non sur les côtés. »" }
    ],
    "pro-dd-st-009-1": [
      { "q": "Quels boulons faut-il utiliser?",
        "o": ["6 boulons de ¾", "9 boulons neufs de ½, grade 8, de 2 ¼ po", "4 boulons de 1 po", "Aucun boulon"], "a": 1,
        "e": "« 9 nouveaux boulons ½ grade #8 de 2''¼. »" },
      { "q": "Sur la STM-1500 avec lift kit, que faut-il faire?",
        "o": ["Ancrer en bas", "Mettre un plancher de 24 pouces", "Rien à faire", "Mettre un plancher de 48 pouces"], "a": 1,
        "e": "« STM 1500 AVEC lift kit : Plancher de 24 pouces. »" }
    ],
    "pro-dd-st-009-2": [
      { "q": "Sur la foreuse DR-600 #2923, à partir de quel angle vers le haut faut-il faire une analyse ?",
        "o": ["+ 20 degrés", "+ 21 degrés", "+ 30 degrés", "+ 10 degrés"], "a": 0,
        "e": "« Le pendage minimum qui nécessite une analyse est de +20 Degrés. »" }    ],
    "pro-dd-st-011": [
      { "q": "L'eau monte entre 200 et 300 psi. Que fais-tu ?",
        "o": ["Tu arrêtes tout", "Tu continues, mais avec prudence", "Tu poses le frein manuel (brake tube)", "Tu sors du secteur"], "a": 1,
        "e": "« Entre 200 et 300 psi = poursuite des travaux avec vigilance. »" },
    ],
    "pro-op-dd-005": [
      { "q": "Avant de démonter le clam ou le chuck, dans quelle position mets-tu les manettes ?",
        "o": ["Ouvertes", "Fermées, pour tendre les ressorts au maximum", "Au neutre", "Peu importe"], "a": 1,
        "e": "« S'assurer que les manettes pour barrer le clam ou le chuck (mandrin) soient en position fermée pour que les ressorts soient étirés au maximum. »" },
    ],
    "pro-op-dd-012": [
      { "q": "Quels articles de la loi parlent du forage à distance ?",
        "o": ["Les articles 12 et 13", "Les articles 439 et 440", "L'article 100", "Aucun article"], "a": 1,
        "e": "« Les articles 439 et 440 du Règlement sur la Santé et la Sécurité du travail dans les Mines prévoient… »" },
      { "q": "Un trou chargé a sauté. On ne peut pas forer trop près de son fond. Distance minimale interdite ?",
        "o": ["150 mm (5,9 po)", "1,5 m", "10 cm", "1 m"], "a": 0,
        "e": "« Il est interdit de forer à une distance inférieure à : 1° 150 mm (5,9 po) d'un fond de trou qui a été chargé et qui a sauté. »" },
      { "q": "On ne sait pas s'il reste des explosifs. Où commencer le trou le plus proche ?",
        "o": ["À 50 cm", "À 1,5 m de la roche cassée, ou forer à distance", "Juste à côté", "À 7 m"], "a": 1,
        "e": "« Le départ du trou le plus proche doit être à 1,5 mètre de la roche abattue, OU le forage doit se faire à distance. »" }
    ],
    "pro-op-dd-013": [
      { "q": "Quand la foreuse bouge, où dois-tu rester ?",
        "o": ["Devant la foreuse", "Dans la zone d'exclusion", "Sur le plancher", "Près du mur"], "a": 1,
        "e": "« TOUJOURS ÊTRE DANS LA ZONE D'EXCLUSION LORS DE TOUT MOUVEMENT DE LA FOREUSE. »" },
      { "q": "C'est quoi la « zone d'exclusion » ?",
        "o": ["La zone autour du trou", "Le côté de la barrière où sont l'opérateur et les commandes", "La zone interdite à tous", "Le rack à tiges"], "a": 1,
        "e": "« On entend par 'ZONE D'EXCLUSION', la zone du côté de la barrière (clôture et porte) où l'opérateur et les contrôles sont situés. »" },
      { "q": "Tu mets des tiges sous la foreuse pour la rouler. Combien au minimum ?",
        "o": ["Une", "Au moins deux (2)", "Au moins trois", "Aucune"], "a": 1,
        "e": "« Toujours s'assurer d'avoir au moins deux (2) tiges sous la foreuse si on en utilise pour rouler la foreuse. »" }
    ],
    "ss-dd-st-001": [
      { "q": "À quelle distance de la tour place-t-on le dead man, au minimum ?",
        "o": ["0,5 m", "1,5 m", "3 m", "5 m"], "a": 1,
        "e": "« Le dead man doit être positionné à un minimum de 1,5 mètre de la tour de la foreuse, à côté du rack à rod… »" },
      { "q": "Le système FORTRESS a combien de pièces ?",
        "o": ["Une", "Deux : coulisse et serrure", "Trois", "Quatre"], "a": 1,
        "e": "« Le système d'interverrouillage « FORTRESS » comprend 2 pièces : la coulisse et la serrure. »" }
    ],
    "dr600-op-002": [
      { "q": "Les planétaires (l'engagement des roues) sont désengagés. Que se passe-t-il ?",
        "o": ["La foreuse freine toute seule", "La foreuse n'a AUCUN frein", "Les roues se bloquent", "Le moteur s'arrête"], "a": 1,
        "e": "« ATTENTION, IL N'Y A AUCUN FREIN SUR LA FOREUSE SI LES PLANÉTAIRES SONT DÉSENGAGÉS. »" },
      { "q": "Avant de déplacer la foreuse, combien d'arrêts d'urgence faut-il désactiver ?",
        "o": ["Un seul", "3 en tout : un sur chaque boîtier électrique et un « Pull cord »", "Deux", "Aucun"], "a": 1,
        "e": "« Assurez-vous que tous les arrêts d'urgence sont désactivés […]. Il y en a 3 au total : Un sur chaque boîtier électrique et un « Pull cord » qu'on réactive avec le bouton bleu. »" }
    ],
    "std-dd-installation": [
      { "q": "Combien d'extincteurs faut-il à l'entrée du site ?",
        "o": ["Aucun", "Un seul", "Deux", "Ça dépend du client"], "a": 1,
        "e": "« 1 extincteur à l'entrée du site. »" },
      { "q": "Les contrôles de la STM sont de quel côté ?",
        "o": ["À gauche", "À droite", "Au centre", "À l'arrière"], "a": 1,
        "e": "« Les contrôles de STM sont toujours à droite. »" }
    ]
  };
  var Q = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(DD).forEach(function (id) { Q[id] = (Q[id] || []).concat(DD[id]); });
})();
