# 04 – Forschungsdesign und Architektur

## Forschungsdesign

Die Arbeit folgt einem gestaltungsorientierten Ansatz (Design Science): Konzeption eines Artefakts, prototypische Realisierung und Evaluation entlang definierter Metriken. Die Forschungsfragen FF1–FF4 strukturieren Entwurf und Bewertung.

## Anforderungen

**Funktional:** Ingestion heterogener Quellen, Chunking/Embedding, Retrieval mit Provenance, agentengestütztes Reasoning, Prognose exogener Faktoren, Evaluation.

**Nicht-funktional:** Reproduzierbarkeit, Modularität, Nachvollziehbarkeit, Datensparsamkeit (keine vertraulichen/großen Rohdaten im Repository), Konfigurierbarkeit über YAML.

## Architekturüberblick

Drei Wirkungsbereiche (vgl. Coverabbildung und README):

1. Heterogene Unternehmensinformationen → Ingestion & Normalisierung.
2. Semantische Erschließung & agentengestütztes Reasoning → Repräsentation, Orchestrierung, Wissensbasis.
3. Exogene Einflussgrößen → Modellierung, Prognose, Evaluation.

## Komponenten und Mapping auf den Code

| Komponente | Modul |
|-----------|-------|
| Ingestion | `src/rag_framework/ingestion/` |
| Chunking | `src/rag_framework/chunking/` |
| Embeddings | `src/rag_framework/embeddings/` |
| Retrieval | `src/rag_framework/retrieval/` |
| Vektordatenbank | `src/rag_framework/vectorstore/` |
| Wissensorganisation | `src/rag_framework/knowledge/` |
| Agenten | `src/rag_framework/agents/` |
| Prognose | `src/rag_framework/forecasting/` |
| Evaluation | `src/rag_framework/evaluation/` |

## Datenfluss

Quelle → Ingestion/Normalisierung → Chunking → Embedding → Vektorindex (+ Provenance) → Retrieval → Agenten-Reasoning → Antwort/Prognose → Evaluation.

## Architekturdiagramme

Diagramme werden unter `assets/diagrams/` abgelegt.

> Diese Datei dokumentiert Designentscheidungen auf konzeptioneller Ebene.
