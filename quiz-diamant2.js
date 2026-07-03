/* ===========================================================================
   QUIZ — FORAGE AU DIAMANT, 2e série (questions de détail + difficiles qui
   exigent d'avoir lu la procédure). Citations fidèles des PDF officiels.
   =========================================================================== */
(function () {
  var DD2 = {
    "pro-dd-st-001": [
      { "q": "À quel moment boulonne-t-on le bearing avec le bushing standard sur le clam ?",
        "o": ["Au tout début", "Une fois le core barrel au fond du trou", "Avant de forer", "Jamais"], "a": 1,
        "e": "« Boulonner le bearing avec le bushing standard sur le clam une fois le core barrel au fond du trou. »" }
    ],
    "pro-dd-st-002": [
      { "q": "Où ne faut-il jamais déposer les tubes carottiers pour l'entreposage ?",
        "o": ["Sur la table", "Par terre ou à la hauteur du visage", "Dans le rack", "Près du mur"], "a": 1,
        "e": "« Ne jamais mettre les tubes par terre ou à la hauteur du visage. »" },
      { "q": "Qui doit toujours vérifier les boîtes avant qu'elles soient fermées ?",
        "o": ["L'aide-foreur", "Le foreur", "Le superviseur", "Le géologue"], "a": 1,
        "e": "« Le foreur doit toujours vérifier les boites avant qu'elles soient fermées. »" }
    ],
    "pro-dd-st-003": [
      { "q": "À partir de quelle hauteur de plancher faut-il installer des garde-corps ?",
        "o": ["Plus haut que 6 pouces", "Plus haut que 12 pouces", "Plus haut que 24 pouces", "Jamais"], "a": 1,
        "e": "« Si le plancher est plus haut que 12 pouces, des garde-corps devront être installés et respecter l'article 12 du RSST. »" },
      { "q": "Quelles dimensions doit respecter une marche de plancher ?",
        "o": ["Profondeur 8'' min, largeur 36'' min à 60'' max, hauteur max 12''", "Aucune dimension imposée", "1 pied de haut minimum", "Largeur libre"], "a": 0,
        "e": "« Elles devront avoir une profondeur de 8'' minimum, une largeur de 36'' minimum, un maximum de 60'' de largeur et une hauteur maximum de 12 pouces. »" }    ],
    "pro-dd-st-004": [
      { "q": "À quelle étape l'aide-foreur peut-il rester dans la zone de travail et utiliser le dead man ?",
        "o": ["En tout temps", "Seulement pour retirer le tube carottier des tiges de forage", "Pendant le mouvement du treuil", "Jamais"], "a": 1,
        "e": "« A cette étape seulement, il est permis à l'aide foreur de rester dans la zone de travail et d'utiliser le dead man pour sortir le tube des tiges. »" }
    ],
    "pro-dd-st-006": [
    ],
    "pro-dd-st-007": [
      { "q": "Combien de douches oculaires minimum doivent être sur le site de cimentation ?",
        "o": ["Aucune", "Minimum 2", "Une seule", "Quatre"], "a": 1,
        "e": "« Douches oculaires (minimum 2). »" },
      { "q": "Quelles barrures utilise-t-on pour connecter l'alimentation d'eau au header ?",
        "o": ["Des colliers ordinaires", "Les barrures CHICAGO", "Du ruban", "Aucune"], "a": 1,
        "e": "« Connecter l'alimentation d'eau au header, ne pas oublier de mettre les barrures CHICAGO. »" }
    ],
    "pro-dd-st-008": [
      { "q": "Quelle est la capacité maximale du support en tiges HQ ?",
        "o": ["240 tiges", "108 tiges (324 m)", "184 tiges", "50 tiges"], "a": 1,
        "e": "« La capacité maximale en fonction de la résistance du support est de : HQ = 108 tiges, 324m ; NQ = 184 tiges, 552m ; BQ = 240 tiges, 720m. »" },
      { "q": "À quelle hauteur du sol doivent être les crochets de la chaîne de retenue ?",
        "o": ["Entre 12 et 24 po", "Maximum 72 po et minimum 66 po du sol", "À 5 po", "Au plafond"], "a": 1,
        "e": "« Les crochets doivent être à maximum 72 pouces et minimum 66 pouces du sol pour s'assurer que la chaîne 'lousse' ne sera jamais moins de 5 pieds du sol au centre. »" },
      { "q": "Quel outil est préconisé pour séparer des tiges difficiles à prendre (graissées) ?",
        "o": ["Les mains", "Un tournevis plat", "Une clé à tube", "Un marteau"], "a": 1,
        "e": "« L'utilisation d'un tournevis plat sera préconisée pour les séparer et aider à les prendre. »" }
    ],
    "pro-dd-st-011": [
      { "q": "Avec quoi serre-t-on l'écrou du frein manuel (brake tube), et selon quel critère ?",
        "o": ["À la main", "La clé dynamométrique, couple établi selon la pression d'eau (tableau)", "Au pipe wrench", "Une clé à molette, au hasard"], "a": 1,
        "e": "« Serrer l'écrou du frein manuel (brake tube) à l'aide de la clé dynamométrique. Le couple de serrage doit être établi en fonction de la pression d'eau (TABLEAU). »" },
      { "q": "Si le câble se détend pendant la sortie, comment contrôler la remontée du tube ?",
        "o": ["Couper la pompe", "Avec la valve de purge", "Tirer plus fort", "Lâcher le câble"], "a": 1,
        "e": "« Si le câble se détend, contrôler la remontée du tube avec la valve de purge. »" },
      { "q": "Cas particulier (pression importante, tube coincé ou câble sectionné) : que pousse-t-on jusqu'au tube ?",
        "o": ["De l'air", "Un bouchon de type 'VAN RUTH', avec la pression d'eau", "Une tige d'acier", "Du ciment"], "a": 1,
        "e": "« Pousser un bouchon de type 'VAN RUTH' avec la pression d'eau jusqu'au tube carottier afin de prévenir l'éjection du tube carottier. »" }    ],
    "pro-op-dd-005": [
      { "q": "Combien de boulons ¾ faut-il dévisser sur le couvert des jaws, et avec quelle clé ?",
        "o": ["9 boulons, clé ¾", "6 boulons ¾, avec une clé 1'' 1/8", "3 boulons, clé 1''", "12 boulons"], "a": 1,
        "e": "« Dévisser les 6 boulons ¾ du couvert des jaws (mâchoires) avec une clé 1'' 1/8. »" }
    ],
    "pro-op-dd-012": [
      { "q": "Distance minimale interdite de forer d'un trou contenant des explosifs à la suite d'un raté ?",
        "o": ["150 mm", "1,5 m (4,9 pi)", "50 cm", "7 m"], "a": 1,
        "e": "« Il est interdit de forer à une distance inférieure à : […] 2° 1,5 m (4,9 pi) d'un trou contenant des explosifs à la suite d'un raté. »" },
      { "q": "Qui décide du recours au forage à distance ?",
        "o": ["Le foreur seul", "Le département de géologie du client (selon les dangers présents)", "L'aide-foreur", "Personne"], "a": 1,
        "e": "« Le forage à distance doit être décidé par le département de géologie du client en fonction des dangers pouvant être présents lors du forage. »" }
    ],
    "pro-op-dd-013": [
      { "q": "Avec la barre de force, comment doit-on orienter la barre ?",
        "o": ["Le côté pointu vers le bas", "Le côté le plus long (côté plat) vers le bas, pour l'adhérence au plancher", "À la verticale", "Peu importe"], "a": 1,
        "e": "« TOUJOURS ORIENTER LE CÔTÉ LE PLUS LONG (OU CÔTÉ PLAT) DE LA BARRE VERS LE BAS AFIN D'ASSURER UNE BONNE ADHÉRENCE AU PLANCHER. »" },
      { "q": "Si vous avez de la difficulté à lever la barre de force, qu'est-ce que cela signifie ?",
        "o": ["Elle est trop courte", "Elle est glissée trop loin sous le treuil", "Le plancher est mouillé", "Elle est brisée"], "a": 1,
        "e": "« SI VOUS AVEZ DE LA DIFFICULTÉ À LEVER LA BARRE C'EST QU'ELLE EST GLISSÉE TROP LOIN SOUS LE TREUIL. »" },
      { "q": "Avec la patte de swing, de quel côté placer la barre ?",
        "o": ["Du même côté que le mouvement", "Du côté inverse au mouvement désiré", "Au centre", "Peu importe"], "a": 1,
        "e": "« Insérer la barre de swing du bon côté de la tour et l'incliner du côté opposé au mouvement recherché. La barre doit être placée du côté inverse au mouvement désiré. »" }
    ],
    "pro-dd-st-009-1": [
      { "q": "STM-1500 SANS lift kit : quel ajustement est requis ?",
        "o": ["Plancher de 24 pouces", "Ancrage en bas", "Aucun", "Lift kit obligatoire"], "a": 1,
        "e": "« STM-1500 SANS lift kit : Ancrage en bas. »" }    ],
    "pro-dd-st-009-2": [
    ],
    "ss-dd-st-001": [
      { "q": "À côté de quoi le dead man doit-il être positionné (à 1,5 m min de la tour) ?",
        "o": ["De la porte", "À côté du rack à rod", "Du treuil", "De la pompe à eau"], "a": 1,
        "e": "« Le dead man doit être positionné à un minimum de 1,5 mètre de la tour de la foreuse, à côté du rack à rod. »" }
    ],
    "dr600-op-002": [
      { "q": "Quelle est la première étape du déplacement autonome de la DR-600-MU ?",
        "o": ["Démarrer la télécommande", "Actionner les 4 pattes de coins pour que les roues ne touchent plus au sol", "Mettre la master switch à On", "Détacher le câble"], "a": 1,
        "e": "« Actionner les 4 pattes de coins afin que les roues ne touchent plus au sol. »" },
      { "q": "Que faut-il vérifier au centre des 4 roues avant le déplacement ?",
        "o": ["La pression des pneus", "Que l'engagement est bien dévissé AU COMPLET", "La graisse", "Rien"], "a": 1,
        "e": "« S'assurer que l'engagement au centre des 4 roues est bien dévissé AU COMPLET. »" }
    ],
    "std-dd-installation": [
      { "q": "De quel(s) côté(s) peuvent être les contrôles des foreuses DR ?",
        "o": ["Toujours à gauche", "À droite ou à gauche", "Toujours au centre", "À l'arrière"], "a": 1,
        "e": "« Les contrôles des DR peuvent aussi être à droite ou à gauche. »" }
    ]
  };
  var Q = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(DD2).forEach(function (id) { Q[id] = (Q[id] || []).concat(DD2[id]); });
})();
