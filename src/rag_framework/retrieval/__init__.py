"""Retrieval-Modul: Abruf relevanter Inhalte aus der Wissensbasis.

Stellt Retrieval-Strategien (dense, sparse, hybrid) und Re-Ranking bereit.
Konfiguration über configs/retrieval.yaml.
"""

from .base import BaseRetriever, RetrievalResult

__all__ = ["BaseRetriever", "RetrievalResult"]
