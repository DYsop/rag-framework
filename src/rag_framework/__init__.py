"""rag_framework – Agentengestütztes RAG-Framework.

Technisches Forschungsartefakt zur Masterarbeit zur semantischen Erschließung
heterogener Unternehmensinformationen und prognoseorientierten Modellierung
exogener Einflussgrößen.

Das Package ist modular nach Verantwortlichkeiten gegliedert:

- ingestion:   Semantische Ingestion (Extraktion, Normalisierung, Metadaten)
- chunking:    Chunking-Strategien
- embeddings:  Embedding-Modelle
- retrieval:   Retrieval-Logik
- vectorstore: Anbindung der Vektordatenbank
- knowledge:   Wissensorganisation, Provenance, Source Trust
- agents:      Agentengestützte Orchestrierung
- forecasting: Prognosemodellierung exogener Einflussgrößen
- evaluation:  Evaluationsmetriken
- api:         Schnittstellen
- utils:       Hilfsfunktionen

Hinweis: Noch nicht vollständig implementierte Funktionen sind mit TODO
gekennzeichnet. Es wird keine Scheinfunktionalität vorgetäuscht.
"""

__version__ = "0.1.0"

__all__ = [
    "ingestion",
    "chunking",
    "embeddings",
    "retrieval",
    "vectorstore",
    "knowledge",
    "agents",
    "forecasting",
    "evaluation",
    "api",
    "utils",
]
