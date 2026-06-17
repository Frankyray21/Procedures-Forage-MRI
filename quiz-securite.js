/* ===========================================================================
   QUIZ — Procédures de sécurité (accueil, gaz au diamant, défonçage).
   Citations fidèles des PDF officiels. Fusion dans window.QUIZ_PROC.
   =========================================================================== */
(function () {
  var Q = {
    "san-sec-006": [
      { "q": "Qu'est-ce que le nouveau travailleur doit avoir fait avant la prise en charge par le contremaître-général ?",
        "o": ["Rien de particulier", "L'accueil en ligne de MRI, puis l'accueil du client", "Une semaine d'essai", "Un examen médical"], "a": 1,
        "e": "« Le travailleur doit d'abord avoir fait l'accueil en ligne de MACHINES ROGER INTERNATIONAL; le travailleur doit effectuer le processus d'accueil du client. »" },
      { "q": "Qui conserve en filière les documents d'accueil signés du travailleur ?",
        "o": ["Le travailleur", "Le contremaître-général", "Le client", "Le foreur"], "a": 1,
        "e": "« Le contremaître-général doit garder en filière les documents d'accueil signés du travailleur. »" }
    ],
    "san-sec-005": [
      { "q": "Où débute le site de forage pour l'accueil des visiteurs ?",
        "o": ["À l'entrée de la mine", "Au ruban jaune", "À la foreuse", "Au stationnement"], "a": 1,
        "e": "« Le site de forage débute au ruban jaune. »" },
      { "q": "Qui doit s'assurer que le visiteur porte convenablement ses ÉPI ?",
        "o": ["Le visiteur lui-même", "Le foreur ou l'aide-foreur qui l'accueille", "Le superviseur de la mine", "Personne"], "a": 1,
        "e": "« Le foreur ou l'aide-foreur qui accueille le visiteur doit s'assurer que ce dernier porte convenablement [les ÉPI]. »" },
      { "q": "Le superviseur est-il considéré comme un visiteur ?",
        "o": ["Oui", "Non", "Seulement la nuit", "Seulement s'il est nouveau"], "a": 1,
        "e": "« Le superviseur n'est pas considéré comme un visiteur. »" }
    ],
    "pro-sec-015": [
      { "q": "Où la sonde du détecteur de gaz doit-elle être placée ?",
        "o": ["Au plafond de la baie", "À moins de 2 mètres au-dessus des tiges, au point de contact avec le roc", "À l'entrée du chantier", "Sur le power pack"], "a": 1,
        "e": "« La sonde doit être placée à moins de 2 mètres au-dessus des tiges au point de contact avec le roc. »" },
      { "q": "Est-il permis de mettre le système de détection de gaz hors fonction ?",
        "o": ["Oui, si on est pressé", "C'est strictement interdit, sous peine de mesures disciplinaires", "Oui, avec l'accord du foreur", "Seulement la nuit"], "a": 1,
        "e": "« Il est strictement interdit de mettre le système hors fonction sous peine de mesures disciplinaires. »" },
      { "q": "Que faire dès que le détecteur dépasse la norme à respecter ?",
        "o": ["Continuer le forage", "Arrêter la foreuse et couper l'alimentation électrique au power pack", "Ouvrir une fenêtre", "Changer le détecteur"], "a": 1,
        "e": "« Dès que le détecteur réagit et qu'il dépasse la norme à respecter, la foreuse doit être arrêtée et l'alimentation électrique coupée au power pack. »" },
      { "q": "Après avoir évacué la baie pour cause de gaz, à quelle fréquence retourner vérifier les gaz ?",
        "o": ["Toutes les heures", "Toutes les 15 minutes", "Toutes les 5 minutes", "Une seule fois"], "a": 1,
        "e": "« Retourner vers la baie de forage aux 15 minutes pour vérifier les gaz. »" },
      { "q": "Où doit-on ouvrir/démarrer les détecteurs de gaz portatifs ?",
        "o": ["Au fond du trou", "À la surface, dans un endroit aéré et exempt de gaz contaminés", "Dans la baie de forage", "N'importe où"], "a": 1,
        "e": "« Les détecteurs portatifs doivent être ouverts à la surface, dans un endroit aéré et exempt de gaz contaminés. »" }
    ],
    "pro-sec-001": [
      { "q": "À quelle distance minimale avant de défoncer faut-il appliquer l'alternative A ou B ?",
        "o": ["2 mètres", "5 mètres (15 pieds)", "10 mètres", "1 mètre"], "a": 1,
        "e": "« Il doit appliquer son choix au moins 5 mètres (15 pieds) avant de défoncer. »" },
      { "q": "Quel périmètre délimiter si le trou débouche dans une galerie non fréquentée ?",
        "o": ["2 m avec un cône", "5 mètres (15 pi) avec barrière orange et affiche « Ouverture dangereuse »", "10 m sans affiche", "Aucun"], "a": 1,
        "e": "« Un périmètre de 5 mètres (15 pieds) autour du trou devra être délimité avec une barrière orange et une affiche « Ouverture dangereuse ». »" },
      { "q": "Que doit-on placer sur le départ du trou foré pour éviter les chutes d'objets ?",
        "o": ["Un couvercle de bois", "Un cône rouge", "Un ruban jaune", "Rien"], "a": 1,
        "e": "« Un cône rouge doit être placé sur le départ du trou foré, afin d'éviter toutes chutes d'objets à l'intérieur de ce trou. »" },
      { "q": "Peut-on travailler au niveau inférieur d'un chantier pendant le forage au niveau supérieur ?",
        "o": ["Oui, librement", "C'est strictement défendu, sauf une chargeuse téléguidée", "Oui, avec un casque", "Seulement le jour"], "a": 1,
        "e": "« Il est strictement défendu de travailler au niveau inférieur d'un chantier lorsque le forage est effectué au niveau supérieur, à l'exception d'une chargeuse téléguidée. »" },
      { "q": "Si un trou défonce alors que ce n'était pas prévu, que faut-il faire ?",
        "o": ["Continuer prudemment", "Arrêter le forage, appeler le superviseur et fermer l'accès", "Reboucher le trou", "Accélérer pour finir"], "a": 1,
        "e": "« Si un trou défonce alors qu'il n'est pas prévu être défoncé, le forage doit être arrêté. Le foreur doit immédiatement appeler son superviseur et l'accès de l'endroit où le trou a défoncé doit être fermé. »" }
    ]
  };
  var T = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(Q).forEach(function (id) { T[id] = (T[id] || []).concat(Q[id]); });
})();
