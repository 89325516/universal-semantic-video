# Test Cases

## English

| ID | Case | Expected Result |
| --- | --- | --- |
| TC-001 | Validate `examples/lite/airport-scene.usv.json` through the library | Valid result |
| TC-002 | Validate `examples/invalid/missing-version.usv.json` through the library | Invalid result with errors |
| TC-003 | Run CLI against the valid example | Exit `0` |
| TC-004 | Run CLI against the invalid example | Non-zero exit |
| TC-005 | Run `npm run check` | Build, tests, and sample validation pass |
| TC-006 | Run CLI `init` into a temporary path | New file exists and validates |
| TC-007 | Run CLI `init` against an existing file | Non-zero exit and original content remains |
| TC-008 | Run CLI `inspect` against the valid example | Summary includes version, semantic count, and target language |

## Deutsch

| ID | Fall | Erwartetes Ergebnis |
| --- | --- | --- |
| TC-001 | `examples/lite/airport-scene.usv.json` ueber die Bibliothek validieren | Gueltiges Ergebnis |
| TC-002 | `examples/invalid/missing-version.usv.json` ueber die Bibliothek validieren | Ungueltiges Ergebnis mit Fehlern |
| TC-003 | CLI gegen gueltiges Beispiel ausfuehren | Exit `0` |
| TC-004 | CLI gegen ungueltiges Beispiel ausfuehren | Fehlercode |
| TC-005 | `npm run check` ausfuehren | Build, Tests und Beispielvalidierung bestehen |
| TC-006 | CLI `init` in einem temporaeren Pfad ausfuehren | Neue Datei existiert und validiert |
| TC-007 | CLI `init` gegen eine bestehende Datei ausfuehren | Fehlercode und urspruenglicher Inhalt bleibt erhalten |
| TC-008 | CLI `inspect` gegen gueltiges Beispiel ausfuehren | Zusammenfassung enthaelt Version, semantischen Zaehler und Zielsprache |
