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
  },
  {
    "id": "pro-mec-001",
    "code": "PRO-MEC-001",
    "titre": "Démantèlement d'un mât de forage",
    "categorie": "Maintenance",
    "machines": [
      "Foreuse ITH",
      "CUBEX",
      "Mât"
    ],
    "resume": "Procédure définissant une façon sécuritaire de démonter le mât d'une foreuse à l'aide d'un équipement de levage certifié, notamment pour la manutention des élingues, des boulons et le retrait sécuritaire du mât.",
    "objectif": "L'objectif de cette procédure est de définir une façon sécuritaire pour le démantèlement d'un mât de foreuse avec un équipement de levage approprié. Pour toute autre situation où la méthode pourrait être autre que celle prévue dans cette procédure, une analyse de risque doit être effectuée.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur a la responsabilité d'utiliser cette procédure pour chaque démantèlement d'un mât de foreuse avec un équipement de levage. Les outils nécessaires doivent être inspectés avant de les utiliser. Le superviseur désignera un chef d'équipe (superviseur ou mécanicien) qui prendra en charge l'ensemble des opérations et sera le seul autorisé à communiquer avec l'opérateur de l'équipement de levage pendant l'opération. INTERPRÉTATION : le personnel ayant l'autorité pour l'interprétation de ce document est le directeur entretien ou le directeur des opérations.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Équipement de levage requis : capacité de 6 000 livres ou plus.",
      "TRÈS IMPORTANT : ne jamais se placer en-dessous du mât.",
      "Se tenir dans un endroit sécuritaire, à une distance minimale de douze pieds de la foreuse, et s'assurer d'être vu par l'opérateur de l'équipement de levage en tout temps.",
      "Personne ne doit retirer la manille tant que le mât n'est pas bien appuyé sur le blocage."
    ],
    "consignes_securite": [
      {
        "regle": "Utiliser un équipement de levage d'une capacité de 6 000 livres ou plus.",
        "theme": "Manutention & levage",
        "source": "Étape 1"
      },
      {
        "regle": "Positionner la foreuse au niveau afin qu'elle soit stable avant toute manipulation.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 2"
      },
      {
        "regle": "Appliquer la procédure de cadenassage avant de retirer les boyaux hydrauliques.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 6"
      },
      {
        "regle": "Utiliser quatre élingues de longueur égale, certifiées 5 000 livres, reliées entre elles par une manille d'un pouce de diamètre.",
        "theme": "Manutention & levage",
        "source": "Étape 8"
      },
      {
        "regle": "Retirer les boulons du mât en gardant trois boulons en triangle jusqu'à la fin, puis revérifier la tension des élingues avant de les enlever.",
        "theme": "Manutention & levage",
        "source": "Étapes 10-12"
      },
      {
        "regle": "Se tenir à une distance minimale de douze pieds de la foreuse et rester visible de l'opérateur de l'équipement de levage en tout temps ; ne jamais se placer en-dessous du mât.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 13"
      },
      {
        "regle": "Ne détacher la manille de l'équipement de levage qu'une fois le mât bien appuyé sur les blocs de bois au sol.",
        "theme": "Manutention & levage",
        "source": "Étape 15"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Capacité minimale de l'équipement de levage",
        "valeur": "6 000 livres"
      },
      {
        "libelle": "Capacité certifiée des élingues",
        "valeur": "5 000 livres (x4)"
      },
      {
        "libelle": "Diamètre de la manille (clavis)",
        "valeur": "1 pouce"
      },
      {
        "libelle": "Distance sécuritaire minimale de la foreuse",
        "valeur": "12 pieds"
      },
      {
        "libelle": "Distance de l'arbre d'entraînement (gear box) par rapport à la table",
        "valeur": "5 pieds"
      }
    ],
    "figures": [],
    "historique": [],
    "date_creation": "14 Mai 2003",
    "date_revision": "Avril 2019",
    "source_pdf": "PRO-MEC-001 Procédure pour le démantèlement d'un mât de CUBEX 04-2019.pdf",
    "langue_source": "fr",
    "notes": "Vérifié contre le PDF source (2 pages). Aucune photo de contenu distincte du gabarit standard (logo/signature) n'a été trouvée dans le PDF ; le document est purement textuel."
  },
  {
    "id": "pro-mec-002",
    "code": "PRO-MEC-002",
    "titre": "Installation d'un mât de foreuse CUBEX",
    "categorie": "Maintenance",
    "machines": [
      "Foreuse ITH",
      "CUBEX",
      "Mât"
    ],
    "resume": "Procédure définissant les méthodes sécuritaires pour installer un mât sur une foreuse CUBEX à l'aide d'un équipement de levage, incluant l'élingage, l'alignement sur l'actuateur, le serrage des douze boulons au couple prescrit et la vérification après un quart de travail.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour effectuer l'installation d'un mât.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur a la responsabilité d'utiliser cette procédure pour chaque installation d'un mât de foreuse. Les outils nécessaires doivent être inspectés avant de les utiliser. Le superviseur désignera un chef d'équipe (superviseur ou mécanicien) qui rencontrera l'opérateur de l'équipement de levage pour lui expliquer la procédure et sera le seul autorisé à communiquer avec lui pendant l'opération. INTERPRÉTATION : le personnel ayant l'autorité pour l'interprétation de ce document est le directeur entretien ou le directeur des opérations.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Équipement de levage requis : capacité de 6 000 livres ou plus.",
      "TRÈS IMPORTANT : ne pas s'exposer sous le mât.",
      "S'assurer d'être vu par l'opérateur de l'équipement de levage en tout temps.",
      "Ne retirer les élingues que lorsque les boulons sont bien serrés."
    ],
    "consignes_securite": [
      {
        "regle": "Utiliser un équipement de levage d'une capacité de 6 000 livres ou plus, avec la foreuse positionnée au niveau pour qu'elle soit stable.",
        "theme": "Manutention & levage",
        "source": "Méthode"
      },
      {
        "regle": "Balancer le point de levage avec des élingues de longueur égale certifiées 5 000 livres, reliées par une manille d'un pouce de diamètre.",
        "theme": "Manutention & levage",
        "source": "Étape 1"
      },
      {
        "regle": "Diriger le mât au-dessus de la foreuse en restant à une distance minimale de douze pieds ; ne pas s'exposer sous le mât et rester visible de l'opérateur en tout temps.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étapes 5-7"
      },
      {
        "regle": "Serrer les douze boulons du mât à l'aide d'une clé dynamométrique : 110 lbs/pied à sec, 80 lbs/pied avec antigrippant (anti-seize).",
        "theme": "Outils & clés",
        "source": "Étape 15"
      },
      {
        "regle": "Ne retirer les élingues qu'une fois les boulons bien serrés.",
        "theme": "Manutention & levage",
        "source": "Étape 16"
      },
      {
        "regle": "Vérifier le serrage des boulons du mât après un quart de travail.",
        "theme": "Inspection & vérification",
        "source": "Étape 19 (N.B.)"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Capacité minimale de l'équipement de levage",
        "valeur": "6 000 livres"
      },
      {
        "libelle": "Capacité certifiée des élingues",
        "valeur": "5 000 livres"
      },
      {
        "libelle": "Diamètre de la manille (clavis)",
        "valeur": "1 pouce"
      },
      {
        "libelle": "Distance sécuritaire minimale de la foreuse",
        "valeur": "12 pieds"
      },
      {
        "libelle": "Nombre de boulons du mât",
        "valeur": "12"
      },
      {
        "libelle": "Couple de serrage — boulons secs",
        "valeur": "110 lbs/pied"
      },
      {
        "libelle": "Couple de serrage — boulons lubrifiés (anti-seize)",
        "valeur": "80 lbs/pied"
      }
    ],
    "figures": [],
    "historique": [],
    "date_creation": "4 Avril 2005",
    "date_revision": "31 janvier 2019",
    "source_pdf": "PRO-MEC-002 Procédure pour le montage du mât 04-2019.pdf",
    "langue_source": "fr",
    "notes": "Vérifié contre le PDF source (2 pages). Aucune photo de contenu distincte du gabarit standard (logo/signature) n'a été trouvée dans le PDF."
  },
  {
    "id": "pro-mec-003",
    "code": "PRO-MEC-003",
    "titre": "Changer un « gear box » sur une foreuse I.T.H.",
    "categorie": "Maintenance",
    "machines": [
      "Foreuse ITH",
      "CUBEX",
      "Gear box"
    ],
    "resume": "Procédure définissant une façon sécuritaire d'installer (remplacer) le gear box d'une foreuse ITH, incluant le cadenassage, le débranchement des boyaux et le remplacement à l'aide d'un équipement de levage ou de fourches.",
    "objectif": "L'objectif de cette procédure est de définir une façon sécuritaire pour l'installation du « gearbox ».",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur a la responsabilité d'utiliser cette procédure pour chaque installation d'un gearbox. Le superviseur doit désigner un chef d'équipe et ce dernier devra diriger l'opérateur pour effectuer cette tâche. Les outils nécessaires et équipements de levage doivent être inspectés avant de les utiliser. L'opérateur doit avoir la formation pour opérer l'équipement de levage. INTERPRÉTATION : le personnel ayant l'autorité pour l'interprétation de ce document est le directeur entretien et le directeur des opérations.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [],
    "consignes_securite": [
      {
        "regle": "Mettre le mât à 90 degrés et appliquer la procédure de cadenassage avant de débrancher les boyaux hydrauliques et pneumatiques.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 2, 5"
      },
      {
        "regle": "Laisser un espace sous le gear box pour y passer les fourches, des élingues ou une chaîne de V-30 avant le retrait.",
        "theme": "Manutention & levage",
        "source": "Étape 4"
      },
      {
        "regle": "Mettre une légère tension sur les élingues ou la chaîne avant de retirer les deux derniers boulons du gear box.",
        "theme": "Manutention & levage",
        "source": "Étape 8"
      },
      {
        "regle": "Serrer la swivel au couple prescrit de 800 lbs de torque et s'assurer que le gear box tourne dans le bon sens avant la remise en service.",
        "theme": "Inspection & vérification",
        "source": "Étapes 13-14"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Couple de serrage de la swivel",
        "valeur": "800 lbs (torque)"
      }
    ],
    "figures": [],
    "historique": [],
    "date_creation": "5 Juillet 2006",
    "date_revision": "Février 2019",
    "source_pdf": "PRO-MEC-003 Procédure pour changer un gearbox sur foreuse ITH 04-2019.pdf",
    "langue_source": "fr",
    "notes": "Vérifié contre le PDF source (2 pages). Aucune photo de contenu distincte du gabarit standard (logo/signature) n'a été trouvée dans le PDF."
  },
  {
    "id": "pro-mec-004",
    "code": "PRO-MEC-004",
    "titre": "Procédures pour changer l'« air swivel » (gear box)",
    "categorie": "Maintenance",
    "machines": [
      "Foreuse ITH",
      "CUBEX",
      "Air swivel",
      "Gear box"
    ],
    "resume": "Procédure définissant les méthodes sécuritaires pour changer l'air swivel (gear box) d'une foreuse, incluant le cadenassage complet de l'air, le dévissage à l'aide d'une clé et de la rotation, et le remontage sans jamais tenir la swivel à la main pendant la rotation.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour effectuer le changement d'air swivel (GearBox).",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur doit connaître la procédure et s'assurer de l'appliquer. Le superviseur doit connaître la procédure et la faire respecter. INTERPRÉTATION : le personnel ayant l'autorité pour l'interprétation de ce document est le directeur entretien et le directeur des opérations.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Ne jamais tenir la swivel avec les mains quand la rotation est actionnée.",
      "Ne pas dépasser 800 PSI sur le cadran de rotation lors du serrage final.",
      "S'assurer que personne ne se trouve dans la ligne de tir de la masse si son utilisation est nécessaire pour casser la swivel."
    ],
    "consignes_securite": [
      {
        "regle": "Cadenasser l'air au header (alimentation principale) et purger l'air de la foreuse avant de dévisser les boyaux à air.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 2"
      },
      {
        "regle": "S'assurer que personne n'est dans la ligne de tir de la masse si son utilisation est nécessaire pour casser la swivel.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 5"
      },
      {
        "regle": "Appliquer la procédure de cadenassage complète avant de poursuivre le remplacement.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 6"
      },
      {
        "regle": "Ne jamais tenir la swivel avec les mains pendant que la rotation est actionnée.",
        "theme": "Pièces en mouvement & mât",
        "source": "Avertissement (après étape 11)"
      },
      {
        "regle": "Finir le serrage avec la rotation de la foreuse sans dépasser 800 PSI sur le cadran de rotation.",
        "theme": "Outils & clés",
        "source": "Étape 12"
      },
      {
        "regle": "Vérifier que les deux boulons du support à swivel sont bien appuyés, car des résidus peuvent empêcher un serrage correct.",
        "theme": "Inspection & vérification",
        "source": "Étape 14"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Pression maximale au cadran de rotation lors du serrage final",
        "valeur": "800 PSI"
      }
    ],
    "figures": [],
    "historique": [
      {
        "date": "25-11-2025",
        "description": "Éclaircissement des responsabilités ; ajout au point 3 de cadenasser l'air au header ; ajout du mot « complète » au point 7 ; retrait du point indiquant que le gearbox arrive de l'atelier avec la swivel déjà installée ; ajout du « O-ring » au point 9 ; ajout de la séquence de décadenassage.",
        "par": "S. Tremblay, D. Baribeault"
      }
    ],
    "date_creation": "13 Novembre 2008",
    "date_revision": "Novembre 2025",
    "source_pdf": "PRO-MEC-004  Procédure pour air swivel 11-2025.pdf",
    "langue_source": "fr",
    "notes": "Vérifié contre le PDF source (2 pages). Tableau « Ajouts et modifications » en pied de document daté du 25-11-2025."
  },
  {
    "id": "pro-mec-005",
    "code": "PRO-MEC-005",
    "titre": "Démantèlement de la CUBEX pour élingage",
    "categorie": "Démobilisation",
    "machines": [
      "Foreuse ITH",
      "CUBEX"
    ],
    "resume": "Procédure définissant les méthodes sécuritaires pour démonter la CUBEX afin de la déplacer et/ou l'élinguer, incluant le cadenassage, la déconnexion du système ANSUL et du moteur électrique, le retrait des composantes et le levage final de la foreuse sur la « skid ».",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour démonter la CUBEX dans le but de la déplacer et/ou l'élinguer.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le superviseur a la responsabilité d'encadrer les travaux et de s'assurer que la procédure est respectée. Les travaux de montage et démontage doivent toujours être effectués par un travailleur compétent (mécanicien ou superviseur). Le travailleur doit respecter la procédure ; si une situation survient et qu'elle n'est pas couverte, une analyse de risque doit être effectuée. INTERPRÉTATION : le personnel ayant l'autorité pour l'interprétation de ce document est le directeur entretien.",
    "epi": [],
    "equipements": [
      "Manitou ou tout autre équipement à fourches (capacité 7000 lbs)",
      "Treuil 6 tonnes",
      "Palan à chaîne 6 tonnes",
      "Come along",
      "Élingues 6 tonnes",
      "Main de levage (plans et devis ingénieur du client)"
    ],
    "prerequis": [
      "La procédure PRO-MEC-001 (démantèlement du mât) doit être appliquée pour enlever le mât.",
      "Une visite de l'endroit où les travaux seront exécutés doit être faite avant tout démontage ou montage, afin d'évaluer les installations et équipements de levage et d'établir l'ordre d'arrivée et de sortie des pièces."
    ],
    "etapes": [],
    "avertissements": [
      "Ne jamais se positionner sous une charge pendant les opérations de levage et d'élingage."
    ],
    "consignes_securite": [
      {
        "regle": "Ne jamais se positionner sous une charge pendant les opérations de levage et d'élingage.",
        "theme": "Manutention & levage",
        "source": "Avertissement (Procédure)"
      },
      {
        "regle": "Appliquer la procédure PRO-MEC-001 pour enlever le mât avant de poursuivre le démontage.",
        "theme": "Manutention & levage",
        "source": "Procédure, point préalable"
      },
      {
        "regle": "Appliquer la procédure de cadenassage de la foreuse avant de déconnecter le système ANSUL et le moteur électrique.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 2"
      },
      {
        "regle": "Faire déconnecter le moteur électrique uniquement par un électricien.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 5"
      },
      {
        "regle": "Équilibrer la charge du réservoir hydraulique et de la pompe avec des élingues en étranglement fixées à l'anneau du moteur et de la pompe.",
        "theme": "Manutention & levage",
        "source": "Étape 7"
      },
      {
        "regle": "Les déplacements dans la galerie et l'élingage dans le puits relèvent de la responsabilité de la mine.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Procédure (notes finales)"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Capacité de l'équipement à fourches",
        "valeur": "7 000 livres"
      },
      {
        "libelle": "Capacité du treuil",
        "valeur": "6 tonnes"
      },
      {
        "libelle": "Capacité du palan à chaîne",
        "valeur": "6 tonnes"
      },
      {
        "libelle": "Capacité des élingues",
        "valeur": "6 tonnes"
      }
    ],
    "figures": [],
    "historique": [
      {
        "date": "Novembre 2023",
        "description": "Mise à jour complète et retrait de la spécification pour Garson dans le titre, la procédure étant utilisée sur d'autres contrats.",
        "par": "S. Tremblay, D. Baribeault, K. Béchard"
      },
      {
        "date": "Janvier 2024",
        "description": "Ajout de la visite de la place de travail avant d'y déplacer le matériel, avant le montage ou démontage.",
        "par": "S. Tremblay, JF Gagnon"
      }
    ],
    "date_creation": "Novembre 2019",
    "date_revision": "Janvier 2024",
    "source_pdf": "PRO-MEC-005 Démantèlement de la CUBEX pour élingage Janvier 2024.pdf",
    "langue_source": "fr",
    "notes": "Vérifié contre le PDF source (3 pages)."
  },
  {
    "id": "pro-mec-006",
    "code": "PRO-MEC-006",
    "titre": "Procédures pour le changement du « saver sub » (gear box ITH)",
    "categorie": "Maintenance",
    "machines": [
      "Foreuse ITH",
      "CUBEX",
      "Saver sub",
      "Gear box"
    ],
    "resume": "Procédure définissant deux méthodes sécuritaires (mât à l'horizontale ou à la verticale) pour changer le saver sub d'un gear box ITH, avec mise en garde sur la zone de coincement et rappel des positions neutre des consoles (ancienne et nouvelle).",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour effectuer le changement du Saver Sub (Gear Box ITH).",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur est responsable d'appliquer l'une des deux méthodes suivantes lorsqu'il doit changer son saver sub. INTERPRÉTATION : le personnel ayant l'autorité pour l'interprétation de ce document est le directeur entretien et le directeur des opérations.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Ne pas visser la tige de forage au saver sub lors de son installation dans le gear box (méthode 1).",
      "En repositionnant la clé, la manipuler par l'extrémité pour ne pas s'exposer à la zone de coincement (méthode 2, cercle jaune).",
      "Ancienne console : positionner obligatoirement le levier du choix de console au neutre (position centrale) avant d'entretenir, inspecter ou remplacer une composante sur le mât.",
      "Nouvelle console : enfoncer obligatoirement le bouton d'arrêt pour couper l'alimentation de la console avant d'entretenir, inspecter ou remplacer une composante sur le mât."
    ],
    "consignes_securite": [
      {
        "regle": "Ne pas visser la tige de forage utilisée comme retenue de la clé au saver sub.",
        "theme": "Outils & clés",
        "source": "Méthode 1, étape 3"
      },
      {
        "regle": "En repositionnant la clé sur les centralisateurs « jaw », la manipuler par l'extrémité afin de ne pas s'exposer à la zone de coincement.",
        "theme": "Pièces en mouvement & mât",
        "source": "Méthode 2, étape 3"
      },
      {
        "regle": "Dévisser le saver sub avec la force hydraulique ; quelques coups de masse sur la clé peuvent être nécessaires.",
        "theme": "Outils & clés",
        "source": "Méthodes 1 et 2"
      },
      {
        "regle": "Visser le nouveau saver sub complètement avec la force hydraulique ajustée à 2 800 psi jusqu'au contact gear box - saver sub.",
        "theme": "Outils & clés",
        "source": "Méthodes 1 et 2"
      },
      {
        "regle": "Positionner obligatoirement le levier de la console (ancienne) au neutre, ou enfoncer le bouton d'arrêt (nouvelle console), avant d'entretenir, inspecter ou remplacer une composante sur le mât.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Avertissements (p.3-4)"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Pression hydraulique de serrage du saver sub",
        "valeur": "2 800 psi"
      }
    ],
    "figures": [
      {
        "page": "3",
        "description": "Photo montrant la clé descendue sur le gear box avec un repère vert et un cercle jaune identifiant la zone de coincement à éviter en la manipulant (méthode 2, étape 3)."
      },
      {
        "page": "3",
        "description": "Photo de l'ancienne console de commande (WATER ON/OFF, AIR ON/OFF, sélecteurs DRILL/TRAM/REMOTE) illustrant le levier de choix de console à mettre au neutre."
      },
      {
        "page": "4",
        "description": "Photo de la nouvelle console de commande Machines Roger International (écran Danfoss, joysticks, bouton d'arrêt d'urgence rouge) illustrant le bouton d'arrêt à enfoncer."
      }
    ],
    "historique": [],
    "date_creation": "13 Novembre 2008",
    "date_revision": "15 février 2019",
    "source_pdf": "PRO-MEC-006 Procédure pour changement saver sub - 2 méthodes 11-2019.pdf",
    "langue_source": "fr",
    "notes": "Vérifié contre le PDF source (4 pages) ; 3 photos de contenu extraites et confirmées visuellement (clé/zone de coincement, ancienne console, nouvelle console)."
  },
  {
    "id": "pro-mec-007",
    "code": "PRO-MEC-007",
    "titre": "Procédure pour travaux sur chenille de traction",
    "categorie": "Maintenance",
    "machines": [
      "Foreuse ITH",
      "CUBEX",
      "Chenille de traction"
    ],
    "resume": "Procédure définissant une méthode sécuritaire pour stabiliser la foreuse sur un blocage de bois avant d'effectuer des réparations sur les chenilles de traction, en soulevant un seul côté du châssis à la fois.",
    "objectif": "L'objectif de cette procédure est de définir une méthode sécuritaire pour stabiliser la foreuse lorsque l'on doit effectuer des réparations sur les chenilles de traction.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le foreur est responsable de communiquer avec son superviseur ou mécanicien avant d'appliquer cette méthode de travail. Le superviseur ou le mécanicien doit aller approuver en chantier l'application intégrale de cette procédure pour effectuer les travaux. INTERPRÉTATION : le personnel ayant l'autorité pour l'interprétation de ce document est le directeur entretien et le directeur des opérations.",
    "epi": [],
    "equipements": [
      "Blocage de bois en bonne condition (le poids d'une CUBEX est de 22 000 lbs)"
    ],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "La structure du panier n'est pas un point d'appui pour le blocage.",
      "Il est strictement interdit de soulever l'ensemble de la foreuse d'un seul coup.",
      "Ne jamais s'exposer sous la foreuse ou les composantes élevées pendant les travaux."
    ],
    "consignes_securite": [
      {
        "regle": "Barricader les accès de la place de travail avant de débuter.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 1"
      },
      {
        "regle": "S'assurer que le blocage de bois sera stable lorsque la foreuse sera surélevée ; la structure du panier n'est pas un point d'appui.",
        "theme": "Manutention & levage",
        "source": "Étape 4"
      },
      {
        "regle": "Ne soulever qu'un seul côté de la foreuse à la fois, de 20 cm (8 po) maximum, en gardant le côté opposé appuyé au sol ; il est strictement interdit de soulever l'ensemble de la foreuse d'un seul coup.",
        "theme": "Manutention & levage",
        "source": "Étape 5"
      },
      {
        "regle": "Ne jamais s'exposer sous la foreuse ou les composantes élevées durant les travaux.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 6"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Poids d'une foreuse CUBEX",
        "valeur": "22 000 livres"
      },
      {
        "libelle": "Hauteur maximale de levage d'un côté du châssis",
        "valeur": "20 cm (8 pouces)"
      }
    ],
    "figures": [
      {
        "page": "2",
        "description": "Photo montrant le blocage de bois installé sous un seul côté du châssis de la foreuse (étape 4)."
      },
      {
        "page": "3",
        "description": "Photo de la foreuse surélevée sur son blocage, avec repère « Hauteur sécuritaire et adéquate » et vue de la chenille dégagée (étape 6)."
      }
    ],
    "historique": [],
    "date_creation": "13 Mai 2015",
    "date_revision": "Avril 2019",
    "source_pdf": "PRO-MEC-007 Procédure travaux sur chenille.pdf",
    "langue_source": "fr",
    "notes": "Vérifié contre le PDF source (3 pages) ; 2 photos de contenu extraites et confirmées visuellement."
  },
  {
    "id": "pro-mec-008",
    "code": "PRO-MEC-008",
    "titre": "Procédures pour changement de téflon sur feed extension",
    "categorie": "Maintenance",
    "machines": [
      "Foreuse ITH",
      "CUBEX",
      "Feed extension"
    ],
    "resume": "Procédure définissant une méthode sécuritaire pour changer les téflons du système de glissière (feed extension), en chantier ou en atelier, en ne retirant qu'une seule partie et qu'un seul côté à la fois.",
    "objectif": "L'objectif de cette procédure est de définir une méthode sécuritaire pour effectuer le changement de téflon feed extension.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur est responsable d'appliquer cette procédure lors du changement de téflon sur le feed extension. INTERPRÉTATION : le personnel ayant l'autorité pour l'interprétation de ce document est le directeur entretien et le directeur des opérations.",
    "epi": [],
    "equipements": [
      "Clé 15/16''",
      "Ratchet et douille 15/16''",
      "Clé 3/4''"
    ],
    "prerequis": [],
    "etapes": [],
    "avertissements": [],
    "consignes_securite": [
      {
        "regle": "Barricader les accès de la place de travail avant de débuter (procédure en chantier).",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 1 (chantier)"
      },
      {
        "regle": "Forer la longueur du marteau et une tige de 1,8 m dans le roc pour immobiliser la tête de rotation avant de retirer les boulons (procédure en chantier).",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 4 (chantier)"
      },
      {
        "regle": "Ne retirer qu'une seule partie et qu'un seul côté du système de glissière à la fois.",
        "theme": "Manutention & levage",
        "source": "Étape 5 (chantier) / Étape 4 (atelier)"
      },
      {
        "regle": "En atelier, utiliser le pont roulant avec une élingue d'une capacité de 7 000 livres pour stabiliser le mât.",
        "theme": "Manutention & levage",
        "source": "Étapes 1-4 (atelier)"
      },
      {
        "regle": "Vérifier l'état des boulons d'assemblage au remontage et les remplacer au besoin.",
        "theme": "Inspection & vérification",
        "source": "Étape 7 (chantier) / Étape 6 (atelier)"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Longueur de tige forée pour immobiliser la tête de rotation",
        "valeur": "1,8 m"
      },
      {
        "libelle": "Capacité de l'élingue (travaux en atelier)",
        "valeur": "7 000 livres"
      }
    ],
    "figures": [
      {
        "page": "3",
        "description": "Annexe : dessin technique « Mounting plate et teflon slide » avec nomenclature numérotée des pièces (glissière mounting plate, glissière bloc poussoir, bloc poussoir, protecteur, boulons, écrous, rondelles), conçu par Philippe Fournier, vérifié par Karl Béchard, daté du 21-01-2019."
      }
    ],
    "historique": [],
    "date_creation": "13 Mai 2015",
    "date_revision": "Avril 2019",
    "source_pdf": "PRO-MEC-008 Procédures Changement de teflon feed extension.pdf",
    "langue_source": "fr",
    "notes": "Vérifié contre le PDF source (3 pages) ; l'annexe technique (p.3) a été extraite et confirmée visuellement."
  },
  {
    "id": "pro-mec-009",
    "code": "PRO-MEC-009",
    "titre": "Changement de cylindre de feed sur ITH-CUBEX",
    "categorie": "Maintenance",
    "machines": [
      "Foreuse ITH",
      "CUBEX",
      "Cylindre de feed"
    ],
    "resume": "Procédure détaillée (30 étapes) pour remplacer un cylindre de feed sur une foreuse ITH-CUBEX à l'aide d'un équipement de levage, incluant le cadenassage répété, le débranchement des boyaux, le retrait à l'élingue en choke et la reconnexion avec attention à la pression accumulée.",
    "objectif": "L'objectif de cette procédure est de définir une façon sécuritaire pour le changement d'un cylindre de feed avec un équipement de levage.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur a la responsabilité d'utiliser cette procédure pour chaque changement d'un cylindre de feed avec un équipement de levage. Les outils nécessaires doivent être inspectés avant de les utiliser. INTERPRÉTATION : le personnel ayant l'autorité pour l'interprétation de ce document est le directeur des opérations et le directeur entretien.",
    "epi": [],
    "equipements": [
      "Clé ou box avec ratchet 3/4 de 1 1/8''",
      "Clé 7/8''",
      "4 bouchons mâles et 4 bouchons femelles JIC 1/2''",
      "Grosse clé rouge",
      "Élingues de nylon de 4 ou 6 pieds",
      "HIAB ou palan à chaîne ou boom truck ou tracteur à fourche"
    ],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Une seule personne doit donner des indications à l'opérateur de l'équipement de levage à la fois.",
      "Attention à la pression accumulée en dévissant les bouchons de la grosse canisse et de ses boyaux : dévisser lentement."
    ],
    "consignes_securite": [
      {
        "regle": "Appliquer la procédure de cadenassage en suivant la fiche de cadenassage de la foreuse CUBEX avant de dévisser les boulons de floating box (répétée après chaque décadenassage intermédiaire).",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 3, 7, 28"
      },
      {
        "regle": "Déplacer la foreuse dans un endroit où l'espace est suffisant pour utiliser l'équipement de levage au-dessus du mât et sortir le cylindre au bout du mât.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 1"
      },
      {
        "regle": "Une seule personne doit donner des indications à l'opérateur de l'équipement de levage.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 16"
      },
      {
        "regle": "Installer l'élingue en « choke » autour du cylindre, le plus près possible du gear box, en gardant une tension verticale constante durant le retrait.",
        "theme": "Manutention & levage",
        "source": "Étapes 15, 19, 21"
      },
      {
        "regle": "Un seul travailleur doit mettre les mains sur le cylindre pour l'aider à sortir de son emplacement.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 20"
      },
      {
        "regle": "Vérifier le bon alignement des connecteurs hydrauliques avant de boulonner les deux bouts du nouveau cylindre.",
        "theme": "Inspection & vérification",
        "source": "Étapes 25-26"
      },
      {
        "regle": "En dévissant les bouchons de la grosse canisse et de ses boyaux, porter une attention particulière à la pression accumulée et dévisser lentement.",
        "theme": "Inspection & vérification",
        "source": "Étape 29"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Nombre de boulons de floating box",
        "valeur": "8"
      }
    ],
    "figures": [
      {
        "page": "2",
        "description": "Photos illustrant le déplacement de la foreuse et le positionnement du mât à l'horizontale devant la foreuse (étapes 1-2)."
      },
      {
        "page": "3",
        "description": "Photos avant/après du retrait des boulons du protecteur du haut du mât (étape 8)."
      },
      {
        "page": "4",
        "description": "Photos du retrait des boulons et boyaux au bout du cylindre avec pose des bouchons, et du retrait des boulons du protecteur du bas du cylindre (étapes 9-11)."
      },
      {
        "page": "5",
        "description": "Photos du dévissage de la plaque carrée (barrure) à la grosse clé rouge et du retrait des boyaux sur la grosse canisse (étapes 12-14)."
      },
      {
        "page": "6",
        "description": "Photos de l'installation de l'élingue en choke autour du cylindre et du retrait de la barrure du bas (étapes 15-17)."
      },
      {
        "page": "7",
        "description": "Photos de la mise en tension de l'élingue et du retrait du cylindre de son emplacement (étapes 19-22)."
      }
    ],
    "historique": [],
    "date_creation": "14 Mai 2003",
    "date_revision": "16 octobre 2020",
    "source_pdf": "PRO-MEC-009 Procédure de changement de cylindre de feed.pdf",
    "langue_source": "fr",
    "notes": "Vérifié contre le PDF source (8 pages) ; échantillon des 27 photos numérotées confirmé visuellement (vue d'ensemble de la foreuse, outil étoilé sur la bride, élingue autour du cylindre rouge)."
  },
  {
    "id": "pro-mec-010",
    "code": "PRO-MEC-010",
    "titre": "Procédure de travail pour le changement ou la réparation d'un actuateur sur une foreuse CUBEX",
    "categorie": "Maintenance",
    "machines": [
      "Foreuse ITH",
      "CUBEX",
      "Actuateur"
    ],
    "resume": "Procédure couvrant le changement ou la réparation d'un actuateur en atelier (avec pont-roulant ou main de levage) et en chantier, incluant le cadenassage, le retrait du mât ou de l'actuateur à l'élingue, le repositionnement et le serrage séquentiel des douze boulons.",
    "objectif": "L'objectif de cette procédure est de définir une façon sécuritaire de changer ou faire des réparations d'un actuateur sur une foreuse. La procédure couvre les travaux en atelier, en chantier et en atelier sous-terre non-équipé de pont-roulant.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL. Elle s'applique pour un changement, nettoyage ou entretien de l'actuateur, en chantier ou en atelier avec un outil de levage (pont-roulant, main de levage).",
    "responsabilites": "Le travailleur a la responsabilité d'utiliser cette procédure. Le superviseur a la responsabilité de faire respecter la procédure et de s'assurer que le travailleur a les compétences pour effectuer les travaux ; il doit aussi offrir les ressources nécessaires. INTERPRÉTATION : le personnel ayant l'autorité pour l'interprétation de ce document est le directeur entretien ou le directeur des opérations.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "TRÈS IMPORTANT : ne jamais se placer en-dessous du mât ; attention aux lignes de tir des pièces soulevées.",
      "Attention aux doigts coincés lors du dépinage des cylindres et de la manipulation des demi-lunes.",
      "Les boulons de l'actuateur devront être resserrés après un quart de travail de forage ; appliquer une étiquette bleue de suivi mécanique sur les contrôles de la foreuse."
    ],
    "consignes_securite": [
      {
        "regle": "Utiliser un équipement de levage d'une capacité de 6 000 livres ou plus et positionner la foreuse au niveau pour qu'elle soit stable.",
        "theme": "Manutention & levage",
        "source": "Étapes 1-2 (atelier)"
      },
      {
        "regle": "Avec une main de levage, centrer le mât sur le point de levage pour éliminer le risque de balancement au détachement de l'actuateur.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 3 (atelier)"
      },
      {
        "regle": "Appliquer la procédure de cadenassage avant de retirer les boyaux hydrauliques.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 7 (atelier) / Étape 5 (chantier)"
      },
      {
        "regle": "Se tenir à une distance minimale de douze pieds de la foreuse, hors de la ligne de déplacement du mât, et rester visible de l'opérateur en tout temps ; ne jamais se placer en-dessous du mât.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étapes 13-15 (atelier)"
      },
      {
        "regle": "Installer une élingue de nylon en « étrangleur » autour de l'assiette de l'actuateur et enlever le mou sans mettre de tension avant de dépiner les cylindres.",
        "theme": "Manutention & levage",
        "source": "Étapes 21-23 (atelier) / 12-16 (chantier)"
      },
      {
        "regle": "Protéger ses doigts lors du dépinage des cylindres et du retrait des demi-lunes ; attention aux lignes de tir des pièces soulevées.",
        "theme": "Pièces en mouvement & mât",
        "source": "Avertissements (p.3-4)"
      },
      {
        "regle": "Serrer les boulons de l'actuateur selon la séquence prescrite (3 premiers boulons, puis les 9 autres) et les resserrer après un quart de travail de forage.",
        "theme": "Outils & clés",
        "source": "Étapes 33-35 (atelier) / 26-28 (chantier)"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Capacité minimale de l'équipement de levage",
        "valeur": "6 000 livres"
      },
      {
        "libelle": "Nombre de boulons de l'actuateur",
        "valeur": "12"
      },
      {
        "libelle": "Distance sécuritaire minimale de la foreuse",
        "valeur": "12 pieds"
      }
    ],
    "figures": [
      {
        "page": "2",
        "description": "Diagramme circulaire numéroté (1 à 12) illustrant la séquence de retrait/serrage des boulons de l'actuateur, répété aux quatre occurrences où la séquence est mentionnée dans le texte."
      }
    ],
    "historique": [],
    "date_creation": "Juillet 2022",
    "date_revision": "",
    "source_pdf": "PRO-MEC-010 Procédure de travail pour le changement, l'entretien ou la réparation d'un actuateur.pdf",
    "langue_source": "fr",
    "notes": "Vérifié contre le PDF source (5 pages) ; le diagramme de séquence de boulonnage (même image réutilisée 4 fois dans le PDF) a été extrait une seule fois et confirmé visuellement."
  },
  {
    "id": "atelier-mec-001",
    "code": "ATELIER-MEC-001",
    "titre": "Procédure pour le contrôle des entrées, des sorties et des déplacements d'équipements dans l'atelier",
    "categorie": "Sécurité",
    "machines": [],
    "resume": "Procédure définissant les méthodes sécuritaires pour les entrées, les sorties et les déplacements d'équipements roulants dans l'atelier : signaleur désigné, klaxon, vitesse lente et frein de stationnement.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour les entrées, les sorties et les déplacements d'équipements dans l'atelier.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Les travailleurs de l'atelier et les opérateurs des équipements doivent respecter la procédure et le superviseur doit s'assurer qu'elle est respectée en tout temps. Les opérateurs des différents équipements doivent être aptes à les opérer. INTERPRÉTATION : le directeur de l'entretien a l'autorité pour l'interprétation de ce document.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Une lumière stroboscopique s'allume lors de l'ouverture ou la fermeture de la porte pour avertir toutes les personnes présentes dans l'atelier.",
      "Pour tout équipement sur tractions entrant, sortant ou se déplaçant dans l'atelier, des lanières de caoutchouc doivent être déposées sur le plancher du garage, sous les tractions.",
      "Le signaleur doit s'assurer d'être visible en tout temps pour l'opérateur et utiliser des signaux clairs."
    ],
    "consignes_securite": [
      {
        "regle": "L'opérateur de la chargeuse à fourche doit attendre qu'un travailleur de l'intérieur vienne le guider pour déposer ou ramasser le matériel.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 1"
      },
      {
        "regle": "Le signaleur doit s'assurer que l'espace est suffisant pour déposer ou sortir le matériel, et rester visible en tout temps par l'opérateur.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 1"
      },
      {
        "regle": "L'opérateur doit appuyer sur le klaxon de la chargeuse à deux reprises avant d'entrer.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 1"
      },
      {
        "regle": "Après avoir déposé ou ramassé le matériel, s'assurer que la voie est libre derrière le véhicule, avec l'aide du signaleur si nécessaire.",
        "theme": "Inspection & vérification",
        "source": "Étape 1"
      },
      {
        "regle": "Pour tout équipement roulant entrant/sortant, le superviseur de l'atelier doit être averti et un travailleur désigné pour ouvrir la porte et diriger l'opérateur.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 2"
      },
      {
        "regle": "Pour tout équipement sur tractions, déposer des lanières de caoutchouc sur le plancher du garage sous les tractions avant l'entrée, la sortie ou le déplacement.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étapes 2 et 3"
      },
      {
        "regle": "L'entrée, la sortie ou le déplacement de l'équipement doit se faire à vitesse très lente.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étapes 2 et 3"
      },
      {
        "regle": "Le frein de stationnement doit être appliqué quand les manœuvres sont terminées.",
        "theme": "Inspection & vérification",
        "source": "Étapes 2 et 3"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Signal sonore avant d'entrer",
        "valeur": "2 coups de klaxon"
      }
    ],
    "figures": [],
    "historique": [],
    "date_creation": "",
    "date_revision": "",
    "source_pdf": "ATELIER-MEC-001 Procédure d'entrée, sortie, déplacement d'équipement dans l'atelier.pdf",
    "langue_source": "fr",
    "notes": "Aucune date de création/révision figurant sur le document."
  },
  {
    "id": "atelier-mec-002",
    "code": "ATELIER-MEC-002",
    "titre": "Procédure de fabrication des boyaux hydrauliques",
    "categorie": "Maintenance",
    "machines": [],
    "resume": "Procédure décrivant les méthodes sécuritaires et efficaces pour fabriquer des boyaux hydrauliques : mesure et coupe du boyau, sertissage des adapteurs selon le nombre de brins et la grosseur.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires et efficaces pour fabriquer des boyaux hydrauliques.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur est responsable de respecter cette procédure. Le superviseur de l'atelier est responsable de la faire respecter. INTERPRÉTATION : le directeur de l'entretien a l'autorité pour l'interprétation de ce document.",
    "epi": [],
    "equipements": [
      "Coupe-boyau",
      "Sertisseuse"
    ],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "En tout temps, appuyer sur le bouton d'arrêt d'urgence arrête le coupe-boyau ou la sertisseuse.",
      "Fermer le garde du coupe-boyau et de la sertisseuse avant de les actionner.",
      "Lors du relâchement du sélecteur « CRIMP », les mâchoires de la sertisseuse se rétractent."
    ],
    "consignes_securite": [
      {
        "regle": "Fermer le garde et mettre la clé en position « ON » avant d'utiliser le coupe-boyau.",
        "theme": "Outils & clés",
        "source": "Étape (coupe-boyau)"
      },
      {
        "regle": "Tenir les deux bouts du boyau et appuyer sur la pédale pour le pousser dans le coupe-boyau ; relâcher la pédale dès que le boyau est coupé.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape (coupe-boyau)"
      },
      {
        "regle": "Remettre la clé à OFF quand le travail au coupe-boyau est terminé.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape (coupe-boyau)"
      },
      {
        "regle": "Choisir les mâchoires appropriées à l'adapteur et fermer le garde de la sertisseuse avant de l'insérer.",
        "theme": "Outils & clés",
        "source": "Étape (sertisseuse)"
      },
      {
        "regle": "Aligner la ligne de l'adapteur avec le bord des mâchoires de la sertisseuse avant de sélectionner l'option de sertissage.",
        "theme": "Inspection & vérification",
        "source": "Étape (sertisseuse)"
      },
      {
        "regle": "Sélectionner l'option de sertissage correspondant à la grosseur du boyau et au nombre de brins avant d'appuyer sur « CRIMP ».",
        "theme": "Inspection & vérification",
        "source": "Étape (sertisseuse)"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Options de sertissage disponibles",
        "valeur": "8, selon grosseur et nombre de brins"
      },
      {
        "libelle": "Repère de brins sur l'adapteur",
        "valeur": "2 lignes dans le bas = 2 brins"
      }
    ],
    "figures": [
      {
        "page": "2",
        "description": "Photo du coupe-boyau annotée : arrêt d'urgence, garde, pédale et clé de mise sous tension."
      }
    ],
    "historique": [],
    "date_creation": "Avril 2020",
    "date_revision": "",
    "source_pdf": "ATELIER-MEC-002 Procédure de fabrication de boyaux hydrauliques.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "atelier-mec-003",
    "code": "ATELIER-MEC-003",
    "titre": "Procédure d'utilisation de la presse hydraulique ENERPAC 50 tonnes",
    "categorie": "Maintenance",
    "machines": [],
    "resume": "Procédure définissant les méthodes sécuritaires pour l'utilisation de la presse hydraulique ENERPAC IPR 5075 (50 tonnes métriques, 10 000 psi) : ajustement, opération avec interverrouillage des portes et mesures de sécurité.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour l'utilisation de la presse hydraulique ENERPAC.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL qui ont à utiliser la presse ENERPAC 50 tonnes.",
    "responsabilites": "Les travailleurs de l'atelier qui utilisent la presse doivent respecter la procédure ; les travailleurs autour doivent être attentifs. Le superviseur de l'atelier doit la faire respecter et s'assurer que tout changement de méthode fasse l'objet d'une analyse de risques. INTERPRÉTATION : le directeur de l'entretien a l'autorité pour l'interprétation de ce document.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "La presse est conçue pour opérer seulement quand les grillages sont refermés : dès que le système d'interverrouillage est déclenché, la presse doit s'arrêter.",
      "Il est interdit de laisser la pression sur la pièce quand les portes sont ouvertes.",
      "Si la presse ne réagit pas comme prévu au déclenchement de l'interverrouillage, avertir le superviseur immédiatement.",
      "Ne pas fermer l'alimentation de la presse à l'aide de l'interverrouillage — utiliser l'interrupteur.",
      "Toujours se tenir de côté et non face aux pièces à presser."
    ],
    "consignes_securite": [
      {
        "regle": "Pour tous travaux nécessitant l'opération ou la mise sous pression de pièces avec les portes ouvertes, une analyse de risque doit être effectuée avec le surintendant SST, le superviseur de l'atelier et les travailleurs concernés.",
        "theme": "Inspection & vérification",
        "source": "Application"
      },
      {
        "regle": "Resserrer les 4 boulons de barrure et la release valve avant de pomper le cric pour ajuster la tête de la presse.",
        "theme": "Outils & clés",
        "source": "Étapes 4-5"
      },
      {
        "regle": "Fermer les deux portes et mettre l'interverrouillage en place avant d'appuyer sur l'interrupteur de la manette.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 2-5 (utilisation)"
      },
      {
        "regle": "Dès que la barre de l'interverrouillage est tournée vers le haut, le moteur cesse de fonctionner mais la pression sur la pièce continue d'être exercée.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Mesures de sécurité"
      },
      {
        "regle": "Avant de réenclencher la barre de l'interverrouillage, attendre que le message d'arrêt s'éteigne complètement sur l'écran de contrôle.",
        "theme": "Inspection & vérification",
        "source": "Mesures de sécurité"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Modèle de presse",
        "valeur": "ENERPAC IPR 5075"
      },
      {
        "libelle": "Pression maximum",
        "valeur": "10 000 psi"
      },
      {
        "libelle": "Poussée générée",
        "valeur": "50 tonnes métriques"
      }
    ],
    "figures": [
      {
        "page": "2",
        "description": "Photos des 4 boulons de barrure (2 en avant, 2 en arrière) et de la release valve du cylindre du cric."
      },
      {
        "page": "3",
        "description": "Photos de la tête de la presse en position avant maximum et arrière maximum."
      },
      {
        "page": "5",
        "description": "Photo de la manette de commande avec l'interrupteur et les flèches monter/descendre."
      },
      {
        "page": "8",
        "description": "Formulaire d'analyse de risque en annexe, à utiliser pour tout travail avec les portes ouvertes."
      }
    ],
    "historique": [],
    "date_creation": "",
    "date_revision": "",
    "source_pdf": "ATELIER-MEC-003 Procédure d'utilisation de la presse hydraulique ENERPAC 50 tonnes.pdf",
    "langue_source": "fr",
    "notes": "Aucune date de création/révision figurant sur le document."
  },
  {
    "id": "atelier-transport-001",
    "code": "ATELIER-TRANSPORT-001",
    "titre": "Procédure pour les transports à la mine Éléonore",
    "categorie": "Déplacement",
    "machines": [],
    "resume": "Procédure définissant les méthodes sécuritaires pour les transports d'équipements et de matériel à la mine Éléonore : préavis au contremaître-général, passage à la guérite, réunion de sécurité et supervision du chargement-déchargement.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour les transports d'équipements et de matériel à la mine Éléonore.",
    "application": "Cette procédure s'applique à tous ceux qui participent à l'organisation des transports et à ceux qui exécutent leurs chargements-déchargements.",
    "responsabilites": "Le chauffeur doit respecter cette procédure en tout temps. Le contremaître-général doit la faire respecter au site. Le superviseur de l'atelier doit la respecter dans l'organisation du transport. INTERPRÉTATION : le directeur de l'entretien a l'autorité pour l'interprétation de ce document.",
    "epi": [],
    "equipements": [],
    "prerequis": [
      "Passeport vaccinal obligatoire pour le chauffeur"
    ],
    "etapes": [],
    "avertissements": [],
    "consignes_securite": [
      {
        "regle": "Le contremaître-général au site doit être averti du moment du départ du transport 48 heures à l'avance par le superviseur de l'atelier.",
        "theme": "Inspection & vérification",
        "source": "Étape 2"
      },
      {
        "regle": "12 heures à l'avance, le chauffeur doit avertir le contremaître-général de l'heure prévue d'arrivée.",
        "theme": "Inspection & vérification",
        "source": "Étape 3"
      },
      {
        "regle": "Le chauffeur doit avertir le contremaître-général dès son arrivée à la guérite et respecter les consignes des agents de la guérite.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 5"
      },
      {
        "regle": "Pour les transports autres que MRI, le contremaître-général escorte le transport jusqu'au 53 pieds de SYNEE et jusqu'à la guérite au départ.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étapes 5 et 9"
      },
      {
        "regle": "Le stationnement du transport ne doit pas nuire à la circulation.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 5"
      },
      {
        "regle": "Une réunion de sécurité à partir du tableau des risques mortels doit être tenue avec le chauffeur, avec signature d'un formulaire.",
        "theme": "Inspection & vérification",
        "source": "Étape 6"
      },
      {
        "regle": "Un A-3 (analyse des tâches) doit être fait pour tout déchargement autre que des conteneurs de matériel rouge-MRI, des palettes, ou qui ne se décharge pas avec la chargeuse à fourches.",
        "theme": "Inspection & vérification",
        "source": "Étape 6"
      },
      {
        "regle": "Un contremaître-général ou un superviseur doit être sur place durant toutes les opérations de déchargement-chargement.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Étape 8"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Préavis du départ du transport",
        "valeur": "48 heures à l'avance"
      },
      {
        "libelle": "Préavis de l'heure d'arrivée",
        "valeur": "12 heures à l'avance"
      }
    ],
    "figures": [],
    "historique": [],
    "date_creation": "",
    "date_revision": "",
    "source_pdf": "ATELIER-TRANSPORT-001 Procédure pour les transports à Éléonore.pdf",
    "langue_source": "fr",
    "notes": "Aucune date de création/révision figurant sur le document. Mine et sous-traitant (SYNEE) nommément mentionnés dans le PDF source."
  },
  {
    "id": "pro-sec-010",
    "code": "PRO-SEC-010",
    "titre": "Procédure pour affûtage de trépan sous terre",
    "categorie": "Sécurité",
    "machines": [],
    "resume": "Procédure définissant les méthodes sécuritaires pour le façonnage et l'affûtage des boutons au carbure d'un trépan sous terre, avec l'équipement de protection obligatoire pour chaque étape.",
    "objectif": "L'objectif de cette procédure est de définir des méthodes sécuritaires pour effectuer l'affûtage et le façonnage d'un trépan.",
    "application": "Cette procédure s'applique à tous les employés de MACHINES ROGER INTERNATIONAL.",
    "responsabilites": "Le travailleur est responsable de son travail et doit s'assurer d'appliquer cette procédure et de respecter ces consignes. Il doit également inspecter ses EPI afin d'en garantir la bonne condition. INTERPRÉTATION : le surintendant Santé-Sécurité a l'autorité pour l'interprétation de ce document.",
    "epi": [
      "Gant de caoutchouc",
      "Salopette imperméable",
      "Visière (façonnage)",
      "Protection auditive",
      "Goggle (affûtage)"
    ],
    "equipements": [
      "Trépied",
      "Meuleuse à disque",
      "Ponceuse pneumatique"
    ],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Positionner le trépied à l'écart de la foreuse en considérant la projection d'étincelles.",
      "Les raccords électriques doivent être accrochés pour ne pas être en contact avec l'eau.",
      "Le port complet de tous les EPI, incluant la visière, est obligatoire lors du façonnage.",
      "Le port des goggles et de tous les autres EPI est obligatoire lors du ponçage."
    ],
    "consignes_securite": [
      {
        "regle": "Avant le façonnage, vérifier l'état de la meuleuse à disque : elle doit être munie d'un système de freinage automatique.",
        "theme": "Inspection & vérification",
        "source": "Façonnage"
      },
      {
        "regle": "La poignée et le garde du disque de la meuleuse doivent obligatoirement être présents ; vérifier le bon fonctionnement de l'interrupteur.",
        "theme": "Outils & clés",
        "source": "Façonnage"
      },
      {
        "regle": "S'assurer que les boyaux d'alimentation d'eau et d'air sont bien fixés à l'outil et que la poignée de la valve à air est en place et fonctionnelle avant d'ouvrir l'air lentement.",
        "theme": "Inspection & vérification",
        "source": "Affûtage, étapes 1-3"
      },
      {
        "regle": "Vérifier le bon fonctionnement de la ponceuse pneumatique et que le système de lubrification est rempli avant l'affûtage.",
        "theme": "Inspection & vérification",
        "source": "Affûtage, étapes 4-5"
      },
      {
        "regle": "Choisir la bonne meule de ponçage en fonction du diamètre du bouton à affûter.",
        "theme": "Outils & clés",
        "source": "Affûtage, étape 6"
      }
    ],
    "valeurs_cles": [],
    "figures": [],
    "historique": [],
    "date_creation": "23 juin 2016",
    "date_revision": "16 octobre 2019",
    "source_pdf": "PRO-SEC-010 Procédures pour affûtage de trépan 10-2019.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "ges-san-sec-001",
    "code": "GES-SAN-SEC-001",
    "titre": "Procédure de gestion des changements et des modifications",
    "categorie": "Sécurité",
    "machines": [],
    "resume": "Procédure de gestion des changements (MOC) définissant la marche à suivre lorsque des modifications sont souhaitées sur un système ou un équipement : analyse de risque, liste de vérification et responsables d'autorisation selon le type d'équipement.",
    "objectif": "L'objectif de cette procédure est de définir la marche à suivre quand des modifications sont souhaitées sur un système ou équipement.",
    "application": "Cette procédure s'applique à tous les employés de FORAGE SYNEE. Elle s'applique à tout changement aux paramètres de conception existants ou aux spécifications des équipements, systèmes ou processus utilisés dans nos opérations, quelle que soit la taille du changement. Elle ne s'applique pas aux travaux d'entretien ou de réparation normaux où les paramètres ou spécifications d'origine ne sont pas modifiés.",
    "responsabilites": "Le responsable d'autoriser la modification varie selon l'équipement visé (ex. directeur entretien pour l'équipement mobile et les foreuses CUBEX, surintendant électrique pour la programmation et le circuit électrique, surintendant SST pour le concept ergonomique). INTERPRÉTATION : le directeur des opérations, le surintendant SST et le directeur entretien ont l'autorité pour l'interprétation de ce document.",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [],
    "consignes_securite": [
      {
        "regle": "Avant toute modification, une analyse de risque doit être effectuée en considérant les impacts de chacun des changements sur les opérations de l'équipement.",
        "theme": "Inspection & vérification",
        "source": "Page 2"
      },
      {
        "regle": "Pour toute modification, la liste de vérification avant modification doit être utilisée pour faire la demande ; la personne responsable d'autoriser prend en compte l'ensemble des informations avant sa décision finale.",
        "theme": "Inspection & vérification",
        "source": "Page 2"
      },
      {
        "regle": "La liste de vérification couvre les consultations requises (santé-sécurité, CSS du site, supervision, travailleurs, manufacturier) et les signatures d'approbation nécessaires.",
        "theme": "Inspection & vérification",
        "source": "Page 3"
      }
    ],
    "valeurs_cles": [],
    "figures": [
      {
        "page": "3",
        "description": "Formulaire « Liste de vérification avant modification » : documentation, consultations et approbations requises avant une modification."
      }
    ],
    "historique": [
      {
        "date": "6 décembre 2021",
        "description": "Ajout d'une feuille de commentaires des intervenants et d'une place pour expliquer la modification.",
        "par": "S. Tremblay"
      },
      {
        "date": "22 mars 2022",
        "description": "Déplacement des signatures des approbateurs pour éviter la confusion.",
        "par": "S. Tremblay"
      },
      {
        "date": "20 avril 2023",
        "description": "Ajout de signatures sur le formulaire.",
        "par": "S. Tremblay"
      }
    ],
    "date_creation": "Janvier 2021",
    "date_revision": "Avril 2023",
    "source_pdf": "GES-SAN-SEC-Procédure de gestion des changements et modifications version SYNEE version mars 2022.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "procedure-serrage-marteau",
    "code": "",
    "titre": "Procédure de serrage du marteau",
    "categorie": "Maintenance",
    "machines": [
      "Marteau (ITH)",
      "V-30"
    ],
    "resume": "Dessin technique donnant la séquence et le couple de serrage des boulons de raccordement du marteau, selon qu'il est neuf ou usé, ainsi que la procédure d'inspection et de planage d'un marteau usé à la meuleuse (V-30).",
    "objectif": "Définir la séquence et le couple de serrage des boulons du marteau de forage, ainsi que la vérification et le planage requis sur un marteau usé avant le remontage.",
    "application": "S'applique à tout travailleur devant serrer ou resserrer les boulons de raccordement d'un marteau ITH, neuf ou usé.",
    "responsabilites": "",
    "epi": [],
    "equipements": [],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "Marteau usé : ne jamais meuler (« grinder ») la V-30 elle-même — seulement planer la surface du marteau au besoin.",
      "Ne pas utiliser d'anti-seize sur les boulons servant à serrer les rondelles (washer) — seulement sur les boulons (bolt) prévus."
    ],
    "consignes_securite": [
      {
        "regle": "Marteau neuf : serrer les boulons #3-4-9-10-1-6-2-5-7-12-8-11, puis torquer à 250 pi-lbs sur l'écrou (nut) #3-4-5-2-1-6, puis torquer à 1200 pi-lbs sur le boulon (bolt) #9-10-8-11-7-12.",
        "theme": "Outils & clés",
        "source": "Marteau neuf, étapes 1-3"
      },
      {
        "regle": "Marteau usé, avant remontage : retirer le marteau de la V-30, nettoyer la boue de forage et/ou la rouille, vérifier l'usure et, au besoin, planer la surface au « grinder » sans jamais meuler la V-30.",
        "theme": "Inspection & vérification",
        "source": "Marteau usé, étapes 1-3"
      },
      {
        "regle": "Marteau usé, serrage : desserrer #1-2 ; serrer #7-8, #1-2, #3-4-5-9-12-11-10 ; torquer à 250 pi-lbs sur l'écrou #3-4-1-6-2-5-9-12-11-10 ; torquer à 1200 pi-lbs sur le boulon #9-10-7-12-8-11 ; toujours mettre la rondelle sur le boulon, jamais sur l'écrou.",
        "theme": "Outils & clés",
        "source": "Marteau usé, étapes 4.1 à 4.7"
      }
    ],
    "valeurs_cles": [
      {
        "libelle": "Torque sur les écrous (nut)",
        "valeur": "250 pi-lbs"
      },
      {
        "libelle": "Torque sur les boulons (bolt)",
        "valeur": "1200 pi-lbs"
      }
    ],
    "figures": [
      {
        "page": "1",
        "description": "Dessin d'assemblage 3D du marteau monté sur son chariot de transport à roulettes."
      },
      {
        "page": "2",
        "description": "Marteau neuf : vue de face numérotant les 6 boulons et vue de côté numérotant les 6 boulons opposés (1 à 12), avec les 3 étapes de serrage."
      },
      {
        "page": "3",
        "description": "Marteau usé : photo du trépan encrassé et vue rapprochée de la meule à main utilisée pour planer la surface (jamais la V-30 elle-même)."
      },
      {
        "page": "4",
        "description": "Marteau usé : mêmes vues numérotées 1 à 12 que la page 2, avec les 7 étapes de desserrage/serrage/torque et la mise en garde sur la rondelle et l'anti-seize."
      }
    ],
    "historique": [],
    "date_creation": "6 juin 2013",
    "date_revision": "",
    "source_pdf": "Procédure de Serrage Marteau Présentation1-4 (1).pdf (4 planches fusionnées en un seul document)",
    "langue_source": "fr",
    "notes": "Dessin technique sans texte extractible (planches images) — contenu retranscrit à partir de la lecture visuelle des 4 pages. Fusion de 4 fichiers distincts en un seul PDF pour l'affichage."
  },
  {
    "id": "cadenassage-cat-416",
    "code": "",
    "titre": "Cadenassage — Caterpillar 416",
    "categorie": "Cadenassage",
    "machines": [
      "Caterpillar 416"
    ],
    "famille": "commun",
    "resume": "Fiche de cadenassage de la chargeuse-pelle Caterpillar 416F : cales de roues pour l'énergie gravitationnelle, cadenassage simple de l'interrupteur principal (ou de la poignée du panneau si celui-ci ne peut être cadenassé), essai de démarrage et décadenassage.",
    "objectif": "Cette fiche de cadenassage a comme objectif de présenter la méthode de cadenassage de la Caterpillar 416F.",
    "application": "S'applique aux travaux sur le système hydraulique, sur le système électrique et aux travaux mécaniques (filtres, courroie d'alternateur, refroidisseur, tout travail sous le capot du véhicule). Si une tâche n'apparaît pas dans cette fiche, une analyse de risque doit être faite.",
    "responsabilites": "Cette instruction de travail s'adresse à tout le personnel se trouvant dans la zone de forage et de cadenassage; toutes les sections doivent être lues. Fiche validée par Frédérick Croteau et approuvée par Christian St-Amour.",
    "epi": [
      "Équipements de protection de base sur le site minier"
    ],
    "equipements": [
      "Pince de verrouillage",
      "Cadenas personnel",
      "Cadenas de série",
      "Boîte de cadenassage (à la foreuse)",
      "Scellés",
      "Étiquettes de contrôle",
      "Ruban jaune"
    ],
    "prerequis": [
      "Permis général d'explosifs",
      "Formation FMTM modules 1, 2, 3, 4, 5 et 7",
      "Formation Cadenassage (site ou MRI)"
    ],
    "etapes": [],
    "avertissements": [
      "Si une tâche n'apparaît pas dans cette fiche, une analyse de risque doit être faite.",
      "Aucun travailleur ne peut passer au-delà du ruban jaune pendant les travaux de cadenassage s'il n'appose pas son cadenas sur la pince de verrouillage.",
      "À la mine Odyssey, seules les pinces avec crochet intégré sont conformes aux exigences.",
      "Pour le cadenassage à la mine Odyssey, l'étiquette de contrôle des énergies doit être remplie, accrochée à la pince de verrouillage et remise au superviseur, qui doit la conserver 3 mois.",
      "Si l'interrupteur principal ne peut être cadenassé, cadenasser la poignée du panneau."
    ],
    "consignes_securite": [
      {
        "regle": "Les cales de roues doivent être en place en tout temps lorsque la fiche de cadenassage est appliquée, pour éviter les déplacements inattendus du véhicule.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 1 — énergie gravitationnelle"
      },
      {
        "regle": "Fermer le contact ; toujours fermer le moteur de l'équipement par l'interrupteur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 2 — cadenassage simple"
      },
      {
        "regle": "Mettre l'interrupteur principal en position OFF, poser la pince de verrouillage sur l'interrupteur et appliquer son cadenas personnel dans un des trous de la pince, en laissant toujours un trou libre pour l'ajout d'une autre pince.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 3"
      },
      {
        "regle": "Si l'interrupteur principal ne peut être cadenassé, cadenasser plutôt la poignée du panneau et y apposer son cadenas personnel ; s'assurer que l'interrupteur principal est en position OFF.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 4"
      },
      {
        "regle": "Faire le test de démarrage sur le moteur diesel en tournant la clé de contact, pour s'assurer qu'aucun démarrage accidentel n'est possible, notamment en cas de cadenassage inadéquat.",
        "theme": "Inspection & vérification",
        "source": "Étape 5"
      },
      {
        "regle": "Pour des travaux inachevés, retirer les cadenas personnels et poser un scellé avec étiquette de contrôle sur la pince ou la boîte ; inscrire le numéro du scellé sur l'étiquette, détacher la partie amovible et la remettre au superviseur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 6-7"
      },
      {
        "regle": "Les travailleurs du quart suivant peuvent apposer leur propre pince de verrouillage et y apposer leur cadenas personnel.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 8"
      },
      {
        "regle": "Pour le décadenassage, appliquer le processus inverse.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Décadenassage"
      }
    ],
    "valeurs_cles": [],
    "figures": [],
    "historique": [],
    "date_creation": "20 mai 2025",
    "date_revision": "",
    "source_pdf": "Fiche de cadenassage - Caterpillar 416.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "cadenassage-cubex",
    "code": "",
    "titre": "Cadenassage — foreuse CUBEX",
    "categorie": "Cadenassage",
    "machines": [
      "CUBEX",
      "Foreuse CUBEX"
    ],
    "resume": "Fiche de cadenassage de la foreuse CUBEX sous terre : cadenassage simple sur le disjoncteur (pompe rock drill, système hydraulique, courroie, glissières, slip plate, JAW, solénoïde, système électrique), cadenassage multiple eau-air-disjoncteur, et cadenassage multiple eau-air-disjoncteur-énergie gravitationnelle pour les travaux sur le mât ou la boîte d'engrenage.",
    "objectif": "Cette fiche de cadenassage a comme objectif de présenter la méthode de cadenassage des foreuses CUBEX sous terre.",
    "application": "Travaux nécessitant un cadenassage simple sur le disjoncteur : changer la pompe à huile rock drill, travaux sur le système hydraulique, changer la courroie du surcompresseur, ajustements sur les glissières, changer la slip plate et son cylindre, changer le JAW, changer le solénoïde, tout travail sur le système électrique. Travaux nécessitant un cadenassage multiple sur le disjoncteur, l'eau et l'air : tout travail impliquant l'eau et l'air (filtre, refroidisseur, valves, swivel). Travaux nécessitant un cadenassage multiple eau-air-disjoncteur-énergie gravitationnelle : travaux impliquant l'énergie gravitationnelle, où le mât et/ou la boîte d'engrenage (gear box) doivent être bloqués ou mis en position pour ne pas se déplacer. Si un travail de réparation ou d'entretien qui ne nécessite pas de cadenassage n'est pas sur cette liste, une procédure l'encadre ou cette fiche s'applique.",
    "responsabilites": "Cette instruction de travail s'adresse à tout le personnel se trouvant dans la zone de forage; toutes les sections doivent être lues. Fiche validée par Martin Cyr et approuvée par Christian St-Amour.",
    "epi": [
      "Équipements de protection de base sur le site minier"
    ],
    "equipements": [
      "Pince multi-lock",
      "Cadenas personnel",
      "Cadenas de série",
      "Boîte de cadenassage (à la foreuse)",
      "Barrure mécanique",
      "Scellé",
      "Étiquette de contrôle"
    ],
    "prerequis": [
      "Permis général d'explosifs",
      "Formation FMTM modules 1, 2, 3, 4, 5 et 7",
      "Formation Cadenassage (site ou MRI)"
    ],
    "etapes": [],
    "avertissements": [
      "Si un travail de réparation ou d'entretien qui ne nécessite pas de cadenassage n'est pas sur cette liste, une procédure l'encadre ou cette fiche s'applique.",
      "Aucun travailleur ne peut passer au-delà du ruban jaune pendant les travaux de cadenassage s'il n'appose pas son cadenas sur la pince de verrouillage.",
      "Pour le cadenassage à la mine Odyssey, l'étiquette de contrôle des énergies doit être remplie, accrochée à la pince de verrouillage et remise au superviseur, qui doit la conserver 3 mois.",
      "S'assurer que toutes les lignes d'eau et d'air sont bien purgées (boyaux kinkés) avant de les cadenasser.",
      "Une valve d'air qui fuit peut provoquer une accumulation d'air dans les conduits.",
      "Pour l'énergie gravitationnelle, ne pas se placer dans la ligne de déplacement de la boîte d'engrenage (gear box)."
    ],
    "consignes_securite": [
      {
        "regle": "Cadenassage simple : appuyer sur le bouton d'arrêt de la console, puis sur l'arrêt d'urgence, puis fermer et cadenasser le disjoncteur à l'aide d'une pince de verrouillage et du cadenas personnel ; faire l'essai de démarrage sur la console et sur le panneau de la CUBEX.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage simple, étapes 1-3"
      },
      {
        "regle": "Cadenassage multiple eau-air-disjoncteur : fermer et cadenasser l'eau et l'air avec des cadenas de série, purger les lignes sur la console, ouvrir et cadenasser ouvertes les valves du receiver et du filtre à air avec des cadenas de série.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple eau-air-disjoncteur, étapes 1-2"
      },
      {
        "regle": "Appuyer sur le bouton d'arrêt de la console, puis sur l'arrêt d'urgence, fermer et cadenasser le disjoncteur avec un cadenas de série, puis déposer la clé des cadenas de série dans la boîte de cadenassage avec une pince de verrouillage pour les cadenas personnels.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple eau-air-disjoncteur, étapes 3-6"
      },
      {
        "regle": "Cadenassage multiple eau-air-disjoncteur-énergie gravitationnelle : si possible, enlever la pression du système hydraulique et appuyer les tiges ou la tête de forage et le boom au sol ; sinon, mettre le boom à 90 degrés et cadenasser la barrure mécanique sur les cylindres de dump (sauf si des tiges sont dans le trou ou que la tête V-30 est en place).",
        "theme": "Pièces en mouvement & mât",
        "source": "Cadenassage multiple gravitationnel, étapes 3-4"
      },
      {
        "regle": "Si un bris empêche de bouger l'équipement, purger l'hydraulique du cylindre pour que la boîte d'engrenage (gear box) descende sur les tables ; contrôler et récupérer l'huile et ne pas se placer dans la ligne de déplacement du gear box.",
        "theme": "Pièces en mouvement & mât",
        "source": "Cadenassage multiple gravitationnel, étape 5"
      },
      {
        "regle": "Fermer et cadenasser le disjoncteur 600 volts de la CUBEX avec un cadenas de série, déposer la clé dans la boîte de cadenassage et mettre le cadenas personnel avec la pince de verrouillage ; faire l'essai de démarrage sur la console et sur le panneau.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple gravitationnel, étapes 8-10"
      },
      {
        "regle": "Dans le cas de travaux inachevés, enlever les cadenas personnels sur la boîte de cadenassage et appliquer un scellé avec étiquette de contrôle sur la boîte ; inscrire le numéro du scellé sur l'étiquette de cadenassage, détacher la partie détachable et la remettre au superviseur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple gravitationnel, étape 9"
      },
      {
        "regle": "Pour le décadenassage, faire le processus inverse en se positionnant toujours à droite du panneau et en se servant de la main gauche pour remettre le disjoncteur à ON.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Décadenassage"
      }
    ],
    "valeurs_cles": [],
    "figures": [],
    "historique": [
      {
        "date": "19 juillet 2023",
        "description": "Ajout de l'étiquette de contrôle pour le cadenassage à la mine Odyssey.",
        "par": "S. Tremblay, F. Croteau"
      }
    ],
    "date_creation": "11 juin 2018",
    "date_revision": "Juillet 2023",
    "source_pdf": "Fiche de cadenassage - foreuse CUBEX.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "cadenassage-toyota-landcruiser",
    "code": "",
    "titre": "Cadenassage — Toyota Land Cruiser",
    "categorie": "Cadenassage",
    "machines": [
      "Toyota Land Cruiser"
    ],
    "famille": "commun",
    "resume": "Fiche de cadenassage du véhicule Toyota Land Cruiser : cales de roues pour l'énergie gravitationnelle, cadenassage simple de l'interrupteur principal, essai de démarrage et décadenassage.",
    "objectif": "Cette fiche de cadenassage a comme objectif de présenter la méthode de cadenassage du Toyota Land Cruiser.",
    "application": "S'applique aux travaux sur le système électrique et aux travaux mécaniques (filtres, courroie d'alternateur, refroidisseur, tout travail sous le capot du véhicule). Si une tâche n'apparaît pas dans cette fiche, une analyse de risque doit être faite.",
    "responsabilites": "Cette instruction de travail s'adresse à tout le personnel se trouvant dans la zone de forage et de cadenassage; toutes les sections doivent être lues. Fiche validée par Frédérick Croteau et approuvée par Christian St-Amour.",
    "epi": [
      "Équipements de protection de base sur le site minier"
    ],
    "equipements": [
      "Pince de verrouillage",
      "Cadenas personnel",
      "Cadenas de série",
      "Boîte de cadenassage (à la foreuse)",
      "Scellés",
      "Étiquettes de contrôle",
      "Ruban jaune"
    ],
    "prerequis": [
      "Permis général d'explosifs",
      "Formation FMTM modules 1, 2, 3, 4, 5 et 7",
      "Formation Cadenassage (site ou MRI)"
    ],
    "etapes": [],
    "avertissements": [
      "Si une tâche n'apparaît pas dans cette fiche, une analyse de risque doit être faite.",
      "Aucun travailleur ne peut passer au-delà du ruban jaune pendant les travaux de cadenassage s'il n'appose pas son cadenas sur la pince de verrouillage.",
      "À la mine Odyssey, seules les pinces avec crochet intégré sont conformes aux exigences.",
      "Pour le cadenassage à la mine Odyssey, l'étiquette de contrôle des énergies doit être remplie, accrochée à la pince de verrouillage et remise au superviseur, qui doit la conserver 3 mois."
    ],
    "consignes_securite": [
      {
        "regle": "Les cales de roues doivent être en place en tout temps lorsque la fiche de cadenassage est appliquée, pour éviter les déplacements inattendus du véhicule.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 1 — énergie gravitationnelle"
      },
      {
        "regle": "Fermer le contact ; toujours fermer le moteur de l'équipement par l'interrupteur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 2 — cadenassage simple"
      },
      {
        "regle": "Mettre l'interrupteur principal en position OFF, poser la pince de verrouillage sur l'interrupteur et appliquer son cadenas personnel sur un des trous de la pince, en laissant toujours un trou libre pour l'ajout d'une autre pince.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 3"
      },
      {
        "regle": "Faire le test de démarrage sur le moteur diesel en tournant la clé de contact.",
        "theme": "Inspection & vérification",
        "source": "Étape 4"
      },
      {
        "regle": "Pour des travaux inachevés, retirer les cadenas personnels et poser un scellé avec étiquette de contrôle sur la pince ou la boîte ; inscrire le numéro du scellé sur l'étiquette, détacher la partie amovible et la remettre au superviseur, en assurant une communication efficace entre les superviseurs des différents quarts de travail.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 5-6"
      },
      {
        "regle": "Les travailleurs du quart suivant peuvent apposer leur propre pince de verrouillage et y apposer leur cadenas personnel.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 7"
      },
      {
        "regle": "Pour le décadenassage, appliquer le processus inverse.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Décadenassage"
      }
    ],
    "valeurs_cles": [],
    "figures": [],
    "historique": [],
    "date_creation": "20 mai 2025",
    "date_revision": "",
    "source_pdf": "Fiche de cadenassage - Toyota Land Cruiser.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "cadenassage-kovatera-kt200",
    "code": "",
    "titre": "Cadenassage — Kovatera KT-200",
    "categorie": "Cadenassage",
    "machines": [
      "Kovatera KT-200"
    ],
    "famille": "commun",
    "resume": "Fiche de cadenassage du Kovatera KT-200 : cales de roues pour l'énergie gravitationnelle, cadenassage simple de l'interrupteur principal, essai de démarrage et décadenassage.",
    "objectif": "Cette fiche de cadenassage a comme objectif de présenter la méthode de cadenassage du Kovatera KT-200.",
    "application": "S'applique aux travaux sur le système hydraulique, sur le système électrique et aux travaux mécaniques (filtres, courroie d'alternateur, refroidisseur, tout travail sous le capot du véhicule). Si une tâche n'apparaît pas dans cette fiche, une analyse de risque doit être faite.",
    "responsabilites": "Cette instruction de travail s'adresse à tout le personnel se trouvant dans la zone de forage et de cadenassage; toutes les sections doivent être lues. Fiche validée par Frédérick Croteau et approuvée par Christian St-Amour.",
    "epi": [
      "Équipements de protection de base sur le site minier"
    ],
    "equipements": [
      "Pince de verrouillage",
      "Cadenas personnel",
      "Cadenas de série",
      "Boîte de cadenassage (à la foreuse)",
      "Scellés",
      "Étiquettes de contrôle",
      "Ruban jaune"
    ],
    "prerequis": [
      "Permis général d'explosifs",
      "Formation FMTM modules 1, 2, 3, 4, 5 et 7",
      "Formation Cadenassage (site ou MRI)"
    ],
    "etapes": [],
    "avertissements": [
      "Si une tâche n'apparaît pas dans cette fiche, une analyse de risque doit être faite.",
      "Aucun travailleur ne peut passer au-delà du ruban jaune pendant les travaux de cadenassage s'il n'appose pas son cadenas sur la pince de verrouillage.",
      "À la mine Odyssey, seules les pinces avec crochet intégré sont conformes aux exigences.",
      "Pour le cadenassage à la mine Odyssey, l'étiquette de contrôle des énergies doit être remplie, accrochée à la pince de verrouillage et remise au superviseur, qui doit la conserver 3 mois."
    ],
    "consignes_securite": [
      {
        "regle": "Les cales de roues doivent être en place en tout temps lorsque la fiche de cadenassage est appliquée, pour éviter les déplacements inattendus du véhicule.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 1 — énergie gravitationnelle"
      },
      {
        "regle": "Fermer le contact ; toujours fermer le moteur de l'équipement par l'interrupteur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 2 — cadenassage simple"
      },
      {
        "regle": "Mettre l'interrupteur principal en position OFF, poser la pince de verrouillage sur l'interrupteur et appliquer son cadenas personnel sur un des trous de la pince, en laissant toujours un trou libre pour l'ajout d'une autre pince.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 3"
      },
      {
        "regle": "Faire le test de démarrage du moteur diesel en tournant le bouton de démarrage OFF/START.",
        "theme": "Inspection & vérification",
        "source": "Étape 3 (suite)"
      },
      {
        "regle": "Pour des travaux inachevés, retirer les cadenas personnels et poser un scellé avec étiquette de contrôle sur la pince ou la boîte ; inscrire le numéro du scellé sur l'étiquette, détacher la partie amovible et la remettre au superviseur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 4-5"
      },
      {
        "regle": "Les travailleurs du quart suivant peuvent apposer leur propre pince de verrouillage et y apposer leur cadenas personnel.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 6"
      },
      {
        "regle": "Pour le décadenassage, appliquer le processus inverse.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Décadenassage"
      }
    ],
    "valeurs_cles": [],
    "figures": [],
    "historique": [],
    "date_creation": "20 mai 2025",
    "date_revision": "",
    "source_pdf": "Fiche de cadenassage - Kovatera KT-200.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "cadenassage-manitou",
    "code": "",
    "titre": "Cadenassage — Manitou",
    "categorie": "Cadenassage",
    "machines": [
      "Manitou"
    ],
    "famille": "commun",
    "resume": "Fiche de cadenassage des tracteurs Manitou : cales de roues pour l'énergie gravitationnelle, cadenassage simple de l'interrupteur principal, essai de démarrage et décadenassage.",
    "objectif": "Cette fiche de cadenassage a comme objectif de présenter la méthode de cadenassage des tracteurs Manitou.",
    "application": "S'applique aux travaux sur le système hydraulique, sur le système électrique et aux travaux mécaniques (filtres, courroie d'alternateur, refroidisseur, tout travail sous le capot du véhicule). Si une tâche n'apparaît pas dans cette fiche, une analyse de risque doit être faite.",
    "responsabilites": "Cette instruction de travail s'adresse à tout le personnel se trouvant dans la zone de forage et de cadenassage; toutes les sections doivent être lues. Fiche validée par Frédérick Croteau et approuvée par Christian St-Amour.",
    "epi": [
      "Équipements de protection de base sur le site minier"
    ],
    "equipements": [
      "Pince de verrouillage",
      "Cadenas personnel",
      "Cadenas de série",
      "Boîte de cadenassage (à la foreuse)",
      "Scellés",
      "Étiquettes de contrôle",
      "Ruban jaune"
    ],
    "prerequis": [
      "Permis général d'explosifs",
      "Formation FMTM modules 1, 2, 3, 4, 5 et 7",
      "Formation Cadenassage (site ou MRI)"
    ],
    "etapes": [],
    "avertissements": [
      "Si une tâche n'apparaît pas dans cette fiche, une analyse de risque doit être faite.",
      "Aucun travailleur ne peut passer au-delà du ruban jaune pendant les travaux de cadenassage s'il n'appose pas son cadenas sur la pince de verrouillage.",
      "À la mine Odyssey, seules les pinces avec crochet intégré sont conformes aux exigences.",
      "Pour le cadenassage à la mine Odyssey, l'étiquette de contrôle des énergies doit être remplie, accrochée à la pince de verrouillage et remise au superviseur, qui doit la conserver 3 mois."
    ],
    "consignes_securite": [
      {
        "regle": "Les cales de roues doivent être en place en tout temps lorsque la fiche de cadenassage est appliquée, pour éviter les déplacements inattendus du véhicule.",
        "theme": "Pièces en mouvement & mât",
        "source": "Étape 1 — énergie gravitationnelle"
      },
      {
        "regle": "Fermer le contact ; toujours fermer le moteur de l'équipement par l'interrupteur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 2 — cadenassage simple"
      },
      {
        "regle": "Mettre l'interrupteur principal en position OFF, poser la pince de verrouillage sur l'interrupteur et appliquer son cadenas personnel sur un des trous de la pince, en laissant toujours un trou libre pour l'ajout d'une autre pince.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 3"
      },
      {
        "regle": "Faire le test de démarrage sur le moteur diesel en tournant la clé de contact.",
        "theme": "Inspection & vérification",
        "source": "Étape suivante"
      },
      {
        "regle": "Pour des travaux inachevés, retirer les cadenas personnels et poser un scellé avec étiquette de contrôle sur la pince ou la boîte ; inscrire le numéro du scellé sur l'étiquette, détacher la partie amovible et la remettre au superviseur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 4-5"
      },
      {
        "regle": "Les travailleurs du quart suivant peuvent apposer leur propre pince de verrouillage et y apposer leur cadenas personnel.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 6"
      },
      {
        "regle": "Pour le décadenassage, faire le processus inverse.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Décadenassage"
      }
    ],
    "valeurs_cles": [],
    "figures": [],
    "historique": [],
    "date_creation": "20 mai 2025",
    "date_revision": "",
    "source_pdf": "Fiche de cadenassage - Manitou.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "cadenassage-pegasus-du311",
    "code": "",
    "titre": "Cadenassage — PEGASUS/DU-311",
    "categorie": "Cadenassage",
    "machines": [
      "Pegasus/DU-311"
    ],
    "resume": "Fiche de cadenassage de la foreuse de forage long-trou PEGASUS/DU-311 sous terre : cadenassage multiple sur la master switch et le disjoncteur, cadenassage multiple eau-air-disjoncteur, et cadenassage multiple eau-air-master switch-disjoncteur-énergie gravitationnelle pour les travaux sur le mât et/ou la boîte d'engrenage.",
    "objectif": "Cette fiche de cadenassage a comme objectif de présenter la méthode de cadenassage de la foreuse DU-311 sous terre.",
    "application": "Travaux nécessitant un cadenassage multiple sur la master switch et sur le disjoncteur : système hydraulique, changer la courroie du surcompresseur, ajustements sur les glissières, changer la slip plate et son cylindre, changer le JAW, changer le solénoïde, système électrique, travaux mécaniques sur le transporteur. Travaux nécessitant un cadenassage multiple sur le disjoncteur, l'eau et l'air : tout travail impliquant l'eau et l'air (filtre, refroidisseur, valves, swivel). Travaux nécessitant le cadenassage multiple sur l'eau, l'air, le disjoncteur et l'énergie gravitationnelle : le mât et/ou la boîte d'engrenage (gear box) doivent être bloqués ou mis en position pour ne pas se déplacer. Si un travail de réparation ou d'entretien qui ne nécessite pas de cadenassage n'est pas sur cette liste, une procédure l'encadre ou cette fiche s'applique.",
    "responsabilites": "Cette instruction de travail s'adresse à tout le personnel se trouvant dans la zone de forage; toutes les sections doivent être lues. Fiche validée par Sylvain Desrosiers et approuvée par Christian St-Amour.",
    "epi": [
      "Équipements de protection de base sur le site minier"
    ],
    "equipements": [
      "Pince multi-lock",
      "Cadenas personnel",
      "Cadenas de série",
      "Boîte de cadenassage (à la foreuse)",
      "Barrure mécanique",
      "Scellé",
      "Étiquette de contrôle"
    ],
    "prerequis": [
      "Permis général d'explosifs",
      "Formation FMTM modules 1, 2, 3, 4, 5 et 7",
      "Formation Cadenassage (site ou MRI)"
    ],
    "etapes": [],
    "avertissements": [
      "Si un travail de réparation ou d'entretien qui ne nécessite pas de cadenassage n'est pas sur cette liste, une procédure l'encadre ou cette fiche s'applique.",
      "Aucun travailleur ne peut passer au-delà du ruban jaune pendant les travaux de cadenassage s'il n'appose pas son cadenas sur la pince de verrouillage.",
      "Pour le cadenassage à la mine Odyssey, l'étiquette de contrôle des énergies doit être remplie, accrochée à la pince de verrouillage et remise au superviseur, qui doit la conserver 3 mois.",
      "S'assurer que toutes les lignes d'eau et d'air sont bien purgées (boyaux kinkés) avant de les cadenasser.",
      "Une valve d'air qui fuit peut provoquer une accumulation d'air dans les conduits.",
      "Ne pas se placer dans la ligne de déplacement de la boîte d'engrenage (gear box).",
      "Pour les travaux qui nécessitent d'appuyer les stabilisateurs au sol, une chandelle doit être installée sous l'équipement comme protection supplémentaire."
    ],
    "consignes_securite": [
      {
        "regle": "Cadenassage de la master switch et du disjoncteur : arrêter le moteur, fermer la master switch et y mettre un cadenas de série, faire un essai de démarrage avec la clé du transporteur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 1-2"
      },
      {
        "regle": "Sur l'écran des contrôles à distance, sélectionner le menu SYSTEM et appuyer sur les boutons du compresseur et de la pompe hydraulique jusqu'à ce qu'ils s'affichent en bleu (arrêt), puis appuyer sur l'arrêt d'urgence.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 3-4"
      },
      {
        "regle": "Fermer et cadenasser le disjoncteur à l'aide d'un cadenas de série, puis faire l'essai de démarrage sur la console et sur le panneau 600 volts.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 5"
      },
      {
        "regle": "Cadenassage multiple eau-air-disjoncteur : fermer et cadenasser l'eau et l'air avec des cadenas de série, purger les lignes sur la console, ouvrir et cadenasser ouvertes les valves du receiver et du filtre à air.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple eau-air-disjoncteur, étapes 1-2"
      },
      {
        "regle": "Mettre la clé des cadenas de série dans la boîte de cadenassage et une pince de verrouillage avec le ou les cadenas personnels, puis faire l'essai de démarrage sur la console et sur le panneau de la PEGASUS.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple eau-air-disjoncteur, étapes 6-7"
      },
      {
        "regle": "Cadenassage multiple eau-air-master switch-disjoncteur-énergie gravitationnelle : si possible, enlever la pression du système hydraulique et appuyer les tiges ou la tête de forage et le boom au sol ; sinon, mettre le boom à 90 degrés et cadenasser la barrure mécanique sur les cylindres de dump, sauf s'il y a des tiges dans le trou de forage ou que la tête V-30 est en place.",
        "theme": "Pièces en mouvement & mât",
        "source": "Cadenassage multiple gravitationnel, étapes 3-4"
      },
      {
        "regle": "Si un bris empêche de bouger l'équipement, purger l'hydraulique du cylindre pour que la boîte d'engrenage descende sur les tables ; contrôler et récupérer l'huile et ne pas se placer dans la ligne de déplacement du gear box.",
        "theme": "Pièces en mouvement & mât",
        "source": "Cadenassage multiple gravitationnel, étape 5"
      },
      {
        "regle": "Fermer et cadenasser le disjoncteur 600 volts avec un cadenas de série, déposer la clé dans la boîte de cadenassage attitrée à l'équipement et mettre le cadenas personnel avec la pince de verrouillage.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple gravitationnel, étapes 8-9"
      },
      {
        "regle": "Dans le cas de travaux inachevés, enlever les cadenas personnels sur la boîte de cadenassage et appliquer un scellé avec étiquette de contrôle, inscrire le numéro du scellé sur l'étiquette, détacher la partie détachable et la remettre au superviseur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple gravitationnel, étape 9"
      },
      {
        "regle": "Pour le décadenassage, faire le processus inverse en se positionnant toujours à droite du panneau et en se servant de la main gauche pour remettre le disjoncteur à ON.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Décadenassage"
      }
    ],
    "valeurs_cles": [],
    "figures": [],
    "historique": [],
    "date_creation": "10 décembre 2021",
    "date_revision": "",
    "source_pdf": "Cadenassage PEGASUS-DU-311.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "cadenassage-stopemaster",
    "code": "",
    "titre": "Cadenassage — foreuse STOPEMASTER HX",
    "categorie": "Cadenassage",
    "machines": [
      "Stopemaster HX"
    ],
    "resume": "Fiche de cadenassage des foreuses STOPEMASTER HX : cadenassage multiple sur le disjoncteur du panneau principal et l'interrupteur (master switch) du moteur diesel, avec purge des lignes d'eau et d'air si nécessaire, et gestion de l'énergie gravitationnelle (tige/bit au plancher, mât à 90 degrés ou chandelles certifiées).",
    "objectif": "Cette fiche de cadenassage a comme objectif de présenter la méthode de cadenassage des foreuses STOPEMASTER HX.",
    "application": "Travaux nécessitant un cadenassage multiple sur le disjoncteur du panneau principal et l'interrupteur (master switch) du moteur diesel : système hydraulique, ajustement de la slide, changer les JAWS ou le cylindre, changer le solénoïde, système électrique, travaux impliquant l'eau et l'air (filtres, refroidisseur, valves, boyaux à air ou à l'eau, pompe à eau), travaux sur la tête de la foreuse (drifter) comme changer le mandrin ou le seal du nez. Tâches nécessitant du cadenassage multiple sur les deux master switch et l'énergie gravitationnelle.",
    "responsabilites": "Cette instruction de travail s'adresse à tout le personnel se trouvant dans la zone de forage; toutes les sections doivent être lues. Fiche validée par Stéphane Tremblay et approuvée par Christian St-Amour.",
    "epi": [
      "EPI obligatoires du site"
    ],
    "equipements": [
      "Pinces de verrouillage",
      "Scellé",
      "Cadenas personnel",
      "Cadenas de série",
      "Boîte de cadenassage",
      "Barrures mécaniques",
      "Étiquette de contrôle"
    ],
    "prerequis": [
      "Permis d'explosifs (Québec)",
      "Common core (Ontario) ou FMTM (Québec)",
      "Formation cadenassage (site ou MRI), si applicable"
    ],
    "etapes": [],
    "avertissements": [
      "Aucun travailleur ne peut passer au-delà du ruban jaune pendant les travaux de cadenassage s'il n'appose pas son cadenas sur la pince de verrouillage.",
      "Une petite fuite peut provoquer une accumulation de pression dans les boyaux d'eau et d'air.",
      "Ne pas se positionner dans la ligne de déplacement de la tête de forage lors de la purge du cylindre de feed.",
      "Si du travail sous le transporteur est nécessaire, il doit être appuyé sur des chandelles certifiées et non seulement sur les jacks hydrauliques."
    ],
    "consignes_securite": [
      {
        "regle": "Pour les travaux impliquant l'eau et l'air, fermer les valves et purger les lignes sur la console, puis déconnecter l'air et l'eau sur les headers.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple, étape 1A"
      },
      {
        "regle": "Appuyer sur le bouton STOP de la console, puis sur l'arrêt d'urgence.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 1-2"
      },
      {
        "regle": "Mettre l'interrupteur du panneau principal en position OFF et y apposer un cadenas de série, en utilisant toujours la main gauche pour ouvrir et fermer l'interrupteur et en se plaçant à droite du panneau.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 3"
      },
      {
        "regle": "Mettre la master switch du moteur diesel en position OFF et y apposer un cadenas de série.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 4"
      },
      {
        "regle": "Mettre la clé des cadenas de série dans la boîte de cadenassage et cadenasser la boîte avec une pince de verrouillage, puis faire l'essai de démarrage avec la console et le panneau principal, et sur le moteur diesel.",
        "theme": "Inspection & vérification",
        "source": "Étapes 5-7"
      },
      {
        "regle": "Énergie gravitationnelle : si possible, relâcher le système hydraulique et appuyer la tige ou la bit sur le plancher, ou positionner le mât à 90 degrés avec le cylindre de dump complètement extensionné pour ne pas avoir de pression sur les boyaux.",
        "theme": "Pièces en mouvement & mât",
        "source": "Énergie gravitationnelle, étapes 2-3"
      },
      {
        "regle": "Si l'équipement ne peut être bougé, purger l'huile hydraulique du feed cylindre pour abaisser la tête de forage au bas ou au haut du mât selon le forage, et drainer le cylindre de dump pour qu'il soit complètement extensionné, en contrôlant et récupérant l'huile.",
        "theme": "Pièces en mouvement & mât",
        "source": "Énergie gravitationnelle, étape 4"
      },
      {
        "regle": "Pour le décadenassage, appliquer le processus inverse.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Décadenassage"
      }
    ],
    "valeurs_cles": [],
    "figures": [],
    "historique": [],
    "date_creation": "Juin 2021",
    "date_revision": "",
    "source_pdf": "Fiche de cadenassage STOPEMASTER.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "cadenassage-u6-epiroc",
    "code": "",
    "titre": "Cadenassage — foreuse au diamant U-6 EPIROC",
    "categorie": "Cadenassage",
    "machines": [
      "U-6 Epiroc"
    ],
    "famille": "diamant",
    "resume": "Fiche de cadenassage de la foreuse au diamant U-6 EPIROC : cadenassage simple du câble 600V (arrêts écran et power unit, essais de démarrage écran et panneau 600V, cadenassage du connecteur du câble) et cadenassage multiple eau-air-câble 600V.",
    "objectif": "Cette fiche de cadenassage a comme objectif de présenter la méthode de cadenassage des foreuses au diamant U-6 EPIROC. Le cadenassage simple doit se faire sur le câble 600V ; pour certains travaux, les valves à eau et à l'air devront être cadenassées ; pour l'énergie gravitationnelle, s'assurer de bien lire la section s'y rapportant.",
    "application": "S'applique aux foreuses au diamant U-6 EPIROC en secteur de forage au diamant.",
    "responsabilites": "Cette instruction de travail s'adresse à tout le personnel se trouvant dans la zone de forage; toutes les sections doivent être lues. Fiche validée par Frédérick Croteau et approuvée par Marc Rossignol.",
    "epi": [
      "Équipements de protection de base sur le site minier"
    ],
    "equipements": [
      "Pince multi-lock",
      "Cadenas personnel",
      "Cadenas de série",
      "Boîte de cadenassage (à la foreuse)",
      "Barrure mécanique",
      "Scellé",
      "Étiquette de contrôle"
    ],
    "prerequis": [
      "Permis général d'explosifs",
      "Formation FMTM modules 1, 2, 3, 4, 5 et 7",
      "Formation Cadenassage (site ou MRI)"
    ],
    "etapes": [],
    "avertissements": [
      "Aucun travailleur ne peut passer au-delà du ruban jaune pendant les travaux de cadenassage s'il n'appose pas son cadenas sur la pince de verrouillage.",
      "Pour le cadenassage à la mine Odyssey, l'étiquette de contrôle des énergies doit être remplie, accrochée à la pince de verrouillage et remise au superviseur, qui doit la conserver 3 mois.",
      "Il n'y a pas d'étape pour relâcher l'énergie résiduelle des boyaux hydrauliques : au moment de l'arrêt de la foreuse, toute pression résiduelle à l'intérieur des boyaux est relâchée par une action d'ouverture automatique des valves.",
      "Appuyer sur l'arrêt d'urgence avant de fermer le disjoncteur évite de créer un arc électrique et d'endommager le disjoncteur principal.",
      "Si la foreuse redémarre lors d'un essai de démarrage, arrêter les travaux et appeler le superviseur.",
      "S'assurer que toutes les lignes d'eau et d'air sont bien purgées (boyaux kinkés) avant de les cadenasser."
    ],
    "consignes_securite": [
      {
        "regle": "Cadenassage simple du câble 600V : à l'arrêt écran, presser simultanément à l'écran F1 et sur le bouton d'arrêt, puis presser l'arrêt d'urgence.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 1"
      },
      {
        "regle": "Arrêt power unit : appuyer sur l'arrêt d'urgence du panneau 600V et fermer le disjoncteur ; tirer l'arrêt d'urgence du panneau 600V pour avoir de l'alimentation sur les prises 120V et à l'écran afin d'effectuer le test de démarrage.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 2-3"
      },
      {
        "regle": "Essai de démarrage écran : alimenter l'écran, puis presser simultanément F1 et le bouton d'arrêt ; la foreuse ne doit pas démarrer. Essai de démarrage panneau 600V : tourner le sélecteur vers l'icône power unit et appuyer sur les boutons marqués ; la foreuse ne doit pas démarrer.",
        "theme": "Inspection & vérification",
        "source": "Étapes 5-6"
      },
      {
        "regle": "Appuyer de nouveau sur l'arrêt d'urgence du panneau 600V pour couper l'alimentation avant de débrancher le câble 600V.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 7"
      },
      {
        "regle": "Débrancher le câble 600V et installer le dispositif de cadenassage sur les 2 leviers du câble ; utiliser une pince multi-lock au besoin pour ajouter plus de 3 cadenas.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 8"
      },
      {
        "regle": "Cadenassage multiple eau-air-câble 600V : fermer et cadenasser l'eau et l'air avec des cadenas de série, puis effectuer les étapes du cadenassage simple en apposant un cadenas de série sur le câble 600V.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple, étapes 1-2"
      },
      {
        "regle": "Mettre la clé des cadenas de série dans la boîte de cadenassage et une pince de verrouillage avec le ou les cadenas personnels, en laissant toujours un trou libre sur la pince pour en remettre une autre au besoin ; faire tous les essais de démarrage.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple, étapes 3-4"
      },
      {
        "regle": "Pour le décadenassage, faire le processus inverse en se positionnant toujours à droite du panneau et en se servant de la main gauche.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Décadenassage"
      }
    ],
    "valeurs_cles": [],
    "figures": [],
    "historique": [],
    "date_creation": "Novembre 2023",
    "date_revision": "Février 2025",
    "source_pdf": "Fiche de cadenassage U-6 EPIROC.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "cadenassage-dr600mu-btidr",
    "code": "",
    "titre": "Cadenassage — foreuses mobiles DR-600 MU et BTI-DR #4845",
    "categorie": "Cadenassage",
    "machines": [
      "DR-600 MU",
      "BTI-DR #4845"
    ],
    "famille": "diamant",
    "resume": "Fiche de cadenassage des foreuses au diamant mobiles DR-600 MU et BTI-DR #4845 sous terre : cadenassage multiple (arrêt du power pack, ouverture des valves 24V pour relâcher l'énergie résiduelle hydraulique, arrêt d'urgence, disjoncteur et master switch), rallongement des conduites d'eau et d'air, et gestion de l'énergie gravitationnelle.",
    "objectif": "Cette fiche de cadenassage a comme objectif de présenter la méthode de cadenassage des foreuses au diamant mobiles DR-600 MU et de la mobile BTI-DR #4845 sous terre. Le cadenassage simple doit se faire sur le disjoncteur principal ; pour certains travaux, les valves à eau et à l'air devront être cadenassées ; pour l'énergie gravitationnelle, s'assurer de bien lire la section s'y rapportant.",
    "application": "S'applique aux foreuses au diamant mobiles DR-600 MU et BTI-DR #4845 en secteur de forage au diamant.",
    "responsabilites": "Cette instruction de travail s'adresse à tout le personnel se trouvant dans la zone de forage et de cadenassage; toutes les sections doivent être lues. Fiche validée par Frédérick Croteau et approuvée par Marc Rossignol.",
    "epi": [
      "Équipements de protection de base sur le site minier"
    ],
    "equipements": [
      "Pince de verrouillage",
      "Cadenas personnel",
      "Cadenas de série",
      "Boîte de cadenassage (à la foreuse)",
      "Scellés",
      "Étiquettes de contrôle"
    ],
    "prerequis": [
      "Permis général d'explosifs",
      "Formation FMTM modules 1, 2, 3, 4, 5 et 7",
      "Formation Cadenassage (site ou MRI)"
    ],
    "etapes": [],
    "avertissements": [
      "Aucun travailleur ne peut passer au-delà du ruban jaune pendant les travaux de cadenassage s'il n'appose pas son cadenas sur la pince de verrouillage.",
      "Pour le cadenassage à la mine Odyssey, l'étiquette de contrôle des énergies doit être remplie, accrochée à la pince de verrouillage et remise au superviseur, qui doit la conserver 3 mois.",
      "Les panneaux ne sont pas tous construits de la même manière : s'assurer d'appuyer sur le bon bouton d'arrêt.",
      "Un arrêt d'urgence enclenché rompt la communication entre le remote et le récepteur scanreco ; les valves 24V ne peuvent alors plus être actionnées.",
      "Si un mouvement ou un démarrage se produit lors des essais de démarrage, les travaux doivent être suspendus et une analyse de risque doit être effectuée.",
      "Pour tout travail où les mesures sur l'énergie gravitationnelle ne peuvent être appliquées, une analyse de risque doit être effectuée avant de procéder.",
      "Si l'équipement s'arrête, qu'il est impossible de le redémarrer et que des pièces peuvent bouger durant les travaux nécessaires, une analyse de risque doit être effectuée."
    ],
    "consignes_securite": [
      {
        "regle": "Appuyer sur l'arrêt du power pack (étape commune aux deux foreuses).",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 1"
      },
      {
        "regle": "Sélectionner chaque mode (drilling, handling, positionning) et actionner les fonctions de la manette pour ouvrir les valves 24V, ce qui retourne l'huile vers le réservoir et enlève la pression résiduelle du système, seulement une fois que toutes les valves ont été actionnées.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 2-3"
      },
      {
        "regle": "Actionner l'arrêt d'urgence des panneaux 600V, puis (sur la DR-600 MU seulement) l'arrêt d'urgence du moteur diesel.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 4-5"
      },
      {
        "regle": "Fermer et cadenasser le disjoncteur avec un cadenas de série, puis fermer et cadenasser la master switch avec un cadenas de série.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étapes 6-7"
      },
      {
        "regle": "Faire l'essai de démarrage (bouton réarmement power pack, interrupteur moteur diesel, bouton démarrage sur console) : rien ne doit se produire, sinon suspendre les travaux et effectuer une analyse de risque.",
        "theme": "Inspection & vérification",
        "source": "Étape 8"
      },
      {
        "regle": "Mettre la clé des cadenas de série dans la boîte de cadenassage et une pince de verrouillage avec le ou les cadenas personnels, en laissant toujours un trou libre.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Étape 9"
      },
      {
        "regle": "Pour le rallongement des conduites d'eau et d'air, fermer et cadenasser l'eau et l'air sur la ligne principale, le plus près possible de la fin de la ligne, avec des cadenas de série, en s'assurant que les lignes sont bien purgées avant de débrancher les boyaux.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Rallongement conduites, étapes 1-2"
      },
      {
        "regle": "Énergie gravitationnelle : pour tout travail nécessitant du cadenassage, descendre la tête à son plus bas sur la tour, soit par l'énergie de la machine, soit en enlevant le boyau hydraulique du cylindre de feed et en récupérant l'huile ; une élingue doit retenir le mât et la tête si nécessaire.",
        "theme": "Pièces en mouvement & mât",
        "source": "Énergie gravitationnelle"
      },
      {
        "regle": "Pour le décadenassage, faire le processus inverse en se positionnant toujours à droite du panneau et en se servant de la main gauche pour remettre le disjoncteur à ON.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Décadenassage"
      }
    ],
    "valeurs_cles": [],
    "figures": [],
    "historique": [
      {
        "date": "19 juillet 2023",
        "description": "Ajout de la foreuse mobile DR-600 MU dans la procédure à l'étape 2 du cadenassage multiple.",
        "par": "S. Tremblay, F. Croteau"
      },
      {
        "date": "19 juillet 2023",
        "description": "Ajout de l'étape d'actionner les commandes pour enlever la pression dans le système hydraulique.",
        "par": "S. Tremblay, F. Croteau"
      },
      {
        "date": "19 juillet 2023",
        "description": "Éclaircissement des façons de contrôler l'énergie gravitationnelle.",
        "par": "S. Tremblay, F. Croteau"
      },
      {
        "date": "18 octobre 2023",
        "description": "Ajout des photos du panneau 600V et de la master switch de la BTI-DR #4845.",
        "par": "S. Tremblay"
      }
    ],
    "date_creation": "5 avril 2021",
    "date_revision": "Octobre 2023",
    "source_pdf": "Fiche de cadenassage foreuses mobiles DR-600 MU et BTI-DR #4845.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "cadenassage-dd-stm1500",
    "code": "",
    "titre": "Cadenassage — foreuse au diamant STM-1500",
    "categorie": "Cadenassage",
    "machines": [
      "STM-1500"
    ],
    "famille": "diamant",
    "resume": "Fiche de cadenassage de la foreuse au diamant STM-1500 sous terre : cadenassage simple sur le disjoncteur principal, cadenassage multiple eau-air-disjoncteur, rallongement des conduites d'eau et d'air, et gestion de l'énergie gravitationnelle.",
    "objectif": "Cette fiche de cadenassage a comme objectif de présenter la méthode de cadenassage des foreuses au diamant sous terre. Le cadenassage simple doit se faire sur le disjoncteur principal ; pour les travaux de rallongement des conduites d'eau et d'air, les valves devront être cadenassées ; pour l'énergie gravitationnelle, s'assurer de bien lire la section s'y rapportant.",
    "application": "S'applique à la foreuse au diamant STM-1500 en secteur de forage au diamant.",
    "responsabilites": "Cette instruction de travail s'adresse à tout le personnel se trouvant dans la zone de forage et de cadenassage; toutes les sections doivent être lues. Fiche validée par Kevin Godard-Bolduc et approuvée par Marc Rossignol.",
    "epi": [
      "Équipements de protection de base sur le site minier"
    ],
    "equipements": [
      "Pince de verrouillage",
      "Cadenas personnel",
      "Cadenas de série",
      "Boîte de cadenassage (à la foreuse)",
      "Scellés",
      "Étiquettes de contrôle"
    ],
    "prerequis": [
      "Permis général d'explosifs",
      "Formation FMTM modules 1, 2, 3, 4, 5 et 7",
      "Formation Cadenassage (site ou MRI)"
    ],
    "etapes": [],
    "avertissements": [
      "Aucun travailleur ne peut passer au-delà du ruban jaune pendant les travaux de cadenassage s'il n'appose pas son cadenas sur la pince de verrouillage.",
      "Pour le cadenassage à la mine Odyssey, l'étiquette de contrôle des énergies doit être remplie, accrochée à la pince de verrouillage et remise au superviseur, qui doit la conserver 3 mois.",
      "La fiche de cadenassage doit être disponible en tout temps dans la boîte de cadenassage.",
      "Les équipements de cadenassage ne doivent pas être enlevés de la boîte de cadenassage autrement que pour être utilisés pour l'application de la mise à énergie zéro.",
      "S'assurer que toutes les lignes d'eau et d'air sont bien purgées (boyaux kinkés) avant de les cadenasser.",
      "Une valve qui fuit peut provoquer une accumulation d'air dans les conduits."
    ],
    "consignes_securite": [
      {
        "regle": "Cadenassage simple : appuyer sur le bouton d'arrêt de la console, puis sur l'arrêt d'urgence, puis actionner chaque fonction manuellement pour libérer l'énergie résiduelle hydraulique.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage simple, étapes 1-3"
      },
      {
        "regle": "Fermer et cadenasser le disjoncteur à l'aide d'une pince de verrouillage et du cadenas personnel, puis faire l'essai de démarrage sur la console et sur le panneau.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage simple, étapes 4-5"
      },
      {
        "regle": "Cadenassage multiple eau-air-disjoncteur : fermer et cadenasser l'eau et l'air avec des cadenas de série, purger les lignes, puis appuyer sur le bouton d'arrêt de la console et actionner chaque fonction manuellement pour libérer l'énergie résiduelle hydraulique.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple, étapes 1-3"
      },
      {
        "regle": "Appuyer sur l'arrêt d'urgence, fermer et cadenasser le disjoncteur avec un cadenas de série, mettre la clé des cadenas de série dans la boîte de cadenassage avec une pince de verrouillage, puis faire l'essai de démarrage.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple, étapes 4-7"
      },
      {
        "regle": "Pour le rallongement des conduites d'eau et d'air, fermer et cadenasser l'eau et l'air sur la ligne principale, le plus près possible de la fin de la ligne, avec des cadenas de série.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Rallongement conduites, étape 1"
      },
      {
        "regle": "Dans le cas de travaux inachevés, enlever les cadenas personnels sur la boîte de cadenassage ou de la pince de verrouillage et appliquer un scellé avec étiquette de contrôle ; inscrire le numéro du scellé sur l'étiquette et la remettre au superviseur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Rallongement conduites, étape 2"
      },
      {
        "regle": "Énergie gravitationnelle : pour les travaux le nécessitant, la tête doit être descendue en bas de la tour, soit par l'énergie de la machine, soit en enlevant le boyau hydraulique du cylindre de feed et en récupérant l'huile ; la procédure de cadenassage simple ou multiple doit être appliquée après que la tête soit descendue.",
        "theme": "Pièces en mouvement & mât",
        "source": "Énergie gravitationnelle"
      },
      {
        "regle": "Pour le décadenassage, faire le processus inverse en se positionnant toujours à droite du panneau et en se servant de la main gauche pour remettre le disjoncteur à ON.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Décadenassage"
      }
    ],
    "valeurs_cles": [],
    "figures": [],
    "historique": [
      {
        "date": "24 juin 2021",
        "description": "Identification du type de foreuse (STM-1500).",
        "par": "S. Tremblay"
      },
      {
        "date": "24 juin 2021",
        "description": "Ajout des bonnes pratiques page 2.",
        "par": "S. Tremblay"
      },
      {
        "date": "20 juillet 2023",
        "description": "Ajout de l'étape d'actionner les manettes avant de fermer sur le contrôle.",
        "par": "S. Tremblay"
      }
    ],
    "date_creation": "24 juin 2021",
    "date_revision": "Juillet 2023",
    "source_pdf": "Fiche de cadenassage STM-1500.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "cadenassage-dd-dr900-dr1500",
    "code": "",
    "titre": "Cadenassage — foreuses au diamant DR-900 et DR-1500",
    "categorie": "Cadenassage",
    "machines": [
      "DR-900",
      "DR-1500"
    ],
    "famille": "diamant",
    "resume": "Fiche de cadenassage des foreuses au diamant DR-900 et DR-1500 : cadenassage simple sur le panneau 600V (avec libération de l'énergie résiduelle hydraulique par les valves 24V), cadenassage multiple eau-air-disjoncteur, rallongement des conduites d'eau et d'air, et gestion de l'énergie gravitationnelle sur le mât.",
    "objectif": "Cette fiche de cadenassage a comme objectif de présenter la méthode de cadenassage des foreuses au diamant DR-900 et DR-1500. Le cadenassage simple doit se faire sur le disjoncteur principal ; pour certains travaux, les valves à eau et à l'air devront être cadenassées ; pour l'énergie gravitationnelle, s'assurer de bien lire la section s'y rapportant.",
    "application": "S'applique aux foreuses au diamant DR-900 et DR-1500 en secteur de forage au diamant.",
    "responsabilites": "Cette instruction de travail s'adresse à tout le personnel se trouvant dans la zone de forage et de cadenassage; toutes les sections doivent être lues. Fiche validée par Frédérick Croteau et approuvée par Marc Rossignol.",
    "epi": [
      "Équipements de protection de base sur le site minier"
    ],
    "equipements": [
      "Pince de verrouillage",
      "Cadenas personnel",
      "Cadenas de série",
      "Boîte de cadenassage (à la foreuse)",
      "Scellés",
      "Étiquettes de contrôle"
    ],
    "prerequis": [
      "Permis général d'explosifs",
      "Formation FMTM modules 1, 2, 3, 4, 5 et 7",
      "Formation Cadenassage (site ou MRI)"
    ],
    "etapes": [],
    "avertissements": [
      "Aucun travailleur ne peut passer au-delà du ruban jaune pendant les travaux de cadenassage s'il n'appose pas son cadenas sur la pince de verrouillage.",
      "Pour le cadenassage à la mine Odyssey, l'étiquette de contrôle des énergies doit être remplie, accrochée à la pince de verrouillage et remise au superviseur, qui doit la conserver 3 mois.",
      "L'ouverture des valves 24V doit se faire seulement lorsque toutes les valves ont été actionnées : un arrêt d'urgence enclenché rompt la communication entre le remote et le récepteur scanreco, et les valves 24V ne peuvent alors plus être actionnées.",
      "Une valve qui fuit peut provoquer une accumulation d'air dans les conduits.",
      "Pour tout travail où les mesures sur l'énergie gravitationnelle ne peuvent être appliquées, une analyse de risque doit être effectuée avant de procéder."
    ],
    "consignes_securite": [
      {
        "regle": "Cadenassage simple : appuyer sur le bouton d'arrêt du panneau 600V, puis sélectionner chaque mode (drilling, handling, positionning) et actionner les fonctions de la manette pour ouvrir les valves 24V et relâcher l'énergie résiduelle hydraulique (l'huile retourne au réservoir).",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage simple, étapes 1-2"
      },
      {
        "regle": "Appuyer sur le bouton d'arrêt de la console, puis sur l'arrêt d'urgence du panneau 600V, puis fermer et cadenasser le disjoncteur à l'aide d'une pince de verrouillage et du cadenas personnel.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage simple, étapes 3-5"
      },
      {
        "regle": "Faire l'essai de démarrage sur la console et sur le panneau 600V.",
        "theme": "Inspection & vérification",
        "source": "Cadenassage simple, étape 6"
      },
      {
        "regle": "Cadenassage multiple eau-air-disjoncteur : fermer et cadenasser l'eau et l'air avec des cadenas de série, purger les lignes, appuyer sur le bouton d'arrêt du panneau 600V et sélectionner chaque mode pour ouvrir les valves 24V.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple, étapes 1-4"
      },
      {
        "regle": "Appuyer sur le bouton d'arrêt de la console, puis sur l'arrêt d'urgence du panneau 600V, fermer et cadenasser le disjoncteur avec un cadenas de série, mettre la clé dans la boîte de cadenassage avec une pince de verrouillage, puis faire l'essai de démarrage.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Cadenassage multiple, étapes 5-9"
      },
      {
        "regle": "Pour le rallongement des conduites d'eau et d'air, fermer et cadenasser l'eau et l'air sur la ligne principale, le plus près possible de la fin de la ligne, avec des cadenas de série, en s'assurant que les lignes sont bien purgées avant de débrancher les boyaux.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Rallongement conduites, étapes 1-2"
      },
      {
        "regle": "Dans le cas de travaux inachevés, enlever les cadenas personnels sur la boîte de cadenassage ou de la pince de verrouillage et appliquer un scellé avec étiquette de contrôle ; inscrire le numéro du scellé sur l'étiquette et la remettre au superviseur.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Rallongement conduites"
      },
      {
        "regle": "Énergie gravitationnelle : descendre la tête à son plus bas sur la tour (par l'énergie de la machine ou en enlevant le boyau hydraulique du cylindre de feed et en récupérant l'huile) ; pour tout travail sur le mât, forer une tige de forage, ou déployer le mât au complet et l'appuyer au sol sans qu'il puisse bouger, ou retenir le mât et la tête avec une élingue si nécessaire.",
        "theme": "Pièces en mouvement & mât",
        "source": "Énergie gravitationnelle"
      },
      {
        "regle": "Pour le décadenassage, faire le processus inverse en se positionnant toujours à droite du panneau et en se servant de la main gauche pour remettre le disjoncteur à ON.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Décadenassage"
      }
    ],
    "valeurs_cles": [],
    "figures": [],
    "historique": [
      {
        "date": "19 juillet 2023",
        "description": "Ajout à l'étape d'actionner les commandes pour enlever la pression dans le système hydraulique.",
        "par": "S. Tremblay, F. Croteau"
      },
      {
        "date": "19 juillet 2023",
        "description": "Éclaircissement des façons de contrôler l'énergie gravitationnelle.",
        "par": "S. Tremblay, F. Croteau"
      }
    ],
    "date_creation": "5 avril 2021",
    "date_revision": "Juillet 2023",
    "source_pdf": "Fiche de cadenassage foreuse au diamant DR-900 et DR-1500.pdf",
    "langue_source": "fr",
    "notes": ""
  },
  {
    "id": "programme-maitrise-energies-dangereuses",
    "code": "",
    "titre": "Programme de maîtrise des énergies dangereuses",
    "categorie": "Sécurité",
    "machines": [],
    "famille": "commun",
    "resume": "Programme-cadre de Machines Roger International répondant aux exigences réglementaires du cadenassage (article 188.2 du Règlement sur la santé et la sécurité au travail) : rôles et responsabilités, définitions des sources d'énergie et de leur contrôle, fermeture des lieux de cadenassage, cadenassage des équipements haut voltage, décadenassage et formulaire de coupe de cadenas.",
    "objectif": "L'objectif de ce programme est de déterminer une méthode de travail fiable et sécuritaire pour effectuer la mise à énergie zéro de toute source d'énergie pour chaque équipement et zone dangereuse d'une machine à laquelle un travailleur peut être exposé lors de travaux.",
    "application": "Ce programme s'applique à tous les employés de Machines Roger International, à un sous-traitant sous notre supervision ou au client qui a à intervenir sur nos équipements. Il s'applique si le maître d'œuvre du site où nous évoluons n'oblige pas l'utilisation de sa propre procédure et de son programme de mise à énergie zéro.",
    "responsabilites": "Surintendant santé-sécurité : s'assure de l'application des procédures, qu'elles sont à jour et que tout changement est diffusé sur les sites concernés. Superviseur : s'assure que son équipe connaît et applique la procédure, valide l'exécution adéquate et le respect de la fiche de cadenassage via la carte de travail du travailleur. Travailleur : responsable de respecter et d'appliquer chaque étape de la procédure. Directeur entretien : seul avec son remplaçant à avoir l'autorité d'approuver des modifications sur les équipements ; toute modification autorisée doit faire l'objet d'une analyse pour valider si elle interfère avec la fiche de cadenassage de l'équipement. INTERPRÉTATION : le directeur des opérations a l'autorité pour l'interprétation de ce document.",
    "epi": [],
    "equipements": [
      "Cadenas personnel",
      "Pince de verrouillage",
      "Boîte de cadenassage",
      "Scellé",
      "Étiquette de contrôle"
    ],
    "prerequis": [],
    "etapes": [],
    "avertissements": [
      "La pose du ruban jaune lors du cadenassage des équipements de forage est obligatoire.",
      "Aucune pièce d'équipement ne peut être mise à énergie zéro sans que le secteur où les travaux seront effectués n'ait été informé ; le responsable du secteur autorisera l'arrêt de la pièce d'équipement.",
      "Le personnel venant de l'extérieur doit suivre la procédure de mise à énergie zéro.",
      "Avant de procéder au cadenassage, s'informer des procédures spécifiques reliées à certains équipements ou secteurs (ex. équipement mobile, source radioactive, pont roulant).",
      "Tout employé devant s'absenter doit enlever son cadenas.",
      "Lors d'un changement de quart, si le remplaçant n'a pas apposé son cadenas personnel, l'équipement doit être cadenassé par un cadenas de département ou un scellé accompagné d'une étiquette de contrôle, et le responsable du secteur doit en être avisé.",
      "La coupe d'un cadenas oublié doit s'effectuer avec une grande précaution et un bon jugement, seulement après avoir rejoint l'employé concerné ou s'être assuré hors de tout doute qu'il n'est plus sur les lieux ou qu'il est sécuritaire de décadenasser l'équipement ; la fiche « coupe de cadenas » doit être dûment remplie avant de couper le cadenas."
    ],
    "consignes_securite": [
      {
        "regle": "Avant d'entreprendre dans la zone dangereuse d'une machine tout travail de montage, d'ajustement, d'inspection, de décoinçage, de réglage, de mise hors d'usage, d'entretien, de désassemblage, de nettoyage, de maintenance, de remise à neuf, de réparation, de modification ou de déblocage, le cadenassage ou, à défaut, toute autre méthode assurant une sécurité équivalente doit être appliquée (article 188.2 du Règlement sur la santé et la sécurité au travail).",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Page 1"
      },
      {
        "regle": "Neutraliser ou contrôler les énergies secondaires ou résiduelles avant d'exécuter les travaux : purger les conduits, réservoirs et accumulateurs (hydraulique, pneumatique, eau, vapeur) ; attendre la dissipation de la chaleur (thermique) ; attendre l'arrêt total de l'appareil et détendre les ressorts (mouvement mécanique) ; stabiliser les pièces et ne pas se placer dans leur ligne de tir (force gravitationnelle) ; ventiler et/ou nettoyer, avec permis de travail en espace clos si requis (gaz, produit chimique).",
        "theme": "Pièces en mouvement & mât",
        "source": "Page 4 — définitions des sources d'énergie"
      },
      {
        "regle": "L'installation d'un ruban jaune est obligatoire lorsque du cadenassage est effectué sur un équipement.",
        "theme": "Zones d'exclusion & positionnement",
        "source": "Page 5 — fermeture des lieux de cadenassage"
      },
      {
        "regle": "Mettre les clés dans la boîte de cadenassage en s'assurant que les numéros d'identification des cadenas sont visibles ; cadenasser la boîte à l'aide d'une barrure multiple et de son cadenas personnel. Tout autre travailleur ayant à travailler sur ces équipements doit apposer son cadenas sur la boîte de cadenassage.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Page 6"
      },
      {
        "regle": "Cadenassage des équipements haut voltage (plus de 750 volts) à interrupteurs à couteaux : seules les personnes autorisées peuvent couper et remettre l'alimentation ; elles doivent vérifier qu'il n'y a plus d'alimentation avant d'appliquer la procédure de cadenassage simple ou multiple.",
        "theme": "Énergie & cadenassage (électrique 600V, E-Stop, hydraulique)",
        "source": "Page 6"
      },
      {
        "regle": "À la fin des travaux, les équipements doivent être décadenassés afin de vérifier le bon fonctionnement, puis le responsable du secteur doit être avisé que les réparations sont terminées et que l'équipement est fonctionnel.",
        "theme": "Inspection & vérification",
        "source": "Page 7 — décadenassage"
      }
    ],
    "valeurs_cles": [],
    "figures": [
      {
        "page": "8",
        "description": "Formulaire « Coupe de cadenas » : nom sur le cadenas, date, raison de la coupe, type de cadenas, responsable du cadenassage."
      }
    ],
    "historique": [],
    "date_creation": "Mars 2018",
    "date_revision": "Avril 2022",
    "source_pdf": "Programme de maîtrise des énergies dangereuses.pdf",
    "langue_source": "fr",
    "notes": "Document-cadre transversal à toutes les fiches de cadenassage par équipement (catégorie Cadenassage)."
  }
];

