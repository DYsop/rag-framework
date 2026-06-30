# Pipeline-Lauf `20260630_233607`

Dokumentation eines konkreten Laufs der Vorverarbeitungs-Pipeline
(PDF-Inventarisierung und Metadatenextraktion).

## Eckdaten

| Feld     | Wert                                                          |
|----------|---------------------------------------------------------------|
| Run-ID   | `20260630_233607`                                             |
| Zweck    | Erzeugung eines qualitaetsgesicherten Dokumentinventars aus dem Bundesanzeiger-PDF-Korpus |
| Pipeline | `v4.0-docling` (Docling-basiert, pypdf-Fallback)              |

## Eingabe

Lokaler **Bundesanzeiger-PDF-Korpus** unter `data/raw/`, fachlich gruppiert
(Rechnungslegung/Finanzberichte, Kapitalmarkt, Gesellschaftsbekanntmachungen).
Die **Roh-PDFs sind nicht enthalten** und werden aus rechtlichen und technischen
Gruenden nicht versioniert.

## Ausgabe

Das **vollstaendige Inventar** (CSV/XLSX/Parquet) sowie die Ground-Truth-Vorlage
werden **nicht regulaer versioniert** und verbleiben lokal unter
`data/processed/`. In diesem Archiv sind folgende Artefakte enthalten:

### Uebernommene Ergebnisartefakte

| Datei                                    | Rolle                                    |
|------------------------------------------|------------------------------------------|
| `run_metadata_20260630_233607.json`      | Konfiguration, Versionsstand, Kennzahlen |
| `evaluation_report_20260630_233607.json` | Ground-Truth-Evaluation                  |
| `inventory_errors_20260630_233607.csv`   | Fehlerprotokoll des Quality Gate         |

### Zugehoerige Abbildungen (`figures/`)

| Datei                                             |
|---------------------------------------------------|
| `01_dashboard_uebersicht_20260630_233607.png`     |
| `02_erweiterte_analyse_20260630_233607.png`       |
| `03_dashboard_detail_20260630_233607.png`         |
| `04_ground_truth_evaluation_20260630_233607.png`  |
| `05_executive_summary_20260630_233607.png`        |
| `06_verarbeitungsfortschritt_20260630_233607.png` |
| `07_inventar_kpi_20260630_233607.png`             |

## Kapitelbezug

- **Kapitel 5 – Datenbasis und Vorverarbeitung:** Korpusbildung, PDF-Erfassung,
  Metadatenextraktion, Klassifikation, Deduplizierung, Qualitaetssicherung und
  Inventarbildung.
- **Kapitel 11 – Evaluation:** Ground-Truth-Abgleich der Metadatenextraktion
  (`evaluation_report`).

## Hinweise

- Roh-PDFs sind nicht Teil dieses Archivs.
- Das vollstaendige Inventar wird nicht regulaer versioniert; es verbleibt als
  lokales Forschungsartefakt.
