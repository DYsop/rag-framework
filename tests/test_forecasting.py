"""Tests fuer das Forecasting-Modul und Prognosemetriken."""

import math

from rag_framework.forecasting import ForecastResult
from rag_framework.evaluation import mae, rmse


def test_forecast_result_fields():
    fr = ForecastResult(predictions=[1.0, 2.0], horizon=2, scenario="A")
    assert fr.horizon == 2
    assert fr.scenario == "A"
    assert len(fr.predictions) == 2


def test_mae_and_rmse():
    y_true = [1.0, 2.0, 3.0]
    y_pred = [1.0, 2.0, 5.0]
    assert mae(y_true, y_pred) == (0 + 0 + 2) / 3
    assert math.isclose(rmse(y_true, y_pred), math.sqrt(4 / 3))


# TODO: Tests fuer konkrete Prognosemodelle ergaenzen
# (siehe src/rag_framework/forecasting/base.py).
