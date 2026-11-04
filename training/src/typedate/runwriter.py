"""Score predictions and write runs/exp-NNN/{config,metrics,errors}.json. Shared by all predictors."""

import json
from datetime import UTC, datetime

from .timing import Timer, merge_timing
from .train import ROOT, evaluate


def write_run(
    exp: int,
    title: str,
    description: str,
    family: str,
    eval_version: str,
    rows_by_split: dict[str, list[dict]],
    preds_by_split: dict[str, list[str]],
    timer: Timer,
    model: dict,
    train: dict | None = None,
    extra_config: dict | None = None,
    dataset: str | None = None,
    parent: int = 0,
    notes: str = "",
    size_bytes: int = 0,
    stage: str = "eval",
    primary: bool = True,
) -> dict:
    with timer.bucket("eval_score"):
        ev, errors = evaluate(rows_by_split, preds_by_split)
    ev["version"] = eval_version
    run_dir = ROOT / "runs" / f"exp-{exp:03d}"
    run_dir.mkdir(parents=True, exist_ok=True)
    if not primary:
        # add this eval version next to the existing results; leave config and errors alone
        mp = run_dir / "metrics.json"
        m = json.loads(mp.read_text())
        m.setdefault("evals", {})[eval_version] = ev
        mp.write_text(json.dumps(m, indent=2))
        merge_timing(run_dir, f"{stage}-{eval_version}", timer.to_dict())
        return ev
    config = {
        "id": f"exp-{exp:03d}",
        "number": exp,
        "title": title,
        "description": description,
        "created": datetime.now(UTC).isoformat(timespec="seconds"),
        "dataset": dataset,
        "format": "dsl-v1",
        "notes": notes,
        "parent": f"exp-{parent:03d}" if parent else None,
        "model": {"family": family, **model},
        "train": train or {},
        "export": {"format": "none", "quant": "none"},
        **(extra_config or {}),
    }
    metrics = {
        "eval": ev,
        "model": {
            "params": model.get("params", 0),
            "size_bytes": size_bytes,
            "avg_output_tokens": None,
        },
        "train": {},
    }
    (run_dir / "config.json").write_text(json.dumps(config, indent=2))
    (run_dir / "metrics.json").write_text(json.dumps(metrics, indent=2))
    with (run_dir / "errors.jsonl").open("w") as f:
        for e in errors:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")
    merge_timing(run_dir, stage, timer.to_dict())
    return ev
