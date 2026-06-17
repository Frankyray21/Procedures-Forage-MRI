/* ===========================================================================
   MRI_LLM — moteur d'IA locale (hors-ligne après téléchargement) optionnel.
   Abstraction « interface modèle » : aujourd'hui WebLLM/MLC (WebGPU) ;
   on pourra brancher un autre moteur (ex. Gemma 4) sans toucher au reste.
   - N'inventer JAMAIS : utilisé uniquement en RAG (contexte = passages des
     procédures), avec consigne stricte de citer et de refuser hors-contexte.
   - Chargé/initialisé seulement à la demande de l'utilisateur (rien au boot).
   =========================================================================== */
(function () {
  'use strict';
  if (window.MRI_LLM) return;

  // Source du moteur WebLLM (ES module via CDN). Le *modèle* (poids) est
  // ensuite téléchargé une fois puis mis en cache par WebLLM (hors-ligne).
  var WEBLLM_CDN = 'https://esm.run/@mlc-ai/web-llm';

  // Préférence de modèle (on choisit dans la liste pré-bâtie de WebLLM, ce qui
  // évite de coder en dur un identifiant qui pourrait changer). Ordre =
  // qualité/poids raisonnable d'abord, replis ensuite.
  var PREF = [
    /qwen3.*1\.7b.*q4/i, /qwen2\.5-1\.5b.*instruct.*q4/i, /llama-3\.2-1b.*instruct.*q4/i,
    /smollm2-1\.7b.*q4/i, /qwen3.*0\.6b.*q4/i, /gemma-?2-2b.*q4/i, /-1b-.*q4f16/i, /q4f16_1-MLC$/i
  ];

  var engine = null, ready = false, busy = false, MODEL_ID = null;

  function available() { return typeof navigator !== 'undefined' && !!navigator.gpu; }
  function isReady() { return ready; }
  function model() { return MODEL_ID; }

  function pickModel(list) {
    for (var i = 0; i < PREF.length; i++) {
      for (var j = 0; j < list.length; j++) {
        if (PREF[i].test(list[j].model_id)) return list[j].model_id;
      }
    }
    return list.length ? list[0].model_id : null;
  }

  // Initialise le moteur (télécharge le modèle au 1er appel). onProgress reçoit
  // les rapports d'avancement de WebLLM ({progress:0..1, text}).
  function init(onProgress) {
    if (ready) return Promise.resolve(MODEL_ID);
    if (busy) return Promise.reject(new Error('initialisation déjà en cours'));
    if (!available()) return Promise.reject(new Error('WebGPU non disponible sur cet appareil'));
    busy = true;
    return import(/* @vite-ignore */ WEBLLM_CDN).then(function (webllm) {
      MODEL_ID = pickModel((webllm.prebuiltAppConfig && webllm.prebuiltAppConfig.model_list) || []);
      if (!MODEL_ID) throw new Error('aucun modèle compatible trouvé');
      return webllm.CreateMLCEngine(MODEL_ID, {
        initProgressCallback: function (r) { try { onProgress && onProgress(r); } catch (e) {} }
      });
    }).then(function (eng) {
      engine = eng; ready = true; busy = false; return MODEL_ID;
    }).catch(function (e) { busy = false; throw e; });
  }

  function stripThink(s) {
    return s.replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/<think>[\s\S]*$/i, '').replace(/^\s+/, '');
  }

  // Génère une réponse à partir d'un CONTEXTE (RAG). passages = [{text, ptitre, source}].
  // onToken(partielNettoyé) est appelé pendant le streaming. Retourne le texte final.
  function answer(question, passages, onToken) {
    if (!ready || !engine) return Promise.reject(new Error('moteur non prêt'));
    var ctx = (passages || []).map(function (p, i) {
      return '[' + (i + 1) + '] ' + p.text + '  (' + p.ptitre + (p.source ? ' · ' + p.source : '') + ')';
    }).join('\n\n');
    var sys =
      "Tu es l'assistant des procédures de forage de Machines Roger International. " +
      "Réponds en français, de façon concise. Utilise UNIQUEMENT le CONTEXTE fourni " +
      "(extraits officiels des procédures). Cite tes sources avec leur numéro entre " +
      "crochets, ex. [1]. N'invente jamais de chiffre, de distance ni de consigne. " +
      "Si la réponse n'est pas dans le contexte, réponds exactement : " +
      "« Ce n'est pas précisé dans les procédures consultées. »";
    var usr = "CONTEXTE :\n" + ctx + "\n\nQUESTION : " + question + "\n\nRéponse (cite [n]) :";
    return engine.chat.completions.create({
      messages: [{ role: 'system', content: sys }, { role: 'user', content: usr }],
      temperature: 0.2, max_tokens: 380, stream: true
    }).then(function (stream) {
      var raw = '';
      function pump(iter) {
        return iter.next().then(function (step) {
          if (step.done) return stripThink(raw);
          var d = step.value && step.value.choices && step.value.choices[0] &&
                  step.value.choices[0].delta && step.value.choices[0].delta.content;
          if (d) { raw += d; try { onToken && onToken(stripThink(raw)); } catch (e) {} }
          return pump(iter);
        });
      }
      return pump(stream[Symbol.asyncIterator]());
    });
  }

  window.MRI_LLM = {
    available: available, isReady: isReady, model: model, init: init, answer: answer
  };
})();
