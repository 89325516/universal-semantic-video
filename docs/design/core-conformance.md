# Core Conformance Design

## English

### Problem

JSON Schema proves document shape, but it does not prove that semantic references, time ranges, language use, and rights policy links are internally coherent.

### Options

| Option | Benefit | Cost | Decision |
| --- | --- | --- | --- |
| Keep schema validation only | Smallest implementation. | Broken references can still look valid. | Rejected |
| Add core conformance checks after schema validation | Catches interoperability failures early. | Adds a second validation stage. | Selected |
| Add full renderer conformance now | Closer to final vision. | Too broad before reference renderer work. | Deferred |

### State Machine

| State | Event | Guard | Next State | Side Effect |
| --- | --- | --- | --- | --- |
| Idle | `usv conformance <file>` | JSON parses and schema passes | SchemaValid | Continue to core checks |
| SchemaValid | core references, time ranges, languages, and rights links pass | Conformant | Print success |
| SchemaValid | any core check fails | ConformanceFailed | Print conformance errors |
| Idle | read or parse fails | SystemFailed | Print operational error |
| Idle | schema fails | ValidationFailed | Print schema errors |

### Impact

Affected files:

- `src/conformance.ts`
- `src/cli.ts`
- `tests/validation.test.ts`
- `examples/lite/audio-visual-announcement.usv.json`
- `examples/invalid/broken-reference.usv.json`
- product, technical, test, traceability, and acceptance documents

The schema contract remains unchanged. OCR, ASR, rendering, embedding, and AI inference are not added.

### Rollback

Remove `src/conformance.ts`, remove the `conformance` CLI command, remove conformance tests and examples, and revert related documentation. Existing `validate`, `init`, and `inspect` behavior remains independent.

### Primitive Acceptance

- A schema-valid example with correct semantic references passes core conformance.
- A schema-valid example with a missing object or event reference fails core conformance.
- Event time ranges must be ordered and stay within media duration.
- Referenced rights policies must exist.
- Localization, rendering, and fallback languages must be declared by media primary language or default target languages.

## Deutsch

### Problem

JSON Schema prueft die Dokumentform, aber nicht, ob semantische Referenzen, Zeitbereiche, Sprachverwendung und Rights-Policy-Links intern stimmig sind.

### Optionen

| Option | Nutzen | Kosten | Entscheidung |
| --- | --- | --- | --- |
| Nur Schema-Validierung behalten | Kleinste Implementierung. | Gebrochene Referenzen koennen gueltig aussehen. | Abgelehnt |
| Core-Conformance nach Schema-Validierung ergaenzen | Erkennt Interoperabilitaetsfehler frueh. | Zweite Validierungsstufe. | Gewaehlt |
| Vollstaendige Renderer-Conformance jetzt ergaenzen | Naeher an der Endvision. | Zu breit vor Referenzrenderer-Arbeit. | Verschoben |

### Zustandsmaschine

| Zustand | Ereignis | Guard | Naechster Zustand | Side Effect |
| --- | --- | --- | --- | --- |
| Idle | `usv conformance <file>` | JSON parsebar und Schema besteht | SchemaValid | Core-Checks fortsetzen |
| SchemaValid | Core-Referenzen, Zeitbereiche, Sprachen und Rights-Links bestehen | Conformant | Erfolg ausgeben |
| SchemaValid | ein Core-Check scheitert | ConformanceFailed | Conformance-Fehler ausgeben |
| Idle | Lesen oder Parsen scheitert | SystemFailed | Operativen Fehler ausgeben |
| Idle | Schema scheitert | ValidationFailed | Schemafehler ausgeben |

### Auswirkung

Betroffene Dateien:

- `src/conformance.ts`
- `src/cli.ts`
- `tests/validation.test.ts`
- `examples/lite/audio-visual-announcement.usv.json`
- `examples/invalid/broken-reference.usv.json`
- Produkt-, Technik-, Test-, Traceability- und Abnahmedokumente

Der Schema-Vertrag bleibt unveraendert. OCR, ASR, Rendering, Einbettung und KI-Inferenz werden nicht ergaenzt.

### Rollback

`src/conformance.ts` entfernen, den CLI-Befehl `conformance` entfernen, Conformance-Tests und Beispiele entfernen und zugehoerige Dokumentation rueckgaengig machen. Bestehendes `validate`-, `init`- und `inspect`-Verhalten bleibt unabhaengig.

### Primitive Abnahme

- Ein schema-gueltiges Beispiel mit korrekten semantischen Referenzen besteht Core-Conformance.
- Ein schema-gueltiges Beispiel mit fehlender Objekt- oder Ereignisreferenz scheitert an Core-Conformance.
- Ereignis-Zeitbereiche muessen geordnet sein und innerhalb der Mediendauer liegen.
- Referenzierte Rights Policies muessen existieren.
- Lokalisierungs-, Rendering- und Fallback-Sprachen muessen durch Primaersprache oder Default-Zielsprachen deklariert sein.
