"""Embeddings-Modul: Vektorisierung von Chunks.

Kapselt austauschbare Embedding-Modelle. Konfiguration über configs/ingestion.yaml.
"""

from .base import BaseEmbedder

__all__ = ["BaseEmbedder"]
