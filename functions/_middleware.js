/*
  Protection par mot de passe du site (Cloudflare Pages Functions).

  Ce fichier s'exécute sur le SERVEUR de Cloudflare, AVANT d'afficher la
  moindre page ou le moindre PDF. Tant que le bon identifiant + mot de passe
  ne sont pas fournis, rien n'est visible. C'est donc une vraie protection
  (impossible à contourner, contrairement à un mot de passe écrit dans le
  code d'un site statique).

  IMPORTANT : le mot de passe n'est PAS écrit ici. Il est lu depuis deux
  « variables d'environnement » que tu définis dans le tableau de bord
  Cloudflare (voir DEPLOIEMENT-CLOUDFLARE.md) :

     SITE_USER       identifiant      (ex. mri)
     SITE_PASSWORD   mot de passe     (celui que tu donnes à tes employés)

  Un seul mot de passe partagé pour tous les employés. Pour le changer plus
  tard : modifie la variable SITE_PASSWORD dans Cloudflare, rien d'autre.
*/

const REALM = 'Procédures MRI — accès réservé';

// Comparaison à durée constante (évite de révéler le mot de passe par le
// temps de réponse). Détail de sécurité, sans impact pour toi.
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function decodeBase64(str) {
  // atob renvoie une chaîne « binaire » ; on la décode en UTF-8 pour
  // supporter les accents dans le mot de passe.
  const bin = atob(str);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export async function onRequest(context) {
  const { request, env, next } = context;

  const expectedUser = env.SITE_USER || 'mri';
  const expectedPass = env.SITE_PASSWORD;

  // Sécurité : si le mot de passe n'a pas encore été configuré dans
  // Cloudflare, on bloque tout (le site n'est jamais public par accident).
  if (!expectedPass) {
    return new Response(
      'Site en cours de configuration : le mot de passe (variable ' +
        'SITE_PASSWORD) n’a pas encore été défini dans Cloudflare.',
      { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }

  const header = request.headers.get('Authorization') || '';
  const [scheme, encoded] = header.split(' ');

  if (scheme === 'Basic' && encoded) {
    let user = '';
    let pass = '';
    try {
      const decoded = decodeBase64(encoded);
      const sep = decoded.indexOf(':');
      user = decoded.slice(0, sep);
      pass = decoded.slice(sep + 1);
    } catch (_) {
      /* en-tête mal formé : on retombe sur la demande d'authentification */
    }

    const okUser = safeEqual(user, expectedUser);
    const okPass = safeEqual(pass, expectedPass);
    if (okUser && okPass) {
      // Identifiants corrects : on laisse passer vers le site normal.
      return next();
    }
  }

  // Pas (ou mauvais) identifiants : le navigateur affiche une fenêtre de
  // connexion (identifiant + mot de passe).
  return new Response('Authentification requise.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
