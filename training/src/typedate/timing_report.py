"""Summarize runs/*/timing.json: wall time by bucket, per experiment and overall."""

import json
from datetime import datetime
from pathlib import Path

from rich.console import Console
from rich.table import Table

ROOT = Path(__file__).resolve().parents[3]


def _group(key: str) -> str:
    """Map a flat bucket key to a reporting group."""
    if key.startswith("train.train_loop/"):
        return "train: " + key.split("/", 1)[1]
    if key.startswith("train.train_loop"):
        return "train: loop (total)"
    if key.startswith("train.eval_score/"):
        return "eval: resolver subprocess"
    if key.startswith("train.eval_score"):
        return "eval: score"
    if key.startswith("train.eval_generate"):
        return "eval: generate"
    if key.startswith("train."):
        return "train: setup/save (" + key.split(".", 1)[1] + ")"
    if key.startswith("export."):
        return "export: " + key.split(".", 1)[1]
    if key.startswith("bench"):
        return "bench: " + key.split(".", 1)[1]
    return key


def report(last: int = 0) -> None:
    console = Console()
    runs = []
    for p in sorted((ROOT / "runs").glob("exp-*/timing.json")):
        d = json.loads(p.read_text())
        runs.append((p.parent.name, d))
    if last:
        runs = runs[-last:]
    if not runs:
        console.print("no timing.json files yet")
        return
    # top-level automated buckets (no sub-bucket double counting)
    top = ["train.data_load", "train.tokenizer_train", "train.model_init", "train.encode_train",
           "train.train_loop", "train.eval_generate", "train.eval_score", "train.save_checkpoint",
           "train.write_results"]  # fmt: skip
    t = Table(title="Wall time by experiment (seconds)")
    t.add_column("exp")
    t.add_column("total", justify="right")
    t.add_column("train loop", justify="right")
    t.add_column("eval gen", justify="right")
    t.add_column("eval score", justify="right")
    t.add_column("setup+save", justify="right")
    t.add_column("export", justify="right")
    t.add_column("bench", justify="right")
    t.add_column("biggest", justify="left")
    agg: dict[str, float] = {}
    starts, ends = [], []
    for name, d in runs:
        b = d["buckets"]
        loop = b.get("train.train_loop", 0)
        gen = b.get("train.eval_generate", 0)
        score = b.get("train.eval_score", 0)
        setup = sum(b.get(k, 0) for k in top if k not in (
            "train.train_loop", "train.eval_generate", "train.eval_score"))  # fmt: skip
        exp_s = d["stages"].get("export", {}).get("total_s", 0)
        bench_s = sum(v.get("total_s", 0) for k, v in d["stages"].items() if k.startswith("bench"))
        parts = {"train loop": loop, "eval generate": gen, "eval score": score,
                 "setup+save": setup, "export": exp_s, "bench": bench_s}  # fmt: skip
        big = max(parts, key=lambda k: parts[k])
        for k, v in parts.items():
            agg[k] = agg.get(k, 0) + v
        t.add_row(name, f"{d['total_s']:.0f}", f"{loop:.0f}", f"{gen:.0f}", f"{score:.0f}",
                  f"{setup:.0f}", f"{exp_s:.0f}", f"{bench_s:.0f}",
                  f"{big} ({100 * parts[big] / max(1, sum(parts.values())):.0f}%)")  # fmt: skip
        tr = d["stages"].get("train", {})
        if "stages" in tr:
            starts.append(datetime.fromisoformat(tr["stages"]["started_at"]))
            ends.append(datetime.fromisoformat(tr["stages"]["finished_at"]))
    console.print(t)
    total = sum(agg.values())
    s = Table(title="Automated time, all listed experiments")
    s.add_column("bucket")
    s.add_column("seconds", justify="right")
    s.add_column("share", justify="right")
    for k, v in sorted(agg.items(), key=lambda kv: -kv[1]):
        s.add_row(k, f"{v:.0f}", f"{100 * v / max(1, total):.0f}%")
    console.print(s)
    # train loop phases
    phases: dict[str, float] = {}
    for _, d in runs:
        for k, v in d["buckets"].items():
            if k.startswith("train.train_loop/"):
                phases[k.split("/", 1)[1]] = phases.get(k.split("/", 1)[1], 0) + v
    if phases:
        ptot = sum(phases.values())
        p = Table(title="Inside the train loop (sampled steps, scaled)")
        p.add_column("phase")
        p.add_column("seconds", justify="right")
        p.add_column("share", justify="right")
        for k, v in sorted(phases.items(), key=lambda kv: -kv[1]):
            p.add_row(k, f"{v:.0f}", f"{100 * v / max(1, ptot):.0f}%")
        console.print(p)
    if len(starts) > 1:
        gaps = []
        order = sorted(zip(starts, ends, strict=False))
        for (_, e0), (s1, _) in zip(order, order[1:], strict=False):
            gaps.append((s1 - e0).total_seconds())
        busy = sum((e - s).total_seconds() for s, e in order)
        span = (order[-1][1] - order[0][0]).total_seconds()
        console.print(
            f"Span first start to last end: {span:.0f}s. Training stage busy: {busy:.0f}s "
            f"({100 * busy / max(1, span):.0f}%). Gaps between experiments: "
            f"{sum(g for g in gaps if g > 0):.0f}s total (queue idle, implementation, waiting)."
        )
