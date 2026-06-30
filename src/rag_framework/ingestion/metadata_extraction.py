"""Metadatenextraktion fuer Bundesanzeiger-PDFs.

Docling-basierte Extraktion mit pypdf-Fallback. Erkennt und parst die
Bundesanzeiger-Header und extrahiert die Felder Name, Bereich, Information und
Veroeffentlichungsdatum. Teil der Vorverarbeitungsschicht (Kapitel 5).
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class HeaderMetadata:
    """Aus dem Bundesanzeiger-Header extrahierte Rohfelder."""

    header_name_raw: str | None = None
    header_bereich_raw: str | None = None
    header_information_raw: str | None = None
    header_vdatum_raw: str | None = None
    header_detected_flag: bool = False
    header_extraction_confidence: float = 0.0
    header_extraction_method: str | None = None


@dataclass
class ExtractionResult:
    """Ergebnis der Metadatenextraktion eines einzelnen Dokuments."""

    text: str = ""
    page_count: int = 0
    extraction_method: str = "none"
    docling_used: bool = False
    parse_status: str = "ok"
    error_type: str | None = None
    error_message: str | None = None
    header: HeaderMetadata = field(default_factory=HeaderMetadata)
    extraction_trace: list[str] = field(default_factory=list)


# Bundesanzeiger-Header-Felder: Label -> Zielattribut
_HEADER_FIELDS: dict[str, str] = {
    "Name": "header_name_raw",
    "Bereich": "header_bereich_raw",
    "Information": "header_information_raw",
    "Veroeffentlichungsdatum": "header_vdatum_raw",
}


def _extract_with_docling(path: Path, result: ExtractionResult) -> bool:
    """Versucht die Extraktion mit Docling.

    Args:
        path: Pfad zur PDF-Datei.
        result: Zu befuellendes Ergebnisobjekt (wird in-place ergaenzt).

    Returns:
        True bei erfolgreicher Docling-Extraktion, sonst False.
    """
    try:
        from docling.document_converter import DocumentConverter
    except ImportError:
        result.extraction_trace.append("docling_not_available")
        return False

    try:
        converter = DocumentConverter()
        converted = converter.convert(str(path))
        document = converted.document
        result.text = document.export_to_markdown()
        result.page_count = getattr(document, "num_pages", 0) or 0
        result.extraction_method = "docling"
        result.docling_used = True
        result.extraction_trace.append("docling_ok")
        return True
    except Exception as exc:  # noqa: BLE001 - Fallback ist beabsichtigt
        result.extraction_trace.append(f"docling_failed:{type(exc).__name__}")
        return False


def _extract_with_pypdf(path: Path, result: ExtractionResult) -> bool:
    """Fallback-Extraktion mit pypdf.

    Args:
        path: Pfad zur PDF-Datei.
        result: Zu befuellendes Ergebnisobjekt (wird in-place ergaenzt).

    Returns:
        True bei erfolgreicher pypdf-Extraktion, sonst False.
    """
    try:
        from pypdf import PdfReader
    except ImportError:
        result.extraction_trace.append("pypdf_not_available")
        return False

    try:
        reader = PdfReader(str(path))
        pages_text = [page.extract_text() or "" for page in reader.pages]
        result.text = "\n".join(pages_text)
        result.page_count = len(reader.pages)
        result.extraction_method = "pypdf_fallback"
        result.docling_used = False
        result.extraction_trace.append("pypdf_ok")
        return True
    except Exception as exc:  # noqa: BLE001
        result.extraction_trace.append(f"pypdf_failed:{type(exc).__name__}")
        result.parse_status = "error"
        result.error_type = "extraction_error"
        result.error_message = str(exc)
        return False


def parse_bundesanzeiger_header(text: str) -> HeaderMetadata:
    """Parst die Bundesanzeiger-Header-Felder aus dem Dokumenttext.

    Erkennt zeilenweise die Labels Name, Bereich, Information und
    Veroeffentlichungsdatum und extrahiert die zugehoerigen Werte.

    Args:
        text: Extrahierter Dokumenttext (Anfang genuegt in der Regel).

    Returns:
        HeaderMetadata mit befuellten Rohfeldern, Erkennungsflag und Konfidenz.
    """
    header = HeaderMetadata(header_extraction_method="regex")
    head = "\n".join(text.splitlines()[:60])
    found = 0

    for label, attribute in _HEADER_FIELDS.items():
        pattern = rf"{re.escape(label)}\s*[:\-]\s*(.+)"
        match = re.search(pattern, head, flags=re.IGNORECASE)
        if match:
            value = match.group(1).strip()
            if value:
                setattr(header, attribute, value)
                found += 1

    header.header_detected_flag = found >= 2
    header.header_extraction_confidence = round(found / len(_HEADER_FIELDS), 2)
    return header


def extract_metadata(
    path: str | Path,
    use_docling: bool = True,
    use_pypdf_fallback: bool = True,
) -> ExtractionResult:
    """Extrahiert Text und Bundesanzeiger-Metadaten aus einem PDF.

    Verwendet primaer Docling und faellt bei Bedarf auf pypdf zurueck.

    Args:
        path: Pfad zur PDF-Datei.
        use_docling: Docling-Extraktion zulassen.
        use_pypdf_fallback: pypdf-Fallback zulassen.

    Returns:
        ExtractionResult mit Text, Status, Methode und Header-Metadaten.
    """
    pdf_path = Path(path)
    result = ExtractionResult()

    extracted = False
    if use_docling:
        extracted = _extract_with_docling(pdf_path, result)
    if not extracted and use_pypdf_fallback:
        extracted = _extract_with_pypdf(pdf_path, result)

    if not extracted:
        result.parse_status = "error"
        result.error_type = result.error_type or "no_extractor_succeeded"
        result.error_message = result.error_message or (
            "Weder Docling noch pypdf konnten das Dokument verarbeiten."
        )
        return result

    if result.text.strip():
        result.header = parse_bundesanzeiger_header(result.text)
        result.header.header_extraction_method = result.extraction_method
    else:
        result.parse_status = "warning"
        result.error_type = "empty_text"
        result.error_message = "Kein Text extrahierbar (moeglicher Scan/OCR-Bedarf)."

    return result
