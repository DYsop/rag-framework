"""Basisklassen für die agentengestützte Architektur."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Callable


@dataclass
class Tool:
    """Ein vom Agenten nutzbares Werkzeug.

    Attributes:
        name: Eindeutiger Werkzeugname.
        description: Kurzbeschreibung des Zwecks.
        func: Aufrufbare Funktion, die das Werkzeug ausführt.
    """

    name: str
    description: str
    func: Callable[..., Any]


class BaseAgent(ABC):
    """Abstrakte Basisklasse für agentengestützte Reasoning-Pipelines.

    Die Pipeline umfasst Zielverständnis, Retrieval, Reasoning und
    Antwortgenerierung mit Quellenbindung. Konfiguration über configs/agents.yaml.
    """

    def __init__(self, tools: list[Tool] | None = None, config: dict[str, Any] | None = None) -> None:
        self.tools = tools or []
        self.config = config or {}

    @abstractmethod
    def run(self, query: str) -> dict[str, Any]:
        """Beantwortet eine Anfrage mehrstufig und quellenbindend.

        Args:
            query: Anfrage der Nutzerin oder des Nutzers.

        Returns:
            Strukturierte Antwort inkl. genutzter Quellen und Reasoning-Schritte.
        """
        # TODO: Mehrstufige Orchestrierung implementieren (Plan, Tools, Synthese).
        raise NotImplementedError
