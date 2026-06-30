"""Ingestion-Modul: Vorverarbeitung und semantische Ingestion.

Dieses Paket buendelt zwei Verantwortungsbereiche:

* Vorverarbeitungsschicht (Kapitel 5): PDF-Inventarisierung,
  Metadatenextraktion, Dokumentklassifikation, Qualitaetssicherung sowie
  Export von Inventar und Abbildungen. Erzeugt ein geprueftes, versionierbares
  Dokumentinventar als Eingabe fuer die semantische Ingestion.
* Semantische Ingestion (Kapitel 6): Extraktion, Normalisierung und
  Metadaten-Anreicherung vor Chunking und Embedding
  (siehe docs/06_semantische_ingestion.md).
"""

from .base import BaseIngestor, Document
from .document_classification import ClassificationResult, classify_document, normalize_bereich
from .figure_export import copy_selected_to_repo, save_all_figures, save_figure
from .inventory_export import (
    export_evaluation_report,
    export_inventory,
    export_inventory_errors,
    export_run_metadata,
    make_run_timestamp,
)
from .metadata_extraction import (
    ExtractionResult,
    HeaderMetadata,
    extract_metadata,
    parse_bundesanzeiger_header,
)
from .pdf_discovery import (
    DiscoveredDocument,
    build_inventory,
    compute_content_hash,
    discover_pdfs,
    filter_unique,
    normalize_filename,
)
from .quality_gate import (
    QualityAssessment,
    assess_document,
    compute_metadata_quality_score,
)

__all__ = [
    # Semantische Ingestion (Kapitel 6)
    "BaseIngestor",
    "Document",
    # PDF-Erfassung (Kapitel 5)
    "DiscoveredDocument",
    "build_inventory",
    "compute_content_hash",
    "discover_pdfs",
    "filter_unique",
    "normalize_filename",
    # Metadatenextraktion
    "ExtractionResult",
    "HeaderMetadata",
    "extract_metadata",
    "parse_bundesanzeiger_header",
    # Dokumentklassifikation
    "ClassificationResult",
    "classify_document",
    "normalize_bereich",
    # Qualitaetssicherung
    "QualityAssessment",
    "assess_document",
    "compute_metadata_quality_score",
    # Export
    "export_evaluation_report",
    "export_inventory",
    "export_inventory_errors",
    "export_run_metadata",
    "make_run_timestamp",
    # Abbildungen
    "copy_selected_to_repo",
    "save_all_figures",
    "save_figure",
]
