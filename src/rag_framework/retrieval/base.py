"""Basisklassen für Retrieval-Strategien."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any


@dataclass
class RetrievalResult:
    """Ergebnis eines Retrieval-Vorgangs.

    Attributes:
        text: Abgerufener Inhalt.
        score: Relevanzbewertung.
        source: Herkunft (Provenance) des Inhalts.
        metadata: Zusätzliche Metadaten.
    """

    text: str
    score: float
    source: str
    metadata: dict[str, Any] = field(default_factory=dict)


class BaseRetriever(ABC):
    """Abstrakte Basisklasse für Retriever.

    Konfiguration (z. B. top_k, Hybrid-Gewichtung) über configs/retrieval.yaml.
    """

    def __init__(self, config: dict[str, Any] | None = None) -> None:
        self.config = config or {}

    @abstractmethod
    def retrieve(self, query: str, top_k: int = 5) -> list[RetrievalResult]:
        """Ruft die relevantesten Inhalte zu einer Anfrage ab.

        Args:
            query: Suchanfrage.
            top_k: Anzahl zurückgegebener Ergebnisse.

        Returns:
            Nach Relevanz sortierte Liste von RetrievalResult-Objekten.
        """
        # TODO: Konkrete Retrieval-Strategie implementieren (dense/sparse/hybrid).
        raise NotImplementedError
