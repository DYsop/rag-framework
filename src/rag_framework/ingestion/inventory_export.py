"""Export des Dokumentinventars und begleitender Pipeline-Artefakte.

Schreibt das Inventar nach CSV, XLSX und Parquet und erzeugt Run-Metadaten,
Evaluation-Report und Fehlerdatei. Die Dateinamen sind lauf-stabil ueber einen
Zeitstempel (run_timestamp). Teil der Vorverarbeitungsschicht (Kapitel 5).
"""

from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Any

import pandas as pd


def make_run_timestamp() -> str:
    """Erzeugt einen lauf-stabilen Zeitstempel im Format YYYYMMDD_HHMMSS.

    Returns:
        Zeitstempel-String zur Verwendung in Dateinamen.
    """
    return datetime.now().strftime("%Y%m%d_%H%M%S")


def _ensure_dir(directory: str | Path) -> Path:
    """Stellt sicher, dass ein Verzeichnis existiert.

    Args:
        directory: Zielverzeichnis.

    Returns:
        Pfadobjekt des angelegten/vorhandenen Verzeichnisses.
    """
    path = Path(directory)
    path.mkdir(parents=True, exist_ok=True)
    return path


def export_inventory(
    inventory: pd.DataFrame,
    processed_dir: str | Path,
    run_timestamp: str,
    write_csv: bool = True,
    write_xlsx: bool = True,
    write_parquet: bool = True,
) -> dict[str, str]:
    """Exportiert das Inventar in die konfigurierten Formate.

    Args:
        inventory: Vollstaendiges Dokumentinventar als DataFrame.
        processed_dir: Zielverzeichnis fuer die Ausgaben.
        run_timestamp: Lauf-Zeitstempel fuer die Dateinamen.
        write_csv: CSV-Export aktivieren.
        write_xlsx: XLSX-Export aktivieren.
        write_parquet: Parquet-Export aktivieren.

    Returns:
        Abbildung des Formats auf den geschriebenen Dateipfad.
    """
    out_dir = _ensure_dir(processed_dir)
    written: dict[str, str] = {}

    if write_csv:
        csv_path = out_dir / f"inventar_{run_timestamp}.csv"
        inventory.to_csv(csv_path, index=False)
        written["csv"] = str(csv_path)
    if write_xlsx:
        xlsx_path = out_dir / f"inventar_{run_timestamp}.xlsx"
        inventory.to_excel(xlsx_path, index=False)
        written["xlsx"] = str(xlsx_path)
    if write_parquet:
        parquet_path = out_dir / f"inventar_{run_timestamp}.parquet"
        inventory.to_parquet(parquet_path, index=False)
        written["parquet"] = str(parquet_path)

    return written


def export_run_metadata(
    metadata: dict[str, Any],
    processed_dir: str | Path,
    run_timestamp: str,
) -> str:
    """Schreibt die Run-Metadaten als JSON.

    Args:
        metadata: Laufbezogene Metadaten (Konfiguration, Kennzahlen).
        processed_dir: Zielverzeichnis.
        run_timestamp: Lauf-Zeitstempel fuer den Dateinamen.

    Returns:
        Pfad der geschriebenen JSON-Datei.
    """
    out_dir = _ensure_dir(processed_dir)
    path = out_dir / f"run_metadata_{run_timestamp}.json"
    with path.open("w", encoding="utf-8") as handle:
        json.dump(metadata, handle, ensure_ascii=False, indent=2)
    return str(path)


def export_evaluation_report(
    report: dict[str, Any],
    processed_dir: str | Path,
    run_timestamp: str,
) -> str:
    """Schreibt den Evaluation-Report (Ground-Truth-Abgleich) als JSON.

    Args:
        report: Evaluationsergebnisse der Metadatenextraktion.
        processed_dir: Zielverzeichnis.
        run_timestamp: Lauf-Zeitstempel fuer den Dateinamen.

    Returns:
        Pfad der geschriebenen JSON-Datei.
    """
    out_dir = _ensure_dir(processed_dir)
    path = out_dir / f"evaluation_report_{run_timestamp}.json"
    with path.open("w", encoding="utf-8") as handle:
        json.dump(report, handle, ensure_ascii=False, indent=2)
    return str(path)


def export_inventory_errors(
    errors: pd.DataFrame,
    processed_dir: str | Path,
    run_timestamp: str,
) -> str:
    """Schreibt die Fehlerdatei der nicht/fehlerhaft verarbeiteten Dokumente.

    Args:
        errors: DataFrame der Fehlerfaelle.
        processed_dir: Zielverzeichnis.
        run_timestamp: Lauf-Zeitstempel fuer den Dateinamen.

    Returns:
        Pfad der geschriebenen CSV-Datei.
    """
    out_dir = _ensure_dir(processed_dir)
    path = out_dir / f"inventory_errors_{run_timestamp}.csv"
    errors.to_csv(path, index=False)
    return str(path)
