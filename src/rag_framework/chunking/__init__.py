"""Chunking-Modul: Strategien zur Segmentierung von Dokumenten.

Stellt austauschbare Chunking-Strategien bereit, deren Auswahl die Retrieval-
Qualität beeinflusst. Konfiguration über configs/chunking.yaml.
"""

from .base import BaseChunker, Chunk

__all__ = ["BaseChunker", "Chunk"]
