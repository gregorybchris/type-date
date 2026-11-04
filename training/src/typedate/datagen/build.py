"""Build a dataset version: sample, add noise and prefixes, dedup, split, write JSONL."""

import hashlib
import json
import random
from collections import Counter, defaultdict
from datetime import UTC, datetime
from pathlib import Path

from .generators import GENERATORS, Ex
from .noise import HELD_OUT_OPS, PREFIX_SAFE_OPS, TRAIN_OPS, apply_op, tags_for
from .vocab import MONTHS_FULL, WD_CODES

PRIMARY_TAG_MAP = {
    "weekday": None,  # generator sets the tag
}


def h(s: str, mod: int) -> int:
    return int(hashlib.md5(s.encode()).hexdigest(), 16) % mod


def norm(text: str) -> str:
    return " ".join(text.lower().split())


def prefix_examples(rng: random.Random, ex: Ex, max_n: int) -> list[tuple[str, str, set[str]]]:
    """Cut the text at chunk boundaries and inside month/weekday words. Label by program."""
    out: list[tuple[str, str, set[str]]] = []
    chunks = ex.chunks
    committed = "x"
    text = ""
    for i, c in enumerate(chunks):
        sep = " " if (c.glue and i > 0) else ""
        # mid-word cuts
        if c.kind in ("month", "weekday", "kw") and len(c.text) >= 4 and rng.random() < 0.7:
            minlen = 3 if c.kind == "month" else 2 if c.kind == "weekday" else 4
            for cut in range(1, len(c.text)):
                if cut < minlen:
                    # too short to be unique: committed label only
                    out.append((text + sep + c.text[:cut], committed, {"partial-prefix"}))
                elif c.label is not None and cut >= minlen and c.kind != "kw":
                    out.append((text + sep + c.text[:cut], c.label, {"partial-prefix"}))
        text = text + sep + c.text
        if c.label is not None:
            committed = c.label
        elif c.label is None and any(ch.isdigit() for ch in c.text):
            continue  # a partial number: label unknown, skip this cut
        if i < len(chunks) - 1:
            out.append((text, committed, {"partial-prefix"}))
    # unique, limited
    uniq = {}
    for t, lab, m in out:
        uniq[t] = (t, lab, m)
    items = list(uniq.values())
    rng.shuffle(items)
    return items[:max_n]


def build(
    out_dir: Path,
    version: str,
    n: int,
    seed: int = 0,
    noise_rate: float = 0.3,
    prefix_rate: float = 0.15,
    external: Path | None = None,
    notes: str = "",
) -> dict:
    rng = random.Random(seed)
    names = [g[0] for g in GENERATORS]
    fns = {g[0]: g[1] for g in GENERATORS}
    weights = [g[2] for g in GENERATORS]
    rows: list[dict] = []
    counter = 0

    def add(text, dsl, tag, mods, source, template, group, parent=None):
        nonlocal counter
        counter += 1
        rows.append(
            {
                "id": f"{source[0]}-{counter:07d}",
                "text": text,
                "dsl": dsl,
                "primary_tag": tag,
                "modifier_tags": sorted(mods),
                "source": source,
                "template": template,
                "group": group,
                "parent_id": parent,
            }
        )

    for gi in range(n):
        name = rng.choices(names, weights=weights)[0]
        ex = fns[name](rng)
        group = f"g{gi}"
        base_id = f"g-{counter + 1:07d}"
        add(ex.text, ex.dsl, ex.tag, ex.mods, "grammar", ex.template, group)
        # noisy variants
        if rng.random() < noise_rate and ex.tag != "non-date-noise":
            k = rng.choice([1, 1, 1, 2])
            held = rng.random() < 0.06
            pool = list(TRAIN_OPS)
            ops = rng.sample(pool, k)
            if held:
                ops = [rng.choice(sorted(HELD_OUT_OPS))] + ops[:1]
            t = ex.text
            for op in ops:
                t = apply_op(rng, t, op)
            if t != ex.text:
                mods = set(ex.mods) | {tags_for(op) for op in ops}
                add(t, ex.dsl, ex.tag, mods, "noise", ex.template, group, base_id)
        if rng.random() < prefix_rate and ex.tag != "non-date-noise":
            for t, lab, m in prefix_examples(rng, ex, 3):
                t2 = t
                mods = set(ex.mods) | m
                if rng.random() < 0.15:
                    op = rng.choice(PREFIX_SAFE_OPS)
                    t2 = apply_op(rng, t, op)
                    mods.add(tags_for(op))
                if t2.strip():
                    add(t2, lab, ex.tag, mods, "prefix", ex.template, group, base_id)

    # exact dedup (text is case and space sensitive) and conflict removal (normalized)
    by_norm: dict[str, set[str]] = defaultdict(set)
    by_norm_np: dict[str, set[str]] = defaultdict(set)
    for r in rows:
        by_norm[norm(r["text"])].add(r["dsl"])
        if r["source"] != "prefix":
            by_norm_np[norm(r["text"])].add(r["dsl"])
    # A prefix row loses to a complete row with the same text. Complete rows that disagree are dropped.
    conflicts = {k for k, v in by_norm.items() if len(v) > 1}
    seen: set[tuple[str, str]] = set()
    kept = []
    dropped_conflict = 0
    for r in rows:
        k = norm(r["text"])
        if k in conflicts:
            np_labels = by_norm_np.get(k, set())
            if (
                len(np_labels) > 1
                or (r["source"] == "prefix" and np_labels)
                or (r["source"] != "prefix" and r["dsl"] not in np_labels)
            ):
                dropped_conflict += 1
                continue
            if r["source"] == "prefix" and not np_labels and len(by_norm[k]) > 1:
                dropped_conflict += 1
                continue
        key = (r["text"], r["dsl"])
        if key in seen:
            continue
        seen.add(key)
        kept.append(r)

    # splits
    held_templates = {t for t in {r["template"] for r in kept} if h("tmpl:" + t, 10) == 0}
    splits: dict[str, list[dict]] = defaultdict(list)
    for r in kept:
        ops_held = any(m in HELD_OUT_OPS for m in r["modifier_tags"])
        norm(r["text"])
        if r["template"] in held_templates:
            s = "test_template"
        elif (
            r["source"] == "noise"
            and (" " * 3 in r["text"] or " " not in r["text"].strip())
            and "spacing" in r["modifier_tags"]
            and ops_held
        ):
            s = "test_noise"
        elif h("grp:" + r["group"], 100) < 5:
            s = "val"
        else:
            s = "train"
        if r["source"] == "noise" and any(x in r["text"] for x in ("   ",)):
            s = "test_noise" if s == "train" else s
        r["split"] = s
        splits[s].append(r)
    # test_noise: any row built with held-out ops was routed by a loose rule above; also route by tag
    # Keep train free of held-out-op rows
    clean_train = []
    for r in splits["train"]:
        merged = (
            r["source"] == "noise"
            and " " not in r["text"].strip()
            and "spacing" in r["modifier_tags"]
        )
        if merged:
            r["split"] = "test_noise"
            splits["test_noise"].append(r)
        else:
            clean_train.append(r)
    splits["train"] = clean_train

    if external and external.exists():
        for line in external.read_text().splitlines():
            if not line.strip():
                continue
            e = json.loads(line)
            e.setdefault("modifier_tags", [])
            e.update(split="test_external", source="handwritten", group="ext", parent_id=None)
            e.setdefault("template", "external")
            e.setdefault("id", f"h-{len(splits['test_external']):05d}")
            splits["test_external"].append(e)

    out_dir.mkdir(parents=True, exist_ok=True)
    counts = {}
    by_tag: dict[str, Counter] = defaultdict(Counter)
    for s, items in splits.items():
        counts[s] = len(items)
        with (out_dir / f"{s}.jsonl").open("w") as f:
            for r in items:
                f.write(json.dumps(r, ensure_ascii=False) + "\n")
                by_tag[r["primary_tag"]][s] += 1
    meta = {
        "version": version,
        "created": datetime.now(UTC).isoformat(timespec="seconds"),
        "seed": seed,
        "params": {"n": n, "noise_rate": noise_rate, "prefix_rate": prefix_rate},
        "counts": counts,
        "dropped_conflicts": dropped_conflict,
        "conflict_texts": sorted(conflicts)[:50],
        "held_out_templates": sorted(held_templates),
        "by_tag": {t: dict(c) for t, c in sorted(by_tag.items())},
        "notes": notes,
    }
    (out_dir / "meta.json").write_text(json.dumps(meta, indent=2))
    return meta


__all__ = ["build", "MONTHS_FULL", "WD_CODES"]
