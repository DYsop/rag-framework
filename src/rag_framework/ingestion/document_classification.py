"""Dokumentklassifikation fuer das Bundesanzeiger-Inventar.

Normalisiert Bereiche und leitet Dokumenttyp, -untertyp und -familie ueber
regelbasierte Logik ab. Teil der Vorverarbeitungsschicht (Kapitel 5).
"""

from __future__ import annotations

import re
from dataclasses import dataclass


@dataclass
class ClassificationResult:
    """Ergebnis der Dokumentklassifikation."""

    bereich_normalized: str = "unbekannt"
    doc_type: str = "unbekannt"
    doc_subtype: str = "unbekannt"
    doc_family: str = "unbekannt"
    doc_type_confidence: float = 0.0
    doc_type_source: str = "rule"


# Normalisierung der Bereichsbezeichnungen auf kanonische Schluessel.
_BEREICH_NORMALIZATION: dict[str, str] = {
    "rechnungslegung": "rechnungslegung_finanzberichte",
    "finanzbericht": "rechnungslegung_finanzberichte",
    "jahresabschluss": "rechnungslegung_finanzberichte",
    "kapitalmarkt": "kapitalmarkt",
    "wertpapier": "kapitalmarkt",
    "gesellschaftsbekanntmachung": "gesellschaftsbekanntmachungen",
    "hauptversammlung": "gesellschaftsbekanntmachungen",
}

# Familienzuordnung je normalisiertem Bereich.
_FAMILY_BY_BEREICH: dict[str, str] = {
    "rechnungslegung_finanzberichte": "finanzbericht",
    "kapitalmarkt": "kapitalmarktmitteilung",
    "gesellschaftsbekanntmachungen": "gesellschaftsbekanntmachung",
}

# Regeln: (kompiliertes Muster, doc_type, doc_subtype, doc_family).
_TYPE_RULES: list[tuple[re.Pattern[str], str, str, str]] = [
    (re.compile(r"konzernabschluss", re.IGNORECASE),
     "konzernabschluss", "konzernbilanz", "finanzbericht"),
    (re.compile(r"jahresabschluss|bilanz", re.IGNORECASE),
     "jahresabschluss", "bilanz_guv", "finanzbericht"),
    (re.compile(r"lagebericht", re.IGNORECASE),
     "lagebericht", "lagebericht", "finanzbericht"),
    (re.compile(r"stimmrecht", re.IGNORECASE),
     "stimmrechtsmitteilung", "meldung_wphg", "kapitalmarktmitteilung"),
    (re.compile(r"ad[- ]?hoc", re.IGNORECASE),
     "ad_hoc_mitteilung", "meldung_mar", "kapitalmarktmitteilung"),
    (re.compile(r"hauptversammlung|einladung", re.IGNORECASE),
     "hauptversammlung", "einladung", "gesellschaftsbekanntmachung"),
]


def normalize_bereich(bereich_raw: str | None) -> str:
    """Normalisiert einen rohen Bereichswert auf einen kanonischen Schluessel.

    Args:
        bereich_raw: Rohwert des Bereichs aus dem Header (oder None).

    Returns:
        Kanonischer Bereichsschluessel oder "unbekannt".
    """
    if not bereich_raw:
        return "unbekannt"
    lowered = bereich_raw.lower()
    for keyword, normalized in _BEREICH_NORMALIZATION.items():
        if keyword in lowered:
            return normalized
    return "unbekannt"


def classify_document(
    bereich_raw: str | None = None,
    information_raw: str | None = None,
    filename: str | None = None,
) -> ClassificationResult:
    """Klassifiziert ein Dokument anhand von Bereich, Information und Dateiname.

    Args:
        bereich_raw: Rohwert des Bereichs aus dem Header.
        information_raw: Rohwert der Information aus dem Header.
        filename: Dateiname als zusaetzliches Klassifikationssignal.

    Returns:
        ClassificationResult mit Bereich, Typ, Untertyp, Familie und Konfidenz.
    """
    result = ClassificationResult()
    result.bereich_normalized = normalize_bereich(bereich_raw)

    haystack = " ".join(
        part for part in (bereich_raw, information_raw, filename) if part
    )

    for pattern, doc_type, doc_subtype, doc_family in _TYPE_RULES:
        if pattern.search(haystack):
            result.doc_type = doc_type
            result.doc_subtype = doc_subtype
            result.doc_family = doc_family
            result.doc_type_confidence = 0.9
            result.doc_type_source = "rule"
            return result

    # Fallback: Familie aus dem normalisierten Bereich ableiten.
    family = _FAMILY_BY_BEREICH.get(result.bereich_normalized)
    if family:
        result.doc_family = family
        result.doc_type_confidence = 0.5
        result.doc_type_source = "bereich_fallback"

    return result
