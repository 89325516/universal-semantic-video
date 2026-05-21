# Contributing

## English

Contributions should keep the first-release scope small and verifiable. Public repository content must be written in English, German, or both. Do not submit private source documents, raw media, credentials, local environment files, proprietary fonts, voice profiles, or generated release packages.

Before opening a pull request, run:

```bash
npm run install-hooks
npm run check
```

`npm run install-hooks` configures this repository to use the versioned `.githooks/pre-push` hook. The hook runs the public-safety scanner before Git sends objects to a remote.

Changes that affect requirements, behavior, interfaces, state machines, or acceptance criteria must update the relevant document under `docs/` and the root `ACCEPTANCE.md` when needed.

## Deutsch

Beitraege sollen den Umfang klein und pruefbar halten. Oeffentliche Repository-Inhalte muessen auf Englisch, Deutsch oder in beiden Sprachen verfasst sein. Bitte keine privaten Quelldokumente, Rohmedien, Zugangsdaten, lokale Umgebungsdateien, proprietaere Schriften, Stimmprofile oder erzeugte Release-Pakete einreichen.

Vor einem Pull Request bitte ausfuehren:

```bash
npm run install-hooks
npm run check
```

`npm run install-hooks` konfiguriert dieses Repository fuer den versionierten `.githooks/pre-push`-Hook. Der Hook fuehrt den Public-Safety-Scanner aus, bevor Git Objekte an ein Remote sendet.

Aenderungen an Anforderungen, Verhalten, Schnittstellen, Zustandsmaschinen oder Abnahmekriterien muessen die passenden Dokumente unter `docs/` und bei Bedarf `ACCEPTANCE.md` aktualisieren.
