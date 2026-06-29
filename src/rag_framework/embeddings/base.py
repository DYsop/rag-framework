"""Basisklasse für Embedding-Modelle."""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any, Sequence


class BaseEmbedder(ABC):
    """Abstrakte Basisklasse zur Vektorisierung von Texten.

    Konfiguration (Modellname, Dimensionalität, Normalisierung) über configs/ingestion.yaml.
    """

    def __init__(self, config: dict[str, Any] | None = None) -> None:
        self.config = config or {}

    @abstractmethod
    def embed(self, texts: Sequence[str]) -> list[list[float]]:
        """Erzeugt Embeddings für eine Sequenz von Texten.

        Args:
            texts: Eingabetexte.

        Returns:
            Liste von Vektoren (je ein Vektor pro Eingabetext).
        """
        # TODO: Konkretes Embedding-Modell anbinden.
        raise NotImplementedError

    @property
    def dimension(self) -> int | None:
        """Dimensionalität der erzeugten Vektoren, falls bekannt."""
        # TODO: Aus Modellkonfiguration ableiten.
        return self.config.get("dimension")
