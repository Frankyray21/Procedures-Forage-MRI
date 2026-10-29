/* Vidéos et audios de formation, par fiche (id de procédure).
   Tenu à jour par le workflow « Médias » (.github/workflows/media-ingest.yml,
   script media-ingest.js) à partir des envois faits dans l'app (#/medias).
   Format : { "<id fiche>": { "videos": [{id, src, poster, titre, duree}],
                               "audios": [{id, src, titre, duree, genre?, desc?}] } }
   genre "podcast" → pastille « Podcast » ; desc → phrase sous le titre. */
window.MEDIAS = {
 "pro-op-dd-005": {
  "videos": [
   {
    "id": "dd005v1",
    "src": "videos/pro-op-dd-005.mp4",
    "poster": "images/videos/pro-op-dd-005.jpg",
    "titre": "Démonter le cône d'un mandrin (chuck) — étape par étape",
    "duree": "6 min 34 s"
   }
  ],
  "audios": [
   {
    "id": "dd005a1",
    "src": "audio/pro-op-dd-005.m4a",
    "titre": "Démontage sécuritaire d'un chuck de foreuse",
    "duree": "13 min 20 s"
   }
  ]
 },
 "pro-dd-st-002": {
  "audios": [
   {
    "id": "ddst002a1",
    "src": "audio/pro-dd-st-002.mp3",
    "titre": "Tube carottier : les pièges qui ne pardonnent pas",
    "duree": "25 min 18 s",
    "genre": "podcast",
    "desc": "Podcast : une discussion qui parle de la procédure PRO-DD-ST-002 (vider le tube carottier) et des pièges à éviter — à écouter en complément du document officiel."
   }
  ]
 }
};
