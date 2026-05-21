# Requirements Traceability Matrix

## English

| Requirement | Evidence | Test |
| --- | --- | --- |
| Public-safe bilingual repository content | `.gitignore`, `SECURITY.md`, `CONTRIBUTING.md`, `ACCEPTANCE.md` | Repository scans before release |
| Sidecar schema exists | `schema/usv.schema.json` and `schema/defs/` | `npm run check` |
| Valid example exists | `examples/lite/airport-scene.usv.json` | `TC-001`, `TC-003`, `TC-007` |
| Invalid example exists | `examples/invalid/missing-version.usv.json` | `TC-002`, `TC-004` |
| CLI validates sidecars | `src/cli.ts`, `src/validation.ts` | `TC-003`, `TC-004` |
| CLI creates starter sidecars | `src/template.ts`, `src/cli.ts` | `TC-006` |
| CLI preserves existing files during starter creation | `src/cli.ts` | `TC-007` |
| CLI summarizes valid sidecars | `src/summary.ts`, `src/cli.ts` | `TC-008` |
| Standards posture is documented | `docs/STANDARDS.md` | Documentation review |
| Architecture and state machine are documented | `docs/ARCHITECTURE.md`, `docs/design/developer-adoption-cli.md` | Documentation review |
| Full check passes | `package.json` scripts | `TC-005` |

## Deutsch

| Anforderung | Nachweis | Test |
| --- | --- | --- |
| Oeffentlich sichere zweisprachige Repository-Inhalte | `.gitignore`, `SECURITY.md`, `CONTRIBUTING.md`, `ACCEPTANCE.md` | Repository-Scans vor Release |
| Sidecar-Schema existiert | `schema/usv.schema.json` und `schema/defs/` | `npm run check` |
| Gueltiges Beispiel existiert | `examples/lite/airport-scene.usv.json` | `TC-001`, `TC-003`, `TC-007` |
| Ungueltiges Beispiel existiert | `examples/invalid/missing-version.usv.json` | `TC-002`, `TC-004` |
| CLI validiert Sidecars | `src/cli.ts`, `src/validation.ts` | `TC-003`, `TC-004` |
| CLI erzeugt Starter-Sidecars | `src/template.ts`, `src/cli.ts` | `TC-006` |
| CLI erhaelt bestehende Dateien bei Starter-Erzeugung | `src/cli.ts` | `TC-007` |
| CLI fasst gueltige Sidecars zusammen | `src/summary.ts`, `src/cli.ts` | `TC-008` |
| Standards-Position ist dokumentiert | `docs/STANDARDS.md` | Dokumentenreview |
| Architektur und Zustandsmaschine sind dokumentiert | `docs/ARCHITECTURE.md`, `docs/design/developer-adoption-cli.md` | Dokumentenreview |
| Voller Check besteht | `package.json`-Skripte | `TC-005` |
