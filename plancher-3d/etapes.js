/* Étapes de l'outil « Voir en 3D » du plancher PRO-DD-ST-003.
   n : numéro de l'étape dans la 3D (pièces du .glb dont l'extra s vaut n) ;
   0 = « Avant de commencer », 1 à 17 = étapes de la procédure, 18 = plancher
   secondaire.
   cam : cadrage de l'étape. tgt = point visé (mètres, repère du plancher :
   X le long de la galerie, Y vers le haut, Z en travers) ; dir = direction du
   point visé vers la caméra ; r = rayon de la zone à montrer. La distance est
   calculée selon la forme de l'écran (portrait ou paysage) pour que la zone
   entre toujours en entier.
   etiquettes : étiquettes propres à l'outil ({ pos, text }), en plus de
   celles du modèle.
   variante : écran de la variante 6 × 6 de 8 pi (après l'étape 11, comme
   l'encart de la vidéo) ; pas compté dans « Étape N sur 18 ». La structure de
   l'étape n y est montrée sans les planches, les pièces de 16 pi remplacées
   par les 6 × 6 de 8 pi (posés avec un contour rouge). detail : ligne en petit sous le texte.
   Étiquettes : plancher-etiquettes.json (notes et cotes, avec leurs étapes),
   exporté avec le .glb depuis le dépôt pieces-3d
   (scripts/export-plancher-app.mjs). */
export const ETAPES = [
  { n: 0, titre: 'Avant de commencer',
    texte: [
      'Lieux inspectés par le superviseur : sol plat, sans débris.',
      'Fonds de trous trouvés et marqués.',
      'À l\'entrée : barricade avec flasher orange, premiers soins (2 lave-yeux), extincteur.',
      'Grosses pièces de bois : toujours à deux.',
    ],
    cam: { tgt: [13.3, 0.7, 1.4], dir: [-0.35, 0.38, 0.86], r: 1.7 } },
  { n: 1, titre: 'Marquer la position du plancher',
    texte: [
      'Plan de forage en main : plancher placé selon la position de la foreuse.',
      'Laser Bosch au sol : il projette la ligne de référence.',
      'Tracer la ligne à la peinture sur la ligne du laser.',
      'Dimensions : 16 × 32 pi.',
    ],
    // Animation du laser Bosch (outil.js, laser()) : pose de l'appareil sur la rive (Z = −W/2) au
    // bout du plancher, faisceau, puis la peinture tracée en suivant la ligne (ms depuis l'arrivée).
    laser: { z: -2.4384, t: { pose: 700, faisceau: 2200, peinture: 3000, fin: 8000, reste: 1500 },
      cam: { tgt: [9.4, 0.1, -2.35], dir: [0.55, 0.45, 0.7], r: 1.6 },
      cam2: { tgt: [6.2, 0, -2.2], dir: [0.75, 0.55, 0.37], r: 4.2 } },
    etiquettes: [
      { pos: [10.3, 0.3, -2.44], text: 'Laser Bosch : ligne de référence projetée au sol', fen: [[700, 3000]] },
      { pos: [6.5, 0.1, -2.44], text: 'Tracer à la peinture sur la ligne du laser', fen: [[3000, 8000]] },
    ],
    cam: { tgt: [4.9, 0, 0], dir: [0.35, 0.85, 0.4], r: 5.6 } },
  { n: 2, titre: 'Trouver le point le plus haut',
    texte: [
      'Laser Bosch : trouve le point le plus haut du sol.',
      'Le premier madrier repose directement sur le sol à cet endroit.',
      'C\'est le repère de niveau de tout le plancher.',
    ],
    cam: { tgt: [0.9, -0.05, -1.7], dir: [-0.63, 0.34, 0.7], r: 2.2 } },
  { n: 3, titre: 'Structure de base en 6 × 6',
    texte: [
      'Madriers 6 × 6 dans le sens contraire du forage : les patins de la foreuse les croisent.',
      'Partir du point haut : plancher pas plus haut qu\'il faut, moins de blocage.',
    ],
    cam: { tgt: [1.5, 0.05, -1.3], dir: [0.8, 0.5, 0.35], r: 2.4 } },
  { n: 4, titre: 'Cadrage 16 × 16 pi',
    texte: [
      '1er madrier sur la ligne de peinture.',
      '2e madrier à 16 pi : cadrage 16 × 16 pi bien droit.',
      'Les autres 6 × 6 entre les deux, environ 32 po centre.',
    ],
    cam: { tgt: [2.44, -0.05, 0], dir: [0.38, 0.63, 0.68], r: 3.2 } },
  { n: 5, titre: 'Mettre de niveau',
    texte: [
      'Niveau de 48 po sur un 3 × 8 d\'au moins 8 pi.',
      'Sous chaque 6 × 6 : blocage (3 × 8 ou 6 × 6) et coins, en sens contraire du madrier.',
      'Au moins 6 appuis par madrier.',
      'Au bout : le blocage de jonction porte aussi la section 2.',
    ],
    cam: { tgt: [2.0, 0.02, 0.3], dir: [0.45, 0.3, 0.84], r: 1.7 } },
  { n: 6, titre: 'Couvrir en 3 × 8',
    texte: [
      'Planches 3 × 8 brut, dans le sens contraire des 6 × 6.',
      '1re planche : un tire-fond à chaque bout.',
      'Marcher sur la partie couverte : jamais enjamber les 6 × 6.',
    ],
    cam: { tgt: [2.4, 0.1, 0.5], dir: [-0.62, 0.55, 0.56], r: 2.6 } },
  { n: 7, titre: 'Resserrer les planches',
    texte: [
      'Vers la moitié de la section : visser la dernière planche (tire-fond à chaque bout).',
      'Enfoncer des coins : les planches se serrent.',
      'Visser la planche devant les coins, puis retirer les tire-fonds de la dernière.',
      'Sans ça, des écarts s\'ouvrent.',
    ],
    cam: { tgt: [2.9, 0.23, 1.15], dir: [0.3, 0.78, 0.55], r: 1.25 } },
  { n: 8, titre: 'Laisser deux planches libres',
    texte: [
      'Au bout de la section 1 (centre du plancher) : laisser 2 planches libres.',
      'Cet espace sert à partir la section 2.',
      'On les visse à la fin pour joindre les deux sections.',
    ],
    cam: { tgt: [4.58, 0.1, 0.3], dir: [0.52, 0.37, 0.77], r: 1.8 } },
  { n: 9, titre: 'Section 2 : hauteur au laser',
    texte: [
      'Section 2 : le laser Bosch donne la hauteur sous les 6 × 6.',
      'Ici, le sol descend vers l\'entrée : il faut monter la structure.',
    ],
    cam: { tgt: [8.15, -0.25, 1], dir: [0.72, 0.18, 0.67], r: 2.2 } },
  { n: 10, titre: 'Madrier guide et soutiens',
    texte: [
      'Madrier guide à 16 pi de la section 1 : il donne la hauteur.',
      'Soutiens en 6 × 6 de 16 pi, dans le sens contraire des madriers.',
      'Blocages et coins dessous pour les mettre de niveau.',
    ],
    cam: { tgt: [7.32, -0.25, 0], dir: [0.6, 0.32, 0.73], r: 3.2 } },
  { n: 11, titre: 'Madriers, bois de jonction et cage',
    texte: [
      'Madriers de la section 2 sur les soutiens, dans le prolongement de la section 1, environ 32 po centre.',
      'Au joint, de chaque côté : un 3 × 6 de 24 po vissé dans les deux sections.',
      'Soutiens enlignés vis-à-vis les croisements.',
      'Dans un creux : une cage, bouts de 24 à 36 po croisés.',
    ],
    cam: { tgt: [6.2, -0.15, 0.9], dir: [0.5, 0.5, 0.71], r: 3.0 },
    // Animation de la pose du bois de jonction (instants en ms depuis l'arrivée à l'étape).
    jonction: { x: 4.877, zMin: 1.9, cam: { tgt: [4.877, 0.09, 2.22], dir: [-0.12, 0.45, -0.88], r: 0.42 },
      zoom: { tgt: [4.877, 0.075, 2.2], dir: [-0.1, 0.35, -0.93], r: 0.24 },
      t: { approche: 2900, bois: 4300, zoom: 5400, vis: 6400, recul: 9600, retour: 12500 },
      etiquettes: [
        { pos: [4.45, 0.2, 2.36], text: 'Madrier section 1', fen: [[3900, 5400], [9600, 12500]] },
        { pos: [5.3, 0.2, 2.36], text: 'Madrier section 2', fen: [[3900, 5400], [9600, 12500]] },
        { pos: [4.877, 0.26, 2.2], text: 'Bois de jonction : 3 × 6 de 24 po', fen: [[4600, 12500]] },
        { pos: [4.725, -0.03, 2.15], text: 'Tire-fond 6 po : section 1', fen: [[6600, 12500]] },
        { pos: [5.03, -0.03, 2.15], text: 'Tire-fond 6 po : section 2', fen: [[7300, 12500]] },
      ] },
    etiquettes: [{ pos: [4.877, 0.2, 2.21], text: 'Bois de jonction : 3 × 6 vissé dans les 2 sections', fen: [[0, 2900], [12500, 1e9]] }] },
  { n: 11, variante: true, titre: 'Variante : 6 × 6 de 8 pi',
    texte: [
      'Deux 6 × 6 de 8 pi bout à bout, parfaitement de niveau.',
      'Joint toujours sur un blocage ou un soutien.',
      'Joints des madriers de rive et du milieu seulement : un 3 × 6 de 24 po vissé des deux côtés.',
      'Au serrage (étape 7), visser la planche temporaire seulement dans ces 3 madriers.',
      'Jonction doublée : un 6 × 6 sous chaque section.',
    ],
    detail: 'Variante courante sur le chantier · les deux sections en 8 pi, soutiens compris · même cadrage 16 × 16 pi, 32 po centre',
    cam: { tgt: [4.4, -0.1, 0.6], dir: [0.3, 0.62, 0.72], r: 3.3 },
    etiquettes: [
      { pos: [2.438, -0.03, 2.362], text: 'Joint sur un blocage, jamais dans le vide' },
      { pos: [1.4, 0.152, 2.362], text: 'Les deux 6 × 6 de 8 pi parfaitement de niveau' },
      { pos: [4.877, -0.076, 0.4], text: 'Jonction doublée : un 6 × 6 sous chaque section' },
      { pos: [7.315, -0.02, 2.362], text: 'Section 2 : joint sur un soutien' },
      { pos: [2.438, 0.17, 0.114], text: '3 × 6 aux joints : rives et milieu seulement' },
      { pos: [4.877, 0.107, -2.21], text: 'Bout de 3 × 6 de 24 po à la jonction des sections' },
    ] },
  { n: 12, titre: 'Couvrir la section 2',
    texte: [
      'Couvrir du bout du plancher vers le centre avec les 3 × 8, sans serrer : on marche dessus pour placer les planches.',
      'Rendu au centre : replacer chaque planche, en repartant de la section 1 vers le bout.',
      'En chemin, refaire l\'étape 7 pour resserrer : planche vissée le temps du serrage, coins, planche devant les coins vissée.',
      'Visser les planches du centre et celle du bout.',
    ],
    // Animation (ms), façon du chantier : la section 2 se couvre du bout vers le centre, planches
    // posées sans serrer (écart par joint, ecart, jusqu'à nLache joints) ; rendu au centre, chaque
    // planche est replacée en repartant de la section 1 (les 2 planches de jonction, puis la section 2
    // vers le bout), presque serrée (residu par joint) ; à la 11e (tension), l'étape 7 est refaite :
    // la suivante (ancre) vissée le temps du serrage, coins, planches resserrées contre la section 1,
    // planche devant les coins vissée, coins et tire-fonds retirés ; puis on replace le reste jusqu'au bout.
    reprise: { tension: 10, ecart: 0.2 * 0.0254, nLache: 10, residu: 0.05 * 0.0254,
      t: { couvert: 3000, libres: [4300, 4700], relais1: [5100, 260], dur: 420, visA: [7900, 8300], coins: [8600, 9100],
        serre: [9400, 11200], visT: [11500, 11900], sortie: [12200, 12700], devisse: [12800, 13300], ancre: [13400, 13900],
        relais2: [14100, 160], dur2: 360, visFin: [16800, 17300], fin: 17400 },
      cams: [
        [3200, { tgt: [4.95, 0.2, 1.6], dir: [0.12, 0.72, 0.68], r: 1.0 }],
        [4900, { tgt: [5.85, 0.2, 1.4], dir: [0.3, 0.72, 0.62], r: 1.7 }],
        [7500, { tgt: [6.72, 0.25, 1.95], dir: [0.12, 0.5, 0.86], r: 0.7 }],
        [13900, { tgt: [8.0, 0.2, 1.0], dir: [0.42, 0.64, 0.64], r: 2.4 }],
        [18400, null],
      ],
      etiquettes: [
        { pos: [5.3, 0.25, 1.6], text: 'Section 2 couverte du bout vers le centre, sans serrer : on marche dessus pour placer les planches', fen: [[3300, 4300]] },
        { pos: [5.2, 0.25, 1.6], text: 'Rendu au centre : on replace chaque planche, de la section 1 vers le bout', fen: [[4300, 7600]] },
        { pos: [6.81, 0.3, 2.3], text: 'Étape 7 refaite : cette planche vissée le temps du serrage', fen: [[7600, 8600]] },
        { pos: [6.7, 0.3, 1.65], text: 'Coins enfoncés : les planches se resserrent contre la section 1', fen: [[8600, 11500]] },
        { pos: [6.6, 0.3, 2.3], text: 'Planche devant les coins vissée', fen: [[11500, 12200]] },
        { pos: [6.75, 0.3, 1.9], text: 'Coins et tire-fonds temporaires retirés', fen: [[12200, 13900]] },
        { pos: [8.2, 0.25, 1.2], text: 'On continue de replacer les planches jusqu\'au bout', fen: [[13900, 16800]] },
        { pos: [7.3, 0.25, 1.0], text: 'Planches du centre et du bout vissées', fen: [[16800, 18400]] },
      ] },
    cam: { tgt: [7.07, 0, 0], dir: [0.69, 0.42, 0.59], r: 3.4 } },
  { n: 13, titre: 'Couper au ras',
    texte: [
      'Aucun bout de 6 × 6 ou de 3 × 8 ne dépasse.',
      'Couper carré, égal avec le bord.',
      'Un bout qui dépasse, c\'est une chute.',
    ],
    cam: { tgt: [8.7, 0.1, 2.44], dir: [-0.6, 0.35, 0.72], r: 1.0 } },
  { n: 14, titre: 'Marches',
    texte: [
      'Plancher de plus de 12 po : des marches.',
      'Giron de 16 po au moins (deux 3 × 8), largeur 36 à 60 po, hauteur 12 po au plus.',
      'Mesurer depuis le dessus du plancher : une marche tous les 9 po.',
      'Chaque module sur 2 appuis (les côtés) : 3 × 8 à plat en bas, bouts de 6 × 6 au-dessus.',
    ],
    cam: { tgt: [10.0, 0.0, 0.85], dir: [0.74, 0.36, -0.57], r: 1.15 } },
  { n: 14, groupe: 'marches', etiquette: 'Cas de marches', titre: 'Marches : 2, 3 ou 4 marches',
    texte: [
      'Une marche par 9 po, mesurés depuis le dessus du plancher.',
      '18 po : 2 marches · 27 po : 3 marches · 36 po : 4 marches.',
      'Chaque module recule de 16 po.',
      'Les modules s\'empilent et se récupèrent au démantèlement.',
    ],
    // Les trois cas au bout du vrai plancher, l'un après l'autre (ms) : le sol se met à la
    // hauteur du cas (sol), puis les modules se posent (pas entre deux rangs).
    cycle: { cas: [2, 3, 4], duree: 5200, sol: 1100, pas: 450 },
    cam: { tgt: [10.05, -0.12, 0.96], dir: [0.55, 0.42, -0.72], r: 1.15 } },
  { n: 15, titre: 'Garde-corps et coup de pied',
    texte: [
      'Plus de 12 po avec un vide : garde-corps (RSST, art. 12).',
      'Lisse du haut entre 1 et 1,2 m, lisse intermédiaire à mi-hauteur.',
      'Un montant aux 4 pi ; lisses en 2 × 4 de 8 pi entiers.',
      'Coup de pied : 2 × 4 sur chant, au ras du plancher.',
    ],
    // Truc mis en évidence (encadré sous le titre) et animé dans la 3D sur une vraie section :
    // un 2 × 4 de 8 pi coupé en deux devient les 2 montants (milieu et bout), puis 3 autres 2 × 4 de 8 pi les lisses.
    truc: { texte: 'Un 2 × 4 de 8 pi coupé en deux = 2 montants de 48 po. La bonne hauteur, sans mesurer.',
      t: { debut: 3000, planche: 600, coupe: 1700, debout: 2900, lisse: 5000, pasLisse: 1500, fin: 10200 } },
    cam: { tgt: [9.9, 0.55, 0.2], dir: [0.74, 0.36, -0.57], r: 2.0 } },
  { n: 16, titre: 'Mains courantes',
    texte: [
      'Plus d\'une marche : mains courantes des deux côtés.',
      'Un montant en haut (bord du plancher) et un en bas (dernière marche).',
      'Côté escalier : main courante à 36 po au-dessus des nez, lisse intermédiaire à mi-hauteur.',
    ],
    cam: { tgt: [10.15, 0.35, 0.96], dir: [0.74, 0.36, -0.57], r: 1.35 } },
  { n: 17, titre: 'Écart avec la paroi',
    texte: [
      'Le plancher se monte près de la paroi, comme sous terre.',
      'Écart de 12 po ou moins : rien à ajouter.',
      'Plus de 12 po : garde-corps, comme au bout du plancher.',
    ],
    cam: { tgt: [6.6, 0, -2.5], dir: [-0.12, 0.77, 0.63], r: 1.3 } },
  { n: 18, groupe: 'secondaire', etiquette: 'Étape 18 sur 18', titre: 'Plancher secondaire',
    texte: [
      'À l\'arrière de la tête de forage : là où l\'on ajoute les tiges et sort le tube carotier.',
      'Forage à l\'horizontale : pas de plancher secondaire.',
      'Une marche : plancher standard d\'au moins 32 × 72 po, 9 po de haut, collé à la tour.',
      '2 marches : dessous, un plancher plus long et plus large de 16 po ; le standard par-dessus.',
      'Côté poulies : une marche, jamais de garde-corps. Au bout sans marche : garde-corps et coup de pied.',
      'Planches vissées aux 2 bouts ; 6 × 6 qui dépassent de 6 po (poignée, appui pour la barre).',
    ],
    detail: 'À chaque changement d\'angle : ajuster. Pas de bois plané.',
    // Foreuse STM-1500 allégée (stm1500.glb), chargée à la demande sur cet écran.
    foreuse: true,
    // Les trois cas l'un après l'autre (ms) : à l'horizontale (pas de plancher), 10° (9 po), 15° (18 po) : la foreuse se place (sol : recul, glisse de
    // la poutre, bascule de l'avance sur l'axe arrière), puis le plancher se pose (pas entre deux
    // rangs). stm : angle (°), glisse de la poutre (m), recul de la foreuse sur son axe (m), comme
    // SECONDAIRES de pieces-3d ; le .glb est exporté au cas 1, l'avant vers le front de taille.
    // Glisse limitée à 5 cm dès que l'avance est basculée : au-delà, la tour de poulie arrière de la poutre
    // descend dans le tambour du treuil (mesuré sur stm1500.glb : jeu > 4 cm de 0 à 15° à 0,05 m, contact
    // dès 0,15 m). À 15°, la foreuse avance donc de 15 cm (recul négatif ; avant du traîneau à ~10 cm du
    // front de taille) au lieu de glisser la poutre de 0,9 m.
    cycle: { cas: [1, 2, 3], duree: 7200, sol: 2200, pas: 380 },
    stm: { 1: { angle: 0, glisse: 0, recul: 0 }, 2: { angle: 10, glisse: 0, recul: 0 }, 3: { angle: 15, glisse: 0.05, recul: -0.15 } },
    // Nom du cas affiché dans le panneau (pas de texte dans la 3D).
    nomsCas: { 1: 'Forage à l\'horizontale : pas de plancher secondaire', 2: 'Forage montant à 10° : plancher standard de 9 po (une marche)', 3: 'Forage montant à 15° : 2 marches (18 po), garde-corps et coup de pied' },
    cam: { tgt: [1.95, 0.95, 0.13], dir: [0.42, 0.45, 0.79], r: 2.4 } },
  // À savoir (après l'étape 18) : la planche collée à la foreuse, taillée selon la tour (extra t du
  // .glb), au montage de 18 po. cle : étiquettes propres à cet écran (pas celles de l'étape 18) ;
  // surligne : contour rouge et teinte seulement sur les pièces qui ont cet extra, posées après le reste.
  { n: 18, groupe: 'secondaire', cle: 'taillee', sous: true, etiquette: 'À savoir', titre: 'Planche taillée selon la tour',
    texte: [
      'La planche du plancher secondaire collée à la foreuse est taillée selon la forme de la tour.',
      'Le pied ne peut pas glisser sous la tour, ni entre la tour et le plancher.',
      'Les 6 × 6 avancent sous la planche taillée pour la porter.',
    ],
    foreuse: true,
    // Le montage de 18 po se pose vite, puis la planche taillée seule (outil.js, secondaires()).
    cycle: { cas: [3], duree: 5600, sol: 100, pas: 200 },
    stm: { 3: { angle: 15, glisse: 0.05, recul: -0.15 } },
    surligne: 't',
    etiquettes: [
      { pos: [2.35, 0.72, -0.1], text: 'Planche taillée selon la tour : le pied ne glisse pas dessous', fen: [[3600, 1e9]] },
    ],
    cam: { tgt: [1.8, 0.68, -0.12], dir: [0.24, 0.85, 0.46], r: 0.72 } },
  { n: 18, groupe: 'demantelement', etiquette: 'Démantèlement', titre: 'Démantèlement',
    texte: [
      'Après le départ de la foreuse : d\'abord le plancher secondaire (récupérable, comme les marches).',
      'Puis les planches, du fond vers la sortie, tire-fonds à mesure ; garde-corps et marches en dernier.',
      'Puis les 6 × 6, de la sortie vers le fond : ne jamais enjamber le bois. Grosses pièces à deux.',
      'Laver les madriers à l\'eau.',
      'Attention : la boue sous le plancher est glissante.',
    ],
    // Animation (outil.js, demonter()) : fenêtres en ms depuis l'arrivée à l'écran — a : plancher
    // secondaire, b : planches, garde-corps et marches, c : 6 × 6, soutiens et blocages, e : clôture.
    demontage: { t: { a: [400, 3400], b: [3400, 11400], c: [11400, 19400], e: [19600, 21800] } },
    etiquettes: [
      { pos: [2.2, 1.0, 0.3], text: '1. Plancher secondaire d\'abord : récupérable', fen: [[400, 3400]] },
      { pos: [4.5, 0.6, -1.2], text: '2. Planches du fond vers la sortie, tire-fonds à mesure', fen: [[3400, 8600]] },
      { pos: [9.6, 1.3, 0.8], text: 'Garde-corps et marches en dernier : jamais de bord sans protection', fen: [[8600, 11400]] },
      { pos: [8.5, 0.3, 1.2], text: '3. Les 6 × 6 de la sortie vers le fond : ne jamais enjamber le bois', fen: [[11400, 14400]] },
      { pos: [5.5, 0.3, -1.2], text: 'Grosses pièces : toujours à deux', fen: [[14400, 16900]] },
      { pos: [6.5, 0.15, -1.0], text: 'Attention : boue glissante sous le plancher', fen: [[16900, 19400]] },
      { pos: [0.8, 1.3, 0], text: 'Clôture orange et carte de ruban rouge : trou non arpenté, non cimenté', fen: [[19600, 1e9]] },
    ],
    detail: 'Après le démantèlement : clôture orange et carte de ruban rouge (trou non arpenté et non cimenté, date de l\'installation, nom du superviseur).',
    cam: { tgt: [4.9, 0.2, 0], dir: [0.55, 0.62, 0.56], r: 5.4 } },
];
