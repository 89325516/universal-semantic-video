# Design Specification

## English

### Schema Shape

The USV sidecar has these top-level fields:

- `usv_version`
- `media`
- `semantic`
- `localization`
- `rendering`
- `rights`
- `provenance`
- `fallbacks`

The format is declarative. It describes media semantics and allowed presentation choices; it does not prescribe one model, renderer, player, or container.

### File Naming

- Sidecar: `name.usv.json`
- WebVTT fallback: `name.<language>.vtt`
- Future package: `name.usvpkg/`

### CLI UX

```bash
usv init path/to/file.usv.json
usv validate path/to/file.usv.json
usv conformance path/to/file.usv.json
usv inspect path/to/file.usv.json
```

`init` creates a valid starter sidecar and never overwrites an existing file. `validate` prints a bilingual success message or schema errors. `conformance` validates schema first, then checks core references, timing, language declarations, and rights policy links. `inspect` validates first, then prints version, media, semantic counts, localization counts, rights count, provenance status, and fallback count. System failure prints the operational error.

### Public Repository Safety

Contributors can run:

```bash
npm run install-hooks
npm run check:public
```

The versioned pre-push hook and the CI check use the same scanner. The scanner blocks current repository files and pushed commit snapshots with private workspace paths, credential-like files, raw media, private documents, generated archives, proprietary fonts, binary/oversized files, common secret tokens, or local user paths.

## Deutsch

### Schema-Form

Das USV-Sidecar hat diese Top-Level-Felder:

- `usv_version`
- `media`
- `semantic`
- `localization`
- `rendering`
- `rights`
- `provenance`
- `fallbacks`

Das Format ist deklarativ. Es beschreibt Mediensemantik und erlaubte Praesentationsoptionen; es schreibt kein Modell, keinen Renderer, keinen Player und keinen Container vor.

### Dateinamen

- Sidecar: `name.usv.json`
- WebVTT-Fallback: `name.<language>.vtt`
- Zukuenftiges Paket: `name.usvpkg/`

### CLI UX

```bash
usv init path/to/file.usv.json
usv validate path/to/file.usv.json
usv conformance path/to/file.usv.json
usv inspect path/to/file.usv.json
```

`init` erzeugt ein gueltiges Starter-Sidecar und ueberschreibt nie eine bestehende Datei. `validate` gibt eine zweisprachige Erfolgsmeldung oder Schemafehler aus. `conformance` validiert zuerst das Schema und prueft dann Core-Referenzen, Timing, Sprachdeklarationen und Rights-Policy-Links. `inspect` validiert zuerst und gibt dann Version, Medienangaben, semantische Zaehler, Lokalisierungszaehler, Rechtezaehler, Herkunftsstatus und Fallback-Zaehler aus. Systemfehler geben den operativen Fehler aus.

### Sicherheit des oeffentlichen Repositorys

Beitragende koennen ausfuehren:

```bash
npm run install-hooks
npm run check:public
```

Der versionierte Pre-Push-Hook und der CI-Check nutzen denselben Scanner. Der Scanner blockiert aktuelle Repository-Dateien und gepushte Commit-Snapshots mit privaten Workspace-Pfaden, credential-aehnlichen Dateien, Rohmedien, privaten Dokumenten, erzeugten Archiven, proprietaeren Schriften, binaeren/uebergrossen Dateien, gaengigen Secret-Tokens oder lokalen Nutzerpfaden.
