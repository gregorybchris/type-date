"""Command line entry point. Run `uv run td --help` from `training/`."""

import json

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


@data_app.command("ingest-llm")
def data_ingest_llm(
    version: str = typer.Argument(..., help="New version, e.g. v002"),
    base: str = typer.Option("v001"),
    test_frac: float = typer.Option(0.3, help="Share of intents held out as test_llm"),
) -> None:
    """Add LLM paraphrases from training/gen/out/ to a copy of a base dataset."""
    from pathlib import Path

    from .datagen.llm import ingest

    gen = Path(__file__).resolve().parents[2] / "gen"
    meta = ingest(base, version, gen, test_frac)
    typer.echo(f"counts: {meta['counts']} skipped: {meta['llm_skipped']}")


@data_app.command("intents")
def data_intents(
    n: int = typer.Option(1200, help="Number of intents"),
    shard_size: int = typer.Option(100),
    seed: int = typer.Option(101),
    out: str = typer.Option("gen/intents", help="Output dir under training/"),
) -> None:
    """Write intent shards for LLM paraphrasing (canonical text plus DSL label per line)."""
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
        rows.append(
            {"iid": f"i{len(rows):05d}", "canonical": ex.text, "dsl": ex.dsl, "tag": ex.tag}
        )
    for i in range(0, n, shard_size):
        path = root / f"shard-{i // shard_size:02d}.jsonl"
        path.write_text("\n".join(json.dumps(r) for r in rows[i : i + shard_size]) + "\n")
    typer.echo(f"wrote {n} intents in {(n + shard_size - 1) // shard_size} shards to {root}")


train_app = typer.Typer(no_args_is_help=True, help="Training commands")
app.add_typer(train_app, name="train")


@train_app.command("run")
def train_run(
    exp: int = typer.Argument(..., help="Experiment number"),
    title: str = typer.Option(..., help="Short experiment title"),
    dataset: str = typer.Option("v001"),
    d_model: int = typer.Option(256),
    d_ff: int = typer.Option(1024),
    heads: int = typer.Option(4),
    enc_layers: int = typer.Option(4),
    dec_layers: int = typer.Option(4),
    vocab: int = typer.Option(1000),
    epochs: int = typer.Option(8),
    batch_size: int = typer.Option(128),
    lr: float = typer.Option(1e-3),
    max_train: int = typer.Option(0, help="Limit train rows (0 = all)"),
    notes: str = typer.Option(""),
) -> None:
    """Train from scratch, evaluate, and write runs/exp-NNN/."""
    from .train import TrainConfig, run

    cfg = TrainConfig(exp, title, dataset, d_model, d_ff, heads, enc_layers, dec_layers, vocab,
                      epochs, batch_size, lr, 0, notes, max_train)  # fmt: skip
    res = run(cfg)
    ev = res["metrics"]["eval"]
    typer.echo(f"exp-{exp:03d} exact={ev['exact']:.4f} resolved={ev['resolved']:.4f}")


export_app = typer.Typer(no_args_is_help=True, help="Export commands")
app.add_typer(export_app, name="export")


@export_app.command("run")
def export_run(
    exp: int = typer.Argument(...),
    quant: str = typer.Option("int8", help="fp32 or int8"),
) -> None:
    """Export artifacts/exp-NNN/torch to ONNX and quantize."""
    from .export import export

    res = export(exp, quant)
    typer.echo(json.dumps(res, indent=2))


if __name__ == "__main__":
    app()
