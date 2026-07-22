/* ===========================================================================
   QUIZ — FORAGE AU DIAMANT, 2e série (questions de détail + difficiles qui
   exigent d'avoir lu la procédure). Citations fidèles des PDF officiels.
   =========================================================================== */
(function () {
  var DD2 = {
    "pro-dd-st-001": [
      { "t": "erreur", "q": "Un collègue installe le bearing une fois le core barrel au fond du trou. Quelle action est une ERREUR ?",
        "o": ["Boulonner le bearing avec le bushing standard", "Poser le bushing standard sur le clam", "Utiliser un bushing non standard sur le clam", "S'assurer que le core barrel est au fond du trou"], "a": 2,
        "e": "« Boulonner le bearing avec le bushing standard sur le clam une fois le core barrel au fond du trou. »" }
    ],
    "pro-dd-st-002": [
      { "t": "erreur", "q": "Un collègue manipule des tubes carottiers. Quelle action est une ERREUR ?",
        "o": ["Éviter de mettre les tubes à la hauteur du visage", "Ne jamais déposer les tubes directement au sol", "Garder les tubes loin de la hauteur du visage", "Déposer les tubes par terre entre deux manipulations"], "a": 3,
        "e": "« Ne jamais mettre les tubes par terre ou à la hauteur du visage. »" },
      { "q": "Qui doit vérifier les boîtes avant de les fermer ?",
        "o": ["L'aide-foreur", "Le foreur", "Le superviseur", "Le géologue"], "a": 1,
        "e": "« Le foreur doit toujours vérifier les boites avant qu'elles soient fermées. »" }
    ],
    "pro-dd-st-003": [
      { "t": "trou", "q": "Des garde-corps doivent être installés si le plancher est ______.",
        "o": ["Plus haut que 6 pouces", "Plus haut que 12 pouces", "Plus haut que 24 pouces", "Jamais"], "a": 1,
        "e": "« Si le plancher est plus haut que 12 pouces, des garde-corps devront être installés et respecter l'article 12 du RSST. »" }],
    "pro-dd-st-004": [
      { "t": "vf", "q": "À cette étape seulement, il est permis à l'aide-foreur de rester dans la zone de travail et d'utiliser le dead man pour sortir le tube des tiges.",
        "vrai": true,
        "e": "« A cette étape seulement, il est permis à l'aide foreur de rester dans la zone de travail et d'utiliser le dead man pour sortir le tube des tiges. »" }
    ],
    "pro-dd-st-006": [
    ],
    "pro-dd-st-007": [
      { "t": "trou", "q": "Sur le site, il faut un minimum de ______ douches oculaires.",
        "o": ["Aucune", "Au moins 2", "Une seule", "Quatre"], "a": 1,
        "e": "« Douches oculaires (minimum 2). »" }    ],
    "pro-dd-st-008": [
      { "t": "trou", "q": "La capacité maximale du support en tiges HQ est de ______.",
        "o": ["240 tiges", "108 tiges (324 m)", "184 tiges", "50 tiges"], "a": 1,
        "e": "« La capacité maximale en fonction de la résistance du support est de : HQ = 108 tiges, 324m ; NQ = 184 tiges, 552m ; BQ = 240 tiges, 720m. »" },
      { "q": "Quel outil sert à séparer des tiges graissées, dures à prendre ?",
        "o": ["Les mains", "Un tournevis plat", "Une clé à tube", "Un marteau"], "a": 1,
        "e": "« L'utilisation d'un tournevis plat sera préconisée pour les séparer et aider à les prendre. »" }
    ],
    "pro-dd-st-011": [
      { "t": "vf", "q": "On serre l'écrou du frein manuel (brake tube) à l'aide de la clé dynamométrique, le couple de serrage étant établi en fonction de la pression d'eau.",
        "vrai": true,
        "e": "« Serrer l'écrou du frein manuel (brake tube) à l'aide de la clé dynamométrique. Le couple de serrage doit être établi en fonction de la pression d'eau (TABLEAU). »" },
      { "q": "Le câble se détend pendant que tu sors le tube. Comment contrôles-tu la remontée du tube ?",
        "o": ["Tu coupes la pompe", "Avec la valve de purge", "Tu tires plus fort", "Tu lâches le câble"], "a": 1,
        "e": "« Si le câble se détend, contrôler la remontée du tube avec la valve de purge. »" },
      { "q": "Cas spécial : forte pression, tube coincé ou câble coupé. Qu'est-ce que tu pousses jusqu'au tube ?",
        "o": ["De l'air", "Un bouchon 'VAN RUTH', poussé par l'eau", "Une tige d'acier", "Du ciment"], "a": 1,
        "e": "« Pousser un bouchon de type 'VAN RUTH' avec la pression d'eau jusqu'au tube carottier afin de prévenir l'éjection du tube carottier. »" }    ],
    "pro-op-dd-005": [
      { "t": "trou", "q": "On dévisse les 6 boulons ¾ du couvert des jaws (mâchoires) avec une clé ______.",
        "o": ["3/4", "1'' 1/8", "7/8", "1'' 1/2"], "a": 1,
        "e": "« Dévisser les 6 boulons ¾ du couvert des jaws (mâchoires) avec une clé 1'' 1/8. »" }
    ],
    "pro-op-dd-012": [
      { "t": "trou", "q": "Il est interdit de forer à une distance inférieure à ______ d'un trou contenant des explosifs à la suite d'un raté.",
        "o": ["150 mm", "1,5 m (4,9 pi)", "50 cm", "7 m"], "a": 1,
        "e": "« Il est interdit de forer à une distance inférieure à : […] 2° 1,5 m (4,9 pi) d'un trou contenant des explosifs à la suite d'un raté. »" },
      { "q": "Qui décide qu'on va forer à distance ?",
        "o": ["Le foreur, seul", "Le service de géologie du client, selon les dangers", "L'aide-foreur", "Personne"], "a": 1,
        "e": "« Le forage à distance doit être décidé par le département de géologie du client en fonction des dangers pouvant être présents lors du forage. »" }
    ],
    "pro-op-dd-013": [
      { "t": "vf", "q": "Avec la barre de force, il faut toujours orienter le côté le plus long (ou côté plat) de la barre vers le bas afin d'assurer une bonne adhérence au plancher.",
        "vrai": true,
        "e": "« TOUJOURS ORIENTER LE CÔTÉ LE PLUS LONG (OU CÔTÉ PLAT) DE LA BARRE VERS LE BAS AFIN D'ASSURER UNE BONNE ADHÉRENCE AU PLANCHER. »" },
      { "q": "La barre de force est dure à lever. Pourquoi ?",
        "o": ["Elle est trop courte", "Elle est glissée trop loin sous le treuil", "Le plancher est mouillé", "Elle est brisée"], "a": 1,
        "e": "« SI VOUS AVEZ DE LA DIFFICULTÉ À LEVER LA BARRE C'EST QU'ELLE EST GLISSÉE TROP LOIN SOUS LE TREUIL. »" },
      { "q": "Tu utilises la patte de swing. De quel côté mets-tu la barre ?",
        "o": ["Du même côté que le mouvement", "Du côté opposé au mouvement voulu", "Au centre", "Peu importe"], "a": 1,
        "e": "« Insérer la barre de swing du bon côté de la tour et l'incliner du côté opposé au mouvement recherché. La barre doit être placée du côté inverse au mouvement désiré. »" }
    ],
    "pro-dd-st-009-1": [
      { "t": "vf", "q": "Sur la STM-1500 sans lift kit, il faut faire un ancrage en bas.",
        "vrai": true,
        "e": "« STM-1500 SANS lift kit : Ancrage en bas. »" }    ],
    "pro-dd-st-009-2": [
    ],
    "ss-dd-st-001": [
      { "t": "vf", "q": "Le dead man doit être positionné à côté du rack à rod.",
        "vrai": true,
        "e": "« Le dead man doit être positionné […] à côté du rack à rod. »" }
    ],
    "dr600-op-002": [
      { "t": "vf", "q": "On actionne les 4 pattes de coins afin que les roues ne touchent plus au sol.",
        "vrai": true,
        "e": "« Actionner les 4 pattes de coins afin que les roues ne touchent plus au sol. »" },
      { "q": "Avant de déplacer la foreuse, que vérifies-tu au centre des 4 roues ?",
        "o": ["La pression des pneus", "Que l'engagement est dévissé AU COMPLET", "La graisse", "Rien"], "a": 1,
        "e": "« S'assurer que l'engagement au centre des 4 roues est bien dévissé AU COMPLET. »" }
    ],
    "std-dd-installation": [
      { "t": "vf", "q": "Les contrôles des foreuses DR peuvent aussi être à droite ou à gauche.",
        "vrai": true,
        "e": "« Les contrôles des DR peuvent aussi être à droite ou à gauche. »" }
    ]
  };
  var Q = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(DD2).forEach(function (id) { Q[id] = (Q[id] || []).concat(DD2[id]); });
})();
