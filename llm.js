/* ===========================================================================
   MRI_LLM — moteur d'IA locale optionnel (hors-ligne après téléchargement).
   Architecture « fournisseurs » (providers) interchangeables :
     • webllm  : WebLLM/MLC (WebGPU) — défaut, éprouvé (Qwen3-1.7B…).
     • gemma   : MediaPipe LLM Inference Web (LiteRT) — Gemma 4 E2B (Apache-2.0).
   API publique stable : available/isReady/model/init/answer (+ providers/
   setProvider/active/configureGemma). Le chatbot n'utilise que l'API publique,
   donc on peut basculer de moteur sans rien changer ailleurs.
   RAG STRICT : on ne génère qu'à partir des passages fournis, on cite, on
   refuse hors-contexte. Chargé seulement à la demande de l'utilisateur.
   =========================================================================== */
(function () {
  'use strict';
  if (window.MRI_LLM) return;

  function hasGPU() { return typeof navigator !== 'undefined' && !!navigator.gpu; }
  function stripThink(s) {
    return s.replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/<think>[\s\S]*$/i, '').replace(/^\s+/, '');
  }
  // Prompt RAG commun (anti-hallucination) partagé par tous les fournisseurs.
  function buildPrompt(question, passages) {
    var ctx = (passages || []).map(function (p, i) {
      return '[' + (i + 1) + '] ' + p.text + '  (' + p.ptitre + (p.source ? ' · ' + p.source : '') + ')';
    }).join('\n\n');
    var system =
      "Tu es l'assistant des procédures de forage de Machines Roger International. " +
      "Réponds en français, de façon concise. Utilise UNIQUEMENT le CONTEXTE fourni " +
      "(extraits officiels). Cite tes sources par leur numéro entre crochets, ex. [1]. " +
      "N'invente jamais de chiffre, de distance ni de consigne. Si la réponse n'est pas " +
      "dans le contexte, réponds exactement : « Ce n'est pas précisé dans les procédures consultées. »";
    var user = "CONTEXTE :\n" + ctx + "\n\nQUESTION : " + question + "\n\nRéponse (cite [n]) :";
    return { system: system, user: user, single: system + "\n\n" + user };
  }
  // Téléchargement avec progression (pour la barre d'avancement du modèle).
  function fetchBytes(url, onProgress) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('téléchargement modèle: HTTP ' + res.status);
      var total = parseInt(res.headers.get('content-length') || '0', 10);
      if (!res.body || !total) return res.arrayBuffer().then(function (b) { return new Uint8Array(b); });
      var reader = res.body.getReader(), chunks = [], loaded = 0;
      return (function pump() {
        return reader.read().then(function (r) {
          if (r.done) {
            var out = new Uint8Array(loaded), pos = 0;
            chunks.forEach(function (c) { out.set(c, pos); pos += c.length; });
            return out;
          }
          chunks.push(r.value); loaded += r.value.length;
          if (onProgress) onProgress({ progress: loaded / total, text: 'Téléchargement du modèle… ' + Math.round(loaded / total * 100) + ' %' });
          return pump();
        });
      })();
    });
  }

  /* ---------------- Provider 1 : WebLLM / MLC (WebGPU) ---------------- */
  var WebLLMProvider = (function () {
    var CDN = 'https://esm.run/@mlc-ai/web-llm';
    // Niveaux sélectionnables : on choisit dans la liste pré-bâtie de WebLLM.
    var TIERS = {
      light:    [/qwen3.*0\.6b.*q4/i, /qwen2\.5-0\.5b.*instruct.*q4/i, /smollm2-360m.*q4/i, /-0\.5b-.*q4/i],
      balanced: [/qwen3.*1\.7b.*q4/i, /qwen2\.5-1\.5b.*instruct.*q4/i, /llama-3\.2-1b.*instruct.*q4/i, /smollm2-1\.7b.*q4/i],
      quality:  [/qwen3.*4b.*q4/i, /qwen2\.5-3b.*instruct.*q4/i, /phi-3\.5-mini.*instruct.*q4/i, /llama-3\.2-3b.*instruct.*q4/i]
    };
    var FALLBACK = [/qwen3.*1\.7b.*q4/i, /qwen2\.5-1\.5b.*instruct.*q4/i, /llama-3\.2-1b.*instruct.*q4/i, /q4f16_1-MLC$/i];
    var tier = 'balanced', engine = null, ready = false, MODEL = null;
    function pick(list) {
      var prefs = (TIERS[tier] || []).concat(FALLBACK);
      for (var i = 0; i < prefs.length; i++) for (var j = 0; j < list.length; j++)
        if (prefs[i].test(list[j].model_id)) return list[j].model_id;
      return list.length ? list[0].model_id : null;
    }
    return {
      id: 'webllm', label: 'WebLLM (Qwen3)',
      setTier: function (t) { if (TIERS[t] && !ready) tier = t; return tier; },
      tier: function () { return tier; },
      available: function () { return hasGPU(); },
      isReady: function () { return ready; },
      model: function () { return MODEL; },
      init: function (onProgress) {
        if (ready) return Promise.resolve(MODEL);
        if (!hasGPU()) return Promise.reject(new Error('WebGPU non disponible'));
        return import(/* @vite-ignore */ CDN).then(function (webllm) {
          MODEL = pick((webllm.prebuiltAppConfig && webllm.prebuiltAppConfig.model_list) || []);
          if (!MODEL) throw new Error('aucun modèle WebLLM compatible');
          return webllm.CreateMLCEngine(MODEL, { initProgressCallback: function (r) { try { onProgress && onProgress(r); } catch (e) {} } });
        }).then(function (e) { engine = e; ready = true; return MODEL; });
      },
      answer: function (question, passages, onToken) {
        if (!ready) return Promise.reject(new Error('moteur non prêt'));
        var pr = buildPrompt(question, passages);
        return engine.chat.completions.create({
          messages: [{ role: 'system', content: pr.system }, { role: 'user', content: pr.user }],
          temperature: 0.2, max_tokens: 380, stream: true
        }).then(function (stream) {
          var raw = '', it = stream[Symbol.asyncIterator]();
          return (function pump() {
            return it.next().then(function (s) {
              if (s.done) return stripThink(raw);
              var d = s.value && s.value.choices && s.value.choices[0] && s.value.choices[0].delta && s.value.choices[0].delta.content;
              if (d) { raw += d; try { onToken && onToken(stripThink(raw)); } catch (e) {} }
              return pump();
            });
          })();
        });
      }
    };
  })();

  /* ---------- Provider 2 : MediaPipe LLM Inference Web — Gemma 4 E2B ----------
     Voie officielle Google pour exécuter Gemma on-device (web + Android/iOS).
     Nécessite un bundle modèle LiteRT (.task/.litertlm) accessible par URL —
     à fournir via window.MRI_LLM_GEMMA_URL ou MRI_LLM.configureGemma(url).
     NB : Gemma 4 étant récent, valider l'URL du bundle MediaPipe et l'API. */
  var GemmaProvider = (function () {
    var TASKS_CDN = 'https://esm.run/@mediapipe/tasks-genai';
    var WASM_CDN = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai/wasm';
    var llm = null, ready = false;
    var MODEL_URL = (typeof window !== 'undefined' && window.MRI_LLM_GEMMA_URL) || null;
    function setUrl(u) { MODEL_URL = u || MODEL_URL; }
    return {
      id: 'gemma', label: 'Gemma 4 E2B (MediaPipe)',
      setUrl: setUrl,
      available: function () { return hasGPU() && !!MODEL_URL; },
      isReady: function () { return ready; },
      model: function () { return MODEL_URL ? ('Gemma 4 E2B · ' + MODEL_URL.split('/').pop()) : 'Gemma (non configuré)'; },
      init: function (onProgress) {
        if (ready) return Promise.resolve('gemma');
        if (!hasGPU()) return Promise.reject(new Error('WebGPU non disponible'));
        if (!MODEL_URL) return Promise.reject(new Error('URL du modèle Gemma non configurée (MRI_LLM.configureGemma)'));
        var genai;
        return import(/* @vite-ignore */ TASKS_CDN).then(function (mod) {
          genai = mod;
          return mod.FilesetResolver.forGenAiTasks(WASM_CDN);
        }).then(function (fileset) {
          return fetchBytes(MODEL_URL, onProgress).then(function (bytes) {
            if (onProgress) onProgress({ progress: 1, text: 'Chargement du modèle…' });
            return genai.LlmInference.createFromOptions(fileset, {
              baseOptions: { modelAssetBuffer: bytes },
              maxTokens: 512, topK: 40, temperature: 0.2, randomSeed: 1
            });
          });
        }).then(function (inst) { llm = inst; ready = true; return 'gemma'; });
      },
      answer: function (question, passages, onToken) {
        if (!ready) return Promise.reject(new Error('moteur non prêt'));
        var prompt = buildPrompt(question, passages).single;
        return new Promise(function (resolve, reject) {
          try {
            var acc = '';
            // generateResponse(text, (partial, done) => …) : streaming progressif.
            llm.generateResponse(prompt, function (partial, done) {
              if (partial) { acc += partial; try { onToken && onToken(stripThink(acc)); } catch (e) {} }
              if (done) resolve(stripThink(acc));
            });
          } catch (e) { reject(e); }
        });
      }
    };
  })();

  /* ---------------- Dispatcher (API publique) ---------------- */
  var PROVIDERS = { webllm: WebLLMProvider, gemma: GemmaProvider };
  // Défaut = WebLLM. Si une URL de modèle Gemma est fournie (ex. dans config.js
  // via window.MRI_LLM_GEMMA_URL), on bascule automatiquement sur Gemma.
  var activeId = (typeof window !== 'undefined' && window.MRI_LLM_GEMMA_URL && GemmaProvider.available()) ? 'gemma' : 'webllm';
  function P() { return PROVIDERS[activeId]; }

  // Choix de modèle proposés à l'utilisateur (selon disponibilité réelle).
  function options() {
    var o = [];
    if (WebLLMProvider.available()) {
      o.push({ key: 'light', label: 'Léger', note: '≈ 0,6 Go · appareils modestes', provider: 'webllm', tier: 'light' });
      o.push({ key: 'balanced', label: 'Équilibré (recommandé)', note: '≈ 1 Go', provider: 'webllm', tier: 'balanced' });
      o.push({ key: 'quality', label: 'Qualité', note: '≈ 2,5 Go · appareils puissants', provider: 'webllm', tier: 'quality' });
    }
    if (GemmaProvider.available()) {
      o.push({ key: 'gemma', label: 'Gemma 4 E2B', note: '≈ 2 Go · MediaPipe', provider: 'gemma', tier: null });
    }
    return o;
  }

  window.MRI_LLM = {
    providers: function () {
      return Object.keys(PROVIDERS).map(function (id) {
        return { id: id, label: PROVIDERS[id].label, available: PROVIDERS[id].available() };
      });
    },
    options: options,
    choose: function (provider, tier) {
      if (PROVIDERS[provider]) activeId = provider;
      if (provider === 'webllm' && tier && WebLLMProvider.setTier) WebLLMProvider.setTier(tier);
      return activeId;
    },
    active: function () { return activeId; },
    setProvider: function (id) { if (PROVIDERS[id]) activeId = id; return activeId; },
    configureGemma: function (url) { GemmaProvider.setUrl(url); return GemmaProvider.available(); },
    available: function () { return P().available(); },
    isReady: function () { return P().isReady(); },
    model: function () { return P().model(); },
    init: function (onProgress) { return P().init(onProgress); },
    answer: function (q, passages, onToken) { return P().answer(q, passages, onToken); }
  };
})();
