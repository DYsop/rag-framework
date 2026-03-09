# Chunking-Strategien — Interaktive Visualisierung

Interaktive React-Anwendung zur Erläuterung aller 20 Chunking-Strategien aus Kapitel 5 der Masterarbeit.

**Zugehörig zu:** Masterarbeit »RAG Intelligence Platform« — Studiengang Angewandte KI, SoSe 2026  
**Design:** Dark Theme (GitHub-optimiert)  
**Live-Demo:** https://DYsop.github.io/rag-framework/

---

## Schnellstart

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Build für GitHub Pages

```bash
npm run build
# Output in dist/ → GitHub Pages deployen
```

## Enthaltene Strategien (20)

| Nr.  | Strategie                        | Kategorie     |
|------|----------------------------------|---------------|
| 01   | Fixed-Size Chunking              | Grundlegend   |
| 02   | Sliding Window                   | Grundlegend   |
| 03   | Sentence / Paragraph             | Grundlegend   |
| 04   | Recursive / Hybrid               | Grundlegend   |
| 05   | Parent–Child                     | Hierarchisch  |
| 06a  | TextTiling                       | Semantisch    |
| 06b  | C99                              | Semantisch    |
| 06c  | LCseg                            | Semantisch    |
| 06d  | TopicTiling                      | Semantisch    |
| 07   | Embed-KCPD                       | Semantisch    |
| 08   | LLM-Assisted                     | Spezialisiert |
| 09   | OCR / Layout-Aware               | Spezialisiert |
| 10   | Multimodal                       | Spezialisiert |
| 11   | Metadata / Time-Based            | Spezialisiert |
| 12   | Sentence-Window                  | Adaptiv       |
| 13   | Auto-Merging                     | Hierarchisch  |
| 14   | Contextual Compression           | Kompression   |
| 15   | LLMLingua                        | Kompression   |
| 16   | Late Chunking                    | Adaptiv       |
| 17   | Hierarchical / Kombiniert        | Hierarchisch  |

## Hinweis zu Grafiken

Die statischen PNG-Grafiken (helles akademisches Layout, Word-geeignet) liegen in `../docs/grafiken/`.
