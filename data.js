/* ===========================================================================
   DONNEES DES PROCEDURES + CODE DE SECURITE. Genere/maintenu via le pipeline.
   =========================================================================== */
window.PROCEDURES = [
  {
    "id": "centralisateur",
    "code": "",
    "titre": "Procédure d'installation du centralisateur",
    "categorie": "Installation",
    "machines": [
      "Centralisateur",
      "V-30"
    ],
    "resume": "Procédure pour assembler et installer un centralisateur de tiges sur l'extrémité femelle d'une tige de forage V-30, afin d'empêcher l'oscillement des tiges et de maintenir l'alignement de la foreuse. L'installation doit toujours se faire à deux travailleurs.",
    "objectif": "Le centralisateur de tiges est principalement utilisé pour le forage de trous de V-30 pour empêcher l'oscillement des tiges et pour maintenir le V-30 correctement alignée.",
    "application": "Les centralisateurs de tiges sont normalement installés tous les 40 pieds ou selon les besoins en fonction des conditions de terrain dans la monterie ainsi que de la longueur et l'angle de la monterie forée.",
    "responsabilites": "Document approuvé par Christian St-Amour, Directeur des Opérations, Machines Roger International. L'installation du centralisateur doit toujours se faire à deux travailleurs.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Toujours installer le centralisateur à deux travailleurs.",
      "Risque de manutention : chaque pièce pèse 46 livres. Se positionner correctement avant de soulever ou manipuler.",
      "Ne jamais utiliser de wescot ou de pipe wrench pour cette installation : outil inadéquat.",
      "Entrer les boulons avec soin dans leurs trous pour ne pas endommager les filets.",
      "Aucune séquence imposée pour l'installation ni le serrage des boulons et écrous."
    ],
    "consignes_securite": [
      {
        "regle": "Toujours réaliser l'installation du centralisateur à deux travailleurs.",
        "theme": "Manutention & levage",
        "source": "Avertissement"
      },
      {
        "regle": "Se positionner de la meilleure manière avant de manipuler les pièces du centralisateur, qui pèsent 46 livres chacune.",
        "theme": "Manutention & levage",
        "source": "Étape 5"
      },
      {
        "regle": "Ne pas endommager les filets des boulons lors de leur insertion dans les trous prévus à cet effet.",
        "theme": "Outils & clés",
        "source": "Étape 9"
      },
      {
        "regle": "Vérifier la présence des 12 boulons, 12 locknuts et 12 lockwashers avant le serrage.",
        "theme": "Inspection & vérification",
        "source": "Étape 10"
      },
      {
        "regle": "Serrer tous les boulons en maintenant une tension sur les lockwashers à l'aide de l'outil adéquat (clé ou box).",
        "theme": "Outils & clés",
        "source": "Étape 11"
      },
      {
        "regle": "Ne jamais utiliser un wescot ou un pipe wrench pour le serrage des boulons.",
        "theme": "Outils & clés",
        "source": "Avertissement (Étape 11)"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Espacement d'installation des centralisateurs",
        "valeur": "tous les 40 pieds (ou selon les conditions)"
      },
      {
        "libelle": "Poids de chaque pièce du centralisateur",
        "valeur": "46 livres chacune (2 pièces)"
      },
      {
        "libelle": "Poids total du centralisateur (dessin technique)",
        "valeur": "93,0 lbs"
      },
      {
        "libelle": "Nombre de travailleurs requis",
        "valeur": "2"
      }
    ],
    "figures": [
      {
        "page": "2",
        "description": "Plan de montage du centralisateur : vue éclatée en 3D montrant les deux demi-coquilles rouges du centralisateur assemblées autour de la tige (en bleu), avec le repérage des articles - 1 Centralisateur (qté 2, pièce 30271101), 2 Lockwasher (Regular LW 0.5, qté 12), 3 Écrou/HNUT 0.5000-13-D-N (qté 12), 4 Boulon/HBOLT 0.5000-13x1.375x1.25-N (qté 12). Cartouche : PROCEDURE INSTALATION CENTRALISATEUR, dessiné V.CHYHRYNAU, approuvé K.BECHARD, 2023-03-15, échelle 1:5, poids 93,0 lbs."
      },
      {
        "page": "1 (CENTRALISATEUR dessin technique.pdf)",
        "description": "Dessin technique distinct (fichier CENTRALISATEUR dessin technique.pdf) : vue d'assemblage 3D haute résolution du centralisateur. Nomenclature (BOM) : article 1 pièce 30271101 CENTRALISATEUR qté 2 ; article 2 Regular LW 0.5 LOCKWASHER qté 12 ; article 3 HNUT 0.5000-13-D-N ÉCROU qté 12 ; article 4 HBOLT 0.5000-13x1.375x1.25-N BOLT qté 12. Titre PROCEDURE INSTALATION CENTRALISATEUR, dessiné V.CHYHRYNAU, approuvé K.BECHARD, 2023-03-15, échelle 1:5, poids 93,0 lbs. Aucune étape de procédure - dessin de référence seulement."
      }
    ],
    "historique": [],
    "date_creation": "",
    "date_revision": "Août 2024",
    "source_pdf": "Procédure d'installation du centralisateur août 2024.pdf",
    "langue_source": "fr",
    "notes": "Aucun code de document (ex. PRO-OP-ITH-xxx) n'apparaît sur ce document ; code laissé vide. Aucune table « Ajouts ou modifications » ni dates de pied de page formelles (création/révision) ; la date retenue « Août 2024 » provient du nom de fi […]"
  },
  {
    "id": "pro-mec-011",
    "code": "PRO-MEC-011",
    "titre": "Procédure pour changer la coupling entre le moteur électrique et la pompe hydraulique des foreuses CUBEX",
    "categorie": "Maintenance",
    "machines": [
      "CUBEX",
      "Foreuse CUBEX",
      "Pompe hydraulique",
      "Moteur électrique"
    ],
    "resume": "Procédure de maintenance décrivant la façon sécuritaire de remplacer la coupling (accouplement) entre le moteur électrique et la pompe hydraulique des foreuses CUBEX, tout en inspectant les composantes entourant la pompe et le moteur.",
    "objectif": "L'objectif de cette procédure est de définir une façon sécuritaire de changer la coupling entre le moteur électrique et la pompe hydraulique des foreuses CUBEX. De plus, elle permet de faire une bonne inspection de l'ensemble des composantes entourant la pompe et le moteur électrique.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL qui ont à faire les changements de coupling. Les travaux doivent être effectués par un mécanicien, un superviseur ou par un foreur mandaté par le superviseur.",
    "responsabilites": "Le travailleur a la responsabilité de prendre connaissance de cette procédure et de l'appliquer lors du changement de coupling. Le superviseur doit s'assurer que la personne effectuant les travaux est en mesure de le faire. Il doit s'assurer que la procédure est connue des personnes concernées. INTERPRÉTATION : La personne ayant l'autorité pour l'interprétation de ce document est le directeur entretien. Toute demande de modification, révision ou de mise à jour doit être faite auprès de cette personne.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Risque de coincement des doigts : retenir la pompe par les boyaux avec les mains, jamais en-dessous.",
      "Risque d'être frappé : s'assurer que la pompe ne peut pas se déplacer vers le travailleur.",
      "Le bell housing est en aluminium : frapper dessus avec une masse en caoutchouc pour ne pas l'endommager.",
      "Si la coupling est collée : enlever le bell housing, puis frapper la masse sur la pry bar sans endommager le shaft du moteur électrique.",
      "Toujours bien nettoyer le shaft et l'épaulement de la pompe ainsi que le shaft du moteur électrique.",
      "Appliquer de l'antiseize sur les deux shafts et nettoyer les deux bouts du bell housing."
    ],
    "consignes_securite": [
      {
        "regle": "Cadenasser la foreuse avant d'entreprendre tout travail de changement de coupling.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 1"
      },
      {
        "regle": "Ne pas coincer le fil de détection du système à feu lors de la pose de la sangle à cliquet autour de la pompe et du cadre.",
        "theme": "Inspection & vérification",
        "source": "Étape 3"
      },
      {
        "regle": "Lors du retrait de la pompe, la retenir avec les mains sur les boyaux car elle n'est plus tenue que par les boyaux hydrauliques et la sangle.",
        "theme": "Manutention & levage",
        "source": "Étape 5 / Avertissement"
      },
      {
        "regle": "Éviter de se mettre les mains sous la pompe et protéger ses doigts des coincements.",
        "theme": "Pièces en mouvement & mât",
        "source": "Avertissement (p.3)"
      },
      {
        "regle": "Desserrer la sangle et placer la pompe de façon à être certain qu'elle ne se déplacera pas pour frapper le travailleur.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 6"
      },
      {
        "regle": "Le bell housing étant en aluminium, utiliser uniquement une masse de caoutchouc pour le décoller, afin de ne pas l'endommager.",
        "theme": "Outils & clés",
        "source": "Étape 7 (v) / Avertissement"
      },
      {
        "regle": "Si la coupling est collée, retirer le bell housing puis frapper sur la pry bar avec une masse ou un marteau, en prenant garde de ne pas endommager le shaft du moteur électrique.",
        "theme": "Outils & clés",
        "source": "Étape 11 / Avertissement"
      },
      {
        "regle": "Bien nettoyer le shaft et l'épaulement de la pompe ainsi que le shaft du moteur électrique avant le remontage, et appliquer de l'antiseize.",
        "theme": "Inspection & vérification",
        "source": "Étape 12 / Avertissements (p.6-7)"
      },
      {
        "regle": "S'assurer que la coupling est « FLUSH » au shaft avant de serrer au maximum la barrure.",
        "theme": "Inspection & vérification",
        "source": "Étapes 17-18"
      },
      {
        "regle": "Insérer à la main les 2 boulons de la pompe pour vérifier le bon alignement avant de les serrer avec la clé.",
        "theme": "Inspection & vérification",
        "source": "Étape 21"
      },
      {
        "regle": "Remettre le couvercle de plastique à la fin pour rétablir la protection (mesure issue d'un début d'incendie causé par surchauffe du bell housing et du couvercle).",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 24 / Historique"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Clé pour boulons pompe ↔ bell housing (2 boulons)",
        "valeur": "15/16"
      },
      {
        "libelle": "Clé pour 4 boulons bell housing ↔ moteur électrique (tête hexagonale)",
        "valeur": "15/16"
      },
      {
        "libelle": "Clé ALLEN pour barrure coupling de la pompe",
        "valeur": "5/16"
      },
      {
        "libelle": "Clé ALLEN pour barrure coupling du moteur électrique",
        "valeur": "3/16"
      },
      {
        "libelle": "Clé ALLEN pour barrure du spline sur coupling de la pompe",
        "valeur": "1/4"
      },
      {
        "libelle": "Clé ALLEN pour 4 boulons bell housing ↔ moteur électrique (tête ALLEN)",
        "valeur": "1/2"
      },
      {
        "libelle": "Nombre de boulons pompe ↔ bell housing",
        "valeur": "2"
      },
      {
        "libelle": "Nombre de boulons bell housing ↔ moteur électrique",
        "valeur": "4"
      },
      {
        "libelle": "Matériau du bell housing",
        "valeur": "Aluminium"
      }
    ],
    "figures": [
      {
        "page": "2",
        "description": "Photos de la sangle à cliquet enroulée autour de la pompe et du cadre (étape 3), des boulons fixant la pompe au bell housing avec flèches rouges (étape 4) et du retrait de la pompe (étape 5)."
      },
      {
        "page": "3",
        "description": "Photo des trous et filets où sont vissés les boulons sur le bell housing (flèches rouges) et photo de l'intérieur du bell housing montrant la saleté (étape 7)."
      },
      {
        "page": "4",
        "description": "Photo du bell housing et du moteur électrique avec la coupling, et photo du retrait de la coupling sur le shaft de la pompe (étapes 7v et 9)."
      },
      {
        "page": "5",
        "description": "Photo de la barrure sur la moitié de coupling du shaft du moteur électrique (flèche rouge) et photo du retrait de la coupling à l'aide d'une pry bar (étapes 10-11)."
      },
      {
        "page": "6",
        "description": "Photos du shaft et de l'épaulement de la pompe hydraulique (flèches rouges) et du shaft du moteur électrique à bien nettoyer (étape 12)."
      },
      {
        "page": "7",
        "description": "Photo de l'antiseize appliqué sur le shaft de la pompe, photo sur le shaft du moteur électrique (flèche rouge) et photo des deux bouts du bell housing à nettoyer (étape 12)."
      },
      {
        "page": "8",
        "description": "Photo de la coupling insérée de manière flottante sur le shaft du moteur électrique (étape 13) et photo du bell housing remis en place (flèche rouge, étape 14)."
      },
      {
        "page": "9",
        "description": "Photo du boulon enduit d'anti-seize barrant le spline avec la clé ALLEN 1/4 (étape 15) et photo de la coupling mise sur le shaft à l'aide d'un tournevis plat (étape 16)."
      },
      {
        "page": "10",
        "description": "Photo confirmant que la coupling est « FLUSH » au shaft (flèche rouge, étape 17) et photo de la barrure enduit d'anti-seize serrée avec la clé ALLEN 5/16 (étape 18)."
      },
      {
        "page": "11",
        "description": "Photos de l'alignement et du collage des deux coupling (cercle vert) après resserrage de la sangle (étape 20) et photo de la barrure de la coupling du moteur électrique serrée avec la clé ALLEN 3/16 (flèche rouge, étape 23)."
      },
      {
        "page": "12",
        "description": "Photo du couvercle de plastique orange remis en place sur le moteur (étape 24), au-dessus de la signature de Karl Béchard, directeur entretien, et du tableau des ajouts ou modifications."
      }
    ],
    "historique": [
      {
        "date": "Avril 2024",
        "description": "Procédure mise en place à la suite d'un début d'incendie à la mine Westwood lors de la surchauffe du bell housing et du couvercle de plastique.",
        "par": "S. Tremblay, K. Béchard"
      }
    ],
    "date_creation": "Avril 2024",
    "date_revision": "Avril 2024",
    "source_pdf": "PRO-MEC-011 Procédure pour changer la coupling entre la pompe hydraulique et le moteur électrique des foreuses CUBEX (1).pdf",
    "langue_source": "fr",
    "notes": "Vérifié intégralement contre le PDF source (12 pages). CORRECTION apportée : ajout du cinquième encadré d'avertissement mis en emphase à la page 7 (« APPLIQUE DE L'ANTISEIZE SUR LE SHAFT DE LA POMPE, SUR LE SHAFT DU MOTEUR ÉLECTRIQUE ; NETT […]"
  },
  {
    "id": "pro-op-ith-002",
    "code": "PRO-OP-ITH-002",
    "titre": "Utilisation de clés et d'un tire-fort pour dévisser des tiges de forages",
    "categorie": "Manutention",
    "machines": [
      "ITH"
    ],
    "resume": "Procédure décrivant les méthodes sécuritaires pour utiliser des clés et un tire-fort (come-along) afin de dévisser des tiges de forage coincées, ainsi qu'une tige ou un marteau coincé dans le saver sub.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour l'utilisation des clés pour dévisser des tiges coincées.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur responsable du forage doit s'assurer d'appliquer cette procédure, d'inspecter les outils nécessaires et de coordonner la tâche.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Risque de chute de charge : toujours utiliser des crochets munis de linguet.",
      "Coup de masse sur le manche de la clé : gardez les pieds sur une surface solide.",
      "Risque d'être frappé : personne dans la ligne de la masse au cas où elle serait échappée.",
      "Utiliser un ancrage de mât certifié 2500 kg."
    ],
    "consignes_securite": [
      {
        "regle": "Appliquer la procédure de cadenassage avant d'intervenir sur l'équipement pour dévisser des tiges ou un marteau coincé.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 2 et Saver sub étape 3"
      },
      {
        "regle": "Retirer les clés et décadenasser l'équipement uniquement une fois l'opération terminée, avant de poursuivre les travaux.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Saver sub étape 8"
      },
      {
        "regle": "N'utiliser qu'un tire-fort dont les crochets sont munis de linguet.",
        "theme": "Outils & clés",
        "source": "Outils nécessaires"
      },
      {
        "regle": "Inspecter les outils nécessaires avant d'amorcer la tâche.",
        "theme": "Inspection & vérification",
        "source": "Responsabilités"
      },
      {
        "regle": "Lors d'un coup de masse sur le manche de la clé, s'assurer d'avoir les pieds sur une surface solide.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Avertissement (Étape 6)"
      },
      {
        "regle": "Lors d'un coup de masse, s'assurer que personne ne se trouve dans la ligne de la masse advenant qu'elle soit échappée.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Avertissement (Étape 6)"
      },
      {
        "regle": "Ne pas dépasser la charge certifiée de l'ancrage du mât (2500 kg) lors de la mise en tension avec le tire-fort.",
        "theme": "Manutention & levage",
        "source": "Avertissement (Étape 6) — Ancrage du mât certifié 2500 kg"
      },
      {
        "regle": "Positionner le mât à l'horizontale avant d'installer la clé à saver sub afin d'éviter qu'elle tombe.",
        "theme": "Pièces en mouvement & mât",
        "source": "Saver sub étape 1"
      },
      {
        "regle": "Placer le gearbox le plus loin possible des tables pour disposer de l'espace nécessaire à l'installation de la clé.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Saver sub étape 2"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Charge certifiée de l'ancrage du mât",
        "valeur": "2500 kg"
      },
      {
        "libelle": "Nombre de tire-fort requis",
        "valeur": "1"
      },
      {
        "libelle": "Manilles requises",
        "valeur": "2 manilles 3/4"
      }
    ],
    "figures": [
      {
        "page": "1",
        "description": "Encadré « Outils nécessaires » illustrant la liste du matériel : 1 tire-fort (crochets munis de linguet), 2 manilles 3/4, clé pour tige, clé pour le saver sub ; photo d'un tire-fort installé en chantier souterrain."
      },
      {
        "page": "2",
        "description": "Schéma/photo montrant l'installation des clés sur les tiges, le tire-fort relié à l'ancrage du mât et à la manille du manche de la clé, avec mention « Ancrage du mât certifié 2500 kg »."
      },
      {
        "page": "3",
        "description": "Illustration du montage à deux clés (sans ancrage du mât) et de la configuration du mât à l'horizontale avec le gearbox éloigné des tables pour le travail dans le saver sub."
      },
      {
        "page": "4",
        "description": "Schéma/photo illustrant l'installation de la clé à saver sub passée au travers du marteau ou de la rod, et de la clé à rod sur le marteau ou la rod."
      },
      {
        "page": "5",
        "description": "Schéma/photo montrant les crochets du tire-fort installés sur chacune des manilles des manches des clés pour la séparation des tiges."
      }
    ],
    "historique": [
      {
        "date": "Juillet 2022",
        "description": "Ajout de la partie concernant le marteau ou rod coincé dans le saver sub",
        "par": "S. Tremblay"
      },
      {
        "date": "Octobre 2024",
        "description": "Ajout de la procédure de cadenassage lors du dévissage des rods",
        "par": "S. Tremblay"
      }
    ],
    "date_creation": "04 Janvier 2012",
    "date_revision": "Mars 2025",
    "source_pdf": "PRO-OP-ITH-002 Procédure d’utilisation de clés pour dévisser des tiges de forages octobre 2024.pdf",
    "langue_source": "fr",
    "notes": "Le document contient deux procédures distinctes : (1) dévissage d'une tige coincée avec l'ancrage du mât (étapes numérotées 1 à 6) et (2) dévissage d'une tige de forage ou d'un marteau coincé dans le saver sub (étapes 1 à 8 dans le PDF). Po […]"
  },
  {
    "id": "pro-op-ith-002a",
    "code": "PRO-OP-ITH-002A",
    "titre": "Utilisation de la clé pour dévisser des tiges de forage avec un palan à levier (come along)",
    "categorie": "Manutention",
    "machines": [
      "ITH"
    ],
    "resume": "Cette procédure définit les méthodes sécuritaires pour utiliser une clé et un palan à levier (come along) afin de dévisser des tiges de forage coincées ainsi qu'une tige ou un marteau coincé dans le saver sub.",
    "objectif": "Le but de cette procédure est de définir des méthodes sécuritaires pour utiliser une clé afin de dévisser des tiges coincées.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur responsable du forage doit s'assurer que cette procédure est suivie, inspecter les outils nécessaires et coordonner la tâche.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Risque d'être frappé ou écrasé : si la masse tombe, garder les pieds sur une surface solide et personne dans l'axe.",
      "Utiliser un ancrage certifié 2500 kg pour le palan à levier (come along).",
      "Risque de chute d'objet : mettre la flèche à l'horizontale pour éviter que la clé à saver sub ne tombe."
    ],
    "consignes_securite": [
      {
        "regle": "Appliquer la procédure de cadenassage et d'étiquetage (lock out tag out) avant de manipuler les clés et les tiges.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 2"
      },
      {
        "regle": "S'assurer que les crochets du palan à levier (come along) sont munis de linguets de sécurité.",
        "theme": "Manutention & levage",
        "source": "Outils nécessaires"
      },
      {
        "regle": "Utiliser uniquement un ancrage certifié pour une charge de 2500 kg.",
        "theme": "Manutention & levage",
        "source": "Avertissement (figure page 2)"
      },
      {
        "regle": "Lorsqu'il faut frapper le manche de la clé avec la masse, s'assurer que les pieds reposent sur une surface solide.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 6"
      },
      {
        "regle": "Lorsqu'il faut frapper avec la masse, s'assurer que personne ne se trouve dans l'axe (ligne de chute) si la masse tombe.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 6"
      },
      {
        "regle": "Mettre la flèche (boom) en position horizontale pour éviter que la clé à saver sub ne tombe avant de travailler sur une tige ou un marteau coincé dans le saver sub.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 1 (séquence saver sub)"
      },
      {
        "regle": "Éloigner le réducteur (gearbox) le plus possible des tables pour disposer d'assez d'espace afin d'installer la clé.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 2 (séquence saver sub)"
      },
      {
        "regle": "Retirer les deux clés et décadenasser l'équipement avant de reprendre le travail.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 8 (séquence saver sub)"
      },
      {
        "regle": "Inspecter les outils nécessaires et coordonner la tâche avant de débuter (responsable du forage).",
        "theme": "Inspection & vérification",
        "source": "Responsabilités"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Capacité de l'ancrage certifié",
        "valeur": "2500 kg"
      },
      {
        "libelle": "Manilles",
        "valeur": "2 manilles 3/4"
      },
      {
        "libelle": "Nombre de palans à levier (come along)",
        "valeur": "1"
      }
    ],
    "figures": [
      {
        "page": "1",
        "description": "Photo souterraine montrant le palan à levier (come along) rouge accroché et tendu sur l'installation de forage, avec chaîne et manilles, près d'un grillage de paroi."
      },
      {
        "page": "2",
        "description": "Photo de la mise en tension : tige verticale, clé horizontale, palan à levier rouge en bas; un ancrage entouré d'un cercle rouge avec flèche verte est annoté « Ancrage certifié 2500 kg »; boîtier de commande avec boutons (E-Stop rouge/vert) visible à gauche."
      },
      {
        "page": "3",
        "description": "Photo illustrant la variante sans ancrage de flèche : le palan à levier relie les deux extrémités de deux clés posées sur la machine. Sous le titre « Unscrewing a rod or the hammer jammed in the saver sub », photo de la tête de forage / réducteur avec saver sub (bague jaune) et boyaux bleus."
      },
      {
        "page": "4",
        "description": "Deux photos en atelier : installation de la clé à saver sub passée à travers le marteau ou la tige; puis installation de la clé à tige (rod wrench) sur la tige ou le marteau, avec manille et crochet visibles."
      },
      {
        "page": "5",
        "description": "Deux photos montrant l'installation des crochets du palan à levier sur les manilles des manches des clés, avec le palan à levier orange tendu et chaîne; configuration finale de dévissage en atelier."
      }
    ],
    "historique": [
      {
        "date": "Juillet 2022",
        "description": "Ajout de la séquence pour une tige ou un marteau coincé dans le saver sub.",
        "par": "S. Tremblay"
      },
      {
        "date": "Décembre 2023",
        "description": "Remplacement de « KEYS » (clés/touches) par « wrench » (clé); modification de certaines phrases pour clarifier.",
        "par": "S. Tremblay"
      },
      {
        "date": "Octobre 2024",
        "description": "Ajout du cadenassage et étiquetage (lock out tag out) au point #2.",
        "par": "S. Tremblay"
      }
    ],
    "date_creation": "Janvier 2012",
    "date_revision": "Octobre 2024",
    "source_pdf": "PRO-OP-ITH-002A Procedure for unscrewing rods with come along october 2024.pdf",
    "langue_source": "en",
    "notes": "PDF source en anglais (5 pages), traduit intégralement en français. Vérifié verbatim contre l'original le 2026-06-12 : aucune étape manquante ou altérée, avertissements et valeur chiffrée (2500 kg, 2 manilles 3/4, 1 come along) exacts. Le d […]"
  },
  {
    "id": "pro-op-ith-003",
    "code": "PRO-OP-ITH-003",
    "titre": "Démobilisation et déplacement de la foreuse et du compresseur",
    "categorie": "Démobilisation",
    "machines": [
      "Foreuse ITH",
      "Compresseur"
    ],
    "resume": "Procédure pour démobiliser et déplacer de façon sécuritaire la foreuse ITH et le compresseur, incluant la mise en position de transport, le chargement sur traîneau ou remorque, l'arrimage, la démobilisation du compresseur et le déplacement sans remorque à l'aide d'une barre de tir.",
    "objectif": "L'objectif de cette procédure est de définir une façon sécuritaire pour effectuer la démobilisation et le déplacement de la foreuse.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le foreur-guide est responsable d'organiser la démobilisation. Il est aussi responsable de mettre en place les activités entourant les déplacements des équipements. Le travailleur a la responsabilité d'utiliser cette procédure pour chaque démobilisation et déplacement. Les procédures de transport d'équipement des sites doivent être respectées. La personne ayant l'autorité pour l'interprétation de ce document est le directeur des opérations; toute demande de modification, révision ou de mise à jour doit être faite auprès de cette personne.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Inspecter chaque accessoire de levage avant usage; remplacer obligatoirement tout accessoire défectueux avant le déplacement.",
      "Utiliser uniquement des composantes approuvées; aucune modification permise.",
      "Risque d'écrasement : privilégier le transport dans le godet de la chargeuse plutôt que d'attacher la remorque derrière un véhicule.",
      "Toujours verrouiller la barre de tir avec son boulon quand elle est rabaissée pour un déplacement.",
      "Risque de renversement : déplacer la foreuse sans remorque (barre de tir) seulement sur courte distance, à plat; interdit dans la rampe.",
      "Risque de fouettement et de projection : purger les boyaux à air (filtre à air, receiver) et le boyau à eau avant de les découpler.",
      "L'opérateur doit toujours rester dans le panier de la foreuse, chaîne garde-corps en place.",
      "Maintenir une bonne communication avec l'opérateur de la chargeuse."
    ],
    "consignes_securite": [
      {
        "regle": "Inspecter tous les accessoires de levage avant leur utilisation et remplacer obligatoirement tout accessoire présentant une anomalie avant d'entreprendre le déplacement.",
        "theme": "Inspection & vérification",
        "source": "Mise en garde"
      },
      {
        "regle": "Utiliser uniquement des composantes approuvées; aucune modification n'est autorisée.",
        "theme": "Inspection & vérification",
        "source": "Mise en garde"
      },
      {
        "regle": "Placer le mât en position de transport (tête de forage à l'opposé des tables) et l'attacher à la foreuse avec un tire-fort ou palan à chaîne avant de déplacer.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape Foreuse 1"
      },
      {
        "regle": "Fermer les valves à air et eau et purger les boyaux à air, le filtre à air, le receiver et le boyau à eau avant de les découpler.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Étapes Foreuse 2 et Compresseur 1"
      },
      {
        "regle": "Fermer le disjoncteur du panneau électrique de la foreuse avant de manipuler le câble, et ne remettre l'alimentation à « ON » que juste avant de déplacer l'équipement.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape Foreuse 3"
      },
      {
        "regle": "Relier le traîneau ou la remorque au véhicule avec deux élingues d'au moins 1'' X 8 pieds, fixées avec des manilles de 1''1/4 minimum.",
        "theme": "Manutention & levage",
        "source": "Étape Foreuse 4"
      },
      {
        "regle": "Niveler et nettoyer le traîneau des roches et de la boue, et positionner la remorque à angle pour éviter un contrecoup au chargement.",
        "theme": "Manutention & levage",
        "source": "Étape Foreuse 5"
      },
      {
        "regle": "Favoriser l'utilisation de la main dans le godet d'une chargeuse plutôt que d'attacher directement la remorque à l'arrière d'un véhicule.",
        "theme": "Manutention & levage",
        "source": "Avertissement / Étape Foreuse 5"
      },
      {
        "regle": "Lors de l'embarquement de la foreuse, l'opérateur doit toujours se placer à l'intérieur du panier et mettre la chaîne garde-corps.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape Foreuse 6"
      },
      {
        "regle": "Avant de débrancher le câble électrique de la foreuse, fermer l'interrupteur d'alimentation de la mine (GFP), puis rouler et bien attacher le câble sur le crochet prévu.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape Foreuse 7"
      },
      {
        "regle": "Arrimer la foreuse de chaque côté pour l'empêcher d'avancer ou de reculer, attacher solidement la console au « Slideover » et fixer les boyaux haute pression pour qu'ils ne soient pas accrochants.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Étape Foreuse 8"
      },
      {
        "regle": "S'assurer qu'aucune pièce libre ni outil ne se trouve sur la foreuse avant de commencer le transport.",
        "theme": "Outils & clés",
        "source": "Étape Foreuse 9"
      },
      {
        "regle": "Ne jamais attacher le traîneau au mur après le déplacement; le laisser par terre et le signaler avec un ruban jaune.",
        "theme": "Communication & signalisation",
        "source": "Étape Foreuse 10"
      },
      {
        "regle": "Verrouiller la barre de tir du compresseur avec le boulon lorsqu'elle est rabaissée et s'assurer que les deux boulons sont en place pour limiter le pivot.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape Compresseur 3"
      },
      {
        "regle": "Vérifier le bon fonctionnement de la main d'attelage située dans le godet du scoop.",
        "theme": "Inspection & vérification",
        "source": "Étape Compresseur 4"
      },
      {
        "regle": "S'assurer de la stabilité du compresseur lors de l'accouplement et du désaccouplement, en appliquant au besoin des stabilisateurs ou des cales de roues.",
        "theme": "Manutention & levage",
        "source": "Étape Compresseur 5"
      },
      {
        "regle": "Relier l'attache du compresseur au véhicule avec des manilles de 1''1/4 minimum et fixer les deux chaînes de sécurité au véhicule de remorquage.",
        "theme": "Manutention & levage",
        "source": "Étapes Compresseur 6 et 7"
      },
      {
        "regle": "Ne déplacer la foreuse sans remorque qu'à plat, sur de courtes distances et à basse vitesse; il est interdit de la déplacer sans remorque dans la rampe.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Procédure de démobilisation sans la remorque"
      },
      {
        "regle": "Lors du déplacement sans remorque, installer la barre de tir avec des manilles 3/4'', la raccorder à la chargeuse-navette avec une manille de 1 1/4'' et installer une chaîne de sécurité reliant la foreuse à la chargeuse.",
        "theme": "Manutention & levage",
        "source": "Sans remorque, étapes 1, 2 et 4"
      },
      {
        "regle": "Maintenir une bonne communication avec l'opérateur de la chargeuse durant le déplacement sans remorque.",
        "theme": "Communication & signalisation",
        "source": "Sans remorque, étape 2"
      },
      {
        "regle": "Appliquer la politique du site concernant les escortes pour le déplacement des équipements.",
        "theme": "Communication & signalisation",
        "source": "N.B. final"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Élingues traîneau/remorque",
        "valeur": "2 minimum, 1'' X 8 pieds"
      },
      {
        "libelle": "Manilles de fixation des élingues / attache compresseur",
        "valeur": "1''1/4 minimum"
      },
      {
        "libelle": "Manilles barre de tir (sans remorque)",
        "valeur": "3/4''"
      },
      {
        "libelle": "Manille raccord chargeuse-navette",
        "valeur": "1 1/4''"
      },
      {
        "libelle": "Chaînes de sécurité compresseur",
        "valeur": "2 chaînes"
      },
      {
        "libelle": "Boulons barre de tir compresseur",
        "valeur": "2 boulons en place"
      },
      {
        "libelle": "Vitesse de déplacement sans remorque",
        "valeur": "Basse vitesse"
      }
    ],
    "figures": [
      {
        "page": "2",
        "description": "Schéma « OPTION 1 » illustrant la foreuse tractée par une remorque reliée au godet d'une chargeuse (main dans le godet)."
      },
      {
        "page": "3",
        "description": "Schéma « OPTION 2 » illustrant la foreuse sur la remorque attachée directement à l'arrière d'un véhicule, avec encerclement en rouge de la zone des rampes."
      },
      {
        "page": "4",
        "description": "Photo couleur de la barre de tir du compresseur (équipement rouge) avec encadré « Lorsque la barre de tir est rabaissée pour effectuer un déplacement, il faut la verrouiller avec le boulon », flèches indiquant les points de verrouillage."
      }
    ],
    "historique": [
      {
        "date": "25-22-2022",
        "description": "Point #4 - Ajouter : Vérifier main d'attelage. Point #5 - Ajouter de s'assurer que le compresseur est stable lors de l'accouplement ou du désaccouplement.",
        "par": "S. Tremblay"
      },
      {
        "date": "24-03-2023",
        "description": "Ajout de la partie de déplacement sans la remorque.",
        "par": "S. Tremblay / S. Desrosiers"
      },
      {
        "date": "Décembre 2023",
        "description": "Mise en page et en-têtes.",
        "par": "S. Tremblay"
      }
    ],
    "date_creation": "11 avril 2015",
    "date_revision": "Décembre 2024",
    "source_pdf": "PRO-OP-ITH-003 Procédure de démobilisation de la foreuse ITH et du compresseur avril 2024.pdf",
    "langue_source": "fr",
    "notes": "Procédure de 5 pages signée par Christian St-Amour, directeur des opérations. La numérotation d'origine repart à 1 pour trois blocs distincts (démobilisation foreuse [1-10], démobilisation compresseur [1-7], déplacement sans remorque [1-5]) […]"
  },
  {
    "id": "pro-op-ith-004",
    "code": "PRO-OP-ITH-004",
    "titre": "Forage en longtrou (ITH / CUBEX)",
    "categorie": "Forage",
    "machines": [
      "Foreuse ITH",
      "CUBEX",
      "Surcompresseur (compresseur renforçateur)",
      "Marteau (ITH)",
      "Mât"
    ],
    "resume": "Cette procédure définit les méthodes sécuritaires pour effectuer le forage de production de trous de 3 7/8\" à 6 ½\" : déplacement et positionnement de la foreuse, branchements (électrique, air, eau), inspections et opérations de forage.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour effectuer le forage de production de 3 7/8'' à 6 ½''.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur responsable du forage doit s'assurer d'appliquer cette procédure et de respecter les consignes qui proviennent du département d'ingénierie.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Risque de brûlure : sur CUBEX et surcompresseurs, inspecter les boyaux haute-température (800 °F) et n'utiliser que le type de boyau prescrit.",
      "Inspecter minutieusement raccords et boyaux : collets bien serrés, filets en bon état, aucune anomalie.",
      "Risque de fouettement (whip) : installer un whip check à chaque joint et vérifier le câble métallique et les mécanismes de serrage.",
      "Risque de coincement : en déplaçant la foreuse au-dessus du couvercle de métal de la monterie, éviter qu'il se coince entre les tractions.",
      "Risque de coincement : manipuler les trépans avec attention et évaluer les distances pour les déposer.",
      "Risque d'écaillage : présence possible d'explosifs restants ou non détonnés dans le chantier; rester vigilant.",
      "Risque d'électrisation : manipuler l'extension sous tension uniquement avec le crochet de plastique.",
      "Risque de bris du câble électrique : déceler tout dommage causé par les roches branlantes ou les véhicules motorisés.",
      "Pressuriser les lignes d'eau et d'air avec soin et les inspecter pour déceler des fuites.",
      "Risque d'être happé : quand une pièce bouge, personne entre la console et le mât ni à moins de 1,5 m du mât, de tous les côtés.",
      "Risque de coincement : les boyaux hydrauliques peuvent se coincer au déplacement du mât en rotation; rester en position stable si un effort est requis.",
      "Pousser SANS rotation lors du défoncement de trous.",
      "Avant de manipuler les tiges : gearbox relevée et arrêtée, foreuse au point mort (neutre).",
      "S'assurer que le chariot est stable pour déposer le marteau; prévoir un 2e travailleur pour les trous de 200 pi et plus."
    ],
    "consignes_securite": [
      {
        "regle": "Effectuer une inspection visuelle de l'équipement de forage, de la ventilation, de l'alimentation d'énergie et de la distribution d'eau et d'air avant toute opération.",
        "theme": "Inspection & vérification",
        "source": "Étape 2"
      },
      {
        "regle": "Décharger, inspecter et brancher le câble électrique à la boîte de distribution d'énergie (ground fault box) ; faire appel à un électricien de la compagnie pour reconnecter la rotation du moteur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 3"
      },
      {
        "regle": "Vérifier tous les leviers de commande et les mettre au neutre (point mort) avant de mettre l'unité de forage sous tension.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 4"
      },
      {
        "regle": "Inspecter visuellement les huiles, les jauges et les fuites avant de déplacer l'unité de forage.",
        "theme": "Inspection & vérification",
        "source": "Étape 5"
      },
      {
        "regle": "Sur les CUBEX et les surcompresseurs, porter une attention particulière aux boyaux tressés haute température (800 °F) des compresseurs et n'utiliser que le type de boyau prescrit.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Encadré INSPECTIONS"
      },
      {
        "regle": "Avant de déplacer l'unité à la première ligne de forage, laver la zone à partir des headers, vérifier l'écaillage et inspecter à la recherche d'explosifs restants ou non détonnés.",
        "theme": "Explosifs & terrain",
        "source": "Étape 6"
      },
      {
        "regle": "Ne manipuler l'extension du câble électrique sous tension qu'avec le crochet de plastique.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 7"
      },
      {
        "regle": "Installer des barricades ou des affiches pour aviser les travailleurs des opérations en cours (trous ouverts, forage, etc.).",
        "theme": "Communication & signalisation",
        "source": "Étape 7"
      },
      {
        "regle": "Laisser une distance d'au moins 3 mètres (10 pieds) entre la barricade à l'entrée du chantier et les premières pièces de matériel (toolbox, huile, etc.).",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 7 / Standard de positionnement"
      },
      {
        "regle": "Au point de forage, mettre la foreuse hors tension avec le E-STOP, puis accrocher le câble électrique au mur au niveau de la poitrine (4 à 5 pieds du banc) pour éviter tout contact avec roches branlantes ou véhicules motorisés.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 8"
      },
      {
        "regle": "Souffler les boyaux à air avant connexion et installer les dispositifs de retenue (whip check) à chaque joint ; vérifier l'état du câble métallique et le bon fonctionnement des mécanismes de serrage.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Étapes 9 et 10"
      },
      {
        "regle": "Inspecter minutieusement les raccords et boyaux : collets bien serrés, filets des raccords d'accouplement en bon état, aucune anomalie sur les boyaux.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Encadré « Attention particulière requise » (Étape 10)"
      },
      {
        "regle": "Suspendre tous les boyaux sous le câble électrique ; à défaut, les étendre, les surélever avec bidons ou trépieds en bois et les rendre visibles pour éviter contact et écrasement.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Étapes 12 et 13"
      },
      {
        "regle": "Pressuriser les lignes d'eau et d'air avec soin et les inspecter pour déceler les fuites.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Étape 14"
      },
      {
        "regle": "Positionner la console de la foreuse pour protéger les employés des pièces en mouvement et des projections de roches, et respecter obligatoirement une distance minimale de 1,5 mètre entre le mât et la console.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 15"
      },
      {
        "regle": "Quand une pièce est en mouvement, aucun travailleur ne doit se placer entre la console et le mât, ni à moins de 1,5 mètre du mât de tous les côtés.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 15"
      },
      {
        "regle": "Lors du déplacement de la foreuse au-dessus d'un couvercle de métal sur la monterie, demeurer attentif pour éviter que le couvercle se coince entre les tractions de la foreuse.",
        "theme": "Pièces en mouvement & mât",
        "source": "Encadré (Étape 16)"
      },
      {
        "regle": "Lors du déplacement du mât en rotation, surveiller les boyaux hydrauliques qui peuvent se coincer ; pour les décoincer, revenir en arrière et bouger le mât, et s'assurer d'être en position stable si un effort est nécessaire.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 17"
      },
      {
        "regle": "Lors du défoncement de trous, pousser SANS ROTATION 1 tige de plus que la longueur du défoncement.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 20"
      },
      {
        "regle": "Avant de manipuler les tiges de forage, relever et arrêter la boîte de vitesse et mettre la foreuse à la position neutre (point mort).",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 22"
      },
      {
        "regle": "Pour les trous de plus de 6 ½ po. de diamètre, utiliser le chariot de transport ou la cloche et la chaîne ; s'assurer que le chariot est stable avant d'y déposer le marteau.",
        "theme": "Manutention & levage",
        "source": "Étape 23"
      },
      {
        "regle": "Privilégier la présence d'un 2e travailleur pour le forage et l'arrachement des tiges des trous de 200 pieds et plus ; à défaut, le foreur doit prévoir des pauses.",
        "theme": "Manutention & levage",
        "source": "Étape 23"
      },
      {
        "regle": "Manipuler les trépans avec attention en évaluant les distances pour les déposer afin d'éviter les coincements.",
        "theme": "Outils & clés",
        "source": "Avertissement (page 6)"
      },
      {
        "regle": "Respecter une distance de 7 mètres entre la foreuse et le surcompresseur.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Standard de positionnement des équipements (page 7)"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Diamètre des trous de production visés",
        "valeur": "3 7/8\" à 6 ½\""
      },
      {
        "libelle": "Température des boyaux tressés haute température (compresseurs)",
        "valeur": "800 °F"
      },
      {
        "libelle": "Distance mini barricade ↔ premières pièces de matériel",
        "valeur": "3 mètres (10 pieds)"
      },
      {
        "libelle": "Hauteur d'accrochage du câble électrique au mur",
        "valeur": "4 à 5 pieds du banc (niveau de la poitrine)"
      },
      {
        "libelle": "Diamètre du boyau à air basse pression",
        "valeur": "2 ½ po"
      },
      {
        "libelle": "Diamètre du boyau à air haute pression renforcé",
        "valeur": "2 ½ po"
      },
      {
        "libelle": "Diamètre du boyau à eau",
        "valeur": "1 po"
      },
      {
        "libelle": "Distance mini mât ↔ console",
        "valeur": "1,5 mètre"
      },
      {
        "libelle": "Zone d'exclusion autour du mât (pièce en mouvement)",
        "valeur": "1,5 mètre de tous les côtés"
      },
      {
        "libelle": "Seuil de diamètre pour positionnement manuel des marteaux/forets/tiges",
        "valeur": "moins de 6 1/2 po"
      },
      {
        "libelle": "Seuil de diamètre exigeant chariot ou cloche et chaîne",
        "valeur": "plus de 6 ½ po"
      },
      {
        "libelle": "Profondeur de trou à partir de laquelle un 2e travailleur est privilégié",
        "valeur": "200 pieds et plus"
      },
      {
        "libelle": "Surplus de poussée au défoncement (sans rotation)",
        "valeur": "1 tige de plus que la longueur du défoncement"
      },
      {
        "libelle": "Distance foreuse ↔ surcompresseur",
        "valeur": "7 mètres"
      }
    ],
    "figures": [
      {
        "page": "2",
        "description": "Photo illustrant le type de boyau tressé haute température (800 °F) approuvé pour les compresseurs des CUBEX et surcompresseurs, accompagnant l'encadré INSPECTIONS (« seul le type de boyau tel que présenté ci-dessous doit être utilisé »)."
      },
      {
        "page": "7",
        "description": "Schéma du STANDARD DE POSITIONNEMENT DES ÉQUIPEMENTS montrant la barricade à l'entrée du chantier avec la distance de 3 m (10') à respecter avant les premières pièces de matériel, et indiquant que la distance entre la foreuse et le surcompresseur doit être de 7 mètres."
      }
    ],
    "historique": [
      {
        "date": "3 décembre 2020 / 12 janvier 2023",
        "description": "Ajout du déplacement de la foreuse au-dessus du couvercle entre les points 16 et 17.",
        "par": "S. Tremblay"
      },
      {
        "date": "7 avril 2023 / 19 décembre 2023",
        "description": "Ajout au point #17 de la possibilité de coincement des boyaux hydrauliques et des mesures à prendre si ça survient.",
        "par": "S. Tremblay"
      },
      {
        "date": "10 juin 2024",
        "description": "Ajout de la mise en garde sur les inspections et les boyaux haute-température.",
        "par": "S. Desrosiers"
      },
      {
        "date": "",
        "description": "Ajout de la distance de 3 mètres entre le ruban et les premières pièces de matériel dans le chantier. Ajout fait au point #7 et sur le « STANDARD DE POSITIONNEMENT DES ÉQUIPEMENTS » à la suite de l'événement d'Amaruk.",
        "par": "S. Tremblay / JF Gagnon"
      },
      {
        "date": "",
        "description": "Point #20 : ajout de pousser sans rotation 1 tige de plus après le défoncement du trou.",
        "par": ""
      }
    ],
    "date_creation": "Mars 2002",
    "date_revision": "Mars 2025",
    "source_pdf": "PRO-OP-ITH-004 Procédure de forage production 3.375'' - 6.5'' Juin 2024.pdf",
    "langue_source": "fr",
    "notes": "Document de 7 pages extrait via pdftotext (mode -layout, encodage UTF-8). Pied de page : « Mars 2002 — Révision : Décembre 2023 » (la date de révision apparaît parfois orthographiée « Décembre2023 » sans espace dans le PDF, pages 3 à 6). Le […]"
  },
  {
    "id": "pro-op-ith-005",
    "code": "PRO-OP-ITH-005",
    "titre": "Alésage en descendant sans accès avec la V-30",
    "categorie": "Alésage",
    "machines": [
      "V-30",
      "Foreuse",
      "Compresseur renforçateur (booster)",
      "Surcompresseur",
      "CUBEX",
      "Centralisateur",
      "Marteau",
      "Tête aléseuse V-30"
    ],
    "resume": "Procédure de travail décrivant les méthodes sécuritaires pour effectuer l'alésage en descendant sans accès avec la tête aléseuse V-30, depuis le positionnement de la foreuse jusqu'à l'installation du couvercle d'acier sur la monterie.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour effectuer l'alésage en descendant sans accès avec la tête aléseuse V-30.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur responsable du forage doit s'assurer d'appliquer cette procédure et de respecter les consignes qui proviennent du département d'ingénierie. (Interprétation : Le personnel ayant l'autorité pour l'interprétation de ce document sont le directeur général et le directeur des opérations. Toute demande de modification, révision ou de mise à jour doit être faite auprès d'une de ces personnes.)",
    "epi": [
      "Harnais de sécurité antichute attaché à des points d'ancrage approuvés par le client",
      "Longe restrictive ajustable empêchant l'accès au trou",
      "Harnais avec bloc rétractable",
      "Équipement de protection contre les chutes approuvé par le client"
    ],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Risque de brûlure : inspecter rigoureusement les équipements et n'utiliser que le boyau tressé haute-température (800 °F) prescrit sur les compresseurs.",
      "Inspecter minutieusement raccords et boyaux : collets serrés, filets en bon état, aucune anomalie avant la pression.",
      "Risque de fouettement (whip) : installer un whip check à chaque joint, des stem nuts et dispositifs de retenue à chaque connexion; pressuriser avec soin sans fuites.",
      "Risque d'électrisation : manipuler l'extension sous tension avec le crochet de plastique; baliser avec barricades ou affiches.",
      "Risque de chute : garder le couvert sur la monterie en tout temps; si retiré, s'attacher (longe restrictive ou harnais antichute et bloc rétractable approuvés) à des ancrages approuvés.",
      "Ne jamais entrer dans la monterie de 30 pouces pour récupérer du matériel; utiliser les équipements M.R.I. adaptés.",
      "Risque d'être frappé : ne jamais se tenir dans l'axe de déplacement de la tête si elle se décroche; leviers au neutre avant la mise sous tension.",
      "Vérifier la présence d'explosifs non détonnés dans le chantier avant de déplacer la foreuse.",
      "Risque de projection de roches : garder la console à 1,5 m du mât; aucune circulation en avant de la foreuse pendant le forage.",
      "Risque de coincement : foreuse au neutre (homme mort) avant de manipuler les tiges; attention aux boyaux hydrauliques à la rotation du mât, rester en position stable.",
      "L'aide foreur reste hors de la zone des pièces en mouvement; pousser sans rotation 1 tige de plus que la longueur du défoncement.",
      "Installer le couvert et baliser le trou ouvert (barricade ou affiches) avant tout entretien ou changement de forets.",
      "En cas de bris de tige : arrêter le forage et couper l'alimentation électrique et l'air comprimé (E-STOP); inspecter le câble avant toute manipulation.",
      "Prévoir un 2e travailleur pour les trous de 200 pieds et plus, sinon prévoir des pauses; récupérer la tige avec les contrôles à distance, à l'écart de la foreuse."
    ],
    "consignes_securite": [
      {
        "regle": "Porter une attention particulière aux boyaux tressés haute-température (800 °F) des compresseurs sur les CUBEX et surcompresseurs, et n'utiliser que le type de boyau approuvé.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Avertissement INSPECTIONS"
      },
      {
        "regle": "Décharger, inspecter et brancher le câble électrique à la distribution d'énergie (ground fault box); faire appel à un électricien de la compagnie pour reconnecter la rotation du moteur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 4"
      },
      {
        "regle": "Mettre tous les leviers de commande au neutre avant de mettre l'unité de forage sous tension.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 5"
      },
      {
        "regle": "Inspecter le plancher et les bas de murs pour déceler tout explosif non-détonné avant de déplacer la foreuse à la ligne de forage.",
        "theme": "Explosifs & terrain",
        "source": "Étape 7"
      },
      {
        "regle": "Utiliser le crochet de plastique pour manipuler l'extension lorsqu'elle est sous tension, et installer barricades ou affiches pour aviser les travailleurs.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 8"
      },
      {
        "regle": "Mettre la foreuse hors tension avec le E-STOP au point de forage et accrocher le câble électrique au mur à hauteur de poitrine (4 à 5 pieds du banc).",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 9"
      },
      {
        "regle": "Installer les dispositifs de retenue (whip check) à chaque joint des boyaux d'air et vérifier l'état du câble métallique et des mécanismes de serrage.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Étape 10"
      },
      {
        "regle": "Installer les dispositifs de retenue à chaque connexion du boyau haute pression; ne jamais interchanger les boyaux basse et haute pression (stem nuts).",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Étape 11"
      },
      {
        "regle": "Inspecter minutieusement raccords et boyaux : collets bien serrés, filets en bon état et boyaux sans anomalie.",
        "theme": "Inspection & vérification",
        "source": "Avertissement Attention particulière requise"
      },
      {
        "regle": "Suspendre tous les boyaux sous le câble électrique pour éliminer tout contact avec des roches branlantes ou de l'équipement minier.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Étape 13"
      },
      {
        "regle": "Pressuriser les lignes d'eau et d'air avec soin et les inspecter pour détecter les fuites.",
        "theme": "Inspection & vérification",
        "source": "Étape 15"
      },
      {
        "regle": "Positionner la console de la foreuse à 1,5 mètre du mât pour protéger les travailleurs des projections de roches.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 16"
      },
      {
        "regle": "S'assurer d'être en position stable si un effort est requis pour décoincer les boyaux hydrauliques lors du déplacement du mât en rotation.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 18"
      },
      {
        "regle": "Prévoir un 2e travailleur pour le forage et l'arrachement des tiges des trous de 200 pieds et plus; à défaut, le foreur doit prévoir des pauses.",
        "theme": "Communication & signalisation",
        "source": "Étape 19"
      },
      {
        "regle": "Interdire toute circulation en avant de la foreuse pendant le forage du trou.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 20"
      },
      {
        "regle": "Mettre la foreuse à la position neutre (homme mort) avec la boîte de vitesse relevée et arrêtée avant de manipuler les tiges de forage.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 21"
      },
      {
        "regle": "Lors du défoncement de trous, pousser SANS ROTATION 1 tige de plus que la longueur du défoncement.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 23"
      },
      {
        "regle": "Ne jamais se tenir dans l'axe de déplacement possible de la tête V-30 si elle se décroche, et s'assurer que les contrôles soient en position neutre.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Installation V-30 — NB"
      },
      {
        "regle": "Installer obligatoirement le couvert (M.R.I. ou client) sur la monterie en tout temps lors du forage de V-30 en descendant.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Installation V-30 — Étape 16"
      },
      {
        "regle": "Attacher les employés près de la monterie au moyen d'une longe restrictive ajustable empêchant l'accès au trou, ou d'un harnais avec bloc rétractable approuvé par le client, lorsque le couvert est enlevé ou remis.",
        "theme": "EPI",
        "source": "Installation V-30 — Étape 16/17"
      },
      {
        "regle": "L'aide foreur doit éviter de s'exposer dans la zone des pièces en mouvement lors du guidage de l'opérateur.",
        "theme": "Pièces en mouvement & mât",
        "source": "Installation V-30 — Étape 17c"
      },
      {
        "regle": "Installer le couvert sur le trou avant tout entretien de la tête ou changement de forets.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Installation V-30 — Étape 18"
      },
      {
        "regle": "Porter le harnais de sécurité antichute attaché à des points d'ancrage approuvés par le client si le couvert protecteur doit être enlevé et que les travailleurs s'exposent à une chute.",
        "theme": "EPI",
        "source": "Installation V-30 — Étape 19"
      },
      {
        "regle": "Installer un centralisateur pour stabiliser les tiges lorsque les monteries sont planifiées pour plus de 40 pieds de forage.",
        "theme": "Pièces en mouvement & mât",
        "source": "Installation V-30 — Étape 21"
      },
      {
        "regle": "Interdire strictement à tout employé d'entrer dans la monterie de 30 pouces pour récupérer quoi que ce soit; utiliser les équipements adaptés de M.R.I.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Installation V-30 — encadré après Étape 21"
      },
      {
        "regle": "Installer le couvercle d'acier dès la fin du forage V-30, lors d'une suspension pour trous de production, ou pour effectuer du déblocage, et le laisser en place jusqu'à son retrait par l'équipe de dynamitage de la mine.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Installation V-30 — Étapes 22 et 23"
      },
      {
        "regle": "Installer une barricade et/ou des affiches pour aviser de la condition de trou ouvert lorsque les équipements sont sortis du chantier.",
        "theme": "Communication & signalisation",
        "source": "Installation V-30 — Étape 24"
      },
      {
        "regle": "En cas de bris de tige, arrêter immédiatement le forage et fermer l'interrupteur électrique et l'alimentation en air comprimé.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Bris de tige — a"
      },
      {
        "regle": "Installer une barricade, un ruban rouge et/ou des panneaux ACCÈS INTERDIT à l'entrée du chantier pour empêcher tout accès en cas de bris de tige.",
        "theme": "Communication & signalisation",
        "source": "Bris de tige — b"
      },
      {
        "regle": "Aviser le contremaître et n'effectuer aucun travail de forage avant son arrivée; sa présence est requise jusqu'à la fin de la récupération de la tige.",
        "theme": "Communication & signalisation",
        "source": "Bris de tige — c et e"
      },
      {
        "regle": "Utiliser les contrôles à distance placés dans un endroit sécuritaire éloigné de la foreuse pour toute opération durant la récupération d'une tige brisée.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Bris de tige — f"
      },
      {
        "regle": "Laisser une distance d'au moins 3 mètres (10 pieds) entre la barricade à l'entrée du chantier et les premières pièces de matériel.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 2 / Standard de positionnement"
      },
      {
        "regle": "Maintenir une distance de 7 mètres entre la foreuse et le surcompresseur.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Standard de positionnement des équipements"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Distance mini barricade↔premières pièces de matériel",
        "valeur": "3 mètres (10 pieds)"
      },
      {
        "libelle": "Distance foreuse↔surcompresseur",
        "valeur": "7 mètres"
      },
      {
        "libelle": "Température des boyaux tressés haute-température",
        "valeur": "800 °F"
      },
      {
        "libelle": "Diamètre boyau d'air basse pression",
        "valeur": "2½ po."
      },
      {
        "libelle": "Diamètre boyau d'air haute pression renforci",
        "valeur": "2½ po."
      },
      {
        "libelle": "Diamètre boyau à eau",
        "valeur": "1 po."
      },
      {
        "libelle": "Hauteur d'accrochage du câble électrique au mur",
        "valeur": "4 à 5 pieds du banc (niveau de la poitrine)"
      },
      {
        "libelle": "Distance console foreuse↔mât",
        "valeur": "1,5 mètre"
      },
      {
        "libelle": "Diamètre trou pilote",
        "valeur": "6½ po."
      },
      {
        "libelle": "Diamètre d'alésage pour le centralisateur (nez) V-30",
        "valeur": "10 po."
      },
      {
        "libelle": "Diamètre du trou final (monterie)",
        "valeur": "30 pouces"
      },
      {
        "libelle": "Seuil de présence d'un 2e travailleur (forage/arrachement)",
        "valeur": "200 pieds et plus"
      },
      {
        "libelle": "Distance de positionnement foreuse dans l'axe de la V-30",
        "valeur": "environ 15 pieds"
      },
      {
        "libelle": "Angle d'inclinaison du mât vers l'arrière (installation V-30)",
        "valeur": "environ 60 degrés"
      },
      {
        "libelle": "Chaîne entre gear box et drive shaft",
        "valeur": "grade 80, 12 pieds"
      },
      {
        "libelle": "Profondeur d'entrée de la tête V-30 dans le roc avant installation du couvert",
        "valeur": "environ 6 pieds"
      },
      {
        "libelle": "Diamètre du marteau de déblocage",
        "valeur": "6 pouces"
      },
      {
        "libelle": "Seuil d'installation d'un centralisateur (monterie)",
        "valeur": "plus de 40 pieds"
      }
    ],
    "figures": [
      {
        "page": "2",
        "description": "Photo du type de boyau tressé haute-température (800 °F) approuvé pour les compresseurs des CUBEX et surcompresseurs, accompagnant l'encadré INSPECTIONS."
      },
      {
        "page": "6",
        "description": "Photo du couvert en bois (plancher amovible) installé sur la monterie après l'entrée de la tête V-30 dans le roc."
      },
      {
        "page": "7",
        "description": "Photo du couvert en plastique installé sur l'ouverture de la monterie."
      },
      {
        "page": "8",
        "description": "Photo du couvert (couvercle) en acier installé sur la monterie."
      },
      {
        "page": "11",
        "description": "Schéma du STANDARD DE POSITIONNEMENT DES ÉQUIPEMENTS illustrant la barricade à l'entrée du chantier et la distance de 3 m (10') jusqu'aux premières pièces de matériel, avec la note d'une distance de 7 mètres entre la foreuse et le surcompresseur."
      }
    ],
    "historique": [
      {
        "date": "3 décembre 2020 (3-12-2020)",
        "description": "Ajout de l'obligation de mettre un couvercle de métal sur le trou au point #28.",
        "par": "S. Tremblay"
      },
      {
        "date": "12-02-2021",
        "description": "Changer la tournure de phrase pour l'interdiction d'entrer dans la monterie pour récupérer des pièces, après le point #29.",
        "par": "S. Tremblay"
      },
      {
        "date": "12-01-2023 / 03-2023",
        "description": "Point 2 — Ajouter « S'assurer que les contrôles sont en position neutre ».",
        "par": "S. Tremblay"
      },
      {
        "date": "7 avril 2023",
        "description": "Ajout au point #17 de la possibilité de coincement des boyaux hydrauliques et des mesures à prendre si ça survient ; révision complète de la séquence.",
        "par": "J-F Gagnon, S. Desrosiers, S. Tremblay"
      },
      {
        "date": "19 décembre 2023",
        "description": "Ajout de la mise en garde sur les inspections et les boyaux haute-température.",
        "par": "S. Tremblay"
      },
      {
        "date": "23 avril 2024",
        "description": "Ajout de la distance de 3 mètres entre le ruban et les premières pièces de matériel dans le chantier.",
        "par": "S. Tremblay, JF Gagnon"
      },
      {
        "date": "21 juin 2024",
        "description": "Ajout fait au point #2 et sur le « STANDARD DE POSITIONNEMENT DES ÉQUIPEMENTS » à la suite de l'événement d'Amaruk ; point #16 ajouter 1,5 m et rephraser la fin du point ; ajout #23 de pousser une tige de plus pour le défonçage des trous.",
        "par": "JF Gagnon"
      }
    ],
    "date_creation": "Mars 2002",
    "date_revision": "Avril 2024",
    "source_pdf": "PRO-OP-ITH-005 Procédure d’alésage en descendant sans accès avec la V-30 juin 2024.pdf",
    "langue_source": "fr",
    "notes": "Document de 11 pages extrait via pdftotext -layout (l'outil Read PDF natif a échoué faute de pdftoppm). Vérifié intégralement contre le PDF source (extraction UTF-8). La procédure comporte trois blocs de numérotation distincts : la « PROCÉD […]"
  },
  {
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "avertissements": [
      "Inspecter rigoureusement boyaux et raccords avant le travail : collets serrés, filets en bon état, aucune anomalie.",
      "Risque de brûlure : les boyaux tressés des compresseurs atteignent 800 degrés F, n'utiliser que le type de boyau prescrit.",
      "Conserver les stem nuts des boyaux de 2½ po pour empêcher l'interchange basse/haute pression.",
      "Respecter les distances : 7 m entre la foreuse et le surcompresseur, au moins 3 m (10 pi) entre la barricade et le premier matériel.",
      "Inspecter le chantier pour tout explosif restant ou non détonné avant d'intervenir.",
      "Risque d'électrisation : couper la foreuse (E-STOP) avant d'intervenir et suspendre le câble à 4-5 pi du banc, à l'écart des roches branlantes et des véhicules.",
      "Manipuler l'extension sous tension uniquement avec le crochet de plastique.",
      "Risque de fouettement (whip) : installer un whip check à chaque joint et vérifier le câble métallique et les mécanismes de serrage.",
      "Risque de coincement par les boyaux hydrauliques au mouvement du mât : rester en position stable lors d'un effort.",
      "Porter tout l'EPI requis pour l'affûtage et le façonnement des forets.",
      "Zone d'exclusion : personne en avant de la foreuse pendant le forage, seules les personnes autorisées dans la zone.",
      "Avant toute manipulation des tiges : boîte de vitesse relevée et arrêtée, foreuse au point mort.",
      "Risque d'être frappé ou coincé : stabiliser le chariot avant d'y déposer le marteau et prévoir un 2e travailleur pour les trous de 200 pi et plus.",
      "Au défoncement : pousser sans rotation, 1 tige de plus que la longueur du défoncement.",
      "Communication radio/femco obligatoire entre niveaux supérieur et inférieur, raccord V-30/tige obligatoire.",
      "Risque de chute (trou ouvert au-dessus) : laisser un pilier de couronne en place ou installer et identifier une plaque d'acier.",
      "En cas de bris de tige : arrêt immédiat, couper l'interrupteur électrique et l'air comprimé, barricader; aucun forage avant l'arrivée du contremaître."
    ],
    "categorie": "Alésage",
    "code": "PRO-OP-ITH-006",
    "consignes_securite": [
      {
        "regle": "Décharger, inspecter et brancher le câble électrique à la distribution d'énergie (ground fault box); faire appel à un électricien de la compagnie s'il faut reconnecter la rotation du moteur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 3"
      },
      {
        "regle": "Vérifier que tous les leviers de commande sont au neutre (point mort) avant de mettre l'unité sous tension.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 4"
      },
      {
        "regle": "Avant de déplacer l'unité à la première ligne de forage, laver la zone, vérifier l'écaillage et inspecter pour des explosifs restants ou non détonnés.",
        "theme": "Explosifs & terrain",
        "source": "Étape 6"
      },
      {
        "regle": "Si l'extension doit être manipulée sous tension, utiliser le crochet de plastique.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 7"
      },
      {
        "regle": "Installer des barricades ou des affiches pour aviser les travailleurs des opérations en cours (trous ouverts, forage).",
        "theme": "Communication & signalisation",
        "source": "Étape 7"
      },
      {
        "regle": "Laisser une distance d'au moins 3 mètres (10 pieds) entre la barricade à l'entrée du chantier et les premières pièces de matériel.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 7 / Standard de positionnement"
      },
      {
        "regle": "Mettre la foreuse hors tension en appuyant sur le E-STOP au point de forage.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 8"
      },
      {
        "regle": "Accrocher le câble électrique au mur au niveau de la poitrine (4 à 5 pieds du banc) pour éviter tout contact avec roches branlantes ou véhicules, et faire une inspection visuelle du câble pour déceler un bris.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 8 et 9"
      },
      {
        "regle": "Installer les dispositifs de retenue (whip check) à chaque joint des boyaux d'air et vérifier l'état du câble métallique ainsi que le bon fonctionnement des mécanismes de serrage.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Étape 10"
      },
      {
        "regle": "Installer les dispositifs de retenue à chacune des connexions du boyau à haute pression et inspecter minutieusement raccords et boyaux (collets serrés, filets en bon état, aucune anomalie).",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Étape 11 / Avertissement"
      },
      {
        "regle": "Ne jamais interchanger les boyaux basse et haute pression; les « stem nuts » des boyaux de 2½ po. dia. empêchent cet échange.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Étape 11 (Note)"
      },
      {
        "regle": "Sur les CUBEX et surcompresseurs, porter une attention particulière aux boyaux tressés haute-température (800 degrés F) des compresseurs et n'utiliser que le type de boyau prescrit.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Avertissement INSPECTIONS"
      },
      {
        "regle": "Suspendre tous les boyaux en-dessous du câble électrique pour éliminer tout contact avec roches branlantes ou équipement minier.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Étape 13"
      },
      {
        "regle": "Si la suspension est impossible, étendre câble et boyaux pour éviter écrasement, les soulever du banc (bidons/trépieds en bois) et les marquer (peinture ou banderole) pour les rendre visibles.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 14"
      },
      {
        "regle": "Pressuriser avec soin les lignes d'eau et d'air et les inspecter pour des fuites.",
        "theme": "Inspection & vérification",
        "source": "Étape 15"
      },
      {
        "regle": "Lors du déplacement du mât en rotation, surveiller le coincement des boyaux hydrauliques; pour les décoincer, reculer et bouger le mât, et s'assurer d'être en position stable si un effort est requis.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 17"
      },
      {
        "regle": "Porter tout l'équipement de protection individuel (EPI) requis lors de l'affûtage et du façonnement des forets.",
        "theme": "EPI",
        "source": "Étapes 18 et 26"
      },
      {
        "regle": "Pendant le forage, interdire à toute personne de circuler en avant de la foreuse.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 19"
      },
      {
        "regle": "Pour installer ou enlever les tiges, relever et arrêter la boîte de vitesse et placer la foreuse au point mort avant toute manipulation.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 20"
      },
      {
        "regle": "S'assurer que le chariot de transport est stable avant d'y déposer le marteau; au besoin, transporter le marteau manuellement avec l'aide d'un autre travailleur.",
        "theme": "Manutention & levage",
        "source": "Étape 21"
      },
      {
        "regle": "Privilégier la présence d'un 2e travailleur pour le forage et l'arrachement des tiges des trous de 200 pieds et plus; à défaut, le foreur doit prévoir des pauses.",
        "theme": "Manutention & levage",
        "source": "Étape 21"
      },
      {
        "regle": "Lors du défoncement de trous, pousser SANS ROTATION 1 tige de plus que la longueur du défoncement.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 22"
      },
      {
        "regle": "Disposer d'un moyen de communication (radio ou système femco) fonctionnel aux niveaux supérieur et inférieur lors du raccordement de la tête.",
        "theme": "Communication & signalisation",
        "source": "Raccordement de la tête aux tiges"
      },
      {
        "regle": "Utiliser obligatoirement le raccord situé entre la V-30 et la tige pour empêcher le serrage et permettre le désaccouplement facile.",
        "theme": "Outils & clés",
        "source": "Raccordement de la tête aux tiges"
      },
      {
        "regle": "Utiliser une chaîne de grade 80 (7100 lbs) pour suspendre et positionner la tête V-30.",
        "theme": "Manutention & levage",
        "source": "Raccordement de la tête aux tiges (suggestions a et b)"
      },
      {
        "regle": "Avec la méthode des palans à chaîne, être très vigilant selon l'équipement et la proximité des employés; ancrer les palans à des boulons à œil conformes ou à un anneau conforme scellé à la résine (installation non faite par M.R.I.).",
        "theme": "Manutention & levage",
        "source": "Raccordement de la tête aux tiges (suggestion b)"
      },
      {
        "regle": "N'autoriser que les personnes autorisées dans la zone de travail et signaler la situation de trou ouvert au-dessus à l'entrée du chantier.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 22 (bis) et 29"
      },
      {
        "regle": "Protéger les travailleurs contre le trou en laissant un pilier de couronne en place ou en installant une plaque d'acier identifiée sur le trou.",
        "theme": "Explosifs & terrain",
        "source": "Étape 27"
      },
      {
        "regle": "En cas de bris de tige, arrêter immédiatement le forage, fermer l'interrupteur électrique et l'alimentation en air comprimé, puis barricader l'accès.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 31 (a et b)"
      },
      {
        "regle": "Aviser le contremaître en cas de bris de tige; aucun travail de forage n'est permis avant son arrivée et sa présence est requise jusqu'à la fin de la récupération de la tige.",
        "theme": "Communication & signalisation",
        "source": "Étape 31 (c, d, e)"
      }
    ],
    "date_creation": "Mars 2002",
    "date_revision": "Juin 2024",
    "epi": [
      "Équipement de protection individuel (EPI) requis pour l'affûtage et le façonnement des forets (affûteurs et meules à disques)"
    ],
    "equipements": [],
    "etapes": [],
    "figures": [
      {
        "page": "2 (sous les points 5 et avant le point 6)",
        "description": "Encadré « INSPECTIONS » accompagné d'une illustration du type de boyau tressé haute-température (800 °F) à utiliser sur les CUBEX et surcompresseurs (« seul le type de boyau tel que présenté ci-dessous doit être utilisé »)."
      },
      {
        "page": "8",
        "description": "Schéma « STANDARD DE POSITIONNEMENT DES ÉQUIPEMENTS » : vue du positionnement de la foreuse, du surcompresseur et de la barricade, avec annotations de distances (barricade à 3 m / 10 pieds des premières pièces de matériel, et 7 mètres entre la foreuse et le surcompresseur). Le mot « barricade » est écrit verticalement en marge avec l'indication « 3m (10') »."
      }
    ],
    "historique": [
      {
        "date": "12-02-2021 / 12-01-2023",
        "description": "Point #23 : enlevé la cloison de bois pour protéger les travailleurs lors des maintenances et changement de forêts, et ajouté de sortir la V-30 pour faire ces travaux.",
        "par": "S. Tremblay, S. Desrosiers"
      },
      {
        "date": "7 avril 2023 / 19 décembre 2023",
        "description": "Point #25 : retiré complètement. Il disait d'enlever la cloison de bois.",
        "par": "S. Tremblay, S. Desrosiers"
      },
      {
        "date": "21 juin 2024",
        "description": "Ajout au point #17 de la possibilité de coincement des boyaux hydrauliques et des mesures à prendre si ça survient. Ajout de la mise en garde sur les inspections et les boyaux haute-température. Ajout de la distance de 3 mètres entre le ruban et les premières pièces de matériel dans le chantier (au point #7 et sur le « STANDARD DE POSITIONNEMENT DES ÉQUIPEMENTS ») à la suite de l'événement d'Amaruk. Ajout au #22 de pousser 1 rod de plus lors du défoncement des trous.",
        "par": "S. Tremblay, JF Gagnon"
      }
    ],
    "id": "pro-op-ith-006",
    "langue_source": "fr",
    "machines": [
      "V-30",
      "CUBEX",
      "Surcompresseur",
      "Compresseur renforçateur",
      "Marteau",
      "Chargeuse navette",
      "Camion à flèche"
    ],
    "notes": "La numérotation des étapes comporte des anomalies dans le document original, fidèlement conservées : le numéro « 22 » apparaît deux fois (la première pour le défoncement de trous avant la section « Raccordement de la tête aux tiges », la se […]",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour effectuer l'alésage conventionnel avec la tête de forage V-30.",
    "prerequis": [],
    "responsabilites": "Le travailleur responsable du forage doit s'assurer d'appliquer cette procédure et de respecter les consignes qui proviennent du département d'ingénierie. Le personnel ayant l'autorité pour l'interprétation de ce document sont le directeur général et le directeur des opérations. Toute demande de modification, révision ou de mise à jour doit être faite auprès d'une de ces personnes.",
    "resume": "Procédure définissant les méthodes sécuritaires pour réaliser l'alésage conventionnel d'une monterie avec la tête de forage V-30, depuis le déplacement de l'équipement jusqu'au raccordement de la tête et la gestion des bris de tiges.",
    "source_pdf": "PRO-OP-ITH-006 Procédure d'alésage conventionnel avec la V-30 juin 2024.pdf",
    "titre": "Alésage conventionnel avec la tête de forage V-30",
    "valeurs_cles": [
      {
        "libelle": "Température des boyaux tressés haute-température (compresseurs)",
        "valeur": "800 degrés F"
      },
      {
        "libelle": "Distance mini barricade ↔ premières pièces de matériel",
        "valeur": "3 mètres (10 pieds)"
      },
      {
        "libelle": "Distance foreuse ↔ surcompresseur",
        "valeur": "7 mètres"
      },
      {
        "libelle": "Hauteur d'accrochage du câble électrique au mur (niveau poitrine)",
        "valeur": "4 à 5 pieds du banc"
      },
      {
        "libelle": "Diamètre du boyau à air basse pression",
        "valeur": "2½ po."
      },
      {
        "libelle": "Diamètre du boyau à haute pression renforci",
        "valeur": "2½ po."
      },
      {
        "libelle": "Diamètre du boyau à eau",
        "valeur": "1 po."
      },
      {
        "libelle": "Diamètre du trou pilote",
        "valeur": "6½ po."
      },
      {
        "libelle": "Diamètre d'alésage pour accepter le guide de la V-30",
        "valeur": "10 po."
      },
      {
        "libelle": "Diamètre final de la monterie",
        "valeur": "30 po."
      },
      {
        "libelle": "Seuil de longueur de trou exigeant un 2e travailleur (privilégié)",
        "valeur": "200 pieds et plus"
      },
      {
        "libelle": "Défoncement : tiges à pousser sans rotation",
        "valeur": "1 tige de plus que la longueur du défoncement"
      },
      {
        "libelle": "Grade et capacité de la chaîne de levage",
        "valeur": "Grade 80 (7100 lbs)"
      }
    ]
  },
  {
    "id": "pro-op-ith-007",
    "code": "PRO-OP-ITH-007",
    "titre": "Alésage ascendant sans accès avec la tête V-30",
    "categorie": "Alésage",
    "machines": [
      "V-30",
      "ITH",
      "Foreuse",
      "Surcompresseur",
      "Compresseur renforçateur",
      "CUBEX",
      "Marteau (ITH)",
      "Centralisateur"
    ],
    "resume": "Cette procédure définit les méthodes sécuritaires pour réaliser l'alésage ascendant (agrandissement d'une monterie sans accès) à l'aide de la tête de forage V-30 montée sur le mât de la foreuse.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour effectuer l'alésage ascendant avec la tête de forage V-30.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur responsable du forage doit s'assurer d'appliquer cette procédure et de respecter les consignes qui proviennent du département d'ingénierie. (Interprétation : le personnel ayant l'autorité pour l'interprétation de ce document est le directeur des opérations. Toute demande de modification, révision ou de mise à jour doit être faite auprès de cette personne.)",
    "epi": [
      "Masque respiratoire (lors du soufflage des déblais de forage)"
    ],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Risque de brûlure : inspecter rigoureusement les équipements et n'utiliser que les boyaux tressés haute-température prescrits (800 °F) sur les compresseurs.",
      "Inspecter minutieusement raccords et boyaux : collets serrés, filets en bon état, aucune anomalie avant la pressurisation.",
      "Risque d'être frappé : ne jamais se tenir dans l'axe de déplacement de la tête; garder les contrôles au neutre.",
      "Faire une analyse de risque avant toute opération à distance pour récupérer une tige brisée.",
      "Risque d'électrisation : ne brancher qu'après déchargement et inspection; appeler un électricien si la rotation du moteur est inversée.",
      "Mettre tous les leviers de commande au neutre avant la mise sous tension.",
      "Risque d'explosion : inspecter le chantier pour explosifs restants ou non détonnés avant de déplacer l'unité.",
      "Manipuler l'extension sous tension uniquement avec le crochet de plastique obligatoire.",
      "Mettre la foreuse à l'E-STOP avant d'accrocher le câble; le suspendre à 4-5 pi du plancher, loin des roches branlantes et véhicules.",
      "Risque de fouettement (whip) : installer un whip check à chaque joint d'air comprimé; vérifier câble métallique et serrage avant pressurisation.",
      "Ne pas interchanger les stem nuts entre basse et haute pression.",
      "Suspendre les boyaux sous le câble électrique pour éviter tout contact avec roches branlantes et équipement minier.",
      "Risque de coincement : adopter une position stable pour décoincer les boyaux hydrauliques d'un mât en rotation.",
      "Risque de blessure (effort physique) : stabiliser le chariot et demander de l'aide au-delà de 200 pi de manutention.",
      "Risque de projection de débris : garder la cage de protection en place pour les canaliser loin de l'opérateur.",
      "Zone d'exclusion : aucune circulation à moins de 5 m du mât pendant le forage.",
      "Gear box abaissé et arrêté, foreuse au point mort avant toute manipulation des tiges.",
      "Garder les accès libres en tout temps (ni boyaux, casing ni roche).",
      "Respecter la hauteur plancher-toit de 12 à 14 pi; au-delà de 4,3 m (14 pi), relever le plancher avec de la roche abattue.",
      "Risque de bris d'actuateur : respecter la distance de 2 à 4 pi entre tables et collet de trou pour bien répartir les charges.",
      "Maintenir 7 m entre la foreuse et le compresseur.",
      "Risque de projection de roche : positionner la commande à 5 m du point de forage.",
      "Levage : utiliser une chaîne de grade 80 de 12 pi entre le gear box et le drive shaft.",
      "Installer des centralisateurs aux 40 pi au-delà de 40 pi de monterie pour stabiliser les tiges.",
      "Ne pas s'exposer sous le trou de la V-30 lors du soufflage; porter un masque.",
      "Avant de retirer une roche à la main, retirer la V-30 et éloigner la foreuse pour ne pas s'exposer.",
      "Risque de chute : baliser et aviser la compagnie pour sécuriser un trou ouvert au toit.",
      "Risque de chute de roches : durant l'entretien, rester à 5 m de la ligne de forage et hors de la ligne de tir de la monterie.",
      "Bris de tige : arrêt immédiat, couper l'alimentation électrique ET l'air comprimé, barricader l'accès; aucun forage avant l'arrivée du superviseur."
    ],
    "consignes_securite": [
      {
        "regle": "Décharger, inspecter et brancher le câble électrique à la distribution d'énergie (ground fault box); faire appel à un électricien de la mine si la rotation du moteur est inversée.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Mesure de sécurité 3"
      },
      {
        "regle": "Mettre tous les leviers de commande au neutre avant de mettre l'unité sous tension.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Mesure de sécurité 4"
      },
      {
        "regle": "Mettre la foreuse hors tension avec le E-STOP au point de forage avant d'accrocher le câble; le suspendre au mur au niveau de la poitrine (4 à 5 pieds du plancher).",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Mesure de sécurité 10"
      },
      {
        "regle": "Manipuler toute extension de câble sous tension uniquement avec le crochet de plastique.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Mesure de sécurité 8"
      },
      {
        "regle": "Lors d'un bris de tige, fermer immédiatement l'interrupteur électrique et l'alimentation en air comprimé avant toute intervention.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Procédure bris de tige, point 1"
      },
      {
        "regle": "Porter une attention particulière aux boyaux tressés haute-température (800 °F) des compresseurs et n'utiliser que le type de boyau approuvé.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Avertissement INSPECTIONS"
      },
      {
        "regle": "Installer un dispositif de retenue (whip check) à chaque joint des boyaux d'air et inspecter l'état du câble métallique et le serrage avant pressurisation.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Mesures de sécurité 11 et 12"
      },
      {
        "regle": "Ne pas interchanger les boyaux basse et haute pression : les stem nuts des boyaux de 2½ po sont conçus pour empêcher leur interchangeabilité.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Mesure de sécurité 12"
      },
      {
        "regle": "Inspecter minutieusement raccords et boyaux : collets bien serrés, filets en bon état, aucune anomalie sur les boyaux.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Mesure de sécurité 13 (Attention particulière requise)"
      },
      {
        "regle": "Pressuriser les lignes d'eau et d'air avec soin et les inspecter pour détecter les fuites.",
        "theme": "Air comprimé & boyaux (whip check, haute/basse pression, boyaux haute température)",
        "source": "Mesure de sécurité 17"
      },
      {
        "regle": "Interdire à toute personne de circuler à moins de 5 mètres du mât de la foreuse pendant le forage.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Mesure de sécurité 21"
      },
      {
        "regle": "Positionner la commande de forage à 5 mètres du point de forage pour être à l'abri des projections de roche.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Procédure, point 8"
      },
      {
        "regle": "Lors de l'entretien de la V-30 ou de la récupération d'une tige, le travailleur (ou la manette de contrôle à distance) doit être à 5 mètres de la ligne de forage et hors de la ligne de tir de chutes de la monterie.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Entretien V-30 point 5 / Bris de tige point 6"
      },
      {
        "regle": "Maintenir une distance de 7 mètres entre la foreuse et le compresseur (surcompresseur).",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Procédure, point 6"
      },
      {
        "regle": "Laisser au moins 3 mètres (10 pieds) entre la barricade à l'entrée du chantier et les premières pièces de matériel.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Mesure de sécurité 9 / Standard de positionnement"
      },
      {
        "regle": "Ne jamais se tenir dans l'axe de déplacement possible de la tête V-30 si elle se décroche, et s'assurer que les contrôles sont en position neutre durant l'installation.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Avertissement Installation V-30"
      },
      {
        "regle": "Transporter le marteau à l'aide du chariot de transport stable; demander l'aide d'un 2e travailleur si le chariot n'est pas disponible, et d'un aide-foreur pour les trous de 200 pieds et plus.",
        "theme": "Manutention & levage",
        "source": "Mesure de sécurité 19"
      },
      {
        "regle": "Utiliser une chaîne de grade 80 de 12 pieds entre le gear box de la foreuse et le drive shaft de la V-30 lors du hissage.",
        "theme": "Manutention & levage",
        "source": "Installation V-30, point 4"
      },
      {
        "regle": "Faire une inspection visuelle de l'équipement de forage, de la ventilation, de l'alimentation d'énergie, de la distribution d'eau et d'air, ainsi que des huiles, jauges et fuites avant tout déplacement.",
        "theme": "Inspection & vérification",
        "source": "Mesures de sécurité 2 et 5"
      },
      {
        "regle": "Inspecter visuellement l'état du câble électrique en le suspendant.",
        "theme": "Inspection & vérification",
        "source": "Mesure de sécurité 10"
      },
      {
        "regle": "Après un bris de tige, retirer et vérifier toutes les autres tiges; étiqueter et retourner la tige brisée au fournisseur; remplir un rapport d'incident.",
        "theme": "Inspection & vérification",
        "source": "Procédure bris de tige, points 7, 9 et 10"
      },
      {
        "regle": "Installer des barricades ou affiches pour aviser les travailleurs des opérations en cours (trous ouverts, forage); aviser la compagnie d'une condition de trou ouvert au toit.",
        "theme": "Communication & signalisation",
        "source": "Mesure de sécurité 9 / Déblais point 5"
      },
      {
        "regle": "Lors d'un bris de tige, aviser le superviseur; aucun forage n'est permis avant son arrivée, et sa présence est requise jusqu'à la fin de la récupération de la tige.",
        "theme": "Communication & signalisation",
        "source": "Procédure bris de tige, points 3 et 5"
      },
      {
        "regle": "Effectuer une analyse de risque avant d'opérer la foreuse à distance pour récupérer une tige brisée.",
        "theme": "Communication & signalisation",
        "source": "Procédure bris de tige, point 6"
      },
      {
        "regle": "Abaisser et arrêter le gear box et mettre la foreuse au point mort (position neutre) avant de manipuler les tiges de forage.",
        "theme": "Pièces en mouvement & mât",
        "source": "Mesure de sécurité 22"
      },
      {
        "regle": "Lors du déplacement du mât en rotation, surveiller les boyaux hydrauliques susceptibles de se coincer et adopter une position stable pour les décoincer.",
        "theme": "Pièces en mouvement & mât",
        "source": "Mesure de sécurité 18"
      },
      {
        "regle": "Garder libres en tout temps les accès séparant les contrôles, le mât et le support à tige (pas de boyaux, casing ni roche).",
        "theme": "Pièces en mouvement & mât",
        "source": "Mesure de sécurité 24"
      },
      {
        "regle": "Installer des centralisateurs aux 40 pieds lorsque la monterie dépasse 40 pieds pour stabiliser les tiges.",
        "theme": "Pièces en mouvement & mât",
        "source": "Installation V-30, point 15"
      },
      {
        "regle": "Laver la zone de travail, vérifier l'écaillage et inspecter le chantier pour des explosifs restants ou non détonnés avant de déplacer l'unité à la première ligne de forage.",
        "theme": "Explosifs & terrain",
        "source": "Mesure de sécurité 6"
      },
      {
        "regle": "Interrompre les travaux au besoin pour écailler ou purger puis sécuriser la cage de protection.",
        "theme": "Explosifs & terrain",
        "source": "Mesure de sécurité 7"
      },
      {
        "regle": "Installer la cage de protection à grillage à mailles soudées pour canaliser les débris loin de l'opérateur; nettoyer déflecteurs et grillages avant de s'exposer en dessous.",
        "theme": "Pièces en mouvement & mât",
        "source": "Mesures de sécurité 20 et 25 / Déblais point 3"
      },
      {
        "regle": "Porter un masque lors du soufflage des déblais de forage et ne pas s'exposer directement sous le trou de la V-30.",
        "theme": "EPI",
        "source": "Déblais de forage, point 1"
      },
      {
        "regle": "Privilégier l'utilisation de l'eau pour retirer une roche des tables; si l'eau est insuffisante, retirer la V-30 et éloigner la foreuse avant d'enlever la roche manuellement.",
        "theme": "Eau & ventilation",
        "source": "Déblais de forage, point 2"
      },
      {
        "regle": "Maintenir une hauteur plancher-toit entre 12 et 14 pieds (max 4,3 m); au-delà de 4,3 m (14 pi), relever le plancher avec de la roche abattue.",
        "theme": "Explosifs & terrain",
        "source": "Procédure, points 1 et 2"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Distance d'exclusion autour du mât pendant le forage",
        "valeur": "5 m"
      },
      {
        "libelle": "Distance de la commande de forage au point de forage",
        "valeur": "5 m"
      },
      {
        "libelle": "Distance travailleur/manette à la ligne de forage (entretien et bris de tige)",
        "valeur": "5 m"
      },
      {
        "libelle": "Distance foreuse ↔ compresseur (surcompresseur)",
        "valeur": "7 m"
      },
      {
        "libelle": "Distance mini barricade ↔ premières pièces de matériel",
        "valeur": "3 m (10 pieds)"
      },
      {
        "libelle": "Hauteur d'accrochage du câble électrique au mur",
        "valeur": "4 à 5 pieds du plancher (niveau de la poitrine)"
      },
      {
        "libelle": "Température des boyaux tressés haute-température des compresseurs",
        "valeur": "800 °F"
      },
      {
        "libelle": "Diamètre du boyau à air basse pression",
        "valeur": "2½ po"
      },
      {
        "libelle": "Diamètre du boyau à haute pression renforci",
        "valeur": "2½ po"
      },
      {
        "libelle": "Diamètre du boyau à eau",
        "valeur": "1 po"
      },
      {
        "libelle": "Diamètre du trou pilote",
        "valeur": "6½ po"
      },
      {
        "libelle": "Diamètre d'alésage pour accepter le guide de la V-30",
        "valeur": "10½ po"
      },
      {
        "libelle": "Diamètre final de l'alésage (monterie)",
        "valeur": "30 po"
      },
      {
        "libelle": "Hauteur plancher-toit requise",
        "valeur": "12 à 14 pieds (max 4,3 m / 14 pi)"
      },
      {
        "libelle": "Mesure entre la slip plate et le bout des taillants",
        "valeur": "7 pieds et 6 pouces"
      },
      {
        "libelle": "Distance maxi entre les tables du mât et le collet de trou",
        "valeur": "2 à 4 pieds"
      },
      {
        "libelle": "Diamètre nécessitant le transport du marteau au chariot",
        "valeur": "plus de 6½ po"
      },
      {
        "libelle": "Longueur de trou nécessitant l'assistance d'un aide-foreur",
        "valeur": "200 pieds et plus"
      },
      {
        "libelle": "Intervalle d'installation des centralisateurs (monterie > 40 pi)",
        "valeur": "aux 40 pieds"
      },
      {
        "libelle": "Distance foreuse ↔ V-30 lors de l'installation",
        "valeur": "environ 15 pieds"
      },
      {
        "libelle": "Angle d'inclinaison du mât vers l'arrière pour l'installation",
        "valeur": "environ 60 degrés"
      },
      {
        "libelle": "Profondeur d'entrée de la tête V-30 dans le roc avant pose de la cage",
        "valeur": "approx. 6 pieds"
      },
      {
        "libelle": "Chaîne entre gear box et drive shaft",
        "valeur": "grade 80, 12 pieds"
      }
    ],
    "figures": [
      {
        "page": "2",
        "description": "Encadré INSPECTIONS avec l'image du type de boyau tressé haute-température (800 °F) approuvé à utiliser sur les compresseurs (CUBEX et surcompresseurs); repère « a. » sous l'image."
      },
      {
        "page": "11",
        "description": "STANDARD DE POSITIONNEMENT DES ÉQUIPEMENTS : schéma de positionnement indiquant la distance de 7 mètres entre la foreuse et le surcompresseur, et la distance d'au moins 3 m (10') entre la barricade à l'entrée du chantier et les premières pièces de matériel."
      },
      {
        "page": "12",
        "description": "CAGE DE PROTECTION #1 : photo/illustration d'un modèle de cage de protection à grillage."
      },
      {
        "page": "13",
        "description": "CAGE DE PROTECTION #2 : photo/illustration d'un second modèle de cage de protection à grillage."
      }
    ],
    "historique": [
      {
        "date": "12-02-2021",
        "description": "Point 2 - Ajouter : S'assurer que les contrôles sont en position neutre.",
        "par": "S. Tremblay"
      },
      {
        "date": "16-06-2022",
        "description": "Replacé les numéros de séquences à partir du point 23.",
        "par": "S. Tremblay"
      },
      {
        "date": "16-06-2022",
        "description": "Au point #25 (anciennement #28) ajout du nettoyage des déflecteurs et grillages avant de s'exposer.",
        "par": "S. Tremblay"
      },
      {
        "date": "16-06-2022",
        "description": "Ajout # 28 affûtages de bits.",
        "par": "S. Tremblay"
      },
      {
        "date": "16-06-2022",
        "description": "Assimiler version française et anglaise pour qu'elles soient pareilles.",
        "par": "S. Tremblay"
      },
      {
        "date": "12-02-2023",
        "description": "Ajouts de photos comme exemple de cage de grillage.",
        "par": "S. Tremblay"
      },
      {
        "date": "26-01-2023",
        "description": "Ajout au point #17 de la possibilité de coincement des boyaux hydrauliques et des mesures à prendre si ça survient.",
        "par": "S. Tremblay"
      },
      {
        "date": "",
        "description": "Révision complète.",
        "par": "S. Desrosiers, JF Gagnon"
      },
      {
        "date": "7 avril 2023",
        "description": "Ajout de la mise en garde sur les inspections et les boyaux haute-température.",
        "par": "S. Tremblay"
      },
      {
        "date": "11 octobre 2023",
        "description": "Ajout dans la partie déblais de forage des mesures à prendre si des roches doivent être retirées sur la foreuse.",
        "par": "S. Tremblay, D. Baribeault"
      },
      {
        "date": "19 décembre 2023",
        "description": "Ajout de la distance de 3 mètres entre le ruban et les premières pièces de matériel dans le chantier. Ajout fait au point #7 et sur le « STANDARD DE POSITIONNEMENT DES ÉQUIPEMENTS » à la suite de l'événement d'Amaruk.",
        "par": "S. Tremblay, S. Desrosiers"
      },
      {
        "date": "23 avril 2024",
        "description": "Réaménager pour que les procédures en français et en anglais soient pareilles.",
        "par": "S. Tremblay"
      },
      {
        "date": "31 octobre 2024",
        "description": "Ajout du point 1-b. sur la distance maximale de 2 à 4 pieds entre la table et le collet du trou. Suite à un bris d'actuateur.",
        "par": "D. Baribeault, JF Gagnon"
      }
    ],
    "date_creation": "Mars 2002",
    "date_revision": "Octobre 2024",
    "source_pdf": "PRO-OP-ITH-007 Alésage ascendant  V-30 octobre 2024.pdf",
    "langue_source": "fr",
    "notes": "Document signé par Christian St-Amour, Directeur des Opérations. Le pied de page indique « Page X sur 13 », mais le fichier PDF physique compte 11 pages : les sections finales (STANDARD DE POSITIONNEMENT, CAGE DE PROTECTION #1 et #2) occupe […]"
  },
  {
    "id": "pro-op-ith-008",
    "code": "PRO-OP-ITH-008",
    "titre": "Procédures à suivre lorsqu'un taillant de la V-30 se brise dans un trou descendant",
    "categorie": "Intervention",
    "machines": [
      "V-30"
    ],
    "resume": "Marche à suivre sécuritaire lorsqu'un taillant de la foreuse V-30 se brise ou que des outils tombent au fond d'un trou descendant (monterie). On récupère la pièce brisée à l'aide d'un racloir de monterie, sans jamais descendre soi-même au fond.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour effectuer le défonçage de trous sous terre.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur responsable du forage doit s'assurer d'appliquer cette procédure et de respecter les consignes qui proviennent du département d'ingénierie.",
    "epi": [
      "Harnais de sécurité",
      "Cordon d'attache relié à un ancrage ou à une ligne de vie"
    ],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Risque de chute : interdiction stricte de descendre au fond de la monterie pour récupérer pièces, outils ou taillants échappés.",
      "Risque de chute dans la monterie : porter le harnais et s'attacher à un ancrage ou une ligne de vie avant d'enlever le couvercle.",
      "Rester attaché à l'ancrage ou à la ligne de vie pendant toute la durée du retrait du couvercle."
    ],
    "consignes_securite": [
      {
        "regle": "Ne jamais descendre au fond de la monterie pour dégager ou récupérer des pièces métalliques, des outils, des taillants ou tout autre équipement : cette interdiction s'applique à quiconque et en tout temps.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Méthode (avertissement en rouge)"
      },
      {
        "regle": "Porter un harnais et s'attacher à un ancrage ou à une ligne de vie avant d'enlever le couvercle de la monterie.",
        "theme": "EPI",
        "source": "Étape 2"
      },
      {
        "regle": "Demeurer attaché à un ancrage ou à une ligne de vie durant tous les travaux de manipulation du couvercle et tant que le couvercle est retiré de la monterie.",
        "theme": "EPI",
        "source": "Avertissement IMPORTANT"
      },
      {
        "regle": "Récupérer le taillant ou les pièces brisées au fond de la monterie uniquement à l'aide du racloir de monterie (raise scraper) conçu à cet effet.",
        "theme": "Outils & clés",
        "source": "Étapes 4 à 9"
      },
      {
        "regle": "Remettre le couvercle sur la monterie entre les manipulations du racloir et couvrir la monterie de façon sécuritaire une fois les travaux terminés.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étapes 3, 7 et 10"
      },
      {
        "regle": "Avertir le superviseur de la mine lorsqu'un taillant brisé demeure présent et que l'accès au niveau inférieur n'est pas possible pour le récupérer.",
        "theme": "Communication & signalisation",
        "source": "Étape 12"
      },
      {
        "regle": "Sortir la V-30 de la monterie en enlevant les tiges de forage avant d'entreprendre la récupération du taillant brisé.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 1"
      }
    ],
    "valeurs_cles": [],
    "figures": [
      {
        "page": "1",
        "description": "Logo de MACHINES ROGER INTERNATIONAL (en-tête) et logo rond de gestion (cycle Inspection / Planification / Décision / Exécution) en haut de la page."
      },
      {
        "page": "2",
        "description": "Signature manuscrite de Christian St-Amour, Directeur des opérations, au bas de la procédure."
      }
    ],
    "historique": [],
    "date_creation": "31 Octobre 2006",
    "date_revision": "Octobre 2018",
    "source_pdf": "PRO-OP-ITH-008 Procédure suite au bris d’un taillant de la V-30 dans un trou 10-2018.pdf",
    "langue_source": "fr",
    "notes": "Document de 2 pages. La page de titre (en-tête) porte « Date : 31 Octobre 2006 / Révision : Octobre 2018 », alors que le pied de page de la page 2 indique encore « Révision : Juin 2008 » (incohérence de version dans le document original ; l […]"
  },
  {
    "id": "pro-op-ith-012",
    "code": "PRO-OP-ITH-012",
    "titre": "Procédure de forage à distance avec foreuse ITH",
    "categorie": "Forage",
    "machines": [
      "ITH",
      "CUBEX"
    ],
    "resume": "Cette procédure définit des méthodes sécuritaires pour effectuer du forage à distance avec une foreuse ITH, en commandant la foreuse à distance, en évacuant la zone de forage et en barricadant tous les accès.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour le forage à distance avec une foreuse ITH.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL (MRI). Le forage à distance doit être décidé par l'ingénierie du client en fonction des dangers pouvant être présents lors du forage. Le foreur ou la supervision de MRI sont invités à proposer le forage à distance s'il le considère davantage sécuritaire que le forage conventionnel. L'article 440 du Règlement sur la Santé et la Sécurité du travail dans les Mines prévoit : 440. Malgré l'article 439, des trous peuvent être forés à des distances moindres que celles prévues à cet article pourvu que le forage soit exécuté au moyen d'un dispositif de commande à distance sous surveillance et que la zone de forage soit évacuée. Cette procédure vient encadrer les travaux de forage à distance.",
    "responsabilites": "LE FOREUR : Le foreur doit appliquer la procédure de forage à distance selon les exigences proposées par le client. Il doit respecter toutes les procédures entourant le forage avec une CUBEX ou tout autre équipement. Cette procédure est le minimum demandé par Machines Roger International. LE SUPERVISEUR MRI : Le superviseur MRI doit s'assurer de l'application de cette procédure ainsi que du respect du plan et devis de l'ingénierie du client. Il doit aussi participer à toute analyse de risque demandée par nous ou par le client. INGÉNIERIE DU CLIENT : L'Ingénierie responsable du forage doit émettre des plans et devis de forage à distance. Ces plans et devis doivent prendre en considération les risques associés à ce type de forage. L'ingénierie du client doit être l'initiateur, si une analyse de risque est nécessaire, où minimalement participer à cette analyse de risque. OPÉRATIONS SOUS-TERRE : Le département des opérations sous-terre doit exiger l'application de cette procédure. Il doit aussi participer à la mise en place des travaux en collaboration avec MRI et l'ingénierie, en plus de participer à toute analyse de risque. INTERPRÉTATION : Le personnel ayant l'autorité pour l'interprétation de ce document est le directeur des opérations. Toute demande de modification, révision ou de mise à jour doit être faite auprès d'une de ces personnes.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Risque d'explosion : forer seulement avec commande à distance sous surveillance et zone de forage évacuée (article 440).",
      "Risque d'être frappé par le sautage : ne jamais se tenir dans la ligne de sautage; rester du côté de la sortie, accès dégagé.",
      "Demeurer dans la zone sécuritaire en tout temps pendant le forage.",
      "Risque d'explosion : si de l'explosif sort du trou, arrêter immédiatement la foreuse et aviser le superviseur.",
      "Trou dynamité à l'ANFO (amex) : mettre de l'eau dans les tiges pour réduire le risque d'explosion."
    ],
    "consignes_securite": [
      {
        "regle": "Installer le système de commande à distance à un minimum de 50' (15 mètres) entre le foreur et le trou à forer.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 2"
      },
      {
        "regle": "Le foreur et l'aide-foreur doivent se positionner vers la sortie en s'assurant que rien ne bloque l'accès.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 2a"
      },
      {
        "regle": "Ne jamais se tenir dans la ligne de sautage.",
        "theme": "Explosifs & terrain",
        "source": "Étape 2b"
      },
      {
        "regle": "Se placer derrière une protection (galerie perpendiculaire, équipement ou amas de roche) si le client l'exige.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 2c"
      },
      {
        "regle": "Barricader tous les accès aux lieux de forage par une clôture (selon les exigences du client) ou les faire garder par un travailleur.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 3"
      },
      {
        "regle": "Apposer sur la clôture une signalisation indiquant le type de travaux (ACCÈS INTERDIT, FORAGE EN COURS, FORAGE À DISTANCE).",
        "theme": "Communication & signalisation",
        "source": "Étape 4"
      },
      {
        "regle": "Placer la procédure dans un sac étanche sur les clôtures de tous les accès et la faire signer par le foreur ayant visité ces endroits avant le début du forage, au début de chaque quart.",
        "theme": "Inspection & vérification",
        "source": "Étape 5"
      },
      {
        "regle": "Pour toute visite des lieux de forage, contacter l'opérateur par radio; à défaut, le foreur se déplace vers les visiteurs si un contact visuel est possible.",
        "theme": "Communication & signalisation",
        "source": "Étape 6"
      },
      {
        "regle": "Le foreur et l'aide-foreur doivent rester en tout temps dans la zone sécuritaire pendant le forage.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 7"
      },
      {
        "regle": "Lors du déblocage, surveiller le matériel qui sort du trou; en cas de présence d'explosif, arrêter l'opération avec la foreuse et aviser le superviseur.",
        "theme": "Explosifs & terrain",
        "source": "Étape 8"
      },
      {
        "regle": "Lors du déblocage d'un trou dynamité avec amex (ANFO), mettre de l'eau dans les tiges de forage pour diminuer le risque d'explosion.",
        "theme": "Explosifs & terrain",
        "source": "Étape 9"
      },
      {
        "regle": "S'assurer que la zone de forage est évacuée et que la foreuse est exécutée au moyen d'un dispositif de commande à distance sous surveillance.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Avertissement (article 440)"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Distance minimale foreur ↔ trou (système à distance)",
        "valeur": "50' (15 mètres)"
      },
      {
        "libelle": "Référence réglementaire",
        "valeur": "Article 440 du Règlement sur la Santé et la Sécurité du travail dans les Mines"
      },
      {
        "libelle": "Fréquence de signature de la procédure sur les barricades",
        "valeur": "Avant le début du forage, au début de chaque quart de travail"
      }
    ],
    "figures": [
      {
        "page": "1",
        "description": "Logo de MACHINES ROGER INTERNATIONAL (en-tête) et logo circulaire de gestion SST (cycle Inspection / Planification / Décision / Exécution)."
      }
    ],
    "historique": [
      {
        "date": "18-11-2022",
        "description": "Ajouter les raisons possibles pour le forage à distance dans l'application",
        "par": "S. Tremblay"
      },
      {
        "date": "18-11-2022",
        "description": "Ajout des points 8 et 9",
        "par": "S. Tremblay"
      }
    ],
    "date_creation": "Septembre 2019",
    "date_revision": "Novembre 2022",
    "source_pdf": "PRO-OP-ITH-012 Procédure de forage à distance avec foreuse ITH.pdf",
    "langue_source": "fr",
    "notes": "Document de 4 pages. La page 4 est une « Feuille de signatures des barricades lors du forage à distance » à remplir (nom en lettres moulées, signature, date, Nuit/Jour, heure) pour chaque visite/quart ; elle comporte 9 blocs de signature. L […]"
  },
  {
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "avertissements": [
      "Risque de coincement : ne jamais placer une partie du corps sous les tables tant que le marteau n'est pas monté au-dessus des tables et que la slip plate n'est pas fermée.",
      "Respecter en tout temps une distance minimale de 1,5 m entre le mât et la console.",
      "Risque d'être coincé ou frappé : quand une pièce bouge, ne jamais se placer entre la console et le mât, ni à moins de 1,5 m du mât, de tous les côtés.",
      "Risque de trébuchement : garder les trajets de circulation dégagés des tubages qui dépassent du plancher.",
      "Vérifier régulièrement le dépassement des tubages : il peut augmenter avec l'accumulation de boue de forage."
    ],
    "categorie": "Installation",
    "code": "PRO-OP-ITH-014",
    "consignes_securite": [
      {
        "regle": "Ne jamais positionner une partie de son corps sous les tables si le marteau n'est pas monté au-delà des tables et que la slip-plate n'est pas fermée.",
        "theme": "Pièces en mouvement & mât",
        "source": "Avertissement (étapes 3c et 3k)"
      },
      {
        "regle": "Respecter obligatoirement une distance minimum de 1,5 mètre entre le mât et la console.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Avertissement (étapes 3c et 3k)"
      },
      {
        "regle": "Quand une pièce est en mouvement, ne jamais se placer entre la console et le mât, ni à moins de 1,5 mètre du mât de tous les côtés.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Avertissement (étapes 3c et 3k)"
      },
      {
        "regle": "Avant de procéder au nettoyage, monter le marteau au-delà des tables, fermer la slip-plate ou les jaws, appuyer la bit sur la slip-plate ou les jaws, et fermer l'interrupteur de la foreuse.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 3g à 3j"
      },
      {
        "regle": "Avant toute remontée de la bit lors d'un changement de bit, remonter la bit au-delà des tables.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étapes 3b et 3p"
      },
      {
        "regle": "Visser le marteau au saver sub au complet sans le serrer avec force.",
        "theme": "Outils & clés",
        "source": "Étape 3f"
      },
      {
        "regle": "Ne pas laisser les tubages dépasser trop longs hors du plancher du chantier; le trajet emprunté par les travailleurs doit être exempt de tubages qui dépassent, car la longueur de dépassement peut changer avec l'accumulation de boue de forage.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 3p (note finale)"
      },
      {
        "regle": "Installer le tubage au collet des trous pour protéger le collet contre la chute de roches qui pourrait bloquer le trou et nuire au forage ou au chargement d'explosifs.",
        "theme": "Explosifs & terrain",
        "source": "Responsabilités"
      },
      {
        "regle": "Respecter au préalable la procédure de forage PRO-OP-ITH-004 et s'assurer que la foreuse est bien alignée selon les plans de forage avant l'installation du tubage.",
        "theme": "Inspection & vérification",
        "source": "Étapes 1 et 2"
      }
    ],
    "date_creation": "",
    "date_revision": "Août 2020",
    "epi": [],
    "equipements": [],
    "etapes": [],
    "figures": [
      {
        "page": "1",
        "description": "Logo MACHINES ROGER INTERNATIONAL (en-tête) et logo de roue de prévention SST (cycle inspection / planification / exécution / décision)."
      },
      {
        "page": "2",
        "description": "Tableau de référence à 5 colonnes (Dimension du casing, Dimension du 1er forage, Longueur du 1er forage, Dimension du 2e forage, Longueur du 2e forage) pour les casings de 4, 6 et 10 pouces."
      },
      {
        "page": "3",
        "description": "Bloc signature : signature manuscrite de Christian St-Amour, Directeur des opérations."
      }
    ],
    "historique": [],
    "id": "pro-op-ith-014",
    "langue_source": "fr",
    "machines": [
      "ITH",
      "Foreuse ITH",
      "Marteau",
      "Mât"
    ],
    "notes": "Document de 3 pages, daté du 20 août 2020 (pied de page), signé par Christian St-Amour, Directeur des opérations. Aucune section « Historique / Ajouts ou modifications » ni date de création distincte n'est présente dans le document; seule l […]",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour l'installation de tubage (casing) ABS au collet des trous.",
    "prerequis": [],
    "responsabilites": "Les travailleurs sont responsables d'appliquer cette procédure. Le superviseur doit s'assurer que la procédure est appliquée. L'installation de tubage au collet des trous est fréquente pour protéger les collets des trous contre la chute de roches qui pourraient bloquer le trou et nuire au forage ou au chargement d'explosifs. La séquence de l'opération doit être suivie rigoureusement pour une installation de qualité et pour éviter tout accident.",
    "resume": "Cette procédure définit la méthode sécuritaire pour installer du tubage (casing) ABS au collet des trous, afin de protéger le collet contre la chute de roches qui pourrait bloquer le trou et nuire au forage ou au chargement d'explosifs.",
    "source_pdf": "PRO-OP-ITH-014 Procédure d'installation de casing au collet des trous 09-2020.pdf",
    "titre": "Procédure d'installation de tubage (casing) au collet des trous",
    "valeurs_cles": [
      {
        "libelle": "Distance minimum mât ↔ console",
        "valeur": "1,5 m"
      },
      {
        "libelle": "Distance minimum à respecter autour du mât (tous côtés)",
        "valeur": "1,5 m"
      },
      {
        "libelle": "Casing 4 pouces — 1er forage",
        "valeur": "3 pouces 7/8 (selon les besoins)"
      },
      {
        "libelle": "Casing 4 pouces — 2e forage",
        "valeur": "4 pouces, 1 pied dans le roc solide"
      },
      {
        "libelle": "Casing 6 pouces — 1er forage",
        "valeur": "4 pouces 1/2 (selon les besoins)"
      },
      {
        "libelle": "Casing 6 pouces — 2e forage",
        "valeur": "6 pouces, 1 pied dans le roc solide"
      },
      {
        "libelle": "Casing 10 pouces — 1er forage",
        "valeur": "6 pouces 1/2 (selon les besoins)"
      },
      {
        "libelle": "Casing 10 pouces — 2e forage",
        "valeur": "10 pouces, 1 pied dans le roc solide"
      },
      {
        "libelle": "Profondeur du 2e forage dans le roc solide",
        "valeur": "1 pied"
      },
      {
        "libelle": "Procédure de forage de référence",
        "valeur": "PRO-OP-ITH-004 (3,375'' à 6.5'')"
      }
    ]
  },
  {
    "id": "pro-op-ith-016",
    "code": "PRO-OP-ITH-016",
    "titre": "Procédure pour la manipulation des marteaux de forage et de leurs composantes",
    "categorie": "Manutention",
    "machines": [
      "ITH",
      "Marteau",
      "Marteau 3\"",
      "Marteau 4\"",
      "Marteau 6\""
    ],
    "resume": "Cette procédure définit la séquence sécuritaire pour manipuler, installer et retirer les marteaux de forage ainsi que leurs bits et le « DRIVER SUB », afin d'éviter les chutes de marteaux et les troubles musculosquelettiques (TMS).",
    "objectif": "L'objectif de cette procédure est de définir la séquence des opérations pour manipuler les marteaux de forage. Ceci inclus la manipulation, l'installation du marteau, l'ajout ou l'enlèvement des bits et l'ajout du « DRIVER SUB ».",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le foreur a la responsabilité de s'assurer d'une bonne communication avec l'aide-foreur. Ils doivent respecter cette procédure. Le superviseur doit faire respecter la procédure. La personne ayant l'autorité pour l'interprétation de ce document est le directeur des opérations; toute demande de modification, révision ou de mise à jour doit être faite auprès de cette personne.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Risque d'écrasement des mains : avant d'exposer les mains sous le marteau, valider qu'il est bien vissé au Gear Box.",
      "Ne jamais exposer les mains lors du dévissage manuel du marteau.",
      "Marteaux de 6'' : toujours transporter avec le chariot prévu et garder le Driver Sub installé pendant la manipulation.",
      "Marteaux de 3'' et 4'' : installer manuellement sur le Gear Box comme les tiges, puis suivre la procédure à partir du point #8."
    ],
    "consignes_securite": [
      {
        "regle": "Transporter en tout temps les marteaux de 6\" à l'aide du chariot conçu à cet effet.",
        "theme": "Manutention & levage",
        "source": "Mise en contexte / Avertissement"
      },
      {
        "regle": "Installer le « DRIVER SUB » sur les marteaux en tout temps lors de la manipulation.",
        "theme": "Pièces en mouvement & mât",
        "source": "Avertissement"
      },
      {
        "regle": "Installer les marteaux de 3\" et 4\" manuellement sur le « GEAR BOX » de la même manière que les tiges de forage, puis appliquer la procédure à partir du point #8.",
        "theme": "Manutention & levage",
        "source": "Avertissement"
      },
      {
        "regle": "Valider que le marteau est bien vissé au « GEAR BOX » chaque fois qu'on doit exposer les mains sous le marteau.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Avertissement (avant étapes 11 et 18)"
      },
      {
        "regle": "Ne pas s'exposer les mains lors du dévissage manuel du marteau.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 33"
      },
      {
        "regle": "Maintenir une bonne communication entre le foreur et l'aide-foreur durant toute la manipulation.",
        "theme": "Communication & signalisation",
        "source": "Responsabilités"
      },
      {
        "regle": "Retirer la chaîne de sûreté du chariot seulement après avoir vissé et accoté le marteau dans le « SAVER SUB ».",
        "theme": "Manutention & levage",
        "source": "Étapes 5 et 6"
      },
      {
        "regle": "Attacher le marteau à l'aide de la chaîne de retenu avant de sortir le chariot.",
        "theme": "Manutention & levage",
        "source": "Étape 34"
      },
      {
        "regle": "Respecter la séquence de travail établie pour éviter l'exposition des travailleurs à la chute d'un marteau et au développement de TMS.",
        "theme": "Manutention & levage",
        "source": "Mise en contexte"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Poids du marteau 3\"",
        "valeur": "60 lbs"
      },
      {
        "libelle": "Poids du marteau 4\"",
        "valeur": "89 lbs"
      },
      {
        "libelle": "Poids du marteau 6\"",
        "valeur": "211 lbs"
      },
      {
        "libelle": "Application de la procédure pour les marteaux 3\" et 4\"",
        "valeur": "à partir du point #8"
      },
      {
        "libelle": "Dévissage final du marteau (étape 29)",
        "valeur": "1 tour seulement"
      },
      {
        "libelle": "Diamètres de bits sur marteau 6\"",
        "valeur": "6\", 8\" ou 10\""
      }
    ],
    "figures": [
      {
        "page": "1",
        "description": "Tableau des poids des marteaux selon les spécifications des fournisseurs (Sources : Sandvik et Epiroc) — marteau 3'' : 60 lbs, marteau 4'' : 89 lbs, marteau 6'' : 211 lbs."
      },
      {
        "page": "2 à 7",
        "description": "Le document comporte des photographies/schémas (10 images JPEG confirmées dans le PDF) illustrant les étapes de manipulation (chariot, positionnement du marteau entre les tables, GEAR BOX, casse-bit, RETAINING RINGS). Les légendes ne figurent pas dans le texte; vérification visuelle du PDF recommandée pour la description précise des images."
      }
    ],
    "historique": [],
    "date_creation": "Novembre 2021",
    "date_revision": "Novembre 2021",
    "source_pdf": "PRO-OP-ITH-016 Procédure pour la manipulation des marteaux de forage et de leurs composantes.pdf",
    "langue_source": "fr",
    "notes": "Vérification effectuée par comparaison intégrale avec le PDF source (7 pages, extraction pdftotext -layout en UTF-8). L'extraction est fidèle et complète : les 34 étapes, les 3 avertissements et toutes les valeurs chiffrées (poids 60/89/211 […]"
  }
];

