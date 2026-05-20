# USV MVP Foundation Design

## English

### Problem Definition

USV needs a public first step that is useful to implementers without pretending to solve video analysis, rendering, or standards registration on day one.

### Options

| Option | Decision | Reason |
| --- | --- | --- |
| Custom video container | Reject | Too costly and conflicts with existing ecosystems. |
| Sidecar JSON first | Accept | Low adoption cost, easy validation, easy rollback. |
| Full AI converter | Reject for MVP | Requires models, media pipelines, review UI, and rights workflows. |
| Validator and examples | Accept | Gives contributors an executable contract. |

### Validation State Machine

```text
idle -> reading_input -> loading_schema -> validating -> success
idle -> reading_input -> system_error
reading_input -> loading_schema -> system_error
validating -> validation_failed
validating -> system_error
```

Side effects:

- `success`: print success and exit `0`.
- `validation_failed`: print schema errors and exit `1`.
- `system_error`: print operational error and exit `2`.

### Impact

This scaffold affects only repository documents, schema, examples, CLI validation, and tests. It does not affect deployment, media processing, user permissions, or hosted infrastructure.

### Rollback

Remove the initial files or revert the first scaffold commit. No external service or data migration is involved.

### Primitive Acceptance

- A valid sidecar is observable as CLI success.
- An invalid sidecar is observable as CLI validation failure.
- The schema can be read without private source material.
- The first release does not require network access at runtime.

## Deutsch

### Problemdefinition

USV braucht einen oeffentlichen ersten Schritt, der fuer Implementierende nuetzlich ist, ohne am ersten Tag Videoanalyse, Rendering oder Standardregistrierung vorzugeben.

### Optionen

| Option | Entscheidung | Grund |
| --- | --- | --- |
| Eigener Videocontainer | Ablehnen | Zu teuer und im Konflikt mit bestehenden Oekosystemen. |
| Sidecar JSON zuerst | Annehmen | Niedrige Einstiegskosten, einfache Validierung, einfacher Rollback. |
| Voller KI-Konverter | Fuer MVP ablehnen | Erfordert Modelle, Medienpipelines, Review-UI und Rechteprozesse. |
| Validator und Beispiele | Annehmen | Liefert einen ausfuehrbaren Vertrag fuer Beitragende. |

### Validierungs-Zustandsmaschine

```text
idle -> reading_input -> loading_schema -> validating -> success
idle -> reading_input -> system_error
reading_input -> loading_schema -> system_error
validating -> validation_failed
validating -> system_error
```

Side Effects:

- `success`: Erfolg ausgeben und mit `0` enden.
- `validation_failed`: Schemafehler ausgeben und mit `1` enden.
- `system_error`: operativen Fehler ausgeben und mit `2` enden.

### Wirkung

Dieses Grundgeruest betrifft nur Dokumente, Schema, Beispiele, CLI-Validierung und Tests. Es betrifft keine Bereitstellung, Medienverarbeitung, Benutzerrechte oder gehostete Infrastruktur.

### Rollback

Die initialen Dateien entfernen oder den ersten Scaffold-Commit zuruecknehmen. Es gibt keinen externen Dienst und keine Datenmigration.

### Primitive Abnahme

- Ein gueltiges Sidecar ist als CLI-Erfolg beobachtbar.
- Ein ungueltiges Sidecar ist als CLI-Validierungsfehler beobachtbar.
- Das Schema ist ohne privates Quellmaterial lesbar.
- Der erste Release braucht zur Laufzeit keinen Netzwerkzugriff.
