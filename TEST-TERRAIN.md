# Test terrain — Assistant IA (PWA + WebLLM/Qwen)

Objectif : décider **avant** tout chantier natif si la PWA + WebLLM/Qwen est
suffisante sur les appareils visés. Mesures collectées **automatiquement** par
l'app (bouton « 📊 Exporter les mesures » dans l'assistant) → un fichier JSON
par appareil.

## 1) Appareils & modèles à tester
| Profil | Modèle (sélecteur « IA ») | Téléch. approx. |
|---|---|---|
| Téléphone faible | **Léger** — Qwen3-0.6B | ≈ 0,6 Go |
| Téléphone moyen | **Équilibré** — Qwen3-1.7B | ≈ 1 Go |
| Téléphone fort / tablette / PC | **Qualité** — Qwen3-4B | ≈ 2,5 Go |

> Le bouton « IA » n'apparaît que si l'appareil a **WebGPU**. S'il est absent,
> l'app reste sur la recherche lexicale (c'est une donnée de test en soi).

## 2) Procédure sur chaque appareil
1. Ouvrir la PWA **en ligne (Wi-Fi)**, ouvrir l'assistant (bulle), cliquer **IA**, choisir le profil.
2. Laisser télécharger (1ʳᵉ fois) → noter que `fromCache:false`, `initMs` = temps de 1er chargement.
3. Poser **5 à 10 questions réelles** tirées des procédures (voir liste ci-dessous).
4. Cliquer **📊 Exporter les mesures** → copier / télécharger le JSON.
5. **Fermer puis rouvrir** la PWA → cliquer IA / même profil : doit charger **depuis le cache**
   (`fromCache:true`, `initMs` court). *(Internet OK ici — l'IA n'a PAS l'obligation de marcher
   hors-ligne ; seule la recherche lexicale reste offline.)*
6. Exporter de nouveau (2ᵉ JSON) — mesure « chargement après cache ».
   *(Optionnel : couper le réseau et vérifier que ça répond quand même = bonus, pas un critère.)*

### Questions FR suggérées (procédures réelles)
- « Distance minimale entre le mât et la console ? »
- « Que faire si une tige casse dans le saver sub ? »
- « Cadenassage avant intervention »
- « Pression d'eau pour installer le frein manuel »
- « Hauteur des crochets de la chaîne de retenue »
- « Forage à distance : distance minimale »
- « Que faire en cas d'interception de gaz ? »
- « Casing : longueur par rapport à la longueur alésée »

## 3) Ce qui est mesuré (dans le JSON exporté)
- `device` : UA, OS/plateforme, cœurs CPU, RAM (`memGB`), GPU (vendor/architecture), écran, batterie.
- `initMs` + `fromCache` : temps de 1er téléchargement **et** de chargement après cache.
- Par question (`runs[]`) : `ms` (latence), `words`, `estTokPerSec` (~ chars/4), `engineStats` (tok/s réels WebLLM).
- `batteryStart` / `batteryEnd` : dérive batterie sur la session (proxy de chauffe/conso).
  *(La température n'est pas exposée par le navigateur — juger via batterie + ressenti.)*

## 4) Critères de décision (sortie attendue)
- **Modèle par défaut mobile** : si **Qwen3-1.7B** acceptable (latence + tok/s + batterie OK)
  sur la majorité des téléphones → garder Web/PWA comme voie principale, 1.7B par défaut mobile.
- Si **1.7B trop lourd** sur mobile → **0.6B par défaut mobile**, **1.7B/4B réservés desktop/tablette**.
- **Modèle par défaut desktop** : 1.7B ou 4B selon mesures.
- **Seuil « appareil non compatible »** : pas de WebGPU, ou `memGB` trop faible, ou tok/s < seuil
  jugé inutilisable → l'app reste en mode lexical (déjà le cas). *(L'offline n'est PAS un critère.)*
- **Go / no-go natif (LiteRT-LM)** : **no-go** si la PWA suffit ; **go** seulement si WebGPU/PWA
  instable terrain ou perfs insuffisantes malgré 0.6B. *(Le besoin hors-ligne n'est plus une raison
  de partir en natif.)*

> Rappel : l'IA peut **exiger Internet** (au moins pour le 1er chargement). Reste local/privé :
> le modèle tourne sur l'appareil, les questions ne sont **pas** envoyées à un serveur.

## 5) Repère d'ordres de grandeur (à confirmer terrain)
- Mobiles récents milieu/haut de gamme : 1.7B q4 souvent **5–15 tok/s**, 0.6B **15–30+**.
- 1er téléchargement = réseau dépendant (≈ 1 Go → quelques minutes en Wi-Fi) ; chargement après
  cache = quelques secondes.
- Ce sont des repères — **seules les mesures réelles décident**.
