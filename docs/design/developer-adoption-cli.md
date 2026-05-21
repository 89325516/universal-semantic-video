# Developer Adoption CLI Design

## English

### Problem

New developers need to create a valid first sidecar and understand an existing sidecar before they invest time in schema details.

### Options

| Option | Benefit | Cost | Decision |
| --- | --- | --- | --- |
| Documentation only | No code surface. | Slow feedback and more copy errors. | Rejected |
| `init` plus `inspect` in current CLI | Fast first run, small behavior surface. | Adds two commands and tests. | Selected |
| Full authoring tool | Rich workflow. | Too large for first public scaffold. | Deferred |

### State Machine

| State | Event | Guard | Next State | Side Effect |
| --- | --- | --- | --- | --- |
| Idle | `init <file>` | starter validates and file does not exist | Created | Write starter sidecar |
| Idle | `init <file>` | starter validates but file exists | SystemFailed | Print write error |
| Idle | `init <file>` | starter invalid | ValidationFailed | Print schema errors |
| Idle | `inspect <file>` | file parses and validates | Summarized | Print summary |
| Idle | `inspect <file>` | file parses but fails validation | ValidationFailed | Print schema errors |
| Idle | `inspect <file>` | read or parse fails | SystemFailed | Print operational error |

### Impact

Affected files:

- `src/cli.ts`
- `src/template.ts`
- `src/summary.ts`
- `tests/validation.test.ts`
- `README.md`
- `README.de.md`
- product and acceptance documents

No schema rules, network behavior, media processing, credentials, or private artifacts are affected.

### Rollback

Remove `init` and `inspect` command registrations, delete `src/template.ts` and `src/summary.ts`, remove the matching tests, and revert documentation references. Existing `validate` behavior remains independent.

### Primitive Acceptance

- Running `usv init <new-file>` creates a valid `.usv.json` file.
- Running `usv init <existing-file>` exits non-zero and does not overwrite it.
- Running `usv inspect <valid-file>` prints version, media, semantic counts, localization counts, rights count, provenance status, and fallback count.
- Running `usv inspect <invalid-file>` exits non-zero and prints validation errors.

## Deutsch

### Problem

Neue Entwickler brauchen einen gueltigen ersten Sidecar und eine schnelle Zusammenfassung eines bestehenden Sidecars, bevor sie Zeit in Schemadetails investieren.

### Optionen

| Option | Nutzen | Kosten | Entscheidung |
| --- | --- | --- | --- |
| Nur Dokumentation | Keine neue Codeoberflaeche. | Langsameres Feedback und mehr Kopierfehler. | Abgelehnt |
| `init` plus `inspect` in aktueller CLI | Schneller erster Lauf, kleine Verhaltensoberflaeche. | Zwei Befehle und Tests. | Gewaehlt |
| Vollstaendiges Authoring-Werkzeug | Reicher Workflow. | Zu gross fuer das erste oeffentliche Grundgeruest. | Verschoben |

### Zustandsmaschine

| Zustand | Ereignis | Guard | Naechster Zustand | Side Effect |
| --- | --- | --- | --- | --- |
| Idle | `init <file>` | Starter validiert und Datei existiert nicht | Created | Starter-Sidecar schreiben |
| Idle | `init <file>` | Starter validiert, aber Datei existiert | SystemFailed | Schreibfehler ausgeben |
| Idle | `init <file>` | Starter ungueltig | ValidationFailed | Schemafehler ausgeben |
| Idle | `inspect <file>` | Datei parsebar und gueltig | Summarized | Zusammenfassung ausgeben |
| Idle | `inspect <file>` | Datei parsebar, aber ungueltig | ValidationFailed | Schemafehler ausgeben |
| Idle | `inspect <file>` | Lesen oder Parsen scheitert | SystemFailed | Operativen Fehler ausgeben |

### Auswirkung

Betroffene Dateien:

- `src/cli.ts`
- `src/template.ts`
- `src/summary.ts`
- `tests/validation.test.ts`
- `README.md`
- `README.de.md`
- Produkt- und Abnahmedokumente

Schema-Regeln, Netzwerkverhalten, Medienverarbeitung, Zugangsdaten und private Artefakte sind nicht betroffen.

### Rollback

`init`- und `inspect`-Registrierung entfernen, `src/template.ts` und `src/summary.ts` loeschen, passende Tests entfernen und Dokumentenverweise rueckgaengig machen. Das bestehende `validate`-Verhalten bleibt unabhaengig.

### Primitive Abnahme

- `usv init <new-file>` erzeugt eine gueltige `.usv.json`-Datei.
- `usv init <existing-file>` endet mit Fehlercode und ueberschreibt die Datei nicht.
- `usv inspect <valid-file>` gibt Version, Medienangaben, semantische Zaehler, Lokalisierungszaehler, Rechtezaehler, Herkunftsstatus und Fallback-Zaehler aus.
- `usv inspect <invalid-file>` endet mit Fehlercode und gibt Validierungsfehler aus.
