"""Command line entry point. Run `uv run td --help` from `training/`."""

import contextlib
import json

import typer

app = typer.Typer(no_args_is_help=True, help="type-date data and eval commands")


@app.callback()
def main() -> None:
    """type-date data and eval commands."""


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

    m = quick(
        version, of,
        {"val": 150, "test_template": 150, "test_noise": 100, "test_llm": 200, "test_external": 100,
         "test_external_hard": 100, "test_public": 40, "test_public2": 30, "test_v2": 100, "test_tax": 100},
    )  # fmt: skip
    typer.echo(json.dumps({k: v["n"] for k, v in m["files"].items()}))


@eval_app.command("check-leak")
def eval_check_leak(
    dataset: str = typer.Argument(...), eval_version: str = typer.Option("e1")
) -> None:
    """Report eval rows whose text also appears in a training dataset."""
    from .evalsets import check_leak

    typer.echo(json.dumps(check_leak(dataset, eval_version), indent=2))


@data_app.command("consensus")
def data_consensus(
    inputs: str = typer.Argument(...),
    label_a: str = typer.Argument(...),
    label_b: str = typer.Argument(...),
    out: str = typer.Option(..., help="Output JSONL"),
    source: str = typer.Option("realistic"),
    split: str = typer.Option("train"),
    meta: str = typer.Option("", help="JSON id -> {source,url,license} to attach to rows"),
) -> None:
    """Keep rows where two labelers agree and neither marked the row unsure."""
    from pathlib import Path

    from .consensus import consensus

    stats = consensus(
        Path(inputs),
        Path(label_a),
        Path(label_b),
        Path(out),
        source,
        split,
        Path(meta) if meta else None,
    )
    typer.echo(json.dumps(stats))


@data_app.command("mix")
def data_mix(
    version: str = typer.Argument(..., help="New train-only version, e.g. v005"),
    base: str = typer.Option("v004"),
    add: str = typer.Option(
        ..., help="JSONL to add (path relative to repo root, e.g. data/real/train.jsonl)"
    ),
    repeat: int = typer.Option(1, help="Repeat the added rows this many times"),
    eval_version: str = typer.Option(
        "e2", help="Drop added rows whose text is in this eval version"
    ),
) -> None:
    """Add extra labeled rows (for example realistic data) to a train set, upsampled."""
    from datetime import UTC, datetime
    from pathlib import Path

    from .common import ROOT, load_jsonl
    from .evalsets import load_eval

    banned = set()
    for rows in load_eval(eval_version).values():
        banned |= {" ".join(r["text"].lower().split()) for r in rows}
    base_rows = load_jsonl(ROOT / "data" / base / "train.jsonl")
    extra = [r for r in load_jsonl(ROOT / add) if " ".join(r["text"].lower().split()) not in banned]
    out = ROOT / "data" / version
    out.mkdir(parents=True, exist_ok=True)
    rows = base_rows + extra * repeat
    (out / "train.jsonl").write_text(
        "".join(json.dumps(r, ensure_ascii=False) + "\n" for r in rows)
    )
    meta = {
        "version": version, "created": datetime.now(UTC).isoformat(timespec="seconds"),
        "base": base, "counts": {"train": len(rows)}, "decontaminated_against": eval_version,
        "notes": f"{base} plus {len(extra)} rows from {add} repeated {repeat}x.",
    }  # fmt: skip
    (out / "meta.json").write_text(json.dumps(meta, indent=2))
    typer.echo(
        json.dumps(
            {
                "base": len(base_rows),
                "added_unique": len(extra),
                "repeat": repeat,
                "total": len(rows),
            }
        )
    )
    _ = Path


@data_app.command("web-batch")
def data_web_batch(
    name: str = typer.Option("web", help="Batch name used in output file names"),
    pattern: str = typer.Option(
        "gen/external/web-*.jsonl", help="Web research files, relative to training/"
    ),
    per_source: int = typer.Option(120, help="Max phrases per source"),
    sealed_sources: str = typer.Option(
        "", help="Comma list of source substrings sealed as whole sources"
    ),
    sealed_frac: float = typer.Option(0.2, help="Share of the other rows sealed at random"),
    chunk: int = typer.Option(400),
    seed: int = typer.Option(3),
    max_len: int = typer.Option(90),
) -> None:
    """Sample web phrases by source, drop anything seen before, split dev/sealed, write labeling chunks."""
    import glob
    import random
    from collections import defaultdict
    from pathlib import Path

    root = Path(__file__).resolve().parents[2]
    repo = root.parent

    def norm(t: str) -> str:
        return " ".join(t.lower().split())

    banned: set[str] = set()
    for f in [
        *glob.glob(str(repo / "data/*/*.jsonl")),
        *glob.glob(str(repo / "data/pool/*/*.jsonl")),
        *glob.glob(str(repo / "evals/*/*.jsonl")),
        *glob.glob(str(root / "gen/external/*inputs*.jsonl")),
    ]:
        for line in Path(f).read_text().splitlines():
            if line.strip():
                with contextlib.suppress(json.JSONDecodeError, KeyError):
                    banned.add(norm(json.loads(line)["text"]))
    by_src: dict[str, list[dict]] = defaultdict(list)
    seen: set[str] = set()
    for f in sorted(glob.glob(str(root / pattern))):
        for line in Path(f).read_text().splitlines():
            if not line.strip():
                continue
            try:
                r = json.loads(line)
            except json.JSONDecodeError:
                continue
            t = str(r.get("text", "")).strip()
            k = norm(t)
            if not k or k in seen or k in banned or len(t) > max_len or len(t) < 2:
                continue
            seen.add(k)
            by_src[r.get("source", "unknown")].append({**r, "text": t})
    rng = random.Random(seed)
    picked: list[dict] = []
    for _, rows in sorted(by_src.items()):
        rng.shuffle(rows)
        picked += rows[:per_source]
    rng.shuffle(picked)
    sealed_keys = [x.strip().lower() for x in sealed_sources.split(",") if x.strip()]

    def is_sealed_src(r: dict) -> bool:
        return any(k in r.get("source", "").lower() for k in sealed_keys)

    held = [r for r in picked if is_sealed_src(r)]
    rest = [r for r in picked if not is_sealed_src(r)]
    n_seal = int(len(rest) * sealed_frac)
    sealed_mixed, pool = rest[:n_seal], rest[n_seal:]
    ext = root / "gen/external"
    meta = {}

    def write(name: str, items: list[dict], prefix: str) -> None:
        lines = []
        for i, r in enumerate(items):
            rid = f"{prefix}{i:04d}"
            meta[rid] = {k: r.get(k) for k in ("source", "url", "license", "note")}
            lines.append(json.dumps({"id": rid, "text": r["text"]}))
        (ext / name).write_text("\n".join(lines) + "\n")

    write(f"{name}-heldout-inputs.jsonl", held, f"{name}hs")
    write(f"{name}-sealed-inputs.jsonl", sealed_mixed, f"{name}sm")
    chunks = [pool[i : i + chunk] for i in range(0, len(pool), chunk)]
    for k, c in enumerate(chunks):
        write(f"{name}-pool-inputs-{k}.jsonl", c, f"{name}p{k}-")
    (ext / f"{name}-meta.json").write_text(json.dumps(meta))
    typer.echo(json.dumps({
        "sources": {k: len(v) for k, v in sorted(by_src.items())},
        "picked": len(picked), "heldout_sources": len(held), "sealed_mixed": len(sealed_mixed),
        "pool_chunks": [len(c) for c in chunks],
    }, indent=1))  # fmt: skip


@data_app.command("retag")
def data_retag(
    paths: list[str] = typer.Argument(..., help="JSONL files (relative to the repo root)"),
) -> None:
    """Recompute primary_tag from the label for rows without a generator tag (consensus rows)."""
    from pathlib import Path

    from .evalsets import tag_from_dsl

    repo = Path(__file__).resolve().parents[3]
    for rel in paths:
        p = repo / rel
        rows = [json.loads(x) for x in p.read_text().splitlines() if x.strip()]
        n = 0
        for r in rows:
            if r.get("source", "").startswith(("grammar", "noise", "prefix", "llm")):
                continue
            t = tag_from_dsl(r["dsl"])
            if t != r.get("primary_tag"):
                r["primary_tag"] = t
                n += 1
        p.write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in rows))
        typer.echo(f"{rel}: retagged {n} of {len(rows)}")


@data_app.command("prepare-batch")
def data_prepare_batch(
    name: str = typer.Argument(..., help="Batch name, e.g. tax"),
    pattern: str = typer.Argument(
        ..., help="Glob of writer files, relative to training/, e.g. 'gen/external/tax-*.jsonl'"
    ),
    dev: int = typer.Option(250, help="Rows for the dev set"),
    test: int = typer.Option(
        0, help="Rows for a hidden test set (written as NAME-test-inputs.jsonl)"
    ),
    chunk: int = typer.Option(400, help="Rows per labeling chunk"),
    seed: int = typer.Option(1),
    max_len: int = typer.Option(120),
) -> None:
    """Merge writer files, drop duplicates and anything seen in train or eval, split for labeling."""
    import glob
    import random
    from pathlib import Path

    root = Path(__file__).resolve().parents[2]
    repo = root.parent

    def norm(t: str) -> str:
        return " ".join(t.lower().split())

    rows = []
    for f in sorted(glob.glob(str(root / pattern))):
        for line in Path(f).read_text().splitlines():
            if line.strip():
                with contextlib.suppress(json.JSONDecodeError, KeyError):
                    rows.append(json.loads(line)["text"])
    banned: set[str] = set()
    sources = [*glob.glob(str(repo / "data/*/*.jsonl")), *glob.glob(str(repo / "evals/*/*.jsonl"))]
    for f in sources:
        for line in Path(f).read_text().splitlines():
            if line.strip():
                with contextlib.suppress(json.JSONDecodeError, KeyError):
                    banned.add(norm(json.loads(line)["text"]))
    for f in glob.glob(str(root / "gen/external/*inputs*.jsonl")):
        for line in Path(f).read_text().splitlines():
            if line.strip():
                banned.add(norm(json.loads(line)["text"]))
    seen: set[str] = set()
    out = []
    for t in rows:
        k = norm(t)
        if k and k not in seen and k not in banned and len(t) <= max_len:
            seen.add(k)
            out.append(t)
    random.Random(seed).shuffle(out)
    ext = root / "gen/external"

    def write(fname: str, items: list[str], prefix: str) -> None:
        (ext / fname).write_text(
            "".join(
                json.dumps({"id": f"{prefix}{i:04d}", "text": t}) + "\n"
                for i, t in enumerate(items)
            )
        )

    dev_rows, test_rows, train = out[:dev], out[dev : dev + test], out[dev + test :]
    write(f"{name}-dev-inputs.jsonl", dev_rows, f"{name}d")
    if test:
        write(f"{name}-test-inputs.jsonl", test_rows, f"{name}x")
    chunks = [train[i : i + chunk] for i in range(0, len(train), chunk)]
    for k, c in enumerate(chunks):
        write(f"{name}-train-inputs-{k}.jsonl", c, f"{name}t{k}-")
    typer.echo(
        json.dumps(
            {
                "raw": len(rows),
                "kept": len(out),
                "dev": len(dev_rows),
                "test": len(test_rows),
                "train_chunks": [len(c) for c in chunks],
            }
        )
    )


@data_app.command("decontaminate")
def data_decontaminate(
    version: str = typer.Argument(..., help="New train-only version, e.g. v003"),
    base: str = typer.Option("v002"),
    eval_version: str = typer.Option("e1"),
    drop_policy: bool = typer.Option(False, help="Also drop label-policy-ambiguous rows"),
) -> None:
    """Drop train rows whose text appears in an eval version. Writes data/<version>/train.jsonl."""
    from .evalsets import decontaminate

    typer.echo(json.dumps(decontaminate(base, version, eval_version, drop_policy)))


@eval_app.command("coverage")
def eval_coverage() -> None:
    """Matrix of engines by eval version, with the gaps marked."""
    from .evalsets import coverage

    coverage()


@eval_app.command("extend")
def eval_extend(
    version: str = typer.Argument(..., help="e.g. e3"),
    parent: str = typer.Option("e2"),
    extra: list[str] | None = typer.Option(None, "--extra", help="split=path.jsonl (repeatable)"),
    reason: str = typer.Option(...),
) -> None:
    """Cut a new eval version that keeps every parent row and adds new splits."""
    from pathlib import Path

    from .evalsets import extend as _extend

    adds = {}
    for e in extra or []:
        name, path = e.split("=", 1)
        adds[name] = [json.loads(x) for x in Path(path).read_text().splitlines() if x.strip()]
    m = _extend(version, parent, adds, reason)
    typer.echo(json.dumps({k: v["n"] for k, v in m["files"].items()}))


@eval_app.command("cut-clean")
def eval_cut_clean(
    version: str = typer.Argument(..., help="e.g. e2"),
    parent: str = typer.Option("e1"),
    extra: list[str] | None = typer.Option(None, "--extra", help="split=path.jsonl (repeatable)"),
    reason: str = typer.Option(...),
) -> None:
    """Cut a new eval version: parent minus policy-ambiguous rows, plus extra splits."""
    from pathlib import Path

    from .evalsets import cut_clean

    adds = {}
    for e in extra or []:
        name, path = e.split("=", 1)
        adds[name] = [json.loads(x) for x in Path(path).read_text().splitlines() if x.strip()]
    m = cut_clean(version, parent, adds, reason)
    typer.echo(json.dumps({k: v["n"] for k, v in m["files"].items()}))


@app.command("results")
def results(
    eval_version: str = typer.Option("e10"),
) -> None:
    """Results table for one eval version: resolved accuracy overall and on realistic splits."""
    from .common import engine_dirs

    rows = []
    for d in engine_dirs():
        m = json.loads((d / "metrics.json").read_text())
        c = json.loads((d / "config.json").read_text())
        have = {}
        if m.get("eval", {}).get("version"):
            have[m["eval"]["version"]] = m["eval"]
        have.update(m.get("evals", {}))
        e = have.get(eval_version)
        if not e:
            continue
        sp = e["by_split"]

        def r(name: str, sp: dict = sp) -> str:
            v = sp.get(name)
            return f"{100 * v.get('resolved', v['exact']):.1f}" if v else "-"

        size = m.get("model", {}).get("size_bytes") or 0
        rows.append(
            (c["id"], f"{size / 1e3:.1f} kB", f"{100 * e['resolved']:.1f}",
             r("test_external"), r("test_external_hard"), r("test_web_sealed"))
        )  # fmt: skip
    head = ("engine", "size", "all", "realistic", "hard", "web")
    typer.echo("| " + " | ".join(head) + " |")
    typer.echo("|" + "---|" * len(head))
    for row in rows:
        typer.echo("| " + " | ".join(row) + " |")


if __name__ == "__main__":
    app()
