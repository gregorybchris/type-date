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
    digit_split: bool = typer.Option(False, help="Tokenize digits one by one"),
    description: str = typer.Option("", help="1-2 sentence plain description of the experiment"),
    eval_version: str = typer.Option("e1", help="Eval set version (evals/<version>)"),
    seed: int = typer.Option(0),
    parent: int = typer.Option(0, help="Reference experiment number (0 = none)"),
    notes: str = typer.Option(""),
) -> None:
    """Train from scratch, evaluate, and write runs/exp-NNN/."""
    from .train import TrainConfig, run

    cfg = TrainConfig(
        exp=exp, title=title, dataset=dataset, d_model=d_model, d_ff=d_ff, heads=heads,
        enc_layers=enc_layers, dec_layers=dec_layers, vocab=vocab, epochs=epochs,
        batch_size=batch_size, lr=lr, seed=seed, notes=notes, max_train=max_train,
        digit_split=digit_split, parent=parent, description=description, eval_version=eval_version,
    )  # fmt: skip
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


eval_app = typer.Typer(no_args_is_help=True, help="Versioned eval sets")
app.add_typer(eval_app, name="eval")


@eval_app.command("create")
def eval_create(
    version: str = typer.Argument(..., help="e.g. e1"),
    from_dataset: str = typer.Option("v002", "--from"),
    parent: str = typer.Option("", help="Parent eval version"),
    reason: str = typer.Option("first eval set"),
) -> None:
    """Cut an immutable eval version from a dataset's eval splits."""
    from .evalsets import create

    m = create(version, from_dataset, parent or None, reason)
    typer.echo(json.dumps({k: v["n"] for k, v in m["files"].items()}))


@eval_app.command("quick")
def eval_quick(
    version: str = typer.Argument(..., help="e.g. e1q"),
    of: str = typer.Option("e1"),
) -> None:
    """Cut a small stratified subset for fast screening."""
    from .evalsets import quick

    m = quick(version, of, {"val": 150, "test_template": 150, "test_noise": 100, "test_llm": 200})
    typer.echo(json.dumps({k: v["n"] for k, v in m["files"].items()}))


@eval_app.command("check-leak")
def eval_check_leak(
    dataset: str = typer.Argument(...), eval_version: str = typer.Option("e1")
) -> None:
    """Report eval rows whose text also appears in a training dataset."""
    from .evalsets import check_leak

    typer.echo(json.dumps(check_leak(dataset, eval_version), indent=2))


@data_app.command("decontaminate")
def data_decontaminate(
    version: str = typer.Argument(..., help="New train-only version, e.g. v003"),
    base: str = typer.Option("v002"),
    eval_version: str = typer.Option("e1"),
) -> None:
    """Drop train rows whose text appears in an eval version. Writes data/<version>/train.jsonl."""
    from .evalsets import decontaminate

    typer.echo(json.dumps(decontaminate(base, version, eval_version)))


@eval_app.command("zeroshot")
def eval_zeroshot(
    exp: int = typer.Argument(...),
    model_id: str = typer.Option(..., "--model", help="HF causal LM id"),
    title: str = typer.Option(...),
    description: str = typer.Option(...),
    eval_version: str = typer.Option("e1q"),
    shots: int = typer.Option(24),
) -> None:
    """Score a pretrained causal LM with a few-shot prompt and no training."""
    from .zeroshot import run

    ev = run(exp, model_id, title, description, eval_version, shots)
    typer.echo(f"exp-{exp:03d} exact={ev['exact']:.4f} resolved={ev['resolved']:.4f}")


@eval_app.command("rerun")
def eval_rerun(
    exp: int = typer.Argument(...),
    eval_version: str = typer.Option("e1"),
    primary: bool = typer.Option(True, help="Make this the run's main eval"),
) -> None:
    """Re-score a trained scratch model checkpoint on an eval version."""
    from .rerun import rerun

    ev = rerun(exp, eval_version, primary)
    typer.echo(
        f"exp-{exp:03d} on {eval_version}: exact={ev['exact']:.4f} resolved={ev['resolved']:.4f}"
    )


exp_app = typer.Typer(no_args_is_help=True, help="Experiment bookkeeping")
app.add_typer(exp_app, name="exp")


@exp_app.command("timing")
def exp_timing(
    last: int = typer.Option(0, help="Only the last N experiments (0 = all)"),
) -> None:
    """Show where wall time goes per experiment and across the outer loop."""
    from .timing_report import report

    report(last)


if __name__ == "__main__":
    app()
