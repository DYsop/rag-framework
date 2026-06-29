# 02 – Theoretische Grundlagen

Dieses Kapitel ordnet die zentralen Konzepte ein, auf denen das Framework aufbaut.

## Retrieval-Augmented Generation (RAG)

Grundprinzip der Anreicherung generativer Modelle mit extern abgerufenem Kontext: Indexierung, Retrieval, Augmentation und Generierung. Behandelt werden Stärken (Aktualität, Quellenbindung) und Grenzen (Retrieval-Qualität, Kontextfenster, Halluzinationen).

## Dokumentenrepräsentation und Chunking

Strategien zur Segmentierung von Dokumenten (u. a. fixed-size, satz-/absatzbasiert, semantisch, hierarchisch) und ihr Einfluss auf Retrieval-Qualität.

## Embeddings und Vektorraum-Semantik

Dichte Vektorrepräsentationen, Ähnlichkeitsmaße (Kosinus, Skalarprodukt), Eigenschaften von Embedding-Modellen sowie Aspekte von Domänenanpassung.

## Vektordatenbanken und Indizierung

Approximate-Nearest-Neighbor-Verfahren, Indexstrukturen, Filterung über Metadaten und Hybrid-Retrieval (dense + sparse).

## Wissensorganisation, Provenance und Source Trust

Verknüpfung von Inhalten mit Herkunftsinformationen, Versionierung und Vertrauensbewertung von Quellen als Voraussetzung für Zitierfähigkeit.

## Agentengestützte Architekturen

Planungs- und Werkzeugnutzungs-Paradigmen (u. a. ReAct), mehrstufiges Reasoning, Toolorchestrierung und Quellenbindung.

## Zeitreihen- und Prognosemodellierung

Grundlagen der Modellierung exogener Einflussgrößen, klassische und ML-basierte Prognoseverfahren sowie Bewertungsmetriken.

## Evaluation von RAG- und Prognosesystemen

Metrische Grundlagen für Retrieval, Antwortqualität, Agentenverhalten und Prognosegüte (Details in `11_evaluation.md`).

> Diese Datei bildet die Gliederung der theoretischen Grundlagen ab. Die Ausarbeitung mit Quellen erfolgt in der Masterarbeit.
