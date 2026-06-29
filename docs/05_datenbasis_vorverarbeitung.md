# 05 – Datenbasis und Vorverarbeitung

## Datenbasis

Das Framework adressiert heterogene Unternehmensinformationen: strukturierte Daten, unstrukturierte Dokumente, interne Kommunikation, externe Quellen sowie Sensor-/IoT-Daten. Im Repository werden ausschließlich kleine Beispiel-, synthetische Test- und Goldstandard-Daten geführt.

## Datenstrategie und Grenzen

- Keine echten großen Rohdaten, keine vertraulichen oder urheberrechtlich problematischen Dokumente im Repository.
- `data/raw/`, `data/processed/`, `data/interim/` und `data/external/` werden nicht versioniert (siehe `.gitignore`).
- Versioniert werden nur `data/sample/`, `data/gold_standard/` und `data/README.md`.

## Trennung der Datenebenen

| Ebene | Ort | Versioniert |
|-------|-----|-------------|
| Rohdaten | `data/raw/` | nein |
| Verarbeitete Daten | `data/processed/` | nein |
| Beispieldaten | `data/sample/` | ja (klein) |
| Goldstandard | `data/gold_standard/` | ja |

## Vorverarbeitung

Extraktion, Bereinigung, Normalisierung und Metadaten-Anreicherung. Details der Implementierung liegen in `src/rag_framework/ingestion/`, Parameter in `configs/ingestion.yaml`.

## Ausführungsumgebung

Die Verarbeitung großer oder geschützter Dokumente erfolgt außerhalb von GitHub (lokal, NAS, Docker, JupyterLab, Codespaces). Anbindung externer Datenquellen und optionaler Downloads ist in `data/README.md` beschrieben.

> Diese Datei dokumentiert die Datenstrategie. Es werden keine echten Unternehmensdaten erzeugt.
