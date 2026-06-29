"""Ingestion-Modul: semantische Ingestion heterogener Quellen.

Verantwortlich für Extraktion, Normalisierung und Metadaten-Anreicherung der
Eingangsdaten vor Chunking und Embedding. Siehe docs/06_semantische_ingestion.md.
"""

from .base import BaseIngestor, Document

__all__ = ["BaseIngestor", "Document"]
