# Universal Semantic Video (USV)

[![CI](https://github.com/89325516/universal-semantic-video/actions/workflows/ci.yml/badge.svg)](https://github.com/89325516/universal-semantic-video/actions/workflows/ci.yml)
[![Lizenz: Apache-2.0](https://img.shields.io/badge/lizenz-Apache--2.0-blue.svg)](LICENSE)

Universal Semantic Video ist ein offenes semantisches Sidecar-Format fuer Lokalisierung, Barrierefreiheit, Rechte, Herkunftsnachweise und adaptives Rendering oberhalb bestehender Mediencontainer.

USV ist kein neuer Codec, kein Player und kein Ersatz fuer MP4. Video und Audio bleiben in bestehenden Lieferketten. USV ergaenzt eine portable semantische Ebene, die Werkzeuge validieren, austauschen, rendern und spaeter einbetten koennen.

Sprache: [English](README.md) | Deutsch

## Status

Dieses Repository ist ein oeffentliches Pre-1.0-Fundament. Der aktuelle Umfang ist bewusst klein:

- JSON Schema fuer `.usv.json`-Sidecar-Dateien.
- CLI-Befehle zum Erzeugen, Validieren, Inspizieren und fuer Core-Conformance-Checks.
- Oeffentlich sichere visuelle und audio-visuelle Beispieldateien mit WebVTT-Fallbacks.
- Produkt-, Technik-, Design-, Test-, Roadmap-, Architektur- und Abnahmedokumente.
- CI fuer Build, Tests, Beispielvalidierung und Public-Safety-Scanning.

Noch nicht enthalten: OCR, ASR, Sprechertrennung, KI-Uebersetzung, Text-to-Speech, Lip-Sync, native Container-Einbettung, gehostete APIs, grafisches Authoring oder ein Browser-Player.

## Warum USV

Videoworkflows haben bereits starke Standards fuer Kompression, Container, Untertitel, Streaming und Herkunftsnachweise. Es fehlt aber eine kompakte und pruefbare Ebene fuer Aussagen wie:

- welche semantischen Objekte, Sprachsegmente, sichtbaren Texte, Geraeusche, Szenen, Diagramme und Sprecher existieren;
- welche Teile uebersetzt, bewahrt, synchronisiert, beschriftet, erklaert oder unveraendert gelassen werden sollen;
- welche Regeln fuer Rechte, Zustimmung, Pruefung, Offenlegung und Herkunft gelten;
- welche Fallbacks ein einfaches Geraet darstellen kann, wenn erweitertes Rendering nicht verfuegbar ist.

USV liefert diese Ebene als Daten, nicht als Ersatz fuer den Medienstack.

## Schnellstart

```bash
npm install
npm run check
node dist/cli.js init scratch.usv.json
node dist/cli.js validate scratch.usv.json
node dist/cli.js conformance examples/lite/audio-visual-announcement.usv.json
node dist/cli.js inspect examples/lite/airport-scene.usv.json
```

Nach Build oder Paketinstallation steht ein `usv`-Binary bereit:

```bash
usv init path/to/file.usv.json
usv validate path/to/file.usv.json
usv conformance path/to/file.usv.json
usv inspect path/to/file.usv.json
```

Exit-Codes:

- `0`: Erfolg.
- `1`: lesbares JSON, aber keine gueltige USV-Datei.
- `2`: operativer Fehler, zum Beispiel fehlende Datei, ungueltiges JSON oder Schreibfehler.

## Format

Ein USV-Sidecar hat acht verpflichtende Top-Level-Bereiche:

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

Das aktuelle Schema umfasst semantische Objekte, Ereignisse, Beziehungen, Lokalisierungsabsichten, Uebersetzungen, Rendering-Plaene, Rechte, Herkunftsdatensaetze und Untertitel-Fallbacks.

`usv validate` prueft die Schema-Form. `usv conformance` prueft Schema plus Core-Interoperabilitaetsregeln wie semantische Referenzen, Zeitbereiche, deklarierte Sprachen und Rights-Policy-Links.

Siehe:

- [`schema/usv.schema.json`](schema/usv.schema.json)
- [`examples/lite/airport-scene.usv.json`](examples/lite/airport-scene.usv.json)
- [`examples/lite/audio-visual-announcement.usv.json`](examples/lite/audio-visual-announcement.usv.json)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/STANDARDS.md`](docs/STANDARDS.md)
- [`docs/spec/USV-Core-Conformance.md`](docs/spec/USV-Core-Conformance.md)
- [`docs/spec/USV-Profile-Levels.md`](docs/spec/USV-Profile-Levels.md)

## Standards

USV soll mit dem Medienoekosystem zusammenspielen, nicht damit konkurrieren.

- Sprachfelder nutzen BCP-47-artige Tags nach RFC 5646.
- Untertitel-Fallbacks nutzen WebVTT, wenn ein browserfreundlicher Texttrack reicht.
- Browser-Wiedergabe soll einfache Fallbacks auf HTML-Medientracks abbilden.
- Herkunftsfelder koennen auf C2PA-Manifeste verweisen, ohne sie zu kopieren oder neu zu definieren.
- MP4, Matroska/WebM, HLS, DASH und zeitbasierte Metadaten sind spaetere Einbettungspfade, keine Anforderungen des ersten Release.
- WebCodecs ist fuer kuenftige Browser-Renderer relevant, aber fuer das Schema nicht erforderlich.

Offizielle Referenzen stehen in [`docs/STANDARDS.md`](docs/STANDARDS.md).

## Roadmap

Das kurzfristige Ziel ist schnelles externes Feedback zu einem stabilen und inspizierbaren Sidecar-Vertrag.

- `0.1`: oeffentliches Schema, Beispiele, Validator, Starter-Template, Inspector, Core-Conformance, Abnahmedokumente.
- `0.2`: reichere Beispiele, Schema-Review-Issues, strengere semantische Graphpruefungen, Packaging-Notizen.
- `0.3`: Browser-Referenzrenderer fuer Untertitel, Labels, Herkunftsanzeigen und Fallback-Verhalten.
- `0.4`: Experimente fuer Container- und Streaming-Einbettung auf Basis bestehender Standards.
- `1.0`: eingefrorenes Kernprofil, Conformance-Suite, Implementierungsleitfaden und Governance-Prozess.

## Beitragen

Beitraege sind willkommen, wenn sie das Format klein, testbar, reversibel und standards-kompatibel halten.

Vor einem Pull Request:

```bash
npm run install-hooks
npm run check
```

Oeffentliche Repository-Inhalte muessen auf Englisch, Deutsch oder in beiden Sprachen verfasst sein. Bitte keine privaten Briefings, Google-Drive-Exporte, Rohmedien, Zugangsdaten, lokalen Umgebungsdateien, proprietaeren Schriften, Stimmprofile oder erzeugten Release-Pakete einreichen.

Der Pre-Push-Hook blockiert aktuelle Repository-Dateien und gepushte Commit-Snapshots mit privaten Workspace-Pfaden, credential-aehnlichen Dateien, Rohmedien, privaten Dokumenten, erzeugten Archiven, proprietaeren Schriften, binaeren/uebergrossen Dateien, gaengigen Secret-Tokens oder lokalen Nutzerpfaden, bevor Git Objekte an ein Remote sendet.

## Lizenz

Apache-2.0.
