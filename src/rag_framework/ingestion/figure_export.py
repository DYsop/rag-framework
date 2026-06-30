"""Zentraler Export von Matplotlib-Abbildungen der Pipeline.

Speichert alle automatisch erzeugten Grafiken lauf-bezogen unter
data/processed/figures/<run_timestamp>/ und kopiert eine kuratierte Auswahl in
das versionierte Repository (docs/results/latest/figures/). Teil der
Vorverarbeitungsschicht (Kapitel 5).
"""

from __future__ import annotations

import shutil
from pathlib import Path
from typing import Iterable

from matplotlib.figure import Figure


def save_figure(
    figure: Figure,
    name: str,
    run_timestamp: str,
    local_base_dir: str | Path = "data/processed/figures",
    dpi: int = 300,
    image_format: str = "png",
) -> Path:
    """Speichert eine einzelne Matplotlib-Figur lauf-bezogen.

    Args:
        figure: Zu speichernde Matplotlib-Figur.
        name: Sprechender Basisname ohne Zeitstempel (z. B. "01_dashboard_uebersicht").
        run_timestamp: Lauf-Zeitstempel (YYYYMMDD_HHMMSS).
        local_base_dir: Basisverzeichnis fuer lokale Abbildungen.
        dpi: Aufloesung in dpi.
        image_format: Bildformat (z. B. "png").

    Returns:
        Pfad der gespeicherten Bilddatei.
    """
    run_dir = Path(local_base_dir) / run_timestamp
    run_dir.mkdir(parents=True, exist_ok=True)
    filename = f"{name}_{run_timestamp}.{image_format}"
    target = run_dir / filename
    figure.savefig(target, dpi=dpi, bbox_inches="tight", format=image_format)
    return target


def save_all_figures(
    figures: dict[str, Figure],
    run_timestamp: str,
    local_base_dir: str | Path = "data/processed/figures",
    dpi: int = 300,
    image_format: str = "png",
) -> dict[str, Path]:
    """Speichert mehrere benannte Figuren lauf-bezogen.

    Args:
        figures: Abbildung von Basisname auf Matplotlib-Figur.
        run_timestamp: Lauf-Zeitstempel.
        local_base_dir: Basisverzeichnis fuer lokale Abbildungen.
        dpi: Aufloesung in dpi.
        image_format: Bildformat.

    Returns:
        Abbildung von Basisname auf gespeicherten Pfad.
    """
    saved: dict[str, Path] = {}
    for name, figure in figures.items():
        saved[name] = save_figure(
            figure,
            name=name,
            run_timestamp=run_timestamp,
            local_base_dir=local_base_dir,
            dpi=dpi,
            image_format=image_format,
        )
    return saved


def copy_selected_to_repo(
    saved_figures: dict[str, Path],
    selected: Iterable[str],
    repo_latest_dir: str | Path = "docs/results/latest/figures",
) -> dict[str, Path]:
    """Kopiert ausgewaehlte Abbildungen in das versionierte Repository.

    Args:
        saved_figures: Abbildung von Basisname auf lokal gespeicherten Pfad.
        selected: Iterable der Basisnamen, die versioniert werden sollen.
        repo_latest_dir: Zielverzeichnis im Repository (latest).

    Returns:
        Abbildung von Basisname auf den kopierten Zielpfad.
    """
    target_dir = Path(repo_latest_dir)
    target_dir.mkdir(parents=True, exist_ok=True)
    selected_set = set(selected)
    copied: dict[str, Path] = {}

    for name, source in saved_figures.items():
        if name in selected_set and source.exists():
            destination = target_dir / source.name
            shutil.copy2(source, destination)
            copied[name] = destination

    return copied
