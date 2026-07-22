/* ===========================================================================
   QUIZ PAR PROCÉDURE — couvre l'information importante de chaque fiche.
   Schéma : window.QUIZ_PROC[id] = [ { q, o:[options], a:index_bonne, e:citation } ]
   IMPORTANT : "e" est une CITATION de la procédure officielle (consigne /
   avertissement / valeur). Aucune interprétation : on cite le texte source.
   Affiché sur la page de détail de chaque procédure, avec rétroaction immédiate.
   =========================================================================== */
window.QUIZ_PROC = {
  "centralisateur": [
    { "q": "Combien de travailleurs faut-il pour poser le centralisateur ?",
      "o": ["1 travailleur", "2 travailleurs", "3 travailleurs", "Selon qui est là"], "a": 1,
      "e": "« L'installation du centralisateur doit toujours se faire à deux travailleurs. »" },
    { "t": "trou", "q": "Il faut se positionner avant de manipuler les pièces du centralisateur, qui pèsent ______ chacune.",
      "o": ["12 livres", "25 livres", "46 livres", "93 livres"], "a": 2,
      "e": "« Se positionner [...] avant de manipuler les pièces du centralisateur, qui pèsent 46 livres chacune. »" },
    { "q": "Quel outil ne faut-il PAS utiliser pour serrer les boulons ?",
      "o": ["Une clé ou un box", "Un wescot ou un pipe wrench", "Une clé Allen", "Un tournevis"], "a": 1,
      "e": "« L'utilisation d'un wescot ou d'un pipe wrench n'est pas adéquate. »" },
    { "q": "Combien de boulons, de locknuts et de lockwashers faut-il vérifier ?",
      "o": ["6 de chaque", "8 de chaque", "12 de chaque", "16 de chaque"], "a": 2,
      "e": "« Vérifier la présence des 12 boulons, 12 locknuts et 12 lockwashers avant le serrage. »" },
    { "q": "Tous les combien de pieds pose-t-on un centralisateur ?",
      "o": ["Tous les 20 pieds", "Tous les 40 pieds", "Tous les 60 pieds", "Tous les 100 pieds"], "a": 1,
      "e": "« Espacement d'installation des centralisateurs : tous les 40 pieds (ou selon les conditions). »" },
    { "t": "vf", "q": "Il n'y a pas de séquence d'installation ou de serrage des boulons et des écrous à respecter.", "vrai": true,
      "e": "« Il n'y a pas de séquence d'installation ou de serrage des boulons et des écrous. »" },
    { "q": "Quand tu mets les boulons dans les trous, quel danger faut-il éviter ?",
      "o": ["Abîmer les filets", "Échapper la pièce", "Une brûlure", "Un choc électrique"], "a": 0,
      "e": "« Attention de ne pas endommager les filets des boulons quand vous les entrez dans les trous prévus à cet effet. »" },
    { "q": "Comment place-t-on les boulons sur le centralisateur ?",
      "o": ["Tous du même côté", "6 d'un côté et 6 de l'autre", "4 et 8", "Au hasard"], "a": 1,
      "e": "« Répartition des boulons : 6 dans un sens et 6 dans l'autre sens. »" },
    { "q": "Combien pèse le centralisateur au complet ?",
      "o": ["46 lbs", "93 lbs", "12 lbs", "211 lbs"], "a": 1,
      "e": "« Poids total du centralisateur (dessin technique) : 93,0 lbs. »" }
  ],
  "pro-mec-011": [
    { "t": "vf", "q": "Le bell housing est en aluminium.", "vrai": true,
      "e": "« Le bell housing est en aluminium. »" },
    { "q": "Avec quoi frappes-tu le bell housing pour le décoller ?",
      "o": ["Une masse en caoutchouc", "Une masse en acier", "Une clé à tuyau", "Une barre à clous"], "a": 0,
      "e": "« Le bell housing étant en aluminium, utiliser uniquement une masse de caoutchouc pour le décoller, afin de ne pas l'endommager. »" },
    { "q": "Tu mets quel produit sur les shafts avant de remonter ?",
      "o": ["De la graisse ordinaire", "De l'antiseize", "De l'huile", "Du WD-40"], "a": 1,
      "e": "« Bien nettoyer le shaft et l'épaulement de la pompe ainsi que le shaft du moteur électrique [...] et appliquer de l'antiseize. »" },
    { "q": "Avant de serrer la barrure, la coupling doit être comment sur le shaft ?",
      "o": ["En retrait", "Dépasse de 1 cm", "FLUSH (à égalité)", "Peu importe"], "a": 2,
      "e": "« S'assurer que la coupling est FLUSH au shaft avant de serrer au maximum la barrure. »" },
    { "q": "Tu mets d'abord les 2 boulons de la pompe comment ?",
      "o": ["À la clé à choc", "À la main", "Au pistolet", "En forçant"], "a": 1,
      "e": "« Insérer à la main les 2 boulons de la pompe pour vérifier le bon alignement avant de les serrer avec la clé. »" },
    { "t": "trou", "q": "La clé ALLEN à utiliser pour la barrure de la coupling de la pompe est de ______.",
      "o": ["3/16", "1/4", "5/16", "1/2"], "a": 2,
      "e": "« Clé ALLEN pour barrure coupling de la pompe : 5/16. »" }
  ],
  "pro-op-ith-002": [
    { "t": "vf", "q": "On ne doit utiliser qu'un seul tire-fort, dont les crochets sont munis de linguet.", "vrai": true,
      "e": "« N'utiliser qu'un tire-fort dont les crochets sont munis de linguet. »" },
    { "q": "Que doivent avoir les crochets du tire-fort ?",
      "o": ["Être rouges", "Un linguet", "Être neufs", "Être doublés"], "a": 1,
      "e": "« Les crochets doivent être munis de linguet. »" },
    { "t": "trou", "q": "Lors de la mise en tension avec le tire-fort, ne pas dépasser la charge certifiée de l'ancrage du mât, soit ______.",
      "o": ["1000 kg", "1500 kg", "2500 kg", "5000 kg"], "a": 2,
      "e": "« Ne pas dépasser la charge certifiée de l'ancrage du mât (2500 kg) lors de la mise en tension avec le tire-fort. »" },
    { "q": "Dans quelle position met-on le mât pour poser la clé à saver sub sans qu'elle tombe ?",
      "o": ["Verticale", "À l'horizontale", "À 45 degrés", "Peu importe"], "a": 1,
      "e": "« Positionner le mât à l'horizontale avant d'installer la clé à saver sub afin d'éviter qu'elle tombe. »" },
    { "q": "Où place-t-on le gearbox pour avoir assez de place ?",
      "o": ["Le plus près des tables", "Le plus loin des tables", "Sur la console", "Sous le mât"], "a": 1,
      "e": "« Placer le gearbox le plus loin possible des tables pour disposer de l'espace nécessaire à l'installation de la clé. »" },
    { "q": "Combien de manilles faut-il, et de quelle taille ?",
      "o": ["1 manille 1/2", "2 manilles 3/4", "4 manilles 3/4", "2 manilles 1''"], "a": 1,
      "e": "« Manilles requises : 2 manilles 3/4. »" },
    { "t": "multi", "q": "Coche les affirmations VRAIES sur le coup de masse et le cadenassage lors du dévissage des tiges.",
      "o": ["Appliquer le cadenassage avant d'intervenir pour dévisser des tiges ou un marteau coincé.", "Lors d'un coup de masse, garder les pieds sur une surface solide.", "On peut décadenasser l'équipement dès que les clés sont installées, sans attendre la fin de l'opération.", "Lors d'un coup de masse, personne ne doit se tenir dans la ligne de la masse si elle est échappée.", "Inspecter les outils nécessaires avant d'amorcer la tâche."], "a": [0, 1, 3, 4],
      "e": "« Appliquer la procédure de cadenassage avant d'intervenir sur l'équipement pour dévisser des tiges ou un marteau coincé. » ; « Lors d'un coup de masse sur le manche de la clé, s'assurer d'avoir les pieds sur une surface solide. » ; « ...s'assurer que personne ne se trouve dans la ligne de la masse advenant qu'elle soit échappée. » ; « Inspecter les outils nécessaires avant d'amorcer la tâche. » L'option fausse contredit : « Retirer les clés et décadenasser l'équipement uniquement une fois l'opération terminée. »" }  ],
  "pro-op-ith-003": [
    { "t": "vf", "q": "Le traîneau ou la remorque doit être relié au véhicule avec deux élingues d'au moins 1'' X 8 pieds.", "vrai": true,
      "e": "« Relier le traîneau ou la remorque au véhicule avec deux élingues d'au moins 1'' X 8 pieds. »" },
    { "t": "trou", "q": "Les élingues doivent être fixées avec des manilles de ______ minimum.",
      "o": ["1/2 pouce", "3/4 de pouce", "1 pouce et quart", "2 pouces"], "a": 2,
      "e": "« ...fixées avec des manilles de 1''1/4 minimum. »" },
    { "q": "Combien de boulons doivent être en place sur la barre de tir du compresseur ?",
      "o": ["1 boulon", "2 boulons", "4 boulons", "Aucun"], "a": 1,
      "e": "« Verrouiller la barre de tir du compresseur avec le boulon [...] et s'assurer que les deux boulons sont en place pour limiter le pivot. »" },
    { "q": "Sans remorque, avec quelles manilles pose-t-on la barre de tir ?",
      "o": ["Manilles de 1/2 pouce", "Manilles de 3/4 de pouce (et 1 pouce et quart côté chargeuse)", "Manilles de 2 pouces", "Sans manille"], "a": 1,
      "e": "« ...installer la barre de tir avec des manilles 3/4'', la raccorder à la chargeuse-navette avec une manille de 1 1/4'' et installer une chaîne de sécurité. »" }  ],
  "pro-op-ith-004": [
    { "q": "Le câble électrique est sous tension. Avec quoi tiens-tu sa rallonge ?",
      "o": ["Avec mes mains nues", "Avec le crochet en plastique", "Avec une pince en métal", "Avec des gants en cuir"], "a": 1,
      "e": "« Ne manipuler l'extension du câble électrique sous tension qu'avec le crochet de plastique. »" },
    { "q": "Au forage, comment coupes-tu le courant de la foreuse ?",
      "o": ["Je débranche le câble", "J'appuie sur le E-STOP", "Je coupe le moteur diesel", "On ne la coupe pas"], "a": 1,
      "e": "« Au point de forage, mettre la foreuse hors tension avec le E-STOP. »" },
    { "q": "À quelle hauteur accroches-tu le câble électrique sur le mur ?",
      "o": ["Par terre", "À hauteur de poitrine (4 à 5 pieds)", "Au plafond", "À 10 pieds"], "a": 1,
      "e": "« ...accrocher le câble électrique au mur au niveau de la poitrine (4 à 5 pieds du banc). »" },
    { "q": "Où mets-tu un whip check (attache de sécurité) ?",
      "o": ["Juste au début du boyau", "À chaque joint", "Juste à la fin", "Nulle part"], "a": 1,
      "e": "« Installer les dispositifs de retenue (whip check) à chaque joint. »" },
    { "t": "trou", "q": "Une attention particulière doit être portée sur les boyaux tressés haute-température des compresseurs, qui atteignent ______.",
      "o": ["100 °F", "300 °F", "800 °F", "1200 °F"], "a": 2,
      "e": "« ...une attention particulière doit être portée sur les boyaux tressés haute-température (800 degrés F) des compresseurs. »" },
    { "q": "Que fais-tu aux boyaux à air avant de les brancher ?",
      "o": ["Je les mouille", "Je les souffle", "Je les huile", "Je les chauffe"], "a": 1,
      "e": "« Souffler les boyaux à air avant connexion et installer les dispositifs de retenue (whip check) à chaque joint. »" },
    { "q": "Quelle distance minimale laisses-tu entre la barricade et le premier matériel ?",
      "o": ["1 mètre", "3 mètres (10 pieds)", "7 mètres", "15 mètres"], "a": 1,
      "e": "« Laisser une distance d'au moins 3 mètres (10 pieds) entre la barricade à l'entrée du chantier et les premières pièces de matériel. »" },
    { "q": "Quelle distance minimale gardes-tu entre le mât et la console ?",
      "o": ["0,5 mètre", "1 mètre", "1,5 mètre", "3 mètres"], "a": 2,
      "e": "« ...respecter obligatoirement une distance minimale de 1,5 mètre entre le mât et la console. »" },
    { "q": "Une pièce bouge. Où ne dois-tu jamais te tenir ?",
      "o": ["Derrière la console", "Entre la console et le mât, ou à moins de 1,5 m du mât", "Dans le panier", "Près de la barricade"], "a": 1,
      "e": "« Aucun travailleur ne doit se placer entre la console et le mât, ni à moins de 1,5 mètre du mât de tous les côtés. »" },
    { "q": "Quand tu défonces un trou, comment pousses-tu ?",
      "o": ["Avec une rotation rapide", "Sans rotation, avec 1 tige de plus que le défoncement", "En reculant", "Avec 2 tiges de plus"], "a": 1,
      "e": "« Lors du défoncement de trous, pousser SANS ROTATION 1 tige de plus que la longueur du défoncement. »" },
    { "q": "À partir de quelle profondeur ajoutes-tu un 2e travailleur ?",
      "o": ["50 pieds", "100 pieds", "200 pieds et plus", "500 pieds"], "a": 2,
      "e": "« Privilégier la présence d'un 2e travailleur pour le forage et l'arrachement des tiges des trous de 200 pieds et plus. »" },
    { "t": "vf", "q": "Il faut respecter une distance de 7 mètres entre la foreuse et le surcompresseur.", "vrai": true,
      "e": "« Respecter une distance de 7 mètres entre la foreuse et le surcompresseur. »" },
    { "q": "Pour quel diamètre de trou faut-il le chariot (ou la cloche et la chaîne) ?",
      "o": ["Moins de 3 po", "Plus de 6 ½ po", "Exactement 4 po", "Tous les diamètres"], "a": 1,
      "e": "« Pour les trous de plus de 6 ½ po. de diamètre, utiliser le chariot de transport ou la cloche et la chaîne. »" }
  ],
  "pro-op-ith-005": [
    { "t": "vf", "q": "Il est strictement interdit à un employé d'entrer dans la monterie de 30 pouces pour récupérer quoi que ce soit.", "vrai": true,
      "e": "« Il est strictement interdit à un employé d'entrer dans la monterie de 30 pouces pour récupérer quoi que ce soit. »" },
    { "q": "Le couvert est enlevé. Comment doivent être les travailleurs près du trou ?",
      "o": ["À 5 mètres", "Attachés (longe courte, ou harnais + bloc rétractable)", "Assis", "Avec juste un casque"], "a": 1,
      "e": "« ...les employés travaillant près de la monterie doivent être attachés en tout temps au moyen d'une longe restrictive ajustable qui empêche l'accès au trou ou avec un harnais et un bloc rétractable. »" },
    { "t": "trou", "q": "La console doit être à ______ du mât et protéger les travailleurs des projections de roches.",
      "o": ["0,5 m", "1 m", "1,5 m", "3 m"], "a": 2,
      "e": "« La console doit être à 1,5 m du mât et protéger les travailleurs des projections de roches. »" },
    { "q": "Quelle distance faut-il garder entre la foreuse et le surcompresseur ?",
      "o": ["3 m", "5 m", "7 m", "10 m"], "a": 2,
      "e": "« Maintenir une distance de 7 mètres entre la foreuse et le surcompresseur. »" },
    { "q": "À partir de quelle longueur de trou faut-il poser un centralisateur ?",
      "o": ["Plus de 20 pieds", "Plus de 40 pieds", "Plus de 100 pieds", "Jamais"], "a": 1,
      "e": "« Installer un centralisateur pour stabiliser les tiges lorsque les monteries sont planifiées pour plus de 40 pieds de forage. »" },
    { "q": "Les boyaux des compresseurs sont chauds. Quelle est leur température ?",
      "o": ["200 °F", "500 °F", "800 °F", "1500 °F"], "a": 2,
      "e": "« ...les boyaux tressés haute-température (800 degrés F) des compresseurs. »" }  ],
  "pro-op-ith-006": [
    { "q": "Le câble est encore sous tension. Avec quoi tu le déplaces ?",
      "o": ["Le crochet en plastique", "Une pince", "Tes mains", "Une corde"], "a": 0,
      "e": "« Si l'extension doit être manipulée sous tension, utiliser le crochet de plastique. »" },
    { "t": "vf", "q": "Le câble électrique doit être accroché au mur au niveau de la poitrine, soit à 4 à 5 pieds du banc.", "vrai": true,
      "e": "« Accrocher le câble électrique au mur au niveau de la poitrine (4 à 5 pieds du banc). »" },
    { "q": "Où tu poses un whip check sur les boyaux d'air ?",
      "o": ["À chaque joint", "Juste au compresseur", "Au bout du boyau", "Nulle part"], "a": 0,
      "e": "« Installer les dispositifs de retenue (whip check) à chaque joint des boyaux d'air. »" },
    { "q": "Où tu accroches les boyaux par rapport au câble électrique ?",
      "o": ["Au-dessus du câble", "Sous le câble électrique", "Enroulés autour du câble", "Au sol"], "a": 1,
      "e": "« Suspendre tous les boyaux en-dessous du câble électrique pour éliminer tout contact avec roches branlantes ou équipement minier. »" },
    { "q": "Quelle distance minimale il faut entre la barricade et le premier matériel ?",
      "o": ["1 mètre", "3 mètres (10 pieds)", "7 mètres", "15 mètres"], "a": 1,
      "e": "« Laisser une distance d'au moins 3 mètres (10 pieds) entre la barricade à l'entrée du chantier et les premières pièces de matériel. »" },
    { "t": "trou", "q": "Pour suspendre et positionner la tête V-30, utiliser une chaîne de ______.",
      "o": ["Grade 30", "Grade 70", "Grade 80 (7100 lbs)", "N'importe laquelle"], "a": 2,
      "e": "« Utiliser une chaîne de grade 80 (7100 lbs) pour suspendre et positionner la tête V-30. »" },
    { "t": "multi", "q": "Coche les affirmations VRAIES sur la manipulation des tiges et les bris de tige lors de l'alésage V-30.",
      "o": ["Relever et arrêter la boîte de vitesse et mettre la foreuse au point mort avant d'installer ou d'enlever les tiges.", "En cas de bris de tige, arrêter le forage, couper l'électricité et l'air comprimé, puis barricader l'accès.", "Après un bris de tige, on peut poursuivre le forage sans attendre l'arrivée du contremaître.", "Interdire à toute personne de circuler en avant de la foreuse pendant le forage.", "Ne jamais interchanger les boyaux basse et haute pression."], "a": [3, 0, 4, 1],
      "e": "« Pour installer ou enlever les tiges, relever et arrêter la boîte de vitesse et placer la foreuse au point mort avant toute manipulation. » ; « En cas de bris de tige, arrêter immédiatement le forage, fermer l'interrupteur électrique et l'alimentation en air comprimé, puis barricader l'accès. » ; « Pendant le forage, interdire à toute personne de circuler en avant de la foreuse. » ; « Ne jamais interchanger les boyaux basse et haute pression [...]. » L'option fausse contredit : « ...aucun travail de forage n'est permis avant [l'arrivée du contremaître]. »" },
  ],
  "pro-op-ith-007": [
    { "t": "trou", "q": "Positionner la commande de forage à ______ du point de forage pour être à l'abri des projections de roche.",
      "o": ["1 m", "3 m", "5 m", "15 m"], "a": 2,
      "e": "« Positionner la commande de forage à 5 mètres du point de forage pour être à l'abri des projections de roche. »" },
    { "t": "vf", "q": "Il faut maintenir une distance de 7 mètres entre la foreuse et le compresseur.", "vrai": true,
      "e": "« Maintenir une distance de 7 mètres entre la foreuse et le compresseur. »" },
    { "q": "Avec quoi touche-t-on un câble électrique sous tension ?",
      "o": ["Le crochet en plastique", "Une clé", "Les mains avec des gants", "Une pince"], "a": 0,
      "e": "« Manipuler toute extension de câble sous tension uniquement avec le crochet de plastique. »" },
    { "q": "La monterie fait plus de 40 pieds. Tous les combien pose-t-on un centralisateur ?",
      "o": ["Tous les 20 pieds", "Tous les 40 pieds", "Tous les 100 pieds", "Un seul suffit"], "a": 1,
      "e": "« Installer des centralisateurs aux 40 pieds lorsque la monterie dépasse 40 pieds pour stabiliser les tiges. »" },
  ],
  "pro-op-ith-008": [
    { "t": "vf", "q": "Il est strictement défendu à quiconque, et en tout temps, de descendre au fond de la monterie pour dégager ou récupérer les pièces métalliques, les outils, les taillants ou tout autre équipement.", "vrai": true,
      "e": "« Il est strictement défendu à quiconque, et ce en tout temps, de descendre au fond de la monterie pour dégager ou récupérer les pièces métalliques, les outils, les taillants ou tout autre équipement. »" },
    { "q": "Que dois-tu faire AVANT d'enlever le couvercle de la monterie ?",
      "o": ["Couper l'air", "Mettre un harnais et t'attacher à un ancrage ou à une ligne de vie", "Appeler le fournisseur", "Rien"], "a": 1,
      "e": "« Porter un harnais et s'attacher à un ancrage ou à une ligne de vie avant d'enlever le couvercle de la monterie. »" },
    { "t": "trou", "q": "Récupérer le taillant ou les pièces brisées au fond de la monterie uniquement à l'aide du ______ conçu à cet effet.",
      "o": ["À la main", "Avec le racloir de monterie (raise scraper)", "Avec un aimant", "Avec une corde"], "a": 1,
      "e": "« Récupérer le taillant ou les pièces brisées au fond de la monterie uniquement à l'aide du racloir de monterie (raise scraper) conçu à cet effet. »" },
    { "q": "Que faut-il sortir de la monterie avant de commencer la récupération ?",
      "o": ["Le couvercle", "La V-30 (on enlève les tiges de forage)", "Le racloir", "Rien"], "a": 1,
      "e": "« Sortir la V-30 de la monterie en enlevant les tiges de forage avant d'entreprendre la récupération du taillant brisé. »" },
    { "t": "multi", "q": "Coche les affirmations VRAIES sur la protection antichute et le suivi après un bris de taillant.",
      "o": ["Demeurer attaché à un ancrage ou à une ligne de vie tant que le couvercle est retiré.", "Remettre le couvercle sur la monterie entre les manipulations du racloir.", "Une fois le couvercle retiré, on peut détacher son cordon pour travailler plus librement.", "Avertir le superviseur de la mine si un taillant brisé demeure et que l'accès au niveau inférieur est impossible.", "Couvrir la monterie de façon sécuritaire une fois les travaux terminés."], "a": [4, 0, 3, 1],
      "e": "« Demeurer attaché à un ancrage ou à une ligne de vie durant tous les travaux de manipulation du couvercle et tant que le couvercle est retiré de la monterie. » ; « Remettre le couvercle sur la monterie entre les manipulations du racloir et couvrir la monterie de façon sécuritaire une fois les travaux terminés. » ; « Avertir le superviseur de la mine lorsqu'un taillant brisé demeure présent et que l'accès au niveau inférieur n'est pas possible pour le récupérer. » L'option fausse contredit l'obligation de rester attaché tant que le couvercle est retiré." }  ],
  "pro-op-ith-012": [
    { "t": "trou", "q": "Installer le système de commande à distance à un minimum de ______ entre le foreur et le trou à forer.",
      "o": ["10 pieds", "50 pieds (15 mètres)", "100 pieds", "5 mètres"], "a": 1,
      "e": "« Installer le système de commande à distance à un minimum de 50' (15 mètres) entre le foreur et le trou à forer. »" },
    { "q": "Quand faut-il signer la procédure sur les barricades ?",
      "o": ["Une fois par mois", "À chaque début de quart, avant de forer", "Jamais", "Une seule fois"], "a": 1,
      "e": "« ...la faire signer par le foreur ayant visité ces endroits avant le début du forage, au début de chaque quart. »" },
    { "q": "Pendant le forage à distance, comment doit être la zone de forage ?",
      "o": ["Gardée par un surveillant", "Vide, personne dedans", "Éclairée seulement", "Peu importe"], "a": 1,
      "e": "« S'assurer que la zone de forage est évacuée et que la foreuse est exécutée au moyen d'un dispositif de commande à distance sous surveillance. »" },
    { "t": "vf", "q": "Lors du déblocage d'un trou dynamité avec amex (ANFO), on met de l'eau dans les tiges de forage pour diminuer le risque d'explosion.", "vrai": true,
      "e": "« Lors du déblocage d'un trou dynamité avec amex (ANFO), mettre de l'eau dans les tiges de forage pour diminuer le risque d'explosion. »" },
    { "q": "Quel article de la loi parle du forage à distance ?",
      "o": ["Article 100", "Article 440", "Article 250", "Article 12"], "a": 1,
      "e": "« Article 440 : des trous peuvent être forés à des distances moindres [...] pourvu que le forage soit exécuté au moyen d'un dispositif de commande à distance sous surveillance et que la zone de forage soit évacuée. »" },
    { "t": "multi", "q": "Coche les affirmations VRAIES sur le positionnement et la signalisation lors du forage à distance.",
      "o": ["Se positionner vers la sortie en s'assurant que rien ne bloque l'accès.", "Ne jamais se tenir dans la ligne de sautage.", "Barricader tous les accès aux lieux de forage (clôture) ou les faire garder par un travailleur.", "Le foreur peut quitter la zone sécuritaire pendant que le forage se poursuit.", "Apposer sur la clôture une signalisation (ACCÈS INTERDIT, FORAGE EN COURS, FORAGE À DISTANCE)."], "a": [4, 0, 2, 1],
      "e": "« Le foreur et l'aide-foreur doivent se positionner vers la sortie en s'assurant que rien ne bloque l'accès. » ; « Ne jamais se tenir dans la ligne de sautage. » ; « Barricader tous les accès aux lieux de forage par une clôture (selon les exigences du client) ou les faire garder par un travailleur. » ; « Apposer sur la clôture une signalisation indiquant le type de travaux (ACCÈS INTERDIT, FORAGE EN COURS, FORAGE À DISTANCE). » L'option fausse contredit : « Le foreur et l'aide-foreur doivent rester en tout temps dans la zone sécuritaire pendant le forage. »" }
  ],
  "pro-op-ith-014": [
    { "q": "Quand est-il interdit de mettre ton corps sous les tables ?",
      "o": ["Ce n'est jamais interdit", "Si le marteau n'est pas monté et la slip-plate est ouverte", "Seulement la nuit", "Quand la foreuse tourne"], "a": 1,
      "e": "« Il est interdit à qui que ce soit de positionner toute partie de son corps sous les tables si le marteau n'est pas monté au-delà des tables et que la slip plate n'est pas fermée. »" },
    { "t": "trou", "q": "Une distance minimum de ______ entre le mât et la console doit obligatoirement être respectée.",
      "o": ["0,5 m", "1 m", "1,5 m", "3 m"], "a": 2,
      "e": "« Une distance minimum de 1,5 mètre entre le mât et la console doit obligatoirement être respectée. »" },
    { "q": "Une pièce bouge. Où ne dois-tu pas te placer ?",
      "o": ["Derrière la console", "Entre la console et le mât, ou à moins de 1,5 m du mât", "Près du tubage", "Au sol"], "a": 1,
      "e": "« Quand une pièce est en mouvement, aucun travailleur ne peut se placer entre la console et le mât, ni à moins de 1,5 mètre du mât de tous les côtés. »" },
    { "q": "Avant de nettoyer, que fais-tu du marteau et de la slip-plate ?",
      "o": ["Rien", "Monter le marteau au-dessus des tables, fermer la slip-plate, poser la bit dessus et fermer l'interrupteur", "Baisser le marteau", "Ouvrir la slip-plate"], "a": 1,
      "e": "« Avant de procéder au nettoyage, monter le marteau au-delà des tables, fermer la slip-plate ou les jaws, appuyer la bit sur la slip-plate ou les jaws, et fermer l'interrupteur de la foreuse. »" },
    { "t": "vf", "q": "Le marteau doit être vissé au saver sub au complet, sans le serrer avec force.", "vrai": true,
      "e": "« Visser le marteau au saver sub au complet sans le serrer avec force. »" },
    { "q": "Pourquoi la longueur du tubage qui dépasse peut-elle changer ?",
      "o": ["À cause du vent", "À cause de la boue de forage qui s'accumule", "À cause du gel", "Elle ne change pas"], "a": 1,
      "e": "« La longueur de dépassement peut changer pendant le forage à cause de l'accumulation de boue de forage. »" },
    { "q": "Avant d'installer le tubage, quelle procédure suis-tu et que vérifies-tu ?",
      "o": ["Aucune", "La procédure PRO-OP-ITH-004, et vérifier que la foreuse est bien alignée selon les plans", "Seulement le cadenassage", "PRO-MEC-011"], "a": 1,
      "e": "« Respecter au préalable la procédure de forage PRO-OP-ITH-004 et s'assurer que la foreuse est bien alignée selon les plans de forage avant l'installation du tubage. »" },
    { "q": "Au 2e forage, sur quelle longueur le casing entre-t-il dans le roc dur ?",
      "o": ["1 pouce", "1 pied", "3 pieds", "Il n'entre pas dans le roc"], "a": 1,
      "e": "« Profondeur du 2e forage dans le roc solide : 1 pied. »" }
  ],
  "pro-op-ith-016": [
    { "t": "vf", "q": "Le Driver Sub doit être installé sur les marteaux en tout temps lors de la manipulation.", "vrai": true,
      "e": "« Le Driver Sub doit être installé sur les marteaux en tout temps lors de la manipulation. »" },
    { "q": "Comment poses-tu les marteaux de 3 po et 4 po ?",
      "o": ["Avec le chariot seulement", "À la main sur le Gear Box, comme les tiges", "Avec la grue", "On ne les pose pas"], "a": 1,
      "e": "« Les marteaux de 3'' et 4'' doivent être installés sur le Gear Box manuellement de la même manière que les tiges de forage. Le travailleur appliquera ensuite cette procédure à partir du point #8. »" },
    { "q": "Quand enlèves-tu la chaîne de sûreté du chariot ?",
      "o": ["Au début", "Seulement quand le marteau est vissé et accoté dans le saver sub", "Jamais", "Avant de visser"], "a": 1,
      "e": "« Retirer la chaîne de sûreté du chariot seulement après avoir vissé et accoté le marteau dans le saver sub. »" },
    { "q": "Combien pèse le marteau de 3 po ?",
      "o": ["60 lbs", "89 lbs", "211 lbs", "150 lbs"], "a": 0,
      "e": "« Poids du marteau 3'' : 60 lbs. »" },
    { "t": "trou", "q": "Le marteau de 6'' pèse ______.",
      "o": ["89 lbs", "150 lbs", "211 lbs", "60 lbs"], "a": 2,
      "e": "« Poids du marteau 6'' : 211 lbs. »" },
    { "q": "À la fin, de combien dévisses-tu le marteau ?",
      "o": ["1 tour seulement", "5 tours", "En entier", "Un demi-tour"], "a": 0,
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
      { "q": "Pendant que tu serres les boulons, sur quoi gardes-tu de la tension, et avec quel outil ?", "d": "difficile",
        "o": ["Rien de spécial", "Une tension sur les lockwashers, avec une clé ou un box", "Une tension sur les boyaux, avec un wescot", "Le mât à l'horizontale"], "a": 1,
        "e": "« Serrer tous les boulons en maintenant une tension sur les lockwashers à l'aide de l'outil adéquat (clé ou box). »" },
      { "q": "Avant de lever une pièce du centralisateur, que dois-tu faire ? (une pièce pèse 46 livres)", "d": "difficile",
        "o": ["Travailler seul mais vite", "Être deux ET bien se placer avant de la prendre", "Porter un harnais antichute", "Utiliser un pipe wrench"], "a": 1,
        "e": "« Toujours installer le centralisateur à deux travailleurs. » et « Se positionner [...] avant de manipuler les pièces du centralisateur, qui pèsent 46 livres chacune. »" }
    ],
    "pro-mec-011": [
      { "q": "Pourquoi faut-il remettre le couvercle en plastique à la fin ?", "d": "difficile",
        "o": ["Pour faire beau", "Parce que la surchauffe du bell housing et du couvercle a déjà causé un début d'incendie", "Pour garder la poussière dehors", "Ce n'est pas obligatoire"], "a": 1,
        "e": "« Remettre le couvercle de plastique à la fin pour rétablir la protection (mesure issue d'un début d'incendie causé par surchauffe du bell housing et du couvercle). »" },
      { "q": "La coupling est collée et ne sort pas. Que fais-tu ?", "d": "difficile",
        "o": ["Forcer avec la pompe", "Enlever le bell housing, puis frapper sur la pry bar sans abîmer le shaft du moteur électrique", "Chauffer le shaft au chalumeau", "Laisser tomber la réparation"], "a": 1,
        "e": "« Si la coupling est collée, retirer le bell housing puis frapper sur la pry bar avec une masse ou un marteau, en prenant garde de ne pas endommager le shaft du moteur électrique. »" }
    ],
    "pro-op-ith-002": [
    ],
    "pro-op-ith-003": [
      { "q": "On déplace la foreuse sans remorque. Quand est-ce permis ?", "d": "difficile",
        "o": ["Partout, même dans la rampe", "Sur du plat, sur une courte distance, à basse vitesse - jamais dans la rampe", "Seulement en descendant la rampe", "Jamais"], "a": 1,
        "e": "« Ne déplacer la foreuse sans remorque qu'à plat, sur de courtes distances et à basse vitesse; il est interdit de la déplacer sans remorque dans la rampe. »" },
      { "q": "Le déplacement est fini. Que fait-on du traîneau ?", "d": "difficile",
        "o": ["On l'attache au mur", "On le laisse par terre et on met un ruban jaune", "On le suspend au mât", "On le remonte sur la remorque"], "a": 1,
        "e": "« Ne jamais attacher le traîneau au mur après le déplacement; le laisser par terre et le signaler avec un ruban jaune. »" }
    ],
    "pro-op-ith-004": [
    ],
    "pro-op-ith-005": [
    ],
    "pro-op-ith-006": [
      { "q": "À quoi sert le raccord entre la V-30 et la tige ?", "d": "difficile",
        "o": ["À serrer le plus fort possible", "À éviter le serrage pour dévisser facile", "À rien, c'est décoratif", "À ajouter de l'eau"], "a": 1,
        "e": "« Utiliser obligatoirement le raccord situé entre la V-30 et la tige pour empêcher le serrage et permettre le désaccouplement facile. »" },
      { "q": "L'alésage débouche. Comment tu protèges les travailleurs du trou ?", "d": "difficile",
        "o": ["Tu ne fais rien", "Tu laisses un pilier de couronne, ou tu poses une plaque d'acier marquée sur le trou", "Tu tends une corde", "Tu remplis le trou d'eau"], "a": 1,
        "e": "« Protéger les travailleurs contre le trou en laissant un pilier de couronne en place ou en installant une plaque d'acier identifiée sur le trou. »" }
    ],
    "pro-op-ith-007": [
      { "q": "Quelle hauteur faut-il entre le plancher et le toit ? Et si c'est plus de 14 pieds ?", "d": "difficile",
        "o": ["Pas de règle", "12 à 14 pieds; si c'est plus, on monte le plancher avec de la roche cassée", "Juste 6 pieds", "Au moins 30 pieds"], "a": 1,
        "e": "« Maintenir une hauteur plancher-toit entre 12 et 14 pieds (max 4,3 m); au-delà de 4,3 m (14 pi), relever le plancher avec de la roche abattue. »" }    ],
    "pro-op-ith-008": [
],
    "pro-op-ith-012": [
],
    "pro-op-ith-014": [
],
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
      { "q": "Quand tu enlèves la pompe, comment la tiens-tu et pourquoi ?", "d": "difficile",
        "o": ["Par en dessous, à deux mains", "Avec les mains sur les boyaux, car seuls les boyaux et la sangle la retiennent", "Avec un palan seulement", "On la laisse tomber"], "a": 1,
        "e": "« Lors du retrait de la pompe, la retenir avec les mains sur les boyaux car elle n'est plus tenue que par les boyaux hydrauliques et la sangle. »" }    ],
    "pro-op-ith-002": [
],
    "pro-op-ith-003": [
      { "q": "Pendant l'embarquement de la foreuse, où doit se placer l'opérateur ?", "d": "difficile",
        "o": ["À côté de la remorque", "Dans le panier, avec la chaîne garde-corps en place", "Au sol, pour guider", "Dans le véhicule"], "a": 1,
        "e": "« Lors de l'embarquement de la foreuse, l'opérateur doit toujours se placer à l'intérieur du panier et mettre la chaîne garde-corps. »" }
    ],
    "pro-op-ith-004": [
    ],
    "pro-op-ith-005": [
      { "q": "Quelle est la largeur du trou fini (la monterie) ?", "d": "difficile",
        "o": ["6½ pouces", "10 pouces", "30 pouces", "40 pouces"], "a": 2,
        "e": "« Diamètre du trou final (monterie) : 30 pouces. »" }
    ],
    "pro-op-ith-006": [
    ],
    "pro-op-ith-007": [
      { "q": "Une tige casse. Que fait-on de la tige cassée ?", "d": "difficile",
        "o": ["On la jette", "On met une étiquette dessus, on la renvoie au fournisseur et on remplit un rapport", "On la répare", "On la réutilise"], "a": 1,
        "e": "« Après un bris de tige, retirer et vérifier toutes les autres tiges; étiqueter et retourner la tige brisée au fournisseur; remplir un rapport d'incident. »" }
    ],
    "pro-op-ith-008": [
    ],
    "pro-op-ith-012": [
],
    "pro-op-ith-014": [
    ],
    "pro-op-ith-016": [
    ]
  };
  var Q = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(HARD2).forEach(function (id) {
    Q[id] = (Q[id] || []).concat(HARD2[id]);
  });
})();
