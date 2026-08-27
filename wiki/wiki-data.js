/* Wiki RPS — contenu des pages.
   Chaque page reprend une note du vault Obsidian SST1010 : `meta` est le
   frontmatter YAML d'origine, `body` le markdown intégral (sans le H1, porté
   par `title`). Les corps restent du markdown brut : le rendu (wikiliens
   [[...]], titres, listes, callouts) est fait par wiki.js au chargement.
   NOTE : trois notes sources étaient tronquées en fin de fichier
   (Communication, Conditions de Travail, Facteurs Organisationnels) — leur
   dernière ligne de sources a été complétée au plus près de l'original. */
window.WIKI_PAGES = [

{
  title: 'Accueil',
  aliases: ['00 - 🏠 Accueil', '00 - Accueil'],
  home: true,
  meta: null,
  body: `
Bienvenue sur le **wiki RPS** — la base de connaissances sur les **risques psychosociaux (RPS)** en milieu de travail minier, construite à partir du vault SST1010 (*Dimensions psychosociales en santé et sécurité au travail*). Chaque **thème** regroupe les notions clés, leur application terrain en contexte de forage, et les sources qui les appuient.

## Thèmes

- [[Communication]] — les flux d'information qui structurent l'organisation : axes descendant, ascendant et latéral, réunions d'équipe, situations difficiles, milieu confiné.
- [[Conditions de Travail]] — charge de travail, latitude décisionnelle, horaires et rotations, statut d'emploi : les caractéristiques concrètes du poste.
- [[Conflits et Harcèlement]] — du désaccord à la violence : typologie, escalade, médiation, harcèlement psychologique et cadre légal.
- [[Évaluation et Outils]] — instruments environnementaux (Karasek, Siegrist, INSPQ) et cliniques (PHQ-9, K10, PCL-5, MBI), méthodologie et indicateurs.
- [[Facteurs Organisationnels]] — climat, culture, soutien social, rôles et sens du travail : l'environnement humain autour de la tâche.

## Comment lire ce wiki

Les liens **bleus** mènent à des pages existantes. Les liens **rouges pointillés** désignent des pages référencées mais pas encore créées — c'est la matière à rédiger ensuite (la liste complète est dans le menu de gauche). Chaque page affiche ses **propriétés** héritées du vault (statut, qualité, sensibilité, publication) et, en bas, les pages qui pointent vers elle.

> [!warning] Contenu de travail
> Ces pages sont des **ébauches internes**. Elles ne sont pas destinées à la diffusion aux travailleurs ni aux gestionnaires sans validation préalable — voir les propriétés de publication de chaque page.
`
},

{
  title: 'Communication',
  meta: {
    'tags': ['wiki', 'thème', 'communication', 'relations'],
    'type': 'thème',
    'niveau-sensibilité': 1,
    'publication-travailleur': 'non',
    'publication-gestionnaire': 'à-réviser',
    'traitement-publication': 'gestionnaire-a-valider',
    'archive-candidat': false,
    'version-jumelle': '',
    'statut': 'ébauche',
    'qualité': 'ébauche',
    'révision': '2026-05-22'
  },
  body: `
La **communication organisationnelle** est l'ensemble des flux d'information qui structurent une entreprise. Elle conditionne la clarté des rôles, la coordination des opérations, la qualité de la prise de décision et - souvent sous-estimé - la santé psychologique des travailleurs. Une organisation où l'information circule mal génère mécaniquement de l'ambiguïté de rôle, de l'iniquité perçue, des conflits évitables et un déficit de reconnaissance, autant de facteurs [[Risques Psychosociaux (RPS)|RPS]] au sens strict.

## Table des matières

- [Trois axes de communication](#trois-axes-de-communication)
- [Réunions d'équipe](#réunions-déquipe)
- [Communication en situation difficile](#communication-en-situation-difficile)
- [Communication en milieu confiné](#communication-en-milieu-confiné)
- [Application terrain](#application-terrain)
- [Sources](#sources)

## Trois axes de communication

La communication se décline en trois axes complémentaires.
1. La [[Communication descendante|communication descendante]] (direction → travailleurs) porte les décisions, les consignes, la vision stratégique et les changements organisationnels ; bien faite, elle réduit l'ambiguïté de rôle et limite les rumeurs.
2. La [[Communication ascendante|communication ascendante]] (travailleurs → direction) porte les signalements, les idées d'amélioration, les doléances et les signaux faibles ; c'est le **principal canal de détection précoce des RPS** et des problèmes opérationnels.
3. La [[Communication latérale|communication latérale]] (entre pairs et entre équipes, entre quarts et entre départements) soutient la coordination opérationnelle et le partage d'expérience.

Ces trois axes ne sont pas équivalents : une organisation peut être très forte en descendante (la direction parle beaucoup) et très faible en ascendante (les travailleurs ne se sentent pas écoutés). Cette asymétrie est identifiée par [[Analyse Paulin et Griffin (2016)|Paulin et Griffin (2016)]] et [[Analyse Fruhen et al. (2023)|Fruhen et al. (2023)]] comme un signe pathologique fréquent en milieu minier. Quand l'ascendante se ferme, l'organisation découvre ses problèmes par la voie des arrêts maladie ou des accidents.

## Réunions d'équipe

Les [[Réunions d'équipe efficaces|réunions d'équipe efficaces]] sont le principal outil de communication collective : cadrage clair, ordre du jour respecté, parole distribuée, suivi des engagements. Mal menées, elles drainent du temps sans rien produire. Sur un site minier, le toolbox meeting court (10-15 min) en début de quart est probablement le format le plus rentable, à condition d'avoir un sujet rotatif réel (pas qu'un point sécurité formel).

## Communication en situation difficile

La capacité du gestionnaire à mener une [[Communication en situation difficile|communication en situation difficile]] (annoncer une mauvaise nouvelle, recadrer un comportement, accueillir une plainte, soutenir un travailleur en détresse) est probablement la compétence la plus déterminante du superviseur en matière de RPS. Ces compétences ne sont pas innées : elles se forment, et elles se mesurent à travers les indicateurs d'engagement et de roulement de l'équipe.

## Communication en milieu confiné

La [[Communication souterraine et isolement de l'équipe|communication souterraine et l'isolement de l'équipe]] est un cas particulier qui mérite un traitement séparé : contraintes physiques (bruit, éloignement, télécommunications limitées), équipes restreintes en environnement clos, dépendance à la cage et aux dispositifs de communication d'urgence. Une équipe qui communique mal en souterrain est une équipe à risque accru, à la fois pour la sécurité physique et pour la santé psychologique.

## Application terrain

En mine, la qualité de la communication descendante de quart en quart (handover, briefing) et la communication ascendante des chantiers vers la direction sont des conditions de sécurité physique avant d'être des conditions psychosociales. Un handover bâclé en début de quart de nuit produit des erreurs ; un signalement de terrain instable qui ne remonte pas peut produire un accident grave. Mais les deux dimensions sont indissociables : un travailleur qui ne se sent pas écouté sur les conditions de travail ne signalera pas non plus un terrain qui bouge.

Les rituels concrets qui font une différence sur un site minier : un toolbox meeting court en début de quart avec un sujet rotatif, un canal de signalement anonyme pour les comportements à risque, des rencontres bilatérales superviseur-travailleur trimestrielles (15 min, hors évaluation de performance), un compte rendu visible des suites données aux suggestions du chantier. Aucun de ces rituels ne demande d'investissement matériel ; ils demandent une discipline managériale soutenue. Les pièges fréquents : confusion entre toolbox SST et réunion de production, communication descendante uniquement à travers le contremaître (jeu téléphone arabe), absence de feedback sur les suggestions reçues (effet « boîte noire »).

## Sources

- Modules 10 et 11 du cours SST1010
- Paulin et Griffin (2016), leadership et communication SST → [[Analyse Paulin et Griffin (2016)]]
- Fruhen et al. (2023), culture SST en mine et communication → [[Analyse Fruhen et al. (2023)]]

[[00 - 🏠 Accueil|← Accueil]]
`
},

{
  title: 'Conditions de Travail',
  meta: {
    'tags': ['wiki', 'thème', 'conditions-travail', 'RPS'],
    'type': 'thème',
    'niveau-sensibilité': 2,
    'publication-travailleur': 'non',
    'publication-gestionnaire': 'non',
    'traitement-publication': 'source-gestionnaire',
    'archive-candidat': false,
    'version-jumelle': '',
    'statut': 'ébauche',
    'qualité': 'brouillon',
    'révision': '2026-05-22'
  },
  body: `
Les **conditions de travail** désignent les caractéristiques concrètes et observables d'un poste qui conditionnent la santé, la sécurité et la performance des travailleurs. Côté psychosocial, certaines conditions sont devenues des facteurs de risque documentés. Ces variables sont au cœur des modèles théoriques (voir [[Modèles et Théories]]) et sont les conditions les plus directement modifiables par l'organisation, contrairement aux facteurs culturels ou relationnels qui demandent du temps.

## Table des matières

- [Charge de travail](#charge-de-travail)
- [Latitude et autonomie](#latitude-et-autonomie)
- [Horaires et rotations](#horaires-et-rotations)
- [Statut d'emploi](#statut-demploi)
- [Application terrain](#application-terrain)
- [Sources](#sources)

## Charge de travail

La [[✅ Charge de travail élevée|charge de travail élevée]] regroupe le rythme, le volume, la complexité et l'intensité émotionnelle de la tâche. C'est la dimension « [[Demandes psychologiques|demande psychologique]] » du modèle de [[Modèle de Karasek|Karasek]], et probablement le facteur le plus universellement présent dans les milieux industriels. Une charge soutenable dépend autant du volume absolu que des marges de récupération (pauses, séquences de repos) et du soutien disponible.

## Latitude et autonomie

La [[Faible latitude décisionnelle|faible latitude décisionnelle]] désigne le manque de contrôle sur les méthodes, l'ordonnancement des tâches, le rythme et les pauses. Un poste à demande élevée *et* faible latitude est la définition même du [[Iso-strain - Ce que ça signifie|job strain]] de Karasek - la zone à plus haut risque [[Risques Psychosociaux (RPS)|RPS]]. La latitude est l'un des leviers les plus rentables à activer, car son augmentation est souvent peu coûteuse opérationnellement, mais nécessite un changement de culture managériale.

## Horaires et rotations

Les [[Horaires atypiques et travail de nuit|horaires atypiques et le travail de nuit]] perturbent le rythme circadien et génèrent une dette de sommeil chronique, avec effets cardiovasculaires, métaboliques et cognitifs documentés. L'[[Aménagement des horaires et rotations|aménagement des horaires et des rotations]] (longueur des quarts, séquences de nuit, pauses, repos hebdomadaire, transitions) est l'un des leviers les plus puissants pour réduire les conséquences négatives, à condition d'être pensé en cohérence avec les autres conditions du poste.

## Statut d'emploi

Le [[Statut précaire et travail atypique|statut précaire]] (sous-traitance, contrats courts, agence, absence de syndicat) est un facteur transversal qui amplifie tous les autres facteurs en réduisant le pouvoir de signalement du travailleur. Un travailleur en sous-traitance est moins protégé contre les charges abusives, accède moins aux ressources de l'opérateur principal, et hésite plus à dénoncer une situation. C'est un facteur structurel souvent invisible dans les démarches RPS standards.

## Application terrain

Un poste minier en [[Comparatif des cycles FIFO (14-14, 20-10, 21-7)|FIFO]] long peut cumuler charge physique élevée, faible contrôle sur les méthodes (procédures imposées, plan de minage non négociable), horaires perturbant le sommeil (12 h, nuit, séquences longues), et statut de sous-traitance qui coupe des ressources de l'opérateur principal. Identifier les conditions une par une permet d'agir là où ça donne des résultats, mais l'évaluation finale doit toujours être faite *en cumul*.

Quelques signaux de cumulation à surveiller en chantier, identifiés par l'[[Analyse INSPQ (2018)|INSPQ (2018)]] et [[Analyse INSPQ (2024)|2024]] et [[Analyse Tissot et al. - INSPQ (2022)|Tissot et al. (INSPQ, 2022)]] sur la dose-réponse RPS : montée des heures supplémentaires non planifiées, érosion des pauses (repas pris dans la cage), allongement des handovers de quart sans compensation, baisse du nombre de signalements de presque-accidents (signe que la communication ascendante se ferme), augmentation des consultations PAE pour anxiété ou troubles du sommeil. Ces indicateurs précèdent typiquement les arrêts maladie de 12 à 24 mois. Les leviers les plus rentables en mine sont rarement coûteux : ajuster la longueur des séquences de nuits, formaliser des micro-pauses récupératrices, redonner de l'autonomie sur l'ordonnancement intra-quart.

## Sources

- Module 2 du cours SST1010
- INSPQ, Grille d'identification des RPS → [[Analyse INSPQ (2021a)]] · [[Grille INSPQ d'identification des RPS]]
- Karasek (1979) → [[Analyse Karasek (1979)]]
- INSPQ (2018), RPS en milieu minier → [[Analyse INSPQ (2018)]]
- Tissot et al., INSPQ (2022), dose-réponse RPS → [[Analyse Tissot et al. - INSPQ (2022)]]
- Torquati et al. (2019), travail posté et santé → [[Analyse Torquati et al. (2019)]]

[[00 - 🏠 Accueil|← Accueil]]
`
},

{
  title: 'Conflits et Harcèlement',
  meta: {
    'tags': ['wiki', 'thème', 'conflits', 'harcèlement', 'violence'],
    'type': 'thème',
    'niveau-sensibilité': 2,
    'publication-travailleur': 'non',
    'publication-gestionnaire': 'non',
    'traitement-publication': 'source-gestionnaire',
    'archive-candidat': false,
    'version-jumelle': '',
    'statut': 'ébauche',
    'qualité': 'brouillon',
    'révision': '2026-05-22'
  },
  body: `
Le thème **Conflits et Harcèlement** couvre les dynamiques relationnelles dégradées au travail, depuis le simple désaccord jusqu'aux situations de violence ou de harcèlement encadrées par la loi. Ces situations sont à la fois des facteurs [[Risques Psychosociaux (RPS)|RPS]] au sens strict, des manquements à des obligations légales, et des expériences cliniquement significatives pour les travailleurs concernés.

## Table des matières

- [Comprendre le conflit](#comprendre-le-conflit)
- [Sources des conflits](#sources-des-conflits)
- [Dynamique d'escalade](#dynamique-descalade)
- [Médiation et résolution](#médiation-et-résolution)
- [Harcèlement psychologique](#harcèlement-psychologique)
- [Violence au travail](#violence-au-travail)
- [Application terrain](#application-terrain)
- [Sources](#sources)

## Comprendre le conflit

La porte d'entrée est la [[✅Définition et typologie des conflits au travail|définition et typologie des conflits au travail]] qui distingue conflit intrapersonnel (en soi-même), interpersonnel (entre deux personnes), intragroupe (au sein d'une équipe) et intergroupe (entre équipes ou départements). Les conflits ne sont pas tous pathologiques : un conflit de **tâche** bien régulé (désaccord sur la méthode ou la stratégie) peut améliorer une décision et stimuler la créativité ; un conflit de **relation** (animosité personnelle, manque de confiance) dégrade rapidement la santé et la performance.

## Sources des conflits

Les [[Sources des conflits|sources de conflit en milieu de travail]] sont assez stables d'un contexte à l'autre : ambiguïté de rôle (qui fait quoi, qui décide), compétition pour des ressources rares (équipement, budget, postes désirés), différences de valeurs ou de styles de travail, problèmes de communication (rumeur, malentendu, absence d'information), inégalités perçues dans la distribution des charges ou des récompenses. Identifier la source réelle d'un conflit, plutôt que de réagir à ses manifestations, est la première étape de toute intervention.

## Dynamique d'escalade

La dynamique d'un conflit suit une trajectoire prévisible - voir [[Escalade et désescalade des conflits|le modèle d'escalade et de désescalade]] qui décrit typiquement neuf paliers, depuis la divergence ouverte (palier 1, encore négociable) jusqu'à la destruction mutuelle (palier 9, plus rien à sauver). Plus on intervient tôt, plus les outils disponibles sont nombreux et moins coûteux : conversation directe, recadrage par le supérieur, médiation interne.

## Médiation et résolution

Quand le conflit ouvert s'installe et que la communication directe devient improductive, la [[Médiation et résolution de conflits|médiation]] (interne ou externe) reste l'intervention de référence avant le recours judiciaire ou administratif. Le coût d'une médiation est typiquement 5 à 20 fois inférieur à celui d'un congédiement contesté. Une médiation suppose la volonté des deux parties d'y participer ; en cas de harcèlement avéré, elle n'est pas indiquée.

## Harcèlement psychologique

Le [[Harcèlement psychologique au travail|harcèlement psychologique]] est défini par la [[LNT (normes du travail)|Loi sur les normes du travail]] comme une conduite vexatoire, répétée, hostile ou non désirée, qui porte atteinte à la dignité ou à l'intégrité du travailleur. Voir [[Harcèlement psychologique vs conflit|harcèlement psychologique vs conflit]] pour la distinction qui est juridiquement et cliniquement déterminante (un conflit n'est pas un harcèlement, et confondre les deux mène à des erreurs d'intervention). La [[Harcèlement psychologique, recours|grille des recours disponibles]] couvre les voies internes, [[CNESST, rôles et pouvoirs|CNESST]], Tribunal administratif du travail et civiles, qui peuvent être cumulées selon l'objectif visé (cessation, indemnisation, sanction).

## Violence au travail

La [[Violence au travail|violence au travail]] (verbale, physique, sexuelle) impose à l'employeur des obligations spécifiques d'identification, de prévention, d'intervention et de soutien post-événement (voir aussi [[Soutien et Ressources]] pour le soutien post-événement traumatique). Ces situations exigent un traitement formel et documenté, distinct de la gestion des conflits courants (voir [[Législation et Normes]] pour le cadre juridique).

## Application terrain

L'environnement minier amplifie les conflits : équipes restreintes, proximité forcée 12 heures par quart, fatigue accumulée, hiérarchies marquées (foreur, aide-foreur, contremaître, capitaine) et absence de porte de sortie sociale en camp [[Comparatif des cycles FIFO (14-14, 20-10, 21-7)|FIFO]]. Un travailleur en conflit avec son aide-foreur ne peut pas simplement « éviter le bureau » : il partage la cage de descente, le repas, le quart entier et, en FIFO, le camp.

Un conflit qui couve devient rapidement un problème de sécurité parce que la communication critique cesse : on ne se parle plus pour signaler un terrain instable, un équipement défectueux, un comportement à risque. La règle terrain est claire : un conflit non traité depuis plus de quelques semaines entre deux travailleurs d'un même chantier doit être considéré comme un risque opérationnel, au même titre qu'un défaut d'équipement.

Côté harcèlement et violence, le contexte minier porte des risques spécifiques documentés par Bowers et al. (2018) sur le secteur minier australien et par Fruhen et al. (2023) sur la culture SST minière : forte proportion masculine, culture de la blague crue, hiérarchies informelles fortes (le « senior » a un statut). Ces caractéristiques ne *causent* pas le harcèlement mais peuvent en faciliter la banalisation et compliquer le signalement. Selon la [[CNESST, rôles et pouvoirs|CNESST]] (2023), une politique formelle, une formation des superviseurs et un canal de signalement protégé sont les trois piliers attendus.

## Sources

- Modules 10 et 11 du cours SST1010
- [[LNT (normes du travail)|Loi sur les normes du travail]], harcèlement psychologique
- [[CNESST, rôles et pouvoirs|CNESST]] (2023), pratiques en harcèlement et violence → [[Analyse CNESST (2023)]]
- Gouvernement du Canada (2023), guide santé psychologique → [[Analyse Gouvernement du Canada (2023)]]
- Recherches en communication organisationnelle

[[00 - 🏠 Accueil|← Accueil]]
`
},

{
  title: 'Évaluation et Outils',
  meta: {
    'tags': ['wiki', 'thème', 'mesure', 'questionnaires', 'instruments'],
    'type': 'thème',
    'niveau-sensibilité': 3,
    'publication-travailleur': 'non',
    'publication-gestionnaire': 'non',
    'traitement-publication': 'interne-non-publie',
    'archive-candidat': false,
    'version-jumelle': '',
    'statut': 'ébauche',
    'qualité': 'brouillon',
    'révision': '2026-05-22'
  },
  body: `
La **mesure des [[Risques Psychosociaux (RPS)|RPS]]** s'appuie sur deux familles d'outils complémentaires qu'il ne faut surtout pas confondre. Les **instruments environnementaux** chiffrent les caractéristiques du travail (le poste, l'organisation) ; les **instruments cliniques** chiffrent l'état de santé du travailleur (la personne). Confondre les deux conduit à des erreurs lourdes : conclure qu'un département a un problème de RPS à partir de scores de symptômes, ou conclure qu'un travailleur va mal à partir d'un mauvais score de Karasek pour son poste.

## Table des matières

- [Démarches d'évaluation](#démarches-dévaluation)
- [Instruments environnementaux](#instruments-environnementaux)
- [Instruments cliniques](#instruments-cliniques)
- [Méthodologie de passation](#méthodologie-de-passation)
- [Suivi et indicateurs](#suivi-et-indicateurs)
- [Application terrain](#application-terrain)
- [Sources](#sources)

## Démarches d'évaluation

Pour structurer une démarche complète, voir l'[[Audit psychosocial complet, méthodologie|audit psychosocial complet]] qui décrit la séquence de A à Z (cadrage, collecte, analyse, restitution, plan d'action). Un audit n'est pas qu'un sondage : il combine des instruments quantitatifs, des entretiens qualitatifs et des données administratives pour produire un diagnostic robuste.

## Instruments environnementaux

Trois instruments environnementaux dominent au Québec. Le [[Questionnaire de Karasek (JCQ)|Job Content Questionnaire (JCQ) de Karasek]] mesure la demande psychologique, la latitude décisionnelle et le soutien social, et permet de classer les postes dans la matrice à quatre quadrants (job strain, actif, passif, low strain). Le [[Questionnaire de Siegrist (ERI)|Effort-Reward Imbalance (ERI) de Siegrist]] mesure le déséquilibre efforts-récompenses plus la dimension du surengagement individuel. La [[Grille INSPQ d'identification des RPS|grille INSPQ]] couvre les sept facteurs du cadre québécois et est conçue pour un usage organisationnel par un comité SST, sans expertise statistique requise.

## Instruments cliniques

Quatre instruments cliniques couvrent les principales catégories de souffrance liées au travail. Le [[PHQ-9]] (Patient Health Questionnaire à 9 items) mesure les symptômes dépressifs sur deux semaines avec des seuils standardisés. Le [[K10]] (Kessler à 10 items) mesure la détresse psychologique non spécifique, très utilisé en santé publique au Québec. Le [[PCL-5]] (PTSD Checklist for DSM-5) cible le trouble de stress post-traumatique. Le [[MBI, épuisement professionnel|MBI (Maslach Burnout Inventory)]] mesure les trois dimensions du burnout : épuisement émotionnel, cynisme/dépersonnalisation, perte d'efficacité professionnelle.

## Méthodologie de passation

Toute mesure exige une méthodologie rigoureuse. Voir [[Bonnes pratiques pour administrer un questionnaire|bonnes pratiques pour administrer un questionnaire]] pour la passation (consentement éclairé, conditions matérielles, taux de réponse minimal, protection contre l'identification indirecte dans les petits groupes), [[Interpréter les scores|interpréter les scores]] pour la lecture des résultats (seuils, comparaisons aux normes québécoises, granularité acceptable), et [[Confidentialité et éthique des mesures RPS|confidentialité et éthique des mesures RPS]] pour le cadre déontologique - particulièrement critique quand on transmet des résultats à un employeur.

## Suivi et indicateurs

Une mesure ponctuelle ne suffit pas : elle doit s'intégrer dans un système de suivi récurrent. Les [[Indicateurs RH pour suivre les RPS|indicateurs RH pour suivre les RPS]] (absentéisme courte/longue durée, roulement, accidents avec/sans arrêt, plaintes, utilisation PAE) constituent le suivi continu. Le [[Tableau de bord SST psychosociale pour direction|tableau de bord SST psychosociale pour direction]] consolide ces indicateurs en format décisionnel pour le comité de direction, avec seuils d'alerte et trajectoires.

> [!warning] Limite à retenir
> Ces instruments mesurent des environnements de travail ou des niveaux de symptômes, **pas des diagnostics**. Un score élevé au [[PHQ-9]] ne diagnostique pas une dépression : il indique qu'un suivi clinique est justifié. Détecter et référer, pas diagnostiquer.

## Application terrain

Sans mesure, pas de gestion. Pour convaincre la direction d'investir dans la prévention RPS, ou pour démontrer qu'un département a un problème structurel, il faut des chiffres validés scientifiquement. Cette traduction en chiffres comparables est ce qui distingue une intervention RPS d'une simple intuition de gestionnaire.

En contexte minier, la passation pose des défis spécifiques. Les taux de réponse sont fragiles : un travailleur en quart de 12 h ne remplit pas un questionnaire de 80 items entre la cage et le souper. Le mode papier-crayon en salle de change, court (15-20 minutes max), avec garantie écrite de confidentialité, donne typiquement de meilleurs taux qu'un sondage en ligne. La granularité des résultats doit aussi être réfléchie : on ne publie pas un score moyen pour un quart de quatre travailleurs sous peine de ré-identification. Une stratégie efficace combine un instrument environnemental annuel ou bisannuel (Karasek ou grille INSPQ) à des indicateurs administratifs en continu et à des données qualitatives (entretiens, comité SST, focus groups).

## Sources

- Karasek (1979) → [[Analyse Karasek (1979)]]
- Karasek et Theorell (1990) → [[Analyse Karasek et Theorell (1990)]]
- Siegrist (1996) → [[Analyse Siegrist (1996)]]
- INSPQ (2021), 7 facteurs RPS → [[Analyse INSPQ (2021a)]]
- Tissot et al., INSPQ (2022), épidémiologie québécoise RPS → [[Analyse Tissot et al. - INSPQ (2022)]]
- Kroenke et al. (2001), [[PHQ-9]]
- Kessler et al. (2002), K10
- Maslach et al. (1996), MBI

[[00 - 🏠 Accueil|← Accueil]]
`
},

{
  title: 'Facteurs Organisationnels',
  meta: {
    'tags': ['wiki', 'thème', 'facteurs-organisationnels', 'RPS'],
    'type': 'thème',
    'niveau-sensibilité': 1,
    'publication-travailleur': 'non',
    'publication-gestionnaire': 'à-réviser',
    'traitement-publication': 'gestionnaire-a-valider',
    'archive-candidat': false,
    'version-jumelle': '',
    'statut': 'ébauche',
    'qualité': 'ébauche',
    'révision': '2026-05-22'
  },
  body: `
Les **facteurs organisationnels** désignent les caractéristiques diffuses d'une organisation qui influencent la santé psychosociale au-delà des conditions concrètes du poste. Là où les [[Conditions de Travail|conditions de travail]] portent sur la tâche elle-même, les facteurs organisationnels portent sur l'**environnement humain** dans lequel la tâche s'exécute. Leur influence est moins immédiate mais souvent plus durable, et leur correction demande un travail de fond sur les pratiques managériales, mesurable typiquement à 18-36 mois.

## Table des matières

- [Climat et culture](#climat-et-culture)
- [Soutien social](#soutien-social)
- [Rôles et responsabilités](#rôles-et-responsabilités)
- [Sens et qualité de vie](#sens-et-qualité-de-vie)
- [Application terrain](#application-terrain)
- [Sources](#sources)

## Climat et culture

Le [[Climat organisationnel et santé psychologique|climat organisationnel]] est la perception partagée des travailleurs sur les valeurs réelles de l'organisation (par opposition aux valeurs affichées). Un climat sain se reconnaît à des indicateurs concrets : équité perçue dans la distribution des charges et opportunités, sécurité psychologique pour signaler les problèmes, cohérence entre les discours et les décisions. Le climat n'est pas mesuré par les questionnaires environnementaux classiques (Karasek, Siegrist) mais par des outils dédiés et par les indicateurs RH (roulement, absentéisme, plaintes).

## Soutien social

Le [[Soutien social au travail|soutien social]] reçu du supérieur immédiat et des collègues est l'un des facteurs les plus fortement protecteurs documentés en santé psychosociale. Il modère l'effet des conditions de travail difficiles : un travailleur en charge élevée mais bien soutenu présente un risque RPS nettement inférieur au même travailleur isolé. C'est la dimension qui explique pourquoi les modèles classiques de Karasek ont été étendus pour intégrer le soutien (zone d'iso-strain quand le soutien manque aussi).

## Rôles et responsabilités

L'[[Ambiguïté et conflit de rôle|ambiguïté de rôle]] (qui décide quoi, qui répond de qui, où s'arrête ma responsabilité) et son cousin le **conflit de rôle** (recevoir des consignes contradictoires de plusieurs supérieurs) sont des facteurs organisationnels classiques, particulièrement délétères en milieu industriel à hiérarchies multiples (production, SST, qualité, maintenance) et en contexte de sous-traitance. Ils génèrent une fatigue cognitive permanente et minent la confiance dans la chaîne de commandement.

## Sens et qualité de vie

Côté positif, deux dimensions structurent l'engagement durable. Le [[Sens du travail et engagement|sens du travail]] désigne l'utilité perçue, la contribution à un ensemble qui dépasse la tâche immédiate, l'alignement avec ses propres valeurs. La [[Qualité de vie au travail (QVT)|qualité de vie au travail (QVT)]] est un cadre de gestion intégré qui combine santé, performance, équité et participation, et qui sert souvent de bannière institutionnelle aux démarches RPS. Ces dimensions ne se décrètent pas par un mémo : elles se construisent par des pratiques managériales soutenues sur 18 à 36 mois minimum.

## Application terrain

En contexte minier, les facteurs organisationnels jouent un rôle particulièrement déterminant parce qu'ils compensent - ou aggravent - les conditions de travail intrinsèquement exigeantes. Les travaux de [[Analyse Fruhen et al. (2023)|Fruhen et al. (2023)]] sur la culture SST minière et de [[Analyse Paulin et Griffin (2016)|Paulin et Griffin (2016)]] sur le leadership convergent : une mine bien gérée sur le plan organisationnel (climat clair, soutien fort, rôles définis) tient ses équipes même avec des conditions physiques dures, tandis qu'une mine désorganisée perd ses bons travailleurs même quand les conditions matérielles sont meilleures que la moyenne.

Trois indicateurs simples permettent de prendre le pouls organisationnel d'un site : (1) le délai moyen entre une suggestion d'amélioration venue du chantier et la réponse de la direction (révélateur de l'écoute réelle), (2) le taux de rotation des superviseurs de premier niveau (révélateur de leur soutien organisationnel), (3) la proportion de travailleurs qui peuvent nommer clairement leur rôle et leur supérieur direct (révélateur de la clarté des rôles). Ces trois mesures ne demandent ni questionnaire formel ni budget. Comme l'observent [[Analyse Bourbonnais et al. (2006)|Bourbonnais et collègues]] dans leurs travaux sur les interventions organisationnelles québécoises, l'erreur classique est de croire qu'on peut « décréter » un meilleur climat ou plus de soutien par une campagne de communication : ces facteurs se construisent par des pratiques répétées.

## Sources

- Modules 2 et 8 du cours SST1010
- INSPQ, Grille d'identification des RPS → [[Analyse INSPQ (2021a)]] · [[Grille INSPQ d'identification des RPS]]
- Siegrist (1996) → [[Analyse Siegrist (1996)]]
- Karasek et Theorell (1990) → [[Analyse Karasek et Theorell (1990)]]
- Theorell et al. (2015), méta-analyse contrôle au travail et dépression → [[Analyse Theorell et al. (2015)]]

[[00 - 🏠 Accueil|← Accueil]]
`
}

];
