"""Evaluationsmetriken.

Enthält generische, gut definierte Metriken für Retrieval und Prognose. Komplexere
Metriken (Faithfulness, Answer Relevancy, Context Recall, nDCG, Agentenmetriken)
sind als TODO markiert und werden in der Masterarbeit ausgearbeitet.
"""

from __future__ import annotations

from collections.abc import Sequence


def recall_at_k(relevant: Sequence[str], retrieved: Sequence[str], k: int) -> float:
    """Recall@k: Anteil der relevanten Elemente unter den Top-k Treffern.

    Args:
        relevant: Menge der relevanten Element-IDs.
        retrieved: Geordnete Liste abgerufener Element-IDs.
        k: Cutoff.

    Returns:
        Recall im Bereich [0, 1]; 0.0, falls keine relevanten Elemente existieren.
    """
    if not relevant:
        return 0.0
    rel = set(relevant)
    top_k = list(retrieved)[:k]
    hits = sum(1 for r in top_k if r in rel)
    return hits / len(rel)


def precision_at_k(relevant: Sequence[str], retrieved: Sequence[str], k: int) -> float:
    """Precision@k: Anteil relevanter Elemente unter den Top-k Treffern."""
    if k <= 0:
        return 0.0
    rel = set(relevant)
    top_k = list(retrieved)[:k]
    if not top_k:
        return 0.0
    hits = sum(1 for r in top_k if r in rel)
    return hits / len(top_k)


def mae(y_true: Sequence[float], y_pred: Sequence[float]) -> float:
    """Mean Absolute Error."""
    if len(y_true) != len(y_pred) or not y_true:
        raise ValueError("y_true und y_pred muessen gleich lang und nicht leer sein.")
    return sum(abs(t - p) for t, p in zip(y_true, y_pred)) / len(y_true)


def rmse(y_true: Sequence[float], y_pred: Sequence[float]) -> float:
    """Root Mean Squared Error."""
    if len(y_true) != len(y_pred) or not y_true:
        raise ValueError("y_true und y_pred muessen gleich lang und nicht leer sein.")
    mse = sum((t - p) ** 2 for t, p in zip(y_true, y_pred)) / len(y_true)
    return mse ** 0.5


# TODO: mrr, ndcg_at_k, mape, directional_accuracy sowie Antwort- und
# Agentenmetriken ergaenzen (siehe docs/11_evaluation.md).
