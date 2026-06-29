# 11 – Evaluation

## Ziel

Reproduzierbare, mehrdimensionale Bewertung des Frameworks. Es werden keine Ergebnisse erfunden; dieses Kapitel definiert das Evaluationsdesign und die Metriken. Konfiguration in `configs/evaluation.yaml`, Code in `src/rag_framework/evaluation/`, Auswertung in `notebooks/08_evaluation.ipynb`.

## Evaluationsdimensionen und Metriken

| Dimension | Metriken |
|-----------|----------|
| Ingestion-Qualität | Vollständigkeit, Normalisierungsfehlerrate, Metadatenabdeckung |
| Chunking-Qualität | Kohärenz, Granularität, Redundanz |
| Retrieval | Recall@k, Precision@k, MRR, nDCG |
| Antwortqualität | Faithfulness, Answer Relevancy, Context Recall |
| Provenance | Zitierfähigkeit, Quellenabdeckung, Korrektheit der Belege |
| Agentenmetriken | Tool-Erfolg, Planungsgüte, Quellenbindung |
| Prognosemetriken | MAE, RMSE, MAPE, Directional Accuracy |
| Systemmetriken | Latenz, Kosten, Robustheit, Reproduzierbarkeit |

## Goldstandard

Goldstandard-Fragen und -Antworten liegen unter `data/gold_standard/` und dienen als Referenz für Retrieval- und Antwortmetriken.

## Vorgehen

1. Festlegung der Testfälle und Goldstandard-Daten.
2. Ausführung der Pipeline mit fixierter Konfiguration.
3. Berechnung der Metriken je Dimension.
4. Dokumentation und Diskussion der Ergebnisse in der Masterarbeit.

## Reproduzierbarkeit

Feste Abhängigkeiten, deklarative Konfiguration, dokumentierte Seeds und CI-Workflows (`.github/workflows/`) sichern Wiederholbarkeit.

> Diese Datei definiert das Evaluationsdesign. Konkrete Messwerte entstehen erst bei Ausführung und werden nicht vorweggenommen.
