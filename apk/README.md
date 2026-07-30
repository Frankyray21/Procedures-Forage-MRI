# App Android (APK) — comment ça marche

L'app est un **enrobage Capacitor** du site : `apk/build-www.js` assemble
`apk/www/` (tout le site + les ~170 Mo de médias), `npx cap sync android`
le copie dans le projet Android, et la CI (`.github/workflows/build-apk.yml`)
compile et publie l'APK signé sur la release **apk-latest** à chaque poussée
sur `main` :

> https://github.com/Frankyray21/Procedures-Forage-MRI/releases/download/apk-latest/procedures-mri.apk

La page `apk.html` du site (lien au pied de page) donne le QR code et la
marche à suivre.

## Hybride : contenu embarqué + mises à jour à chaud

- **Embarqué** : fiches, images, PDF, quiz — disponibles sous terre dès
  l'installation, ineffaçables par Android.
- **À chaud** (`apk/src/apk-update.js`) : quand il y a du réseau, l'app
  compare sa version au miroir public GitHub Pages ; si plus récent, elle
  télécharge les JS + CSS (~2 Mo), les stocke d'un bloc dans IndexedDB, et
  `apk/src/apk-boot.js` les applique au prochain démarrage. Un démarrage qui
  échoue avec une mise à jour bannit cette version et repart sur l'embarqué.
- **Nouveaux médias** (nouvelle procédure, PDF révisé) : pas de mise à jour à
  chaud (trop lourd) — l'app affiche une bannière recommandant d'installer le
  nouvel APK.

## Limites assumées

- **Clé de signature commitée** (`apk/mri-release.keystore`, mots de passe en
  clair dans `android/app/build.gradle`) : nécessaire pour que la CI signe
  sans configuration manuelle, et pour que chaque APK s'installe par-dessus le
  précédent. Le dépôt étant public, cette clé ne prouve PAS l'authenticité de
  l'APK — la confiance repose sur le canal de distribution (le lien/QR officiel
  du site). Pour durcir plus tard : mettre le keystore (base64) et les mots de
  passe dans les *secrets* GitHub Actions, adapter `build-apk.yml` pour le
  reconstituer au build, retirer le fichier du dépôt et régénérer une clé —
  les appareils devront alors désinstaller/réinstaller une fois.
- **suivi.html** dans l'app reste figé à la version embarquée (les mises à
  jour à chaud ne couvrent que l'app principale).
- Le tag git `apk-latest` ne bouge pas après sa création ; seule la release
  et son APK sont remplacés — l'URL de téléchargement, elle, est stable.
