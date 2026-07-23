/* ===========================================================================
   QUIZ — Procédures de sécurité (accueil, gaz au diamant, défonçage).
   Citations fidèles des PDF officiels. Fusion dans window.QUIZ_PROC.
   =========================================================================== */
(function () {
  var Q = {
    "san-sec-006": [
      { "t": "vf", "q": "Le nouveau travailleur doit d'abord avoir fait l'accueil en ligne de Machines Roger International, puis effectuer le processus d'accueil du client.",
        "vrai": true,
        "e": "« Le travailleur doit d'abord avoir fait l'accueil en ligne de MACHINES ROGER INTERNATIONAL; le travailleur doit effectuer le processus d'accueil du client. »" }
    ],
    "san-sec-005": [
      { "t": "vf", "q": "Le site de forage débute au ruban jaune.",
        "vrai": true,
        "e": "« Le site de forage débute au ruban jaune. »" },
      { "q": "Un visiteur arrive. Qui vérifie qu'il porte bien ses équipements de protection (ÉPI) ?",
        "o": ["Le visiteur lui-même", "Le foreur ou l'aide-foreur qui l'accueille", "Le superviseur de la mine", "Personne"], "a": 1,
        "img": "images/figures/san-sec-005-1.jpg", "detail": "Affiche « Personne autorisée seulement » à l'entrée du site de forage.",
        "e": "« Le foreur ou l'aide-foreur qui accueille le visiteur doit s'assurer que ce dernier porte convenablement [les ÉPI]. »" },
      { "t": "vf", "q": "Le superviseur n'est pas considéré comme un visiteur.",
        "vrai": true,
        "e": "« Le superviseur n'est pas considéré comme un visiteur. »" }
    ],
    "pro-sec-015": [
      { "q": "Où faut-il placer la sonde du détecteur de gaz ?",
        "o": ["En haut de la baie", "À moins de 2 mètres au-dessus des tiges, là où la tige touche le roc", "À l'entrée du chantier", "Sur le power pack"], "a": 1,
        "e": "« La sonde doit être placée à moins de 2 mètres au-dessus des tiges au point de contact avec le roc. »" },
      { "t": "trou", "q": "Tu as quitté la baie à cause du gaz. Tu retournes vérifier les gaz aux ______.",
        "o": ["Toutes les heures", "Toutes les 15 minutes", "Toutes les 5 minutes", "Une seule fois"], "a": 1,
        "e": "« Retourner vers la baie de forage aux 15 minutes pour vérifier les gaz. »" },
      { "t": "vf", "q": "Les détecteurs portatifs doivent être ouverts à la surface, dans un endroit aéré et exempt de gaz contaminés.",
        "vrai": true,
        "e": "« Les détecteurs portatifs doivent être ouverts à la surface, dans un endroit aéré et exempt de gaz contaminés. »" }
    ],
    "pro-sec-001": [
      { "t": "trou", "q": "Il doit appliquer son choix (A ou B) au moins ______ avant de défoncer.",
        "o": ["2 mètres", "5 mètres (15 pieds)", "10 mètres", "1 mètre"], "a": 1,
        "e": "« Il doit appliquer son choix au moins 5 mètres (15 pieds) avant de défoncer. »" },
      { "q": "Le trou débouche dans une galerie où personne ne passe. Comment délimites-tu le périmètre autour du trou ?",
        "o": ["Un cône orange posé sur le trou", "Une barrière orange et une affiche « Ouverture dangereuse »", "Un ruban jaune seulement", "Aucune délimitation requise"], "a": 1,
        "e": "« Un périmètre de […] autour du trou devra être délimité avec une barrière orange et une affiche « Ouverture dangereuse ». »" },
      { "t": "vf", "q": "Un cône rouge doit être placé sur le départ du trou foré, afin d'éviter toutes chutes d'objets à l'intérieur de ce trou.",
        "vrai": true,
        "e": "« Un cône rouge doit être placé sur le départ du trou foré, afin d'éviter toutes chutes d'objets à l'intérieur de ce trou. »" },
    ]
  };
  var T = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(Q).forEach(function (id) { T[id] = (T[id] || []).concat(Q[id]); });
})();
