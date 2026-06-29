"""Agents-Modul: agentengestützte Orchestrierung und Reasoning.

Mehrstufige Pipeline aus Zielverständnis, Retrieval, Reasoning und
Antwortgenerierung mit Quellenbindung. Siehe docs/08_agentengestuetzte_architektur.md.
Konfiguration über configs/agents.yaml.
"""

from .base import BaseAgent, Tool

__all__ = ["BaseAgent", "Tool"]
