"""Basisklassen für die Prognosemodellierung exogener Einflussgrößen."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Sequence


@dataclass
class ForecastResult:
    """Ergebnis einer Prognose.

    Attributes:
        predictions: Prognostizierte Werte über den Horizont.
        horizon: Länge des Prognosehorizonts.
        scenario: Optionale Szenariobezeichnung (z. B. "A", "B").
        metadata: Zusätzliche Informationen.
    """

    predictions: list[float]
    horizon: int
    scenario: str | None = None
    metadata: dict[str, Any] = field(default_factory=dict)


class BaseForecaster(ABC):
    """Abstrakte Basisklasse für Prognosemodelle exogener Faktoren.

    Konfiguration über configs/forecasting.yaml.
    """

    def __init__(self, config: dict[str, Any] | None = None) -> None:
        self.config = config or {}

    @abstractmethod
    def fit(self, series: Sequence[float], exogenous: Sequence[Sequence[float]] | None = None) -> None:
        """Trainiert das Modell auf einer Zeitreihe und optionalen exogenen Variablen."""
        # TODO: Konkretes Modell trainieren.
        raise NotImplementedError

    @abstractmethod
    def predict(self, horizon: int) -> ForecastResult:
        """Erstellt eine Prognose über den angegebenen Horizont."""
        # TODO: Prognoselogik implementieren.
        raise NotImplementedError
