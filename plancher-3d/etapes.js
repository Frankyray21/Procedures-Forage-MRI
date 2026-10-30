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
    cam: { tgt: [2.2, 0.24, 0.5], dir: [0.7, 0.6, 0.38], r: 0.5 } },
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
    texte: 'Les madriers de la section 2 se posent sur les soutiens, dans le prolongement de ceux de la section 1, à environ 32 po centre. Au joint, de chaque côté du plancher, un bout de 6 × 6 de 24 po est vissé dans les madriers des deux sections. Les soutiens sont toujours enlignés vis-à-vis les croisements. Dans un creux, on monte une cage : des bouts de 24 à 36 po empilés croisés.',
    cam: { tgt: [6.2, -0.15, 0.9], dir: [0.5, 0.5, 0.71], r: 3.0 },
    etiquettes: [{ pos: [4.877, 0.2, 2.21], text: 'Bois de jonction vissé dans les 2 sections' }] },
  { n: 12, titre: 'Couvrir la section 2',
    texte: 'Couvre la section 2 en répétant les étapes 6 et 7, du bout côté galerie (d\'où arrive le bois) vers la jonction. Les deux planches de jonction sont posées et vissées à la fin : les deux sections sont jointes.',
    cam: { tgt: [7.07, 0, 0], dir: [0.69, 0.42, 0.59], r: 3.4 } },
  { n: 13, titre: 'Couper au ras',
    texte: 'Aucun bout de 6 × 6 ni de 3 × 8 ne doit dépasser. Coupe-les carrés, égal avec le bord du plancher. Un bout qui dépasse, c\'est une chute.',
    cam: { tgt: [8.7, 0.1, 2.44], dir: [-0.6, 0.35, 0.72], r: 1.0 } },
  { n: 14, titre: 'Marches',
    texte: 'Le plancher dépasse 12 po de haut : il faut des marches de 16 po de profondeur au moins (deux 3 × 8), de 36 à 60 po de large et de 12 po de haut au plus, ajustées à 9 po. On les monte de bas en haut : le module du bas sur des 3 × 8 à plat, ceux du dessus sur des bouts de 6 × 6.',
    cam: { tgt: [10.0, 0.0, 0.85], dir: [0.74, 0.36, -0.57], r: 1.15 } },
  { n: 15, titre: 'Garde-corps et coup de pied',
    texte: 'Plancher de plus de 12 po de haut avec un vide : garde-corps selon l\'article 12 du RSST, avec la lisse du haut entre 1 et 1,2 m et une lisse intermédiaire à mi-hauteur. La lisse inférieure (coup de pied) est un 2 × 4 posé sur chant, au ras du plancher, partout où les travailleurs ont accès.',
    cam: { tgt: [9.9, 0.55, 0.2], dir: [0.74, 0.36, -0.57], r: 2.0 } },
  { n: 16, titre: 'Mains courantes',
    texte: 'Plus d\'une marche : des mains courantes des deux côtés de l\'escalier. Elles suivent les marches jusqu\'en bas.',
    cam: { tgt: [10.15, 0.35, 0.96], dir: [0.74, 0.36, -0.57], r: 1.35 } },
  { n: 17, titre: 'Grillage au bas du mur',
    texte: 'Si l\'écart entre le plancher et le mur est de 12 po ou moins, le pied peut passer dans le trou. Fixe un grillage de 24 po de haut au bas du mur, le long du plancher : il ferme l\'écart et évite les blessures.',
    cam: { tgt: [6.6, 0, -2.75], dir: [-0.12, 0.77, 0.63], r: 1.3 } },
  { n: 18, titre: 'Plancher secondaire',
    texte: 'À côté de la tour, pour se surélever : au moins 32 × 72 po, 12 po de haut au plus, et rien en porte-à-faux. Les deux planches les plus près de la foreuse sont vissées avec des tire-fonds, et la dernière arrive à 3 po de la tour ou moins. À chaque changement d\'angle de forage, on les ajuste. Pas de bois plané sur les planchers.',
    cam: { tgt: [0.9, 0.35, 0.3], dir: [0.67, 0.43, 0.61], r: 1.6 } },
];
