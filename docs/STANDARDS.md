# Standards Alignment

## English

USV is standards-adjacent by design. It should add a semantic layer without redefining mature media standards.

| Area | Current USV Position | Reference |
| --- | --- | --- |
| Language tags | Use BCP 47 style tags for language-bearing fields. | RFC 5646: https://www.rfc-editor.org/rfc/rfc5646 |
| Text tracks | Use WebVTT for browser-friendly subtitle and caption fallbacks. | WebVTT: https://w3c.github.io/webvtt/ |
| Browser media | Map simple subtitle fallbacks to HTML media tracks. | WHATWG HTML media: https://html.spec.whatwg.org/multipage/media.html |
| Provenance | Reference C2PA manifests instead of replacing provenance systems. | C2PA 2.2: https://spec.c2pa.org/specifications/specifications/2.2/index.html |
| MP4 registration | Treat MP4 metadata and handler registration as a future embedding concern. | MP4RA: https://mp4ra.org/ |
| Streaming | Treat HLS timed metadata as a future delivery path, not a first-release requirement. | RFC 8216: https://datatracker.ietf.org/doc/html/rfc8216 |
| Matroska/WebM | Treat attachments, tags, or metadata elements as future embedding paths. | RFC 9559: https://www.ietf.org/rfc/rfc9559.html |
| Browser rendering | Keep WebCodecs relevant for future renderers, not required for the sidecar contract. | WebCodecs: https://www.w3.org/TR/webcodecs/ |

### Design Consequences

- USV sidecars stay human-readable JSON for the first release.
- Existing media files remain untouched during validation.
- Fallback tracks are explicit, inspectable, and usable without advanced renderers.
- Provenance references stay separate from the semantic graph.
- Native container embedding must wait for reviewed mappings and conformance tests.

## Deutsch

USV ist bewusst standardsnah. Es soll eine semantische Ebene ergaenzen, ohne reife Medienstandards neu zu definieren.

| Bereich | Aktuelle USV-Position | Referenz |
| --- | --- | --- |
| Sprach-Tags | BCP-47-artige Tags fuer Sprachfelder verwenden. | RFC 5646: https://www.rfc-editor.org/rfc/rfc5646 |
| Texttracks | WebVTT fuer browserfreundliche Untertitel- und Caption-Fallbacks verwenden. | WebVTT: https://w3c.github.io/webvtt/ |
| Browser-Medien | Einfache Untertitel-Fallbacks auf HTML-Medientracks abbilden. | WHATWG HTML media: https://html.spec.whatwg.org/multipage/media.html |
| Herkunft | Auf C2PA-Manifeste verweisen, statt Herkunftssysteme zu ersetzen. | C2PA 2.2: https://spec.c2pa.org/specifications/specifications/2.2/index.html |
| MP4-Registrierung | MP4-Metadaten und Handler-Registrierung als spaetere Einbettungsfrage behandeln. | MP4RA: https://mp4ra.org/ |
| Streaming | HLS Timed Metadata als spaeteren Lieferpfad behandeln, nicht als erste Anforderung. | RFC 8216: https://datatracker.ietf.org/doc/html/rfc8216 |
| Matroska/WebM | Attachments, Tags oder Metadatenelemente als spaetere Einbettungspfade behandeln. | RFC 9559: https://www.ietf.org/rfc/rfc9559.html |
| Browser-Rendering | WebCodecs fuer kuenftige Renderer beachten, aber nicht fuer den Sidecar-Vertrag verlangen. | WebCodecs: https://www.w3.org/TR/webcodecs/ |

### Designfolgen

- USV-Sidecars bleiben im ersten Release menschenlesbares JSON.
- Bestehende Mediendateien bleiben bei der Validierung unveraendert.
- Fallback-Tracks sind explizit, pruefbar und ohne erweiterte Renderer nutzbar.
- Herkunftsverweise bleiben getrennt vom semantischen Graphen.
- Native Container-Einbettung wartet auf gepruefte Mappings und Conformance-Tests.
