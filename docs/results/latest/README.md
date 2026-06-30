# Aktueller Lauf (`docs/results/latest/`)

`latest/` enthaelt **ausgewaehlte Ergebnisartefakte des aktuell referenzierten
Pipeline-Laufs** und dient der schnellen Orientierung im Repository.

- Aktuell referenzierter Lauf: **`20260630_233607`**
- Vollstaendige Daten bleiben **lokal** (`data/processed/`) und werden nicht
  versioniert.
- AEltere oder konkrete Laeufe liegen vollstaendig archiviert unter
  [`../runs/`](../runs/).

## Enthaltene Artefakte

| Datei                                    | Zweck                                  |
|------------------------------------------|----------------------------------------|
| `run_metadata_20260630_233607.json`      | Konfiguration und Kennzahlen des Laufs |
| `evaluation_report_20260630_233607.json` | Ground-Truth-Evaluation (Kapitel 11)   |
| `inventory_errors_20260630_233607.csv`   | Fehlerprotokoll des Quality Gate       |
| `figures/`                               | Ausgewaehlte Ergebnisgrafiken          |

Das vollstaendige Inventar (CSV/XLSX/Parquet) ist bewusst **nicht** enthalten;
es verbleibt als lokales Forschungsartefakt unter `data/processed/`.
