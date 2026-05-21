# Architecture

## English

### Boundary Model

USV has three current runtime boundaries:

- `schema/`: the public data contract.
- `src/validation.ts`: pure validation behavior over parsed JSON.
- `src/conformance.ts`: pure core interoperability checks over schema-valid sidecars.
- `src/cli.ts`: filesystem, terminal output, and process exit boundary.

The CLI delegates reusable logic to pure modules:

- `src/template.ts` creates a starter sidecar without filesystem access.
- `src/summary.ts` summarizes a validated sidecar without filesystem access.

The repository also has a release-safety boundary:

- `scripts/check-public-safety.mjs` scans current repository paths, file contents, and pre-push commit snapshots.
- `.githooks/pre-push` calls the scanner before Git sends objects to a remote.

### State Ownership

The library owns no global project state. Callers provide parsed JSON and receive validation results or summary lines. The CLI owns operational state such as file paths, terminal output, write failures, and exit codes.

### CLI State Machine

| State | Event | Guard | Next State | Side Effect |
| --- | --- | --- | --- | --- |
| Idle | `init <file>` | starter validates | Created | Write new file with exclusive create |
| Idle | `init <file>` | starter fails validation | ValidationFailed | Print schema errors |
| Idle | `validate <file>` | JSON parses and validates | Valid | Print success |
| Idle | `validate <file>` | JSON parses but fails schema | ValidationFailed | Print schema errors |
| Idle | `conformance <file>` | schema and core checks pass | Conformant | Print success |
| Idle | `conformance <file>` | schema passes but core checks fail | ConformanceFailed | Print conformance errors |
| Idle | `inspect <file>` | JSON parses and validates | Summarized | Print summary lines |
| Idle | any command | read, parse, schema load, or write fails | SystemFailed | Print operational error |

### Public Push State Machine

| State | Event | Guard | Next State | Side Effect |
| --- | --- | --- | --- | --- |
| Idle | `npm run check:public` | current repository files pass public-safety rules | PublicSafe | Print scan summary |
| Idle | `npm run check:public` | current repository files violate a rule | ExposureBlocked | Print offending path and rule |
| Idle | Git `pre-push` | current repository files and pushed commit snapshots pass rules | PushAllowed | Exit `0` |
| Idle | Git `pre-push` | current repository files or pushed commit snapshots violate a rule | PushBlocked | Exit non-zero |

### Module Responsibilities

- Schema files define allowed structure and value constraints.
- Validation compiles schema and reports normalized errors.
- Conformance checks cross-reference integrity, timing, language declarations, and rights policy links.
- Template generation creates the smallest useful valid document.
- Summary generation reports observable document shape for humans.
- CLI commands translate user actions into file IO and exit codes.
- Public-safety scanning reports public exposure risks without changing repository files.

## Deutsch

### Grenzmodell

USV hat aktuell drei Runtime-Grenzen:

- `schema/`: oeffentlicher Datenvertrag.
- `src/validation.ts`: reine Validierung ueber geparstem JSON.
- `src/conformance.ts`: reine Core-Interoperabilitaetschecks ueber schema-gueltigen Sidecars.
- `src/cli.ts`: Grenze fuer Dateisystem, Terminalausgabe und Exit-Codes.

Die CLI delegiert wiederverwendbare Logik an reine Module:

- `src/template.ts` erzeugt ein Starter-Sidecar ohne Dateisystemzugriff.
- `src/summary.ts` fasst ein validiertes Sidecar ohne Dateisystemzugriff zusammen.

Das Repository hat zusaetzlich eine Release-Safety-Grenze:

- `scripts/check-public-safety.mjs` scannt aktuelle Repository-Pfade, Dateiinhalte und Pre-Push-Commit-Snapshots.
- `.githooks/pre-push` ruft den Scanner auf, bevor Git Objekte an ein Remote sendet.

### Zustand

Die Bibliothek besitzt keinen globalen Projektzustand. Aufrufer liefern geparstes JSON und erhalten Validierungsergebnisse oder Zusammenfassungszeilen. Die CLI besitzt operativen Zustand wie Dateipfade, Terminalausgabe, Schreibfehler und Exit-Codes.

### CLI-Zustandsmaschine

| Zustand | Ereignis | Guard | Naechster Zustand | Side Effect |
| --- | --- | --- | --- | --- |
| Idle | `init <file>` | Starter validiert | Created | Neue Datei exklusiv schreiben |
| Idle | `init <file>` | Starter nicht gueltig | ValidationFailed | Schemafehler ausgeben |
| Idle | `validate <file>` | JSON parsebar und gueltig | Valid | Erfolg ausgeben |
| Idle | `validate <file>` | JSON parsebar, aber ungueltig | ValidationFailed | Schemafehler ausgeben |
| Idle | `conformance <file>` | Schema und Core-Checks bestehen | Conformant | Erfolg ausgeben |
| Idle | `conformance <file>` | Schema besteht, aber Core-Checks scheitern | ConformanceFailed | Conformance-Fehler ausgeben |
| Idle | `inspect <file>` | JSON parsebar und gueltig | Summarized | Zusammenfassung ausgeben |
| Idle | beliebiger Befehl | Lesen, Parsen, Schema-Laden oder Schreiben scheitert | SystemFailed | Operativen Fehler ausgeben |

### Public-Push-Zustandsmaschine

| Zustand | Ereignis | Guard | Naechster Zustand | Side Effect |
| --- | --- | --- | --- | --- |
| Idle | `npm run check:public` | aktuelle Repository-Dateien bestehen Public-Safety-Regeln | PublicSafe | Scan-Zusammenfassung ausgeben |
| Idle | `npm run check:public` | aktuelle Repository-Dateien verletzen eine Regel | ExposureBlocked | Betroffenen Pfad und Regel ausgeben |
| Idle | Git `pre-push` | aktuelle Repository-Dateien und gepushte Commit-Snapshots bestehen Regeln | PushAllowed | Exit `0` |
| Idle | Git `pre-push` | aktuelle Repository-Dateien oder gepushte Commit-Snapshots verletzen eine Regel | PushBlocked | Fehlercode |

### Modulverantwortung

- Schema-Dateien definieren Struktur und Werteinschraenkungen.
- Validierung kompiliert Schema und meldet normalisierte Fehler.
- Conformance prueft Referenzintegritaet, Timing, Sprachdeklarationen und Rights-Policy-Links.
- Template-Erzeugung erstellt das kleinste nuetzliche gueltige Dokument.
- Zusammenfassung berichtet die sichtbare Dokumentform fuer Menschen.
- CLI-Befehle uebersetzen Nutzeraktionen in Datei-IO und Exit-Codes.
- Public-Safety-Scanning meldet oeffentliche Offenlegungsrisiken, ohne Repository-Dateien zu aendern.
