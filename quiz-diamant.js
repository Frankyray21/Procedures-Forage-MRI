/* ===========================================================================
   QUIZ — FORAGE AU DIAMANT (par procédure). Mêmes règles que quiz_proc.js :
   { q, o:[options], a:index, e:"citation fidèle de la procédure" }.
   Chaque réponse cite le texte du PDF officiel. Aucune interprétation.
   =========================================================================== */
(function () {
  var DD = {
    "pro-dd-st-001": [
      { "q": "Avant de monter le core barrel, que faut-il vérifier sur le reaming shell, et avec quoi ?",
        "o": ["Rien de particulier", "Son usure, avec la jauge à shell (remplacer si nécessaire)", "Sa couleur", "Sa longueur avec un ruban"], "a": 1,
        "e": "« Vérifier le reaming shell avec la jauge à shell pour vérifier l'usure et remplacer si nécessaire. »" },
      { "q": "Avant de visser la tige de forage de 3 m avec le water swivel, quelle précaution est très importante ?",
        "o": ["Chauffer les filets", "Bien graisser les filets", "Serrer au pipe wrench", "Mouiller la tige"], "a": 1,
        "e": "« Mettre la tige de forage de 3 mètres avec le water swivel. Il est très important de bien graisser les filets. »" },
      { "q": "Pourquoi forer au complet le core barrel de 1,5 m et la tige de 3 m ?",
        "o": ["Pour user le taillant", "Pour avoir l'espace nécessaire pour mettre le core barrel de 3 mètres", "Pour vider le tube", "Aucune raison"], "a": 1,
        "e": "« Forer au complet le core barrel de 1,5 mètre et la tige de 3 mètres pour s'assurer d'avoir l'espace nécessaire pour mettre le core barrel de 3 mètres. »" }
    ],
    "pro-dd-st-002": [
      { "q": "Comment vider le tube carottier sans risque pour les mains ?",
        "o": ["En tenant le tube par l'avant", "Ne jamais s'exposer les mains en avant du tube carottier", "En regardant dans le tube", "En le secouant"], "a": 1,
        "e": "« Vider le tube de manière à ne jamais s'exposer les mains en avant du tube carottier. »" },
      { "q": "Pour casser une carotte avec le marteau, qu'est-il interdit de faire ?",
        "o": ["La poser dans la rangée", "Tenir la roche dans les mains pour la casser", "Utiliser un marteau", "La casser à la fin d'une rangée"], "a": 1,
        "e": "« Ne jamais tenir la rocher dans les mains pour la casser avec le marteau. »" },
      { "q": "Comment vérifier si le tube carottier est vide ?",
        "o": ["Regarder dans le tube", "Insérer une tige de métal d'un pied dans l'extrémité, sans jamais regarder dans le tube", "Souffler dedans", "Le peser"], "a": 1,
        "e": "« Ne jamais regarder dans le tube pour voir s'il est vide, insérer plutôt une tige de métal d'un pied dans l'extrémité et la faire glisser dans le tube. »" },
      { "q": "Peut-on frapper directement sur le tube avec le marteau ?",
        "o": ["Oui, fort", "Non, jamais (pour ne pas le bosser) — utiliser l'anneau", "Oui si bloqué", "Oui avec une masse"], "a": 1,
        "e": "« Ne jamais frapper directement sur le tube avec le marteau pour ne pas le bosser. »" }
    ],
    "pro-dd-st-003": [
      { "q": "Comment transporter les grosses pièces de bois pour fabriquer le plancher ?",
        "o": ["Seul, rapidement", "Toujours à deux", "Avec la foreuse", "Avec la scie à chaîne"], "a": 1,
        "e": "« TOUJOURS TRANSPORTER LES GROSSES PIÈCES DE BOIS À DEUX. »" },
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
      { "q": "Pendant le mouvement du treuil, qui peut se trouver dans la zone de travail ?",
        "o": ["L'aide-foreur", "Personne — la porte d'accès doit être fermée", "Le superviseur", "Deux travailleurs"], "a": 1,
        "e": "« Aucun travailleur ne doit se trouver à l'intérieur de la zone de travail lorsqu'il y a mouvement du treuil. La porte d'accès à la zone de travail doit être fermée. »" },
      { "q": "Avant de dévisser la water swivel avec la foreuse, quelle vitesse mettre ?",
        "o": ["La marche arrière", "La première vitesse", "La vitesse maximale", "Le neutre"], "a": 1,
        "e": "« Mettre la transmission en première vitesse avant de dévisser la water swivell. »" }
    ],
    "pro-dd-st-006": [
      { "q": "Quel outil ne doit en aucun cas servir à dévisser la water swivel ?",
        "o": ["La clé ¾", "Le pipe wrench", "La foreuse", "L'overshot"], "a": 1,
        "e": "« EN AUCUN CAS LE PIPE WRENCH NE DOIT ÊTRE UTILISÉ POUR DÉVISSER LA WATER SWIVEL. »" },
      { "q": "Comment faire descendre l'overshot dans les tiges ?",
        "o": ["Le plus vite possible", "Pas trop rapidement, pour garder une tension sur le câble", "En le lâchant", "Sans eau"], "a": 1,
        "e": "« Ne pas faire descendre trop rapidement pour garder une tension sur le câble. »" },
      { "q": "Avant de manipuler le câble Wire line, que faut-il faire ?",
        "o": ["Rien", "Une inspection visuelle ; le retirer s'il est endommagé", "Le graisser", "Le couper"], "a": 1,
        "e": "« Une inspection visuelle doit être faite avant la manipulation du câble Wire line. Si le câble est endommagé, il est obligatoire de retirer ce dernier. »" }
    ],
    "pro-dd-st-007": [
      { "q": "Quel masque respiratoire est obligatoire pour la cimentation ?",
        "o": ["Un masque jetable", "Le masque powerflow", "Aucun", "Des lunettes seulement"], "a": 1,
        "e": "« ÉPI OBLIGATOIRES : […] Masque powerflow […] » (avec fit test pour masque powerflow)." },
      { "q": "Avec quoi huile-t-on les composantes en contact avec le ciment ?",
        "o": ["De l'huile à moteur", "De l'huile végétale, au pulvérisateur", "De l'eau", "De la graisse"], "a": 1,
        "e": "« Bien huiler avec de l'huile végétale avec un pulvérisateur toutes les composantes du mélangeur et de la pompe qui seront en contact avec le ciment. »" },
      { "q": "Pourquoi la pompe doit-elle être propre et exempte de résidus de ciment ?",
        "o": ["Pour l'esthétique", "Car les résidus durcis peuvent boucher la pompe lors du pompage", "Pour le poids", "Aucune raison"], "a": 1,
        "e": "« Les résidus de ciment durcis peuvent boucher la pompe lors du pompage. »" },
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
        "e": "« Le pendage minimum qui nécessite une analyse est de +20 Degrés. »" },
      { "q": "Avant d'installer la foreuse pour un trou ascendant, que faut-il faire ?",
        "o": ["Rien", "Une analyse considérant les risques (travail en hauteur, bris)", "Forer directement", "Appeler le client"], "a": 1,
        "e": "« Une analyse considérant ces risques doit être effectuée avant que la foreuse ne soit installée. »" }
    ],
    "pro-dd-st-011": [
      { "q": "Pression d'eau lue entre 200 et 300 psi : que faire ?",
        "o": ["Arrêter tout", "Poursuite des travaux avec vigilance", "Installer le frein manuel", "Évacuer"], "a": 1,
        "e": "« Entre 200 et 300 psi = poursuite des travaux avec vigilance. »" },
      { "q": "Pression d'eau supérieure à 300 psi : que faire ?",
        "o": ["Continuer normalement", "Installer le frein manuel (brake tube)", "Augmenter la pompe", "Rien"], "a": 1,
        "e": "« Supérieur à 300 psi = installation du frein manuel (brake tube). »" },
      { "q": "Que faut-il maintenir tout au long de la récupération du tube ?",
        "o": ["La pompe à l'arrêt", "Le câble tendu (un câble qui se détend signale une pression d'eau)", "La porte ouverte", "Le frein relâché"], "a": 1,
        "e": "« S'assurer que le câble reste tendu tout au long de la récupération du tube. Un câble qui se détend signifie qu'une pression d'eau… »" }
    ],
    "pro-op-dd-005": [
      { "q": "Avant de démonter le clam/chuck, dans quelle position mettre les manettes ?",
        "o": ["Ouvertes", "Fermées, pour que les ressorts soient étirés au maximum", "Au neutre", "Peu importe"], "a": 1,
        "e": "« S'assurer que les manettes pour barrer le clam ou le chuck (mandrin) soient en position fermée pour que les ressorts soient étirés au maximum. »" },
      { "q": "Quelle procédure de sécurité avant le démontage ?",
        "o": ["Aucune", "Cadenasser la foreuse (procédure de cadenassage)", "Vider le tube", "Graisser"], "a": 1,
        "e": "« Cadenasser la foreuse en suivant la procédure de cadenassage. »" },
      { "q": "Comment dévisser les derniers boulons ½ du couvercle ?",
        "o": ["Tous d'un coup", "Seulement 1 tour à la fois, en suivant l'ordre", "Au pipe wrench", "Au hasard"], "a": 1,
        "e": "« Il est important de dévisser les boulons seulement 1 tour à la fois, en suivant l'ordre sur la photo, les ressorts sont écrasés de 1/4 pouces. »" }
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
      { "q": "Dans quelles conditions la DR-600-MU peut-elle être déplacée par ses propres moyens ?",
        "o": ["Partout, même dans la rampe", "Seulement sur de courtes distances sans pente — interdit dans la rampe", "Uniquement en descendant", "Sans aucune restriction"], "a": 1,
        "e": "« La DR-600-MU peut être déplacée par ses propres moyens seulement sur de courtes distances sans pente » et « Il est strictement interdit de déplacer la DR-600 par ses propres moyens dans la rampe. »" },
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
