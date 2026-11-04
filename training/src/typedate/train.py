"""Train a tiny T5-style encoder-decoder from scratch on a dataset version. Writes runs/exp-NNN/."""

import json
import math
import os
import random
import subprocess
import time
from collections import defaultdict
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path

import torch
from tokenizers import Tokenizer, decoders, models, normalizers, pre_tokenizers, trainers
from transformers import PreTrainedTokenizerFast, T5Config, T5ForConditionalGeneration

os.environ.setdefault("PYTORCH_ENABLE_MPS_FALLBACK", "1")

ROOT = Path(__file__).resolve().parents[3]
PAD, EOS, UNK = 0, 1, 2
MAX_IN, MAX_OUT = 64, 40


@dataclass
class TrainConfig:
    exp: int
    title: str
    dataset: str = "v001"
    d_model: int = 256
    d_ff: int = 1024
    heads: int = 4
    enc_layers: int = 4
    dec_layers: int = 4
    vocab: int = 1000
    epochs: int = 8
    batch_size: int = 128
    lr: float = 1e-3
    seed: int = 0
    notes: str = ""
    max_train: int = 0  # 0 = all


def load_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    return [json.loads(line) for line in path.read_text().splitlines() if line.strip()]


def norm_in(text: str) -> str:
    return " ".join(text.lower().split())


def build_tokenizer(rows: list[dict], vocab: int) -> PreTrainedTokenizerFast:
    tok = Tokenizer(models.BPE(unk_token="<unk>"))
    tok.normalizer = normalizers.Sequence([normalizers.Lowercase()])
    tok.pre_tokenizer = pre_tokenizers.Metaspace(replacement="▁", prepend_scheme="never")
    tok.decoder = decoders.Metaspace(replacement="▁", prepend_scheme="never")
    trainer = trainers.BpeTrainer(
        vocab_size=vocab,
        special_tokens=["<pad>", "</s>", "<unk>"],
        initial_alphabet=list("abcdefghijklmnopqrstuvwxyz0123456789 -+/#@?:,.<>"),
        show_progress=False,
    )

    def corpus():
        for r in rows:
            yield norm_in(r["text"])
            yield r["dsl"]

    tok.train_from_iterator(corpus(), trainer)
    return PreTrainedTokenizerFast(
        tokenizer_object=tok, pad_token="<pad>", eos_token="</s>", unk_token="<unk>"
    )


def encode_rows(tok, rows: list[dict]):
    src = tok([norm_in(r["text"]) for r in rows], add_special_tokens=False)["input_ids"]
    tgt = tok([r["dsl"] for r in rows], add_special_tokens=False)["input_ids"]
    return [(s[: MAX_IN - 1] + [EOS], t[: MAX_OUT - 1] + [EOS]) for s, t in zip(src, tgt)]


def collate(batch, device):
    ms = max(len(s) for s, _ in batch)
    mt = max(len(t) for _, t in batch)
    x = torch.full((len(batch), ms), PAD)
    y = torch.full((len(batch), mt), -100)
    for i, (s, t) in enumerate(batch):
        x[i, : len(s)] = torch.tensor(s)
        y[i, : len(t)] = torch.tensor(t)
    return x.to(device), (x != PAD).long().to(device), y.to(device)


def make_model(cfg: TrainConfig, vocab_size: int) -> T5ForConditionalGeneration:
    conf = T5Config(
        vocab_size=vocab_size,
        d_model=cfg.d_model,
        d_kv=cfg.d_model // cfg.heads,
        d_ff=cfg.d_ff,
        num_layers=cfg.enc_layers,
        num_decoder_layers=cfg.dec_layers,
        num_heads=cfg.heads,
        relative_attention_num_buckets=16,
        relative_attention_max_distance=64,
        dropout_rate=0.1,
        feed_forward_proj="gated-gelu",
        tie_word_embeddings=True,
        pad_token_id=PAD,
        eos_token_id=EOS,
        decoder_start_token_id=PAD,
    )
    return T5ForConditionalGeneration(conf)


@torch.no_grad()
def predict(model, tok, rows: list[dict], device, bs: int = 256) -> list[str]:
    model.eval()
    preds: list[str] = []
    order = sorted(range(len(rows)), key=lambda i: len(rows[i]["text"]))
    out: dict[int, str] = {}
    for i in range(0, len(order), bs):
        idx = order[i : i + bs]
        enc = tok(
            [norm_in(rows[j]["text"]) for j in idx],
            add_special_tokens=False,
            truncation=True,
            max_length=MAX_IN - 1,
        )["input_ids"]
        batch = [e + [EOS] for e in enc]
        ml = max(len(b) for b in batch)
        x = torch.full((len(batch), ml), PAD)
        for k, b in enumerate(batch):
            x[k, : len(b)] = torch.tensor(b)
        x = x.to(device)
        gen = model.generate(
            input_ids=x,
            attention_mask=(x != PAD).long(),
            max_new_tokens=MAX_OUT,
            num_beams=1,
            do_sample=False,
        )
        texts = tok.batch_decode(gen, skip_special_tokens=True)
        for j, t in zip(idx, texts):
            out[j] = " ".join(t.split())
    preds = [out[i] for i in range(len(rows))]
    return preds


def resolved_equal(pairs: list[dict]) -> list[bool]:
    """Compare resolved dates of expected and predicted DSL using the TS resolver."""
    script = ROOT / "packages/core/scripts/score-resolved.ts"
    proc = subprocess.run(
        ["pnpm", "exec", "tsx", str(script)],
        input=json.dumps(pairs),
        capture_output=True,
        text=True,
        cwd=ROOT / "packages/core",
        check=True,
    )
    return json.loads(proc.stdout)


def evaluate(rows_by_split: dict[str, list[dict]], preds_by_split: dict[str, list[str]]) -> tuple:
    errors: list[dict] = []
    by_split: dict = {}
    tag_stats: dict = defaultdict(lambda: [0, 0])
    mod_stats: dict = defaultdict(lambda: [0, 0])
    tot = ok = 0
    pairs = []
    for split, rows in rows_by_split.items():
        for r, p in zip(rows, preds_by_split[split]):
            pairs.append({"exp": r["dsl"], "pred": p})
    res = resolved_equal(pairs)
    res_ok = sum(res)
    k = 0
    for split, rows in rows_by_split.items():
        s_ok = 0
        for r, p in zip(rows, preds_by_split[split]):
            good = p == r["dsl"]
            s_ok += good
            tag_stats[r["primary_tag"]][0] += 1
            tag_stats[r["primary_tag"]][1] += good
            for m in r.get("modifier_tags", []):
                mod_stats[m][0] += 1
                mod_stats[m][1] += good
            if not good:
                errors.append(
                    {
                        "id": r["id"],
                        "text": r["text"],
                        "split": split,
                        "primary_tag": r["primary_tag"],
                        "modifier_tags": r.get("modifier_tags", []),
                        "expected": r["dsl"],
                        "predicted": p,
                        "resolved_match": res[k],
                    }
                )
            k += 1
        by_split[split] = {"n": len(rows), "exact": s_ok / max(1, len(rows))}
        tot += len(rows)
        ok += s_ok
    ev = {
        "exact": ok / max(1, tot),
        "resolved": res_ok / max(1, tot),
        "n": tot,
        "by_split": by_split,
        "by_tag": {t: {"n": n, "exact": c / n} for t, (n, c) in sorted(tag_stats.items())},
        "by_modifier": {t: {"n": n, "exact": c / n} for t, (n, c) in sorted(mod_stats.items())},
    }
    return ev, errors


def run(cfg: TrainConfig) -> dict:
    random.seed(cfg.seed)
    torch.manual_seed(cfg.seed)
    device = "mps" if torch.backends.mps.is_available() else "cpu"
    data = ROOT / "data" / cfg.dataset
    splits = {
        s: load_jsonl(data / f"{s}.jsonl")
        for s in ["train", "val", "test_template", "test_noise", "test_external"]
    }
    train_rows = splits["train"]
    if cfg.max_train:
        random.shuffle(train_rows)
        train_rows = train_rows[: cfg.max_train]
    tok = build_tokenizer(train_rows, cfg.vocab)
    model = make_model(cfg, len(tok)).to(device)
    n_params = sum(p.numel() for p in model.parameters())
    data_enc = encode_rows(tok, train_rows)
    steps_per_epoch = math.ceil(len(data_enc) / cfg.batch_size)
    total = steps_per_epoch * cfg.epochs
    opt = torch.optim.AdamW(model.parameters(), lr=cfg.lr, weight_decay=0.01)
    warm = max(1, int(0.05 * total))
    sched = torch.optim.lr_scheduler.LambdaLR(
        opt,
        lambda s: min(1.0, (s + 1) / warm) * (0.5 * (1 + math.cos(math.pi * s / total)) * 0.95 + 0.05),
    )
    t0 = time.time()
    step = 0
    last_loss = 0.0
    for ep in range(cfg.epochs):
        model.train()
        random.shuffle(data_enc)
        for i in range(0, len(data_enc), cfg.batch_size):
            x, m, y = collate(data_enc[i : i + cfg.batch_size], device)
            loss = model(input_ids=x, attention_mask=m, labels=y).loss
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            opt.step()
            sched.step()
            opt.zero_grad(set_to_none=True)
            step += 1
            last_loss = loss.item()
            if step % 200 == 0:
                print(f"ep {ep} step {step}/{total} loss {last_loss:.4f}", flush=True)
    train_s = time.time() - t0

    eval_rows = {s: r for s, r in splits.items() if s != "train" and r}
    t1 = time.time()
    preds = {s: predict(model, tok, r, device) for s, r in eval_rows.items()}
    eval_s = time.time() - t1
    ev, errors = evaluate(eval_rows, preds)
    print(f"exact {ev['exact']:.4f} resolved {ev['resolved']:.4f}", flush=True)

    out_tok = tok(["x"], add_special_tokens=False)
    _ = out_tok
    lens = [len(t) for _, t in encode_rows(tok, splits["val"][:2000])]
    run_dir = ROOT / "runs" / f"exp-{cfg.exp:03d}"
    art_dir = ROOT / "artifacts" / f"exp-{cfg.exp:03d}"
    run_dir.mkdir(parents=True, exist_ok=True)
    art_dir.mkdir(parents=True, exist_ok=True)
    model.save_pretrained(art_dir / "torch")
    tok.save_pretrained(art_dir / "torch")
    config = {
        "id": f"exp-{cfg.exp:03d}",
        "number": cfg.exp,
        "title": cfg.title,
        "created": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "dataset": cfg.dataset,
        "format": "dsl-v1",
        "notes": cfg.notes,
        "parent": None,
        "model": {
            "family": "enc-dec-scratch",
            "params": n_params,
            "d_model": cfg.d_model,
            "layers": f"{cfg.enc_layers}+{cfg.dec_layers}",
            "vocab": len(tok),
        },
        "train": {
            "epochs": cfg.epochs,
            "batch_size": cfg.batch_size,
            "lr": cfg.lr,
            "seed": cfg.seed,
            "device": device,
            "n_train": len(train_rows),
        },
        "export": {"format": "pending", "quant": "none"},
    }
    metrics = {
        "eval": ev,
        "model": {
            "params": n_params,
            "size_bytes": sum(f.stat().st_size for f in (art_dir / "torch").glob("*.safetensors")),
            "avg_output_tokens": sum(lens) / max(1, len(lens)),
        },
        "train": {
            "seconds": round(train_s, 1),
            "steps": step,
            "final_loss": round(last_loss, 4),
            "eval_seconds": round(eval_s, 1),
        },
    }
    (run_dir / "config.json").write_text(json.dumps(config, indent=2))
    (run_dir / "metrics.json").write_text(json.dumps(metrics, indent=2))
    with (run_dir / "errors.jsonl").open("w") as f:
        for e in errors:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")
    return {"config": asdict(cfg), "metrics": metrics}
