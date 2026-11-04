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


data_app = typer.Typer(no_args_is_help=True, help="Dataset commands")
app.add_typer(data_app, name="data")


@data_app.command("build")
def data_build(
    version: str = typer.Argument(..., help="Dataset version, e.g. v001"),
    n: int = typer.Option(40000, help="Number of grammar samples"),
    seed: int = typer.Option(0),
    noise_rate: float = typer.Option(0.3),
    prefix_rate: float = typer.Option(0.15),
    notes: str = typer.Option(""),
) -> None:
    """Generate data/<version>/ from the grammar."""
    from pathlib import Path

    from .datagen.build import build

    root = Path(__file__).resolve().parents[3]
    out = root / "data" / version
    ext = root / "training" / "data_src" / "external.jsonl"
    meta = build(out, version, n, seed, noise_rate, prefix_rate, ext, notes)
    typer.echo(f"wrote {out}")
    typer.echo(f"counts: {meta['counts']}  dropped_conflicts: {meta['dropped_conflicts']}")


@data_app.command("intents")
def data_intents(
    n: int = typer.Option(1200, help="Number of intents"),
    shard_size: int = typer.Option(100),
    seed: int = typer.Option(101),
    out: str = typer.Option("gen/intents", help="Output dir under training/"),
) -> None:
    """Write intent shards for LLM paraphrasing. Each line has the canonical text and the DSL label."""
    import json
    import random
    from pathlib import Path

    from .datagen.generators import GENERATORS

    rng = random.Random(seed)
    gens = [g for g in GENERATORS if g[0] != "non-date-noise"]
    root = Path(__file__).resolve().parents[2] / out
    root.mkdir(parents=True, exist_ok=True)
    seen: set[str] = set()
    rows = []
    while len(rows) < n:
        g = rng.choices(gens, weights=[x[2] for x in gens])[0]
        ex = g[1](rng)
        if ex.text in seen:
            continue
        seen.add(ex.text)
        rows.append({"iid": f"i{len(rows):05d}", "canonical": ex.text, "dsl": ex.dsl, "tag": ex.tag})
    for i in range(0, n, shard_size):
        path = root / f"shard-{i // shard_size:02d}.jsonl"
        path.write_text("\n".join(json.dumps(r) for r in rows[i : i + shard_size]) + "\n")
    typer.echo(f"wrote {n} intents in {(n + shard_size - 1) // shard_size} shards to {root}")


if __name__ == "__main__":
    app()
