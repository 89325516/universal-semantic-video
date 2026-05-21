# Roadmap

## English

The roadmap is feedback-driven. Each release should make USV more useful without adding speculative surface area.

### 0.1 Public Foundation

Goal: let developers create, validate, inspect, and discuss a USV sidecar.

Release gate:

- JSON Schema is public and tested.
- CLI supports `init`, `validate`, and `inspect`.
- Examples are public-safe and bilingual where text is visible.
- README explains purpose, scope, standards posture, and contribution path.
- Acceptance criteria and tests pass.

### 0.2 Schema Review

Goal: gather implementer feedback and tighten the core contract.

Candidate work:

- richer examples for captions, visual text, speaker mapping, and rights policies;
- graph consistency checks for object and event references;
- issue templates for schema proposals and conformance reports;
- packaging notes for `.usvpkg` without implementing archive tooling.

### 0.3 Browser Reference

Goal: demonstrate fallback rendering in a browser.

Candidate work:

- WebVTT subtitle fallback loading;
- label overlay rendering from semantic objects;
- provenance and rights indicators;
- no model inference in the reference player.

### 0.4 Embedding Experiments

Goal: test how USV can travel with existing media and streaming systems.

Candidate work:

- MP4 metadata mapping proposal;
- Matroska/WebM attachment or metadata mapping proposal;
- HLS/DASH timed metadata notes;
- conformance cases before any format recommendation.

### 1.0 Core Profile

Goal: freeze a small interoperable profile.

Release gate:

- stable core schema;
- conformance test suite;
- implementation guide;
- governance and versioning policy;
- at least two independent implementation reports.

## Deutsch

Die Roadmap ist feedback-getrieben. Jeder Release soll USV nuetzlicher machen, ohne spekulative Oberflaeche aufzubauen.

### 0.1 Oeffentliches Fundament

Ziel: Entwickler koennen ein USV-Sidecar erzeugen, validieren, inspizieren und diskutieren.

Release Gate:

- JSON Schema ist oeffentlich und getestet.
- CLI unterstuetzt `init`, `validate` und `inspect`.
- Beispiele sind oeffentlich sicher und bei sichtbarem Text zweisprachig.
- README erklaert Zweck, Umfang, Standards und Beitragsweg.
- Abnahmekriterien und Tests bestehen.

### 0.2 Schema Review

Ziel: Implementiererfeedback sammeln und den Kernvertrag schaerfen.

Moegliche Arbeiten:

- reichere Beispiele fuer Captions, sichtbaren Text, Sprecherzuordnung und Rechte;
- Graph-Konsistenzpruefungen fuer Objekt- und Ereignisreferenzen;
- Issue-Templates fuer Schema-Vorschlaege und Conformance-Berichte;
- Packaging-Notizen fuer `.usvpkg` ohne Archivwerkzeug.

### 0.3 Browser-Referenz

Ziel: Fallback-Rendering im Browser demonstrieren.

Moegliche Arbeiten:

- WebVTT-Untertitel laden;
- Label-Overlays aus semantischen Objekten rendern;
- Herkunfts- und Rechtehinweise anzeigen;
- keine Modell-Inferenz im Referenzplayer.

### 0.4 Einbettungsexperimente

Ziel: pruefen, wie USV mit bestehenden Medien- und Streamingsystemen reisen kann.

Moegliche Arbeiten:

- MP4-Metadatenmapping vorschlagen;
- Matroska/WebM Attachment- oder Metadatenmapping vorschlagen;
- HLS/DASH Timed-Metadata-Notizen;
- Conformance-Faelle vor jeder Formatrecommendation.

### 1.0 Kernprofil

Ziel: ein kleines interoperables Profil einfrieren.

Release Gate:

- stabiles Kernschema;
- Conformance-Test-Suite;
- Implementierungsleitfaden;
- Governance- und Versionierungsregeln;
- mindestens zwei unabhaengige Implementierungsberichte.
