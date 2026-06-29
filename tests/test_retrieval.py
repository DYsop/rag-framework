"""Tests fuer Retrieval-Strukturen und Retrieval-Metriken."""

from rag_framework.retrieval import RetrievalResult
from rag_framework.evaluation import recall_at_k, precision_at_k


def test_retrieval_result_fields():
    r = RetrievalResult(text="t", score=0.9, source="s")
    assert r.score == 0.9
    assert r.source == "s"


def test_recall_at_k():
    relevant = ["a", "b"]
    retrieved = ["a", "c", "b", "d"]
    assert recall_at_k(relevant, retrieved, k=2) == 0.5
    assert recall_at_k(relevant, retrieved, k=3) == 1.0


def test_precision_at_k():
    relevant = ["a", "b"]
    retrieved = ["a", "c", "b", "d"]
    assert precision_at_k(relevant, retrieved, k=2) == 0.5


# TODO: Tests fuer konkrete Retriever ergaenzen
# (siehe src/rag_framework/retrieval/base.py).
