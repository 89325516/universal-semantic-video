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
usv inspect path/to/file.usv.json
```

`init` creates a valid starter sidecar and never overwrites an existing file. `validate` prints a bilingual success message or schema errors. `inspect` validates first, then prints version, media, semantic counts, localization counts, rights count, provenance status, and fallback count. System failure prints the operational error.

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
usv inspect path/to/file.usv.json
```

`init` erzeugt ein gueltiges Starter-Sidecar und ueberschreibt nie eine bestehende Datei. `validate` gibt eine zweisprachige Erfolgsmeldung oder Schemafehler aus. `inspect` validiert zuerst und gibt dann Version, Medienangaben, semantische Zaehler, Lokalisierungszaehler, Rechtezaehler, Herkunftsstatus und Fallback-Zaehler aus. Systemfehler geben den operativen Fehler aus.
