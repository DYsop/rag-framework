"""Knowledge-Modul: Wissensorganisation, Provenance und Source Trust.

Verwaltet Herkunftsinformationen, Zitierfähigkeit und die Vertrauensbewertung von
Quellen. Siehe docs/07_vektordatenbank_wissensorganisation.md.
"""

from .provenance import ProvenanceRecord, SourceTrust

__all__ = ["ProvenanceRecord", "SourceTrust"]
