# Technical Requirements Document

## English

### Architecture

The first release has six runtime modules:

- `schema/usv.schema.json`: declarative validation contract.
- `src/validation.ts`: validation behavior with no filesystem side effects.
- `src/conformance.ts`: core interoperability checks over schema-valid sidecars.
- `src/template.ts`: starter sidecar generation with no filesystem side effects.
- `src/summary.ts`: human-readable summary generation with no filesystem side effects.
- `src/cli.ts`: command-line boundary for file reading, JSON parsing, output, and exit codes.

Repository release safety is outside the USV runtime:

- `scripts/check-public-safety.mjs`: Git-aware public-safety scanner with no external dependencies.
- `.githooks/pre-push`: Git boundary hook that runs the scanner before objects are pushed.

### External Dependencies

- `ajv` validates JSON Schema.
- `commander` provides CLI command parsing.
- `vitest` provides automated tests.

The public-safety scanner uses only Node.js and Git.

### State Ownership

Validation, conformance, template generation, and summary generation receive in-memory data and return values. Filesystem and process exit side effects stay in the CLI boundary.

### Failure Modes

- Exit `0`: the sidecar is valid.
- Exit `1`: the sidecar is readable JSON but fails schema validation.
- Exit `2`: the CLI cannot read, write, parse JSON, or load the schema.
- Conformance exit `0`: schema and core conformance pass.
- Conformance exit `1`: schema or core conformance fails.
- Public-safety scanner exit `0`: current repository files and pushed commit snapshots are public-safe.
- Public-safety scanner exit `1`: a private path, risky file type, binary/oversized file, local user path, or common secret token was found.

## Deutsch

### Architektur

Der erste Release hat sechs Runtime-Module:

- `schema/usv.schema.json`: deklarativer Validierungsvertrag.
- `src/validation.ts`: Validierungsverhalten ohne Dateisystem-Side-Effects.
- `src/conformance.ts`: Core-Interoperabilitaetschecks ueber schema-gueltigen Sidecars.
- `src/template.ts`: Starter-Sidecar-Erzeugung ohne Dateisystem-Side-Effects.
- `src/summary.ts`: menschenlesbare Zusammenfassung ohne Dateisystem-Side-Effects.
- `src/cli.ts`: Kommandozeilengrenze fuer Lesen, JSON-Parsing, Ausgabe und Exit-Codes.

Repository-Release-Sicherheit liegt ausserhalb der USV-Runtime:

- `scripts/check-public-safety.mjs`: Git-bewusster Public-Safety-Scanner ohne externe Abhaengigkeiten.
- `.githooks/pre-push`: Git-Grenz-Hook, der den Scanner vor dem Pushen von Objekten ausfuehrt.

### Externe Abhaengigkeiten

- `ajv` validiert JSON Schema.
- `commander` parst CLI-Befehle.
- `vitest` stellt automatisierte Tests bereit.

Der Public-Safety-Scanner nutzt nur Node.js und Git.

### Zustand

Validierung, Conformance, Template-Erzeugung und Zusammenfassung arbeiten mit In-Memory-Daten und geben Werte zurueck. Dateisystem- und Prozess-Side-Effects bleiben in der CLI-Grenze.

### Fehlerfaelle

- Exit `0`: das Sidecar ist gueltig.
- Exit `1`: das Sidecar ist lesbares JSON, aber nicht schema-konform.
- Exit `2`: die CLI kann Datei, JSON oder Schema nicht lesen oder schreiben.
- Conformance Exit `0`: Schema und Core-Conformance bestehen.
- Conformance Exit `1`: Schema oder Core-Conformance scheitert.
- Public-Safety-Scanner Exit `0`: aktuelle Repository-Dateien und gepushte Commit-Snapshots sind oeffentlich sicher.
- Public-Safety-Scanner Exit `1`: ein privater Pfad, riskanter Dateityp, binaere/uebergrosse Datei, lokaler Nutzerpfad oder gaengiges Secret-Token wurde gefunden.
