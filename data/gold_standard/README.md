# Goldstandard

Dieses Verzeichnis enthält kuratierte Goldstandard-Daten (Fragen und Referenzantworten) für die Evaluation von Retrieval- und Antwortqualität. Die Daten sind klein, unkritisch und versioniert.

## Empfohlenes Format (JSONL)

Jede Zeile ein Eintrag, z. B.:

```json
{"id": "q001", "question": "Beispiel-Frage?", "answer": "Referenzantwort.", "relevant_doc_ids": ["doc_12", "doc_45"], "tags": ["retrieval", "faithfulness"]}
```

## Felder

- `id`: eindeutige Kennung
- `question`: Eingabefrage
- `answer`: Referenz-/Goldantwort
- `relevant_doc_ids`: Liste relevanter Quellen (für Recall@k, Precision@k, MRR, nDCG)
- `tags`: optionale Kategorisierung

> Es werden ausschließlich synthetische oder unkritische Beispiele abgelegt. Keine echten Unternehmensdaten.
