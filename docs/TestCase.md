# Test Cases

## English

| ID | Case | Expected Result |
| --- | --- | --- |
| TC-001 | Validate `examples/lite/airport-scene.usv.json` through the library | Valid result |
| TC-002 | Validate `examples/invalid/missing-version.usv.json` through the library | Invalid result with errors |
| TC-003 | Run CLI against the valid example | Exit `0` |
| TC-004 | Run CLI against the invalid example | Non-zero exit |
| TC-005 | Run `npm run check` | Build, tests, and sample validation pass |

## Deutsch

| ID | Fall | Erwartetes Ergebnis |
| --- | --- | --- |
| TC-001 | `examples/lite/airport-scene.usv.json` ueber die Bibliothek validieren | Gueltiges Ergebnis |
| TC-002 | `examples/invalid/missing-version.usv.json` ueber die Bibliothek validieren | Ungueltiges Ergebnis mit Fehlern |
| TC-003 | CLI gegen gueltiges Beispiel ausfuehren | Exit `0` |
| TC-004 | CLI gegen ungueltiges Beispiel ausfuehren | Fehlercode |
| TC-005 | `npm run check` ausfuehren | Build, Tests und Beispielvalidierung bestehen |
