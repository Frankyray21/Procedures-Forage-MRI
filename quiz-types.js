/* ===========================================================================
   QUIZ — NOUVEAUX TYPES DE QUESTIONS (par procédure). Fusion dans QUIZ_PROC.
   Types :
   - { t:'vf', q, vrai:true|false, e }       → vrai ou faux
   - { t:'multi', q, o:[...], a:[indices], e } → cocher les affirmations vraies
   - { t:'ordre', q, o:[étapes DANS L'ORDRE CORRECT], e } → remettre en ordre
     (l'application mélange l'affichage ; o reste l'ordre officiel du PDF)
   Chaque question s'appuie sur un fait précis de la procédure officielle et
   porte sa référence (champ e). Générées à partir du texte des PDF puis
   vérifiées contre la source.
   =========================================================================== */
(function () {
  var T = {
    "centralisateur": [
      { "t": "vf", "q": "Le centralisateur de tige s'installe sur l'extrémité femelle de la tige.", "vrai": true,
        "e": "« Le centralisateur de tige est installé sur l'extrémité femelle de la tige conformément au dessin ci-joint »" },
      { "t": "vf", "q": "Le montage du centralisateur exige 12 boulons ½ de 2 pouces de long.", "vrai": false,
        "e": "« 12 boulons ½ X 1'' 3/8 de long » — les boulons requis mesurent 1 pouce 3/8, et non 2 pouces." },
      { "t": "vf", "q": "Lors du montage, vous devez aligner l'accouplement du haut d'une des deux pièces du centralisateur sur les coches de slip plate de la tige.", "vrai": false,
        "e": "« Aligner l'accouplement du bas d'une des deux pièces du centralisateur sur les coches de slip plate de la tige » — c'est l'accouplement du bas, pas celui du haut." },
      { "t": "multi", "q": "Sélectionnez les affirmations VRAIES concernant l'installation du centralisateur.",
        "o": ["Le centralisateur sert notamment à maintenir le V-30 correctement aligné.", "La tige doit être mise sur le train de tige seulement après le montage du centralisateur.", "Lors du démantèlement, vous devez faire la procédure contraire au montage.", "Deux clés de ⅝ suffisent comme outils pour effectuer le montage.", "Un ratchet ou un impact peut être utilisé avec le box ¾ pour le montage."], "a": [0, 2, 4],
        "e": "« Le centralisateur de tiges est principalement utilisé pour le forage de trous de V-30 pour empêcher l'oscillement des tiges et pour maintenir le V-30 correctement alignée » ; « Faites la procédure contraire lors du démantèlement du centralisateur. » ; « 2 Clés ¾ ou, 1 clé ¾ et 1 box ¾ avec 1 ratchet ou 1 impact » (les clés sont des ¾, et la tige doit être mise sur le train de tige AVANT d'installer le centralisateur)." },
      { "t": "ordre", "q": "Remettez ces étapes de l'installation du centralisateur dans le bon ordre.",
        "o": ["Mettre la tige sur le train de tige", "Aligner l'accouplement du bas d'une des deux pièces sur les coches de slip plate de la tige", "Rapprocher l'autre pièce et l'aligner avec celle déjà maintenue en place", "Mettre les boulons dans les trous prévus à cet effet", "Serrer tous les boulons avec l'outil adéquat (clé ou box)"],
        "e": "Étapes 3 à 11 de la procédure : « Avant d'installer le centralisateur, la tige doit être mise sur le train de tige » … « Serrer tous les boulons en maintenant une tension sur les lockwashers à l'aide de l'outil adéquat (clé ou box) »" }
    ],
    "dr600-op-002": [
      { "t": "vf", "q": "Pendant toute la durée des opérations de pliage et de dépliage, la foreuse doit rester connectée au 600 volts.", "vrai": true,
        "e": "« LA FOREUSE DOIT RESTER CONNECTÉE AU 600 VOLTS POUR TOUTE LA DURÉE DES OPÉRATIONS DE PLIAGE-DÉPLIAGE »" },
      { "t": "vf", "q": "Lors de l'utilisation des tractions en direction opposée en mode diesel, la position du potentiomètre ne doit pas dépasser les trois quarts pour éviter de faire caler le moteur.", "vrai": false,
        "e": "« LORS DE L'UTILISATION DES TRACTIONS EN DIRECTION OPPOSÉE SUR MODE DIESEL, LA POSITION DU POTENTIOMÈTRE NE DOIT PAS DÉPASSER LA MOITIÉ POUR ÉVITER DE FAIRE CALER LE MOTEUR »" },
      { "t": "vf", "q": "Lors des déplacements de la foreuse, vous devez rester immobile et toujours vous tenir à plus de 5 mètres de la machine.", "vrai": false,
        "e": "« LORS DES DÉPLACEMENTS, L'OPÉRATEUR DOIT : 1- RESTER IMMOBILE; 2- TOUJOURS SE TENIR À PLUS DE 3 MÈTRES DE LA MACHINE »" },
      { "t": "multi", "q": "Sélectionnez les affirmations VRAIES concernant le remorquage de la DR-600-MU.",
        "o": ["Le remorquage est favorisé à partir du côté moteur de la foreuse.", "Les chaînes de sécurité doivent être reliées à la foreuse et à l'équipement de remorquage en « X ».", "Un objet (ex. chaudière vide, bloc de bois, fourches d'un tracteur) doit être placé sous la tongue.", "Si le diesel est hors-fonction et le 600 volts indisponible, les cales de roues sont laissées au jugement du foreur.", "Le câble de l'écran doit être enroulé sur le réservoir hydraulique et sécurisé avec des sangles."], "a": [0, 1, 2],
        "e": "« Nous favorisons le remorquage à partir du côté moteur » ; « les chaînes de sécurité à la foreuse et à l'équipement de remorquage EN ''X'' » ; « un objet (ex; une chaudière vide, un bloc de bois ou les fourches d'un tracteur) doit être placé sous la tongue pour la soutenir »" },
      { "t": "ordre", "q": "Remettez ces étapes du repliage de la DR-600-MU dans le bon ordre.",
        "o": ["Utiliser « ROT TABLE » pour ramener la table parallèle à la machine", "Utiliser « LONGITUDINALE » pour rétracter les extensions de table", "Utiliser « DIP » pour positionner le mât à la verticale", "Utiliser « MAST TILT UP » pour rabattre la tour sur la table", "Utiliser « ARM DOWN » pour descendre la tour sur le pilier d'assise"],
        "e": "Étapes 1, 2, 3, 6 et 8 de la procédure de repliage — « les étapes du repliage demeurent les mêmes et doivent être effectuées dans l'ordre prescrit par cette procédure »" }
    ],
    "pro-dd-st-001": [
      { "t": "vf", "q": "Avant de monter le core barrel complet, vous devez vérifier l'usure du reaming shell avec la jauge à shell et le remplacer au besoin.", "vrai": true,
        "e": "« Il est important de vérifier le reaming shell avec la jauge à shell pour vérifier l'usure et remplacer si nécessaire. » (étape 2)" },
      { "t": "vf", "q": "À l'étape 9, vous retirez le bushing standard pour installer le bushing modifié sur la tige de forage avant de la revisser sur le core barrel.", "vrai": false,
        "e": "C'est l'inverse : « retirer le bushing modifié et mettre le bushing standard sur la tige de forage, revisser la tige sur le core barrel » (étape 9)" },
      { "t": "vf", "q": "Vous forez au complet le core barrel de 1,5 m et la tige de 3 m afin d'avoir l'espace nécessaire pour installer le core barrel de 3 m.", "vrai": true,
        "e": "« Forer au complet le core barrel de 1,5 mètre et la tige de 3 mètres pour s'assurer d'avoir l'espace nécessaire pour mettre le core barrel de 3 mètres. » (étape 5)" },
      { "t": "multi", "q": "Sélectionnez toutes les affirmations vraies au sujet de la procédure PRO-DD-ST-001.",
        "o": ["Le core barrel complet comprend le reaming shell, le core barrel, le locking adapter et le locking coupling.", "Le reaming shell requis est de 6 pouces.", "Pour vous mettre en 6 mètres, vous devez forer 2 tiges de 3 mètres.", "Le tube de 1,5 m se met dans le core barrel sans la backend.", "À l'étape 8, vous avancez la tête de la foreuse jusque sous le joint de la tige de forage."], "a": [0, 1, 2],
        "e": "« Mettre le core barrel complet (reaming shell de 6 pouces, core barrel de 1,5 m, locking adapter et locking coupling) » (étape 2) ; « Forer 2 tiges de 3 mètres si vous voulez vous mettre en 6 mètres » (étape 5). Les fausses contredisent : « Mettre le tube de 1,5m dans le core barrel avec la backend » (étape 3) et « Reculer la tête de la foreuse au-dessus du joint de la tige de forage et du core barrel » (étape 8)." },
      { "t": "ordre", "q": "Remettez ces étapes de la mise en place du core barrel dans le trou dans le bon ordre.",
        "o": ["Mettre le core barrel complet dans la tête et le clam de la foreuse", "Mettre la tige de forage de 3 m avec la water swivel", "Reculer la tête de la foreuse au-dessus du joint de la tige et du core barrel", "Dévisser la tige, remplacer le bushing modifié par le standard, puis revisser la tige", "Insérer le core barrel jusqu'au fond du trou, hors du clam"],
        "e": "Étapes 6 à 10 de la procédure : « Reculer la tête de la foreuse au-dessus du joint de la tige de forage et du core barrel » (étape 8), puis « Insérer le core barrel à l'intérieur du trou jusqu'au fond pour qu'il ne soit plus à l'intérieur du clam » (étape 10)." }
    ],
    "pro-dd-st-002": [
      { "t": "vf", "q": "Lorsque la carotte est coincée dans le core case, il faut insérer le core knocker sur le bout du core case et du tube, puis frapper sur le percuteur avec le marteau ou une petite masse.", "vrai": true,
        "e": "« Lorsque que la carotte est coincée dans le core case, insérer le core knocker sur le bout du core case et le tube. Frapper sur le percuteur avec le marteau ou une petite masse, ceci empêche les éclats de roches. »" },
      { "t": "vf", "q": "Quand le tube est bloqué loin du bout, il faut insérer une tige d'acier de trois pieds dans le tube, puis glisser l'anneau sur le tube et frapper dessus jusqu'au déblocage.", "vrai": false,
        "e": "« Quand le tube est bloqué loin du bout du tube, insérer une tige d'acier d'un pied dans le tube, glisser l'anneau sur le tube et frapper dessus jusqu'au déblocage » — la tige est d'un pied, pas de trois pieds." },
      { "t": "vf", "q": "Lorsqu'on doit casser la carotte à la fin d'une rangée, il faut la déposer au sol, puis la casser en frappant avec le marteau.", "vrai": false,
        "e": "« Lorsqu'on doit casser la carotte à la fin d'une rangée, mettre la carotte dans la rangée et la casser en frappant avec le marteau. » — on la met dans la rangée, pas au sol." },
      { "t": "multi", "q": "Sélectionnez les affirmations VRAIES concernant la procédure « Vider le tube carottier » (PRO-DD-ST-002).",
        "o": ["La backend se dévisse en utilisant les 2 clés à tube, puis se range dans un endroit sécuritaire.", "Le superviseur est responsable d'appliquer la procédure et le travailleur du bon déroulement.", "Avant de fermer une boîte pleine, les blocs de métrage doivent être bien placés et initialisés.", "Si le tube est bloqué, frapper directement dessus avec le marteau jusqu'à ce que la carotte tombe.", "Le bon fonctionnement du core spring se vérifie en insérant une tige de métal d'un pied."], "a": [0, 2],
        "e": "« Dévisser la backend en utilisant les 2 clés à tube, et le ranger dans un endroit sécuritaire. » ; « Avant de fermer une boite pleine toujours s'assurer que les blocs de métrage soient bien placés et initialisés ». À l'inverse : le travailleur applique la procédure et le superviseur voit au bon déroulement ; « Ne jamais frapper directement sur le tube avec le marteau pour ne pas le bosser » ; le core spring se vérifie « en utilisant un bout de carotte pour voir s'il la retient bien »." },
      { "t": "ordre", "q": "Remettez ces étapes de la procédure « Vider le tube carottier » dans le bon ordre.",
        "o": ["Dévisser la backend et la ranger dans un endroit sécuritaire", "Vider le tube sans jamais s'exposer les mains en avant du tube carottier", "Une fois le tube vide, vérifier le bon fonctionnement du core spring", "Graisser le core spring et le core case pour éviter l'usure prématurée", "Remettre la backend sur le tube et faire une bonne inspection visuelle"],
        "e": "Étapes 1, 2, 8, 9 et 10 de la procédure — « Après vérification, il est important de graisser le core spring et le core case pour éviter l'usure prématurée. »" }
    ],
    "pro-dd-st-003": [
      { "t": "vf", "q": "Lors de la construction d'un plancher secondaire, la dernière planche doit se rapprocher à au moins 3 pouces de la tour.", "vrai": true,
        "e": "« d. La dernière planche doit se rapprocher à au moins 3 pouces de la tour; »" },
      { "t": "vf", "q": "Sur le plancher secondaire, les 2 dernières planches les plus près de la foreuse doivent être clouées avec des clous de 6''.", "vrai": false,
        "e": "« Les 2 dernières planches les plus près de la foreuse doivent être vissées à l'aide de tire-fonds »" },
      { "t": "vf", "q": "Après la fin du démantèlement, la carte de ruban rouge installée doit indiquer le nom du foreur ayant effectué les travaux.", "vrai": false,
        "e": "« Installer une carte de ruban rouge avec les inscriptions suivantes : a. Trou non arpenté et non cimenté b. Date de l'installation c. Nom du superviseur »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies concernant la procédure PRO-DD-ST-003 :",
        "o": ["Pour un trou de 500 mètres et plus, un plancher complet de 16 X 32 est requis.", "Le plancher secondaire doit mesurer au minimum 32'' de largeur par 72'' de long.", "De 49 à 499 mètres, un plancher 10 X 8 sans support à tiges est suffisant.", "L'ajout de bois plané sur les planchers est toléré avec l'approbation du superviseur.", "Les cages servant à mettre la base au niveau sont faites de bouts coupés de 36''."], "a": [0, 1, 4],
        "e": "« 4- 500 mètres et plus: a. Plancher complet 16 X 32 » ; « Il devra avoir un minimum de 32'' de largeur par 72'' de long et un maximum de 12'' de hauteur » ; « couper des 8''X8'' ou 6''X6'' en bout de 36'' pour faire des cages selon la hauteur désirée »" },
      { "t": "ordre", "q": "Remettez ces étapes de la fabrication du plancher principal dans le bon ordre.",
        "o": ["Placer la structure de base dans le sens contraire du forage (selon l'azimut)", "Mettre la structure de base au niveau avec des cages et des coins de bois", "Disposer les 3''X8'' dans le sens contraire de la structure de base", "Clouer les extrémités des 3''X8'' sur un morceau de la structure de base", "Couper les 3''X8'' de manière carrée et égale avec le bord à l'entrée du plancher"],
        "e": "Étapes 1 à 6 de la procédure : « 1- Placer la structure de base […] 6- À l'entrée du plancher, les 3''X8'' doivent être coupés de manière carrée et égale avec le bord du plancher »" }
    ],
    "pro-dd-st-004": [
      { "t": "vf", "q": "Le loading chamber doit demeurer en place en tout temps jusqu'à la remontée du tube carottier au collet, afin d'éviter l'éjection du tube lors de l'interception d'une veine d'eau ou de gaz.", "vrai": true,
        "e": "« Il est obligatoire d'avoir le loading chambers en place en tout temps jusqu'à la remontée du tube au collet pour éviter l'éjection du tube lors d'interception de veine d'eau ou de gaz »" },
      { "t": "vf", "q": "La seule exception permettant à un travailleur de se trouver dans la zone de travail pendant un mouvement du treuil est la descente de l'overshot dans le trou.", "vrai": false,
        "e": "« aucun travailleur ne doit se trouver à l'intérieur de la zone de travail lorsqu'il y a mouvement du treuil. La porte d'accès à la zone de travail doit être fermée. exception : lors de changement de câble sur le treuil »" },
      { "t": "vf", "q": "Après son retrait, le loading chamber doit être déposé sur la table afin de garder le plancher libre de tout obstacle.", "vrai": false,
        "e": "« Retirer le loading chamber et le déposer entre les patins pour garder le plancher libre de tout obstacle »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies concernant la récupération du tube carottier avec le loading chamber.",
        "o": ["Une inspection visuelle du câble Wire line doit être faite avant sa manipulation.", "Les caoutchoucs du loading chamber se serrent avec une clé à pipe (pipe wrench).", "Avec un adaptateur court, la tige de forage doit être retirée au complet avec la tête de la foreuse.", "Les pinces à tube doivent être installées si le trou est ascendant.", "Quand l'overshot arrive au fond du trou, il faut purger la pression d'eau dans les tiges de forage."], "a": [0, 2, 4],
        "e": "« Une inspection visuelle doit être faite avant la manipulation du câble Wire line. » ; « Pour les adaptateurs courts, la tige de forage devra être retirée au complet avec la tête de la foreuse. » ; « Quand ''l'over shot'' est arrivé au fond du trou, purger la pression d'eau dans les tiges de forage »" },
      { "t": "ordre", "q": "Remettez ces étapes de la descente de l'overshot et de la remontée du tube carottier dans le bon ordre.",
        "o": ["Activer la pompe à l'eau", "Quand l'overshot arrive au fond du trou, purger la pression d'eau dans les tiges", "Desserrer le caoutchouc du loading chamber avec la clé à molette", "Évacuer la zone de travail", "Tirer le tube carottier avec la commande du treuil jusqu'au loading chamber"],
        "e": "Étapes 11 à 15 de la procédure : « 11- Activer la pompe à l'eau […] 15- Tiré le tube carottier en utilisant la commande du treuil jusqu'à l'arrivée de celui-ci dans le loading chamber »" }
    ],
    "pro-dd-st-006": [
      { "t": "vf", "q": "Pour dévisser la water swivel à l'aide de la foreuse, la water swivel doit être munie d'un adapteur long.", "vrai": true,
        "e": "« La water swivel doit être munies d'un adapteur long pour effectuer cette tâche »" },
      { "t": "vf", "q": "Avant de dévisser la water swivel à l'aide de la foreuse, vous devez mettre la transmission en deuxième vitesse.", "vrai": false,
        "e": "« Mettre la transmission en première vitesse et à l'aide de la foreuse dévisser la water swivel »" },
      { "t": "vf", "q": "Pour le forage en 6 mètres, le deuxième tube ne peut être sorti des tiges de forage qu'une fois que votre partenaire a traversé les portes avec l'autre tube.", "vrai": true,
        "e": "« Quand ce dernier a traversé les portes, le deuxième tube pourra être sorti des tiges de forage. »" },
      { "t": "multi", "q": "Concernant la récupération du tube carottier avec un overshot de surface, sélectionnez les affirmations vraies.",
        "o": ["Une inspection visuelle du câble Wire line doit être faite avant sa manipulation.", "Pour les adapteurs courts, la tige de forage doit être retirée au complet avec la tête de la foreuse.", "La zone de travail doit être évacuée seulement une fois l'overshot rendu au fond du trou.", "Vous devez remonter doucement au début pour vous assurer que le tube carottier est bien accroché.", "Le retrait d'un câble Wire line endommagé est laissé au jugement du travailleur."], "a": [0, 1, 3],
        "e": "« Une inspection visuelle doit être faite avant la manipulation du câble Wire line. Si le câble est endommagé, il est obligatoire de retirer ce dernier. » — « Pour les adapteurs courts, la tige de forage devra être retirée au complet avec la tête de la foreuse » — « Remonter doucement au début pour être sûr que le tube carottier est bien accroché avant de remonter à pleine puissance. »" },
      { "t": "ordre", "q": "Remettez ces étapes de la récupération du tube carottier avec l'overshot de surface dans le bon ordre.",
        "o": ["Envoyer l'overshot de surface à l'intérieur des tiges de forage", "Évacuer la zone de travail", "Activer le treuil pour faire descendre l'overshot en gardant une tension sur le câble", "Une fois l'overshot au fond, activer le treuil pour remonter le tube carottier", "Au collet, tirer le tube hors des tiges de forage et installer les pinces à tube"],
        "e": "Étapes 8 à 13 de la procédure : « Envoyer l'overshot de surface à l'intérieur des tiges de forage », « Évacuer la zone de travail », « Activer la commande du treuil pour faire descendre l'overshot »" }
    ],
    "pro-dd-st-008": [
      { "t": "vf", "q": "Lors de l'installation, vous devez insérer le eye bolt dans le trou sans l'enfoncer jusqu'au fond.", "vrai": true,
        "e": "« 3- Insérer le eye bolt, mais ne pas l'enfoncer jusqu'au fond du trou »" },
      { "t": "vf", "q": "Chaque bout de chaîne doit être passé dans l'œillet du support qui lui est destiné, de l'intérieur vers l'extérieur.", "vrai": false,
        "e": "« 7- Passer chaque bout de chaîne dans l'œillet du support qui lui est destiné, de l'extérieur vers l'intérieur »" },
      { "t": "vf", "q": "Avant de quitter le site de forage au diamant, l'équipe de forage de Machines Roger doit forer elle-même les trous de service destinés aux boulons à oeil.", "vrai": false,
        "e": "« La mine doit forer des trous de service à l'aide de leur équipement de forage pour le soutènement avant de quitter le site de forage au diamant pour y introduire des boulons à oeil »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies concernant le rangement des tiges et la chaîne de retenue.",
        "o": ["Les tiges doivent s'appuyer sur la barre transversale du fond du support, pas sur les côtés.", "La chaîne de retenue peut être enlevée pendant l'ajout et le retrait des tiges en continu.", "La capacité maximale du support en tiges BQ est de 240 tiges, soit 552 m.", "La chaîne « lousse » ne doit jamais se trouver à moins de 6 pieds du sol au centre.", "Le tendeur à cliquet chaîne reliant les deux bouts de chaîne doit être serré au maximum."], "a": [0, 1, 4],
        "e": "« 10-S'assurer d'appuyer les tiges sur la barre transversale du fond et non sur les côtés » ; « 13-La chaîne de retenue doit être utilisée en tout temps, sauf pendant les actions d'ajout et de retrait des tiges en continu » ; « 8- Relier les deux bouts de chaîne avec un tendeur à cliquet chaîne et serrer le tendeur au maximum »" },
      { "t": "ordre", "q": "Remettez ces étapes de l'installation du support de tiges de forage dans le bon ordre.",
        "o": ["Faire un trou de 18 po de profond au mur avec la foreuse à percussion électrique", "Insérer le eye bolt sans l'enfoncer jusqu'au fond du trou", "À deux, soulever le support et appuyer les pattes du haut au mur", "Passer une chaîne dans le eye bolt jusqu'à son milieu", "Relier les deux bouts de chaîne avec un tendeur à cliquet et serrer au maximum"],
        "e": "Étapes 2 à 8 de la procédure : « faire un trou de 18 po de profond […] Insérer le eye bolt […] soulever le support […] Passer une chaîne dans le eye bolt jusqu'à son milieu […] Relier les deux bouts de chaîne avec un tendeur à cliquet chaîne »" }
    ],
    "pro-dd-st-007": [
      { "t": "vf", "q": "Une coulée de 8 sacs remplit un trou de forage NQ sur une longueur d'environ 70 m, en terrain non fracturé.", "vrai": false,
        "e": "« Une coulée de 8 sacs rempli un trou sur une longueur d'environ : - 70m dans un trou de forage BQ; - 45m dans un trou de forage NQ; » — 70 m correspond au trou BQ, pas NQ." },
      { "t": "vf", "q": "Si la pression commence à monter à plus de 30 psi pendant le pompage d'un trou descendant, vous devez remonter le tube vers le collet du trou d'une dizaine de pieds.", "vrai": true,
        "e": "« Si la pression commence à monter à plus de 30 psi, remonter le tube vers le collet du trou d'une dizaine de pieds »" },
      { "t": "vf", "q": "Vous devez cadenasser la foreuse lors du remontage et du démontage de la pompe, mais le cadenassage n'est pas requis lors du déblocage des mélangeurs des cuves de pompage.", "vrai": false,
        "e": "« LA FOREUSE DOIT ÊTRE CADENASSÉE LORS DU REMONTAGE/DÉMONTAGE DE LA POMPE ET LORS DU NETTOYAGE OU DÉBLOCAGE DES MÉLANGEURS DES CUVES DE POMPAGE »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies au sujet de la cimentation des trous de forage avec la pompe 435.",
        "o": ["Dans un trou descendant sans pression d'eau, on laisse 3 m au fond pour ne pas obstruer le tube", "Pour se connecter sur la MARGO plug, on utilise le boyau hydraulique #12", "Avec une VK plug, le trou est plein quand la pression dépasse la pression d'eau initiale", "Dans un trou ascendant sans pression d'eau, la jute est insérée à 3 pieds du collet", "Les pièces internes démontées de la pompe sont placées dans un sac d'échantillonnage fermé d'une ty-rap"], "a": [0, 2, 4],
        "e": "« Laisser 3 m au fond pour ne pas obstruer le tube » ; « Le trou est plein quand la pression dépasse la pression d'eau initiale (la pression sera déterminée par l'ingénierie) » ; « placer toutes les pièces dans un sac d'échantillonnage (sample) fermé avec une ty-rap ». (Le boyau hydraulique est le #16 et la jute s'insère à 1 pied du collet.)" },
      { "t": "ordre", "q": "Remettez ces étapes de préparation du mélange de ciment dans le bon ordre.",
        "o": ["Ajouter la quantité d'eau dans le mélangeur selon la recette", "Mettre le mélangeur en marche", "Ajouter les sacs de ciment par petites quantités dans l'eau", "Laisser mélanger pendant 5 minutes pour obtenir un mélange homogène", "Vider le ciment mélangé dans la cuve de pompage"],
        "e": "Étapes 8 à 12 de la procédure : « Ajouter la quantité d'eau dans le mélangeur de la machine selon la recette […] Une fois le mélange homogène, vider le ciment mélangé dans la cuve de pompage »" }
    ],
    "pro-dd-st-009-1": [
      { "t": "vf", "q": "Le serrage des 9 boulons du chuck doit être vérifié au début de chaque quart avec la clé dynamométrique, sans les resserrer.", "vrai": true,
        "e": "« Vérifier le serrage des boulons au début de chaque quart avec la clé dynamométrique sans les resserrer. »" },
      { "t": "vf", "q": "Selon le formulaire d'analyse, les 9 boulons du chuck doivent être changés et serrés à 125 lbs/pied.", "vrai": false,
        "e": "« Bris des boulons — CHANGER LES 9 BOULONS ET SERRÉS À 105 LBS/PIED »" },
      { "t": "vf", "q": "C'est le superviseur qui doit s'impliquer dans l'analyse de la situation pour déterminer les contrôles à mettre en place.", "vrai": false,
        "e": "« Le superviseur est responsable de voir au bon déroulement des opérations et à la qualité du travail accompli. Le contremaître-général doit s'impliquer dans l'analyse de la situation pour déterminer les contrôles à mettre en place »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies concernant le forage de trous ascendants de plus de 20 degrés.",
        "o": ["Pour diminuer le risque de délatchage, on met des oreilles neuves et un latch piston neuf.", "Il est permis de casser une rod en faisant tourner la tête rapidement et en fermant les jaws.", "Les changements de pièces en prévention avant le forage réduisent les probabilités à « très improbable ».", "Si le trou dans le plancher crée un risque de chute, l'utilisation de tiges de 10 pieds est obligatoire.", "Si les jaws sont belles visuellement mais que la tige glisse, l'état des ressorts est à vérifier."], "a": [0, 2, 4],
        "e": "« Mettre des oreilles neuves ▪ Mettre un latch piston neuf ▪ Mettre une locking coupling neuve » ; « Les changements de pièces en prévention effectués avant le début du forage viennent diminuer les probabilités de survenance à ''TRÈS IMPROBABLE'' » ; « Si les jaws sont belles visuellement et que la tige glisse, l'état des ressorts seront à vérifier ». (Faux : il est interdit de « faire tourner la tête rapidement et fermer les jaws pour casser une rod » ; si le trou crée un risque de chute, « l'utilisation des tiges de 5 pieds est obligatoire ».)" },
      { "t": "ordre", "q": "Remettez ces étapes à suivre quand on se rend compte que le tube n'est pas latché dans le bon ordre.",
        "o": ["Constater que le tube n'est pas latché (ou qu'il est délatché)", "S'assurer que tous les travailleurs sont en dehors de la porte interverrouillée", "Descendre le bout des tiges le plus proche possible du plancher", "Faire sortir le tube par des va-et-vient des tiges de forage à l'aide de la tête"],
        "e": "Section « Quand on se rend compte que le tube n'est pas latché » : « Tous les travailleurs doivent être en-dehors de la porte interverrouillée ▪ Descendre le bout des tiges le plus proche du plancher possible; ▪ Effectuer les manœuvres nécessaires pour faire sortir le tube en faisant des mouvements de va-et-vient avec les tiges de forage à l'aide de la tête »" }
    ],
    "pro-dd-st-009-2": [
      { "t": "vf", "q": "Le serrage des 9 boulons du chuck doit être vérifié au début de chaque quart avec la clé dynamométrique, sans les resserrer.", "vrai": true,
        "e": "« Vérifier le serrage des boulons au début de chaque quart avec la clé dynamométrique sans les resserrer. »" },
      { "t": "vf", "q": "Selon le formulaire d'analyse, les 9 boulons du chuck doivent être changés et serrés à 125 lbs/pied.", "vrai": false,
        "e": "« Bris des boulons : CHANGER LES 9 BOULONS ET SERRÉS À 105 LBS/PIED » — le couple prescrit est de 105 lbs/pied, et non 125." },
      { "t": "vf", "q": "L'inspection et l'utilisation d'un 3 marches sont prévues à partir de +50 à +55 degrés avec des tiges de 1,5 mètres.", "vrai": false,
        "e": "« Inspection et utilisation d'un 6 marches : 1. À partir de +50 à +55 degrés avec des tiges de 1,5 mètres » — pour cette plage de pendage, c'est le 6 marches qui est prévu; le 3 marches s'utilise « à partir de +25 à +35 degrés avec des tiges de 3 mètres » ou « de +40 à +50 degrés avec des tiges de 1,5 mètres »." },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies concernant le forage de trous ascendants de plus de 20 degrés avec la DR-600 #2923.",
        "o": ["Si le 3 ou 6 marches n'atteint pas le collet, la cimentation se fait en nacelle avec des tiges de 1,5 mètres", "Le 6 marches doit être sécurisé avec un mousqueton et une chaîne dans le grillage", "À plus de 6 pieds, il faut prévoir des ÉPI pour s'attacher et limiter la chute à 6 pieds", "Si le trou dans le plancher crée un risque de chute, l'utilisation de tiges de 10 pieds est obligatoire", "Si les jaws sont belles visuellement mais que la tige glisse, il faut vérifier l'état des ressorts"], "a": [0, 1, 4],
        "e": "« Si l'utilisation d'un 3 marches ou 6 marches ne permets pas d'atteindre le collet du trou, elle doit être faite à l'aide d'une nacelle et de tiges de 1,5 mètres pour pousser le ciment » ; « Sécuriser le 6 marches à l'aide de mousqueton et d'une chaine dans le grillage pour empêcher tout basculement » ; « Si les jaws sont belles visuellement et que la tige glisse, l'état des ressorts seront à vérifier visuellement ». (Les ÉPI doivent « limiter la chute à 4 pieds », et c'est l'utilisation « des tiges de 5 pieds » qui est obligatoire en cas de risque de chute.)" },
      { "t": "ordre", "q": "Remettez ces étapes à suivre quand on se rend compte que le tube n'est pas latché dans le bon ordre.",
        "o": ["Constater que le tube n'est pas latché", "S'assurer que tous les travailleurs sont en dehors de la porte interverrouillée", "Descendre le bout des tiges le plus proche du plancher possible", "Faire sortir le tube par des mouvements de va-et-vient des tiges à l'aide de la tête"],
        "e": "Section « Quand on se rend compte que le tube n'est pas latché » (page 3) : « Tous les travailleurs doivent être en-dehors de la porte interverrouillée ; Descendre le bout des tiges le plus proche du plancher possible; Effectuer les manoeuvres nécessaires pour faire sortir le tube en faisant des mouvements de va-et-vient avec les tiges de forage à l'aide de la tête »." }
    ],
    "pro-ith-017": [
      { "t": "vf", "q": "L'élingue de levage doit demeurer attachée au tubage tant qu'il n'est pas stabilisé avec la soudure.", "vrai": true,
        "e": "« L'élingue de levage doit demeurer attachée au tubage tant qu'il n'est pas stabilisé avec la soudure »" },
      { "t": "vf", "q": "Lors d'un forage-alésage ascendant d'un seul trait, les ancrages du mât doivent être installés une fois le forage terminé.", "vrai": false,
        "e": "« Forage-alésage ascendant d'un seul trait (Les ancrages du mât doivent être installées avant le forage) »" },
      { "t": "vf", "q": "Le joint de soudure suivant devrait se trouver à la bonne hauteur chaque fois que l'opérateur retire 3 tiges de forage.", "vrai": false,
        "e": "« À chaque fois que l'opérateur retirera 2 tiges de forage, le joint de soudure suivant devrait être à la bonne hauteur »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies concernant l'ancrage du mât et le kit CASINGKIT.",
        "o": ["Le code MRI à utiliser pour commander les équipements d'ancrage du mât est CASINGKIT.", "Le kit CASINGKIT contient 6 chaînes graduées de ½ po X 10 pi.", "Les turnbuckles 1 ¼ po X 12 po du kit ont une capacité de 15 200 lbs.", "Les ancrages selon devis d'ingénieur doivent avoir une capacité de 25 000 lbs.", "Un poids de plus de 8 500 lbs de tuyau dans le trou est un critère d'ancrage du mât."], "a": [0, 2, 4],
        "e": "« Pour commander les équipements pour ancrer le mât utiliser le Code MRI qui est : CASINGKIT » ; « 4 turnbuckles 1'' ¼ X 12 pouces JAW & JAW 15 200 lbs » ; « a. Poids de plus de 8 500 lbs de tuyau dans le trou ». (Le kit contient 4 chaînes — les manilles sont au nombre de 6 — et les ancrages selon devis d'ingénieur ont une capacité de 15 000 lbs.)" },
      { "t": "ordre", "q": "Remettez ces étapes de l'installation d'un tuyau dans le bon ordre.",
        "o": ["Installer la plaque d'assise au niveau supérieur, dans le même angle que le degré du trou", "Déposer le serre-tuyau hydraulique (JAW) sur la plaque, autour du tuyau", "Enligner le bout du tuyau avec le bout de l'adapteur à l'aide du guide à tuyaux", "Serrer les mâchoires hydrauliques sur le tuyau à l'aide de la pompe", "Débuter les travaux de soudage selon le devis du donneur d'ordre"],
        "e": "Étapes 10 à 15 de la procédure : « Installer la plaque d'assise fournie par le donneur d'ordre […] Débuter les travaux de soudage selon le devis de soudage fourni par le donneur d'ordre »" }
    ],
    "pro-dd-st-011": [
      { "t": "vf", "q": "Dans le cas particulier où le tube carottier reste coincé dans les tiges ou que le câble est sectionné, vous devez retirer toutes les tiges de forage avant de récupérer le tube carottier.", "vrai": true,
        "e": "« Dans ces deux cas : a. Après avoir enlevé la chambre de chargement, pousser un bouchon de type ''VAN RUTH'' [...] b. Retirer toutes les tiges de forage c. Récupérer le tube carottier »" },
      { "t": "vf", "q": "Avant la récupération du tube, vous devez maintenir les tiges légèrement au-dessus du fond du trou de forage afin de faciliter l'évacuation de l'eau.", "vrai": false,
        "e": "« S'assurer que les tiges soient bien appuyées au fond du trou de forage. [...] Ceci réduira la quantité d'eau entrante susceptible de pousser sur le tube »" },
      { "t": "vf", "q": "Vous dévissez la chambre de chargement et sa rallonge à l'aide de la clé dynamométrique, ce qui permettra d'évacuer la pression.", "vrai": false,
        "e": "« 14. Dévisser la chambre de chargement et la rallonge de 48 pouces à l'aide d'une clé à tuyau. La pression sera évacuée. »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies concernant la récupération du tube carottier lors d'interception de veines d'eau.",
        "o": ["La mâchoire de repêchage (overshot) est envoyée en activant la pompe à eau.", "Pour sortir le tube, vous fermez la valve de purge afin de conserver la pression d'eau.", "La douille 1'' 5/8 figure parmi les outils nécessaires à cette procédure.", "La rallonge à installer avant la mâchoire de repêchage mesure 36 pouces.", "Le forage se poursuit au-delà de la veine d'eau afin de permettre une cimentation efficace."], "a": [0, 2, 4],
        "e": "« 7. Envoyer la mâchoire de repêchage (OVERSHOT) et activant la pompe à eau » ; « OUTILS NÉCESSAIRES [...] Douille 1'' 5/8 » ; « 16. Poursuivre le forage selon les directives afin de dépasser la veine d'eau pour permettre une cimentation efficace ». À l'inverse : « Pour sortir le tube, s'assurer que la valve de purge est ouverte au maximum » et « 4. Installer la rallonge de 48 pouces »." },
      { "t": "ordre", "q": "Remettez ces étapes de la vérification de la pression d'eau, à faire avant chaque récupération du tube carottier, dans le bon ordre.",
        "o": ["Casser la carotte", "Arrêter la pompe à eau de la foreuse en gardant la valve de purge ouverte", "Fermer la valve de purge", "Lire la valeur de la pression affichée sur le manomètre"],
        "e": "Étape 1 (a à d) de la procédure : « Vérifier la pression d'eau à chaque fois que le tube carottier doit être récupéré : a. Casser la carotte; b. Arrêter la pompe à l'eau de la foreuse en gardant la valve de purge ouverte; c. Fermer la valve de purge; d. Lire la valeur de la pression affichée sur le manomètre »" }
    ],
    "pro-mec-011": [
      { "t": "vf", "q": "Les 2 boulons entre la pompe et le bell housing se desserrent avec une clé 3/4.", "vrai": false,
        "e": "« Clé pour boulons pompe ↔ bell housing (2 boulons) : 15/16 » — c'est une clé 15/16, pas 3/4." },
      { "t": "vf", "q": "Le bell housing est fixé au moteur électrique par 4 boulons.", "vrai": true,
        "e": "« Nombre de boulons bell housing ↔ moteur électrique : 4 »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies pour le changement de coupling (CUBEX).",
        "o": ["La barrure du coupling de la pompe se desserre avec une clé ALLEN 5/16", "La barrure du coupling du moteur électrique se desserre avec une clé ALLEN 5/16", "Il faut appliquer de l'antiseize sur les deux shafts", "Le bell housing est fixé au moteur électrique par 6 boulons", "Il faut toujours bien nettoyer le shaft et l'épaulement de la pompe"], "a": [0, 2, 4],
        "e": "« Clé ALLEN pour barrure coupling de la pompe : 5/16 » ; « Clé ALLEN pour barrure coupling du moteur électrique : 3/16 » ; « Appliquer de l'antiseize sur les deux shafts » ; « Toujours bien nettoyer le shaft et l'épaulement de la pompe ainsi que le shaft du moteur électrique. »" }
    ],
    "pro-op-ith-002": [
      { "t": "vf", "q": "Le montage du tire-fort exige exactement 2 manilles 3/4.", "vrai": true,
        "e": "« Manilles requises : 2 manilles 3/4 »" },
      { "t": "vf", "q": "Deux tire-forts sont requis pour dévisser des tiges avec cette méthode.", "vrai": false,
        "e": "« Nombre de tire-fort requis : 1 »" }
    ],
    "pro-op-ith-002a": [
      { "t": "vf", "q": "Pour éviter que la clé à saver sub tombe, la flèche (boom) doit être mise à l'horizontale.", "vrai": true,
        "e": "« Risque de chute d'objet : mettre la flèche à l'horizontale pour éviter que la clé à saver sub ne tombe. »" },
      { "t": "vf", "q": "Cette méthode utilise deux palans à levier (come along) en parallèle.", "vrai": false,
        "e": "« Nombre de palans à levier (come along) : 1 »" }
    ],
    "pro-op-ith-003": [
      { "t": "vf", "q": "La manille du raccord chargeuse-navette est de 3/4 po.", "vrai": false,
        "e": "« Manille raccord chargeuse-navette : 1 1/4'' » — le 3/4'' correspond aux manilles de la barre de tir." },
      { "t": "vf", "q": "Le compresseur doit être retenu par 2 chaînes de sécurité.", "vrai": true,
        "e": "« Chaînes de sécurité compresseur : 2 chaînes »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies pour la démobilisation et le déplacement.",
        "o": ["Le transport dans le godet de la chargeuse est privilégié plutôt que d'attacher la remorque derrière un véhicule", "La barre de tir doit être verrouillée avec son boulon quand elle est rabaissée pour un déplacement", "Le déplacement sans remorque est permis dans la rampe à basse vitesse", "Une seule chaîne de sécurité suffit pour le compresseur"], "a": [0, 1],
        "e": "« Risque d'écrasement : privilégier le transport dans le godet de la chargeuse plutôt que d'attacher la remorque derrière un véhicule. » ; « Toujours verrouiller la barre de tir avec son boulon quand elle est rabaissée pour un déplacement. » ; « …déplacer la foreuse sans remorque (barre de tir) seulement sur courte distance, à plat; interdit dans la rampe. »" }
    ],
    "pro-op-ith-004": [
      { "t": "vf", "q": "Le boyau à eau utilisé est de 2 ½ po de diamètre.", "vrai": false,
        "e": "« Diamètre du boyau à eau : 1 po » — le 2 ½ po correspond aux boyaux à air (basse et haute pression)." },
      { "t": "vf", "q": "Les trous de production visés vont de 3 7/8 po à 6 ½ po.", "vrai": true,
        "e": "« Diamètre des trous de production visés : 3 7/8'' à 6 ½'' »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies pour le forage en longtrou (ITH / CUBEX).",
        "o": ["La barricade doit être à au moins 3 mètres (10 pieds) des premières pièces de matériel", "Au-delà de 6 ½ po, les marteaux et forets exigent le chariot ou la cloche et une chaîne", "Le boyau à air basse pression est de 1 po de diamètre", "Le câble électrique s'accroche au mur au niveau des genoux", "Un 2e travailleur est privilégié pour les trous de 200 pieds et plus"], "a": [0, 1, 4],
        "e": "« Distance mini barricade ↔ premières pièces de matériel : 3 mètres (10 pieds) » ; « Seuil de diamètre exigeant chariot ou cloche et chaîne : plus de 6 ½ po » ; « Diamètre du boyau à air basse pression : 2 ½ po » ; « Hauteur d'accrochage du câble électrique au mur : 4 à 5 pieds du banc (niveau de la poitrine) » ; « Profondeur de trou à partir de laquelle un 2e travailleur est privilégié : 200 pieds et plus »" }
    ],
    "pro-op-ith-005": [
      { "t": "vf", "q": "Le trou pilote est foré à 10 po de diamètre.", "vrai": false,
        "e": "« Diamètre trou pilote : 6½ po. » — le 10 po est le diamètre d'alésage pour le centralisateur (nez) de la V-30." },
      { "t": "vf", "q": "La foreuse se positionne dans l'axe de la V-30 à environ 15 pieds.", "vrai": true,
        "e": "« Distance de positionnement foreuse dans l'axe de la V-30 : environ 15 pieds »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies pour l'alésage en descendant sans accès (V-30).",
        "o": ["La chaîne entre le gear box et le drive shaft est de grade 80 et mesure 12 pieds", "La tête V-30 doit être entrée d'environ 6 pieds dans le roc avant l'installation du couvert", "Un centralisateur est requis quand la monterie dépasse 40 pieds", "Le marteau de déblocage est de 8 pouces", "Le mât est incliné vers l'arrière à environ 45 degrés pour installer la V-30"], "a": [0, 1, 2],
        "e": "« Chaîne entre gear box et drive shaft : grade 80, 12 pieds » ; « Profondeur d'entrée de la tête V-30 dans le roc avant installation du couvert : environ 6 pieds » ; « Seuil d'installation d'un centralisateur (monterie) : plus de 40 pieds » ; « Diamètre du marteau de déblocage : 6 pouces » ; « Angle d'inclinaison du mât vers l'arrière (installation V-30) : environ 60 degrés »" }
    ],
    "pro-op-ith-006": [
      { "t": "vf", "q": "L'alésage pour accepter le guide de la V-30 se fait à 10 po.", "vrai": true,
        "e": "« Diamètre d'alésage pour accepter le guide de la V-30 : 10 po. »" },
      { "t": "vf", "q": "Le trou pilote de l'alésage conventionnel est foré à 4 ½ po.", "vrai": false,
        "e": "« Diamètre du trou pilote : 6½ po. »" }
    ],
    "pro-op-ith-007": [
      { "t": "vf", "q": "La mesure entre la slip plate et le bout des taillants est de 7 pieds et 6 pouces.", "vrai": true,
        "e": "« Mesure entre la slip plate et le bout des taillants : 7 pieds et 6 pouces »" },
      { "t": "vf", "q": "Les tables du mât doivent être à une distance de 6 à 8 pieds du collet de trou.", "vrai": false,
        "e": "« Distance maxi entre les tables du mât et le collet de trou : 2 à 4 pieds »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies pour l'alésage ascendant sans accès (V-30).",
        "o": ["L'alésage pour accepter le guide de la V-30 se fait à 10 ½ po", "La tête V-30 doit être entrée d'environ 6 pieds dans le roc avant la pose de la cage", "Le trou pilote est foré à 8 po", "La chaîne entre le gear box et le drive shaft est de grade 60"], "a": [0, 1],
        "e": "« Diamètre d'alésage pour accepter le guide de la V-30 : 10½ po » ; « Profondeur d'entrée de la tête V-30 dans le roc avant pose de la cage : approx. 6 pieds » ; « Diamètre du trou pilote : 6½ po » ; « Chaîne entre gear box et drive shaft : grade 80, 12 pieds »" }
    ],
    "pro-op-ith-008": [
      { "t": "vf", "q": "Vous pouvez détacher le harnais dès que le couvercle est déposé à côté de la monterie.", "vrai": false,
        "e": "« Rester attaché à l'ancrage ou à la ligne de vie pendant toute la durée du retrait du couvercle. »" },
      { "t": "vf", "q": "Pendant la récupération au racloir, la V-30 reste dans la monterie.", "vrai": false,
        "e": "La première étape est de sortir la V-30 de la monterie en enlevant les tiges de forage, avant toute récupération." }
    ],
    "pro-op-ith-012": [
      { "t": "vf", "q": "La procédure doit être signée sur les barricades avant le début du forage et au début de chaque quart de travail.", "vrai": true,
        "e": "« Fréquence de signature de la procédure sur les barricades : avant le début du forage, au début de chaque quart de travail »" }
    ],
    "pro-op-ith-014": [
      { "t": "vf", "q": "Pour un casing de 6 po, le premier forage se fait à 4 ½ po.", "vrai": true,
        "e": "« Casing 6 pouces — 1er forage : 4 pouces 1/2 (selon les besoins) »" },
      { "t": "vf", "q": "Pour un casing de 10 po, le premier forage se fait à 8 po.", "vrai": false,
        "e": "« Casing 10 pouces — 1er forage : 6 pouces 1/2 (selon les besoins) »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies pour l'installation de tubage (casing).",
        "o": ["Pour un casing de 4 po, le premier forage se fait à 3 7/8 po", "Pour un casing de 10 po, le deuxième forage se fait à 10 po", "Pour un casing de 6 po, le deuxième forage se fait à 8 po", "La procédure de forage de référence est PRO-OP-ITH-012"], "a": [0, 1],
        "e": "« Casing 4 pouces — 1er forage : 3 pouces 7/8 » ; « Casing 10 pouces — 2e forage : 10 pouces, 1 pied dans le roc solide » ; « Casing 6 pouces — 2e forage : 6 pouces… » ; « Procédure de forage de référence : PRO-OP-ITH-004 »" }
    ],
    "pro-op-ith-016": [
      { "t": "vf", "q": "Le marteau de 4 po pèse 89 lbs.", "vrai": true,
        "e": "« Poids du marteau 4'' : 89 lbs »" },
      { "t": "vf", "q": "Le dévissage final du marteau (étape 29) se fait en 3 tours.", "vrai": false,
        "e": "« Dévissage final du marteau (étape 29) : 1 tour seulement »" },
      { "t": "multi", "q": "Sélectionnez les affirmations vraies pour la manipulation des marteaux de forage.",
        "o": ["Le marteau de 3 po pèse 60 lbs", "Pour les marteaux de 3 po et 4 po, la procédure s'applique à partir du point #8", "Le marteau de 6 po accepte des bits de 6, 8 ou 10 po", "Le marteau de 6 po pèse 179 lbs", "Le Driver Sub doit être retiré pendant la manipulation du marteau de 6 po"], "a": [0, 1, 2],
        "e": "« Poids du marteau 3'' : 60 lbs » ; « Application de la procédure pour les marteaux 3'' et 4'' : à partir du point #8 » ; « Diamètres de bits sur marteau 6'' : 6'', 8'' ou 10'' » ; « Poids du marteau 6'' : 211 lbs » ; « Marteaux de 6'' : toujours transporter avec le chariot prévu et garder le Driver Sub installé pendant la manipulation. »" }
    ]
  };
  var Q = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(T).forEach(function (id) { Q[id] = (Q[id] || []).concat(T[id]); });
})();
