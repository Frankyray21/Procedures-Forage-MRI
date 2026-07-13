/* ===========================================================================
   QUIZ — Nouvelles procédures secteur ITH (PRO-OP-ITH-017, bits CUBEX, PIPE-TUB,
   STOPEMASTER 001/002/003/004, foreuse V-KING). Citations fidèles des PDF.
   =========================================================================== */
(function () {
  var Q = {
    "pro-op-ith-017": [
      { "q": "Quand on déplace les tiges, à quelle distance doivent rester le soudeur et les travailleurs du haut ?",
        "o": ["1 mètre", "2 mètres", "3 mètres", "5 mètres"], "a": 2,
        "e": "« …doivent obligatoirement se tenir à une distance minimum de 3 mètres. »" },
      { "q": "Pour une cédule 80, quelle pression doit montrer le cadran des mâchoires hydrauliques ?",
        "o": ["2000 à 3000 psi", "8800 à 8900 psi", "5000 à 6000 psi", "1000 psi au maximum"], "a": 1,
        "e": "« La pression sur le cadran doit être entre 8800 psi et 8900 psi pour une cédule 80. »" },
      { "q": "Quel poids maximum peut soulever la foreuse CUBEX pour ce travail ?",
        "o": ["10 000 lbs", "15 000 lbs", "25 000 lbs", "40 000 lbs"], "a": 2,
        "e": "« La capacité maximale de l'équipement de forage (CUBEX) est de 25 000 lbs. Ce sont les ''SLIP PLATES'' qui déterminent ce maximum. »" },
      { "q": "Pendant le travail, qui a le droit de se parler ?",
        "o": ["Toute l'équipe", "Le foreur et le soudeur seulement, sans personne au milieu", "Le superviseur et le foreur", "N'importe qui, par radio"], "a": 1,
        "e": "« Les deux seules personnes à communiquer ensemble doivent être le foreur et le soudeur. Aucune personne ne doit faire l'intermédiaire. »" },
      { "q": "Quel poids au minimum doit tenir l'élingue qui soulève la charge ?",
        "o": ["500 kg", "Une tonne", "2 tonnes", "5 tonnes"], "a": 1,
        "e": "« L'élingue servant au levage de la charge doit avoir une capacité minimale d'une tonne et elle doit être accrochée à une plaque d'ancrage fixée au toit… »" }
    ],
    "pro-op-ith-001": [
      { "q": "Tu mets le SHANK dans le marteau. Ensuite, tu visses la bit d'au moins combien de tours ?",
        "o": ["Un demi-tour", "Au moins 2 tours", "5 tours", "Juste jusqu'au blocage"], "a": 1,
        "e": "« Aligner le SHANK dans le bout du marteau, l'insérer le plus loin possible et visser la bit un minimum de 2 tours. »" },
      { "q": "Avec quelle pression faut-il serrer la bit ?",
        "o": ["Entre 1000 et 2000 psi", "Entre 3000 et 4000 psi", "500 psi au maximum", "Plus de 5000 psi"], "a": 0,
        "e": "« Serrer la bit avec un minimum de 1000 psi et pas plus de 2000 psi. »" },
      { "q": "Avant de poser le driver sub, que fais-tu à ses filets ?",
        "o": ["Les nettoyer à l'air", "Bien les graisser", "Les chauffer", "Rien"], "a": 1,
        "e": "« Bien graisser les filets du driver sub. »" }
    ],
    "pro-pt-001": [
      { "q": "Le bras télescopique du PIPE-TUB mesure quelle longueur ?",
        "o": ["6 pi (1,8 m)", "12 pi (3,66 m)", "20 pi (6 m)", "8 pi (2,4 m)"], "a": 1,
        "e": "« …manipuler des tiges au train de forage au moyen d'un bras télescopique de 12 pi [3,66 m]. »" },
      { "q": "Pendant le forage, à quelle distance du mât place-t-on les contrôles ?",
        "o": ["Tout près", "À plus de 1,5 mètre du mât", "À 0,5 mètre", "Sur le mât"], "a": 1,
        "e": "« Positionner les contrôles à plus de 1,5 mètre du mât de la foreuse et à 1,5 mètre du bras collier. »" },
      { "q": "Tu n'utilises pas la commande à distance. Que fais-tu ?",
        "o": ["Rien", "Mettre la fiche d'obturation dans la boîte de connexion", "Débrancher la foreuse", "La laisser pendre"], "a": 1,
        "e": "« Si la commande à distance n'est pas utilisée, la fiche d'obturation doit être insérée dans la boîte de connexion. »" }
    ],
    "pro-op-sm-001": [
      { "q": "Tu trouves la zone de forage. Que vérifies-tu en premier ?",
        "o": ["L'éclairage", "L'air (la ventilation)", "Le niveau d'eau", "Les outils"], "a": 1,
        "e": "« Après avoir localisé la zone de forage, vérifiez d'abord la qualité de la ventilation. »" }
    ],
    "pro-op-sm-002": [
      { "q": "Les tiges tournent. Tu dois toujours rester à quelle distance ?",
        "o": ["1 mètre", "2,4 mètres", "5 mètres", "Pas de distance fixe"], "a": 1,
        "e": "« Tenez-vous toujours à l'écart (2,4 mètres) des tiges rotatives. »" },
      { "q": "Un trou a besoin de plusieurs forets. Dans quel ordre les utiliser ?",
        "o": ["Les plus usés d'abord", "Les neufs d'abord, puis les usés", "Peu importe", "Alterner neuf et usé"], "a": 1,
        "e": "« Si vous utilisez plus d'un foret dans un même trou : toujours utiliser les forets neufs au début en allant vers les plus usés. »" }    ],
    "pro-op-sm-003": [
      { "q": "Quand la foreuse se déplace, quelle distance minimum garder entre toi et elle ?",
        "o": ["1 mètre", "2,4 mètres", "5 mètres", "Aucune"], "a": 1,
        "e": "« Toujours garder une distance de 2,4 mètres minimum entre vous et la foreuse. »" },
      { "q": "Quand tu déplaces la machine dans la rampe, où doit être le panier ?",
        "o": ["Vers le bas", "Toujours vers le haut (UP RAMP)", "Au centre", "Replié"], "a": 1,
        "e": "« Lors des déplacements, le panier doit TOUJOURS être vers le haut (UP RAMP). »" },
      { "q": "Sur quels tuyaux faut-il mettre des câbles anti-fouet (whipcheck) ?",
        "o": ["Tous les tuyaux", "Les tuyaux de plus de 1 pouce", "Juste les tuyaux d'eau", "Aucun"], "a": 1,
        "e": "« Installer des câbles anti-fouets (whipcheck) sur les tuyaux de plus d'un (1) pouce. »" }
    ],
    "pro-op-sm-004": [
      { "q": "Au Québec, quel article du règlement (RSSTM) dit de souffler le plancher avant de forer ?",
        "o": ["Article 12", "Article 437", "Article 136", "Article 439"], "a": 1,
        "e": "« Le plancher du chantier à forer doit être soufflé selon l'article 437 du Règlement sur la santé et la sécurité du travail dans les mines (RSSTM Québec)… »" },
      { "q": "Le casing doit mesurer quelle longueur ?",
        "o": ["Aussi long que le trou", "Environ 2 pouces de plus que la partie alésée", "2 pieds de plus", "Peu importe"], "a": 1,
        "e": "« Retirez la tige et insérez un casing d'environ 2 pouces plus long que la longueur alésée. »" }
    ],
    "pro-op-bu-001": [
      { "q": "Quelle protection portes-tu toujours quand tu fais marcher la foreuse V-KING ?",
        "o": ["Un masque seulement", "Une double protection pour les oreilles", "Un harnais", "Rien de spécial"], "a": 1,
        "e": "« Le port de la double protection auditive est obligatoire. »" },
      { "q": "Tu forages un trou vers le bas. Quelle longueur de tubage mets-tu dans le roc, au moins ?",
        "o": ["6 pouces", "12 pouces", "24 pouces", "Aucune"], "a": 1,
        "e": "« Lors du forage de trous descendant, le foreur devra installer un tubage d'une longueur minimum de 12 pouces dans le roc. »" },
      { "q": "Quelles conduites d'air ont besoin d'un système anti-fouettement ?",
        "o": ["Toutes", "Les conduites souples de plus de 1 pouce", "Seulement les conduites d'eau", "Aucune"], "a": 1,
        "e": "« Toutes les conduites d'air flexibles supérieures à 1 pouce de diamètre doivent être équipées d'un dispositif anti-fouettement approprié et ce à tous les points de connexion. »" },
      { "q": "Un trou vers le bas est fini. Que mets-tu dessus ?",
        "o": ["Un cône", "Un bouchon, pour empêcher les pierres de tomber dans le trou", "Un drapeau", "Rien"], "a": 1,
        "e": "« Après chaque trou descendant complété, l'opérateur installera des bouchons sur chacun des trous afin d'empêcher la chute de pierre ou de débris qui pourrait entraîner un blocage du trou. »" }
    ]
  };
  var T = window.QUIZ_PROC || (window.QUIZ_PROC = {});
  Object.keys(Q).forEach(function (id) { T[id] = (T[id] || []).concat(Q[id]); });
})();
