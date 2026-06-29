"""Hilfsfunktionen zum Laden von YAML-Konfigurationen."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml


def load_config(path: str | Path) -> dict[str, Any]:
    """Laedt eine YAML-Konfigurationsdatei und gibt sie als Dictionary zurueck.

    Args:
        path: Pfad zur YAML-Datei (z. B. configs/retrieval.yaml).

    Returns:
        Geparstes Konfigurations-Dictionary (leer, falls die Datei leer ist).

    Raises:
        FileNotFoundError: Wenn die Datei nicht existiert.
    """
    config_path = Path(path)
    if not config_path.exists():
        raise FileNotFoundError(f"Konfigurationsdatei nicht gefunden: {config_path}")
    with config_path.open("r", encoding="utf-8") as handle:
        data = yaml.safe_load(handle)
    return data or {}
