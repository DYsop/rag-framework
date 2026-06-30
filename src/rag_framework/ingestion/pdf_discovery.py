"""PDF-Erfassung und Deduplizierung fuer die Vorverarbeitungsschicht.

Dieses Modul gehoert zur datenbezogenen Kontroll- und Vertrauensebene des
RAG-Frameworks (Kapitel 5). Es erfasst rekursiv alle PDF-Dokumente eines
lokalen Korpus, normalisiert Dateinamen, bildet Content-Hashes zur Provenance
und erkennt Duplikate.
"""

from __future__ import annotations

import hashlib
import re
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


@dataclass
class DiscoveredDocument:
    """Repraesentiert ein erfasstes PDF-Dokument inkl. Provenance-Feldern."""

    path: Path
    filename: str
    normalized_filename: str
    folder: str
    size_kb: float
    content_hash: str
    is_duplicate: bool = False
    duplicate_of: str | None = None


def normalize_filename(filename: str) -> str:
    """Normalisiert einen Dateinamen zu einer stabilen, ASCII-nahen Form.

    Args:
        filename: Originaldateiname (inkl. oder ohne Endung).

    Returns:
        Normalisierter Dateiname in Kleinschreibung ohne Sonderzeichen.
    """
    stem = Path(filename).stem
    suffix = Path(filename).suffix.lower()
    decomposed = unicodedata.normalize("NFKD", stem)
    ascii_text = decomposed.encode("ascii", "ignore").decode("ascii")
    ascii_text = ascii_text.lower()
    ascii_text = re.sub(r"[^a-z0-9]+", "_", ascii_text).strip("_")
    return f"{ascii_text}{suffix}"


def compute_content_hash(path: Path, chunk_size: int = 65536) -> str:
    """Berechnet einen SHA-256-Inhaltshash einer Datei.

    Der Hash dient als Grundlage fuer Deduplizierung und Provenance.

    Args:
        path: Pfad zur Datei.
        chunk_size: Blockgroesse fuer das streamende Einlesen in Byte.

    Returns:
        Hexadezimaler SHA-256-Hash der Dateiinhalte.
    """
    hasher = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(chunk_size), b""):
            hasher.update(block)
    return hasher.hexdigest()


def discover_pdfs(
    raw_dir: str | Path,
    recursive: bool = True,
) -> list[Path]:
    """Erfasst alle PDF-Dateien unter einem Wurzelverzeichnis.

    Args:
        raw_dir: Wurzelverzeichnis des lokalen PDF-Korpus.
        recursive: Wenn True, werden Unterverzeichnisse rekursiv durchsucht.

    Returns:
        Sortierte Liste der gefundenen PDF-Pfade.

    Raises:
        FileNotFoundError: Wenn das Wurzelverzeichnis nicht existiert.
    """
    root = Path(raw_dir)
    if not root.exists():
        raise FileNotFoundError(f"Rohdatenverzeichnis nicht gefunden: {root}")
    pattern = "**/*.pdf" if recursive else "*.pdf"
    return sorted(p for p in root.glob(pattern) if p.is_file())


def build_inventory(
    raw_dir: str | Path,
    recursive: bool = True,
) -> list[DiscoveredDocument]:
    """Baut ein Dokument-Grundinventar inkl. Hashing und Duplikaterkennung.

    Args:
        raw_dir: Wurzelverzeichnis des lokalen PDF-Korpus.
        recursive: Rekursive Suche aktivieren.

    Returns:
        Liste der erfassten Dokumente mit gesetztem Duplikatstatus.
    """
    root = Path(raw_dir)
    documents: list[DiscoveredDocument] = []
    seen_hashes: dict[str, str] = {}

    for path in discover_pdfs(root, recursive=recursive):
        content_hash = compute_content_hash(path)
        relative_folder = path.parent.relative_to(root).as_posix()
        document = DiscoveredDocument(
            path=path,
            filename=path.name,
            normalized_filename=normalize_filename(path.name),
            folder=relative_folder if relative_folder != "." else "",
            size_kb=round(path.stat().st_size / 1024, 2),
            content_hash=content_hash,
        )
        if content_hash in seen_hashes:
            document.is_duplicate = True
            document.duplicate_of = seen_hashes[content_hash]
        else:
            seen_hashes[content_hash] = document.normalized_filename
        documents.append(document)

    return documents


def filter_unique(
    documents: Iterable[DiscoveredDocument],
) -> list[DiscoveredDocument]:
    """Filtert Duplikate aus einer Dokumentliste heraus.

    Args:
        documents: Iterierbare Sammlung erfasster Dokumente.

    Returns:
        Liste der eindeutigen (nicht als Duplikat markierten) Dokumente.
    """
    return [doc for doc in documents if not doc.is_duplicate]
