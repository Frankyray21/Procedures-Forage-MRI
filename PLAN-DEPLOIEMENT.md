# Plan de déploiement — site + app Android (sortir des liens github.io)

Objectif : donner aux équipes une **adresse officielle, stable et (si souhaité) protégée**
pour le site et l'app Android, à la place des liens GitHub actuels
(`frankyray21.github.io/…` et `github.com/…/releases/download/…`).

---

## 0. État des lieux (ce qui existe déjà)

| Élément | Où il est aujourd'hui | Comment il se déploie |
|---|---|---|
| **Site officiel (PWA)** | GitHub Pages : `https://frankyray21.github.io/Procedures-Forage-MRI/` | auto à chaque push sur `main` (`static.yml`) |
| **Site de test** | même adresse + `/test/` | auto à chaque push sur la branche `test` |
| **APK officiel** | GitHub Releases, tag `apk-latest` | manuel : workflow *Build Android APK*, `channel=production` |
| **APK de test** | GitHub Releases, tag `apk-test` | auto à chaque push sur `test` |
| **Worker attestations** (quiz → Airtable) | `attestations-procedures.frankyray-21.workers.dev` | auto à chaque push sur `main` (build Cloudflare, dossier `worker/`) |
| **Protection mot de passe** | prête mais **pas encore active** (`functions/_middleware.js`) | s'active seulement sur Cloudflare Pages |

Bonne nouvelle : **presque tout est déjà automatisé**. Le plan consiste surtout à
mettre en service Cloudflare Pages (guide déjà écrit : `DEPLOIEMENT-CLOUDFLARE.md`)
et à décider ce qu'on fait des anciennes adresses.

---

## 1. Trois décisions à prendre AVANT de commencer

1. **Public ou privé ?**
   - *Privé (recommandé pour un usage interne)* : mot de passe partagé, déjà codé
     (`functions/_middleware.js`) — il n'y a qu'à définir `SITE_USER` / `SITE_PASSWORD`
     dans Cloudflare.
   - *Public* : dans ce cas il faut **retirer le dossier `functions/`** du dépôt
     (sinon, sans `SITE_PASSWORD`, le middleware bloque tout le site avec le message
     « Site en cours de configuration »).
2. **Adresse personnalisée ?** `procedures-forage-mri.pages.dev` (gratuit, immédiat)
   ou un vrai domaine, ex. `procedures.machinesroger.com` (nécessite l'accès au DNS
   du domaine de l'entreprise).
3. **Que devient GitHub Pages ?** Le garder **actif mais non communiqué** (recommandé —
   voir §5 : l'app Android s'en sert comme miroir de mise à jour), ou le fermer
   (demande alors une modification de l'app).

---

## 2. Phase 1 — Mettre le site sur Cloudflare Pages (~30 min)

Suivre `DEPLOIEMENT-CLOUDFLARE.md` pas à pas :

1. Créer le compte Cloudflare (si besoin) et connecter le dépôt
   **`Procedures-Forage-MRI`** dans **Workers & Pages → Pages → Connect to Git**.
2. Réglages : production branch `main`, framework `None`, build command *vide*,
   output directory `/`.
3. **Avant** le premier déploiement, ajouter les variables `SITE_USER` (ex. `mri`)
   et `SITE_PASSWORD` (le mot de passe des employés) — si l'option « privé » est retenue.
4. Déployer, puis vérifier :
   - `https://procedures-forage-mri.pages.dev` demande le mot de passe ;
   - avec le mot de passe, le site complet s'affiche (fiches, PDF, quiz) ;
   - en navigation privée sans mot de passe : rien ne s'affiche.

> Le Worker des attestations autorise déjà cette adresse (`ALLOWED_ORIGINS` dans
> `worker/worker.js`) : les quiz et attestations fonctionneront sans changement.

## 3. Phase 2 — Adresse personnalisée (optionnel, ~15 min + délai DNS)

1. Cloudflare → projet Pages → **Custom domains** → ajouter
   `procedures.machinesroger.com` (ou autre) et créer l'enregistrement CNAME indiqué.
2. **Dans le dépôt**, ajouter cette adresse à `ALLOWED_ORIGINS` (`worker/worker.js`),
   puis push sur `main` (le Worker se redéploie seul). Sans ça, l'envoi des
   attestations sera bloqué (CORS) depuis la nouvelle adresse.
3. Si l'adresse communiquée aux équipes change : régénérer les **QR codes / affiches**
   (`qr-site`, `qr-accueil`, `qr-formation`, etc.) et repointer les liens internes
   qui visent encore github.io (`app.js` → `APK_PAGE_URL`, `apk.html` → `URL_PAGE`).

## 4. Phase 3 — Validation terrain (~1 h, sur un vrai téléphone)

- [ ] Ouverture du site + mot de passe → « Ajouter à l'écran d'accueil » (PWA).
- [ ] Mode avion : le site reste consultable (fiches + PDF déjà visités).
- [ ] Quiz réussi (≥ 80 %) → attestation → la ligne apparaît dans Airtable
      (base « Formations », table « Attestations procédures (web) »), PDF joint.
- [ ] Page « Mon suivi » : progression et historique par nom.
- [ ] Pouce 👍/👎 sur une question → ligne dans « Retours quiz procédures (web) ».
- [ ] iPhone **et** Android : la fenêtre de mot de passe (Basic Auth) est bien
      mémorisée et la PWA installée fonctionne hors-ligne.

## 5. Phase 4 — L'app Android (rien à redéployer, deux points de vigilance)

L'APK n'a **pas besoin de bouger** : les liens GitHub Releases
(`…/releases/download/apk-latest/procedures-mri.apk`) sont stables, gratuits, sans
limite de bande passante réaliste pour cet usage, et déjà imprimés sur les QR/affiches.

Points de vigilance :

1. **Miroir de mise à jour** : `apk/src/apk-update.js` compare la version de l'app au
   site **public** GitHub Pages (`SITE = https://frankyray21.github.io/…`). C'est pour ça
   qu'il faut **laisser GitHub Pages actif** même quand Cloudflare devient l'adresse
   officielle — il devient un simple miroir technique, qu'on ne communique plus.
   (Le mettre derrière le mot de passe casserait les mises à jour à chaud de l'app.)
2. **Publication officielle** : après chaque fusion `test` → `main` validée, lancer le
   workflow *Build Android APK* avec `channel=production` pour mettre à jour l'APK
   officiel (le lien/QR ne change jamais).

## 6. Phase 5 — Bascule et communication

1. `node bump-version.js`, commit, push `main` → tout se republie (Pages GitHub,
   Cloudflare, Worker).
2. Communiquer aux équipes : **nouvelle adresse + identifiant + mot de passe**
   (affiche, QR, message). L'app Android, elle, ne change pas.
3. Retirer le lien `github.io` de toute communication (affiches, messages), **sans**
   désactiver GitHub Pages (cf. §5). Si une confidentialité stricte est exigée un jour,
   il faudra d'abord repointer `apk-update.js` vers une adresse publique de repli.

## 7. Plus tard (durcissement, optionnel)

- **Clé de signature APK** : sortir `apk/mri-release.keystore` du dépôt vers les
  *secrets* GitHub Actions (démarche décrite dans `apk/README.md` — implique une
  réinstallation unique sur les appareils).
- **Accès individuels** : remplacer le mot de passe partagé par **Cloudflare Access**
  (connexion par courriel, gratuite jusqu'à 50 utilisateurs) si on veut savoir *qui*
  se connecte et révoquer une personne sans changer le mot de passe de tous.
- **IA locale (Gemma/LiteRT)** : si le test terrain (`TEST-TERRAIN.md`) retient un
  modèle hébergé, le servir depuis Cloudflare R2 (CORS + cache long), pas depuis le dépôt.

---

## Récapitulatif

| Phase | Durée | Résultat |
|---|---|---|
| 1. Cloudflare Pages + mot de passe | ~30 min | site privé sur `…pages.dev` |
| 2. Domaine personnalisé | ~15 min + DNS | adresse d'entreprise |
| 3. Validation terrain | ~1 h | PWA, hors-ligne, Airtable vérifiés |
| 4. APK | 0 (vigilance seulement) | liens/QR inchangés, miroir préservé |
| 5. Bascule | ~30 min | équipes sur la nouvelle adresse |

Coût total : **0 $** (Cloudflare Pages/Workers gratuits à cette échelle, GitHub
Pages/Releases gratuits). Seul un domaine personnalisé coûterait (~15 $/an) s'il
n'existe pas déjà.
