# USV Core Conformance

## English

This document defines the current executable core conformance layer. It is stricter than JSON Schema and narrower than future renderer or container conformance.

### Current Checks

`usv conformance <file>` currently checks:

- the sidecar passes JSON Schema validation;
- semantic object, event, and relation IDs are unique within their groups;
- semantic object, event, and relation IDs do not collide with each other;
- event `object_refs` point to existing semantic objects;
- relation `from` and `to` references point to existing semantic entities;
- localization scopes point to existing objects or events;
- translation `source_ref` points to an existing semantic entity;
- rendering plan scopes point to existing objects or events;
- object `rights_policy_ref` points to an existing rights policy;
- event start time is less than end time;
- event end time does not exceed media duration;
- localization, rendering, translation, and fallback languages are declared by the media primary language or default target languages.

### Non-Goals

The current conformance layer does not validate OCR quality, ASR quality, translation correctness, speaker identity, waveform data, native container embedding, C2PA verification, renderer layout, or legal compliance.

### Exit Behavior

- Exit `0`: schema and core conformance pass.
- Exit `1`: schema or core conformance fails.
- Exit `2`: system failure such as unreadable file or invalid JSON.

## Deutsch

Dieses Dokument definiert die aktuelle ausfuehrbare Core-Conformance-Schicht. Sie ist strenger als JSON Schema und enger als spaetere Renderer- oder Container-Conformance.

### Aktuelle Checks

`usv conformance <file>` prueft aktuell:

- das Sidecar besteht JSON-Schema-Validierung;
- semantische Objekt-, Ereignis- und Relations-IDs sind innerhalb ihrer Gruppen eindeutig;
- semantische Objekt-, Ereignis- und Relations-IDs kollidieren nicht miteinander;
- Ereignis-`object_refs` zeigen auf bestehende semantische Objekte;
- Relations-`from`- und `to`-Referenzen zeigen auf bestehende semantische Entitaeten;
- Lokalisierungs-Scopes zeigen auf bestehende Objekte oder Ereignisse;
- Uebersetzungs-`source_ref` zeigt auf eine bestehende semantische Entitaet;
- Rendering-Plan-Scopes zeigen auf bestehende Objekte oder Ereignisse;
- Objekt-`rights_policy_ref` zeigt auf eine bestehende Rights Policy;
- Ereignisstart liegt vor Ereignisende;
- Ereignisende ueberschreitet die Mediendauer nicht;
- Lokalisierungs-, Rendering-, Uebersetzungs- und Fallback-Sprachen sind durch Primaersprache oder Default-Zielsprachen deklariert.

### Nicht-Ziele

Die aktuelle Conformance-Schicht validiert keine OCR-Qualitaet, ASR-Qualitaet, Uebersetzungsrichtigkeit, Sprecheridentitaet, Waveform-Daten, native Container-Einbettung, C2PA-Verifikation, Renderer-Layout oder rechtliche Compliance.

### Exit-Verhalten

- Exit `0`: Schema und Core-Conformance bestehen.
- Exit `1`: Schema oder Core-Conformance scheitert.
- Exit `2`: Systemfehler wie unlesbare Datei oder ungueltiges JSON.
