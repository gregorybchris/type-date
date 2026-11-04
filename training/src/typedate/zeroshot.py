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


class Retriever:
    """Nearest labeled examples by character n-gram TF-IDF, for retrieval few-shot prompts."""

    def __init__(self, dataset: str = "v004") -> None:
        from sklearn.feature_extraction.text import TfidfVectorizer

        rows = load_jsonl(ROOT / "data" / dataset / "train.jsonl")
        # prefer clean grammar rows and LLM rows; keep all for coverage
        self.rows = rows
        self.vec = TfidfVectorizer(analyzer="char_wb", ngram_range=(2, 4), lowercase=True)
        self.mat = self.vec.fit_transform([r["text"] for r in rows])

    def nearest(self, texts: list[str], k: int) -> list[list[dict]]:
        import numpy as np

        q = self.vec.transform(texts)
        sims = (q @ self.mat.T).toarray()
        out = []
        for i in range(len(texts)):
            idx = np.argsort(-sims[i])[: k * 2]
            seen, picked = set(), []
            for j in idx:
                key = (self.rows[j]["text"].lower(), self.rows[j]["dsl"])
                if key in seen:
                    continue
                seen.add(key)
                picked.append(self.rows[j])
                if len(picked) == k:
                    break
            out.append(picked[::-1])  # most similar last, closest to the query
        return out


def make_prompts(
    kind: str, tok, rows: list[dict], shots: int, retr: "Retriever | None"
) -> list[str]:
    fixed = pick_examples(shots)
    texts = [r["text"].lower() for r in rows]
    nn = retr.nearest(texts, shots) if retr is not None and kind.startswith("knn") else None
    out = []
    for i, t in enumerate(texts):
        ex = nn[i] if nn is not None else fixed
        if kind.endswith("chat"):
            msgs = [{"role": "system", "content": HEADER}]
            for e in ex:
                msgs.append({"role": "user", "content": e["text"].lower()})
                msgs.append({"role": "assistant", "content": e["dsl"]})
            msgs.append({"role": "user", "content": t})
            out.append(tok.apply_chat_template(msgs, tokenize=False, add_generation_prompt=True))
        else:
            body = "".join(f"Input: {e['text'].lower()}\nOutput: {e['dsl']}\n\n" for e in ex)
            out.append(HEADER + "\nExamples:\n\n" + body + f"Input: {t}\nOutput:")
    return out


def common_prefix(strs: list[str]) -> str:
    a, b = min(strs), max(strs)
    i = 0
    while i < len(a) and i < len(b) and a[i] == b[i]:
        i += 1
    return a[:i]


def generate_cached(
    model, tok, prompts: list[str], device, max_new: int, bs: int = 32
) -> list[str]:
    """Greedy generation for prompts that share a long prefix. The prefix is encoded once.

    Rows are grouped by suffix token length so no padding is needed inside a batch.
    """
    import copy
    from collections import defaultdict

    prefix = common_prefix(prompts[: min(len(prompts), 400)] + prompts[-50:])
    # cut the prefix at the last newline so token boundaries match between prefix and suffix
    cut = prefix.rfind("\n") + 1
    prefix = prefix[:cut]
    p_ids = tok(prefix, return_tensors="pt", add_special_tokens=False)["input_ids"].to(device)
    with torch.no_grad():
        pkv = model(p_ids, use_cache=True).past_key_values
    suf = [tok(p[len(prefix) :], add_special_tokens=False)["input_ids"] for p in prompts]
    groups: dict[int, list[int]] = defaultdict(list)
    for i, s in enumerate(suf):
        groups[len(s)].append(i)
    out = [""] * len(prompts)
    for _, idxs in sorted(groups.items()):
        for k in range(0, len(idxs), bs):
            chunk = idxs[k : k + bs]
            ids_s = torch.tensor([suf[i] for i in chunk], device=device)
            ids = torch.cat([p_ids.repeat(len(chunk), 1), ids_s], dim=1)
            cache = copy.deepcopy(pkv)
            cache.batch_repeat_interleave(len(chunk))
            with torch.no_grad():
                gen = model.generate(
                    input_ids=ids,
                    attention_mask=torch.ones_like(ids),
                    past_key_values=cache,
                    max_new_tokens=max_new,
                    do_sample=False,
                    pad_token_id=tok.pad_token_id,
                )
            texts = tok.batch_decode(gen[:, ids.shape[1] :], skip_special_tokens=True)
            for i, t in zip(chunk, texts, strict=False):
                out[i] = t.split("\n")[0].strip()
    return out


def run(
    exp: int,
    model_id: str,
    title: str,
    description: str,
    eval_version: str = "e1q",
    n_shots: int = 24,
    batch: int = 16,
    max_new: int = 24,
    prompt: str = "fixed",
    primary: bool = True,
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
    retr = Retriever() if prompt.startswith("knn") else None
    prompt_tokens = 0
    evals = load_eval(eval_version)
    preds: dict[str, list[str]] = {}
    t0 = time.perf_counter()
    for split, rows in evals.items():
        if not prompt.startswith("knn"):
            prompts = make_prompts(prompt, tok, rows, n_shots, retr)
            preds[split] = generate_cached(model, tok, prompts, device, max_new)
            prompt_tokens = max(
                prompt_tokens, len(tok(prompts[0], add_special_tokens=False)["input_ids"])
            )
            continue
        out: list[str] = []
        for i in range(0, len(rows), batch):
            chunk = rows[i : i + batch]
            prompts = make_prompts(prompt, tok, chunk, n_shots, retr)
            enc = tok(prompts, return_tensors="pt", padding=True, add_special_tokens=False).to(
                device
            )
            prompt_tokens = max(prompt_tokens, enc["input_ids"].shape[1])
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
        model={"params": n_params, "hf_id": model_id, "n_shots": n_shots, "prompt": prompt},
        extra_config={"train": {"trained": False}},
        notes=f"Prompt kind {prompt}: {n_shots} examples, up to {prompt_tokens} tokens, greedy, fp32, MPS.",
        size_bytes=n_params * 2,
        primary=primary,
    )  # fmt: skip
    del model
    if device == "mps":
        torch.mps.empty_cache()
    return ev


__all__ = ["run", "Path"]
