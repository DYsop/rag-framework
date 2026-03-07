# 🤖 RAG-Framework
> Architekturzentrierte Konzeption eines intelligenten, agentengestützten  
> Retrieval-Augmented-Generation-Frameworks zur automatisierten Analyse  
> von Unternehmensdaten

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
├── configs/                    # Konfigurationen
│   ├── chunking.yaml
│   ├── embeddings.yaml
│   └── agents.yaml
│
├── docs/                       # Dokumentation
│   └── images/
│
├── .env.example                # Vorlage für Umgebungsvariablen
├── .gitignore
├── docker-compose.yml
├── requirements.txt
└── README.md
```

---

## Setup

### 1. Repository klonen
```bash
git clone <repository-url>
cd rag-framework
```

### 2. Environment erstellen
```bash
conda create -n rag-framework python=3.11
conda activate rag-framework
pip install -r requirements.txt
```

### 3. Umgebungsvariablen setzen
```bash
cp .env.example .env
# .env öffnen und API-Keys eintragen
```

### 4. Jupyter Kernel registrieren
```bash
python -m ipykernel install --user --name rag-framework
```

---

## Wissenschaftlicher Fokus

| Thema | Methoden |
|---|---|
| **Chunking** | Recursive, Sentence-Boundary, Semantic, Hierarchical |
| **Embedding** | BGE-M3, OpenAI text-embedding-3, MiniLM |
| **RAG** | Naïve → Advanced → Modular RAG |
| **GraphRAG** | Neo4j, Entity-Linking, Community Detection |
| **Agents** | ReAct, CoT, Multi-Agent (AutoGen/CrewAI) |

---

## Technologie-Stack

- **LLM:** OpenAI GPT-4o / Anthropic Claude
- **Embeddings:** BGE-M3 (lokal) / OpenAI (Cloud)
- **Vektordatenbank:** Qdrant
- **Wissensgraph:** Neo4j
- **Framework:** LangChain / LlamaIndex
- **Agenten:** AutoGen / CrewAI
- **Backend:** FastAPI
- **Frontend:** React + Three.js (3D Avatar)
