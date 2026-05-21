# USV Profile Levels

## English

USV should grow by profile levels, not by pretending every future capability is implemented in the first release.

### USV-Lite

Status: active foundation.

Purpose:

- sidecar-first adoption;
- WebVTT fallback;
- local validation;
- core conformance;
- public examples for visual and audio-visual semantics.

Current artifacts:

- `.usv.json` schema;
- `usv init`;
- `usv validate`;
- `usv inspect`;
- `usv conformance`;
- WebVTT fallback examples.

### USV-Core

Status: planned profile.

Purpose:

- carry USV data with existing media containers;
- define MP4, Matroska/WebM, and streaming mappings;
- preserve old-player playback;
- provide conformance fixtures before recommending embedding.

Not implemented yet:

- native MP4 metadata track writing;
- Matroska/WebM embedding;
- HLS/DASH timed metadata delivery;
- asset tracks for masks, fonts, or clean plates.

### USV-Pro

Status: future professional profile.

Purpose:

- high-trust review chains;
- voice authorization records;
- stronger provenance and signature workflows;
- professional localization QA;
- platform delivery configuration;
- certification and conformance claims.

Not implemented yet:

- legal workflow enforcement;
- C2PA manifest verification;
- professional package signing;
- certified player levels.

### Audio Semantic Direction

The current schema can represent speech, speakers, music, sound effects, narration, broadcast, relations, and subtitle fallbacks. Future profiles should map semantic audio intent above existing audio standards instead of replacing them.

## Deutsch

USV soll ueber Profile wachsen, nicht durch die Behauptung, dass alle kuenftigen Faehigkeiten im ersten Release implementiert sind.

### USV-Lite

Status: aktives Fundament.

Zweck:

- Sidecar-first-Adoption;
- WebVTT-Fallback;
- lokale Validierung;
- Core-Conformance;
- oeffentliche Beispiele fuer visuelle und audio-visuelle Semantik.

Aktuelle Artefakte:

- `.usv.json`-Schema;
- `usv init`;
- `usv validate`;
- `usv inspect`;
- `usv conformance`;
- WebVTT-Fallback-Beispiele.

### USV-Core

Status: geplantes Profil.

Zweck:

- USV-Daten mit bestehenden Mediencontainern transportieren;
- MP4-, Matroska/WebM- und Streaming-Mappings definieren;
- Wiedergabe in alten Playern erhalten;
- Conformance-Fixtures bereitstellen, bevor Einbettung empfohlen wird.

Noch nicht implementiert:

- natives Schreiben von MP4-Metadatenspuren;
- Matroska/WebM-Einbettung;
- HLS/DASH Timed-Metadata-Auslieferung;
- Asset-Spuren fuer Masken, Schriften oder Clean Plates.

### USV-Pro

Status: kuenftiges professionelles Profil.

Zweck:

- Review-Ketten fuer hohe Vertrauensanforderungen;
- Stimm-Autorisierungsdatensaetze;
- staerkere Provenance- und Signatur-Workflows;
- professionelle Lokalisierungs-QA;
- Plattform-Auslieferungskonfiguration;
- Zertifizierungs- und Conformance-Aussagen.

Noch nicht implementiert:

- rechtliche Workflow-Durchsetzung;
- C2PA-Manifestverifikation;
- professionelle Paketsignierung;
- zertifizierte Player-Level.

### Audio-Semantik-Richtung

Das aktuelle Schema kann Sprache, Sprecher, Musik, Sound Effects, Narration, Broadcast, Relationen und Untertitel-Fallbacks darstellen. Kuenftige Profile sollen semantische Audio-Absicht oberhalb bestehender Audiostandards abbilden, statt diese zu ersetzen.
