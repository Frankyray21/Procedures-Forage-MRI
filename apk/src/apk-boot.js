/* ===========================================================================
   APK — CHARGEUR DE DÉMARRAGE (apk-boot.js)

   Dans l'app Android, TOUT le contenu est embarqué : l'app fonctionne sous
   terre dès l'installation, sans téléchargement préalable. Ce chargeur ajoute
   la partie « hybride » : si une mise à jour de contenu a été rapportée par
   apk-update.js (fichiers JS/CSS stockés dans IndexedDB), elle est appliquée
   au démarrage À LA PLACE des fichiers embarqués — sinon, embarqué tel quel.

   Sécurité avant tout :
   - la bascule est TOUT OU RIEN (l'enregistrement « override » contient la
     liste complète et le texte de chaque fichier, stockés d'un bloc) ;
   - filet de secours : si l'app ne démarre pas avec la mise à jour (le
     marqueur data-boot n'est pas retiré), l'override est purgé et l'app
     redémarre sur le contenu embarqué — on ne peut pas rester coincé ;
   - les scripts sont injectés avec async=false : ordre d'exécution identique
     aux balises <script defer> d'origine ;
   - les scripts étant chargés APRÈS le vrai DOMContentLoaded, l'événement est
     rejoué (synthétique) une fois le dernier script exécuté — app.js s'y
     initialise (chatbot.js teste readyState et n'en a pas besoin).
   =========================================================================== */
(function () {
  var B = window.APK_BUILD || { v: 0, files: [], css: 'styles.css' };
  // localStorage (PAS sessionStorage) : une version qui a cassé le démarrage
  // doit rester bannie après la fermeture de l'app, sinon chaque démarrage à
  // froid rejouerait 9 s d'écran cassé avant le filet. apk-update.js consulte
  // la même clé pour ne pas re-télécharger la version fautive.
  var FALLBACK_KEY = 'apk_boot_fail_v';
  function failedV() {
    try { return parseInt(localStorage.getItem(FALLBACK_KEY) || '0', 10) || 0; } catch (e) { return 0; }
  }

  function idb(cb) {
    try {
      var rq = indexedDB.open('mri-apk', 1);
      rq.onupgradeneeded = function () { rq.result.createObjectStore('kv'); };
      rq.onsuccess = function () { cb(rq.result); };
      rq.onerror = function () { cb(null); };
      rq.onblocked = function () { cb(null); };
    } catch (e) { cb(null); }
  }
  function readOverride(cb) {
    idb(function (db) {
      if (!db) return cb(null);
      try {
        var g = db.transaction('kv', 'readonly').objectStore('kv').get('override');
        g.onsuccess = function () { cb(g.result || null); };
        g.onerror = function () { cb(null); };
      } catch (e) { cb(null); }
    });
  }
  function clearOverride(cb) {
    cb = cb || function () {};
    idb(function (db) {
      if (!db) return cb();
      try {
        var tx = db.transaction('kv', 'readwrite');
        tx.objectStore('kv')['delete']('override');
        tx.oncomplete = cb; tx.onabort = cb; tx.onerror = cb;
      } catch (e) { cb(); }
    });
  }
  // Partagé avec apk-update.js (écriture d'un nouvel override, purge).
  window.__APK_IDB = { open: idb, read: readOverride, clear: clearOverride };

  /* Bouton RETOUR d'Android : sans ce branchement, Capacitor ferme l'app au
     premier appui — alors que la navigation (fiches, quiz, onglets) est un
     historique de hash tout à fait navigable. Retour = page précédente ;
     à la racine, l'app est mise en veilleuse (icône récents) plutôt que
     fermée, pour rouvrir instantanément. Le plugin @capacitor/app est natif :
     il est présent dans l'APK même quand une mise à jour à chaud est active. */
  try {
    var AppP = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
    if (AppP && AppP.addListener) {
      AppP.addListener('backButton', function (info) {
        if (info && info.canGoBack) window.history.back();
        else if (AppP.minimizeApp) AppP.minimizeApp();
        else if (AppP.exitApp) AppP.exitApp();
      });
    }
  } catch (e) {}

  function boot(ov) {
    // Un override ne vaut que s'il est PLUS RÉCENT que le contenu embarqué
    // (un nouvel APK installé par-dessus rend l'ancien override caduc) et
    // s'il n'a pas déjà fait échouer un démarrage (bannissement persistant ;
    // une version corrigée — numéro supérieur — lève le bannissement).
    var use = (ov && ov.v > B.v && ov.v !== failedV() && ov.list && ov.list.length && ov.files) ? ov : null;
    window.__APK_OVERRIDE = use;

    if (use && use.css) {
      try {
        var st = document.createElement('style');
        st.textContent = use.css;
        var ln = document.querySelector('link[rel="stylesheet"]');
        if (ln && ln.parentNode) { ln.parentNode.insertBefore(st, ln.nextSibling); ln.disabled = true; }
        else document.head.appendChild(st);
      } catch (e) {}
    }

    var list = use ? use.list : B.files;
    var pending = list.length;
    function done() {
      if (--pending > 0) return;
      // Les scripts sont arrivés après le vrai DOMContentLoaded : on le
      // rejoue pour app.js (une seule fois, tous les scripts sont exécutés).
      try {
        if (document.readyState !== 'loading') document.dispatchEvent(new Event('DOMContentLoaded'));
      } catch (e) {}
    }
    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      var s = document.createElement('script');
      if (use && use.files[p]) {
        s.src = URL.createObjectURL(new Blob([use.files[p]], { type: 'text/javascript' }));
      } else {
        s.src = p + '?v=' + B.v;
      }
      s.async = false;                 // préserve l'ordre d'exécution
      s.onload = done; s.onerror = done;
      document.head.appendChild(s);
    }
    if (!list.length) done();

    if (use) {
      // Filet de secours : app.js retire data-boot au premier rendu. S'il est
      // toujours là après 9 s, la mise à jour a cassé le démarrage → la version
      // est bannie durablement, l'override purgé, et l'app redémarre sur le
      // contenu embarqué. Un démarrage réussi avec une version plus récente
      // efface le bannissement.
      setTimeout(function () {
        var v = document.getElementById('view');
        if (v && v.getAttribute('data-boot') === '1') {
          try { localStorage.setItem(FALLBACK_KEY, String(use.v)); } catch (e) {}
          clearOverride(function () { location.reload(); });
        } else if (failedV() && failedV() < use.v) {
          try { localStorage.removeItem(FALLBACK_KEY); } catch (e) {}
        }
      }, 9000);
    }
  }

  readOverride(boot);
})();
