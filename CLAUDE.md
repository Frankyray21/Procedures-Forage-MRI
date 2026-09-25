# Procédures de forage MRI — consignes pour Claude

Site 100 % statique (vanilla JS, aucune compilation), déployé sur GitHub Pages
depuis `main`. Le contenu est mis en cache hors-ligne par un service worker :
sans bump de version, les appareils gardent l'ancienne version à jamais.

## Règle obligatoire : TOUJOURS mettre à jour la version du site

À chaque modification d'un fichier servi (HTML, CSS, JS, données, images…),
lancer `node bump-version.js` avant le commit final. Le script synchronise en
une commande :

- les `?v=NNN` de cache-busting dans `index.html` ;
- la version `vX.YY` et la date affichées au pied de page ;
- `VERSION = 'mri-proc-vNN'` dans `service-worker.js`.

Ne jamais éditer ces numéros à la main (ils doivent bouger ensemble), et un
seul bump par lot de changements — pas un par commit.

## Synchronisation Airtable (PDF officiels)

Le workflow `.github/workflows/airtable-sync.yml` exécute `sync-airtable.js`
toutes les heures : si un PDF a été remplacé dans Airtable (base « Documents »,
table « Procédures »), il met à jour `pdf/`, `images/pages/`, `pages.js`,
`pdftext.js` et la `date_revision` de la fiche, PUIS fait lui-même le bump de
version et le redéploiement. Ne pas éditer `.github/airtable/state.json` à la
main (empreintes des pièces jointes, maintenu par le workflow). L'app affiche
un badge « Mise à jour » sur toute fiche dont la `date_revision` change — c'est
donc elle qu'il faut mettre à jour quand on révise une fiche à la main. Voir
`AIRTABLE-SYNC.md`.

## Publication : automatique (demande du propriétaire)

Une fois un lot terminé et vérifié (`node --check`, tests, bump de version),
le fusionner dans `main` et pousser SANS redemander : c'est ce qui publie le
site (GitHub Pages). Si `main` a avancé (commits « Sync Airtable »), fusionner
d'abord `main` dans la branche. Vérifier ensuite que le workflow « Deploy
static content to Pages » se termine en succès, et le dire.

## Autres vérifications avant de pousser

- `node --check` sur chaque fichier JS modifié.
- Si des `<script>` sont ajoutés/retirés d'`index.html` : mettre à jour la
  liste `APP_FILES` d'`app.js` ET la liste CORE de `service-worker.js`.
- Tester le rendu mobile (~412 px de large) : la barre d'app et les listes ne
  doivent jamais déborder horizontalement.
