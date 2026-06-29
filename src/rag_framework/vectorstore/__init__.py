"""Vectorstore-Modul: Anbindung der Vektordatenbank.

Abstrahiert das Speichern und Abfragen von Embeddings inklusive Metadaten.
Konfiguration über configs/vectorstore.yaml.
"""

from .base import BaseVectorStore

__all__ = ["BaseVectorStore"]
