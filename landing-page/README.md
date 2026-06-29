# Landing Page / Demo

## Zweck

Dieses Verzeichnis bündelt die dokumentierende und visualisierende Oberfläche des Frameworks. Die Landing Page ersetzt **nicht** die eigentliche Ingestion oder Verarbeitung, sondern dokumentiert das Framework, visualisiert ausgewählte Aspekte und verlinkt optional auf Datenquellen oder Demos.

## Bestehende Komponenten (nicht-destruktiv weitergeführt)

- `../chunking-viz/` – interaktive Visualisierung der Chunking-Strategien (separat als Vite/React-App lauffähig; bereits öffentlich deployed).
- `../frontend/` – bestehendes Frontend des Prototyps.

Diese Komponenten bleiben erhalten. Dieses Verzeichnis dient als zentraler Einstieg/Beschreibung und kann bei Bedarf zu einer eigenständigen Landing Page ausgebaut werden.

## Architekturentscheidung

Die echte Ingestion läuft nicht auf GitHub als Dauerprozess. GitHub enthält Code, Konfiguration, Dokumentation, kleine Testdaten und reproduzierbare Notebooks. Die Verarbeitung großer oder geschützter Dokumente erfolgt lokal, auf einem NAS, in Docker, in JupyterLab oder in Codespaces.

## Mögliche Inhalte einer Landing Page

- Kurzbeschreibung und Architekturüberblick (mit Coverbild aus `../assets/images/`)
- Verlinkung der Chunking-Visualisierung und ausgewählter Notebooks
- Hinweise auf externe Datenquellen/Downloads (siehe `../data/README.md`)

> Hinweis: Die Landing Page enthält keine vertraulichen oder großen Rohdaten und keine Secrets.
