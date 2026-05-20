# Product Requirements Document

## English

### Product Goal

Ship a first public USV foundation that lets developers validate semantic video sidecar files and inspect a small, realistic example.

### User Stories

- As a developer, I can validate a `.usv.json` file from the command line.
- As an implementer, I can read the schema and understand required top-level fields.
- As a contributor, I can run tests locally with one command.
- As a standards reader, I can see what the first release does not attempt.

### Requirements

- The sidecar schema uses BCP 47-style language tags for language-bearing fields.
- The sidecar can describe semantic objects, semantic events, relations, localization intents, rendering plans, rights, and provenance references.
- Examples include WebVTT fallback tracks for browser-oriented workflows.
- CLI validation returns distinct outcomes for success, validation failure, and system failure.

### Non-Goals

The first release does not implement OCR, ASR, diarization, video editing, AI translation, TTS, lip sync, spatial audio rendering, native MP4/MKV/WebM embedding, hosted APIs, or graphical authoring.

## Deutsch

### Produktziel

Ein erstes oeffentliches USV-Fundament liefern, mit dem Entwickler semantische Video-Sidecars validieren und ein kleines realistisches Beispiel pruefen koennen.

### User Stories

- Als Entwicklerin kann ich eine `.usv.json`-Datei per Kommandozeile validieren.
- Als Implementierer kann ich das Schema lesen und die noetigen Top-Level-Felder verstehen.
- Als Beitragender kann ich Tests lokal mit einem Befehl ausfuehren.
- Als Standardleserin sehe ich klar, was der erste Release nicht versucht.

### Anforderungen

- Das Sidecar-Schema nutzt BCP-47-aehnliche Sprach-Tags fuer Sprachfelder.
- Das Sidecar beschreibt semantische Objekte, Ereignisse, Beziehungen, Lokalisierungsabsichten, Rendering-Plaene, Rechte und Herkunftsverweise.
- Beispiele enthalten WebVTT-Fallback-Tracks fuer Browser-Workflows.
- Die CLI unterscheidet Erfolg, Validierungsfehler und Systemfehler.

### Nicht-Ziele

Der erste Release implementiert keine OCR, ASR, Sprechertrennung, Videobearbeitung, KI-Uebersetzung, TTS, Lip-Sync, Raumklang, native Container-Einbettung, gehostete APIs oder grafische Authoring-Werkzeuge.
