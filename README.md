# Universal Semantic Video (USV)

[![CI](https://github.com/89325516/universal-semantic-video/actions/workflows/ci.yml/badge.svg)](https://github.com/89325516/universal-semantic-video/actions/workflows/ci.yml)
[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

Universal Semantic Video is an open semantic sidecar format for localization, accessibility, rights, provenance, and adaptive rendering above existing media containers.

USV is not a new codec, player, or MP4 replacement. It keeps video and audio in existing delivery systems, then adds a portable semantic layer that tools can validate, exchange, render, and later embed.

Language: English | [Deutsch](README.de.md)

## Status

This repository is a pre-1.0 public foundation. The current release is intentionally small:

- JSON Schema for `.usv.json` sidecar files.
- CLI commands to create, validate, inspect, and run core conformance checks.
- Public-safe visual and audio-visual example files with WebVTT fallbacks.
- Product, technical, design, test, roadmap, architecture, and acceptance documents.
- CI for build, tests, sample validation, and public-safety scanning.

Not included yet: OCR, ASR, diarization, AI translation, text-to-speech, lip sync, native container embedding, hosted APIs, graphical authoring, or a browser player.

## Why USV

Video workflows already have strong standards for compression, containers, captions, streaming, and provenance. They still lack a compact and inspectable way to say:

- what semantic objects, spoken segments, visual text, sounds, scenes, charts, and speakers exist;
- which parts may be translated, preserved, dubbed, labeled, explained, or left untouched;
- which rights, consent, review, disclosure, and provenance rules apply;
- which fallbacks a simple device can render when advanced rendering is unavailable.

USV provides that layer as data, not as a replacement for the media stack.

## Quick Start

```bash
npm install
npm run check
node dist/cli.js init scratch.usv.json
node dist/cli.js validate scratch.usv.json
node dist/cli.js conformance examples/lite/audio-visual-announcement.usv.json
node dist/cli.js inspect examples/lite/airport-scene.usv.json
```

The package exposes a `usv` binary after build or package installation:

```bash
usv init path/to/file.usv.json
usv validate path/to/file.usv.json
usv conformance path/to/file.usv.json
usv inspect path/to/file.usv.json
```

Exit codes:

- `0`: success.
- `1`: readable JSON that fails USV validation.
- `2`: operational failure such as missing file, invalid JSON, or write failure.

## Format Shape

A USV sidecar has eight required top-level sections:

```json
{
  "usv_version": "0.1.0",
  "media": {},
  "semantic": {},
  "localization": {},
  "rendering": {},
  "rights": {},
  "provenance": {},
  "fallbacks": {}
}
```

The current schema covers semantic objects, semantic events, relations, localization intents, translations, rendering plans, rights policies, provenance records, and subtitle fallbacks.

`usv validate` checks schema shape. `usv conformance` checks schema plus core interoperability rules such as semantic references, time ranges, declared languages, and rights policy links.

See:

- [`schema/usv.schema.json`](schema/usv.schema.json)
- [`examples/lite/airport-scene.usv.json`](examples/lite/airport-scene.usv.json)
- [`examples/lite/audio-visual-announcement.usv.json`](examples/lite/audio-visual-announcement.usv.json)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/STANDARDS.md`](docs/STANDARDS.md)
- [`docs/spec/USV-Core-Conformance.md`](docs/spec/USV-Core-Conformance.md)
- [`docs/spec/USV-Profile-Levels.md`](docs/spec/USV-Profile-Levels.md)

## Standards Posture

USV is designed to compose with the media ecosystem instead of competing with it.

- Language fields use BCP 47 style tags as defined by RFC 5646.
- Subtitle fallbacks use WebVTT where a browser-friendly text track is enough.
- Browser playback should map simple fallbacks to HTML media tracks.
- Provenance fields can reference C2PA manifests without copying or redefining them.
- MP4, Matroska/WebM, HLS, DASH, and timed metadata integration are future embedding paths, not first-release requirements.
- WebCodecs is relevant for future browser renderers, not required for the schema.

The repository documents official references in [`docs/STANDARDS.md`](docs/STANDARDS.md).

## Roadmap

The near-term goal is fast external feedback on a stable, inspectable sidecar contract.

- `0.1`: public schema, examples, validator, starter template, inspector, core conformance, acceptance docs.
- `0.2`: richer examples, schema review issues, stricter semantic graph checks, packaging notes.
- `0.3`: browser reference renderer for subtitles, labels, provenance indicators, and fallback behavior.
- `0.4`: container and streaming embedding experiments based on existing standards mechanisms.
- `1.0`: frozen core schema profile, conformance suite, implementation guide, and governance process.

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for release gates.

## Repository Map

- `schema/`: USV JSON Schema and reusable definitions.
- `src/`: validation library, starter template, summary logic, and CLI boundary.
- `examples/`: public-safe valid and invalid examples.
- `docs/`: business, market, product, technical, architecture, design, test, risk, evidence, and roadmap documents.
- `.github/workflows/ci.yml`: build, test, and sample validation workflow.
- `.githooks/pre-push`: versioned public-safety hook for local Git pushes.
- `scripts/check-public-safety.mjs`: public-safety scanner used by local checks, the hook, and CI.
- `ACCEPTANCE.md`: release gate for this public foundation.

## Contributing

Contributions are welcome when they keep the format small, testable, reversible, and standards-compatible.

Before opening a pull request:

```bash
npm run install-hooks
npm run check
```

Public repository content must be English, German, or both. Do not submit private source briefs, Google Drive exports, raw media, credentials, local environment files, proprietary fonts, voice profiles, or generated release packages.

The pre-push hook blocks current repository files and pushed commit snapshots with private workspace paths, credential-like files, raw media, private documents, generated archives, proprietary fonts, binary/oversized files, common secret tokens, or local user paths before Git sends objects to a remote.

Behavior, interface, state-machine, or acceptance changes must update the relevant documents under `docs/` and `ACCEPTANCE.md`.

## License

Apache-2.0.
