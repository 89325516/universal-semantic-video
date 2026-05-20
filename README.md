# Universal Semantic Video (USV)

Universal Semantic Video is a declarative semantic media format for localization, accessibility, rights, and provenance metadata above existing audio and video containers. USV does not replace MP4, WebM, MKV, codecs, subtitles, or provenance standards. It defines a structured semantic sidecar that tools can validate, exchange, and later embed.

## Current Scope

This repository is the first public scaffold. It provides:

- a USV sidecar JSON Schema;
- a command-line validator;
- valid and invalid examples;
- English and German project documents;
- acceptance criteria for the first public release.

It intentionally does not include OCR, ASR, video transcoding, AI inference, cloud APIs, player UI, or native container embedding.

## Quick Start

```bash
npm install
npm run check
node dist/cli.js validate examples/lite/airport-scene.usv.json
```

## Repository Map

- `schema/usv.schema.json` defines the first USV sidecar contract.
- `examples/` contains public-safe sample USV files and WebVTT fallbacks.
- `src/` contains the validator library and CLI boundary.
- `docs/` contains BRD, MRD, PRD, TRD, design, and test documents.
- `ACCEPTANCE.md` is the release gate for this scaffold.

## Deutsch

Universal Semantic Video ist ein deklaratives semantisches Medienformat fuer Lokalisierung, Barrierefreiheit, Rechte und Herkunftsnachweise oberhalb bestehender Audio- und Videocontainer. USV ersetzt keine Codecs, Container, Untertitel oder Herkunftsstandards. Dieses Repository liefert zunaechst Schema, Validator, Beispiele, Tests und oeffentliche Projektdokumente.

Der erste Umfang enthaelt keine OCR, keine Spracherkennung, kein Transcoding, keine KI-Inferenz, keine Cloud-API und keinen Player. Der Fokus liegt auf einem pruefbaren, oeffentlichen und erweiterbaren Standardfundament.

## License

Apache-2.0.
