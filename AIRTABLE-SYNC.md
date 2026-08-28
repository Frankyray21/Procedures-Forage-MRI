# Synchronisation Airtable → site (automatique)

Quand un **PDF de procédure est remplacé dans Airtable** (base « Documents »,
table « Procédures »), le site se met à jour **tout seul**, et les travailleurs
**voient** qu'il y a du nouveau :

```
Airtable (PDF remplacé)
   │  toutes les heures (ou déclenchement instantané — voir plus bas)
   ▼
GitHub Actions « Synchronisation Airtable » (.github/workflows/airtable-sync.yml)
   │  node sync-airtable.js :
   │    • télécharge le nouveau PDF        → pdf/<id>.pdf
   │    • régénère les images des pages    → images/pages/<id>-N.jpg + pages.js
   │    • régénère le texte de recherche   → pdftext.js
   │    • met à jour "date_revision"       → data*.js
   │  puis gen-sizes.js + bump-version.js, commit sur main, déploiement Pages
   ▼
Appareils des travailleurs (service worker)
   • le nouveau ?v= re-télécharge les données, le ?r= re-télécharge CE PDF
     et SES pages (rien d'autre — économie de données sous terre) ;
   • au lancement suivant : toast « Contenu mis à jour : N procédure(s)… »
     et badge « Mise à jour » (rouge) ou « Nouvelle » (bleu) sur la fiche,
     qui reste affiché tant que la fiche n'a pas été ouverte sur l'appareil.
```

## Mise en place (une seule fois)

1. Créer un **jeton d'accès personnel Airtable** (https://airtable.com/create/tokens)
   avec la portée `data.records:read` et l'accès à la base **« Documents »**.
   (Le jeton du Worker attestations a `read` + `write` sur « Formations » —
   il ne convient PAS tel quel : il faut l'accès à « Documents ».)
2. Dans GitHub : *Settings → Secrets and variables → Actions → New repository
   secret*, nom **`AIRTABLE_TOKEN`**, valeur = le jeton.
3. C'est tout. Le workflow tourne toutes les heures. Le **premier passage**
   ne télécharge rien : il enregistre l'empreinte actuelle de chaque pièce
   jointe (`.github/airtable/state.json`, committé). Seuls les remplacements
   de PDF **observés ensuite** déclenchent une mise à jour.

Pour lancer une synchronisation à la main : *Actions → Synchronisation
Airtable → Run workflow*. Le champ `force_ids` permet de re-synchroniser des
fiches précises même sans changement détecté (ex. `pro-mec-011,pro-op-ith-004`,
ou `all` pour tout).

## Comment les fiches sont appariées à Airtable

- **Par code** : le champ principal de la table « Procédures » (ex.
  `PRO-MEC-011`) est comparé au champ `code` de la fiche (normalisé :
  majuscules, alphanumérique seulement), **en exigeant la même langue**
  (fiche `famille: "english"` ↔ enregistrement « Anglais », sinon
  « Français »).
- **Par alias** : les fiches sans code (cadenassages, serrage de marteau,
  standard d'installation…) sont reliées par *record id* dans la table
  `ALIASES` de `sync-airtable.js`. Pour ajouter un appariement : ouvrir
  l'enregistrement dans Airtable, copier son id (`rec…`, visible dans l'URL)
  et ajouter une ligne `'id-de-la-fiche': 'recXXXXXXXXXXXXXX'`.

Le **résumé du job** (onglet Actions) liste à chaque passage :
- les procédures mises à jour ;
- les fiches **sans enregistrement Airtable** correspondant (à ce jour, une
  seule : `programme-maitrise-energies-dangereuses`, dont le PDF n'est pas
  dans la table « Procédures ») ;
- les enregistrements Airtable **sans fiche sur le site** → probablement une
  nouvelle procédure à adapter en fiche web.

## Ce que la synchronisation ne fait PAS (et pourquoi)

- **Les textes de la fiche** (résumé, étapes, avertissements, consignes,
  valeurs clés) et **les quiz** ne sont pas réécrits automatiquement :
  transformer un nouveau PDF en fiche pédagogique est un travail d'adaptation
  qui demande une validation humaine. Quand une procédure est profondément
  révisée : la synchronisation met immédiatement à disposition le nouveau PDF
  (avec badge « Mise à jour »), puis on met à jour la fiche et son quiz dans
  une session Claude (« la procédure X a été révisée, mets à jour sa fiche et
  son quiz à partir du nouveau PDF »).
- **Les enregistrements à plusieurs pièces jointes** (ex. serrage de marteau =
  4 planches fusionnées à la main en un PDF) ne sont jamais écrasés : ils sont
  signalés dans le résumé du job pour une fusion manuelle.
- **Les photos/schémas** (`figures.js`, `images/figures/`) ne bougent pas.

## Déclenchement instantané (optionnel)

Le cron horaire suffit dans la plupart des cas. Pour une mise à jour
**immédiate** dès le remplacement du PDF, créer une automatisation Airtable
dans la base « Documents » :

- *Déclencheur* : « When record updated » sur la table « Procédures »
  (champ surveillé : « Document procédure »).
- *Action* : « Run script » :

```js
// Nécessite un PAT GitHub "fine-grained" limité à CE dépôt avec la
// permission Contents: Read and write, collé dans un secret d'automatisation.
await fetch('https://api.github.com/repos/Frankyray21/Procedures-Forage-MRI/dispatches', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + input.config().GITHUB_PAT,
    'Accept': 'application/vnd.github+json',
  },
  body: JSON.stringify({ event_type: 'airtable-update' }),
});
```

Le workflow écoute déjà `repository_dispatch` type `airtable-update` — rien
d'autre à faire côté GitHub.

## Dépannage

| Symptôme | Cause probable / remède |
| --- | --- |
| Job rouge : « AIRTABLE_TOKEN manquant » | Créer le secret (voir Mise en place). |
| Job rouge : « Airtable a répondu 401/403 » | Jeton expiré/révoqué, ou sans accès à la base « Documents » : recréer le jeton. |
| Une fiche ne se met jamais à jour | Vérifier dans le résumé du job qu'elle est appariée ; sinon ajouter un alias. Pour forcer : Run workflow avec `force_ids`. |
| PDF changé mais pas les images de pages | Regarder le log : si `pdftoppm` a échoué sur ce PDF, relancer avec `force_ids` ; les images restent alors celles d'avant (le PDF, lui, est à jour). |
| Tout re-synchroniser depuis zéro | Supprimer `.github/airtable/state.json` (commit) : le passage suivant reprend une référence sans rien télécharger, puis utiliser `force_ids` au besoin. |

Le rapport détaillé de chaque passage est dans *Actions → Synchronisation
Airtable → (dernier run) → Summary*.
