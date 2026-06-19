# Mettre le site en ligne en PRIVÉ — guide pas à pas (Cloudflare Pages)

Ce guide explique comment publier le site **protégé par un mot de passe**, gratuitement,
pour tes employés. Aucune connaissance technique nécessaire : suis les étapes dans l'ordre.

**Le principe :** Cloudflare héberge le site (comme GitHub Pages), mais en plus il demande
un **mot de passe** avant d'afficher quoi que ce soit. Un seul mot de passe, partagé entre
tous les employés. Tu le définis toi-même et tu peux le changer quand tu veux.

> Le code de protection est déjà en place dans le dépôt (dossier `functions/`). Tu n'as
> rien à programmer. Il te reste seulement à créer le compte et à coller le mot de passe.

---

## Étape 1 — Créer un compte Cloudflare (gratuit, 2 min)

1. Va sur <https://dash.cloudflare.com/sign-up>
2. Inscris-toi avec ton courriel et un mot de passe (celui de ton **compte Cloudflare** —
   ce n'est PAS le mot de passe du site).
3. Confirme ton courriel si on te le demande.

## Étape 2 — Connecter ton dépôt GitHub (5 min)

1. Dans le tableau de bord Cloudflare, menu de gauche : **Compute (Workers & Pages)**
   → onglet **Pages**.
   *(Selon la version, ça peut s'appeler « Workers & Pages ».)*
2. Clique **Create application** → onglet **Pages** → **Connect to Git**.
3. Autorise Cloudflare à accéder à ton compte **GitHub**.
4. Choisis le dépôt **`Procedures-Forage-MRI`**.
5. Clique **Begin setup**.

## Étape 3 — Réglages de construction (1 min)

Sur l'écran de configuration, mets **exactement** ceci :

| Champ | Valeur à mettre |
|-------|-----------------|
| **Production branch** | `main` |
| **Framework preset** | `None` |
| **Build command** | *(laisser VIDE)* |
| **Build output directory** | `/` |

> Le site n'a rien à « compiler » : c'est déjà du HTML/JS prêt à servir.

⚠️ **NE clique pas encore sur « Save and Deploy ».** Fais d'abord l'étape 4 ci-dessous,
dans la même page (section **Environment variables**). Si tu ne la vois pas, déploie quand
même, puis ajoute les variables à l'étape 4 et **redéploie** (étape 5).

## Étape 4 — Définir le mot de passe (LE point important)

Toujours sur la page de configuration, ouvre la section **Environment variables**
(variables d'environnement) et ajoute **deux** variables :

| Nom de la variable | Valeur |
|--------------------|--------|
| `SITE_USER` | `mri` *(ou l'identifiant de ton choix)* |
| `SITE_PASSWORD` | **le mot de passe que tu donneras à tes employés** |

- Respecte exactement les noms `SITE_USER` et `SITE_PASSWORD` (en majuscules).
- Choisis un mot de passe simple à dire mais pas évident (ex. `Forage-MRI-2026`).
- Tu pourras le changer plus tard ici même.

Puis clique **Save and Deploy**.

## Étape 5 — Vérifier

1. Attends ~1 minute (Cloudflare construit le site et te donne une adresse du genre
   `https://procedures-forage-mri.pages.dev`).
2. Ouvre cette adresse : une **fenêtre de connexion** doit apparaître.
3. Entre l'identifiant (`mri`) et ton mot de passe → le site s'affiche. ✅
4. En navigation privée (ou sur un autre appareil), vérifie que **sans** le mot de passe,
   le site ne s'affiche PAS.

> Si tu as déployé AVANT d'ajouter les variables (étape 4), tu verras le message
> « Site en cours de configuration ». C'est normal : ajoute les deux variables dans
> **Settings → Environment variables**, puis **Deployments → … → Retry deployment**.

---

## Au quotidien

- **Donner l'accès à un employé :** transmets-lui l'adresse `…pages.dev`, l'identifiant
  `mri` et le mot de passe. Sur téléphone/tablette, il peut « Ajouter à l'écran d'accueil »
  pour l'utiliser comme une application (et consulter hors-ligne ensuite).
- **Changer le mot de passe :** Cloudflare → ton projet → **Settings** →
  **Environment variables** → modifie `SITE_PASSWORD` → **Save** → **Retry deployment**.
  L'ancien mot de passe ne fonctionne plus.
- **Mettre à jour le contenu du site :** rien ne change pour toi. Dès qu'une modification
  arrive sur la branche `main`, Cloudflare republie automatiquement.

## (Plus tard, optionnel) Adresse personnalisée

Tu peux remplacer `…pages.dev` par une adresse à toi (ex. `procedures.machinesroger.com`)
dans l'onglet **Custom domains** de ton projet Cloudflare. On le fera ensemble si tu veux.

## Et GitHub Pages dans tout ça ?

Le site reste aussi accessible (sans mot de passe) sur l'ancienne adresse GitHub Pages.
Quand ta version Cloudflare privée fonctionne, dis-le moi : je désactiverai la version
publique GitHub Pages pour qu'il ne reste que la version protégée.
