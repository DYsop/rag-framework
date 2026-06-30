# Kapitel 5 – Datenbasis und Vorverarbeitung

Kapitel 5 beschreibt die **datenbezogene Kontroll- und Vertrauensebene** des
Frameworks. Ziel ist es, aus einem heterogenen PDF-Bestand ein eindeutiges,
klassifiziertes, qualitaetsgesichertes und ingestionfaehiges **Dokumentinventar**
zu erzeugen.

> Das Notebook `notebooks/00_pdf_inventory_and_metadata.ipynb` implementiert die
> vorgelagerte Vorverarbeitungsschicht des RAG-Frameworks. Es ueberfuehrt einen
> heterogenen PDF-Bestand aus Bundesanzeiger-Veroeffentlichungen in ein
> geprueftes, metadatenreiches und versionierbares Dokumentinventar. Dieses
> Inventar bildet die Eingabe fuer die nachgelagerte semantische Ingestion.

## Methodische Bausteine

**Korpusbildung.** Zusammenstellung des lokalen Bundesanzeiger-PDF-Korpus unter
`data/raw/`, fachlich gruppiert nach Rechnungslegung/Finanzberichte,
Kapitalmarkt und Gesellschaftsbekanntmachungen.

**PDF-Erfassung.** Rekursive Erfassung aller PDF-Dateien, Normalisierung der
Dateinamen, Bildung von Content-Hashes und Duplikaterkennung. Der Content-Hash
ist die Grundlage fuer Provenance und Reproduzierbarkeit.

**Metadatenextraktion.** Docling-basierte Extraktion mit pypdf-Fallback,
Erkennung der Bundesanzeiger-Header und Extraktion der Felder Name, Bereich,
Information und Veroeffentlichungsdatum.

**Dokumentklassifikation.** Normalisierung der Bereiche und Ableitung von
Dokumenttyp, Dokumentuntertyp und Dokumentfamilie ueber regelbasierte Logik fuer
Rechnungslegung/Finanzberichte, Kapitalmarkt und Gesellschaftsbekanntmachungen.

**Deduplizierung.** Identifikation inhaltlich identischer Dokumente ueber den
Content-Hash, um Mehrfachverarbeitung und verzerrte Kennzahlen zu vermeiden.

**Qualitaetssicherung.** Ein Quality Gate bewertet Parse-Status, Fehlerklassen,
Warnflags, Quality Score, Metadata Quality Score, den Bedarf eines Manual Review
sowie die Retrieval Readiness.

**Inventarbildung.** Aggregation aller Felder zu einem versionierbaren
Dokumentinventar mit begleitenden Run-Metadaten, Evaluation-Report und
Fehlerdatei. Auditierbarkeit wird ueber `extraction_trace`, `source`- und
`confidence`-Felder hergestellt.

**Uebergabe an Kapitel 6.** Das qualitaetsgesicherte Inventar mit gesetztem
`retrieval_readiness_flag` und Ingestion-Steuerungsfeldern bildet die definierte
Schnittstelle zur semantischen Ingestion.

## Abgrenzung

Kapitel 5 beschreibt **nicht** die finale semantische Ingestion, sondern die
vorgelagerte Datenbasis und Vorverarbeitung. Semantische Dokumentextraktion,
Layout- und Tabellenverarbeitung, Chunking, Context Injection,
Embedding-Vorbereitung und die Uebergabe an die Vektordatenbank sind Gegenstand
von Kapitel 6.

## Verweise

- Feldschema: [`inventory_schema.md`](inventory_schema.md)
- Ergebnisartefakte: [`../results/README.md`](../results/README.md)
- Notebook: [`../../notebooks/00_pdf_inventory_and_metadata.ipynb`](../../notebooks/00_pdf_inventory_and_metadata.ipynb)
