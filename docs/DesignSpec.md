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
usv validate path/to/file.usv.json
```

Success prints a bilingual success message. Validation failure prints schema errors. System failure prints the operational error.

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
usv validate path/to/file.usv.json
```

Erfolg gibt eine zweisprachige Erfolgsmeldung aus. Validierungsfehler geben Schemafehler aus. Systemfehler geben den operativen Fehler aus.
