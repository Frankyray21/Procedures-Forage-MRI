# Procédures de forage — Machines Roger International

**🔗 Site publié : <https://frankyray21.github.io/Procedures-Forage-MRI/>**

Site web (application monopage + PWA installable, **consultable hors-ligne**) qui regroupe
toutes les procédures de travail de forage de M.R.I. :

- Chaque procédure est **adaptée en page web moderne** (objectif, étapes, avertissements,
  consignes, valeurs clés) **et** conserve son **PDF officiel** consultable et téléchargeable.
- Un **quiz** par fiche (types variés) débloque l'**attestation de lecture**, envoyée à
  Airtable via un Worker Cloudflare (avec file d'attente hors ligne : l'attestation part
  automatiquement au retour du réseau). Deux PDF générés sur l'appareil : attestation du
  travailleur et fiche gestionnaire.
- Une page **Mon suivi** (`#/suivi`) montre la progression (quiz complétés, attestations,
  résultats détaillés) — locale à l'appareil, avec récupération de l'historique par nom.
- **Thème sombre par défaut** (sous terre) et **thème clair** (bouton dans la barre).
- **Accès libre** (aucun mot de passe). Interface en **français**, design Barlow / rouge (M.R.I.).

> Le **Code de sécurité** a été retiré du site (non publié) — ses données restent dans
> `code-securite-data.js`, non chargé.

**Déployer une nouvelle version** : lancer `node bump-version.js` (synchronise `?v=`,
la version affichée au pied de page et le cache du service worker), puis commit + push sur
`main`. Le Worker (`worker/`) se redéploie automatiquement via Cloudflare à chaque push.

---

## 1. Lancer le site en local

Le site est 100 % statique (aucune compilation). Pour le prévisualiser :

```
# depuis le dossier Procedures_Foreuses_Site
python -m http.server 5050
```
Puis ouvrir <http://localhost:5050>. (Un double-clic sur `index.html` fonctionne aussi, mais
servir via http est recommandé pour le service worker et les PDF.)

## 2. Accès

Le site est en **accès libre** (aucun mot de passe). Si une protection devient nécessaire un
jour, le plus simple est un **mot de passe de site côté hébergeur** (ex. Netlify), bien plus
fiable qu'un mot de passe dans le code d'un site statique.

## 3. Ajouter ou modifier une procédure

Tout le contenu est dans **`data.js`** (`window.PROCEDURES`). Un objet = une procédure :

```js
{
  id: "pro-op-ith-020",            // identifiant unique (sert d'URL et de nom de PDF)
  code: "PRO-OP-ITH-020",
  titre: "Titre lisible",
  categorie: "Forage",             // Forage | Alésage | Installation | Maintenance |
                                   // Manutention | Démobilisation | Intervention
  machines: ["ITH", "V-30"],
  resume: "Phrase de présentation (carte d'accueil).",
  objectif: "…", application: "…", responsabilites: "…",
  epi: ["Casque", "Lunettes"],
  equipements: ["Clé", "Whip check"],
  prerequis: ["Foreuse au neutre", "…"],
  etapes: [ { num: "1", texte: "…", danger: "" }, … ],
  avertissements: ["Texte d'un encadré rouge", …],
  consignes_securite: [ { regle: "…", theme: "…", source: "Étape 8" }, … ],
  valeurs_cles: [ { libelle: "Mât ↔ travailleur", valeur: "1,5 m" }, … ],
  figures: [ { page: "2", description: "…" } ],
  historique: [ { date: "…", description: "…", par: "…" } ],
  date_creation: "Mars 2002", date_revision: "Juin 2024",
  source_pdf: "nom-original.pdf", langue_source: "fr", notes: ""
}
```

Tous les champs sauf `id`, `titre`, `categorie`, `machines`, `resume` sont facultatifs
(laisser `""` ou `[]`). **Déposer le PDF** correspondant dans `pdf/` en le nommant
`<id>.pdf` (ex. `pdf/pro-op-ith-020.pdf`). Après tout ajout/retrait de PDF ou
d'images, relancer `node gen-sizes.js` pour rafraîchir `sizes.js` (tailles servant
à l'estimation du téléchargement hors-ligne).

Pour mettre à jour le **Code de sécurité**, éditer `window.CODE_SECURITE` dans `data.js`.

## 4. Mettre à jour la liste des fichiers en cache (hors-ligne)

Si on ajoute des fichiers à mettre en cache d'office, les lister dans `service-worker.js`
(`CORE`) et **incrémenter la version** (`const VERSION = 'mri-proc-v2'`) pour forcer la mise
à jour chez les utilisateurs. Les PDF se mettent en cache automatiquement à la première
consultation (donc disponibles hors-ligne ensuite).

## 5. Déployer (mise en ligne)

Le plus simple : **Netlify** (comme le site Prévention TMS).
1. Glisser-déposer le dossier `Procedures_Foreuses_Site` sur <https://app.netlify.com/drop>,
   **ou** connecter un dépôt Git.
2. Aucune commande de build : « Publish directory » = la racine du dossier.
3. (Optionnel) Activer la protection par mot de passe côté Netlify pour une vraie
   confidentialité.

## 6. Structure

```
index.html            coquille de l'app (porte d'accès, barre, vues)
styles.css            design system Barlow / rouge
config.js             libellés (organisation, titre)
data.js               TOUTES les procédures + le Code de sécurité  ← contenu
app.js                logique (accès, recherche, filtres, rendu, PWA)
manifest.webmanifest  métadonnées de l'app installable
service-worker.js     cache hors-ligne
icons/                icônes de l'app (192, 512, maskable)
images/               logo M.R.I.
pdf/                  PDF officiels (un par procédure : <id>.pdf)
_server.js            serveur statique local optionnel (node)
```
