/* ===========================================================================
   QUIZ — Procédures DD ajoutées : tracteur Caterpillar 416, camion-flèche
   BT-3 MacLean, cimentation Chemgrout. Citations fidèles des PDF officiels.
   =========================================================================== */
(function () {
  var Q = {
    "pro-op-cat-416-001": [
      { "q": "Quelle distance doit-on toujours garder entre les véhicules dans la rampe ?",
        "o": ["10 mètres", "20 mètres", "30 mètres", "50 mètres"], "a": 2,
        "e": "« Toujours garder une distance de 30 mètres entre les véhicules dans la rampe. »" },
      { "q": "Quelle est la capacité de charge de matériel avec les fourches ?",
        "o": ["1 100 kg", "2 964 kg / 6 535 lb", "3 300 kg", "4 600 kg"], "a": 1,
        "e": "« La capacité de charge de matériel avec les fourches est de 2964 KG / 6535 LBS. »" },
      { "q": "Quel ÉPI est obligatoire pour les travailleurs dans le panier avant ?",
        "o": ["Aucun de plus", "Le harnais, attaché en tout temps", "Un dossard seulement", "Des gants isolants"], "a": 1,
        "e": "« Les travailleurs doivent obligatoirement porter le harnais et s'attacher en tout temps dans le panier avant. »" },
      { "q": "Dans quelles conditions les vérins (stabilisateurs) peuvent-ils être appliqués ?",
        "o": ["En tout temps", "Seulement sur terrain plat et stable, jamais en pente", "Seulement en pente", "Uniquement à l'arrêt du moteur"], "a": 1,
        "e": "« Les vérins peuvent être appliqués seulement lors du stationnement sur un terrain plat et stable. JAMAIS EN PENTE. »" },
      { "q": "Quelle est la vitesse maximale de déplacement quand il y a du personnel dans le panier avant ?",
        "o": ["La vitesse de pas d'homme", "5 km/h", "10 km/h", "Aucune limite"], "a": 0,
        "e": "« La vitesse de déplacement du tracteur ne doit pas dépasser la vitesse de pas d'homme quand il y a du personnel dans le panier avant. »" },
      { "q": "Comment doit se faire la montée et la descente du tracteur ?",
        "o": ["En sautant", "Face à l'équipement, avec la règle des 3 points d'appui", "Dos à l'équipement", "En vitesse"], "a": 1,
        "e": "« La montée et la descente de cet équipement doit toujours se faire face à l'équipement, soit en utilisant la règle des 3 points d'appui. »" },
      { "q": "Avec le compresseur en remorque, le poids maximal transportable avec les fourches équivaut à quoi ?",
        "o": ["Au poids du compresseur R-55", "À l'équivalent d'une V-30 (3 300 lb)", "À 6 535 lb", "À aucune charge"], "a": 1,
        "e": "« Avec le compresseur en remorque, le maximum de poids que l'on peut transporter avec les fourches est l'équivalent d'une V-30 (3300 lbs). »" },
      { "q": "Lors d'un test de frein, si le tracteur avance, que doit-on faire ?",
        "o": ["Continuer prudemment", "Cadenasser le tracteur et aviser le superviseur", "Réessayer trois fois", "Réduire la charge"], "a": 1,
        "e": "« Si le tracteur avance, cadenasser le tracteur et aviser le superviseur. »" }
    ],
    "pro-op-bt3-001": [
      { "q": "Combien d'heures d'opération supervisées le travailleur en formation doit-il faire ?",
        "o": ["10 heures", "20 heures", "40 heures", "80 heures"], "a": 2,
        "e": "« Le travailleur en formation doit faire 40 heures d'opération supervisées par le formateur de MRI. »" },
      { "q": "Quel est le poids maximal sur la plate-forme (incluant le remorquage) ?",
        "o": ["16 000 lb", "24 000 lb", "32 000 lb", "40 000 lb"], "a": 2,
        "e": "« Poids maximum sur la plate-forme et le remorquage 32 000 lbs. »" },
      { "q": "Au démarrage, si les voyants/klaxons ne s'éteignent pas après 5 secondes, que faire ?",
        "o": ["Partir quand même", "Ne pas essayer de partir le moteur et contacter le superviseur", "Attendre 5 minutes", "Frapper le tableau de bord"], "a": 1,
        "e": "« S'ils ne s'éteignent pas après 5 secondes, ne pas essayer de partir le moteur et contacter le superviseur. »" },
      { "q": "Avant de rentrer les stabilisateurs, que doit-on faire du matériel sur la plate-forme ?",
        "o": ["Rien", "L'attacher solidement avec les sangles serrées au bras de force", "Le déposer au sol", "Le couvrir d'une bâche"], "a": 1,
        "e": "« Avant que les stabilisateurs ne soient rentrés, tout le matériel doit être attaché solidement à la plate-forme à l'aide des sangles en les serrant fortement à l'aide du bras de force. »" },
      { "q": "Lors du levage avec la grue Palfinger, quelle règle s'applique ?",
        "o": ["On peut passer sous la charge si elle est légère", "Ne jamais s'exposer sous une charge", "Soulever sans regarder", "Dépasser la capacité au besoin"], "a": 1,
        "e": "« Ne jamais s'exposer sous une charge. »" }
    ],
    "pro-op-cim-001": [
      { "q": "Quel masque doit être enfilé avant de commencer la cimentation ?",
        "o": ["Un masque jetable", "Le masque power flow (avec ventilateur)", "Aucun", "Un masque à cartouche simple"], "a": 1,
        "e": "« Enfiler le masque power flow, activer le ventilateur et ajuster le masque. »" },
      { "q": "Jusqu'à quel moment le port des ÉPI est-il obligatoire ?",
        "o": ["Jusqu'à la fin du pompage", "Jusqu'à ce que le nettoyage complet de la machine à ciment soit terminé", "Pendant 10 minutes", "Tant qu'il y a de la poussière"], "a": 1,
        "e": "« Le port des EPI est obligatoire à partir du moment où l'on commence à manipuler les sacs de ciment jusqu'à ce que le nettoyage complet de la machine à ciment soit terminé. »" },
      { "q": "En trou descendant, à partir de quelle pression faut-il remonter le tube d'une dizaine de pieds ?",
        "o": ["10 psi", "30 psi", "60 psi", "100 psi"], "a": 1,
        "e": "« Si la pression commence à monter à plus de 30 psi, remonter le tube vers le collet du trou d'une dizaine de pieds. »" },
      { "q": "Après le pompage, combien de temps le boyau d'injection doit-il rester plié (2 ty-rap) ?",
        "o": ["6 heures", "12 heures", "24 heures (cure)", "48 heures"], "a": 2,
        "e": "« …le boyau où l'on pompe le ciment doit être plié en deux et 2 ty-rap doivent le tenir plié jusqu'à ce que le temps de cure de 24 hrs soit complété. »" },
      { "q": "Qu'est-ce qui est obligatoire sur le site lors des travaux de cimentation ?",
        "o": ["Un téléphone", "Une trousse d'urgence", "Un deuxième opérateur", "Un extincteur à poudre"], "a": 1,
        "e": "« Trousse d'urgence obligatoire sur le site. »" },
      { "q": "Que pourrait causer un déblocage soudain lors du pompage en trou descendant ?",
        "o": ["Une perte de ciment", "Des blessures graves", "Un arrêt de la pompe", "Rien de grave"], "a": 1,
        "e": "« Un déblocage soudain causerait des blessures graves. »" }
    ]
  };
  var T = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(Q).forEach(function (id) { T[id] = (T[id] || []).concat(Q[id]); });
})();
