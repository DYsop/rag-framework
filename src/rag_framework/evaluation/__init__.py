"""Evaluation-Modul: Metriken über alle Komponenten.

Bündelt Retrieval-, Antwort-, Provenance-, Agenten-, Prognose- und Systemmetriken.
Siehe docs/11_evaluation.md. Konfiguration über configs/evaluation.yaml.
"""

from .metrics import recall_at_k, precision_at_k, mae, rmse

__all__ = ["recall_at_k", "precision_at_k", "mae", "rmse"]
