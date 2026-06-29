# Datenhinweise

Dieses Verzeichnis dokumentiert die Datenstrategie des Frameworks. Es enthält bewusst **keine** echten großen Rohdaten, keine vertraulichen und keine urheberrechtlich problematischen Dokumente.

## Welche Daten lokal erwartet werden

Die eigentlichen Quelldaten (z. B. Dokumente, Exporte aus ERP/CRM, externe Datensätze) werden **lokal** bereitgestellt und liegen außerhalb von Git. Sie werden in `data/raw/` abgelegt und durch die Ingestion verarbeitet.

## Ordnerstruktur

```text
data/
├── README.md          # diese Datei (versioniert)
├── raw/               # Originaldokumente / Quelldaten (NICHT versioniert)
├── interim/           # Zwischenstände der Verarbeitung (NICHT versioniert)
├── processed/         # verarbeitete Daten / Indizes (NICHT versioniert)
├── external/          # extern bezogene Datensätze (NICHT versioniert)
├── sample/            # kleine Beispiel-/synthetische Daten (versioniert)
└── gold_standard/     # Goldstandard-Fragen/-Antworten (versioniert)
```

## Was NICHT in Git gespeichert wird

`data/raw/`, `data/interim/`, `data/processed/` und `data/external/` sind in `.gitignore` ausgeschlossen. Versioniert werden ausschließlich `data/README.md`, `data/sample/` und `data/gold_standard/` – und auch dort nur kleine, unkritische Dateien.

## Trennung der Datenebenen

- **Rohdaten** (`raw/`): unverändert, lokal, nicht versioniert.
- **Verarbeitete Daten** (`processed/`, `interim/`): abgeleitet, reproduzierbar, nicht versioniert.
- **Goldstandard** (`gold_standard/`): kuratierte Referenz für die Evaluation, versioniert.
- **Beispieldaten** (`sample/`): kleine, synthetische Beispiele für Demos/Tests, versioniert.

## Anbindung externer Datenquellen / Downloads

Größere oder geschützte Daten werden nicht im Repository abgelegt, sondern über eine externe Quelle bezogen (z. B. NAS, Objektspeicher, interne Freigabe oder eine Landing Page mit Downloadhinweis). Empfohlen wird ein dokumentierter, manueller Bezug in `data/raw/`; automatische Downloads werden nicht erzwungen.

## Architekturgrenze

Die Verarbeitung großer/geschützter Dokumente läuft außerhalb von GitHub (lokal, NAS, Docker, JupyterLab, Codespaces). GitHub enthält Code, Konfiguration, Dokumentation, kleine Testdaten und reproduzierbare Notebooks.
