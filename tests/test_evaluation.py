"""Tests fuer die Evaluationsmetriken."""

import pytest

from rag_framework.evaluation import recall_at_k, precision_at_k, mae, rmse


def test_recall_empty_relevant():
    assert recall_at_k([], ["a"], k=1) == 0.0


def test_precision_zero_k():
    assert precision_at_k(["a"], ["a"], k=0) == 0.0


def test_mae_length_mismatch_raises():
    with pytest.raises(ValueError):
        mae([1.0, 2.0], [1.0])


def test_rmse_perfect_prediction():
    assert rmse([1.0, 2.0, 3.0], [1.0, 2.0, 3.0]) == 0.0


# TODO: Tests fuer mrr, ndcg, mape und directional_accuracy ergaenzen,
# sobald implementiert (siehe src/rag_framework/evaluation/metrics.py).
