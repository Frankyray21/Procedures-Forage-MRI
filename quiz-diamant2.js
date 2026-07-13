/* ===========================================================================
   QUIZ — FORAGE AU DIAMANT, 2e série (questions de détail + difficiles qui
   exigent d'avoir lu la procédure). Citations fidèles des PDF officiels.
   =========================================================================== */
(function () {
  var DD2 = {
    "pro-dd-st-001": [
      { "q": "Quand boulonnes-tu le bearing sur le clam avec le bushing standard ?",
        "o": ["Au début", "Quand le core barrel est au fond du trou", "Avant de forer", "Jamais"], "a": 1,
        "e": "« Boulonner le bearing avec le bushing standard sur le clam une fois le core barrel au fond du trou. »" }
    ],
    "pro-dd-st-002": [
      { "q": "Où ne faut-il jamais poser les tubes carottiers ?",
        "o": ["Sur la table", "Par terre ou à la hauteur du visage", "Dans le rack", "Près du mur"], "a": 1,
        "e": "« Ne jamais mettre les tubes par terre ou à la hauteur du visage. »" },
      { "q": "Qui doit vérifier les boîtes avant de les fermer ?",
        "o": ["L'aide-foreur", "Le foreur", "Le superviseur", "Le géologue"], "a": 1,
        "e": "« Le foreur doit toujours vérifier les boites avant qu'elles soient fermées. »" }
    ],
    "pro-dd-st-003": [
      { "q": "Quand le plancher dépasse quelle hauteur faut-il mettre des garde-corps ?",
        "o": ["Plus haut que 6 pouces", "Plus haut que 12 pouces", "Plus haut que 24 pouces", "Jamais"], "a": 1,
        "e": "« Si le plancher est plus haut que 12 pouces, des garde-corps devront être installés et respecter l'article 12 du RSST. »" }],
    "pro-dd-st-004": [
      { "q": "Quand l'aide-foreur peut-il rester dans la zone et utiliser le dead man ?",
        "o": ["Tout le temps", "Seulement pour sortir le tube carottier des tiges", "Quand le treuil bouge", "Jamais"], "a": 1,
        "e": "« A cette étape seulement, il est permis à l'aide foreur de rester dans la zone de travail et d'utiliser le dead man pour sortir le tube des tiges. »" }
    ],
    "pro-dd-st-006": [
    ],
    "pro-dd-st-007": [
      { "q": "Combien de douches pour les yeux faut-il au moins sur le site ?",
        "o": ["Aucune", "Au moins 2", "Une seule", "Quatre"], "a": 1,
        "e": "« Douches oculaires (minimum 2). »" }    ],
    "pro-dd-st-008": [
      { "q": "Combien de tiges HQ le support peut-il tenir au maximum ?",
        "o": ["240 tiges", "108 tiges (324 m)", "184 tiges", "50 tiges"], "a": 1,
        "e": "« La capacité maximale en fonction de la résistance du support est de : HQ = 108 tiges, 324m ; NQ = 184 tiges, 552m ; BQ = 240 tiges, 720m. »" },
      { "q": "Quel outil sert à séparer des tiges graissées, dures à prendre ?",
        "o": ["Les mains", "Un tournevis plat", "Une clé à tube", "Un marteau"], "a": 1,
        "e": "« L'utilisation d'un tournevis plat sera préconisée pour les séparer et aider à les prendre. »" }
    ],
    "pro-dd-st-011": [
      { "q": "Comment serres-tu l'écrou du frein manuel (brake tube) ?",
        "o": ["À la main", "Avec la clé dynamométrique. Le serrage suit la pression d'eau (tableau)", "Avec la clé à tuyau (pipe wrench)", "Avec une clé à molette, au hasard"], "a": 1,
        "e": "« Serrer l'écrou du frein manuel (brake tube) à l'aide de la clé dynamométrique. Le couple de serrage doit être établi en fonction de la pression d'eau (TABLEAU). »" },
      { "q": "Le câble se détend pendant que tu sors le tube. Comment contrôles-tu la remontée du tube ?",
        "o": ["Tu coupes la pompe", "Avec la valve de purge", "Tu tires plus fort", "Tu lâches le câble"], "a": 1,
        "e": "« Si le câble se détend, contrôler la remontée du tube avec la valve de purge. »" },
      { "q": "Cas spécial : forte pression, tube coincé ou câble coupé. Qu'est-ce que tu pousses jusqu'au tube ?",
        "o": ["De l'air", "Un bouchon 'VAN RUTH', poussé par l'eau", "Une tige d'acier", "Du ciment"], "a": 1,
        "e": "« Pousser un bouchon de type 'VAN RUTH' avec la pression d'eau jusqu'au tube carottier afin de prévenir l'éjection du tube carottier. »" }    ],
    "pro-op-dd-005": [
      { "q": "Combien de boulons ¾ dévisses-tu sur le couvert des jaws, et avec quelle clé ?",
        "o": ["9 boulons, clé ¾", "6 boulons ¾, clé 1'' 1/8", "3 boulons, clé 1''", "12 boulons"], "a": 1,
        "e": "« Dévisser les 6 boulons ¾ du couvert des jaws (mâchoires) avec une clé 1'' 1/8. »" }
    ],
    "pro-op-dd-012": [
      { "q": "Un trou a raté et contient encore des explosifs. On ne peut pas forer trop près. Distance minimale ?",
        "o": ["150 mm", "1,5 m (4,9 pi)", "50 cm", "7 m"], "a": 1,
        "e": "« Il est interdit de forer à une distance inférieure à : […] 2° 1,5 m (4,9 pi) d'un trou contenant des explosifs à la suite d'un raté. »" },
      { "q": "Qui décide qu'on va forer à distance ?",
        "o": ["Le foreur, seul", "Le service de géologie du client, selon les dangers", "L'aide-foreur", "Personne"], "a": 1,
        "e": "« Le forage à distance doit être décidé par le département de géologie du client en fonction des dangers pouvant être présents lors du forage. »" }
    ],
    "pro-op-dd-013": [
      { "q": "Tu utilises la barre de force. Quel côté mets-tu vers le bas ?",
        "o": ["Le côté pointu vers le bas", "Le côté plat (le plus long) vers le bas, pour bien accrocher au sol", "À la verticale", "Peu importe"], "a": 1,
        "e": "« TOUJOURS ORIENTER LE CÔTÉ LE PLUS LONG (OU CÔTÉ PLAT) DE LA BARRE VERS LE BAS AFIN D'ASSURER UNE BONNE ADHÉRENCE AU PLANCHER. »" },
      { "q": "La barre de force est dure à lever. Pourquoi ?",
        "o": ["Elle est trop courte", "Elle est glissée trop loin sous le treuil", "Le plancher est mouillé", "Elle est brisée"], "a": 1,
        "e": "« SI VOUS AVEZ DE LA DIFFICULTÉ À LEVER LA BARRE C'EST QU'ELLE EST GLISSÉE TROP LOIN SOUS LE TREUIL. »" },
      { "q": "Tu utilises la patte de swing. De quel côté mets-tu la barre ?",
        "o": ["Du même côté que le mouvement", "Du côté opposé au mouvement voulu", "Au centre", "Peu importe"], "a": 1,
        "e": "« Insérer la barre de swing du bon côté de la tour et l'incliner du côté opposé au mouvement recherché. La barre doit être placée du côté inverse au mouvement désiré. »" }
    ],
    "pro-dd-st-009-1": [
      { "q": "Sur la STM-1500 sans lift kit, que faut-il faire?",
        "o": ["Mettre un plancher de 24 pouces", "Ancrer en bas", "Rien à faire", "Mettre un lift kit"], "a": 1,
        "e": "« STM-1500 SANS lift kit : Ancrage en bas. »" }    ],
    "pro-dd-st-009-2": [
    ],
    "ss-dd-st-001": [
      { "q": "À côté de quoi place-t-on le dead man ?",
        "o": ["La porte", "Le rack à rod", "Le treuil", "La pompe à eau"], "a": 1,
        "e": "« Le dead man doit être positionné […] à côté du rack à rod. »" }
    ],
    "dr600-op-002": [
      { "q": "La foreuse va se déplacer seule. Qu'est-ce qui lève les roues du sol ?",
        "o": ["La télécommande", "Les 4 pattes de coins", "La master switch", "Le treuil principal"], "a": 1,
        "e": "« Actionner les 4 pattes de coins afin que les roues ne touchent plus au sol. »" },
      { "q": "Avant de déplacer la foreuse, que vérifies-tu au centre des 4 roues ?",
        "o": ["La pression des pneus", "Que l'engagement est dévissé AU COMPLET", "La graisse", "Rien"], "a": 1,
        "e": "« S'assurer que l'engagement au centre des 4 roues est bien dévissé AU COMPLET. »" }
    ],
    "std-dd-installation": [
      { "q": "Les contrôles des foreuses DR sont de quel côté ?",
        "o": ["Toujours à gauche", "À droite ou à gauche", "Toujours au centre", "À l'arrière"], "a": 1,
        "e": "« Les contrôles des DR peuvent aussi être à droite ou à gauche. »" }
    ]
  };
  var Q = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(DD2).forEach(function (id) { Q[id] = (Q[id] || []).concat(DD2[id]); });
})();
