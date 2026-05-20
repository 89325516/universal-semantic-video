# Market Requirements Document

## English

### Users

- Media tool developers who need a stable sidecar contract.
- Localization teams that need intent and review state beyond subtitles.
- Player and platform teams that need capability-based fallback behavior.
- Accessibility researchers and implementers.
- Provenance and rights workflows that need explicit disclosure hooks.

### Ecosystem Fit

USV should complement, not replace:

- WebVTT and HTML text tracks for browser fallback: https://www.w3.org/TR/webvtt1/ and https://html.spec.whatwg.org/multipage/media.html#the-track-element
- BCP 47 language tags: https://www.rfc-editor.org/rfc/rfc5646
- MP4RA-registered ISOBMFF code points for future embedding: https://mp4ra.org/
- Matroska metadata, tags, and attachments: https://www.matroska.org/technical/elements.html
- HLS timed metadata for future streaming integration: https://www.rfc-editor.org/rfc/rfc8216
- C2PA provenance for authenticity metadata: https://spec.c2pa.org/specifications/specifications/2.2/index.html

### Market Requirement

The first public artifact must be simple enough for developers to validate locally and explicit enough to support future tools without locking the ecosystem to one codec, container, model, translation method, or platform.

## Deutsch

### Nutzergruppen

- Entwicklerinnen und Entwickler von Medienwerkzeugen, die einen stabilen Sidecar-Vertrag brauchen.
- Lokalisierungsteams, die Absicht und Review-Status oberhalb von Untertiteln benoetigen.
- Player- und Plattformteams, die Fallback nach Geraetefaehigkeit brauchen.
- Forschung und Umsetzung im Bereich Barrierefreiheit.
- Herkunfts- und Rechteprozesse, die klare Offenlegungspunkte brauchen.

### Oekosystem

USV ergaenzt bestehende Standards und ersetzt sie nicht: WebVTT, HTML-Texttracks, BCP 47, ISOBMFF/MP4RA, Matroska, HLS-Timed-Metadata und C2PA.

### Marktanforderung

Das erste oeffentliche Artefakt muss lokal leicht validierbar sein und zugleich genug Struktur fuer spaetere Werkzeuge bieten, ohne Codec, Container, Modell, Uebersetzungsmethode oder Plattform vorzuschreiben.
