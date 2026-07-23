/* ===========================================================================
   QUIZ — Procédures DD ajoutées : tracteur Caterpillar 416, camion-flèche
   BT-3 MacLean, cimentation Chemgrout. Citations fidèles des PDF officiels.
   =========================================================================== */
(function () {
  var Q = {
    "pro-op-cat-416-001": [
      { "t": "trou", "q": "Dans la rampe, tu dois garder une distance de ______ entre les véhicules.",
        "o": ["10 mètres", "20 mètres", "30 mètres", "50 mètres"], "a": 2,
        "img": "images/figures/pro-op-cat-416-001-10.jpg", "detail": "Extrait de la procédure officielle du tracteur 416 F2 (section Utilisation).",
        "e": "« Toujours garder une distance de 30 mètres entre les véhicules dans la rampe. »" },
      { "q": "Combien les fourches peuvent-elles lever au maximum ?",
        "o": ["1 100 kg", "2 964 kg / 6 535 lb", "3 300 kg", "4 600 kg"], "a": 1,
        "e": "« La capacité de charge de matériel avec les fourches est de 2964 KG / 6535 LBS. »" },
      { "t": "vf", "q": "Les vérins peuvent être appliqués seulement lors du stationnement sur un terrain plat et stable, jamais en pente.",
        "vrai": true,
        "e": "« Les vérins peuvent être appliqués seulement lors du stationnement sur un terrain plat et stable. JAMAIS EN PENTE. »" },
      { "q": "Une personne est dans le panier avant. À quelle vitesse peux-tu rouler ?",
        "o": ["À la vitesse d'un homme qui marche", "5 km/h", "10 km/h", "Sans limite"], "a": 0,
        "e": "« La vitesse de déplacement du tracteur ne doit pas dépasser la vitesse de pas d'homme quand il y a du personnel dans le panier avant. »" },
      { "q": "Tu remorques le compresseur. Quel poids maximum peux-tu porter avec les fourches ?",
        "o": ["Le poids du compresseur R-55", "Le poids d'une V-30 (3 300 lb)", "6 535 lb", "Aucune charge"], "a": 1,
        "e": "« Avec le compresseur en remorque, le maximum de poids que l'on peut transporter avec les fourches est l'équivalent d'une V-30 (3300 lbs). »" }    ],
    "pro-op-bt3-001": [
      { "t": "trou", "q": "Le travailleur en formation doit faire ______ d'opération supervisées par le formateur de MRI.",
        "o": ["10 heures", "20 heures", "40 heures", "80 heures"], "a": 2,
        "e": "« Le travailleur en formation doit faire 40 heures d'opération supervisées par le formateur de MRI. »" },
      { "q": "Quel poids maximum peut-on mettre sur la plate-forme (avec le remorquage) ?",
        "o": ["16 000 lb", "24 000 lb", "32 000 lb", "40 000 lb"], "a": 2,
        "img": "images/figures/pro-op-bt3-001-3.jpg", "detail": "La plate-forme du BT-3 chargée et sanglée, avec l'attache de remorquage à l'arrière.",
        "e": "« Poids maximum sur la plate-forme et le remorquage 32 000 lbs. »" },
    ],
    "pro-op-cim-001": [
      { "q": "Avant de commencer le ciment, quel masque mets-tu ?",
        "o": ["Un masque jetable", "Le masque power flow (avec ventilateur)", "Aucun masque", "Un masque à cartouche"], "a": 1,
        "img": "images/figures/pro-op-cim-001-3.jpg", "detail": "Le masque Power Flow porté avec son ventilateur alimenté (unité à la ceinture) et la combinaison complète.",
        "e": "« Enfiler le masque power flow, activer le ventilateur et ajuster le masque. »" },
      { "q": "Jusqu'à quand dois-tu porter tes ÉPI ?",
        "o": ["Jusqu'à la fin du pompage", "Jusqu'à ce que la machine à ciment soit bien nettoyée", "Pendant 10 minutes", "Tant qu'il y a de la poussière"], "a": 1,
        "e": "« Le port des EPI est obligatoire à partir du moment où l'on commence à manipuler les sacs de ciment jusqu'à ce que le nettoyage complet de la machine à ciment soit terminé. »" },
      { "t": "trou", "q": "Trou vers le bas : si la pression monte à plus de ______, remonte le tube vers le collet du trou d'une dizaine de pieds.",
        "o": ["10 psi", "30 psi", "60 psi", "100 psi"], "a": 1,
        "e": "« Si la pression commence à monter à plus de 30 psi, remonter le tube vers le collet du trou d'une dizaine de pieds. »" },
      { "q": "Après le pompage, tu plies le boyau avec 2 ty-rap. Combien de temps reste-t-il plié ?",
        "o": ["6 heures", "12 heures", "24 heures (cure)", "48 heures"], "a": 2,
        "e": "« …le boyau où l'on pompe le ciment doit être plié en deux et 2 ty-rap doivent le tenir plié jusqu'à ce que le temps de cure de 24 hrs soit complété. »" },
      { "t": "vf", "q": "Une trousse d'urgence est obligatoire sur le site.",
        "vrai": true,
        "e": "« Trousse d'urgence obligatoire sur le site. »" }    ]
  };
  var T = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(Q).forEach(function (id) { T[id] = (T[id] || []).concat(Q[id]); });
})();
