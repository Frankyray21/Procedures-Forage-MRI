/* Outil de développement — contrôle d'intégrité des quiz (node check-quiz.js).
   Vérifie, pour chaque fiche, trois défauts qui rendent un quiz trop facile
   ou répétitif :
   1. questions identiques (même énoncé, à la casse/espaces près) ;
   2. citations quasi identiques (deux questions expliquées par le même
      passage du PDF — les 90 premiers caractères normalisés) ;
   3. fuite de réponse : l'explication d'une question contient mot pour mot
      la bonne réponse d'une autre question du même pool (réponses d'au
      moins 18 caractères ; les types multi/ordre/assoc et vrai-faux sont
      ignorés car leur réponse n'est pas un texte unique).
   Sortie : liste des problèmes, ou « AUCUN PROBLÈME DÉTECTÉ ».
   Code de sortie 1 s'il y a au moins un problème (utilisable en CI).
   N'est PAS chargé par l'application — outil local seulement. */
'use strict';
global.window = global;
[
  'quiz_proc.js',
  'quiz-diamant.js',
  'quiz-diamant2.js',
  'quiz-hard3.js',
  'quiz-dd-equip.js',
  'quiz-securite.js',
  'quiz-ith-new.js',
  'quiz-atelier-sec.js',
  'quiz-cadenassage.js',
  'quiz-english.js',
  'quiz-types.js'
].forEach(function (f) { require('./' + f); });

var QP = global.window.QUIZ_PROC;

function norm(s) {
  return String(s || '').toLowerCase().replace(/[«»"']/g, '').replace(/\s+/g, ' ').trim();
}

var report = [];
Object.keys(QP).forEach(function (id) {
  var pool = QP[id];

  // 1. Questions identiques.
  var seenQ = {};
  pool.forEach(function (it, i) {
    var q = norm(it.q);
    if (seenQ[q] !== undefined) report.push(id + ' : questions identiques Q' + (seenQ[q] + 1) + ' / Q' + (i + 1));
    else seenQ[q] = i;
  });

  // 2. Citations quasi identiques (même passage du PDF cité deux fois).
  var seenE = {};
  pool.forEach(function (it, i) {
    var e = norm(it.e).slice(0, 90);
    if (!e) return;
    if (seenE[e] !== undefined) report.push(id + ' : citations quasi identiques Q' + (seenE[e] + 1) + ' / Q' + (i + 1));
    else seenE[e] = i;
  });

  // 3. L'explication d'une question donne la réponse d'une autre.
  pool.forEach(function (a, i) {
    var ea = norm(a.e);
    if (!ea) return;
    pool.forEach(function (b, j) {
      if (i === j || b.t === 'ordre' || b.t === 'multi' || b.t === 'assoc') return;
      var ans = (b.t === 'vf') ? '' : norm(b.o && b.o[b.a]);
      if (ans && ans.length >= 18 && ea.indexOf(ans) >= 0) {
        report.push(id + " : l'explication de Q" + (i + 1) + ' contient la réponse de Q' + (j + 1));
      }
    });
  });
});

var nq = 0;
Object.keys(QP).forEach(function (id) { nq += QP[id].length; });
console.log(Object.keys(QP).length + ' fiches, ' + nq + ' questions contrôlées.');
console.log(report.length ? report.join('\n') : 'AUCUN PROBLÈME DÉTECTÉ');
process.exit(report.length ? 1 : 0);
