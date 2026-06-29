# 06 – Semantische Ingestion

## Ziel

Überführung heterogener Quellen in eine durchsuchbare semantische Repräsentation unter Erhalt von Herkunftsinformationen (Provenance).

## Pipeline

1. **Extraktion** – Inhalte und Struktur aus heterogenen Formaten gewinnen.
2. **Normalisierung** – Bereinigung, Vereinheitlichung, Sprach- und Encoding-Behandlung.
3. **Metadaten-Anreicherung** – Quelle, Zeitstempel, Abschnittsbezug, Vertrauensindikatoren.
4. **Chunking** – Segmentierung nach gewählter Strategie (siehe `configs/chunking.yaml`).
5. **Embedding** – Vektorisierung der Chunks (siehe `configs/ingestion.yaml`).

## Chunking-Strategien

Die Auswahl der Strategie (u. a. fixed-size, satz-/absatzbasiert, semantisch, hierarchisch) beeinflusst Retrieval-Qualität und wird in `notebooks/03_chunking_experiments.ipynb` verglichen. Eine interaktive Übersicht bietet `chunking-viz/`.

## Embeddings

Konfigurierbare Embedding-Modelle; Normalisierung und Dimensionalität werden dokumentiert. Implementierung in `src/rag_framework/embeddings/`.

## Provenance

Jeder Chunk wird mit Herkunftsmetadaten versehen, um Zitierfähigkeit und Nachvollziehbarkeit im Retrieval zu gewährleisten (vertieft in `07_vektordatenbank_wissensorganisation.md`).

## Code- und Konfigurationsbezug

- Code: `src/rag_framework/ingestion/`, `src/rag_framework/chunking/`, `src/rag_framework/embeddings/`
- Konfiguration: `configs/ingestion.yaml`, `configs/chunking.yaml`

> Diese Datei dokumentiert das Ingestion-Konzept; Parameter und Implementierung werden in Code und Konfiguration gepflegt.
