/* ===========================================================================
   QUIZ — Nouvelles procédures secteur ITH (PRO-ITH-017, bits CUBEX, PIPE-TUB,
   STOPEMASTER 001/002/003/004, foreuse V-KING). Citations fidèles des PDF.
   =========================================================================== */
(function () {
  var Q = {
    "pro-ith-017": [
      { "q": "Lors des déplacements de tiges, à quelle distance minimale le soudeur et les travailleurs du niveau supérieur doivent-ils se tenir ?",
        "o": ["1 mètre", "2 mètres", "3 mètres", "5 mètres"], "a": 2,
        "e": "« …doivent obligatoirement se tenir à une distance minimum de 3 mètres. »" },
      { "q": "Quelle pression doit indiquer le cadran des mâchoires hydrauliques pour une cédule 80 ?",
        "o": ["Entre 2000 et 3000 psi", "Entre 8800 et 8900 psi", "Entre 5000 et 6000 psi", "Maximum 1000 psi"], "a": 1,
        "e": "« La pression sur le cadran doit être entre 8800 psi et 8900 psi pour une cédule 80. »" },
      { "q": "Quelle est la capacité maximale de l'équipement de forage (CUBEX) pour ces travaux ?",
        "o": ["10 000 lbs", "15 000 lbs", "25 000 lbs", "40 000 lbs"], "a": 2,
        "e": "« La capacité maximale de l'équipement de forage (CUBEX) est de 25 000 lbs. Ce sont les ''SLIP PLATES'' qui déterminent ce maximum. »" },
      { "q": "Qui peut communiquer ensemble pendant l'opération ?",
        "o": ["Toute l'équipe", "Seulement le foreur et le soudeur, sans intermédiaire", "Le superviseur et le foreur", "N'importe qui par radio"], "a": 1,
        "e": "« Les deux seules personnes à communiquer ensemble doivent être le foreur et le soudeur. Aucune personne ne doit faire l'intermédiaire. »" },
      { "q": "Quelle est la capacité minimale de l'élingue servant au levage de la charge ?",
        "o": ["500 kg", "Une tonne", "2 tonnes", "5 tonnes"], "a": 1,
        "e": "« L'élingue servant au levage de la charge doit avoir une capacité minimale d'une tonne et elle doit être accrochée à une plaque d'ancrage fixée au toit… »" }
    ],
    "pro-op-001": [
      { "q": "Après avoir aligné le SHANK dans le marteau, de combien de tours minimum faut-il visser la bit ?",
        "o": ["Un demi-tour", "Un minimum de 2 tours", "5 tours", "Jusqu'au blocage seulement"], "a": 1,
        "e": "« Aligner le SHANK dans le bout du marteau, l'insérer le plus loin possible et visser la bit un minimum de 2 tours. »" },
      { "q": "Entre quelles pressions faut-il serrer la bit ?",
        "o": ["Entre 1000 et 2000 psi", "Entre 3000 et 4000 psi", "Maximum 500 psi", "Plus de 5000 psi"], "a": 0,
        "e": "« Serrer la bit avec un minimum de 1000 psi et pas plus de 2000 psi. »" },
      { "q": "Que faut-il faire aux filets du driver sub avant l'installation ?",
        "o": ["Les nettoyer à l'air", "Bien les graisser", "Les chauffer", "Rien"], "a": 1,
        "e": "« Bien graisser les filets du driver sub. »" }
    ],
    "pro-pt-001": [
      { "q": "Quelle est la longueur du bras télescopique du PIPE-TUB ?",
        "o": ["6 pi (1,8 m)", "12 pi (3,66 m)", "20 pi (6 m)", "8 pi (2,4 m)"], "a": 1,
        "e": "« …manipuler des tiges au train de forage au moyen d'un bras télescopique de 12 pi [3,66 m]. »" },
      { "q": "Où l'opérateur ne doit-il JAMAIS se retrouver ?",
        "o": ["Derrière les contrôles", "Sous le bras manipulateur ou sous les tiges de forage", "Dans le panier", "Près du moteur"], "a": 1,
        "e": "« L'opérateur ne DOIT JAMAIS se retrouver : a. Sous le bras manipulateur ; b. Sous les tiges de forage… »" },
      { "q": "Pendant le forage, à quelle distance du mât positionner les contrôles ?",
        "o": ["Tout près", "À plus de 1,5 mètre du mât", "À 0,5 mètre", "Sur le mât"], "a": 1,
        "e": "« Positionner les contrôles à plus de 1,5 mètre du mât de la foreuse et à 1,5 mètre du bras collier. »" },
      { "q": "Si la commande à distance n'est pas utilisée, que faut-il faire ?",
        "o": ["Rien", "Insérer la fiche d'obturation dans la boîte de connexion", "Débrancher la foreuse", "La laisser pendre"], "a": 1,
        "e": "« Si la commande à distance n'est pas utilisée, la fiche d'obturation doit être insérée dans la boîte de connexion. »" }
    ],
    "pro-op-sm-001": [
      { "q": "Lors de la vérification des fuites hydrauliques, que ne faut-il JAMAIS faire ?",
        "o": ["Arrêter la pompe", "Passer la main sur les tuyaux pour trouver la fuite", "Porter des gants", "Baisser la pression"], "a": 1,
        "e": "« Lors de la vérification des fuites hydrauliques, ne passez jamais la main sur les tuyaux pour vérifier la fuite. »" },
      { "q": "Que faire si le métal tressé d'un boyau est endommagé ?",
        "o": ["Le réparer au ruban", "Interdit d'y mettre de la pression : le changer immédiatement", "Réduire la pression", "Continuer prudemment"], "a": 1,
        "e": "« Si le métal tressé est endommagé, il est interdit de mettre de la pression dans le boyau. Il faut le changer immédiatement. »" },
      { "q": "Après avoir localisé la zone de forage, que faut-il vérifier d'abord ?",
        "o": ["L'éclairage", "La qualité de la ventilation", "Le niveau d'eau", "Les outils"], "a": 1,
        "e": "« Après avoir localisé la zone de forage, vérifiez d'abord la qualité de la ventilation. »" }
    ],
    "pro-op-sm-002": [
      { "q": "À quelle distance faut-il toujours se tenir des tiges rotatives ?",
        "o": ["1 mètre", "2,4 mètres", "5 mètres", "Aucune distance précise"], "a": 1,
        "e": "« Tenez-vous toujours à l'écart (2,4 mètres) des tiges rotatives. »" },
      { "q": "Un opérateur peut-il maintenir la tige pendant que la rotation est en marche ?",
        "o": ["Oui, avec des gants", "En aucun temps", "Oui, si elle tourne lentement", "Seulement au démarrage"], "a": 1,
        "e": "« En aucun temps, un opérateur ne doit maintenir la tige pendant que la rotation est en marche. »" },
      { "q": "Pourquoi ne jamais forer à sec ?",
        "o": ["Pour économiser l'eau", "La poussière créée est nocive pour la santé pulmonaire", "Pour ménager le moteur", "Ce n'est pas interdit"], "a": 1,
        "e": "« Ne jamais forer à sec : de la poussière serait créée et respirée par vous et vos collègues de travail. C'est très nocif pour la santé pulmonaire. »" },
      { "q": "Dans quel ordre utiliser les bits si plusieurs sont nécessaires pour un trou ?",
        "o": ["Les plus usés d'abord", "Commencer avec les plus neuves, vers les plus usés", "Peu importe", "Alterner"], "a": 1,
        "e": "« Si vous utilisez plus d'un foret dans un même trou : toujours utiliser les forets neufs au début en allant vers les plus usés. »" },
      { "q": "Quel type de vêtement ne faut-il jamais porter ?",
        "o": ["Des bottes", "Des vêtements amples", "Un casque", "Des gants"], "a": 1,
        "e": "« Ne portez jamais de vêtements amples. »" }
    ],
    "pro-op-sm-003": [
      { "q": "Quelle distance minimale faut-il toujours garder entre vous et la foreuse lors des déplacements ?",
        "o": ["1 mètre", "2,4 mètres", "5 mètres", "Aucune"], "a": 1,
        "e": "« Toujours garder une distance de 2,4 mètres minimum entre vous et la foreuse. »" },
      { "q": "Quel deuxième moyen de protection installer en cas de défaillance de la barre de remorquage ?",
        "o": ["Un cône", "Une élingue ou une chaîne en câble métallique", "Un ruban", "Rien", ], "a": 1,
        "e": "« Une élingue ou une chaîne en câble métallique doit être installée comme deuxième moyen de protection en cas de défaillance de la barre de remorquage. »" },
      { "q": "Si l'équipement se déplace pendant les tests de freins, que faire ?",
        "o": ["Continuer doucement", "Ne pas l'utiliser et appeler le superviseur", "Refaire le test", "Réduire la charge"], "a": 1,
        "e": "« Si l'équipement se déplace pendant les tests de freins, NE PAS L'UTILISER et appeler le superviseur. »" },
      { "q": "Lors des déplacements dans la rampe, dans quelle position doit être le panier ?",
        "o": ["Vers le bas", "Toujours vers le haut (UP RAMP)", "Au centre", "Replié"], "a": 1,
        "e": "« Lors des déplacements, le panier doit TOUJOURS être vers le haut (UP RAMP). »" },
      { "q": "Peut-on marcher derrière un Stopemaster pendant le remorquage ?",
        "o": ["Oui, à distance", "Jamais", "Oui, si lent", "Seulement le signaleur"], "a": 1,
        "e": "« Ne marchez jamais derrière un Stopemaster pendant le remorquage. »" },
      { "q": "Sur quels tuyaux faut-il installer des câbles anti-fouet (whipcheck) ?",
        "o": ["Tous les tuyaux", "Les tuyaux de plus d'un (1) pouce", "Seulement les tuyaux d'eau", "Aucun"], "a": 1,
        "e": "« Installer des câbles anti-fouets (whipcheck) sur les tuyaux de plus d'un (1) pouce. »" }
    ],
    "pro-op-sm-004": [
      { "q": "Selon quel article du RSSTM (Québec) le plancher du chantier doit-il être soufflé ?",
        "o": ["Article 12", "Article 437", "Article 136", "Article 439"], "a": 1,
        "e": "« Le plancher du chantier à forer doit être soufflé selon l'article 437 du Règlement sur la santé et la sécurité du travail dans les mines (RSSTM Québec)… »" },
      { "q": "Où ne faut-il JAMAIS mettre les mains ?",
        "o": ["Sur les contrôles", "Sous les jaws ou une tige de forage", "Sur le casing", "Dans les gants"], "a": 1,
        "e": "« Ne mettez jamais vos mains sous les jaws ou d'une tige de forage. »" },
      { "q": "De quelle longueur doit être le casing à insérer ?",
        "o": ["De la même longueur que le trou", "Environ 2 pouces plus long que la longueur alésée", "2 pieds plus long", "Peu importe"], "a": 1,
        "e": "« Retirez la tige et insérez un casing d'environ 2 pouces plus long que la longueur alésée. »" }
    ],
    "pro-op-bu-001": [
      { "q": "Quelle protection est obligatoire pour l'opération de la foreuse V-KING ?",
        "o": ["Un masque seulement", "La double protection auditive", "Un harnais", "Aucune en particulier"], "a": 1,
        "e": "« Le port de la double protection auditive est obligatoire. »" },
      { "q": "Le forage à sec avec la V-KING est-il permis ?",
        "o": ["Oui si peu de poussière", "Il est strictement interdit", "Oui sur de courts trous", "Seulement en descendant"], "a": 1,
        "e": "« L'opérateur doit contrôler la production de poussière en utilisant une quantité suffisante d'eau pendant le forage. LE FORAGE À SEC EST INTERDIT. »" },
      { "q": "Lors du forage de trous descendants, quelle longueur minimale de tubage installer dans le roc ?",
        "o": ["6 pouces", "12 pouces", "24 pouces", "Aucune"], "a": 1,
        "e": "« Lors du forage de trous descendant, le foreur devra installer un tubage d'une longueur minimum de 12 pouces dans le roc. »" },
      { "q": "Quelles conduites d'air doivent être équipées d'un dispositif anti-fouettement ?",
        "o": ["Toutes", "Les conduites flexibles supérieures à 1 pouce de diamètre", "Seulement les conduites d'eau", "Aucune"], "a": 1,
        "e": "« Toutes les conduites d'air flexibles supérieures à 1 pouce de diamètre doivent être équipées d'un dispositif anti-fouettement approprié et ce à tous les points de connexion. »" },
      { "q": "Après qu'un trou descendant est complété, que doit installer l'opérateur ?",
        "o": ["Un cône", "Des bouchons pour empêcher la chute de pierre dans le trou", "Un drapeau", "Rien"], "a": 1,
        "e": "« Après chaque trou descendant complété, l'opérateur installera des bouchons sur chacun des trous afin d'empêcher la chute de pierre ou de débris qui pourrait entraîner un blocage du trou. »" }
    ]
  };
  var T = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(Q).forEach(function (id) { T[id] = (T[id] || []).concat(Q[id]); });
})();
