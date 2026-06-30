"""Qualitaetssicherung (Quality Gate) fuer das Dokumentinventar.

Bewertet Parse-Status, Metadatenqualitaet und Retrieval Readiness und steuert
das Manual Review. Teil der Vorverarbeitungsschicht (Kapitel 5).
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class QualityAssessment:
    """Ergebnis der Qualitaetsbewertung eines Dokuments."""

    parse_status: str = "ok"
    error_type: str | None = None
    warning_flags: list[str] = field(default_factory=list)
    quality_score: float = 0.0
    metadata_quality_score: float = 0.0
    needs_manual_review: bool = False
    review_reasons: list[str] = field(default_factory=list)
    review_priority: str = "none"
    retrieval_readiness_flag: bool = False


# Gewichte der Metadatenfelder fuer den Metadata Quality Score.
_METADATA_WEIGHTS: dict[str, float] = {
    "company_normalized": 0.25,
    "bereich_normalized": 0.20,
    "publication_date": 0.20,
    "doc_type": 0.20,
    "fiscal_year": 0.15,
}


def compute_metadata_quality_score(metadata: dict[str, object]) -> float:
    """Berechnet den Metadata Quality Score aus der Vollstaendigkeit der Felder.

    Args:
        metadata: Abbildung der extrahierten Metadatenfelder auf ihre Werte.

    Returns:
        Gewichteter Score im Bereich [0, 1].
    """
    score = 0.0
    for field_name, weight in _METADATA_WEIGHTS.items():
        value = metadata.get(field_name)
        if value not in (None, "", "unbekannt"):
            score += weight
    return round(score, 3)


def assess_document(
    parse_status: str,
    metadata: dict[str, object],
    page_count: int = 0,
    header_detected: bool = False,
    is_duplicate: bool = False,
    min_metadata_quality_score: float = 0.8,
) -> QualityAssessment:
    """Bewertet ein Dokument und leitet Review- und Readiness-Entscheidungen ab.

    Args:
        parse_status: Status der Extraktion (ok / warning / error).
        metadata: Extrahierte und normalisierte Metadatenfelder.
        page_count: Seitenzahl des Dokuments.
        header_detected: Ob der Bundesanzeiger-Header erkannt wurde.
        is_duplicate: Ob das Dokument als Duplikat markiert ist.
        min_metadata_quality_score: Schwellenwert fuer Retrieval Readiness.

    Returns:
        QualityAssessment mit Scores, Review-Status und Readiness-Flag.
    """
    assessment = QualityAssessment(parse_status=parse_status)
    assessment.metadata_quality_score = compute_metadata_quality_score(metadata)

    # Warnungen sammeln.
    if not header_detected:
        assessment.warning_flags.append("header_not_detected")
    if page_count <= 0:
        assessment.warning_flags.append("page_count_unknown")
    if is_duplicate:
        assessment.warning_flags.append("duplicate")

    # Quality Score: Basis aus Parse-Status, Abzug je Warnung.
    base_score = {"ok": 1.0, "warning": 0.6, "error": 0.0}.get(parse_status, 0.0)
    penalty = 0.1 * len(assessment.warning_flags)
    assessment.quality_score = round(max(0.0, base_score - penalty), 3)

    # Review-Bedarf und Begruendungen.
    if parse_status == "error":
        assessment.review_reasons.append("parse_error")
        assessment.error_type = "parse_error"
    if assessment.metadata_quality_score < min_metadata_quality_score:
        assessment.review_reasons.append("low_metadata_quality")
    if not header_detected:
        assessment.review_reasons.append("missing_header")

    assessment.needs_manual_review = bool(assessment.review_reasons)

    # Review-Priorisierung.
    if parse_status == "error":
        assessment.review_priority = "high"
    elif assessment.needs_manual_review:
        assessment.review_priority = "medium"
    else:
        assessment.review_priority = "none"

    # Retrieval Readiness: nur fehlerfreie, hinreichend reiche Dokumente.
    assessment.retrieval_readiness_flag = (
        parse_status == "ok"
        and assessment.metadata_quality_score >= min_metadata_quality_score
        and not is_duplicate
    )

    return assessment
