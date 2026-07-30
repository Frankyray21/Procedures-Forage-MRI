/* ===========================================================================
   APK — MISE À JOUR DE CONTENU À CHAUD (apk-update.js)

   L'app Android embarque tout le contenu ; ce module la garde À JOUR sans
   réinstallation : quand il y a du réseau, il compare la version embarquée
   (ou déjà surchargée) au site public (miroir GitHub Pages, sans mot de
   passe, CORS ouvert). S'il y a plus récent, il télécharge TOUS les fichiers
   JS + CSS de l'app (~2 Mo), les valide, puis les stocke D'UN BLOC dans
   IndexedDB — apk-boot.js les appliquera au prochain démarrage.

   Les MÉDIAS (images de pages, photos, PDF) ne sont pas mis à jour à chaud :
   ils changent rarement et pèsent ~170 Mo. Si la mise à jour référence des
   médias qui ne sont pas dans l'APK (nouvelle procédure, PDF révisé), une
   bannière recommande d'installer le nouvel APK — sinon ces nouveaux visuels
   manqueraient sous terre.
   =========================================================================== */
(function () {
  if (!window.IS_APK) return;
  var B = window.APK_BUILD || { v: 0, name: '', mediaSet: {} };
  var SITE = 'https://frankyray21.github.io/Procedures-Forage-MRI/';
  var APK_URL = 'https://github.com/Frankyray21/Procedures-Forage-MRI/releases/download/apk-latest/procedures-mri.apk';
  var CHECK_MS = 6 * 60 * 60 * 1000;      // re-contrôle toutes les 6 h app ouverte
  var busy = false, lastCheck = 0;
  // Version déjà STOCKÉE en attente d'un redémarrage : sans ce suivi, chaque
  // événement 'online'/visibilitychange re-téléchargeait les ~2 Mo de la même
  // mise à jour tant que l'app n'était pas redémarrée.
  var pendingV = 0;

  function currentV() {
    var ov = window.__APK_OVERRIDE;
    return (ov && ov.v > B.v) ? ov.v : B.v;
  }
  // Version bannie par apk-boot (a cassé un démarrage) : on ne la re-télécharge
  // jamais — la prochaine version publiée (numéro supérieur) reprendra le fil.
  function failedV() {
    try { return parseInt(localStorage.getItem('apk_boot_fail_v') || '0', 10) || 0; } catch (e) { return 0; }
  }
  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove('show'); }, 6000);
  }

  /* Bandeau discret sous la barre : « nouveaux médias → installe le nouvel
     APK » ou « mise à jour prête → redémarre ». Un seul à la fois. */
  function banner(html) {
    var b = document.getElementById('apkBanner');
    if (!b) {
      b = document.createElement('div');
      b.id = 'apkBanner';
      b.style.cssText = 'position:sticky;top:0;z-index:60;padding:.55rem .9rem;text-align:center;' +
        'font-size:.85rem;font-weight:600;background:#173042;color:#cfe3f5;border-bottom:1px solid #295072';
      var bar = document.getElementById('appbar');
      if (bar && bar.parentNode) bar.parentNode.insertBefore(b, bar.nextSibling);
      else document.body.insertBefore(b, document.body.firstChild);
    }
    b.innerHTML = html;
    return b;
  }

  function extractScripts(html) {
    // Mêmes balises que build-www.js : <script src="X.js?v=N" defer></script>
    var out = [], re = /<script src="([^"?]+\.js)\?v=\d+" defer><\/script>/g, m;
    while ((m = re.exec(html))) out.push(m[1]);
    return out;
  }
  function extractMedia(sizesTxt) {
    // Même périmètre que mediaSet dans build-www.js : tout images/ et pdf/.
    var set = {}, re = /"((?:images|pdf)\/[^"]+)"\s*:/g, m;
    while ((m = re.exec(sizesTxt))) set[m[1]] = 1;
    return set;
  }

  function fetchText(u) {
    return fetch(u, { cache: 'no-store' }).then(function (r) {
      if (!r || r.status !== 200) throw new Error('HTTP ' + (r && r.status));
      return r.text();
    }).then(function (t) {
      if (!t) throw new Error('vide');
      return t;
    });
  }

  function saveOverride(rec, cb) {
    var I = window.__APK_IDB;
    if (!I) return cb(false);
    I.open(function (db) {
      if (!db) return cb(false);
      try {
        var tx = db.transaction('kv', 'readwrite');
        tx.objectStore('kv').put(rec, 'override');
        tx.oncomplete = function () { cb(true); };
        tx.onabort = function () { cb(false); };
        tx.onerror = function () { cb(false); };
      } catch (e) { cb(false); }
    });
  }

  function check() {
    if (busy || !navigator.onLine) return;
    if (Date.now() - lastCheck < 60 * 1000) return;
    lastCheck = Date.now();
    busy = true;
    fetchText(SITE + 'index.html').then(function (html) {
      var mv = html.match(/\?v=(\d+)/);
      var remoteV = mv ? parseInt(mv[1], 10) : 0;
      var mn = html.match(/>v(\d+\.\d+)</);
      var remoteName = mn ? 'v' + mn[1] : ('v' + remoteV);
      if (!remoteV || remoteV <= currentV() || remoteV <= pendingV || remoteV === failedV()) { busy = false; return; }

      var list = extractScripts(html);
      if (!list.length) { busy = false; return; }
      var jobs = [fetchText(SITE + 'styles.css?v=' + remoteV)].concat(
        list.map(function (p) { return fetchText(SITE + p + '?v=' + remoteV); })
      );
      Promise.all(jobs).then(function (texts) {
        var css = texts[0], files = {};
        for (var i = 0; i < list.length; i++) files[list[i]] = texts[i + 1];
        // Nouveaux médias référencés mais absents de l'APK ?
        var mediaNew = false;
        try {
          var sizesTxt = files['sizes.js'] || '';
          var remoteMedia = extractMedia(sizesTxt);
          for (var k in remoteMedia) { if (!B.mediaSet[k]) { mediaNew = true; break; } }
        } catch (e) {}
        // apk-update.js lui-même n'existe pas sur le site : il reste chargé
        // depuis l'APK (apk-boot retombe sur le fichier embarqué).
        list.push('apk-update.js');
        var rec = { v: remoteV, name: remoteName, list: list, files: files, css: css, mediaNew: mediaNew, date: Date.now() };
        saveOverride(rec, function (ok) {
          busy = false;
          if (!ok) return;
          pendingV = remoteV;              // stocké : ne plus re-télécharger avant le redémarrage
          var b = banner('Contenu mis à jour (' + remoteName + ') — <a href="#" id="apkReload" style="color:#8fd0ff">appuyer ici pour l\'appliquer</a>' +
            (mediaNew ? '<br>De nouvelles images/PDF existent : pense aussi à réinstaller l\'app (nouvel APK).' : ''));
          var a = document.getElementById('apkReload');
          if (a) a.onclick = function (e) { e.preventDefault(); location.reload(); };
          toast('Mise à jour du contenu téléchargée (' + remoteName + ').');
        });
      }).catch(function () { busy = false; });   // un fichier a échoué : rien n'est appliqué
    }).catch(function () { busy = false; });
  }

  function init() {
    // Un override plus récent que celui appliqué peut déjà attendre en
    // IndexedDB (téléchargé lors d'une session précédente sans redémarrage
    // complet) : on le compte comme « en attente » pour ne pas le re-télécharger.
    var I = window.__APK_IDB;
    if (I && I.read) {
      I.read(function (stored) {
        if (stored && stored.v > pendingV && stored.v !== failedV()) pendingV = stored.v;
      });
    }
    // Un override actif signale des médias manquants dans l'APK ?
    var ov = window.__APK_OVERRIDE;
    if (ov && ov.mediaNew) {
      banner('Cette mise à jour référence de nouvelles images ou de nouveaux PDF absents de l\'app.<br>' +
        '<a href="' + APK_URL + '" style="color:#8fd0ff">Télécharger le nouvel APK</a> (avec du réseau) pour tout avoir sous terre.');
    }
    check();
    window.addEventListener('online', check);
    setInterval(check, CHECK_MS);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && Date.now() - lastCheck > CHECK_MS) check();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
