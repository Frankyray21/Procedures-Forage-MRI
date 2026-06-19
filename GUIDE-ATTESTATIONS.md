# Guide — Attestation de lecture des procédures (Airtable)

But : chaque travailleur confirme qu'il a **lu et compris** une procédure. Depuis
chaque fiche du site, un bouton « **Attester la lecture** » ouvre un formulaire
Airtable **pré-rempli avec la procédure** (verrouillée). Le travailleur choisit
son nom dans une liste, coche « lu et compris » et envoie. Tu vois ensuite toutes
les signatures dans Airtable (qui a lu quoi, et quand).

> Pas de recertification : une attestation par procédure suffit (décision retenue).

Il y a **4 étapes** : créer la base → remplir les procédures → créer le
formulaire → coller l'URL dans le site. Compte ~20 minutes.

---

## Étape 1 — Créer la base et les 3 tables

Sur https://airtable.com → **Add a base** → **Start from scratch**.
Nomme la base : **Attestations procédures MRI**.

Crée **3 tables** (onglets en haut). Renomme « Table 1 » et ajoute les autres.

### Table « Employés »
| Champ | Type | Notes |
|---|---|---|
| **Nom** | Single line text | *champ primaire* (1re colonne) |
| Matricule | Single line text | optionnel |
| Quart | Single select | Jour / Soir / Nuit (optionnel) |
| Actif | Checkbox | coché par défaut |

Ajoute une ligne par employé (Nom au minimum). C'est cette liste qui apparaîtra
dans le formulaire.

### Table « Procédures »
| Champ | Type | Notes |
|---|---|---|
| **Code** | Single line text | *champ primaire*. C'est la valeur utilisée pour le pré-remplissage (ex. `PRO-OP-ITH-002`). |
| Titre | Single line text | |
| Famille | Single select | ITH / CUBEX, Diamant, Sécurité, Commun… |
| Version | Number (precision 0) | optionnel |

➡️ **Ne saisis pas les 44 lignes à la main** : voir l'Étape 2 (import du CSV).

### Table « Attestations »
| Champ | Type | Notes |
|---|---|---|
| **Réf** | Single line text | *champ primaire* — laisse-le vide, il ne sera pas dans le formulaire. (Tu peux plus tard le transformer en formule, voir plus bas.) |
| Employé | **Link to another record → Employés** | autorise 1 seul enregistrement |
| Procédure | **Link to another record → Procédures** | autorise 1 seul enregistrement |
| Lu et compris | Checkbox | |
| Commentaire | Long text | optionnel |
| Date | **Created time** | se remplit tout seul à l'envoi |

> 💡 **Champ primaire en formule (optionnel, plus propre).** Une fois les champs
> ci-dessus créés, tu peux éditer **Réf** → type **Formula** :
> `{Employé} & " — " & {Procédure}`. Chaque attestation aura alors un nom lisible
> au lieu de rester vide.

---

## Étape 2 — Remplir la table « Procédures » (import du CSV)

Le fichier **`procedures-airtable.csv`** (à la racine du dépôt) contient déjà les
**44 procédures** du site (Code, Titre, Famille, Version).

1. Ouvre la table **Procédures**.
2. Bouge/efface les colonnes pour qu'elles soient dans l'ordre **Code, Titre,
   Famille, Version**.
3. Ouvre `procedures-airtable.csv` dans un tableur (ou un éditeur de texte),
   **sélectionne tout, copie**.
4. Dans Airtable, clique la 1re cellule de la 1re ligne vide → **Coller**.
   Airtable crée les lignes automatiquement.

> ⚠️ La procédure « Installation du centralisateur » n'a pas de code officiel :
> son **Code = son titre** dans le CSV. C'est voulu — le pré-remplissage doit
> correspondre exactement à ce que le site envoie (titre quand il n'y a pas de
> code). Ne le modifie pas.

> 🔄 **Si tu ajoutes/changes des procédures plus tard**, régénère le CSV :
> `node -e '…'` (ou redemande-moi) puis ré-importe les nouvelles lignes.

---

## Étape 3 — Créer le formulaire

Dans la table **Attestations** :

1. Clique sur **+ (Add view)** à gauche → **Form**.
2. Configure les champs visibles, dans cet ordre :
   - **Procédure** — visible (il sera pré-rempli puis masqué par l'URL, voir plus bas).
   - **Employé** — visible, libellé suggéré : « **Ton nom** ». C'est une liste
     déroulante des employés.
   - **Lu et compris** — visible, **Required** (obligatoire). Libellé : « J'ai lu
     et je comprends cette procédure. »
   - **Commentaire** — visible, facultatif (« Question ou remarque (facultatif) »).
   - Retire **Réf** et **Date** du formulaire (Date se remplit toute seule).
3. Titre du formulaire : « **Attestation de lecture** ». Sous-titre au choix
   (ex. « Confirme que tu as pris connaissance de la procédure ci-dessus. »).
4. Active un message de confirmation : « Merci, ton attestation est enregistrée. »
5. En haut à droite → **Share form** → active **Create a shareable link**.
   **Copie l'URL** (elle ressemble à
   `https://airtable.com/appXXXXXXXXXXXXXX/pagYYYYYYYYYYYYYY/form`).

### Vérifie le nom exact du champ Procédure
Le site pré-remplit le champ dont le **nom est « Procédure »**. Si dans le
formulaire tu as renommé l'**étiquette** du champ, ce n'est pas grave (l'étiquette
≠ le nom du champ). Mais si tu as renommé le **champ** lui-même dans la table,
note ce nouveau nom : tu le mettras dans `procField` (Étape 4).

---

## Étape 4 — Brancher l'URL dans le site

Ouvre **`config.js`** et **dé-commente** le bloc `attestation`, en collant ton URL :

```js
window.SITE_CONFIG = {
  org: "Machines Roger International",
  title: "Procédures de forage",

  attestation: {
    formUrl: "https://airtable.com/appXXXXXXXXXXXXXX/pagYYYYYYYYYYYYYY/form",
    procField: "Procédure"   // nom EXACT du champ Procédure (laisse tel quel si tu ne l'as pas renommé)
  }
};
```

Sauvegarde, commit, push. Dès le déploiement, le bouton « **Attester la
lecture** » apparaît au bas de **chaque fiche de procédure**, et il ouvre le
formulaire avec la bonne procédure déjà sélectionnée et verrouillée.

> 🔧 **Comment ça marche.** Le site ouvre :
> `…/form?prefill_Procédure=PRO-OP-ITH-002&hide_Procédure=true`.
> `prefill_…` choisit la procédure (par son **Code**), `hide_…` la masque pour
> que le travailleur ne puisse pas la changer.

---

## Étape 5 (optionnel) — Tableau de suivi

Dans Airtable → **Interfaces** → **Create interface** → modèle **Grid** ou
**Record review**, basé sur la table **Attestations**. Idées de vues :

- **Grouper par Procédure** → voir qui a signé chaque procédure.
- **Grouper par Employé** → voir ce qu'un travailleur a lu.
- Filtre **Lu et compris = coché**.
- Une vue « cette semaine » avec un filtre sur **Date**.

Pour repérer les **manques** (employés qui n'ont PAS encore signé une procédure),
le plus simple est une vue groupée par procédure : tu compares à ta liste
d'employés. (Un suivi « croisé » automatique est possible mais demande des champs
supplémentaires — dis-le-moi si tu le veux.)

---

## Récapitulatif

1. Base **Attestations procédures MRI** + 3 tables (Employés, Procédures, Attestations).
2. Importer `procedures-airtable.csv` dans **Procédures**.
3. Créer le **formulaire** sur Attestations, copier son URL.
4. Coller l'URL dans **`config.js`** (`attestation.formUrl`), push.
5. (option) Interface de suivi.

Le bouton côté site est **déjà en place** : il reste masqué tant que l'URL n'est
pas dans `config.js`, puis s'active partout automatiquement.
