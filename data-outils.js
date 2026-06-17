/* ===========================================================================
   OUTILS — Analyses de sécurité de tâche (JSA-SYN)
   Données transcrites FIDÈLEMENT des fiches « ANALYSE SST » de Forage Synee
   (cases réellement cochées extraites des PDF, 24 mars 2021).
   window.OUTILS      : une entrée par outil (clé = id de la fiche / nom du PDF).
   window.OUTILS_MAP  : procédures → outils susceptibles d'être utilisés.
   La fiche PDF d'origine reste accessible (pdf/<id>.pdf) pour consultation.
   =========================================================================== */
window.OUTILS = {
  "jsa-syn-01": {
    code: "JSA-SYN-01", nom: "Meuleuse d'angle", tache: "Utilisation de la meuleuse d'angle",
    niveau: 8, date: "24 mars 2021",
    securite: ["Frappé par", "Possibilité de rester coincé", "Abrasion, brûlure", "Coupure", "Choc électrique", "Incendie"],
    sante: ["Bruit", "Poussière", "Trouble musculo-squelettique"],
    environnement: [],
    controles: ["Gardes", "Système double action", "Introduction", "Procédure", "Ventilation", "Permis de travail à chaud"],
    epi: ["Lunettes de protection", "Casque de sécurité", "Protection auditive", "Bottes de protection", "Gants", "Protection faciale", "Vêtements haute visibilité"]
  },
  "jsa-syn-02": {
    code: "JSA-SYN-02", nom: "Perceuse portative", tache: "Utilisation de la perceuse",
    niveau: 6, date: "24 mars 2021",
    securite: ["Possibilité de rester coincé", "Enchevêtrement", "Choc électrique"],
    sante: ["Trouble musculo-squelettique"],
    environnement: [],
    controles: ["Interlock"],
    epi: ["Lunettes de protection", "Casque de sécurité", "Protection auditive", "Bottes de protection", "Gants", "Vêtements haute visibilité"]
  },
  "jsa-syn-03": {
    code: "JSA-SYN-03", nom: "Scie alternative", tache: "Utilisation de la scie alternative",
    niveau: 6, date: "24 mars 2021",
    securite: ["Possibilité de rester coincé", "Abrasion, brûlure", "Coupure", "Choc électrique"],
    sante: ["Bruit", "Poussière", "Trouble musculo-squelettique"],
    environnement: [],
    controles: ["Système double action"],
    epi: ["Lunettes de protection", "Casque de sécurité", "Protection auditive", "Bottes de protection", "Gants", "Vêtements haute visibilité"]
  },
  "jsa-syn-04": {
    code: "JSA-SYN-04", nom: "Marteau perforateur (Hilti)", tache: "Utilisation du marteau perforateur Hilti",
    niveau: 6, date: "24 mars 2021",
    securite: ["Possibilité de rester coincé", "Enchevêtrement", "Choc électrique"],
    sante: ["Bruit", "Poussière", "Trouble musculo-squelettique"],
    environnement: [],
    controles: ["Interlock"],
    epi: ["Lunettes de protection", "Casque de sécurité", "Protection auditive", "Bottes de protection", "Gants", "Vêtements haute visibilité"]
  },
  "jsa-syn-05": {
    code: "JSA-SYN-05", nom: "Clé à choc", tache: "Utilisation d'une clé à choc",
    niveau: 6, date: "24 mars 2021",
    securite: ["Frappé par", "Possibilité de rester coincé", "Enchevêtrement", "Choc électrique"],
    sante: ["Bruit", "Poussière", "Trouble musculo-squelettique", "Vibration"],
    environnement: [],
    controles: ["Interlock", "Introduction", "Procédure"],
    epi: ["Lunettes de protection", "Casque de sécurité", "Protection auditive", "Bottes de protection", "Gants", "Vêtements haute visibilité"]
  },
  "jsa-syn-06": {
    code: "JSA-SYN-06", nom: "Scie circulaire", tache: "Utilisation d'une scie circulaire",
    niveau: 8, date: "24 mars 2021",
    securite: ["Frappé contre", "Abrasion, brûlure", "Enchevêtrement", "Coupure", "Choc électrique"],
    sante: ["Bruit", "Poussière", "Trouble musculo-squelettique"],
    environnement: [],
    controles: ["Gardes"],
    epi: ["Lunettes de protection", "Casque de sécurité", "Protection auditive", "Bottes de protection", "Gants", "Protection faciale", "Vêtements haute visibilité"]
  },
  "jsa-syn-07": {
    code: "JSA-SYN-07", nom: "Scie à onglet", tache: "Utilisation d'une scie à onglet",
    niveau: 8, date: "24 mars 2021",
    securite: ["Abrasion, brûlure", "Enchevêtrement", "Coupure", "Choc électrique"],
    sante: ["Bruit", "Poussière"],
    environnement: [],
    controles: ["Gardes", "Système double action"],
    epi: ["Lunettes de protection", "Casque de sécurité", "Protection auditive", "Bottes de protection", "Gants", "Protection faciale", "Vêtements haute visibilité"]
  },
  "jsa-syn-08": {
    code: "JSA-SYN-08", nom: "Perceuse à colonne", tache: "Utilisation d'une perceuse à colonne",
    niveau: 6, date: "24 mars 2021",
    securite: ["Possibilité de rester coincé", "Enchevêtrement", "Coupure", "Choc électrique"],
    sante: ["Poussière"],
    environnement: [],
    controles: ["Interlock", "Gardes", "Arrêt d'urgence"],
    epi: ["Lunettes de protection", "Casque de sécurité", "Protection auditive", "Bottes de protection", "Gants", "Protection faciale", "Vêtements haute visibilité"]
  },
  "jsa-syn-09": {
    code: "JSA-SYN-09", nom: "Presse hydraulique", tache: "Utilisation d'une presse hydraulique",
    niveau: 6, date: "24 mars 2021",
    securite: ["Choc électrique"],
    sante: [],
    environnement: [],
    controles: ["Interlock", "Gardes", "Arrêt d'urgence"],
    epi: ["Lunettes de protection", "Casque de sécurité", "Protection auditive", "Bottes de protection", "Gants", "Vêtements haute visibilité"]
  },
  "jsa-syn-10": {
    code: "JSA-SYN-10", nom: "Fusil à graisse", tache: "Utilisation d'un fusil à graisse",
    niveau: 1, date: "24 mars 2021",
    securite: [],
    sante: [],
    environnement: ["Contamination du sol", "Contamination de l'eau"],
    controles: ["Trousse de déversement", "SIMDUT"],
    epi: ["Lunettes de protection", "Casque de sécurité", "Protection auditive", "Bottes de protection", "Gants", "Vêtements haute visibilité"]
  },
  "jsa-syn-11": {
    code: "JSA-SYN-11", nom: "Pistolet thermique", tache: "Utilisation d'un pistolet thermique",
    niveau: 3, date: "24 mars 2021",
    securite: ["Abrasion, brûlure", "Choc électrique", "Incendie"],
    sante: [],
    environnement: [],
    controles: [],
    epi: ["Lunettes de protection", "Casque de sécurité", "Protection auditive", "Bottes de protection", "Gants", "Vêtements haute visibilité"]
  }
};

/* Procédures → outils susceptibles d'être utilisés (« lorsque ça s'applique »).
   Associations établies selon la nature des tâches (fabrication de planchers,
   installation, entretien mécanique, manutention de tiges). */
window.OUTILS_MAP = {
  // Fabrication / installation (bois, ancrage, structure)
  "pro-dd-st-003":     ["jsa-syn-06", "jsa-syn-03", "jsa-syn-07", "jsa-syn-02", "jsa-syn-04", "jsa-syn-01"],
  "std-dd-installation":["jsa-syn-06", "jsa-syn-02", "jsa-syn-04", "jsa-syn-01"],
  "ss-dd-st-001":      ["jsa-syn-06", "jsa-syn-02", "jsa-syn-04"],
  "pro-dd-st-008":     ["jsa-syn-02", "jsa-syn-04", "jsa-syn-05", "jsa-syn-01"],
  // Entretien mécanique
  "pro-mec-011":       ["jsa-syn-05", "jsa-syn-09", "jsa-syn-10", "jsa-syn-01"],
  "pro-op-dd-005":     ["jsa-syn-05", "jsa-syn-09", "jsa-syn-10"],
  "dr600-op-002":      ["jsa-syn-10", "jsa-syn-05"],
  "pro-op-dd-013":     ["jsa-syn-10"],
  "pro-op-ith-003":    ["jsa-syn-05", "jsa-syn-10"],
  // Manutention de tiges / tubage (clés)
  "pro-op-ith-002":    ["jsa-syn-05"],
  "pro-op-ith-002a":   ["jsa-syn-05"],
  "pro-op-ith-014":    ["jsa-syn-05", "jsa-syn-01"]
};
