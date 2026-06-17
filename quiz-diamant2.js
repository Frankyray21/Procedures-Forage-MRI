/* ===========================================================================
   QUIZ — FORAGE AU DIAMANT, 2e série (questions de détail + difficiles qui
   exigent d'avoir lu la procédure). Citations fidèles des PDF officiels.
   =========================================================================== */
(function () {
  var DD2 = {
    "pro-dd-st-001": [
      { "q": "Pour vous mettre en 6 mètres au départ, combien de tiges de 3 m faut-il forer ?",
        "o": ["Une", "Deux tiges de 3 mètres", "Trois", "Aucune"], "a": 1,
        "e": "« Forer 2 tiges de 3 mètres si vous voulez vous mettre en 6 mètres. »" },
      { "q": "À quel moment boulonne-t-on le bearing avec le bushing standard sur le clam ?",
        "o": ["Au tout début", "Une fois le core barrel au fond du trou", "Avant de forer", "Jamais"], "a": 1,
        "e": "« Boulonner le bearing avec le bushing standard sur le clam une fois le core barrel au fond du trou. »" }
    ],
    "pro-dd-st-002": [
      { "q": "Une fois le tube vide, que vérifie-t-on et avec quoi ?",
        "o": ["Rien", "Le bon fonctionnement du core spring, avec un bout de carotte (retient-il bien ?)", "Le poids du tube", "La couleur"], "a": 1,
        "e": "« Quand le tube est vide, vérifier le bon fonctionnement du core spring en utilisant un bout de carotte pour voir s'il la retient bien. »" },
      { "q": "Où ne faut-il jamais déposer les tubes carottiers pour l'entreposage ?",
        "o": ["Sur la table", "Par terre ou à la hauteur du visage", "Dans le rack", "Près du mur"], "a": 1,
        "e": "« Ne jamais mettre les tubes par terre ou à la hauteur du visage. »" },
      { "q": "Avec une longue tige d'acier dans le tube, qu'est-il interdit de faire ?",
        "o": ["La pousser doucement", "Un mouvement de va-et-vient pour frapper la carotte", "La graisser", "La retirer"], "a": 1,
        "e": "« Il est interdit d'insérer une longue tige d'acier dans le tube et d'effectuer un mouvement de va-et-vient avec la tige pour frapper la carotte. »" },
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
        "e": "« Elles devront avoir une profondeur de 8'' minimum, une largeur de 36'' minimum, un maximum de 60'' de largeur et une hauteur maximum de 12 pouces. »" },
      { "q": "Avant de déplacer les équipements, de quoi le superviseur doit-il s'assurer (inspection) ?",
        "o": ["Rien de spécial", "Plancher exempt de débris et plat, fonds de trous trouvés et marqués", "Que la foreuse est démarrée", "Que l'eau coule"], "a": 1,
        "e": "« Il doit s'assurer que : Que le plancher est exempt de débris • Que le plancher est plat • Que les fonds de trous ont été trouvés et marqués. »" }
    ],
    "pro-dd-st-004": [
      { "q": "Pourquoi le loading chamber doit-il rester en place jusqu'à la remontée du tube au collet ?",
        "o": ["Pour la propreté", "Pour éviter l'éjection du tube lors d'interception de veine d'eau ou de gaz", "Pour gagner du temps", "Aucune raison"], "a": 1,
        "e": "« Il est obligatoire d'avoir le loading chambers en place en tout temps jusqu'à la remontée du tube au collet pour éviter l'éjection du tube lors d'interception de veine d'eau ou de gaz. »" },
      { "q": "Forage en 6 m : avant de sortir le 2e tube des tiges, qu'attend-on ?",
        "o": ["Rien", "Que le partenaire (avec l'autre tube) ait traversé la porte, en gardant un contact visuel", "Que la pompe démarre", "10 secondes"], "a": 1,
        "e": "« Le travailleur qui tient le tube […] doit garder un contact visuel sur son partenaire qui s'éloigne avec l'autre tube. Une fois que celui-ci a traversé la porte, le deuxième tube pourra alors être sorti des tiges. »" },
      { "q": "À quelle étape l'aide-foreur peut-il rester dans la zone de travail et utiliser le dead man ?",
        "o": ["En tout temps", "Seulement pour retirer le tube carottier des tiges de forage", "Pendant le mouvement du treuil", "Jamais"], "a": 1,
        "e": "« A cette étape seulement, il est permis à l'aide foreur de rester dans la zone de travail et d'utiliser le dead man pour sortir le tube des tiges. »" }
    ],
    "pro-dd-st-006": [
      { "q": "Pourquoi remonter le tube doucement au début ?",
        "o": ["Pour économiser le treuil", "Pour être sûr que le tube carottier est bien accroché avant de remonter à pleine puissance", "Pour refroidir", "Aucune raison"], "a": 1,
        "e": "« Remonter doucement au début pour être sûr que le tube carottier est bien accroché avant de remonter à pleine puissance. »" },
      { "q": "Forage en 6 m : quand peut-on sortir le deuxième tube des tiges ?",
        "o": ["Tout de suite", "Quand le partenaire a traversé les portes (contact visuel maintenu)", "Après 1 minute", "Jamais"], "a": 1,
        "e": "« Quand ce dernier a traversé les portes, le deuxième tube pourra être sorti des tiges de forage. »" }
    ],
    "pro-dd-st-007": [
      { "q": "Combien de douches oculaires minimum doivent être sur le site de cimentation ?",
        "o": ["Aucune", "Minimum 2", "Une seule", "Quatre"], "a": 1,
        "e": "« Douches oculaires (minimum 2). »" },
      { "q": "Jusqu'à quand le port des EPI est-il obligatoire ?",
        "o": ["Jusqu'au début du pompage", "Dès la manipulation des sacs de ciment jusqu'à la fin du nettoyage complet de la machine", "Seulement au mélange", "10 minutes"], "a": 1,
        "e": "« Le port des EPI est obligatoire à partir du moment où l'on commence à manipuler les sacs de ciment jusqu'à ce que le nettoyage complet de la machine à ciment soit terminé. »" },
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
      { "q": "Pourquoi ajuster la chaîne de retenue des tiges ?",
        "o": ["Pour l'esthétique", "Pour que les tiges ne puissent dépasser 80° si elles chutent vers un travailleur", "Pour gagner de la place", "Aucune raison"], "a": 1,
        "e": "« La chaîne doit être ajustée de façon que les tiges ne puissent dépasser 80° si elles chutent vers un travailleur. »" },
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
        "e": "« Pousser un bouchon de type 'VAN RUTH' avec la pression d'eau jusqu'au tube carottier afin de prévenir l'éjection du tube carottier. »" },
      { "q": "Où faut-il toujours se placer pendant cette récupération ?",
        "o": ["Devant le tube", "Hors de la ligne de tir du tube carottier", "À côté du treuil", "Sous le tube"], "a": 1,
        "e": "« SOYEZ VIGILANT. TOUJOURS SE PLACER HORS DE LA LIGNE DE TIR DU TUBE CAROTTIER. »" }
    ],
    "pro-op-dd-005": [
      { "q": "Pourquoi remettre les 3 boulons ½ du cône sans les bushings ?",
        "o": ["Pour gagner du temps", "Pour empêcher la projection du cône", "Pour serrer plus fort", "Aucune raison"], "a": 1,
        "e": "« Enlever les 3 boulons 1/2 […] avec les bushing sur le cône et les remettre sans les bushing pour empêcher la projection du cône. »" },
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
        "e": "« STM-1500 SANS lift kit : Ancrage en bas. »" },
      { "q": "Avec quel outil serre-t-on les boulons grade #8 (forage ascendant) ?",
        "o": ["Une clé à molette", "Une clé dynamométrique", "Un pipe wrench", "À la main"], "a": 1,
        "e": "« OUTILS NÉCESSAIRES : […] Clé dynamométrique […] » (avec 9 nouveaux boulons ½ grade #8 de 2''¼)." }
    ],
    "pro-dd-st-009-2": [
      { "q": "Pour la DR-600 #2923, qui doit s'impliquer dans l'analyse pour déterminer les contrôles ?",
        "o": ["Le foreur seul", "Le contremaître-général", "Le client", "Personne"], "a": 1,
        "e": "« Le contremaître-général doit s'impliquer dans l'analyse de la situation pour déterminer les contrôles à mettre en place. »" }
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
