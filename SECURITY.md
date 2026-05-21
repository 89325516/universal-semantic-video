# Security Policy

## English

Do not publish private media, credentials, source documents, proprietary fonts, voice profiles, or personal data in this repository. If you find a vulnerability or accidental exposure, open a private maintainer channel when one is available. Until then, avoid posting exploit details in public issues.

The first release has no network service, user accounts, hosted API, or secret-dependent build step.

Before pushing, run `npm run install-hooks` once and `npm run check`. The versioned pre-push hook and CI run `scripts/check-public-safety.mjs`, which blocks current repository files and pushed commit snapshots with private workspace paths, credential-like files, raw media, private documents, generated archives, proprietary fonts, binary/oversized files, common secret tokens, or local user paths.

If private material is accidentally committed, stop pushing, remove it from the branch history, rotate any exposed credential, and record the remediation in `docs/EVIDENCE.md` before retrying the public-safety scan.

## Deutsch

Veroeffentlichen Sie in diesem Repository keine privaten Medien, Zugangsdaten, Quelldokumente, proprietaeren Schriften, Stimmprofile oder personenbezogenen Daten. Wenn Sie eine Schwachstelle oder versehentliche Offenlegung finden, nutzen Sie einen privaten Maintainer-Kanal, sobald einer verfuegbar ist. Bis dahin sollten keine Exploit-Details in oeffentlichen Issues stehen.

Der erste Release enthaelt keinen Netzwerkdienst, keine Benutzerkonten, keine gehostete API und keinen Build-Schritt mit Geheimnissen.

Vor dem Push einmal `npm run install-hooks` und danach `npm run check` ausfuehren. Der versionierte Pre-Push-Hook und CI nutzen `scripts/check-public-safety.mjs`; der Scanner blockiert aktuelle Repository-Dateien und gepushte Commit-Snapshots mit privaten Workspace-Pfaden, credential-aehnlichen Dateien, Rohmedien, privaten Dokumenten, erzeugten Archiven, proprietaeren Schriften, binaeren/uebergrossen Dateien, gaengigen Secret-Tokens oder lokalen Nutzerpfaden.

Wenn privates Material versehentlich committed wurde, nicht pushen, das Material aus der Branch-Historie entfernen, offengelegte Zugangsdaten rotieren und die Behebung in `docs/EVIDENCE.md` dokumentieren, bevor der Public-Safety-Scan erneut ausgefuehrt wird.
