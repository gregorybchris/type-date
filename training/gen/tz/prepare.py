"""Build the labeling inputs for the timezone round: filter, dedupe, cap per source, split pool and sealed, chunk.

Usage: python3 prepare.py        (writes training/gen/external/tz-{pool,sealed}-NN-inputs.jsonl and tz-meta.json)
"""

import glob
import json
import random
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2]
EXT = HERE.parent / "external"
sys.path.insert(0, str(HERE))
from patterns import load, norm  # noqa: E402

OTHER_LANG = re.compile(
    r"\b(tijd|fuseau|horaire|heure|zona|hora|uur|boek|zouden|welke|ik ben|je suis|het is|doeltijd|kamer|"
    r"lunchtijd|jaarlijks|dans le|mi trovo|estoy|zeit)\b",
    re.I,
)
CAP = 30
rng = random.Random(11)


def existing():
    seen = set()
    for pat in [
        "data/pool/**/*.jsonl",
        "evals/e14/*.jsonl",
        "training/gen/external/web-[0-9].jsonl",
        "training/gen/external/web-1[01].jsonl",
    ]:
        for f in glob.glob(str(REPO / pat), recursive=True):
            for l in open(f):
                try:
                    seen.add(norm(json.loads(l).get("text", "")))
                except Exception:  # noqa: BLE001
                    pass
    return seen


def main():
    rows = load()
    seen = existing()
    keep, drop = [], Counter()
    for r in rows:
        t = r["text"]
        if norm(t) in seen:
            drop["already in data"] += 1
        elif len(t) < 4 or len(t) > 90:
            drop["length"] += 1
        elif re.search(r"[^\x00-\x7f−–—→⇔°]", t) or OTHER_LANG.search(t):
            drop["other language or symbols"] += 1
        else:
            keep.append(r)
    # sealed writer rows win over pool writer rows with the same text (load() keeps the first, so check both ways)
    sealed_texts = {norm(r["text"]) for r in keep if r["sealed"] and r["origin"].startswith("tz-w")}
    keep2 = []
    for r in keep:
        if not r["sealed"] and norm(r["text"]) in sealed_texts:
            drop["pool copy of a sealed row"] += 1
        else:
            keep2.append(r)
    # web: cap per source and per digit-masked shape
    by_src, out = defaultdict(list), []
    for r in keep2:
        (by_src[(r["sealed"], r["source"])] if r["origin"].startswith("web") else out).append(r)
    shapes = Counter()
    for k, rs in by_src.items():
        rng.shuffle(rs)
        n = 0
        for r in rs:
            shape = re.sub(r"\d", "9", r["text"])
            if shapes[(k[0], shape)] >= 3 or n >= CAP:
                drop["web cap or repeated shape"] += 1
                continue
            shapes[(k[0], shape)] += 1
            n += 1
            out.append(r)
    for sealed in (False, True):
        rs = [r for r in out if r["sealed"] == sealed]
        rng.shuffle(rs)
        name = "sealed" if sealed else "pool"
        meta = {}
        n_chunks = max(1, round(len(rs) / 250))
        for i in range(n_chunks):
            chunk = rs[i::n_chunks]
            path = EXT / f"tz-{name}-{i + 1:02d}-inputs.jsonl"
            with open(path, "w") as f:
                for j, r in enumerate(chunk):
                    rid = f"tz{name[0]}{i + 1}-{j + 1:04d}"
                    f.write(json.dumps({"id": rid, "text": r["text"]}, ensure_ascii=False) + "\n")
                    meta[rid] = {
                        "origin": r["origin"],
                        "source": r["source"],
                        "family": r.get("family"),
                        "note": r.get("note"),
                    }
        json.dump(meta, open(EXT / f"tz-{name}-meta.json", "w"), ensure_ascii=False)
        print(name, len(rs), "rows in", n_chunks, "files;", Counter(r["origin"] for r in rs))
    print("dropped:", dict(drop))


main()
