/* ===========================================================================
   QUIZ PAR PROCÉDURE — couvre l'information importante de chaque fiche.
   Schéma : window.QUIZ_PROC[id] = [ { q, o:[options], a:index_bonne, e:citation } ]
   IMPORTANT : "e" est une CITATION de la procédure officielle (consigne /
   avertissement / valeur). Aucune interprétation : on cite le texte source.
   Affiché sur la page de détail de chaque procédure, avec rétroaction immédiate.
   =========================================================================== */
window.QUIZ_PROC = {
  "centralisateur": [
    { "q": "Combien de travailleurs sont obligatoires pour installer le centralisateur ?",
      "o": ["1 seul", "2 travailleurs", "3 travailleurs", "Selon la disponibilité"], "a": 1,
      "e": "« L'installation du centralisateur doit toujours se faire à deux travailleurs. »" },
    { "q": "Combien pèse chaque pièce du centralisateur ?",
      "o": ["12 livres", "25 livres", "46 livres", "93 livres"], "a": 2,
      "e": "« Se positionner [...] avant de manipuler les pièces du centralisateur, qui pèsent 46 livres chacune. »" },
    { "q": "Quels outils est-il INTERDIT d'utiliser pour serrer les boulons ?",
      "o": ["Une clé ou un box", "Un wescot ou un pipe wrench", "Une clé Allen", "Un tournevis"], "a": 1,
      "e": "« L'utilisation d'un wescot ou d'un pipe wrench n'est pas adéquate. »" },
    { "q": "Combien de boulons, locknuts et lockwashers faut-il vérifier ?",
      "o": ["6 de chaque", "8 de chaque", "12 de chaque", "16 de chaque"], "a": 2,
      "e": "« Vérifier la présence des 12 boulons, 12 locknuts et 12 lockwashers avant le serrage. »" },
    { "q": "À quel intervalle installe-t-on un centralisateur ?",
      "o": ["Tous les 20 pieds", "Tous les 40 pieds", "Tous les 60 pieds", "Tous les 100 pieds"], "a": 1,
      "e": "« Espacement d'installation des centralisateurs : tous les 40 pieds (ou selon les conditions). »" },
    { "q": "Y a-t-il une séquence imposée pour serrer les boulons et écrous ?",
      "o": ["Oui, en étoile", "Oui, dans le sens horaire", "Non, aucune séquence imposée", "Oui, de bas en haut"], "a": 2,
      "e": "« Il n'y a pas de séquence d'installation ou de serrage des boulons et des écrous. »" },
    { "q": "Sur quoi faut-il maintenir une tension pendant le serrage ?",
      "o": ["Sur les boyaux", "Sur les lockwashers", "Sur le mât", "Sur le câble"], "a": 1,
      "e": "« Serrer tous les boulons en maintenant une tension sur les lockwashers à l'aide de l'outil adéquat (clé ou box). »" },
    { "q": "Quel risque faut-il éviter en insérant les boulons dans les trous ?",
      "o": ["Endommager les filets", "Échapper la pièce", "Brûlure", "Choc électrique"], "a": 0,
      "e": "« Attention de ne pas endommager les filets des boulons quand vous les entrez dans les trous prévus à cet effet. »" },
    { "q": "Comment sont répartis les boulons sur le centralisateur ?",
      "o": ["Tous du même côté", "6 dans un sens et 6 dans l'autre", "4 et 8", "Au hasard"], "a": 1,
      "e": "« Répartition des boulons : 6 dans un sens et 6 dans l'autre sens. »" },
    { "q": "Quel est le poids total du centralisateur (dessin technique) ?",
      "o": ["46 lbs", "93 lbs", "12 lbs", "211 lbs"], "a": 1,
      "e": "« Poids total du centralisateur (dessin technique) : 93,0 lbs. »" }
  ],
  "pro-mec-011": [
    { "q": "Une fois la sangle desserrée, par quoi la pompe est-elle retenue ?",
      "o": ["Par le bell housing", "Par les boyaux hydrauliques", "Par le shaft", "Par rien"], "a": 1,
      "e": "« La pompe est retenue par les boyaux hydrauliques et la sangle. Il faut la retenir avec les mains sur les boyaux. »" },
    { "q": "En quel matériau est fait le bell housing ?",
      "o": ["Acier", "Fonte", "Aluminium", "Plastique"], "a": 2,
      "e": "« Le bell housing est en aluminium. »" },
    { "q": "Avec quel outil peut-on frapper le bell housing pour le décoller ?",
      "o": ["Une masse de caoutchouc", "Une masse d'acier", "Un pipe wrench", "Une barre à clous"], "a": 0,
      "e": "« Le bell housing étant en aluminium, utiliser uniquement une masse de caoutchouc pour le décoller, afin de ne pas l'endommager. »" },
    { "q": "Si la coupling est collée, quel composant faut-il éviter d'endommager en frappant la pry bar ?",
      "o": ["Le bell housing", "Le shaft du moteur électrique", "La sangle", "Le couvercle"], "a": 1,
      "e": "« ...frapper sur la pry bar avec une masse ou un marteau, en prenant garde de ne pas endommager le shaft du moteur électrique. »" },
    { "q": "Quel produit applique-t-on sur les shafts avant le remontage ?",
      "o": ["De la graisse ordinaire", "De l'antiseize", "De l'huile", "Du WD-40"], "a": 1,
      "e": "« Bien nettoyer le shaft et l'épaulement de la pompe ainsi que le shaft du moteur électrique [...] et appliquer de l'antiseize. »" },
    { "q": "Comment doit être la coupling par rapport au shaft avant de serrer la barrure ?",
      "o": ["En retrait", "Dépassant de 1 cm", "FLUSH (à égalité)", "Peu importe"], "a": 2,
      "e": "« S'assurer que la coupling est FLUSH au shaft avant de serrer au maximum la barrure. »" },
    { "q": "Comment insère-t-on d'abord les 2 boulons de la pompe ?",
      "o": ["À la clé à choc", "À la main", "Au pistolet", "En forçant"], "a": 1,
      "e": "« Insérer à la main les 2 boulons de la pompe pour vérifier le bon alignement avant de les serrer avec la clé. »" },
    { "q": "Quelle clé Allen sert à la barrure de la coupling de la pompe ?",
      "o": ["3/16", "1/4", "5/16", "1/2"], "a": 2,
      "e": "« Clé ALLEN pour barrure coupling de la pompe : 5/16. »" }
  ],
  "pro-op-ith-002": [
    { "q": "Que faut-il faire avant d'intervenir pour dévisser des tiges ?",
      "o": ["Mettre la foreuse en marche", "Appliquer le cadenassage", "Retirer les clés", "Rien de spécial"], "a": 1,
      "e": "« Appliquer la procédure de cadenassage avant d'intervenir sur l'équipement pour dévisser des tiges ou un marteau coincé. »" },
    { "q": "Combien de tire-fort doit-on utiliser ?",
      "o": ["Un seul", "Deux", "Trois", "Autant que nécessaire"], "a": 0,
      "e": "« N'utiliser qu'un tire-fort dont les crochets sont munis de linguet. »" },
    { "q": "Quelle caractéristique les crochets du tire-fort doivent-ils avoir ?",
      "o": ["Être peints en rouge", "Être munis de linguet", "Être neufs", "Être doublés"], "a": 1,
      "e": "« Les crochets doivent être munis de linguet. »" },
    { "q": "Quelle est la charge certifiée de l'ancrage du mât à ne jamais dépasser ?",
      "o": ["1000 kg", "1500 kg", "2500 kg", "5000 kg"], "a": 2,
      "e": "« Ne pas dépasser la charge certifiée de l'ancrage du mât (2500 kg) lors de la mise en tension avec le tire-fort. »" },
    { "q": "Dans quelle position met-on le mât pour éviter que la clé à saver sub tombe ?",
      "o": ["Verticale", "À l'horizontale", "À 45 degrés", "Peu importe"], "a": 1,
      "e": "« Positionner le mât à l'horizontale avant d'installer la clé à saver sub afin d'éviter qu'elle tombe. »" },
    { "q": "Où place-t-on le gearbox pour avoir l'espace nécessaire ?",
      "o": ["Le plus près des tables", "Le plus loin possible des tables", "Sur la console", "Sous le mât"], "a": 1,
      "e": "« Placer le gearbox le plus loin possible des tables pour disposer de l'espace nécessaire à l'installation de la clé. »" },
    { "q": "Combien de manilles sont requises et de quelle dimension ?",
      "o": ["1 manille 1/2", "2 manilles 3/4", "4 manilles 3/4", "2 manilles 1''"], "a": 1,
      "e": "« Manilles requises : 2 manilles 3/4. »" }  ],
  "pro-op-ith-002a": [
    { "q": "Quel outil de mise en tension est utilisé dans cette procédure ?",
      "o": ["Un tire-fort", "Un palan à levier (come along)", "Un treuil électrique", "Un vérin"], "a": 1,
      "e": "Titre de la procédure : « Utilisation de la clé pour dévisser des tiges de forage avec un palan à levier (come along). »" },
    { "q": "Combien de palans à levier (come along) utilise-t-on ?",
      "o": ["Un seul", "Deux", "Trois", "Selon le besoin"], "a": 0,
      "e": "« Nombre de palans à levier (come along) : 1. »" },
    { "q": "Pour quelle charge l'ancrage doit-il être certifié ?",
      "o": ["1500 kg", "2000 kg", "2500 kg", "3000 kg"], "a": 2,
      "e": "« Utiliser uniquement un ancrage certifié pour une charge de 2500 kg. »" },
    { "q": "Dans quelle position met-on la flèche (boom) ?",
      "o": ["Verticale", "Horizontale", "Inclinée à 60°", "Peu importe"], "a": 1,
      "e": "« Mettre la flèche (boom) en position horizontale pour éviter que la clé à saver sub ne tombe. »" },
    { "q": "Combien de manilles et de quelle dimension ?",
      "o": ["1 manille 3/4", "2 manilles 3/4", "2 manilles 1''", "4 manilles 1/2"], "a": 1,
      "e": "« Manilles : 2 manilles 3/4. »" },
    { "q": "Lors d'un coup de masse, quelle est la double précaution ?",
      "o": ["Gants et lunettes", "Pieds sur surface solide ET personne dans l'axe de chute", "Casque et bottes", "Radio et lampe"], "a": 1,
      "e": "« S'assurer que vos pieds reposent sur une surface solide et que personne ne se trouve dans l'axe si la masse tombe. »" },
    { "q": "Où place-t-on le gearbox pour installer la clé ?",
      "o": ["Près des tables", "Loin des tables", "Au sol", "Sur la console"], "a": 1,
      "e": "« Éloigner le réducteur (gearbox) le plus possible des tables pour disposer d'assez d'espace afin d'installer la clé. »" }
  ],
  "pro-op-ith-003": [
    { "q": "Combien d'élingues et de quelle taille pour relier le traîneau/remorque ?",
      "o": ["1 élingue 1/2''", "2 élingues d'au moins 1'' x 8 pieds", "2 élingues de 4 pieds", "3 élingues 1''"], "a": 1,
      "e": "« Relier le traîneau ou la remorque au véhicule avec deux élingues d'au moins 1'' X 8 pieds. »" },
    { "q": "Quelle dimension minimale pour les manilles de fixation des élingues ?",
      "o": ["1/2''", "3/4''", "1'' 1/4", "2''"], "a": 2,
      "e": "« ...fixées avec des manilles de 1''1/4 minimum. »" },
    { "q": "Où l'opérateur doit-il se placer lors de l'embarquement de la foreuse ?",
      "o": ["À côté de la foreuse", "À l'intérieur du panier avec la chaîne garde-corps", "Sur le mât", "Dans la rampe"], "a": 1,
      "e": "« L'opérateur doit toujours se placer à l'intérieur du panier de la foreuse et mettre la chaîne garde-corps. »" },
    { "q": "Après le déplacement, peut-on attacher le traîneau au mur ?",
      "o": ["Oui, c'est recommandé", "Non, jamais; le laisser par terre et le signaler", "Seulement avec une chaîne", "Seulement la nuit"], "a": 1,
      "e": "« Ne jamais attacher le traîneau au mur après le déplacement; le laisser par terre et le signaler avec un ruban jaune. »" },
    { "q": "Combien de boulons doivent être en place sur la barre de tir du compresseur ?",
      "o": ["1 boulon", "2 boulons", "4 boulons", "Aucun"], "a": 1,
      "e": "« Verrouiller la barre de tir du compresseur avec le boulon [...] et s'assurer que les deux boulons sont en place pour limiter le pivot. »" },
    { "q": "Peut-on déplacer la foreuse SANS remorque dans la rampe ?",
      "o": ["Oui, à basse vitesse", "Non, c'est interdit dans la rampe", "Oui, sur courte distance", "Oui, avec escorte"], "a": 1,
      "e": "« Il est interdit de déplacer la foreuse sans la remorque dans la rampe. »" },
    { "q": "Sans remorque, avec quelles manilles installe-t-on la barre de tir ?",
      "o": ["Manilles 1/2''", "Manilles 3/4'' (raccord chargeuse 1 1/4'')", "Manilles 2''", "Sans manille"], "a": 1,
      "e": "« ...installer la barre de tir avec des manilles 3/4'', la raccorder à la chargeuse-navette avec une manille de 1 1/4'' et installer une chaîne de sécurité. »" }  ],
  "pro-op-ith-004": [
    { "q": "Avec quoi manipule-t-on l'extension du câble électrique sous tension ?",
      "o": ["À mains nues", "Avec le crochet de plastique", "Avec une pince métallique", "Avec des gants en cuir"], "a": 1,
      "e": "« Ne manipuler l'extension du câble électrique sous tension qu'avec le crochet de plastique. »" },
    { "q": "Au point de forage, comment met-on la foreuse hors tension ?",
      "o": ["En débranchant le câble", "Avec le E-STOP", "En coupant le moteur diesel", "On ne la coupe pas"], "a": 1,
      "e": "« Au point de forage, mettre la foreuse hors tension avec le E-STOP. »" },
    { "q": "À quelle hauteur accroche-t-on le câble électrique au mur ?",
      "o": ["Au sol", "À 4 à 5 pieds du banc (niveau de la poitrine)", "Au plafond", "À 10 pieds"], "a": 1,
      "e": "« ...accrocher le câble électrique au mur au niveau de la poitrine (4 à 5 pieds du banc). »" },
    { "q": "Où installe-t-on un dispositif de retenue (whip check) ?",
      "o": ["Seulement au début du boyau", "À chaque joint", "À la fin seulement", "Nulle part"], "a": 1,
      "e": "« Installer les dispositifs de retenue (whip check) à chaque joint. »" },
    { "q": "Quelle est la température des boyaux tressés des compresseurs ?",
      "o": ["100 °F", "300 °F", "800 °F", "1200 °F"], "a": 2,
      "e": "« ...une attention particulière doit être portée sur les boyaux tressés haute-température (800 degrés F) des compresseurs. »" },
    { "q": "Que fait-on aux boyaux à air juste avant de les connecter ?",
      "o": ["On les mouille", "On les souffle", "On les huile", "On les chauffe"], "a": 1,
      "e": "« Souffler les boyaux à air avant connexion et installer les dispositifs de retenue (whip check) à chaque joint. »" },
    { "q": "Quelle distance minimale entre la barricade et les premières pièces de matériel ?",
      "o": ["1 mètre", "3 mètres (10 pieds)", "7 mètres", "15 mètres"], "a": 1,
      "e": "« Laisser une distance d'au moins 3 mètres (10 pieds) entre la barricade à l'entrée du chantier et les premières pièces de matériel. »" },
    { "q": "Quelle distance minimale obligatoire entre le mât et la console ?",
      "o": ["0,5 mètre", "1 mètre", "1,5 mètre", "3 mètres"], "a": 2,
      "e": "« ...respecter obligatoirement une distance minimale de 1,5 mètre entre le mât et la console. »" },
    { "q": "Quand une pièce est en mouvement, où ne doit-on jamais se placer ?",
      "o": ["Derrière la console", "Entre la console et le mât, ni à moins de 1,5 m du mât", "Dans le panier", "Près de la barricade"], "a": 1,
      "e": "« Aucun travailleur ne doit se placer entre la console et le mât, ni à moins de 1,5 mètre du mât de tous les côtés. »" },
    { "q": "Lors du défoncement de trous, comment pousse-t-on ?",
      "o": ["Avec rotation rapide", "SANS rotation, 1 tige de plus que la longueur du défoncement", "En reculant", "Avec 2 tiges de plus"], "a": 1,
      "e": "« Lors du défoncement de trous, pousser SANS ROTATION 1 tige de plus que la longueur du défoncement. »" },
    { "q": "À partir de quelle profondeur privilégie-t-on un 2e travailleur ?",
      "o": ["50 pieds", "100 pieds", "200 pieds et plus", "500 pieds"], "a": 2,
      "e": "« Privilégier la présence d'un 2e travailleur pour le forage et l'arrachement des tiges des trous de 200 pieds et plus. »" },
    { "q": "Quelle distance doit-on respecter entre la foreuse et le surcompresseur ?",
      "o": ["3 mètres", "5 mètres", "7 mètres", "10 mètres"], "a": 2,
      "e": "« Respecter une distance de 7 mètres entre la foreuse et le surcompresseur. »" },
    { "q": "Quel diamètre de trou exige le chariot de transport (ou cloche et chaîne) ?",
      "o": ["Moins de 3 po", "Plus de 6 ½ po", "Exactement 4 po", "Tous les diamètres"], "a": 1,
      "e": "« Pour les trous de plus de 6 ½ po. de diamètre, utiliser le chariot de transport ou la cloche et la chaîne. »" }
  ],
  "pro-op-ith-005": [
    { "q": "Un employé peut-il descendre dans la monterie de 30 pouces pour récupérer une pièce ?",
      "o": ["Oui, avec un harnais", "Oui, si le superviseur l'autorise", "Non, c'est strictement interdit", "Oui, pour les tiges seulement"], "a": 2,
      "e": "« Il est strictement interdit à un employé d'entrer dans la monterie de 30 pouces pour récupérer quoi que ce soit. »" },
    { "q": "Quand le couvert est enlevé, comment doivent être les employés près de la monterie ?",
      "o": ["À 5 m", "Attachés (longe restrictive ou harnais + bloc rétractable)", "Assis", "Avec un casque seulement"], "a": 1,
      "e": "« ...les employés travaillant près de la monterie doivent être attachés en tout temps au moyen d'une longe restrictive ajustable qui empêche l'accès au trou ou avec un harnais et un bloc rétractable. »" },
    { "q": "À quelle distance du mât positionne-t-on la console ?",
      "o": ["0,5 m", "1 m", "1,5 m", "3 m"], "a": 2,
      "e": "« La console doit être à 1,5 m du mât et protéger les travailleurs des projections de roches. »" },
    { "q": "Quelle distance entre la foreuse et le surcompresseur ?",
      "o": ["3 m", "5 m", "7 m", "10 m"], "a": 2,
      "e": "« Maintenir une distance de 7 mètres entre la foreuse et le surcompresseur. »" },
    { "q": "À partir de quelle longueur de monterie installe-t-on un centralisateur ?",
      "o": ["Plus de 20 pieds", "Plus de 40 pieds", "Plus de 100 pieds", "Jamais"], "a": 1,
      "e": "« Installer un centralisateur pour stabiliser les tiges lorsque les monteries sont planifiées pour plus de 40 pieds de forage. »" },
    { "q": "Quelle est la température des boyaux des compresseurs (CUBEX/surcompresseur) ?",
      "o": ["200 °F", "500 °F", "800 °F", "1500 °F"], "a": 2,
      "e": "« ...les boyaux tressés haute-température (800 degrés F) des compresseurs. »" },
    { "q": "Quel est le diamètre final de la monterie ?",
      "o": ["10 pouces", "20 pouces", "30 pouces", "6 ½ pouces"], "a": 2,
      "e": "« Diamètre du trou final (monterie) : 30 pouces. »" }
  ],
  "pro-op-ith-006": [
    { "q": "Avec quoi manipule-t-on l'extension du câble sous tension ?",
      "o": ["Le crochet de plastique", "Une pince", "Les mains", "Une corde"], "a": 0,
      "e": "« Si l'extension doit être manipulée sous tension, utiliser le crochet de plastique. »" },
    { "q": "À quelle hauteur accroche-t-on le câble électrique au mur ?",
      "o": ["Au sol", "4 à 5 pieds du banc (niveau poitrine)", "Au plafond", "10 pieds"], "a": 1,
      "e": "« Accrocher le câble électrique au mur au niveau de la poitrine (4 à 5 pieds du banc). »" },
    { "q": "Où installe-t-on un whip check sur les boyaux d'air ?",
      "o": ["À chaque joint", "Seulement au compresseur", "À la fin du boyau", "Nulle part"], "a": 0,
      "e": "« Installer les dispositifs de retenue (whip check) à chaque joint des boyaux d'air. »" },
    { "q": "Où suspend-on les boyaux par rapport au câble électrique ?",
      "o": ["Au-dessus du câble", "En-dessous du câble électrique", "Enroulés autour", "Au sol seulement"], "a": 1,
      "e": "« Suspendre tous les boyaux en-dessous du câble électrique pour éliminer tout contact avec roches branlantes ou équipement minier. »" },
    { "q": "Quelle distance minimale entre la barricade et les premières pièces de matériel ?",
      "o": ["1 m", "3 mètres (10 pieds)", "7 m", "15 m"], "a": 1,
      "e": "« Laisser une distance d'au moins 3 mètres (10 pieds) entre la barricade à l'entrée du chantier et les premières pièces de matériel. »" },
    { "q": "Quel grade de chaîne utilise-t-on pour suspendre et positionner la tête V-30 ?",
      "o": ["Grade 30", "Grade 70", "Grade 80 (7100 lbs)", "Aucun grade précis"], "a": 2,
      "e": "« Utiliser une chaîne de grade 80 (7100 lbs) pour suspendre et positionner la tête V-30. »" },
  ],
  "pro-op-ith-007": [
    { "q": "Quelle est la zone d'exclusion autour du mât pendant le forage ?",
      "o": ["1,5 m", "3 m", "5 mètres", "10 m"], "a": 2,
      "e": "« Interdire à toute personne de circuler à moins de 5 mètres du mât de la foreuse pendant le forage. »" },
    { "q": "À quelle distance du point de forage place-t-on la commande de forage ?",
      "o": ["1 m", "3 m", "5 mètres", "15 m"], "a": 2,
      "e": "« Positionner la commande de forage à 5 mètres du point de forage pour être à l'abri des projections de roche. »" },
    { "q": "Quelle distance entre la foreuse et le compresseur (surcompresseur) ?",
      "o": ["3 m", "5 m", "7 mètres", "12 m"], "a": 2,
      "e": "« Maintenir une distance de 7 mètres entre la foreuse et le compresseur. »" },
    { "q": "Avec quoi manipule-t-on l'extension de câble sous tension ?",
      "o": ["Le crochet de plastique", "Une clé", "Les mains gantées", "Une pince"], "a": 0,
      "e": "« Manipuler toute extension de câble sous tension uniquement avec le crochet de plastique. »" },
    { "q": "À quel intervalle installe-t-on des centralisateurs quand la monterie dépasse 40 pieds ?",
      "o": ["Aux 20 pieds", "Aux 40 pieds", "Aux 100 pieds", "Un seul suffit"], "a": 1,
      "e": "« Installer des centralisateurs aux 40 pieds lorsque la monterie dépasse 40 pieds pour stabiliser les tiges. »" },
    { "q": "Quelle hauteur plancher-toit faut-il maintenir ?",
      "o": ["6 à 8 pieds", "12 à 14 pieds (max 4,3 m)", "20 pieds", "Aucune exigence"], "a": 1,
      "e": "« Maintenir une hauteur plancher-toit entre 12 et 14 pieds (max 4,3 m). »" },
  ],
  "pro-op-ith-008": [
    { "q": "Si un taillant se brise, peut-on descendre au fond de la monterie pour le récupérer ?",
      "o": ["Oui, avec un harnais", "Oui, si le superviseur l'autorise", "Non, c'est strictement défendu à quiconque en tout temps", "Oui, rapidement"], "a": 2,
      "e": "« Il est strictement défendu à quiconque, et ce en tout temps, de descendre au fond de la monterie pour dégager ou récupérer les pièces métalliques, les outils, les taillants ou tout autre équipement. »" },
    { "q": "Que faut-il faire AVANT d'enlever le couvercle de la monterie ?",
      "o": ["Couper l'air", "Porter un harnais et s'attacher à un ancrage ou une ligne de vie", "Appeler le fournisseur", "Rien"], "a": 1,
      "e": "« Porter un harnais et s'attacher à un ancrage ou à une ligne de vie avant d'enlever le couvercle de la monterie. »" },
    { "q": "Avec quel outil récupère-t-on le taillant ou les pièces brisées au fond ?",
      "o": ["À la main", "Avec le racloir de monterie (raise scraper)", "Avec un aimant", "Avec une corde"], "a": 1,
      "e": "« Récupérer le taillant ou les pièces brisées au fond de la monterie uniquement à l'aide du racloir de monterie (raise scraper) conçu à cet effet. »" },
    { "q": "Que sort-on de la monterie avant d'entreprendre la récupération ?",
      "o": ["Le couvercle", "La V-30 (en enlevant les tiges de forage)", "Le racloir", "Rien"], "a": 1,
      "e": "« Sortir la V-30 de la monterie en enlevant les tiges de forage avant d'entreprendre la récupération du taillant brisé. »" }  ],
  "pro-op-ith-012": [
    { "q": "Quelle distance minimale entre le foreur et le trou avec le système à distance ?",
      "o": ["10 pieds", "50 pieds (15 mètres)", "100 pieds", "5 mètres"], "a": 1,
      "e": "« Installer le système de commande à distance à un minimum de 50' (15 mètres) entre le foreur et le trou à forer. »" },
    { "q": "À quelle fréquence la procédure sur les barricades doit-elle être signée ?",
      "o": ["Une fois par mois", "Au début de chaque quart, avant le forage", "Jamais", "Une seule fois"], "a": 1,
      "e": "« ...la faire signer par le foreur ayant visité ces endroits avant le début du forage, au début de chaque quart. »" },
    { "q": "Dans quel état doit être la zone de forage pendant l'opération à distance ?",
      "o": ["Surveillée par un gardien", "Évacuée", "Éclairée seulement", "Peu importe"], "a": 1,
      "e": "« S'assurer que la zone de forage est évacuée et que la foreuse est exécutée au moyen d'un dispositif de commande à distance sous surveillance. »" },
    { "q": "Pour débloquer un trou dynamité à l'amex (ANFO), que met-on dans les tiges ?",
      "o": ["De l'huile", "De l'eau (pour diminuer le risque d'explosion)", "De l'air", "Du sable"], "a": 1,
      "e": "« Lors du déblocage d'un trou dynamité avec amex (ANFO), mettre de l'eau dans les tiges de forage pour diminuer le risque d'explosion. »" },
    { "q": "Quel article du règlement encadre le forage à distance ?",
      "o": ["Article 100", "Article 440", "Article 250", "Article 12"], "a": 1,
      "e": "« Article 440 : des trous peuvent être forés à des distances moindres [...] pourvu que le forage soit exécuté au moyen d'un dispositif de commande à distance sous surveillance et que la zone de forage soit évacuée. »" }
  ],
  "pro-op-ith-014": [
    { "q": "Quand est-il interdit de positionner une partie de son corps sous les tables ?",
      "o": ["Jamais interdit", "Si le marteau n'est pas monté au-delà des tables et la slip-plate pas fermée", "Seulement la nuit", "Si la foreuse tourne"], "a": 1,
      "e": "« Il est interdit à qui que ce soit de positionner toute partie de son corps sous les tables si le marteau n'est pas monté au-delà des tables et que la slip plate n'est pas fermée. »" },
    { "q": "Quelle distance minimale obligatoire entre le mât et la console ?",
      "o": ["0,5 m", "1 m", "1,5 mètre", "3 m"], "a": 2,
      "e": "« Une distance minimum de 1,5 mètre entre le mât et la console doit obligatoirement être respectée. »" },
    { "q": "Quand une pièce est en mouvement, où ne peut-on se placer ?",
      "o": ["Derrière la console", "Entre la console et le mât, ni à moins de 1,5 m du mât", "Près du tubage", "Au sol"], "a": 1,
      "e": "« Quand une pièce est en mouvement, aucun travailleur ne peut se placer entre la console et le mât, ni à moins de 1,5 mètre du mât de tous les côtés. »" },
    { "q": "Avant de procéder au nettoyage, que fait-on du marteau et de la slip-plate ?",
      "o": ["Rien", "Monter le marteau au-delà des tables, fermer la slip-plate, appuyer la bit et fermer l'interrupteur", "Baisser le marteau", "Ouvrir la slip-plate"], "a": 1,
      "e": "« Avant de procéder au nettoyage, monter le marteau au-delà des tables, fermer la slip-plate ou les jaws, appuyer la bit sur la slip-plate ou les jaws, et fermer l'interrupteur de la foreuse. »" },
    { "q": "Comment visse-t-on le marteau au saver sub ?",
      "o": ["Au complet sans le serrer avec force", "Le plus fort possible", "À moitié", "À la clé à choc"], "a": 0,
      "e": "« Visser le marteau au saver sub au complet sans le serrer avec force. »" },
    { "q": "Pourquoi la longueur de dépassement des tubages peut-elle changer ?",
      "o": ["À cause du vent", "À cause de l'accumulation de boue de forage", "À cause du gel", "Elle ne change pas"], "a": 1,
      "e": "« La longueur de dépassement peut changer pendant le forage à cause de l'accumulation de boue de forage. »" },
    { "q": "Quelle procédure doit-on respecter au préalable, et que vérifier ?",
      "o": ["Aucune", "La procédure PRO-OP-ITH-004 et le bon alignement de la foreuse selon les plans", "Seulement le cadenassage", "PRO-MEC-011"], "a": 1,
      "e": "« Respecter au préalable la procédure de forage PRO-OP-ITH-004 et s'assurer que la foreuse est bien alignée selon les plans de forage avant l'installation du tubage. »" },
    { "q": "Au 2e forage, de combien le casing doit-il entrer dans le roc solide ?",
      "o": ["1 pouce", "1 pied", "3 pieds", "Il n'entre pas dans le roc"], "a": 1,
      "e": "« Profondeur du 2e forage dans le roc solide : 1 pied. »" }
  ],
  "pro-op-ith-016": [
    { "q": "Quel composant doit toujours être installé sur les marteaux lors de la manipulation ?",
      "o": ["Le Driver Sub", "Le Gear Box", "La slip-plate", "Le centralisateur"], "a": 0,
      "e": "« Le Driver Sub doit être installé sur les marteaux en tout temps lors de la manipulation. »" },
    { "q": "Comment installe-t-on les marteaux de 3\" et 4\" ?",
      "o": ["Au chariot uniquement", "Manuellement sur le Gear Box, comme les tiges (puis procédure à partir du point #8)", "À la grue", "On ne les installe pas"], "a": 1,
      "e": "« Les marteaux de 3'' et 4'' doivent être installés sur le Gear Box manuellement de la même manière que les tiges de forage. Le travailleur appliquera ensuite cette procédure à partir du point #8. »" },
    { "q": "Quand retire-t-on la chaîne de sûreté du chariot ?",
      "o": ["Au début", "Seulement après avoir vissé et accoté le marteau dans le saver sub", "Jamais", "Avant de visser"], "a": 1,
      "e": "« Retirer la chaîne de sûreté du chariot seulement après avoir vissé et accoté le marteau dans le saver sub. »" },
    { "q": "Combien pèse le marteau de 3\" ?",
      "o": ["60 lbs", "89 lbs", "211 lbs", "150 lbs"], "a": 0,
      "e": "« Poids du marteau 3'' : 60 lbs. »" },
    { "q": "Combien pèse le marteau de 6\" ?",
      "o": ["89 lbs", "150 lbs", "211 lbs", "60 lbs"], "a": 2,
      "e": "« Poids du marteau 6'' : 211 lbs. »" },
    { "q": "À l'étape finale, de combien dévisse-t-on le marteau ?",
      "o": ["1 tour seulement", "5 tours", "Complètement", "Une demi-tour"], "a": 0,
      "e": "« Dévissage final du marteau (étape 29) : 1 tour seulement. »" }  ]
};

/* ===========================================================================
   QUESTIONS DIFFICILES — exigent d'avoir lu et compris la procédure
   (scénarios, conditions, exceptions, « que faire si... »). Chaque réponse
   reste une CITATION fidèle de la procédure officielle. Champ "d":"difficile"
   → affiche un badge « Difficile ». Ce bloc s'ajoute aux questions existantes
   sans les modifier.
   =========================================================================== */
(function () {
  var HARD = {
    "centralisateur": [
      { "q": "Sur le chantier, un collègue veut poser les centralisateurs « pile à tous les 40 pieds » sans rien regarder d'autre. A-t-il raison ?", "d": "difficile",
        "o": ["Oui, c'est une règle fixe de 40 pieds", "Non : tous les 40 pieds OU selon les conditions de terrain, la longueur et l'angle de la monterie", "Toujours tous les 20 pieds", "Seulement à la base"], "a": 1,
        "e": "« Les centralisateurs de tiges sont normalement installés tous les 40 pieds ou selon les besoins en fonction des conditions de terrain dans la monterie ainsi que de la longueur et l'angle de la monterie forée. »" },
      { "q": "Il n'y a aucune séquence imposée pour serrer les boulons. Pendant le serrage, que devez-vous tout de même maintenir, et avec quel outil ?", "d": "difficile",
        "o": ["Rien de particulier", "Une tension sur les lockwashers, avec une clé ou un box", "Une tension sur les boyaux, avec un wescot", "Le mât à l'horizontale"], "a": 1,
        "e": "« Serrer tous les boulons en maintenant une tension sur les lockwashers à l'aide de l'outil adéquat (clé ou box). »" },
      { "q": "Avant de soulever une pièce du centralisateur, quelles DEUX exigences la procédure impose-t-elle ensemble ?", "d": "difficile",
        "o": ["Travailler seul mais rapidement", "Être deux travailleurs ET se positionner correctement avant de manipuler (46 livres/pièce)", "Porter un harnais antichute", "Utiliser un pipe wrench"], "a": 1,
        "e": "« Toujours installer le centralisateur à deux travailleurs. » et « Se positionner [...] avant de manipuler les pièces du centralisateur, qui pèsent 46 livres chacune. »" }
    ],
    "pro-mec-011": [
      { "q": "Pourquoi la procédure exige-t-elle de remettre le couvercle de plastique à la toute fin ?", "d": "difficile",
        "o": ["Pour l'esthétique", "Parce qu'un début d'incendie a été causé par la surchauffe du bell housing et du couvercle", "Pour garder la poussière dehors", "Ce n'est pas obligatoire"], "a": 1,
        "e": "« Remettre le couvercle de plastique à la fin pour rétablir la protection (mesure issue d'un début d'incendie causé par surchauffe du bell housing et du couvercle). »" },
      { "q": "Le bell housing est en aluminium. Comment le décoller sans l'endommager ?", "d": "difficile",
        "o": ["Avec une masse d'acier", "Uniquement avec une masse de caoutchouc", "Avec un chalumeau", "Avec un pipe wrench"], "a": 1,
        "e": "« Le bell housing étant en aluminium, utiliser uniquement une masse de caoutchouc pour le décoller, afin de ne pas l'endommager. »" },
      { "q": "La coupling est collée et refuse de sortir. Quelle est la marche à suivre de la procédure ?", "d": "difficile",
        "o": ["Forcer avec la pompe", "Retirer le bell housing, puis frapper sur la pry bar sans endommager le shaft du moteur électrique", "Chauffer le shaft au chalumeau", "Laisser tomber la réparation"], "a": 1,
        "e": "« Si la coupling est collée, retirer le bell housing puis frapper sur la pry bar avec une masse ou un marteau, en prenant garde de ne pas endommager le shaft du moteur électrique. »" }
    ],
    "pro-op-ith-002": [
      { "q": "En mettant le tire-fort en tension sur l'ancrage du mât, quelle limite ne devez-vous jamais dépasser ?", "d": "difficile",
        "o": ["1000 kg", "La charge certifiée de l'ancrage du mât : 2500 kg", "5000 kg", "Aucune limite"], "a": 1,
        "e": "« Ne pas dépasser la charge certifiée de l'ancrage du mât (2500 kg) lors de la mise en tension avec le tire-fort. »" },
      { "q": "Pour installer la clé à saver sub sans qu'elle tombe, dans quelle position mettez-vous le mât ?", "d": "difficile",
        "o": ["Vertical", "À l'horizontale", "À 60 degrés", "Peu importe"], "a": 1,
        "e": "« Positionner le mât à l'horizontale avant d'installer la clé à saver sub afin d'éviter qu'elle tombe. »" }
    ],
    "pro-op-ith-002a": [
      { "q": "Avec le palan à levier (come along), quel ancrage devez-vous utiliser ?", "d": "difficile",
        "o": ["Un ancrage de 1500 kg", "Uniquement un ancrage certifié pour 2500 kg", "N'importe quel boulon à œil", "Aucun ancrage"], "a": 1,
        "e": "« Utiliser uniquement un ancrage certifié pour une charge de 2500 kg. »" },
    ],
    "pro-op-ith-003": [
      { "q": "On veut déplacer la foreuse SANS remorque (barre de tir). Dans quelles conditions est-ce permis ?", "d": "difficile",
        "o": ["Partout, y compris dans la rampe", "À plat, sur de courtes distances, à basse vitesse — interdit dans la rampe", "Seulement en descendant la rampe", "Jamais, en aucun cas"], "a": 1,
        "e": "« Ne déplacer la foreuse sans remorque qu'à plat, sur de courtes distances et à basse vitesse; il est interdit de la déplacer sans remorque dans la rampe. »" },
      { "q": "Le déplacement est terminé. Que fait-on du traîneau ?", "d": "difficile",
        "o": ["On l'attache solidement au mur", "On ne l'attache jamais au mur : on le laisse par terre et on le signale avec un ruban jaune", "On le suspend au mât", "On le remonte sur la remorque"], "a": 1,
        "e": "« Ne jamais attacher le traîneau au mur après le déplacement; le laisser par terre et le signaler avec un ruban jaune. »" }
    ],
    "pro-op-ith-004": [
      { "q": "Une pièce de la foreuse est en mouvement. Quelle est la zone d'exclusion à respecter ?", "d": "difficile",
        "o": ["0,5 m du mât", "1,5 m du mât de tous les côtés, et personne entre la console et le mât", "3 m du mât", "7 m du mât"], "a": 1,
        "e": "« Quand une pièce est en mouvement, aucun travailleur ne doit se placer entre la console et le mât, ni à moins de 1,5 mètre du mât de tous les côtés. »" },
      { "q": "Lors du défoncement d'un trou, comment doit-on pousser ?", "d": "difficile",
        "o": ["Avec rotation maximale", "Sans rotation, 1 tige de plus que la longueur du défoncement", "En ajoutant de l'eau", "En reculant la tête"], "a": 1,
        "e": "« Lors du défoncement de trous, pousser SANS ROTATION 1 tige de plus que la longueur du défoncement. »" },
      { "q": "Trou de plus de 6½ po : comment déposer le marteau et quand prévoir un 2e travailleur ?", "d": "difficile",
        "o": ["À la main, jamais de 2e travailleur", "Chariot (ou cloche et chaîne) stable ; 2e travailleur privilégié dès 200 pieds et plus", "Le laisser tomber au sol", "Toujours seul, peu importe la profondeur"], "a": 1,
        "e": "« ...utiliser le chariot de transport ou la cloche et la chaîne ; s'assurer que le chariot est stable... » et « ...un 2e travailleur pour ... les trous de 200 pieds et plus... »" }
    ],
    "pro-op-ith-005": [
    ],
    "pro-op-ith-006": [
      { "q": "Pour suspendre et positionner la tête V-30, quelle chaîne doit-on utiliser ?", "d": "difficile",
        "o": ["Une chaîne de grade 30", "Une chaîne de grade 80 (7100 lbs)", "Une corde certifiée", "Un câble de 2500 kg"], "a": 1,
        "e": "« Utiliser une chaîne de grade 80 (7100 lbs) pour suspendre et positionner la tête V-30. »" },
      { "q": "Pourquoi utilise-t-on obligatoirement le raccord situé entre la V-30 et la tige ?", "d": "difficile",
        "o": ["Pour serrer le plus fort possible", "Pour empêcher le serrage et permettre un désaccouplement facile", "C'est purement décoratif", "Pour ajouter de l'eau"], "a": 1,
        "e": "« Utiliser obligatoirement le raccord situé entre la V-30 et la tige pour empêcher le serrage et permettre le désaccouplement facile. »" },
      { "q": "Lors d'un alésage qui débouche, comment protège-t-on les travailleurs contre le trou ?", "d": "difficile",
        "o": ["Rien de spécial", "Laisser un pilier de couronne en place ou installer une plaque d'acier identifiée sur le trou", "Tendre une corde", "Remplir d'eau"], "a": 1,
        "e": "« Protéger les travailleurs contre le trou en laissant un pilier de couronne en place ou en installant une plaque d'acier identifiée sur le trou. »" }
    ],
    "pro-op-ith-007": [
      { "q": "Pendant le forage (alésage ascendant), quelle distance d'exclusion faut-il respecter autour du mât ?", "d": "difficile",
        "o": ["1,5 m", "5 mètres", "7 m", "3 m"], "a": 1,
        "e": "« Interdire à toute personne de circuler à moins de 5 mètres du mât de la foreuse pendant le forage. »" },
      { "q": "Quelle hauteur plancher-toit faut-il respecter, et que faire si elle dépasse 14 pieds ?", "d": "difficile",
        "o": ["Aucune exigence", "12 à 14 pieds (max 4,3 m) ; au-delà, relever le plancher avec de la roche abattue", "Exactement 6 pieds", "30 pieds minimum"], "a": 1,
        "e": "« Maintenir une hauteur plancher-toit entre 12 et 14 pieds (max 4,3 m); au-delà de 4,3 m (14 pi), relever le plancher avec de la roche abattue. »" }    ],
    "pro-op-ith-008": [
      { "q": "Un taillant s'est brisé au fond de la monterie. Peut-on descendre le récupérer ?", "d": "difficile",
        "o": ["Oui, avec un harnais", "Non, jamais : interdiction stricte à quiconque et en tout temps", "Oui si la monterie est courte", "Seulement le foreur expérimenté"], "a": 1,
        "e": "« Ne jamais descendre au fond de la monterie pour dégager ou récupérer des pièces métalliques, des outils, des taillants ou tout autre équipement : cette interdiction s'applique à quiconque et en tout temps. »" },
      { "q": "Avec quel outil récupère-t-on le taillant ou les pièces brisées au fond ?", "d": "difficile",
        "o": ["À la main au bout d'une corde", "Uniquement le racloir de monterie (raise scraper) conçu à cet effet", "Un aimant", "La tête V-30 elle-même"], "a": 1,
        "e": "« Récupérer le taillant ou les pièces brisées au fond de la monterie uniquement à l'aide du racloir de monterie (raise scraper) conçu à cet effet. »" }    ],
    "pro-op-ith-012": [
      { "q": "En forage à distance, quelle distance minimale entre le foreur et le trou à forer ?", "d": "difficile",
        "o": ["10 m", "50 pieds (15 mètres)", "5 m", "7 m"], "a": 1,
        "e": "« Installer le système de commande à distance à un minimum de 50' (15 mètres) entre le foreur et le trou à forer. »" },
      { "q": "Vous débloquez un trou qui a été dynamité à l'amex (ANFO). Que mettez-vous dans les tiges ?", "d": "difficile",
        "o": ["De l'huile", "De l'eau, pour diminuer le risque d'explosion", "De l'air comprimé", "Rien"], "a": 1,
        "e": "« Lors du déblocage d'un trou dynamité avec amex (ANFO), mettre de l'eau dans les tiges de forage pour diminuer le risque d'explosion. »" }    ],
    "pro-op-ith-014": [
      { "q": "Le 2e forage destiné au casing doit pénétrer de combien dans le roc solide ?", "d": "difficile",
        "o": ["1 pouce", "1 pied dans le roc solide", "1 mètre", "Aucune profondeur précise"], "a": 1,
        "e": "« ...2e forage : ... 1 pied dans le roc solide. » (ex. casing 4 pouces : « 4 pouces, 1 pied dans le roc solide »)" }    ],
    "pro-op-ith-016": [
    ]
  };
  var Q = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(HARD).forEach(function (id) {
    Q[id] = (Q[id] || []).concat(HARD[id]);
  });
})();

/* ===========================================================================
   QUESTIONS DIFFICILES — 2e série (couverture étendue des procédures riches).
   Mêmes règles : citation fidèle de la procédure, champ "d":"difficile".
   =========================================================================== */
(function () {
  var HARD2 = {
    "pro-mec-011": [
      { "q": "Au retrait de la pompe, comment la retenir et pourquoi ?", "d": "difficile",
        "o": ["Par en-dessous, à deux mains", "Avec les mains sur les boyaux, car elle n'est plus tenue que par les boyaux et la sangle", "Avec un palan seulement", "On la laisse tomber"], "a": 1,
        "e": "« Lors du retrait de la pompe, la retenir avec les mains sur les boyaux car elle n'est plus tenue que par les boyaux hydrauliques et la sangle. »" },
      { "q": "Avant de serrer au maximum la barrure, de quoi faut-il s'assurer ?", "d": "difficile",
        "o": ["Que le moteur tourne", "Que la coupling est « FLUSH » au shaft", "Que la pompe est froide", "Rien"], "a": 1,
        "e": "« S'assurer que la coupling est « FLUSH » au shaft avant de serrer au maximum la barrure. »" }
    ],
    "pro-op-ith-002": [
      { "q": "Quel type de crochets le tire-fort doit-il obligatoirement avoir ?", "d": "difficile",
        "o": ["Des crochets ouverts", "Des crochets munis de linguet", "Des crochets soudés", "Peu importe"], "a": 1,
        "e": "« N'utiliser qu'un tire-fort dont les crochets sont munis de linguet. »" },
      { "q": "Où placer le gearbox pour avoir l'espace d'installer la clé à saver sub ?", "d": "difficile",
        "o": ["Le plus près possible des tables", "Le plus loin possible des tables", "Au centre du mât", "Peu importe"], "a": 1,
        "e": "« Placer le gearbox le plus loin possible des tables pour disposer de l'espace nécessaire à l'installation de la clé. »" }
    ],
    "pro-op-ith-002a": [
    ],
    "pro-op-ith-003": [
      { "q": "Pour relier le traîneau/remorque au véhicule, quel matériel minimum ?", "d": "difficile",
        "o": ["Une corde", "Deux élingues d'au moins 1'' X 8 pieds, manilles de 1''1/4 minimum", "Une seule manille 3/4", "Une chaîne quelconque"], "a": 1,
        "e": "« Relier le traîneau ou la remorque au véhicule avec deux élingues d'au moins 1'' X 8 pieds, fixées avec des manilles de 1''1/4 minimum. »" },
      { "q": "Lors de l'embarquement de la foreuse, où doit se tenir l'opérateur ?", "d": "difficile",
        "o": ["À côté de la remorque", "À l'intérieur du panier, avec la chaîne garde-corps en place", "Au sol pour guider", "Dans le véhicule"], "a": 1,
        "e": "« Lors de l'embarquement de la foreuse, l'opérateur doit toujours se placer à l'intérieur du panier et mettre la chaîne garde-corps. »" }
    ],
    "pro-op-ith-004": [
      { "q": "À quel endroit installe-t-on un dispositif de retenue (whip check) ?", "d": "difficile",
        "o": ["À une extrémité seulement", "À chaque joint des boyaux d'air", "Au compresseur uniquement", "Nulle part"], "a": 1,
        "e": "« Souffler les boyaux à air avant connexion et installer les dispositifs de retenue (whip check) à chaque joint... »" },
      { "q": "Quelle distance minimale garder entre la foreuse et le surcompresseur ?", "d": "difficile",
        "o": ["1,5 m", "3 m", "7 mètres", "15 m"], "a": 2,
        "e": "« Respecter une distance de 7 mètres entre la foreuse et le surcompresseur. »" }
    ],
    "pro-op-ith-005": [
      { "q": "Quel est le diamètre du trou final (la monterie) ?", "d": "difficile",
        "o": ["6½ pouces", "10 pouces", "30 pouces", "40 pouces"], "a": 2,
        "e": "« Diamètre du trou final (monterie) : 30 pouces. »" }
    ],
    "pro-op-ith-006": [
    ],
    "pro-op-ith-007": [
      { "q": "À quelle distance du point de forage positionner la commande de forage ?", "d": "difficile",
        "o": ["1,5 m", "3 m", "5 mètres", "7 m"], "a": 2,
        "e": "« Positionner la commande de forage à 5 mètres du point de forage pour être à l'abri des projections de roche. »" },
      { "q": "Après un bris de tige, que fait-on de la tige brisée ?", "d": "difficile",
        "o": ["On la jette", "On l'étiquette et on la retourne au fournisseur, et on remplit un rapport d'incident", "On la répare", "On la réutilise"], "a": 1,
        "e": "« Après un bris de tige, retirer et vérifier toutes les autres tiges; étiqueter et retourner la tige brisée au fournisseur; remplir un rapport d'incident. »" }
    ],
    "pro-op-ith-008": [
    ],
    "pro-op-ith-012": [
      { "q": "Quel article du Règlement encadre le forage à distance ?", "d": "difficile",
        "o": ["L'article 12", "L'article 440 du Règlement sur la Santé et la Sécurité du travail dans les Mines", "L'article 100", "Aucun"], "a": 1,
        "e": "« Article 440 du Règlement sur la Santé et la Sécurité du travail dans les Mines. »" }    ],
    "pro-op-ith-014": [
      { "q": "Comment visse-t-on le marteau au saver sub à cette étape ?", "d": "difficile",
        "o": ["Au complet, sans le serrer avec force", "Le plus fort possible", "À moitié", "Avec une clé à choc"], "a": 0,
        "e": "« Visser le marteau au saver sub au complet sans le serrer avec force. »" }
    ],
    "pro-op-ith-016": [
    ]
  };
  var Q = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(HARD2).forEach(function (id) {
    Q[id] = (Q[id] || []).concat(HARD2[id]);
  });
})();
