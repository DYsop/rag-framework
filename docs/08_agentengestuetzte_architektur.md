# 08 – Agentengestützte Architektur

## Ziel

Eine mehrstufige, agentengestützte Orchestrierung soll komplexe Analysefragen besser beantworten als ein einstufiger RAG-Durchlauf – unter Beibehaltung von Quellenbindung und Nachvollziehbarkeit.

## Reasoning-Pipeline

1. **Zielverständnis** – Interpretation der Anfrage, Zerlegung in Teilfragen.
2. **Retrieval** – semantische Suche und Kontextauswahl gegen die Wissensbasis.
3. **Reasoning** – Schlussfolgerung und Synthese über mehrere Schritte/Tools.
4. **Antwortgenerierung** – begründete, nachvollziehbare und quellenbindende Antwort.

## Werkzeuge (Tools)

Definierte Werkzeuge (z. B. Retrieval, Prognose, Berechnung) werden über eine Tool-Schnittstelle eingebunden. Konfiguration in `configs/agents.yaml`, Implementierung in `src/rag_framework/agents/`.

## Quellenbindung und Governance

Jeder Reasoning-Schritt referenziert die genutzten Quellen. Zugriffsrechte, Compliance und Audit werden konzeptionell berücksichtigt.

## Bezug zu den Forschungsfragen

Dieses Kapitel adressiert primär FF2 (Mehrwert agentengestützter Orchestrierung) und FF1 (Nachvollziehbarkeit).

> Diese Datei dokumentiert die Agentenarchitektur auf konzeptioneller Ebene; Verhalten und Tools werden im Code und in `configs/agents.yaml` konkretisiert.
