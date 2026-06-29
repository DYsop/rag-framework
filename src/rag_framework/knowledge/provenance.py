"""Provenance und Source Trust.

Datenstrukturen zur lückenlosen Herkunftskette und zur Vertrauensbewertung von
Quellen als Grundlage für Zitierfähigkeit und nachvollziehbare Antworten.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class ProvenanceRecord:
    """Herkunftsinformation eines Inhalts.

    Attributes:
        source: Quelle (Pfad, URL, Systemkennung).
        chunk_index: Position im Ursprungsdokument.
        retrieved_at: Optionaler Zeitstempel des Abrufs.
        extra: Zusätzliche Felder.
    """

    source: str
    chunk_index: int | None = None
    retrieved_at: str | None = None
    extra: dict[str, Any] = field(default_factory=dict)


class SourceTrust:
    """Bewertet die Vertrauenswürdigkeit von Quellen.

    Die Bewertung kann als zusätzliches Retrieval-Signal genutzt werden.
    Konfiguration und Regeln werden über configs/vectorstore.yaml bzw. die
    Wissensorganisation gepflegt.
    """

    def __init__(self, config: dict[str, Any] | None = None) -> None:
        self.config = config or {}

    def score(self, source: str) -> float:
        """Liefert einen Vertrauenswert im Bereich [0, 1] für eine Quelle.

        Args:
            source: Kennung der Quelle.

        Returns:
            Vertrauenswert; Standard 0.5, solange keine Regeln definiert sind.
        """
        # TODO: Vertrauensregeln/Heuristiken implementieren.
        return float(self.config.get("default_trust", 0.5))
