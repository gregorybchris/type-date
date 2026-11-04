from typer.testing import CliRunner

from typedate.cli import app


def test_hello() -> None:
    result = CliRunner().invoke(app, ["hello"])
    assert result.exit_code == 0
    assert "td ok" in result.output


def test_engine_dirs_order() -> None:
    from typedate.common import engine_dirs

    names = [d.name for d in engine_dirs()]
    assert names[0] == "chrono"
    nums = [int(n[1:]) for n in names[1:]]
    assert nums == sorted(nums)


def test_results_table() -> None:
    result = CliRunner().invoke(app, ["results", "--eval-version", "e10"])
    assert result.exit_code == 0
    assert "| engine |" in result.output
