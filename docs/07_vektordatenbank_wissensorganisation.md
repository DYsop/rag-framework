# 07 – Vektordatenbank und Wissensorganisation

## Vektordatenbank

Speicherung und Abruf der Chunk-Embeddings über eine konfigurierbare Vektordatenbank (siehe `configs/vectorstore.yaml`). Themen: Indexstruktur, ANN-Suche, Metadatenfilterung und Hybrid-Retrieval.

## Retrieval

Abrufstrategien (dense, sparse, hybrid), Re-Ranking und Kontextauswahl. Konfiguration in `configs/retrieval.yaml`, Implementierung in `src/rag_framework/retrieval/` und `src/rag_framework/vectorstore/`.

## Wissensorganisation

Strukturierung der erschlossenen Inhalte (z. B. Ontologien/Taxonomien, Fakten und Beziehungen). Ziel ist eine vernetzte, versionierbare Wissensbasis.

## Provenance und Source Trust

- **Provenance:** lückenlose Herkunftskette von der Antwort bis zur Quelle.
- **Source Trust:** Bewertung der Vertrauenswürdigkeit von Quellen als Retrieval-Signal.
- **Zitierfähigkeit:** belegbare Antworten mit nachvollziehbaren Quellenangaben.

Implementierung in `src/rag_framework/knowledge/`.

## Qualität und Governance

Versionierung, Zugriffs- und Compliance-Aspekte werden konzeptionell adressiert; sicherheitsrelevante Aktionen liegen außerhalb des öffentlichen Repositories.

> Diese Datei dokumentiert das Konzept zu Vektordatenbank, Wissensorganisation und Provenance.
