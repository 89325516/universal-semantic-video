# Public Push Safety Gate Design

## English

### Problem

The repository is public. Internal planning notes, credentials, local environment files, raw media, proprietary fonts, voice profiles, generated packages, or local machine paths must not be pushed to GitHub by accident.

### Options

| Option | Benefit | Cost | Decision |
| --- | --- | --- | --- |
| Manual review only | No implementation cost. | Easy to skip before a push. | Rejected |
| Versioned pre-push hook plus reusable scan script | Runs at the Git boundary and can also run in CI. | Requires local hook installation. | Selected |
| External secret-scanning service only | Stronger hosted policy controls. | Adds service dependency outside the current scaffold. | Deferred |

### State Machine

| State | Event | Guard | Next State | Side Effect |
| --- | --- | --- | --- | --- |
| Idle | `npm run check:public` | current repository paths and contents pass public-safety rules | PublicSafe | Print scan summary |
| Idle | `npm run check:public` | current repository path or content violates a rule | ExposureBlocked | Print offending path and rule |
| Idle | Git `pre-push` | current tree and pushed commit snapshots pass public-safety rules | PushAllowed | Exit `0` |
| Idle | Git `pre-push` | current tree or pushed commit snapshots violate a rule | PushBlocked | Exit non-zero before Git sends objects |
| PushBlocked | private material removed or moved to ignored local storage | scan passes | PushAllowed | Push may be retried |

### Impact

Affected files:

- `scripts/check-public-safety.mjs`
- `.githooks/pre-push`
- `.gitignore`
- `package.json`
- `.github/workflows/ci.yml`
- project security, contribution, test, traceability, evidence, and acceptance documents

USV schema, examples, CLI behavior, media processing, network behavior, and package runtime behavior are not affected.

### Rollback

Remove `.githooks/pre-push`, remove `scripts/check-public-safety.mjs`, delete `check:public` and `install-hooks` from `package.json`, remove the CI permission and check wiring, and revert the documentation and acceptance changes. Existing build, validation, and CLI tests remain independent.

### Primitive Acceptance

- Running `npm run check:public` scans current repository files for private directories, credential-like paths, raw media, private documents, generated archives, oversized files, binary content, common secret tokens, and local user paths.
- Running the versioned pre-push hook with a clean public-safe tree exits `0`.
- If a tracked path under `private/` is staged or committed, the public-safety scan exits non-zero and names the blocked path.
- `npm run check` includes the public-safety scan.
- CI runs the same public-safety scan with read-only repository permission.

## Deutsch

### Problem

Das Repository ist oeffentlich. Interne Planungsnotizen, Zugangsdaten, lokale Umgebungsdateien, Rohmedien, proprietaere Schriften, Stimmprofile, erzeugte Pakete oder lokale Maschinenpfade duerfen nicht versehentlich nach GitHub gepusht werden.

### Optionen

| Option | Nutzen | Kosten | Entscheidung |
| --- | --- | --- | --- |
| Nur manuelle Pruefung | Keine Implementierungskosten. | Vor einem Push leicht zu vergessen. | Abgelehnt |
| Versionierter Pre-Push-Hook plus wiederverwendbares Scan-Skript | Laeuft an der Git-Grenze und auch in CI. | Lokale Hook-Installation noetig. | Gewaehlt |
| Nur externer Secret-Scanning-Dienst | Staerkere gehostete Policy-Kontrollen. | Abhaengigkeit ausserhalb des aktuellen Scaffolds. | Verschoben |

### Zustandsmaschine

| Zustand | Ereignis | Guard | Naechster Zustand | Side Effect |
| --- | --- | --- | --- | --- |
| Idle | `npm run check:public` | Aktuelle Repository-Pfade und Inhalte bestehen Public-Safety-Regeln | PublicSafe | Scan-Zusammenfassung ausgeben |
| Idle | `npm run check:public` | Aktueller Repository-Pfad oder Inhalt verletzt eine Regel | ExposureBlocked | Betroffenen Pfad und Regel ausgeben |
| Idle | Git `pre-push` | Aktueller Baum und gepushte Commit-Snapshots bestehen Public-Safety-Regeln | PushAllowed | Exit `0` |
| Idle | Git `pre-push` | Aktueller Baum oder gepushte Commit-Snapshots verletzen eine Regel | PushBlocked | Vor dem Senden der Git-Objekte mit Fehlercode beenden |
| PushBlocked | Privates Material entfernt oder in ignorierten lokalen Speicher verschoben | Scan besteht | PushAllowed | Push kann erneut versucht werden |

### Auswirkung

Betroffene Dateien:

- `scripts/check-public-safety.mjs`
- `.githooks/pre-push`
- `.gitignore`
- `package.json`
- `.github/workflows/ci.yml`
- Sicherheits-, Beitrags-, Test-, Traceability-, Evidenz- und Abnahmedokumente

USV-Schema, Beispiele, CLI-Verhalten, Medienverarbeitung, Netzwerkverhalten und Paket-Runtime-Verhalten sind nicht betroffen.

### Rollback

`.githooks/pre-push` entfernen, `scripts/check-public-safety.mjs` entfernen, `check:public` und `install-hooks` aus `package.json` loeschen, CI-Berechtigung und Check-Verknuepfung entfernen und Dokumentations- sowie Abnahmeaenderungen rueckgaengig machen. Bestehende Build-, Validierungs- und CLI-Tests bleiben unabhaengig.

### Primitive Abnahme

- `npm run check:public` scannt aktuelle Repository-Dateien auf private Verzeichnisse, credential-aehnliche Pfade, Rohmedien, private Dokumente, erzeugte Archive, uebergrosse Dateien, binaere Inhalte, gaengige Secret-Tokens und lokale Nutzerpfade.
- Der versionierte Pre-Push-Hook endet bei einem oeffentlich sicheren Baum mit `0`.
- Wenn ein getrackter Pfad unter `private/` staged oder committed ist, endet der Public-Safety-Scan mit Fehlercode und nennt den blockierten Pfad.
- `npm run check` enthaelt den Public-Safety-Scan.
- CI fuehrt denselben Public-Safety-Scan mit read-only Repository-Berechtigung aus.
