# Inventarschema – Dokumentinventar (Kapitel 5)

Dieses Dokument beschreibt die Felder des erzeugten Dokumentinventars, gruppiert
nach Funktion. Das Inventar ist das zentrale Pipeline-Artefakt der
Vorverarbeitungsschicht und die Eingabe fuer die semantische Ingestion
(Kapitel 6).

## A. Identifikation und Dateikontext

Stellt eindeutige Identifizierbarkeit und Provenance jedes Dokuments sicher.

| Feld                  | Beschreibung                                       |
|-----------------------|----------------------------------------------------|
| `document_id`         | Eindeutiger, stabiler Bezeichner des Dokuments     |
| `content_hash`        | Inhaltshash zur Deduplizierung und Provenance      |
| `filename`            | Originaldateiname                                  |
| `normalized_filename` | Normalisierter Dateiname (klein, ASCII-nah)        |
| `path`                | Repository-relativer Pfad zur Quelldatei           |
| `folder`              | Fachliche Gruppierung (Quellordner)                |
| `size_kb`             | Dateigroesse in Kilobyte                           |
| `page_count`          | Seitenzahl                                         |

## B. Extraktionsstatus

Dokumentiert, **wie** ein Dokument verarbeitet wurde, und macht den
Extraktionsvorgang auditierbar.

| Feld                | Beschreibung                                          |
|---------------------|-------------------------------------------------------|
| `parse_status`      | Status (ok / warning / error)                         |
| `error_type`        | Klassifizierte Fehlerart bei Verarbeitungsproblemen   |
| `error_message`     | Detaillierte Fehlermeldung                            |
| `extraction_method` | Verwendete Methode (docling / pypdf_fallback)         |
| `docling_used`      | Boolean: wurde Docling erfolgreich genutzt            |
| `extraction_trace`  | Nachvollziehbarer Verarbeitungsverlauf (Audit-Trail)  |

## C. Bundesanzeiger-Metadaten (roh)

Erfasst die unveraenderten Header-Felder. Der Rohzustand bleibt erhalten, um die
Extraktion nachvollziehbar zu halten.

| Feld                           | Beschreibung                              |
|--------------------------------|-------------------------------------------|
| `header_name_raw`              | Rohwert: Name / Gesellschaft              |
| `header_bereich_raw`           | Rohwert: Bereich                          |
| `header_information_raw`       | Rohwert: Information                       |
| `header_vdatum_raw`            | Rohwert: Veroeffentlichungsdatum          |
| `header_detected_flag`         | Boolean: Header erkannt                    |
| `header_extraction_confidence` | Konfidenz der Header-Erkennung (0–1)      |
| `header_extraction_method`     | Methode der Header-Extraktion             |

## D. Normalisierte fachliche Metadaten

Stellt die fuer Retrieval und Filterung nutzbare, vereinheitlichte Sicht bereit.

| Feld                 | Beschreibung                                       |
|----------------------|----------------------------------------------------|
| `company`            | Gesellschaftsname (bereinigt)                      |
| `company_normalized` | Normalisierter Gesellschaftsname (Matching-faehig) |
| `bereich_normalized` | Normalisierter Bereich                             |
| `information`        | Inhaltsbeschreibung der Veroeffentlichung          |
| `publication_date`   | Veroeffentlichungsdatum (ISO 8601)                 |
| `fiscal_start`       | Beginn des Geschaeftsjahres                         |
| `fiscal_end`         | Ende des Geschaeftsjahres                           |
| `fiscal_year`        | Geschaeftsjahr                                     |

## E. Dokumentklassifikation

Ordnet jedes Dokument in die fachliche Taxonomie ein und steuert nachgelagerte
Verarbeitung und Filterung.

| Feld                  | Beschreibung                                      |
|-----------------------|---------------------------------------------------|
| `doc_type`            | Dokumenttyp (z. B. Jahresabschluss)               |
| `doc_subtype`         | Dokumentuntertyp (z. B. Bilanz/GuV)               |
| `doc_family`          | Dokumentfamilie (uebergeordnete Gruppe)           |
| `doc_type_confidence` | Konfidenz der Klassifikation (0–1)                |
| `doc_type_source`     | Herkunft der Klassifikation (Regel / Heuristik)   |

## F. Qualitaetssicherung

Bewertet Vertrauenswuerdigkeit und Verarbeitbarkeit und steuert das Manual
Review.

| Feld                       | Beschreibung                                 |
|----------------------------|----------------------------------------------|
| `quality_score`            | Gesamtqualitaet der Verarbeitung (0–1)       |
| `metadata_quality_score`   | Qualitaet der extrahierten Metadaten (0–1)   |
| `needs_manual_review`      | Boolean: manuelle Pruefung erforderlich      |
| `review_reasons`           | Begruendung(en) fuer das Review              |
| `review_priority`          | Priorisierung des Reviews                    |
| `retrieval_readiness_flag` | Boolean: ingestionfaehig fuer das Retrieval  |

## G. Ingestion-Steuerung

Liefert Hinweise fuer die nachgelagerte semantische Ingestion (Kapitel 6).

| Feld                          | Beschreibung                              |
|-------------------------------|-------------------------------------------|
| `is_long`                     | Boolean: umfangreiches Dokument           |
| `table_heavy_flag`            | Boolean: tabellenlastiges Dokument        |
| `capital_market_flag`         | Boolean: kapitalmarktbezogen              |
| `layout_complexity_flag`      | Boolean: komplexes Layout                 |
| `ingestion_priority`          | Priorisierung fuer die Ingestion          |
| `chunking_strategy_candidate` | Vorgeschlagene Chunking-Strategie         |

## H. Auditierbarkeit und Reproduzierbarkeit

Sichert Provenance, Nachvollziehbarkeit und reproduzierbare Laeufe.

| Feld                  | Beschreibung                                     |
|-----------------------|--------------------------------------------------|
| `extraction_trace`    | Vollstaendiger Verarbeitungsverlauf je Dokument  |
| `*_source`-Felder     | Herkunft einzelner Metadatenwerte                |
| `*_confidence`-Felder | Konfidenzwerte je Extraktionsschritt             |
| `run_metadata`        | Laufbezogene Metadaten (Begleitartefakt)         |
| `evaluation_report`   | Ground-Truth-Evaluation des Laufs (Begleitartefakt) |

Die Felder dieser Gruppe werden teils je Dokument im Inventar und teils
laufbezogen in `run_metadata.json` und `evaluation_report.json` gefuehrt.
