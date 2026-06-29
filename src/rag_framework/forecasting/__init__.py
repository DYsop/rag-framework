"""Forecasting-Modul: prognoseorientierte Modellierung exogener Einflussgrößen.

Stellt Modelle und Schnittstellen zur Prognose exogener Faktoren bereit.
Siehe docs/09_prognosemodellierung.md. Konfiguration über configs/forecasting.yaml.
"""

from .base import BaseForecaster, ForecastResult

__all__ = ["BaseForecaster", "ForecastResult"]
