# Product Requirements Document

## English

### Product Goal

Ship a first public USV foundation that lets developers create, validate, inspect, and discuss semantic video sidecar files.

### User Stories

- As a developer, I can validate a `.usv.json` file from the command line.
- As a developer, I can create a valid starter `.usv.json` file from the command line.
- As a developer, I can inspect a valid sidecar and see its main counts and metadata.
- As a developer, I can distinguish schema validity from core interoperability conformance.
- As an implementer, I can read the schema and understand required top-level fields.
- As a contributor, I can run tests locally with one command.
- As a contributor, I can run a public-safety scan before pushing to the public repository.
- As a standards reader, I can see what the first release does not attempt.

### Requirements

- The sidecar schema uses BCP 47-style language tags for language-bearing fields.
- The sidecar can describe semantic objects, semantic events, relations, localization intents, rendering plans, rights, and provenance references.
- Examples include WebVTT fallback tracks for browser-oriented workflows.
- CLI validation returns distinct outcomes for success, validation failure, and system failure.
- CLI starter creation must not overwrite an existing file.
- CLI inspection must validate the sidecar before printing a summary.
- CLI conformance must reject schema-valid sidecars with broken semantic references.
- Examples include visual and audio-visual semantic sidecars.
- Public repository checks must block current repository files and pushed commit snapshots with private workspace paths, credential-like files, raw media, private documents, generated archives, proprietary fonts, binary/oversized files, common secret tokens, or local user paths.

### Non-Goals

The first release does not implement OCR, ASR, diarization, video editing, AI translation, TTS, lip sync, spatial audio rendering, native MP4/MKV/WebM embedding, hosted APIs, or graphical authoring.

## Deutsch

### Produktziel

Ein erstes oeffentliches USV-Fundament liefern, mit dem Entwickler semantische Video-Sidecars erzeugen, validieren, inspizieren und diskutieren koennen.

### User Stories

- Als Entwicklerin kann ich eine `.usv.json`-Datei per Kommandozeile validieren.
- Als Entwickler kann ich eine gueltige Starter-`.usv.json`-Datei per Kommandozeile erzeugen.
- Als Entwicklerin kann ich ein gueltiges Sidecar inspizieren und die wichtigsten Zaehler und Metadaten sehen.
- Als Entwickler kann ich Schema-Gueltigkeit von Core-Interoperabilitaets-Conformance unterscheiden.
- Als Implementierer kann ich das Schema lesen und die noetigen Top-Level-Felder verstehen.
- Als Beitragender kann ich Tests lokal mit einem Befehl ausfuehren.
- Als Beitragende kann ich vor dem Push in das oeffentliche Repository einen Public-Safety-Scan ausfuehren.
- Als Standardleserin sehe ich klar, was der erste Release nicht versucht.

### Anforderungen

- Das Sidecar-Schema nutzt BCP-47-aehnliche Sprach-Tags fuer Sprachfelder.
- Das Sidecar beschreibt semantische Objekte, Ereignisse, Beziehungen, Lokalisierungsabsichten, Rendering-Plaene, Rechte und Herkunftsverweise.
- Beispiele enthalten WebVTT-Fallback-Tracks fuer Browser-Workflows.
- Die CLI unterscheidet Erfolg, Validierungsfehler und Systemfehler.
- CLI-Starter-Erzeugung darf keine bestehende Datei ueberschreiben.
- CLI-Inspektion muss das Sidecar validieren, bevor sie eine Zusammenfassung ausgibt.
- CLI-Conformance muss schema-gueltige Sidecars mit gebrochenen semantischen Referenzen ablehnen.
- Beispiele enthalten visuelle und audio-visuelle semantische Sidecars.
- Oeffentliche Repository-Checks muessen aktuelle Repository-Dateien und gepushte Commit-Snapshots mit privaten Workspace-Pfaden, credential-aehnlichen Dateien, Rohmedien, privaten Dokumenten, erzeugten Archiven, proprietaeren Schriften, binaeren/uebergrossen Dateien, gaengigen Secret-Tokens oder lokalen Nutzerpfaden blockieren.

### Nicht-Ziele

Der erste Release implementiert keine OCR, ASR, Sprechertrennung, Videobearbeitung, KI-Uebersetzung, TTS, Lip-Sync, Raumklang, native Container-Einbettung, gehostete APIs oder grafische Authoring-Werkzeuge.
