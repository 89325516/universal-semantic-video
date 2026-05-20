# Acceptance Criteria

## English

The first public scaffold is accepted when:

1. The repository contains only public-safe English and German content.
2. No private source brief, Google Drive export, credential, raw media, proprietary font, voice profile, or local environment file is committed.
3. `docs/` contains BRD, MRD, PRD, TRD, DesignSpec, and TestCase documents.
4. A first-release design document exists under `docs/design/`.
5. `schema/usv.schema.json` defines the USV sidecar contract.
6. At least one valid USV example exists under `examples/`.
7. At least one invalid USV example exists under `examples/invalid/`.
8. The CLI validates a USV JSON file against the schema.
9. The CLI exits `0` for the valid example.
10. The CLI exits non-zero for the invalid example.
11. Automated tests cover valid and invalid validation behavior.
12. `npm run check` completes successfully.
13. README explains project purpose, scope, validation command, and contribution path.
14. The first scaffold does not include network services, databases, video transcoding, cloud integration, AI inference, or editor UI.

## Deutsch

Das erste oeffentliche Grundgeruest ist akzeptiert, wenn:

1. Das Repository nur oeffentlich sichere Inhalte auf Englisch und Deutsch enthaelt.
2. Keine privaten Quellnotizen, Google-Drive-Exporte, Zugangsdaten, Rohmedien, proprietaeren Schriften, Stimmprofile oder lokalen Umgebungsdateien committed sind.
3. `docs/` BRD, MRD, PRD, TRD, DesignSpec und TestCase enthaelt.
4. Ein Design-Dokument fuer den ersten Release unter `docs/design/` existiert.
5. `schema/usv.schema.json` den USV-Sidecar-Vertrag definiert.
6. Mindestens ein gueltiges USV-Beispiel unter `examples/` existiert.
7. Mindestens ein ungueltiges USV-Beispiel unter `examples/invalid/` existiert.
8. Die CLI eine USV-JSON-Datei gegen das Schema validiert.
9. Die CLI fuer das gueltige Beispiel mit `0` endet.
10. Die CLI fuer das ungueltige Beispiel mit einem Fehlercode endet.
11. Automatisierte Tests gueltiges und ungueltiges Validierungsverhalten abdecken.
12. `npm run check` erfolgreich abgeschlossen wird.
13. README Zweck, Umfang, Validierungsbefehl und Beitragsweg erklaert.
14. Das erste Grundgeruest keine Netzwerkdienste, Datenbanken, Videotranscodierung, Cloud-Integration, KI-Inferenz oder Editor-UI enthaelt.
