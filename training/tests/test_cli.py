from typer.testing import CliRunner

from typedate.cli import app


def test_hello() -> None:
    result = CliRunner().invoke(app, ["hello"])
    assert result.exit_code == 0
    assert "td ok" in result.output
