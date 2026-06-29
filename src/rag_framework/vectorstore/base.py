"""Basisklasse für die Anbindung von Vektordatenbanken."""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any, Sequence


class BaseVectorStore(ABC):
    """Abstrakte Basisklasse für Vektordatenbanken.

    Konkrete Implementierungen kapseln einen konkreten Backend (z. B. Qdrant, Chroma,
    FAISS). Konfiguration über configs/vectorstore.yaml.
    """

    def __init__(self, config: dict[str, Any] | None = None) -> None:
        self.config = config or {}

    @abstractmethod
    def upsert(self, ids: Sequence[str], vectors: Sequence[Sequence[float]], metadata: Sequence[dict[str, Any]]) -> None:
        """Fügt Vektoren mit Metadaten hinzu oder aktualisiert sie."""
        # TODO: Backend-spezifisches Upsert implementieren.
        raise NotImplementedError

    @abstractmethod
    def query(self, vector: Sequence[float], top_k: int = 5, filters: dict[str, Any] | None = None) -> list[dict[str, Any]]:
        """Sucht die ähnlichsten Vektoren zu einem Anfragevektor.

        Args:
            vector: Anfragevektor.
            top_k: Anzahl Ergebnisse.
            filters: Optionale Metadatenfilter.

        Returns:
            Liste von Treffern (inkl. Score und Metadaten).
        """
        # TODO: Backend-spezifische Ähnlichkeitssuche implementieren.
        raise NotImplementedError
