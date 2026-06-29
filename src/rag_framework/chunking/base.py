"""Basisklassen für Chunking-Strategien."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any


@dataclass
class Chunk:
    """Ein Textsegment mit Bezug zum Ursprungsdokument.

    Attributes:
        text: Inhalt des Chunks.
        doc_source: Herkunft des Ursprungsdokuments (Provenance).
        index: Position des Chunks im Dokument.
        metadata: Zusätzliche Metadaten.
    """

    text: str
    doc_source: str
    index: int
    metadata: dict[str, Any] = field(default_factory=dict)


class BaseChunker(ABC):
    """Abstrakte Basisklasse für Chunking-Strategien.

    Konfiguration (z. B. Chunkgröße, Overlap) erfolgt über configs/chunking.yaml.
    """

    def __init__(self, config: dict[str, Any] | None = None) -> None:
        self.config = config or {}

    @abstractmethod
    def split(self, text: str, doc_source: str) -> list[Chunk]:
        """Segmentiert einen Text in Chunks.

        Args:
            text: Zu segmentierender Text.
            doc_source: Herkunft des Dokuments (für Provenance).

        Returns:
            Liste von Chunk-Objekten.
        """
        # TODO: Konkrete Strategie implementieren (z. B. semantisch, hierarchisch).
        raise NotImplementedError
