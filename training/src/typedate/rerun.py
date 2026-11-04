"""Re-score a trained scratch model on another eval version without retraining."""

import json
import time

import torch
from transformers import PreTrainedTokenizerFast, T5ForConditionalGeneration

from .evalsets import load_eval
from .timing import Timer, merge_timing
from .train import ROOT, evaluate, predict


def rerun(exp: int, eval_version: str, make_primary: bool = True) -> dict:
    tm = Timer()
    name = f"exp-{exp:03d}"
    art = ROOT / "artifacts" / name / "torch"
    if not art.exists():
        raise SystemExit(f"{name}: no checkpoint at {art} (not re-evaluable)")
    device = "mps" if torch.backends.mps.is_available() else "cpu"
    with tm.bucket("model_load"):
        model = T5ForConditionalGeneration.from_pretrained(art).to(device)
        tok = PreTrainedTokenizerFast.from_pretrained(art)
    evals = load_eval(eval_version)
    t0 = time.perf_counter()
    preds = {s: predict(model, tok, r, device) for s, r in evals.items()}
    tm.add("eval_generate", time.perf_counter() - t0)
    with tm.bucket("eval_score"):
        ev, errors = evaluate(evals, preds)
    ev["version"] = eval_version
    run_dir = ROOT / "runs" / name
    mp = run_dir / "metrics.json"
    m = json.loads(mp.read_text())
    old = m.get("eval")
    m.setdefault("evals", {})
    if old and old.get("version"):
        m["evals"][old["version"]] = old
    m["evals"][eval_version] = ev
    if make_primary:
        m["eval"] = ev
        with (run_dir / "errors.jsonl").open("w") as f:
            for e in errors:
                f.write(json.dumps(e, ensure_ascii=False) + "\n")
    mp.write_text(json.dumps(m, indent=2))
    merge_timing(run_dir, f"rerun-{eval_version}", tm.to_dict())
    return ev
