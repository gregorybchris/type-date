"""Few-shot prompting of pretrained causal LMs. No training. Scored on an eval version."""

import os
import time
from pathlib import Path

import torch

from .evalsets import load_eval
from .runwriter import write_run
from .timing import Timer
from .train import ROOT, load_jsonl

os.environ.setdefault("HF_HOME", str(ROOT / "training" / ".hf"))

HEADER = """Convert what a user typed into a date/time line. Reply with one line. Reply x if the text is not a date or time.
Line format: MODE BODY. MODE is d (date only), t (time only), dt (date and time).
Dates: MM-DD, YYYY-MM-DD, +Nd/+Nw/+Nm/+Ny (from today), fr (next friday on or after today), fr+1 (next friday after today), fr-1 (last friday), W+1 (next week), M+1, Y+1, M@10 (october), mo#1@03 (first monday of march).
Times: HH:MM 24h (15:00). Use H? for an hour without am/pm (4? or 4:30?).
Ranges use >. Repeating: R w/2 su (every other sunday), R d/1 mo,tu,we,th,fr (weekdays), R m/1 d15 (monthly on the 15th), then n5 (5 times) or u12-31 (until dec 31) or a time.
"""


def pick_examples(n: int = 24) -> list[dict]:
    rows = load_jsonl(ROOT / "data" / "v003" / "train.jsonl")
    rows = [r for r in rows if r["source"] == "grammar" and not r["modifier_tags"]]
    by_tag: dict[str, list[dict]] = {}
    for r in rows:
        by_tag.setdefault(r["primary_tag"], []).append(r)
    out: list[dict] = []
    i = 0
    tags = sorted(by_tag)
    while len(out) < n:
        for t in tags:
            if len(out) < n and i < len(by_tag[t]):
                out.append(by_tag[t][i * 7 % len(by_tag[t])])
        i += 1
    return out[:n]


def build_prompt(examples: list[dict]) -> str:
    body = "".join(f"Input: {e['text'].lower()}\nOutput: {e['dsl']}\n\n" for e in examples)
    return HEADER + "\nExamples:\n\n" + body


def run(
    exp: int,
    model_id: str,
    title: str,
    description: str,
    eval_version: str = "e1q",
    n_shots: int = 24,
    batch: int = 16,
    max_new: int = 24,
) -> dict:
    from transformers import AutoModelForCausalLM, AutoTokenizer

    tm = Timer()
    device = "mps" if torch.backends.mps.is_available() else "cpu"
    with tm.bucket("model_load"):
        tok = AutoTokenizer.from_pretrained(model_id)
        tok.padding_side = "left"
        if tok.pad_token is None:
            tok.pad_token = tok.eos_token
        model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype=torch.float32).to(device)
        model.eval()
    n_params = sum(p.numel() for p in model.parameters())
    prefix = build_prompt(pick_examples(n_shots))
    prompt_tokens = len(tok(prefix)["input_ids"])
    evals = load_eval(eval_version)
    preds: dict[str, list[str]] = {}
    t0 = time.perf_counter()
    for split, rows in evals.items():
        out: list[str] = []
        for i in range(0, len(rows), batch):
            chunk = rows[i : i + batch]
            prompts = [prefix + f"Input: {r['text'].lower()}\nOutput:" for r in chunk]
            enc = tok(prompts, return_tensors="pt", padding=True).to(device)
            with torch.no_grad():
                gen = model.generate(
                    **enc, max_new_tokens=max_new, do_sample=False, pad_token_id=tok.pad_token_id
                )
            texts = tok.batch_decode(gen[:, enc["input_ids"].shape[1] :], skip_special_tokens=True)
            out.extend(t.split("\n")[0].strip() for t in texts)
        preds[split] = out
    tm.add("eval_generate", time.perf_counter() - t0)
    rows_total = sum(len(r) for r in evals.values())
    tm.extra["eval_rows"] = rows_total
    tm.extra["prompt_tokens"] = prompt_tokens
    ev = write_run(
        exp, title, description, "zero-shot", eval_version, evals, preds, tm,
        model={"params": n_params, "hf_id": model_id, "n_shots": n_shots},
        extra_config={"train": {"trained": False}},
        notes=f"Few-shot prompt ({n_shots} examples, {prompt_tokens} tokens), greedy, fp32, MPS.",
        size_bytes=n_params * 2,
    )  # fmt: skip
    del model
    if device == "mps":
        torch.mps.empty_cache()
    return ev


__all__ = ["run", "Path"]
