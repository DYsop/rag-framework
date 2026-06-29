"""Tests fuer das Agents-Modul."""

from rag_framework.agents import Tool


def test_tool_fields():
    tool = Tool(name="retriever", description="Ruft Inhalte ab.", func=lambda q: q)
    assert tool.name == "retriever"
    assert callable(tool.func)
    assert tool.func("x") == "x"


# TODO: Tests fuer konkrete Agenten (Planung, Toolnutzung, Quellenbindung)
# ergaenzen (siehe src/rag_framework/agents/base.py).
