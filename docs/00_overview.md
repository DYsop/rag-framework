# 00 – Überblick

Dieses Verzeichnis enthält die Dokumentation des Forschungsartefakts entlang der Kapitel- und Forschungslogik der Masterarbeit *„Konzeption und Evaluation eines agentengestützten RAG-Frameworks zur semantischen Erschließung heterogener Unternehmensinformationen und prognoseorientierten Modellierung exogener Einflussgrößen"*.

## Aufbau der Dokumentation

| Datei | Inhalt |
|-------|--------|
| `00_overview.md` | Dieser Überblick und Lesehinweise |
| `01_einleitung.md` | Motivation, Problemstellung, Zielsetzung |
| `02_theoretische_grundlagen.md` | RAG, Embeddings, Agenten, Zeitreihen |
| `03_stand_der_forschung.md` | Verwandte Arbeiten und Forschungslücke |
| `04_forschungsdesign_architektur.md` | Forschungsdesign, Anforderungen, Architektur |
| `05_datenbasis_vorverarbeitung.md` | Datenbasis, Datenhinweise, Vorverarbeitung |
| `06_semantische_ingestion.md` | Ingestion, Chunking, Embedding |
| `07_vektordatenbank_wissensorganisation.md` | Vektordatenbank, Provenance, Source Trust |
| `08_agentengestuetzte_architektur.md` | Agenten-Orchestrierung und Reasoning |
| `09_prognosemodellierung.md` | Modellierung exogener Einflussgrößen |
| `10_prototypische_realisierung.md` | Prototyp, Komponenten, Schnittstellen |
| `11_evaluation.md` | Evaluationsdesign und Metriken |
| `12_fazit_ausblick.md` | Fazit, Limitationen, Ausblick |

## Lesehinweise

Die Dokumentationskapitel beschreiben Konzept und Methodik. Der ausführbare Code liegt in `src/rag_framework/`, Experimente in `notebooks/`, Konfiguration in `configs/`. Die Arbeitspakete (AP01–AP11) befinden sich unter `docs/project_workpackages/` und sind mit den GitHub Issues/Projects verknüpft.

## Abgrenzung GitHub vs. Ausführungsumgebung

GitHub enthält Code, Konfiguration, Dokumentation, kleine Test-/Goldstandard-Daten und reproduzierbare Notebooks. Die eigentliche Verarbeitung großer oder urheberrechtlich geschützter Dokumente erfolgt außerhalb von GitHub (lokal, NAS, Docker, JupyterLab oder Codespaces). Diese Grenze wird in `05_datenbasis_vorverarbeitung.md` und `data/README.md` präzisiert.

> Hinweis: Die fachlichen Inhalte der einzelnen Kapitel werden im Rahmen der Masterarbeit ausgearbeitet. Diese Dateien bilden die Struktur und die jeweils zu behandelnden Aspekte ab; sie enthalten bewusst keine erfundenen Ergebnisse.
