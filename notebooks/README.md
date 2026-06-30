# Notebooks

Die Notebooks bilden die Forschungs- und Experimentierumgebung des Frameworks.
Produktiver Code liegt in `src/rag_framework/` und wird von den Notebooks
importiert.

## `00_pdf_inventory_and_metadata.ipynb`

### Zweck

Das Notebook implementiert die **vorgelagerte Vorverarbeitungsschicht** des
RAG-Frameworks. Es ueberfuehrt einen heterogenen PDF-Bestand aus
Bundesanzeiger-Veroeffentlichungen in ein geprueftes, metadatenreiches und
versionierbares **Dokumentinventar**. Dieses Inventar bildet die Eingabe fuer
die nachgelagerte semantische Ingestion.

### Kapitelbezug

| Aspekt          | Zuordnung                                                  |
|-----------------|------------------------------------------------------------|
| Hauptkapitel    | Kapitel 5 – *Datenbasis und Vorverarbeitung*               |
| Abgrenzung      | Kapitel 6 beginnt mit der semantischen Ingestion           |
| Evaluation      | Kapitel 11 – Ground-Truth-Abgleich der Metadatenextraktion |

Kapitel 5 endet beim qualitaetsgesicherten Dokumentinventar. Layout-/Tabellen-
verarbeitung, Chunking, Context Injection, Embedding-Vorbereitung und die
Uebergabe an die Vektordatenbank sind Gegenstand von Kapitel 6.

### Eingaben und Ausgaben

- **Eingabe:** lokaler Bundesanzeiger-PDF-Korpus unter `data/raw/`
  (nicht versioniert).
- **Ausgabe (lokal, `data/processed/`):** Inventar (CSV/XLSX/Parquet),
  `run_metadata.json`, `evaluation_report.json`, `inventory_errors.csv`,
  Ground-Truth-Vorlage sowie Grafiken unter `data/processed/figures/`.
- **Ausgabe (versioniert, `docs/results/`):** ausgewaehlte Reports und
  Abbildungen (siehe `docs/results/README.md`).

### Methodische Hinweise

- Die Extraktion ist **Docling-basiert**; bei nicht verarbeitbaren Dokumenten
  greift ein **pypdf-Fallback**.
- Die Pipeline erkennt und parst die **Bundesanzeiger-Header**
  (Name, Bereich, Information, Veroeffentlichungsdatum).
- Eine **Qualitaetssicherung** (Quality Gate) bewertet Parse-Status,
  Metadatenqualitaet und Retrieval Readiness und markiert Faelle fuer das
  Manual Review.
- Die erzeugten **Ergebnisgrafiken** dienen der Korpus-, Qualitaets- und
  Prozessdokumentation.
- **Roh-PDFs werden nicht in Git versioniert** (rechtliche und technische
  Gruende).

### Verhaeltnis zu `src/rag_framework/ingestion/`

Die zentrale Pipeline-Logik ist in wiederverwendbare Module ausgelagert:
`pdf_discovery`, `metadata_extraction`, `document_classification`,
`quality_gate`, `inventory_export` und `figure_export`. Das Notebook
orchestriert diese Module notebookfreundlich und dokumentiert die Ergebnisse.

### Entscheidung zu Notebook-Ausgaben (Output-Bereinigung)

Die Notebook-Ausgaben werden **bewusst bereinigt** committet. Begruendung: Die
erzeugten Grafiken liegen bereits als hochaufloesende PNG-Dateien vor
(`dpi=300`) und sind unter `docs/results/` dokumentiert; eine zusaetzliche
massive Einbettung im Notebook wuerde die Dateigroesse unnoetig erhoehen und die
Diff-Lesbarkeit auf GitHub verschlechtern. Es bleiben daher nur sparsam
ausgewaehlte, erklaerende Outputs erhalten. Reproduzierbare Ergebnisartefakte
werden nicht im Notebook, sondern unter `docs/results/` dokumentiert.

**Empfohlene Bereinigung vor dem Commit:**

```bash
jupyter nbconvert --clear-output --inplace notebooks/00_pdf_inventory_and_metadata.ipynb
```
