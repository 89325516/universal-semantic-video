# Technical Requirements Document

## English

### Architecture

The first release has three modules:

- `schema/usv.schema.json`: declarative validation contract.
- `src/validation.ts`: validation behavior with no filesystem side effects.
- `src/cli.ts`: command-line boundary for file reading, JSON parsing, output, and exit codes.

### External Dependencies

- `ajv` validates JSON Schema.
- `commander` provides CLI command parsing.
- `vitest` provides automated tests.

### State Ownership

Validation receives parsed JSON as input and returns a result. Filesystem and process exit side effects stay in the CLI boundary.

### Failure Modes

- Exit `0`: the sidecar is valid.
- Exit `1`: the sidecar is readable JSON but fails schema validation.
- Exit `2`: the CLI cannot read the file, parse JSON, or load the schema.

## Deutsch

### Architektur

Der erste Release hat drei Module:

- `schema/usv.schema.json`: deklarativer Validierungsvertrag.
- `src/validation.ts`: Validierungsverhalten ohne Dateisystem-Side-Effects.
- `src/cli.ts`: Kommandozeilengrenze fuer Lesen, JSON-Parsing, Ausgabe und Exit-Codes.

### Externe Abhaengigkeiten

- `ajv` validiert JSON Schema.
- `commander` parst CLI-Befehle.
- `vitest` stellt automatisierte Tests bereit.

### Zustand

Die Validierung erhaelt geparstes JSON und gibt ein Ergebnis zurueck. Dateisystem- und Prozess-Side-Effects bleiben in der CLI-Grenze.

### Fehlerfaelle

- Exit `0`: das Sidecar ist gueltig.
- Exit `1`: das Sidecar ist lesbares JSON, aber nicht schema-konform.
- Exit `2`: die CLI kann Datei, JSON oder Schema nicht lesen.
