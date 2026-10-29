/* ===========================================================================
   Médias (vidéo / audio) envoyés depuis l'app — traitement côté GitHub.

   L'app (#/medias) dépose chaque envoi sur la branche « media-incoming » :
     incoming/<job>/meta.json   { id, action:'add'|'delete', proc, kind, titre, name, parts, src }
     incoming/<job>/part-000…   le fichier d'origine découpé en morceaux
   Le workflow .github/workflows/media-ingest.yml lance ce script sur main
   avec INCOMING=<dossier incoming/ de la branche>. Pour chaque envoi :
     • add    → morceaux recollés, réencodés pour le web (vidéo : H.264 720p
                max + AAC, image d'aperçu ; audio : AAC mono 64 kb/s), toujours
                « faststart » (lecture en continu), sous 95 Mo (limite GitHub
                100 Mo) ; ajouté à medias.js ;
     • delete → fichier(s) retirés du site et de medias.js.
   Le résultat de chaque envoi est noté dans .github/media/log.json (lu par
   l'app pour afficher « ajouté » / l'erreur). Un envoi déjà noté n'est jamais
   retraité. Le commit, le bump de version et le redéploiement sont faits par
   le workflow.
   =========================================================================== */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const INCOMING = process.env.INCOMING || '';
const LOG = path.join(ROOT, '.github', 'media', 'log.json');
const MEDIAS = path.join(ROOT, 'medias.js');
const MAX_OUT = 95 * 1024 * 1024;

function readMedias() {
  const s = fs.readFileSync(MEDIAS, 'utf8');
  const i = s.indexOf('window.MEDIAS =');
  const head = s.slice(0, i);
  const json = s.slice(i + 'window.MEDIAS ='.length).trim().replace(/;\s*$/, '');
  return { head, data: JSON.parse(json) };
}
function writeMedias(m) {
  fs.writeFileSync(MEDIAS, m.head + 'window.MEDIAS = ' + JSON.stringify(m.data, null, 1) + ';\n');
}
function readLog() {
  try { return JSON.parse(fs.readFileSync(LOG, 'utf8')); } catch (e) { return { jobs: {} }; }
}
function procExists(id) {
  const re = new RegExp('"id":\\s*"' + id.replace(/[-]/g, '\\-') + '"');
  return fs.readdirSync(ROOT).filter((f) => /^data.*\.js$/.test(f))
    .some((f) => re.test(fs.readFileSync(path.join(ROOT, f), 'utf8')));
}
function run(cmd, args) { return execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 }).toString(); }
function probe(file) {
  const j = JSON.parse(run('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_format', '-show_streams', file]));
  const v = (j.streams || []).find((s) => s.codec_type === 'video' && !(s.disposition && s.disposition.attached_pic));
  const a = (j.streams || []).find((s) => s.codec_type === 'audio');
  return { dur: parseFloat((j.format && j.format.duration) || '0') || 0, video: !!v, audio: !!a };
}
function fmtDur(sec) {
  const s = Math.round(sec), m = Math.floor(s / 60), r = s % 60;
  if (m < 60) return m ? m + ' min' + (r ? ' ' + r + ' s' : '') : r + ' s';
  const h = Math.floor(m / 60);
  return h + ' h ' + String(m % 60).padStart(2, '0') + ' min';
}
function clean(s, n) { return String(s == null ? '' : s).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n); }

function encodeVideo(src, out, dur, hasAudio) {
  const base = ['-y', '-v', 'error', '-i', src, '-map', '0:v:0'];
  if (hasAudio) base.push('-map', '0:a:0');
  const vf = ['-vf', "scale='min(1280,iw)':-2:flags=lanczos,format=yuv420p", '-c:v', 'libx264', '-profile:v', 'main', '-preset', 'medium'];
  const af = hasAudio ? ['-c:a', 'aac', '-b:a', '96k', '-ac', '2'] : ['-an'];
  const tail = ['-movflags', '+faststart', out];
  run('ffmpeg', base.concat(vf, ['-crf', '28'], af, tail));
  if (fs.statSync(out).size <= MAX_OUT || !dur) return;
  // Trop lourd pour GitHub : débit visé pour ~90 Mo au total.
  const kbps = Math.max(150, Math.floor((90 * 8 * 1024) / dur) - (hasAudio ? 96 : 0));
  run('ffmpeg', base.concat(vf, ['-b:v', kbps + 'k', '-maxrate', Math.round(kbps * 1.5) + 'k', '-bufsize', kbps * 2 + 'k'], af, tail));
}
function encodeAudio(src, out, dur) {
  run('ffmpeg', ['-y', '-v', 'error', '-i', src, '-vn', '-map_metadata', '-1', '-ac', '1', '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', out]);
  if (fs.statSync(out).size <= MAX_OUT || !dur) return;
  const kbps = Math.max(24, Math.floor((90 * 8 * 1024) / dur));
  run('ffmpeg', ['-y', '-v', 'error', '-i', src, '-vn', '-map_metadata', '-1', '-ac', '1', '-c:a', 'aac', '-b:a', kbps + 'k', '-movflags', '+faststart', out]);
}

function addJob(meta, dir, M) {
  const proc = clean(meta.proc, 80);
  if (!/^[a-z0-9-]+$/.test(proc) || !procExists(proc)) throw new Error('Procédure inconnue : ' + proc);
  const n = parseInt(meta.parts, 10);
  if (!(n > 0)) throw new Error('Envoi incomplet (aucun morceau).');
  const tmp = path.join(require('os').tmpdir(), 'media-' + meta.id);
  const fd = fs.openSync(tmp, 'w');
  for (let i = 0; i < n; i++) {
    const part = path.join(dir, 'part-' + String(i).padStart(3, '0'));
    if (!fs.existsSync(part)) { fs.closeSync(fd); throw new Error('Morceau manquant : ' + (i + 1) + '/' + n); }
    fs.writeSync(fd, fs.readFileSync(part));
  }
  fs.closeSync(fd);
  let info;
  try { info = probe(tmp); } catch (e) { throw new Error('Fichier illisible (ni vidéo ni audio reconnu).'); }
  const kind = info.video ? (meta.kind === 'audio' ? 'audio' : 'video') : 'audio';
  if (kind === 'audio' && !info.audio) throw new Error('Aucune piste audio dans le fichier.');
  const base = proc + '-' + meta.id;
  const titre = clean(meta.titre, 160) || clean(meta.name, 160).replace(/\.[^.]+$/, '').replace(/_+/g, ' ').trim() || 'Média de formation';
  const entry = { id: meta.id, titre: titre, duree: info.dur ? fmtDur(info.dur) : '' };
  if (kind === 'video') {
    fs.mkdirSync(path.join(ROOT, 'videos'), { recursive: true });
    fs.mkdirSync(path.join(ROOT, 'images', 'videos'), { recursive: true });
    entry.src = 'videos/' + base + '.mp4';
    entry.poster = 'images/videos/' + base + '.jpg';
    encodeVideo(tmp, path.join(ROOT, entry.src), info.dur, info.audio);
    const at = String(Math.min(1, info.dur / 2 || 0));
    run('ffmpeg', ['-y', '-v', 'error', '-ss', at, '-i', path.join(ROOT, entry.src), '-frames:v', '1', '-vf', 'scale=960:-2', '-q:v', '4', path.join(ROOT, entry.poster)]);
  } else {
    fs.mkdirSync(path.join(ROOT, 'audio'), { recursive: true });
    entry.src = 'audio/' + base + '.m4a';
    encodeAudio(tmp, path.join(ROOT, entry.src), info.dur);
  }
  fs.unlinkSync(tmp);
  const size = fs.statSync(path.join(ROOT, entry.src)).size;
  if (size > 99 * 1024 * 1024) {
    fs.unlinkSync(path.join(ROOT, entry.src));
    if (entry.poster) try { fs.unlinkSync(path.join(ROOT, entry.poster)); } catch (e) {}
    throw new Error('Média trop long : même compressé, il dépasse 100 Mo. Coupe-le en plusieurs parties.');
  }
  const slot = M.data[proc] || (M.data[proc] = {});
  const list = slot[kind === 'video' ? 'videos' : 'audios'] || (slot[kind === 'video' ? 'videos' : 'audios'] = []);
  list.push(entry);
  return { proc, kind, src: entry.src, titre, duree: entry.duree, mo: Math.round(size / 1048576 * 10) / 10 };
}

function deleteJob(meta, M) {
  const proc = clean(meta.proc, 80), src = clean(meta.src, 200);
  const slot = M.data[proc];
  let hit = null;
  ['videos', 'audios'].forEach((k) => {
    if (!slot || !slot[k]) return;
    slot[k] = slot[k].filter((e) => { if (e.src === src) { hit = e; return false; } return true; });
    if (!slot[k].length) delete slot[k];
  });
  if (slot && !Object.keys(slot).length) delete M.data[proc];
  if (!hit) throw new Error('Média introuvable (déjà retiré ?).');
  [hit.src, hit.poster].forEach((f) => {
    if (f && /^(videos|audio|images\/videos)\/[\w.-]+$/.test(f)) try { fs.unlinkSync(path.join(ROOT, f)); } catch (e) {}
  });
  return { proc, src, titre: hit.titre };
}

function main() {
  if (!INCOMING || !fs.existsSync(INCOMING)) { console.log('Aucun envoi à traiter.'); return; }
  const log = readLog();
  const M = readMedias();
  const jobs = fs.readdirSync(INCOMING).filter((d) => fs.existsSync(path.join(INCOMING, d, 'meta.json')));
  let changed = false;
  jobs.sort().forEach((d) => {
    let meta;
    try { meta = JSON.parse(fs.readFileSync(path.join(INCOMING, d, 'meta.json'), 'utf8')); } catch (e) { return; }
    const id = clean(meta.id, 40);
    if (!/^[a-z0-9]+$/.test(id) || id !== d || log.jobs[id]) return;   // déjà traité
    const at = new Date().toISOString();
    try {
      const r = meta.action === 'delete' ? deleteJob(meta, M) : addJob(Object.assign({}, meta, { id }), path.join(INCOMING, d), M);
      log.jobs[id] = Object.assign({ ok: true, action: meta.action === 'delete' ? 'delete' : 'add', at }, r);
      changed = true;
      console.log('OK  ' + id + ' ' + JSON.stringify(r));
    } catch (e) {
      log.jobs[id] = { ok: false, action: meta.action === 'delete' ? 'delete' : 'add', proc: clean(meta.proc, 80), titre: clean(meta.titre, 160), error: String(e.message || e).slice(0, 300), at };
      console.log('ERR ' + id + ' ' + log.jobs[id].error);
    }
  });
  if (changed) writeMedias(M);
  // Journal borné aux 200 derniers envois.
  const keys = Object.keys(log.jobs).sort((a, b) => String(log.jobs[a].at).localeCompare(String(log.jobs[b].at)));
  keys.slice(0, Math.max(0, keys.length - 200)).forEach((k) => delete log.jobs[k]);
  fs.mkdirSync(path.dirname(LOG), { recursive: true });
  fs.writeFileSync(LOG, JSON.stringify(log, null, 1) + '\n');
}
main();
