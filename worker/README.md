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
