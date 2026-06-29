# 01 – Einleitung

## Motivation

Unternehmen verfügen über stark heterogene Informationsbestände: strukturierte Daten (z. B. ERP, CRM, Finanzdaten), unstrukturierte Dokumente (Verträge, Berichte, E-Mails), interne Kommunikation sowie externe Quellen und Sensordaten. Diese Bestände sind selten semantisch erschlossen, was die fundierte, nachvollziehbare Beantwortung analytischer Fragestellungen erschwert.

## Problemstellung

Klassische RAG-Ansätze stoßen bei mehrstufigen Analysefragen, heterogenen Quellen und Anforderungen an Nachvollziehbarkeit (Provenance) an Grenzen. Zugleich hängen viele unternehmerische Kennzahlen von exogenen Einflussgrößen ab (z. B. Konjunktur, Zinsen, Rohstoffpreise), deren Modellierung eine Verbindung von semantischer Erschließung und prognostischer Analyse erfordert.

## Zielsetzung

Diese Arbeit konzipiert, realisiert prototypisch und evaluiert ein agentengestütztes RAG-Framework, das heterogene Unternehmensinformationen semantisch erschließt und exogene Einflussgrößen prognoseorientiert modelliert.

## Forschungsfragen und Zielsetzung

Aus dem dargelegten Forschungsziel und der mehrdimensionalen Problemstellung leitet sich die folgende übergeordnete Forschungsfrage ab:

> Wie kann ein agentengestütztes RAG-Framework gestaltet werden, das heterogene Unternehmensinformationen semantisch erschließt, Antworten quellengebunden erzeugt und interne Kennzahlen mit exogenen Einflussgrößen zu einer szenario- und prognoseorientierten Modellierung verbindet?

Diese übergeordnete Frage wird in sechs Teilforschungsfragen ausdifferenziert. Jede Teilfrage greift eine der in Abschnitt 1.2 herausgearbeiteten Problemachsen auf und ist so formuliert, dass sie eigenständig operationalisierbar und evaluierbar ist. Die Forschungsfragen werden in diesem Kapitel hergeleitet, begründet und operationalisiert, jedoch ausdrücklich nicht beantwortet; ihre systematische Beantwortung erfolgt in Abschnitt 12.2.

- **FF1 – Semantische Ingestion.** Wie kann eine robuste Ingestion-Pipeline gestaltet werden, die heterogene Unternehmensdokumente extrahiert, strukturell rekonstruiert, segmentiert, mit Metadaten anreichert und für semantisches Retrieval verfügbar macht? Ohne verlustarme Strukturrekonstruktion und Metadatenanreicherung baut jede nachgelagerte Verarbeitung auf einer defizitären Datenbasis auf.
- **FF2 – Chunking, Embedding und Retrieval.** Welche Kombination aus Chunking-Strategie, Embedding-Modell und Retrieval-Verfahren erzielt für den betrachteten Unternehmenskorpus die beste Retrieval- und Kontextqualität? Die Frage richtet sich auf die zentrale Repräsentations- und Abrufentscheidung und ist über etablierte Retrieval- und Kontextmetriken empirisch zugänglich.
- **FF3 – Vektordatenbank und Wissensorganisation.** Wie ist eine Vektordatenbank- und Wissensorganisationsschicht zu gestalten, die hybride Suche, Metadatenfilterung, Provenance, Source Trust und inkrementelle Aktualisierung trägt? Die Frage verbindet die Indexstruktur als technische Grundlage mit der semantischen Steuerungs- und Vertrauensebene.
- **FF4 – Agentengestützte Analysearchitektur.** Wie können Agenten komplexe Unternehmensanalysefragen durch Query Planning, Tool-Nutzung, Multi-Hop-Retrieval, Validierung und Quellenbindung kontrolliert beantworten? Hier vollzieht sich der Übergang von einer statischen Pipeline zu einer agentengestützten Analysearchitektur, deren Kontrollierbarkeit den Kern der Fragestellung bildet.
- **FF5 – Prognoseorientierte Modellierung.** Wie lassen sich aus dem RAG-System extrahierte Unternehmenskennzahlen mit exogenen Einflussgrößen koppeln, um dynamische Szenario- und Prognosemodelle zu ermöglichen? Die Frage verbindet die semantische Erschließung mit einer dynamischen Modellierungsschicht und adressiert damit den prognostischen Anspruch des Titels.
- **FF6 – Evaluation.** Wie lässt sich das Gesamtframework entlang technischer, fachlicher, prognosebezogener und vertrauensbezogener Qualitätsdimensionen evaluieren? Die Frage stellt sicher, dass das Artefakt nicht nur konstruiert, sondern nach gestaltungsorientierten Maßstäben bewertet wird.

Die sechs Teilfragen ergänzen sich, ohne sich zu überschneiden: FF1 bis FF3 betreffen die Wissensbasis aus Aufnahme, Repräsentation und Organisation, FF4 die Analyse- und Kontrolllogik, FF5 die prognostische Erweiterung und FF6 die übergreifende Bewertung. In ihrer Gesamtheit decken sie die Bestandteile des Titels – agentengestütztes RAG-Framework, semantische Erschließung heterogener Unternehmensinformationen, exogene Einflussgrößen, prognoseorientierte Modellierung sowie deren Evaluation – vollständig ab.

## Abgrenzung

Nicht Gegenstand sind die Erzeugung echter Unternehmensdaten, die Verarbeitung vertraulicher Inhalte im öffentlichen Repository sowie betriebswirtschaftliche Entscheidungsempfehlungen über den methodischen Rahmen hinaus.

## Aufbau der Arbeit

Die Kapitelstruktur folgt der Dokumentation in diesem Verzeichnis (siehe `00_overview.md`).

> Diese Datei bildet die Struktur der Einleitung ab. Die finale inhaltliche Ausarbeitung erfolgt in der Masterarbeit.
