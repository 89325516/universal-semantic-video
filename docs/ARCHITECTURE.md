# Architecture

## English

### Boundary Model

USV has three current boundaries:

- `schema/`: the public data contract.
- `src/validation.ts`: pure validation behavior over parsed JSON.
- `src/cli.ts`: filesystem, terminal output, and process exit boundary.

The CLI delegates reusable logic to pure modules:

- `src/template.ts` creates a starter sidecar without filesystem access.
- `src/summary.ts` summarizes a validated sidecar without filesystem access.

### State Ownership

The library owns no global project state. Callers provide parsed JSON and receive validation results or summary lines. The CLI owns operational state such as file paths, terminal output, write failures, and exit codes.

### CLI State Machine

| State | Event | Guard | Next State | Side Effect |
| --- | --- | --- | --- | --- |
| Idle | `init <file>` | starter validates | Created | Write new file with exclusive create |
| Idle | `init <file>` | starter fails validation | ValidationFailed | Print schema errors |
| Idle | `validate <file>` | JSON parses and validates | Valid | Print success |
| Idle | `validate <file>` | JSON parses but fails schema | ValidationFailed | Print schema errors |
| Idle | `inspect <file>` | JSON parses and validates | Summarized | Print summary lines |
| Idle | any command | read, parse, schema load, or write fails | SystemFailed | Print operational error |

### Module Responsibilities

- Schema files define allowed structure and value constraints.
- Validation compiles schema and reports normalized errors.
- Template generation creates the smallest useful valid document.
- Summary generation reports observable document shape for humans.
- CLI commands translate user actions into file IO and exit codes.

## Deutsch

### Grenzmodell

USV hat aktuell drei Grenzen:

- `schema/`: oeffentlicher Datenvertrag.
- `src/validation.ts`: reine Validierung ueber geparstem JSON.
- `src/cli.ts`: Grenze fuer Dateisystem, Terminalausgabe und Exit-Codes.

Die CLI delegiert wiederverwendbare Logik an reine Module:

- `src/template.ts` erzeugt ein Starter-Sidecar ohne Dateisystemzugriff.
- `src/summary.ts` fasst ein validiertes Sidecar ohne Dateisystemzugriff zusammen.

### Zustand

Die Bibliothek besitzt keinen globalen Projektzustand. Aufrufer liefern geparstes JSON und erhalten Validierungsergebnisse oder Zusammenfassungszeilen. Die CLI besitzt operativen Zustand wie Dateipfade, Terminalausgabe, Schreibfehler und Exit-Codes.

### CLI-Zustandsmaschine

| Zustand | Ereignis | Guard | Naechster Zustand | Side Effect |
| --- | --- | --- | --- | --- |
| Idle | `init <file>` | Starter validiert | Created | Neue Datei exklusiv schreiben |
| Idle | `init <file>` | Starter nicht gueltig | ValidationFailed | Schemafehler ausgeben |
| Idle | `validate <file>` | JSON parsebar und gueltig | Valid | Erfolg ausgeben |
| Idle | `validate <file>` | JSON parsebar, aber ungueltig | ValidationFailed | Schemafehler ausgeben |
| Idle | `inspect <file>` | JSON parsebar und gueltig | Summarized | Zusammenfassung ausgeben |
| Idle | beliebiger Befehl | Lesen, Parsen, Schema-Laden oder Schreiben scheitert | SystemFailed | Operativen Fehler ausgeben |

### Modulverantwortung

- Schema-Dateien definieren Struktur und Werteinschraenkungen.
- Validierung kompiliert Schema und meldet normalisierte Fehler.
- Template-Erzeugung erstellt das kleinste nuetzliche gueltige Dokument.
- Zusammenfassung berichtet die sichtbare Dokumentform fuer Menschen.
- CLI-Befehle uebersetzen Nutzeraktionen in Datei-IO und Exit-Codes.
