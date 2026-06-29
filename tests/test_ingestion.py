"""Tests fuer das Ingestion-Modul."""

from rag_framework.ingestion import Document


def test_document_defaults():
    doc = Document(content="hallo", source="quelle.txt")
    assert doc.content == "hallo"
    assert doc.source == "quelle.txt"
    assert doc.metadata == {}


def test_document_metadata():
    doc = Document(content="x", source="s", metadata={"lang": "de"})
    assert doc.metadata["lang"] == "de"


# TODO: Tests fuer konkrete Ingestoren ergaenzen, sobald implementiert
# (siehe src/rag_framework/ingestion/base.py).
