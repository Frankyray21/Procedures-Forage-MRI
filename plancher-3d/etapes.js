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
    texte: "Le superviseur a inspecté les lieux : sol sans débris, plat, fonds de trous trouvés et marqués. À l'entrée : barricade avec flasher orange, armoire de premiers soins avec les deux lave-yeux, extincteur. Les grosses pièces de bois se transportent toujours à deux.",
    cam: { tgt: [13.3, 0.7, 1.4], dir: [-0.35, 0.38, 0.86], r: 1.7 } },
  { n: 1, titre: 'Marquer la position du plancher',
    texte: 'Plan de forage en main, place le plancher d\'après la position prévue de la foreuse. Trace la ligne de référence à la peinture, bien droite sur toute la longueur : 16 × 32 pi.',
    cam: { tgt: [4.9, 0, 0], dir: [0.35, 0.85, 0.4], r: 5.6 } },
  { n: 2, titre: 'Trouver le point le plus haut',
    texte: 'Avec le niveau au laser Bosch, trouve le point le plus haut du sol sous le futur plancher. Le premier madrier repose directement sur le sol à cet endroit. C\'est le repère de niveau pour tout le plancher.',
    cam: { tgt: [0.9, -0.05, -1.7], dir: [-0.63, 0.34, 0.7], r: 2.2 } },
  { n: 3, titre: 'Structure de base en 6 × 6',
    texte: 'Les madriers 6 × 6 vont dans le sens contraire du forage : les patins de la foreuse croisent les madriers. En partant du point haut, le plancher n\'est pas plus haut qu\'il faut : moins de blocage et moins de bois à manipuler.',
    cam: { tgt: [1.5, 0.05, -1.3], dir: [0.8, 0.5, 0.35], r: 2.4 } },
  { n: 4, titre: 'Cadrage 16 × 16 pi',
    texte: 'Le premier madrier va sur la ligne de peinture, un deuxième à 16 pi du premier : le cadrage de 16 × 16 pi est bien droit. Les autres 6 × 6 vont entre les deux, à environ 32 po centre.',
    cam: { tgt: [2.44, -0.05, 0], dir: [0.38, 0.63, 0.68], r: 3.2 } },
  { n: 5, titre: 'Mettre de niveau',
    texte: 'Niveau de 48 po posé sur un 3 × 8 d\'au moins 8 pi, pour avoir de la portée. Sous chaque 6 × 6 : des blocages en 3 × 8 ou en 6 × 6 et des coins de bois, dans le sens contraire du madrier, au moins 6 par madrier. Au bout de la section, le blocage de jonction porte aussi les madriers de la section 2.',
    cam: { tgt: [2.0, 0.02, 0.3], dir: [0.45, 0.3, 0.84], r: 1.7 } },
  { n: 6, titre: 'Couvrir en 3 × 8',
    texte: 'Les planches de 3 × 8 brut vont dans le sens contraire des 6 × 6. La première est vissée avec un tire-fond à chaque bout. Couvre en marchant toujours sur la partie déjà couverte : on n\'enjambe jamais les 6 × 6.',
    cam: { tgt: [2.4, 0.1, 0.5], dir: [-0.62, 0.55, 0.56], r: 2.6 } },
  { n: 7, titre: 'Resserrer les planches',
    texte: 'Vers la moitié de la section, visse la dernière planche avec un tire-fond à chaque bout, puis enfonce des coins de bois pour mettre les planches en tension. Visse la planche devant les coins, puis retire les tire-fonds de la dernière planche pour libérer les coins. Sans ça, des écarts s\'ouvrent à la longue.',
    cam: { tgt: [2.9, 0.23, 1.15], dir: [0.3, 0.78, 0.55], r: 1.25 } },
  { n: 8, titre: 'Laisser deux planches libres',
    texte: 'Au bout de la section 1, au centre du plancher, laisse environ deux planches libres. Cet espace sert à partir la structure de la section 2. On les visse à la fin pour joindre les deux sections.',
    cam: { tgt: [4.58, 0.1, 0.3], dir: [0.52, 0.37, 0.77], r: 1.8 } },
  { n: 9, titre: 'Section 2 : hauteur au laser',
    texte: 'Pour la section 2, le faisceau du laser Bosch donne la hauteur à soutenir sous les 6 × 6. Ici, le sol descend vers l\'entrée : il faut monter la structure.',
    cam: { tgt: [8.15, -0.25, 1], dir: [0.72, 0.18, 0.67], r: 2.2 } },
  { n: 10, titre: 'Madrier guide et soutiens',
    texte: 'Place un madrier à 16 pi de la section 1 : c\'est le guide de hauteur. Quand la hauteur le permet, des 6 × 6 de 16 pi servent de soutiens, dans le sens contraire des madriers. Des blocages et des coins dessous les mettent de niveau.',
    cam: { tgt: [7.32, -0.25, 0], dir: [0.6, 0.32, 0.73], r: 3.2 } },
  { n: 11, titre: 'Madriers, bois de jonction et cage',
    texte: 'Les madriers de la section 2 se posent sur les soutiens, dans le prolongement de ceux de la section 1, à environ 32 po centre. Au joint, de chaque côté du plancher, un bout de 3 × 6 de 24 po, à plat contre le madrier de rive, est vissé dans les madriers des deux sections (dans un 6 × 6, le tire-fond n\'atteindrait pas le madrier). Les soutiens sont toujours enlignés vis-à-vis les croisements. Dans un creux, on monte une cage : des bouts de 24 à 36 po empilés croisés.',
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
    texte: 'Deux 6 × 6 de 8 pi bout à bout par ligne, parfaitement de niveau, le joint toujours sur un blocage ou un soutien. Chaque joint est jointé comme au centre : un 3 × 6 de 24 po vissé avec un tire-fond de chaque côté du joint, sinon les coins de serrage écartent les 6 × 6. Jonction des deux sections doublée : un 6 × 6 sous chaque section.',
    detail: 'Variante courante sur le chantier · les deux sections en 8 pi, soutiens compris · même cadrage 16 × 16 pi, 32 po centre',
    cam: { tgt: [4.4, -0.1, 0.6], dir: [0.3, 0.62, 0.72], r: 3.3 },
    etiquettes: [
      { pos: [2.438, -0.03, 2.362], text: 'Joint sur un blocage, jamais dans le vide' },
      { pos: [1.4, 0.152, 2.362], text: 'Les deux 6 × 6 de 8 pi parfaitement de niveau' },
      { pos: [4.877, -0.076, 0.4], text: 'Jonction doublée : un 6 × 6 sous chaque section' },
      { pos: [7.315, -0.02, 2.362], text: 'Section 2 : joint sur un soutien' },
      { pos: [2.438, 0.17, 1.69], text: '3 × 6 vissé à chaque joint' },
      { pos: [4.877, 0.107, -2.21], text: 'Bout de 3 × 6 de 24 po à la jonction des sections' },
    ] },
  { n: 12, titre: 'Couvrir la section 2',
    texte: 'Couvre la section 2 en partant du bout du plancher vers le centre, en répétant les étapes 6 et 7. Au centre, l\'espace qui reste ne tombe pas juste : pose une planche libre contre la section 2 et visse-la le temps du serrage, puis enfonce les coins pour replacer les planches du centre de la section 1 vers le début du plancher en les resserrant. Retire les coins et les tire-fonds, pose la 2e planche libre et visse les planches du centre dans les deux sections.',
    // Animation (ms) : couverture du bout vers le centre, puis les planches de la section 1
    // près du centre replacées vers le début du plancher avec les coins (écart exagéré).
    reprise: { cam: { tgt: [4.3, 0.2, 1.6], dir: [0.12, 0.72, 0.68], r: 1.0 }, ecart: 0.4 * 0.0254,
      t: { couvert: 3200, approche: 3600, libre1: [4600, 5100], visA: [5500, 5900], coins: [6400, 6900], serre: [7200, 9200],
        sortie: [9600, 10100], devisse: [10200, 10700], libre2: [10900, 11400], vis: [11800, 12200], fin: 12300, retour: 13600 },
      etiquettes: [
        { pos: [4.6, 0.24, 1.6], text: 'Section 2 couverte du bout vers le centre : l\'espace au centre ne tombe pas juste', fen: [[3800, 5500]] },
        { pos: [4.776, 0.24, 1.6], text: 'Planche libre contre la section 2, vissée le temps du serrage', fen: [[5500, 7200]] },
        { pos: [4.3, 0.26, 1.6], text: 'Coins enfoncés : les planches de la section 1 sont replacées vers le début du plancher', fen: [[7200, 9600]] },
        { pos: [4.57, 0.24, 1.6], text: 'L\'espace est juste : poser la 2e planche libre', fen: [[9600, 11800]] },
        { pos: [4.67, 0.24, 1.6], text: 'Visser les planches du centre dans les deux sections', fen: [[11800, 13600]] },
      ] },
    cam: { tgt: [7.07, 0, 0], dir: [0.69, 0.42, 0.59], r: 3.4 } },
  { n: 13, titre: 'Couper au ras',
    texte: 'Aucun bout de 6 × 6 ni de 3 × 8 ne doit dépasser. Coupe-les carrés, égal avec le bord du plancher. Un bout qui dépasse, c\'est une chute.',
    cam: { tgt: [8.7, 0.1, 2.44], dir: [-0.6, 0.35, 0.72], r: 1.0 } },
  { n: 14, titre: 'Marches',
    texte: 'Le plancher dépasse 12 po de haut : il faut des marches de 16 po de profondeur au moins (deux 3 × 8), de 36 à 60 po de large et de 12 po de haut au plus. Mesure à partir du dessus du plancher : chaque marche se vise 9 po plus bas. On les monte de bas en haut, chaque module sur deux appuis seulement, les côtés (rien au milieu) : 3 × 8 à plat pour le module du bas, bouts de 6 × 6 au-dessus.',
    cam: { tgt: [10.0, 0.0, 0.85], dir: [0.74, 0.36, -0.57], r: 1.15 } },
  { n: 14, groupe: 'marches', etiquette: 'Cas de marches', titre: 'Marches : 2, 3 ou 4 marches',
    texte: 'Une marche par 9 po de hauteur, mesurés à partir du dessus du plancher : plancher à 18 po, 2 marches ; à 27 po, 3 marches ; à 36 po, 4 marches. Chaque module repose sur celui d\'en dessous et recule de 16 po. Les modules s\'empilent : au démantèlement, on les récupère pour le prochain plancher.',
    cam: { tgt: [16.15, 0.35, 0.1], dir: [0.78, 0.48, 0.4], r: 2.05 } },
  { n: 15, titre: 'Garde-corps et coup de pied',
    texte: 'Plancher de plus de 12 po de haut avec un vide : garde-corps selon l\'article 12 du RSST, avec la lisse du haut entre 1 et 1,2 m et une lisse intermédiaire à mi-hauteur. La lisse inférieure (coup de pied) est un 2 × 4 posé sur chant, au ras du plancher, partout où les travailleurs ont accès.',
    detail: 'Truc : un 2 × 4 de 8 pi coupé en deux donne deux montants de 48 po, la bonne hauteur sans mesurer. Avec quatre 2 × 4 de 8 pi, on fait une section de garde-corps de 8 pi : les deux montants, la lisse du haut, la lisse du milieu et le coup de pied.',
    cam: { tgt: [9.9, 0.55, 0.2], dir: [0.74, 0.36, -0.57], r: 2.0 } },
  { n: 16, titre: 'Mains courantes',
    texte: 'Plus d\'une marche : des mains courantes des deux côtés de l\'escalier, montées comme les garde-corps. Un montant 2 × 4 en haut, au bord du plancher, et un en bas, au nez de la dernière marche. La main courante, un 2 × 4 droit vissé sur les montants, suit la pente des marches, à 36 po au-dessus des nez.',
    cam: { tgt: [10.15, 0.35, 0.96], dir: [0.74, 0.36, -0.57], r: 1.35 } },
  { n: 17, titre: 'Grillage au bas du mur',
    texte: 'Si l\'écart entre le plancher et le mur est de 12 po ou moins, le pied peut passer dans le trou. Fixe un grillage de 24 po de haut au bas du mur, le long du plancher : il ferme l\'écart et évite les blessures.',
    cam: { tgt: [6.6, 0, -2.75], dir: [-0.12, 0.77, 0.63], r: 1.3 } },
  { n: 18, titre: 'Plancher secondaire',
    texte: 'À côté de la tour, pour se surélever : au moins 32 × 72 po, 12 po de haut au plus, et rien en porte-à-faux. Les deux planches les plus près de la foreuse sont vissées avec des tire-fonds, et la dernière arrive à 3 po de la tour ou moins. À chaque changement d\'angle de forage, on les ajuste. Pas de bois plané sur les planchers.',
    cam: { tgt: [0.9, 0.35, 0.3], dir: [0.67, 0.43, 0.61], r: 1.6 } },
  { n: 18, groupe: 'secondaire', etiquette: 'Cas du plancher secondaire', titre: 'Plancher secondaire : 3 cas',
    texte: 'Avec 2 marches, la première marche a 16 po de profondeur (deux 3 × 8) et 9 po de haut. Un côté sans marche doit avoir un garde-corps fixé solidement. Contre la foreuse, les 2 dernières planches sont vissées et la dernière arrive à 3 po de la tour ; à chaque changement d\'angle de forage, on les ajuste au contour de la foreuse.',
    cam: { tgt: [16.15, 0.3, 0.1], dir: [0.78, 0.5, 0.38], r: 2.2 } },
  { n: 18, groupe: 'demantelement', etiquette: 'Démantèlement', titre: 'Démantèlement',
    texte: 'Après le départ de la foreuse : démantèle d\'abord le plancher secondaire, il se récupère pour le prochain plancher, comme les modules de marche. Ensuite le plancher principal, en commençant par les planches du fond, en enlevant les tire-fonds à mesure, puis la structure en 6 × 6. Lave les madriers à l\'eau au démontage pour enlever la boue de forage. Attention : la boue sous le plancher rend les déplacements glissants.',
    detail: 'Après le démantèlement : clôture orange et carte de ruban rouge (trou non arpenté et non cimenté, date de l\'installation, nom du superviseur).',
    cam: { tgt: [4.9, 0.2, 0], dir: [0.55, 0.62, 0.56], r: 5.4 } },
];
