# Datenhinweise

Dieses Verzeichnis dokumentiert die Datenstrategie des Frameworks. Es enthaelt
bewusst **keine** echten grossen Rohdaten, keine vertraulichen und keine
urheberrechtlich problematischen Dokumente.

## Datenebenen im Ueberblick

```
data/
├── README.md          # diese Datei (versioniert)
├── raw/               # Roh-PDFs (Bundesanzeiger u. a.) – NICHT versioniert
├── interim/           # Zwischenstaende der Verarbeitung – NICHT versioniert
├── processed/         # Pipeline-Ausgaben (Inventar, Reports) – NICHT versioniert
│   └── figures/       # lokal erzeugte Ergebnisgrafiken – NICHT versioniert
├── external/          # extern bezogene Datensaetze – NICHT versioniert
├── samples/           # kleine, anonymisierte Beispielartefakte – versioniert
└── gold_standard/     # Goldstandard-Fragen/-Antworten – versioniert
```

## `data/raw/` – Roh-PDFs (nicht versioniert)

`data/raw/` enthaelt den lokalen Bundesanzeiger-PDF-Korpus, der die Eingabe der
Inventarisierungs-Pipeline bildet. Diese Roh-PDFs werden aus **rechtlichen**
(Urheber-/Nutzungsrechte) und **technischen** (Datenvolumen, Binaergroesse)
Gruenden **nicht** in Git abgelegt. Fuer reproduzierbare Laeufe muss der Korpus
lokal unter `data/raw/` bereitgestellt werden.

Empfohlene Unterstruktur (fachlich gruppiert):

```
data/raw/
├── Rechnungslegung_Finanzberichte/
├── Kapitalmarkt/
└── Gesellschaftsbekanntmachungen/
```

## `data/processed/` – Pipeline-Ausgaben (nicht regulaer versioniert)

`data/processed/` enthaelt die automatisch erzeugten Ausgaben der Pipeline:
das vollstaendige Dokumentinventar (CSV/XLSX/Parquet), Run-Metadaten,
Evaluation-Report, Fehlerdatei sowie unter `data/processed/figures/` die lokal
erzeugten Grafiken. Diese Artefakte werden **nicht regulaer** versioniert, da
das vollstaendige Inventar lokale Pfade und umfangreiche Dokumentmetadaten
enthaelt und Excel-/Parquet-Dateien fuer die Git-Versionierung ungeeignet sind.

Ausgewaehlte, dokumentierte Ergebnisberichte und Abbildungen werden stattdessen
unter `docs/results/` versioniert (siehe `docs/results/README.md`).

## `data/samples/` – anonymisierte Beispielartefakte (versioniert)

`data/samples/` enthaelt kleine, anonymisierte Beispielartefakte, die die
Struktur des Inventars dokumentieren, ohne sensible lokale Informationen zu
exponieren. Lokale Windows-Pfade sind dort relativiert
(z. B. `data/raw/Rechnungslegung_Finanzberichte/beispiel.pdf`).

## `data/gold_standard/` – Goldstandard (versioniert)

`data/gold_standard/` enthaelt die kuratierte Referenz fuer die Evaluation
(kleine, unkritische Dateien).

## Architekturgrenze

Die Verarbeitung grosser/geschuetzter Dokumente laeuft ausserhalb von GitHub
(lokal, NAS, Docker, JupyterLab, Codespaces). GitHub enthaelt die
reproduzierbare Methode, Konfiguration, Dokumentation, kleine Beispieldaten und
ausgewaehlte Ergebnisberichte – **nicht** den vollstaendigen Datenkoerper.
