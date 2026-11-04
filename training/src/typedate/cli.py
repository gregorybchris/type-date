"""Command line entry point. Run `uv run td --help` from `training/`."""

import typer

app = typer.Typer(no_args_is_help=True, help="type-date data, training, and eval commands")


@app.callback()
def main() -> None:
    """type-date data, training, and eval commands."""


@app.command()
def hello() -> None:
    """Check that the CLI works."""
    typer.echo("td ok")


if __name__ == "__main__":
    app()
