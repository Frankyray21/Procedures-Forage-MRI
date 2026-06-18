/* ===========================================================================
   PRÉ-TÂCHE — outils/ÉPI additionnels ET risque majeur EXPLICITEMENT écrits
   dans la procédure (source : pdftext.js). On ne retient que ce qui est écrit
   noir sur blanc ; chaque élément porte sa citation exacte + la source.
   Structure : { tools, epi, ref, src,  risque:{ items, ref, src } }
   - ref/src       → citation pour la question outils/ÉPI.
   - risque.items  → étiquette(s) du danger (depuis la liste RISK de app.js).
   - risque.ref/src→ citation exacte du danger.
   Les ids absents n'exigent rien d'additionnel et n'ont pas de danger explicite.
   =========================================================================== */
window.PRETASK = {
  "pro-op-ith-002": {
    risque: { items: ["Frappé par un objet échappé"],
      ref: "Assurez-vous que vos pieds soient sur une surface solide et que personne ne soit dans la ligne advenant que la masse soit échappée.",
      src: "PRO-OP-ITH-002 · p.2" } },
  "pro-op-ith-004": {
    risque: { items: ["Happement par une pièce en rotation"],
      ref: "Quand une pièce est en mouvement, aucun travailleur ne peut se placer entre la console et le mât, ni à moins de 1,5 mètre du mât de tous les côtés.",
      src: "PRO-OP-ITH-004" } },
  "pro-op-ith-005": {
    epi: ["Harnais de sécurité"],
    ref: "Si le couvert doit être enlevé ou remis, les employés travaillant près de la monterie doivent être attachés en tout temps au moyen d'une longe restrictive ajustable ou avec un harnais et un bloc rétractable.",
    src: "PRO-OP-ITH-005 · p.7",
    risque: { items: ["Chute de hauteur"],
      ref: "Il est strictement interdit à un employé d'entrer dans la monterie de 30 pouces pour récupérer quoi que ce soit.",
      src: "PRO-OP-ITH-005 · p.8" } },
  "pro-op-ith-007": {
    risque: { items: ["Chute d'objets (monterie / trou)"],
      ref: "Rester hors de la ligne de tir d'objets ou de roche pouvant tomber de la monterie.",
      src: "PRO-OP-ITH-007 · p.8" } },
  "pro-op-ith-008": {
    epi: ["Harnais de sécurité"],
    ref: "Avant d'enlever le couvercle, le travailleur doit porter un harnais et s'attacher à un ancrage ou à une ligne de vie.",
    src: "PRO-OP-ITH-008 · p.2",
    risque: { items: ["Chute de hauteur"],
      ref: "Lorsqu'un taillant de la V-30 se brise ou que des outils sont échappés, il est strictement défendu à quiconque d'entrer dans la monterie.",
      src: "PRO-OP-ITH-008 · p.1" } },
  "pro-mec-011": {
    risque: { items: ["Coincement / écrasement par des pièces"],
      ref: "Éviter de se mettre les mains sous la pompe et protéger ses doigts des coincements.",
      src: "PRO-MEC-011 · p.3" } },
  "pro-dd-st-002": {
    risque: { items: ["Blessures aux mains"],
      ref: "Vider le tube de manière à ne jamais s'exposer les mains en avant du tube carottier : mettre les mains en avant du tube lorsque la roche sort pourrait causer des blessures graves.",
      src: "PRO-DD-ST-002 · p.2" } },
  "pro-dd-st-003": {
    tools: ["Scie alternative"], epi: ["Protection faciale"],
    ref: "Outils nécessaires : … Scie va-et-vient avec lame à bois … ÉPI nécessaires : Équipement de base obligatoire ; Gants spéciaux pour la scie à chaîne ; Pantalons de protection pour scie à chaîne ; Visière.",
    src: "PRO-DD-ST-003 · p.1" },
  "pro-dd-st-007": {
    epi: ["Protection respiratoire"],
    ref: "ÉPI OBLIGATOIRES : Équipements de protection de base sur le site ; Masque powerflow (cimentation).",
    src: "PRO-DD-ST-007 · p.1",
    risque: { items: ["Éjection sous pression (eau / boyau)"],
      ref: "En aucun temps, se mettre devant le bout du boyau. Un déblocage soudain causerait des blessures graves.",
      src: "PRO-DD-ST-007 · p.8" } },
  "pro-op-cim-001": {
    epi: ["Protection respiratoire"],
    ref: "ÉPI OBLIGATOIRES : Équipements de protection de base sur le site ; Masque powerflow. Le port des ÉPI est obligatoire dès la manipulation des sacs de ciment jusqu'au nettoyage complet de la machine.",
    src: "PRO-OP-CIM-001 · p.1",
    risque: { items: ["Éjection sous pression (eau / boyau)"],
      ref: "Un déblocage soudain causerait des blessures graves.",
      src: "PRO-OP-CIM-001 · p.8" } },
  "pro-dd-st-008": {
    risque: { items: ["Chute / projection de tiges"],
      ref: "La chaîne de retenue doit être ajustée de façon que les tiges ne puissent dépasser 80° si elles chutent vers un travailleur.",
      src: "PRO-DD-ST-008" } },
  "pro-dd-st-009-1": {
    epi: ["Harnais de sécurité"],
    ref: "En raison des risques associés au travail en hauteur… Prévoir des ÉPI pour s'attacher et limiter la chute à 4 pieds.",
    src: "PRO-DD-ST-009-1",
    risque: { items: ["Chute / projection de tiges", "Chute de hauteur"],
      ref: "Il est possible qu'on ne se rende pas compte que le tube n'est pas latché. Les travailleurs doivent toujours rester hors de la ligne de tir des tiges.",
      src: "PRO-DD-ST-009-1 · p.3" } },
  "pro-dd-st-009-2": {
    epi: ["Harnais de sécurité"],
    ref: "À plus de 6 pieds : prévoir des ÉPI pour s'attacher et limiter la chute à 4 pieds, ou prévoir des garde-corps si l'on travaille sur un plancher.",
    src: "PRO-DD-ST-009-2 · p.2",
    risque: { items: ["Chute / projection de tiges", "Chute de hauteur"],
      ref: "Les travailleurs doivent toujours rester hors de la ligne de tir des tiges.",
      src: "PRO-DD-ST-009-2 · p.4" } },
  "pro-dd-st-011": {
    risque: { items: ["Éjection sous pression (eau / boyau)"],
      ref: "Utiliser la clé dynamométrique pour desserrer l'écrou afin de retenir le tube et d'éviter son éjection.",
      src: "PRO-DD-ST-011 · p.4" } },
  "pro-op-dd-005": {
    risque: { items: ["Détente brutale de ressorts comprimés"],
      ref: "Il est important de dévisser les boulons seulement 1 tour à la fois, en suivant l'ordre, car les ressorts sont écrasés de ¼ de pouce.",
      src: "PRO-OP-DD-005 · p.3" } },
  "pro-op-dd-013": {
    risque: { items: ["Frappé par un objet échappé"],
      ref: "Toujours être conscient que la barre peut échapper.",
      src: "PRO-OP-DD-013 · p.3" } },
  "dr600-op-002": {
    risque: { items: ["Renversement / heurt de véhicule"],
      ref: "Lors des déplacements, l'opérateur doit rester immobile et toujours se tenir à plus de 3 mètres de la machine.",
      src: "DR-600-OP-002 · p.14" } },
  "pro-op-bt3-001": {
    risque: { items: ["Renversement / heurt de véhicule"],
      ref: "Le port de la ceinture de sécurité est obligatoire ; les portes du véhicule doivent être fermées en tout temps lors de tout déplacement du véhicule.",
      src: "PRO-OP-BT3-01 · p.5" } },
  "pro-op-cat-416-001": {
    epi: ["Harnais de sécurité"],
    ref: "Les travailleurs doivent obligatoirement porter le harnais et s'attacher en tout temps dans le panier avant.",
    src: "PRO-OP-CAT-416-001 · p.7",
    risque: { items: ["Chute de hauteur"],
      ref: "Les travailleurs doivent obligatoirement porter le harnais et s'attacher en tout temps dans le panier avant.",
      src: "PRO-OP-CAT-416-001 · p.7" } },
  "pro-op-bu-001": {
    epi: ["Protection auditive"],
    ref: "LE PORT DE LA DOUBLE PROTECTION AUDITIVE EST OBLIGATOIRE.",
    src: "PRO-OP-BU-001 · p.1",
    risque: { items: ["Exposition à la poussière (santé)"],
      ref: "L'opérateur doit contrôler la production de poussière en utilisant une quantité suffisante d'eau pendant le forage. Le forage à sec est interdit.",
      src: "PRO-OP-BU-001 · p.3" } },
  "pro-op-sm-002": {
    risque: { items: ["Happement par une pièce en rotation"],
      ref: "Tenez-vous toujours à l'écart (2,4 mètres) des tiges rotatives. En aucun temps, un opérateur ne doit maintenir la tige pendant que la rotation est en marche.",
      src: "PRO-OP-SM-002" } },
  "pro-op-sm-004": {
    risque: { items: ["Exposition à la poussière (santé)"],
      ref: "Ne jamais forer à sec : la poussière que vous créez est respirée par vous et vos collègues, c'est nocif pour votre santé.",
      src: "PRO-OP-SM-004 · p.3" } },
  "pro-sec-015": {
    risque: { items: ["Atmosphère dangereuse (gaz)"],
      ref: "Dès que le détecteur dépasse la norme, la foreuse est arrêtée et l'alimentation coupée au power pack ; les travailleurs quittent la baie et avisent le superviseur.",
      src: "PRO-SEC-015" } },
  "pro-sec-001": {
    risque: { items: ["Chute d'objets (monterie / trou)"],
      ref: "Un cône rouge doit être placé sur le départ du trou foré, afin d'éviter toutes chutes d'objets à l'intérieur de ce trou.",
      src: "PRO-SEC-001" } },
  "pro-pt-001": {
    risque: { items: ["Coincement / écrasement par des pièces"],
      ref: "Les risques de coincement sont élevés lors de l'opération du bras manipulateur à partir du bloc de valve ; l'opérateur ne doit jamais se retrouver sous le bras ni sous les tiges.",
      src: "PRO-PT-001 · p.7-10" } },
  "san-sec-005": {
    epi: ["Protection auditive"],
    ref: "Équipement de protection individuel du visiteur : chapeau de sécurité, lunette de sécurité, bottes de sécurité, gants, protection auditive.",
    src: "SAN-SEC-005 · p.2" }
};
