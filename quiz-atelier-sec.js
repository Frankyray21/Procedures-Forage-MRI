/* ===========================================================================
   QUIZ — Procédures atelier, transport et sécurité générale (ATELIER-MEC-001/
   002/003, ATELIER-TRANSPORT-001, PRO-SEC-010, GES-SAN-SEC-001, serrage du
   marteau). Citations fidèles des PDF.
   =========================================================================== */
(function () {
  var Q = {
    "atelier-mec-001": [
      { "t": "vf", "q": "L'opérateur doit appuyer sur le klaxon de la chargeuse à deux reprises avant d'entrer dans l'atelier.", "vrai": true,
        "e": "« L'opérateur doit appuyer sur le klaxon de la chargeuse à deux reprises avant d'entrer. »" },
      { "q": "Que doit-on déposer sous les tractions d'un équipement qui entre, sort ou se déplace dans l'atelier ?",
        "o": ["Rien de particulier", "Des lanières de caoutchouc", "Des blocs de bois", "Du sable"], "a": 1,
        "e": "« …des lanières de caoutchouc doivent être déposées sur le plancher du garage, sous les tractions. »" },
      { "q": "Que s'allume-t-il lors de l'ouverture ou la fermeture de la porte de l'atelier ?",
        "o": ["Une sirène", "Une lumière stroboscopique", "Un ventilateur", "Rien"], "a": 1,
        "e": "« Lors de l'ouverture ou de la fermeture de la porte, une lumière stroboscopique s'allumera pour avertir toutes les personnes présentes dans l'atelier. »" },
      { "q": "À quelle vitesse doit se faire l'entrée, la sortie ou le déplacement d'un équipement dans l'atelier ?",
        "o": ["Vitesse normale", "Vitesse très lente", "Le plus vite possible", "Peu importe"], "a": 1,
        "e": "« L'entrée ou la sortie de l'équipement doit se faire à vitesse très lente. »" },
      { "t": "multi", "q": "Coche les affirmations VRAIES sur le contrôle des déplacements d'équipements dans l'atelier.",
        "o": ["L'opérateur de la chargeuse à fourche doit attendre qu'un travailleur de l'intérieur vienne le guider.", "L'opérateur peut manœuvrer sans signaleur si l'atelier semble dégagé.", "Le signaleur doit rester visible en tout temps par l'opérateur.", "Le frein de stationnement doit être appliqué quand les manœuvres sont terminées.", "Une fois le matériel déposé, aucune vérification n'est requise derrière le véhicule."],
        "a": [2, 0, 3],
        "e": "« L'opérateur de la chargeuse à fourche doit attendre qu'un travailleur de l'intérieur vienne le guider pour déposer ou ramasser le matériel. » « Le signaleur doit s'assurer que l'espace est suffisant […] et rester visible en tout temps par l'opérateur. » « Le frein de stationnement doit être appliqué quand les manœuvres sont terminées. »" }
    ],
    "atelier-mec-002": [
      { "q": "Que fait-on avant d'utiliser le coupe-boyau ?",
        "o": ["Rien de particulier", "Fermer le garde et mettre la clé en position ON", "Ouvrir le garde", "Débrancher la machine"], "a": 1,
        "e": "« Fermer le garde. Mettre la clé en position ''ON'' (sens horaire) »" },
      { "q": "Sur l'adapteur, que signifient 2 lignes dans le bas ?",
        "o": ["2 brins", "2 pouces", "2 sertissages requis", "Rien de particulier"], "a": 0,
        "e": "« 2 lignes dans le bas de l'adapteur égale 2 brins »" },
      { "q": "Combien d'options de sertissage la sertisseuse propose-t-elle ?",
        "o": ["4", "6", "8", "10"], "a": 2,
        "e": "« Sélectionner une des 8 options selon la grosseur du boyau et le nombre de brins. »",
        "img": "images/figures/atelier-mec-002-8.jpg", "detail": "Le panneau de la sertisseuse présente 8 options numérotées." },
      { "t": "vf", "q": "En tout temps, appuyer sur le bouton d'arrêt d'urgence arrêtera le coupe-boyau.", "vrai": true,
        "e": "« En tout temps, appuyer sur le bouton d'arrêt d'urgence arrêtera le coup-boyau »" },
      { "t": "multi", "q": "Coche les affirmations VRAIES sur la fabrication des boyaux hydrauliques.",
        "o": ["Aligner la ligne de l'adapteur avec le bord des mâchoires de la sertisseuse avant de choisir l'option.", "On peut actionner la sertisseuse avec le garde ouvert pour aller plus vite.", "Sélectionner l'option de sertissage selon la grosseur du boyau et le nombre de brins.", "Au relâchement du sélecteur « CRIMP », les mâchoires de la sertisseuse se rétractent.", "Le travail terminé au coupe-boyau, on laisse la clé en position « ON »."],
        "a": [0, 2, 3],
        "e": "« Aligner la ligne de l'adapteur avec le bord des mâchoires de la sertisseuse avant de sélectionner l'option de sertissage. » « Sélectionner l'option de sertissage correspondant à la grosseur du boyau et au nombre de brins avant d'appuyer sur CRIMP. » « Lors du relâchement du sélecteur CRIMP, les mâchoires de la sertisseuse se rétractent. »" }
    ],
    "atelier-mec-003": [
      { "t": "trou", "q": "La presse ENERPAC IPR 5075 opère à une pression maximum de ______.",
        "o": ["1 000 psi", "5 000 psi", "10 000 psi", "20 000 psi"], "a": 2,
        "e": "« La presse IPR 5075 opère à une pression maximum de 10 000 psi et génère une poussée de 50 tonnes métriques. »" },
      { "q": "Quand la barre de l'interverrouillage est tournée vers le haut, que se passe-t-il ?",
        "o": ["Rien du tout", "Le moteur cesse de fonctionner mais la pression continue", "La presse redémarre plus vite", "L'alimentation se coupe complètement"], "a": 1,
        "e": "« Dès que la barre de l'interverrouillage est tournée vers le haut, le moteur cesse de fonctionner. La pression sur la pièce continuera d'être exercé »" },
      { "q": "Comment doit-on se tenir face aux pièces à presser ?",
        "o": ["Directement en face", "De côté, jamais en face", "Peu importe la position", "Par en arrière seulement"], "a": 1,
        "e": "« Toujours se tenir de côté et non face aux pièces à presser »" },
      { "q": "Que faut-il faire pour tout travail avec les portes de la presse ouvertes ?",
        "o": ["Rien de spécial", "Une analyse de risque avec le surintendant SST et le superviseur", "Porter seulement des gants", "Avertir uniquement un collègue"], "a": 1,
        "e": "« …une analyse de risque (formulaire en annexe) doit être effectuée avec le surintendant SST, le superviseur de l'atelier et les travailleurs qui doivent faire le travail. »" },
      { "t": "multi", "q": "Coche les affirmations VRAIES sur l'utilisation de la presse hydraulique ENERPAC.",
        "o": ["Il est interdit de laisser la pression sur la pièce quand les portes sont ouvertes.", "On peut fermer l'alimentation de la presse à l'aide de l'interverrouillage.", "Fermer les deux portes et mettre l'interverrouillage en place avant d'appuyer sur l'interrupteur.", "Attendre que le message d'arrêt s'éteigne complètement à l'écran avant de réenclencher la barre.", "Si la presse ne réagit pas comme prévu, on continue et on règle le problème soi-même."],
        "a": [3, 0, 2],
        "e": "« Il est interdit de laisser la pression sur la pièce quand les portes sont ouvertes. » « Fermer les deux portes et mettre l'interverrouillage en place avant d'appuyer sur l'interrupteur de la manette. » « Avant de réenclencher la barre de l'interverrouillage, attendre que le message d'arrêt s'éteigne complètement sur l'écran de contrôle. »" }
    ],
    "atelier-transport-001": [
      { "t": "trou", "q": "Le contremaître-général au site doit être averti du moment du départ du transport ______ à l'avance.",
        "o": ["12 heures", "24 heures", "48 heures", "Aucun préavis requis"], "a": 2,
        "e": "« Le contremaître-général au site doit être averti du moment du départ du transport 48 heures à l'avance par le superviseur de l'atelier. »" },
      { "q": "Que doit obligatoirement posséder le chauffeur ?",
        "o": ["Un permis spécial", "Un passeport vaccinal", "Une radio portative", "Rien de particulier"], "a": 1,
        "e": "« Passeport vaccinal obligatoire pour le chauffeur »" },
      { "q": "Que doit faire le chauffeur en arrivant à la guérite ?",
        "o": ["Attendre sans rien dire", "Avertir le contremaître-général dès son arrivée", "Klaxonner", "Repartir immédiatement"], "a": 1,
        "e": "« Le chauffeur doit avertir le contremaître-général dès son arrivée »" },
      { "q": "Qu'est-ce qui doit être fait pour un déchargement autre que des conteneurs MRI, palettes ou chargeuse à fourches ?",
        "o": ["Rien de spécial", "Un A-3", "Un appel au directeur", "Une signature seulement"], "a": 1,
        "e": "« Un A-3 devra être fait pour le déchargement autre que des conteneurs de matériel rouge-MRI ou de palettes, ou qui ne se décharge pas avec la chargeuse à fourches. »" },
      { "t": "multi", "q": "Coche les affirmations VRAIES sur les transports à la mine Éléonore.",
        "o": ["12 heures à l'avance, le chauffeur avertit le contremaître-général de l'heure prévue d'arrivée.", "Le stationnement du transport peut se faire n'importe où, même s'il gêne la circulation.", "Une réunion de sécurité à partir du tableau des risques mortels est tenue avec le chauffeur.", "Un contremaître-général ou un superviseur doit être sur place durant le déchargement-chargement.", "Le préavis du départ n'a pas besoin d'être donné d'avance au contremaître-général."],
        "a": [2, 0, 3],
        "e": "« 12 heures à l'avance, le chauffeur doit avertir le contremaître-général de l'heure prévue d'arrivée. » « Une réunion de sécurité à partir du tableau des risques mortels doit être tenue avec le chauffeur, avec signature d'un formulaire. » « Un contremaître-général ou un superviseur doit être sur place durant toutes les opérations de déchargement-chargement. »" }
    ],
    "pro-sec-010": [
      { "q": "Quel EPI est obligatoire spécifiquement lors du façonnage ?",
        "o": ["Casque seulement", "La visière", "Des gants de cuir", "Aucun EPI spécial"], "a": 1,
        "e": "« Lors du façonnage le port complet de tous les EPI est obligatoire incluant la visière. »" },
      { "q": "Que doit-on vérifier sur la meuleuse à disque avant le façonnage ?",
        "o": ["Rien de spécial", "Qu'elle soit munie d'un système de freinage automatique", "Sa couleur", "Son poids"], "a": 1,
        "e": "« Avant d'entreprendre cette étape le travailleur doit vérifier l'état de la meuleuse à disque. Celle-ci doit être munie d'un système de freinage automatique. »" },
      { "q": "Où faut-il positionner le trépied ?",
        "o": ["Collé à la foreuse", "À l'écart de la foreuse, en considérant la projection d'étincelles", "N'importe où", "Sous la foreuse"], "a": 1,
        "e": "« Il doit être positionné à l'écart de la foreuse et il faut considérer la projection d'étincelle. »" },
      { "t": "vf", "q": "Les raccords électriques doivent être accrochés pour ne pas être en contact avec l'eau.", "vrai": true,
        "e": "« Les raccords électriques doivent être accrochés pour ne pas être en contact avec l'eau. »" },
      { "t": "multi", "q": "Coche les affirmations VRAIES sur l'affûtage de trépan sous terre.",
        "o": ["Le port des goggles et de tous les autres EPI est obligatoire lors du ponçage.", "La poignée et le garde du disque de la meuleuse doivent obligatoirement être présents.", "On peut affûter sans vérifier le niveau du système de lubrification de la ponceuse.", "Choisir la bonne meule de ponçage en fonction du diamètre du bouton à affûter.", "Les raccords électriques peuvent rester au sol, en contact avec l'eau."],
        "a": [1, 3, 0],
        "e": "« Le port des goggles et de tous les autres EPI est obligatoire lors du ponçage. » « La poignée et le garde du disque de la meuleuse doivent obligatoirement être présents ; vérifier le bon fonctionnement de l'interrupteur. » « Choisir la bonne meule de ponçage en fonction du diamètre du bouton à affûter. »" }
    ],
    "ges-san-sec-001": [
      { "q": "Que faut-il faire avant toute modification à un équipement ou un système ?",
        "o": ["Rien de particulier", "Une analyse de risque", "Un simple courriel", "Attendre la prochaine réunion"], "a": 1,
        "e": "« Avant toute modification, une analyse de risque doit être effectué en considérant les impacts de chacun des changements sur les opérations de l'équipement. »" },
      { "q": "Qui a l'autorité d'autoriser une modification sur une foreuse CUBEX ?",
        "o": ["Le foreur", "Le directeur entretien", "N'importe quel superviseur", "Le fournisseur seulement"], "a": 1,
        "e": "« Foreuse Cubex : Directeur entretien »" },
      { "t": "vf", "q": "Le protocole ne s'applique pas aux travaux d'entretien ou de réparation normaux où les paramètres ou spécifications de conception d'origine ne sont pas modifiés.", "vrai": true,
        "e": "« Le protocole ne s'applique pas aux travaux d'entretien ou de réparation normaux où les paramètres ou spécifications de conception d'origine ne sont pas modifiés. »" }
    ],
    "procedure-serrage-marteau": [
      { "t": "trou", "q": "Sur un marteau NEUF, on torque à ______ sur l'écrou (nut).",
        "o": ["100 pi-lbs", "250 pi-lbs", "800 pi-lbs", "1200 pi-lbs"], "a": 1,
        "e": "« Torquer à 250 PD/LBS sur l'écrou (Nut) »" },
      { "q": "Sur un marteau NEUF, à quel couple torque-t-on les boulons (bolt) ?",
        "o": ["250 pi-lbs", "800 pi-lbs", "1200 pi-lbs", "2000 pi-lbs"], "a": 2,
        "e": "« Torquer à 1200 PD/LBS sur le boulon (Bolt) »",
        "img": "images/figures/procedure-serrage-marteau-3.jpg", "detail": "Les boulons (bolt) se serrent sur le dessus du marteau." },
      { "q": "Sur un marteau usé, a-t-on le droit de meuler la V-30 ?",
        "o": ["Oui, si nécessaire", "Non, jamais — seulement planer le marteau", "Oui, mais seulement en surface", "Seulement avec autorisation"], "a": 1,
        "e": "« N.B. Ne Jamais Meuler (Grinder) la V-30. »" },
      { "q": "Où met-on la rondelle (washer) lors du serrage sur un marteau usé ?",
        "o": ["Sur l'écrou (nut) seulement", "Sur le boulon (bolt) seulement", "Peu importe", "Jamais de rondelle"], "a": 1,
        "e": "« Toujours mettre la rondelle (Washer) sur le Boulon (Bolt). Non pas sur l'écrou (Nut) »" },
      { "t": "multi", "q": "Coche les affirmations VRAIES sur le serrage et l'entretien du marteau.",
        "o": ["Avant de remonter un marteau usé, nettoyer la boue de forage et/ou la rouille et vérifier l'usure.", "Ne pas utiliser d'anti-seize sur les boulons servant à serrer les rondelles (washer).", "On peut meuler la V-30 elle-même pour ajuster la surface.", "Sur un marteau neuf, torquer à 250 pi-lbs sur l'écrou (nut), puis à 1200 pi-lbs sur le boulon (bolt).", "La rondelle (washer) se place sur l'écrou (nut)."],
        "a": [3, 0, 1],
        "e": "« Marteau usé, avant remontage : retirer le marteau de la V-30, nettoyer la boue de forage et/ou la rouille, vérifier l'usure […]. » « Ne pas utiliser d'anti-seize sur les boulons servant à serrer les rondelles (washer) — seulement sur les boulons (bolt) prévus. » « Marteau neuf : […] torquer à 250 pi-lbs sur l'écrou (nut) […], puis torquer à 1200 pi-lbs sur le boulon (bolt) […]. »" }
    ]
  };
  var T = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(Q).forEach(function (id) { T[id] = (T[id] || []).concat(Q[id]); });
})();
