# Ergebnisartefakte (`docs/results/`)

> Das Repository versioniert ausgewaehlte Ergebnisberichte und Abbildungen,
> nicht jedoch den vollstaendigen Datenkoerper.

Dieses Verzeichnis dokumentiert ausgewaehlte, reproduzierbare Ergebnisartefakte
der Vorverarbeitungs-Pipeline. Es trennt bewusst zwischen dem, was in Git
gehoert, und dem, was als lokales Forschungsartefakt verbleibt.

## In Git versioniert

- **Run-Metadaten** (`run_metadata_*.json`) – dokumentieren Konfiguration,
  Versionsstand und Kennzahlen eines Laufs und sichern Reproduzierbarkeit.
- **Evaluation-Reports** (`evaluation_report_*.json`) – dokumentieren den
  Ground-Truth-Abgleich der Metadatenextraktion (Kapitel 11).
- **Fehlerdateien** (`inventory_errors_*.csv`) – dokumentieren nicht oder
  fehlerhaft verarbeitete Dokumente und machen die Qualitaetssicherung
  transparent.
- **Ausgewaehlte Abbildungen** (`figures/*.png`) – kompakte, hochaufloesende
  Ergebnisgrafiken zur Korpus-, Qualitaets- und Prozessdokumentation.

## Nicht in Git versioniert

- Das **vollstaendige Dokumentinventar** (CSV/XLSX/Parquet) – ein **lokales
  Forschungsartefakt**, das umfangreiche Dokumentmetadaten und potenziell lokale
  Pfade enthaelt und fuer die Git-Versionierung ungeeignet ist.
- Die **Ground-Truth-Vorlage** (XLSX) – Arbeitsartefakt, lokal gehalten.
- **Roh-PDFs** – aus rechtlichen und technischen Gruenden ausgeschlossen.

## Struktur

```
docs/results/
├── README.md
├── latest/                 # ausgewaehlte Artefakte des aktuell referenzierten Laufs
│   ├── README.md
│   ├── run_metadata_*.json
│   ├── evaluation_report_*.json
│   ├── inventory_errors_*.csv
│   └── figures/
└── runs/                   # vollstaendiges Archiv je konkretem Lauf
    └── 20260630_233607/
```

## Rollen der Artefakte

| Artefakt                | Rolle                                                     |
|-------------------------|-----------------------------------------------------------|
| Run-Metadaten           | Reproduzierbarkeit, Provenance, Konfigurationsnachweis    |
| Evaluation-Report       | Qualitaetsnachweis der Extraktion (Ground-Truth-Abgleich) |
| `inventory_errors`      | Transparenz ueber Verarbeitungsfehler und Quality Gate    |
| Abbildungen             | Korpus-, Qualitaets- und Prozessdokumentation             |
| Vollstaendiges Inventar | Lokales Forschungsartefakt (nicht versioniert)            |
