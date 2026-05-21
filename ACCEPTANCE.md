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
9. The CLI creates a valid starter sidecar without overwriting an existing file.
10. The CLI summarizes a valid USV JSON file.
11. The CLI checks core conformance for schema-valid sidecars.
12. At least one audio-visual semantic example exists under `examples/lite/`.
13. At least one schema-valid but conformance-invalid example exists under `examples/invalid/`.
14. The CLI exits `0` for the valid examples.
15. The CLI exits non-zero for schema-invalid and conformance-invalid examples.
16. Automated tests cover valid validation, invalid validation, starter creation, no-overwrite behavior, inspection behavior, core conformance, and broken-reference behavior.
17. `npm run check` completes successfully.
18. `npm run check` includes the public-safety scan for current repository files and pushed commit snapshots with private paths, credential-like paths, raw media, private documents, generated archives, binary files, oversized files, common secret tokens, and local user paths.
19. A versioned pre-push hook runs the same public-safety scan before Git pushes objects.
20. `.gitignore` excludes local private workspace, credential, raw media, proprietary font, and generated package paths.
21. README explains project purpose, scope, commands, standards posture, roadmap, and contribution path.
22. `docs/` contains architecture, standards, roadmap, traceability, risk, evidence, profile, and conformance documents.
23. The first scaffold does not include network services, databases, video transcoding, cloud integration, AI inference, or editor UI.

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
9. Die CLI ein gueltiges Starter-Sidecar erzeugt, ohne eine bestehende Datei zu ueberschreiben.
10. Die CLI eine gueltige USV-JSON-Datei zusammenfasst.
11. Die CLI Core-Conformance fuer schema-gueltige Sidecars prueft.
12. Mindestens ein audio-visuelles semantisches Beispiel unter `examples/lite/` existiert.
13. Mindestens ein schema-gueltiges, aber conformance-ungueltiges Beispiel unter `examples/invalid/` existiert.
14. Die CLI fuer die gueltigen Beispiele mit `0` endet.
15. Die CLI fuer schema-ungueltige und conformance-ungueltige Beispiele mit Fehlercode endet.
16. Automatisierte Tests gueltige Validierung, ungueltige Validierung, Starter-Erzeugung, No-Overwrite-Verhalten, Inspektion, Core-Conformance und Broken-Reference-Verhalten abdecken.
17. `npm run check` erfolgreich abgeschlossen wird.
18. `npm run check` den Public-Safety-Scan fuer aktuelle Repository-Dateien und gepushte Commit-Snapshots mit privaten Pfaden, credential-aehnlichen Pfaden, Rohmedien, privaten Dokumenten, erzeugten Archiven, binaeren Dateien, uebergrossen Dateien, gaengigen Secret-Tokens und lokalen Nutzerpfaden enthaelt.
19. Ein versionierter Pre-Push-Hook denselben Public-Safety-Scan ausfuehrt, bevor Git Objekte pushed.
20. `.gitignore` lokale private Workspaces, Zugangsdaten, Rohmedien, proprietaere Schriften und erzeugte Paketpfade ausschliesst.
21. README Zweck, Umfang, Befehle, Standards-Position, Roadmap und Beitragsweg erklaert.
22. `docs/` Architektur-, Standards-, Roadmap-, Traceability-, Risiko-, Evidenz-, Profil- und Conformance-Dokumente enthaelt.
23. Das erste Grundgeruest keine Netzwerkdienste, Datenbanken, Videotranscodierung, Cloud-Integration, KI-Inferenz oder Editor-UI enthaelt.
