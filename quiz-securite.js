/* ===========================================================================
   QUIZ — Procédures de sécurité (accueil, gaz au diamant, défonçage).
   Citations fidèles des PDF officiels. Fusion dans window.QUIZ_PROC.
   =========================================================================== */
(function () {
  var Q = {
    "san-sec-006": [
      { "q": "Avant que le contremaître-général s'occupe de lui, qu'est-ce que le nouveau travailleur doit avoir fait ?",
        "o": ["Rien", "L'accueil en ligne de MRI, puis l'accueil du client", "Une semaine d'essai", "Un examen médical"], "a": 1,
        "e": "« Le travailleur doit d'abord avoir fait l'accueil en ligne de MACHINES ROGER INTERNATIONAL; le travailleur doit effectuer le processus d'accueil du client. »" },
      { "q": "Qui garde les papiers d'accueil signés du travailleur ?",
        "o": ["Le travailleur", "Le contremaître-général", "Le client", "Le foreur"], "a": 1,
        "e": "« Le contremaître-général doit garder en filière les documents d'accueil signés du travailleur. »" }
    ],
    "san-sec-005": [
      { "q": "Où commence le site de forage ?",
        "o": ["À l'entrée de la mine", "Au ruban jaune", "À la foreuse", "Au stationnement"], "a": 1,
        "e": "« Le site de forage débute au ruban jaune. »" },
      { "q": "Un visiteur arrive. Qui vérifie qu'il porte bien ses équipements de protection (ÉPI) ?",
        "o": ["Le visiteur lui-même", "Le foreur ou l'aide-foreur qui l'accueille", "Le superviseur de la mine", "Personne"], "a": 1,
        "e": "« Le foreur ou l'aide-foreur qui accueille le visiteur doit s'assurer que ce dernier porte convenablement [les ÉPI]. »" },
      { "q": "Le superviseur est-il un visiteur ?",
        "o": ["Oui", "Non", "Seulement la nuit", "Seulement s'il est nouveau"], "a": 1,
        "e": "« Le superviseur n'est pas considéré comme un visiteur. »" }
    ],
    "pro-sec-015": [
      { "q": "Où faut-il placer la sonde du détecteur de gaz ?",
        "o": ["En haut de la baie", "À moins de 2 mètres au-dessus des tiges, là où la tige touche le roc", "À l'entrée du chantier", "Sur le power pack"], "a": 1,
        "e": "« La sonde doit être placée à moins de 2 mètres au-dessus des tiges au point de contact avec le roc. »" },
      { "q": "Tu as quitté la baie à cause du gaz. Tous les combien reviens-tu vérifier le gaz ?",
        "o": ["Toutes les heures", "Toutes les 15 minutes", "Toutes les 5 minutes", "Une seule fois"], "a": 1,
        "e": "« Retourner vers la baie de forage aux 15 minutes pour vérifier les gaz. »" },
      { "q": "Où faut-il démarrer les détecteurs de gaz portatifs ?",
        "o": ["Au fond du trou", "À la surface, dans un endroit aéré et sans gaz", "Dans la baie de forage", "N'importe où"], "a": 1,
        "e": "« Les détecteurs portatifs doivent être ouverts à la surface, dans un endroit aéré et exempt de gaz contaminés. »" }
    ],
    "pro-sec-001": [
      { "q": "Avant de percer de l'autre côté, à quelle distance faut-il déjà avoir choisi A ou B ?",
        "o": ["2 mètres", "5 mètres (15 pieds)", "10 mètres", "1 mètre"], "a": 1,
        "e": "« Il doit appliquer son choix au moins 5 mètres (15 pieds) avant de défoncer. »" },
      { "q": "Le trou débouche dans une galerie où personne ne passe. Quel périmètre mets-tu autour ?",
        "o": ["2 m avec un cône", "5 mètres, barrière orange et affiche « Ouverture dangereuse »", "10 m sans affiche", "Aucun"], "a": 1,
        "e": "« Un périmètre de 5 mètres (15 pieds) autour du trou devra être délimité avec une barrière orange et une affiche « Ouverture dangereuse ». »" },
      { "q": "Que mets-tu sur le départ du trou foré pour que rien ne tombe dedans ?",
        "o": ["Un couvercle de bois", "Un cône rouge", "Un ruban jaune", "Rien"], "a": 1,
        "e": "« Un cône rouge doit être placé sur le départ du trou foré, afin d'éviter toutes chutes d'objets à l'intérieur de ce trou. »" },
    ]
  };
  var T = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(Q).forEach(function (id) { T[id] = (T[id] || []).concat(Q[id]); });
})();
