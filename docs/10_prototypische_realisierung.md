# 10 – Prototypische Realisierung

## Überblick

Der Prototyp setzt die Architektur aus Kapitel 04 modular um. Produktivcode liegt im Package `src/rag_framework/`; Experimente in `notebooks/`; Konfiguration in `configs/`.

## Module

| Modul | Verantwortung |
|-------|---------------|
| `ingestion` | Extraktion, Normalisierung, Metadaten |
| `chunking` | Segmentierungsstrategien |
| `embeddings` | Vektorisierung |
| `retrieval` | Abruf und Re-Ranking |
| `vectorstore` | Vektordatenbank-Anbindung |
| `knowledge` | Provenance, Source Trust |
| `agents` | Orchestrierung, Tools |
| `forecasting` | Prognose exogener Faktoren |
| `evaluation` | Metriken |
| `api` | Schnittstellen |
| `utils` | Hilfsfunktionen |

## Schnittstellen

Eine optionale API-Schicht (`src/rag_framework/api/`) kapselt Kernfunktionen. Infrastruktur (z. B. Vektor-DB) wird über `docker-compose.yml` bereitgestellt.

## Lauf- und Ausführungsumgebung

Reproduzierbare Ausführung über `requirements.txt`/`pyproject.toml`. Schwere Verarbeitung erfolgt außerhalb von GitHub (siehe `05_datenbasis_vorverarbeitung.md`).

## Implementierungsstand

Nicht vollständig implementierte Funktionen sind im Code als `TODO` mit Docstrings markiert. Es wird keine Scheinfunktionalität vorgetäuscht.

> Diese Datei dokumentiert die prototypische Realisierung; der aktuelle Stand ergibt sich aus dem Code.
