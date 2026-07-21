# Worker Cloudflare — Attestations procédures (web)

Ce petit serveur (« Worker ») reçoit les attestations de lecture des
**procédures de forage** complétées sur le site (quiz de la fiche réussi à
**80 % minimum**) et les enregistre **automatiquement dans Airtable**
(base **Formations**, table **Attestations procédures (web)**).

C'est exactement la même mécanique que le Worker `attestations-tms` du site
Prévention TMS. Le fichier à déployer est **[`worker.js`](./worker.js)**.

---

## Déploiement pas à pas (5 min)

1. **dash.cloudflare.com** → menu **« Workers & Pages »**.
2. Bouton **« Create application »** → onglet **« Workers »** →
   **« Create Worker »**.
3. Nomme-le **`attestations-procedures`** → **Deploy** (ça crée un Worker vide).
4. **« Edit code »** → **efface tout** le contenu par défaut →
   **colle tout le contenu de [`worker.js`](./worker.js)** → **Deploy**.
5. Onglet **« Settings »** → **« Variables and Secrets »** → **« Add »** :
   - Type : **Secret**
   - Nom : **`AIRTABLE_TOKEN`**
   - Valeur : *ton jeton Airtable* (le même que celui du Worker
     `attestations-tms` convient : il a déjà accès à la base « Formations »)
   - **Save / Deploy**.
6. Vérifie l'URL du Worker :
   `https://attestations-procedures.frankyray-21.workers.dev`
   → une requête GET doit répondre `{ "ok": true, "service": "attestations-procedures" }`.
   C'est cette URL qui est déjà renseignée dans `config.js`
   (`attestation.endpoint`) — si ton URL diffère, ajuste-la là.

> **Déploiement automatique** : le Worker est connecté au dépôt GitHub
> (Cloudflare → Worker → Settings → Build, root directory `worker`). Chaque
> push sur `main` qui modifie `worker/worker.js` le redéploie tout seul —
> plus besoin de copier-coller.

### Endpoints

| Requête | Rôle |
| --- | --- |
| `GET /` | État du service (`{ ok:true, service:… }`) |
| `GET /?q=<texte>` | Autocomplétion des noms d'employés (formulaire d'attestation) |
| `GET /?hist=<nom>` | Historique des attestations de ce nom — page « Mon suivi » du site. Renvoie **uniquement** `proc, titre, date` + `progress` (meilleurs scores de quiz sauvegardés — endpoint public : pas de statut ni de temps) |
| `POST /` | Enregistre une attestation dans Airtable |
| `POST /` avec `type:"progress"` | Sauvegarde la progression du travailleur (meilleurs scores de quiz, JSON borné) dans son dossier « Liste employé (registre formation) », champ « Progression procédures (web) ». `linked:false` si le nom ne correspond à aucun employé (rien n'est stocké) |
| `POST /` avec `type:"feedback"` | Évaluation d'une question de quiz (pouce 👍/👎 + commentaire), **anonyme**. Enregistrée dans la table **« Feedback quiz (web) »**. Renvoie `{ ok:true, id:"rec…" }`. Renvoyer le corps **avec** `id:"rec…"` met à jour la même ligne (commentaire ajouté / pouce changé) au lieu d'en créer une nouvelle |

### Le jeton Airtable (`AIRTABLE_TOKEN`)

Si tu dois en créer un : **airtable.com/create/tokens**
- **Scopes** : `data.records:read` + `data.records:write`
- **Access** : la base **« Formations »**

---

## Côté Airtable (déjà en place)

- Base **« Formations »** (`appmq82YjvEUglYZU`)
- Table **« Attestations procédures (web) »** (`tblKKK7xpP1MwRvYw`) — créée le
  3 juillet 2026 avec les colonnes ci-dessous.
- Liste **« Liste employé (registre formation) »** (`tbllKuNePDWZMr1cz`) —
  sert à l'autocomplétion du nom et au lien automatique.

## Ce qui est envoyé à Airtable

| Colonne Airtable    | Exemple                          | Source                                  |
|---------------------|----------------------------------|-----------------------------------------|
| Nom                 | `Jean Tremblay`                  | nom saisi sur la fiche                  |
| Procédure           | `PRO-OP-ITH-004`                 | code de la procédure (option auto-créée)|
| Titre procédure     | `Forage en longtrou (ITH/CUBEX)` | titre de la fiche                       |
| Date                | `2026-07-03`                     | date du jour                            |
| Score quiz          | `12/13 — 92 %`                   | meilleur score au quiz (min. 80 %)      |
| Révision procédure  | `Juin 2024`                      | révision affichée sur la fiche          |
| Employé             | *(lien)*                         | relié automatiquement par le nom        |
| Temps sur la fiche  | `3 min 42 s`                     | temps actif de consultation (gestion.)  |
| Temps sur le quiz   | `2 min 10 s`                     | temps actif sur le quiz (gestion.)      |
| Secondes fiche      | `222`                            | idem en secondes (tri / analyse)        |
| Secondes quiz       | `130`                            | idem en secondes (tri / analyse)        |
| Statut              | `Reçu` / `À relier`              | selon que l'employé a été trouvé        |
| Source              | `site procédures`                | fixe                                    |

> **Temps (suivi gestionnaire, non affiché au travailleur)** : le site mesure le
> temps *actif* (écran visible — en pause quand le téléphone est verrouillé)
> passé sur la fiche et sur le quiz. Si ces 4 colonnes venaient à manquer, le
> Worker **réessaie sans elles** : l'attestation est enregistrée quand même.

> **Statut « À relier »** : le nom saisi n'a correspondu à aucun employé du
> registre (ou à plusieurs). À relier manuellement, puis passer à « Traité »
> une fois reporté dans « Formation MRI ».

---

## Évaluation des questions de quiz (pouce 👍/👎 + commentaire)

Après **chaque question** de quiz (quiz des fiches **et** « Quiz éclair »), le
site affiche un petit pouce **« Cette question t'a-t-elle été utile ? »**. Au
clic, un champ **commentaire** (optionnel) apparaît, puis **« Envoyer »**. Tout
part vers **ce même Worker** (`type:"feedback"`) qui l'écrit dans une table
Airtable dédiée. **Un enregistrement par question notée** : le pouce crée la
ligne, le commentaire (ou un changement de pouce) met à jour **la même** ligne.
Même mécanique que les sites **TMS** et **RodBot**.

### À faire une seule fois : créer la table dans la base « Formations »

Crée une table nommée **exactement** `Feedback quiz (web)` (le Worker la
référence **par son nom**, aucun ID à copier). Colonnes :

| Colonne Airtable  | Type conseillé            | Exemple / notes                                              |
|-------------------|---------------------------|-------------------------------------------------------------|
| **Question**      | Texte long *(champ principal)* | `Combien pèse chaque pièce du centralisateur ?` — l'énoncé |
| **Vote**          | Sélection unique          | `Pouce en haut` / `Pouce en bas` *(options créées automatiquement)* |
| **Commentaire**   | Texte long                | commentaire libre du travailleur *(optionnel)*              |
| **Quiz**          | Ligne de texte            | id de la procédure (`centralisateur`) ou `Quiz éclair`      |
| **ID question**   | Ligne de texte            | repère stable : `centralisateur#3`                          |
| **Titre procédure** | Ligne de texte          | `Procédure d'installation du centralisateur`                |
| **Nom**           | Ligne de texte            | rempli **seulement** si un profil est actif sur l'appareil  |
| **Date**          | Date                      | date du jour                                                |
| **Source**        | Ligne de texte            | `site procédures` *(fixe)*                                   |

> **Colonnes manquantes ?** Le Worker envoie d'abord tout ; si Airtable refuse
> (colonne absente), il **réessaie sans les colonnes de contexte** (Quiz, ID
> question, Titre procédure, Nom) — le **vote + commentaire est enregistré quand
> même**. Le minimum vital, c'est **Question**, **Vote**, **Commentaire**, **Date**.

Aucun jeton ni déploiement supplémentaire : le Worker réutilise le
`AIRTABLE_TOKEN` déjà en place (accès à la base « Formations »). Il suffit de
**re-déployer `worker.js`** (ou de laisser le déploiement auto GitHub le faire).

### Hors-ligne (sous terre)

Un vote/commentaire donné **sans réseau** est mis en **file d'attente sur
l'appareil** et repart **tout seul** au retour du réseau (comme les
attestations). La fusion se fait par question : jamais deux lignes en double
pour une même évaluation.

### Activer / désactiver

Dans **`config.js`** :

```js
feedback: {
  enabled: true,   // false = masque le pouce partout
  endpoint: ''     // vide = réutilise le Worker des attestations ci-dessus
}
```

---

## Côté site (déjà branché)

Sur chaque fiche, une fois le **quiz réussi à 80 %**, la section
**« Attestation de lecture »** propose : champ nom (avec suggestions tirées du
registre des employés), puis bouton **« Attester la lecture »** → envoi au
Worker → enregistrement Airtable. Hors-ligne, le site l'indique et demande de
réessayer une fois le réseau retrouvé.

La configuration est dans **`config.js`** :

```js
attestation: {
  endpoint: 'https://attestations-procedures.frankyray-21.workers.dev'
}
```

Tant que le Worker n'est pas déployé, le site affiche simplement un message
« service d'attestation injoignable » au moment de l'envoi — rien d'autre ne
casse.
