"""Short fine-tune of a pretrained causal LM on prompt/DSL pairs. For fast broad comparisons."""

import os
import random
import time

import torch

from .evalsets import load_eval
from .runwriter import write_run
from .timing import Timer
from .train import ROOT, load_jsonl

os.environ.setdefault("HF_HOME", str(ROOT / "training" / ".hf"))


def run(
    exp: int,
    model_id: str,
    title: str,
    description: str,
    dataset: str = "v003",
    eval_version: str = "e1q",
    n_train: int = 6000,
    epochs: int = 1,
    batch: int = 16,
    lr: float = 5e-5,
    seed: int = 0,
    max_new: int = 24,
) -> dict:
    from transformers import AutoModelForCausalLM, AutoTokenizer

    tm = Timer()
    random.seed(seed)
    torch.manual_seed(seed)
    device = "mps" if torch.backends.mps.is_available() else "cpu"
    with tm.bucket("model_load"):
        tok = AutoTokenizer.from_pretrained(model_id)
        if tok.pad_token is None:
            tok.pad_token = tok.eos_token
        model = AutoModelForCausalLM.from_pretrained(model_id, dtype=torch.float32).to(device)
    n_params = sum(p.numel() for p in model.parameters())
    with tm.bucket("data_load"):
        rows = load_jsonl(ROOT / "data" / dataset / "train.jsonl")
        random.shuffle(rows)
        rows = rows[:n_train]
    eos = tok.eos_token_id

    def encode(r: dict) -> tuple[list[int], int]:
        p = tok(f"Input: {r['text'].lower()}\nOutput:")["input_ids"]
        o = tok(" " + r["dsl"])["input_ids"] + [eos]
        return (p + o)[:96], len(p)

    with tm.bucket("encode_train"):
        data = [encode(r) for r in rows]
    opt = torch.optim.AdamW(model.parameters(), lr=lr, weight_decay=0.0)
    steps = (len(data) // batch) * epochs
    sched = torch.optim.lr_scheduler.LambdaLR(
        opt, lambda s: min(1.0, (s + 1) / 20) * (1 - s / max(1, steps))
    )
    model.train()
    t0 = time.perf_counter()
    step = 0
    last = 0.0
    for _ in range(epochs):
        random.shuffle(data)
        for i in range(0, len(data) - batch + 1, batch):
            chunk = data[i : i + batch]
            ml = max(len(c[0]) for c in chunk)
            ids = torch.full((batch, ml), tok.pad_token_id)
            labels = torch.full((batch, ml), -100)
            att = torch.zeros((batch, ml), dtype=torch.long)
            for k, (seq, plen) in enumerate(chunk):
                ids[k, : len(seq)] = torch.tensor(seq)
                att[k, : len(seq)] = 1
                labels[k, plen : len(seq)] = torch.tensor(seq[plen:])
            out = model(
                input_ids=ids.to(device), attention_mask=att.to(device), labels=labels.to(device)
            )
            out.loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            opt.step()
            sched.step()
            opt.zero_grad(set_to_none=True)
            step += 1
            last = out.loss.item()
            if step % 50 == 0:
                print(f"step {step}/{steps} loss {last:.4f}", flush=True)
    tm.add("train_loop", time.perf_counter() - t0)
    model.eval()
    with tm.bucket("save_checkpoint"):
        ck = ROOT / "artifacts" / f"exp-{exp:03d}" / "torch"
        ck.mkdir(parents=True, exist_ok=True)
        model.to(torch.bfloat16).save_pretrained(ck)
        tok.save_pretrained(ck)
        model.to(torch.float32)
    tok.padding_side = "left"
    evals = load_eval(eval_version)
    preds: dict[str, list[str]] = {}
    t1 = time.perf_counter()
    for split, erows in evals.items():
        out_t: list[str] = []
        for i in range(0, len(erows), 32):
            chunk = erows[i : i + 32]
            enc = tok(
                [f"Input: {r['text'].lower()}\nOutput:" for r in chunk],
                return_tensors="pt",
                padding=True,
            ).to(device)
            with torch.no_grad():
                gen = model.generate(
                    **enc,
                    max_new_tokens=max_new,
                    do_sample=False,
                    pad_token_id=tok.pad_token_id,
                    eos_token_id=eos,
                )
            texts = tok.batch_decode(gen[:, enc["input_ids"].shape[1] :], skip_special_tokens=True)
            out_t.extend(t.split("\n")[0].strip() for t in texts)
        preds[split] = out_t
    tm.add("eval_generate", time.perf_counter() - t1)
    tm.extra["eval_rows"] = sum(len(r) for r in evals.values())
    ev = write_run(
        exp, title, description, "finetune", eval_version, evals, preds, tm,
        model={"params": n_params, "hf_id": model_id},
        train={"epochs": epochs, "batch_size": batch, "lr": lr, "seed": seed, "device": device,
               "n_train": len(data), "steps": step, "final_loss": round(last, 4)},
        dataset=dataset, size_bytes=n_params * 2,
        notes=f"Full fine-tune, {n_train} rows, {epochs} epoch(s), loss on output tokens only.",
    )  # fmt: skip
    del model
    if device == "mps":
        torch.mps.empty_cache()
    return ev
