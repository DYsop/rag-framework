# RAG Intelligence Platform

Agentengestütztes RAG-Framework zur automatisierten Analyse von Unternehmensdaten mit dynamischer Anbindung externer Datenquellen.

## 🔍 Chunking-Strategien — Interaktive Visualisierung

> **[→ Alle 20 Chunking-Strategien interaktiv erkunden](https://dysop.github.io/rag-framework/)**

Lokal starten:
```bash
cd chunking-viz
npm install
npm run dev
```

---

## Projektstruktur

```
rag-framework/
│
├── notebooks/                  # Experimentier-Umgebung (Jupyter)
│   ├── 01_chunking_embedding.ipynb
│   ├── 02_advanced_rag.ipynb
│   ├── 03_graphrag.ipynb
│   └── 04_agents.ipynb
│
├── src/                        # Produktivcode
│   ├── ingestion/              # Chunking & Embedding
│   │   ├── __init__.py
│   │   ├── chunker.py
│   │   └── embedder.py
│   ├── retrieval/              # RAG & GraphRAG
│   │   ├── __init__.py
│   │   ├── rag_pipeline.py
│   │   └── graph_rag.py
│   ├── agents/                 # Agenten-Framework
│   │   ├── __init__.py
│   │   ├── react_agent.py
│   │   └── tools.py
│   ├── api/                    # FastAPI Backend
│   │   ├── __init__.py
│   │   └── main.py
│   └── graph/                  # Neo4j Interface
│       ├── __init__.py
│       └── knowledge_graph.py
│
├── tests/                      # Unit & Integration Tests
│   ├── test_chunker.py
│   ├── test_embedder.py
│   └── test_rag_pipeline.py
│
├── data/                       # ⚠️ nicht in Git (siehe .gitignore)
│   ├── raw/                    # Originaldokumente
│   ├── processed/              # Verarbeitete Daten
│   └── gold_standard/          # Test-Datensätze (in Git)
│
├── docs/
│   └── grafiken/               # Statische PNG-Grafiken (Thesis)
│
├── chunking-viz/               # Interaktive Chunking-Visualisierung
│   ├── src/App.jsx             # Alle 20 Strategien
│   ├── package.json
│   └── README.md
│
├── configs/
├── frontend/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── requirements.txt
└── start.bat
```

## Quickstart

```bash
# Python-Abhängigkeiten
pip install -r requirements.txt

# Services starten (Qdrant, Neo4j, Elasticsearch)
docker-compose up -d

# API starten
uvicorn src.api.main:app --reload

# Oder alles auf einmal (Windows)
start.bat
```

## Konfiguration

Kopiere `.env.example` → `.env` und trage deine Werte ein:

```bash
cp .env.example .env
```

## Tests

```bash
pytest tests/
```
