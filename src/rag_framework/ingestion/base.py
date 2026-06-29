"""Basisklassen für die semantische Ingestion."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any


@dataclass
class Document:
    """Repräsentiert ein normalisiertes Dokument inklusive Provenance-Metadaten.

    Attributes:
        content: Normalisierter Textinhalt des Dokuments.
        source: Herkunft (z. B. Pfad, URL oder System-Kennung).
        metadata: Zusätzliche Metadaten (Zeitstempel, Abschnitt, Trust-Indikatoren).
    """

    content: str
    source: str
    metadata: dict[str, Any] = field(default_factory=dict)


class BaseIngestor(ABC):
    """Abstrakte Basisklasse für Ingestoren heterogener Quellen.

    Konkrete Implementierungen extrahieren Inhalte aus einer Quelle, normalisieren
    sie und reichern Metadaten an. Die Konfiguration erfolgt über configs/ingestion.yaml.
    """

    def __init__(self, config: dict[str, Any] | None = None) -> None:
        self.config = config or {}

    @abstractmethod
    def load(self, source: str) -> list[Document]:
        """Lädt und normalisiert Inhalte aus der angegebenen Quelle.

        Args:
            source: Pfad, URL oder Kennung der Quelle.

        Returns:
            Liste normalisierter Document-Objekte.
        """
        # TODO: In konkreten Ingestoren implementieren (Extraktion + Normalisierung).
        raise NotImplementedError

    def enrich(self, document: Document) -> Document:
        """Reichert ein Dokument um Metadaten an (z. B. Provenance, Trust).

        Standardmäßig eine Identitätsfunktion; in Subklassen überschreibbar.
        """
        # TODO: Metadaten-Anreicherung (Quelle, Zeitstempel, Source-Trust) ergänzen.
        return document
