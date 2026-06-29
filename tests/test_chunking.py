"""Tests fuer das Chunking-Modul."""

from rag_framework.chunking import Chunk


def test_chunk_fields():
    chunk = Chunk(text="abc", doc_source="d.txt", index=0)
    assert chunk.text == "abc"
    assert chunk.doc_source == "d.txt"
    assert chunk.index == 0
    assert chunk.metadata == {}


# TODO: Tests fuer konkrete Chunking-Strategien ergaenzen
# (siehe src/rag_framework/chunking/base.py).
