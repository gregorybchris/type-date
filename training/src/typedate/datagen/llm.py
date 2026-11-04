"""Merge LLM paraphrases (labeled by their intent's DSL) into a new dataset version."""

import json
import re
import shutil
from collections import Counter
from datetime import UTC, datetime
from pathlib import Path

from .build import h, norm

ROOT = Path(__file__).resolve().parents[4]
SLASH = re.compile(r"(?<![\d:])(\d{1,2})/(\d{1,2})(?!\d)")


def bad_numeric_order(text: str, dsl: str) -> bool:
    """True if a slash date in the text is not month/day matching a date in the label."""
    return any(f"{int(a):02d}-{int(b):02d}" not in dsl for a, b in SLASH.findall(text))


def ingest(base: str, version: str, gen_dir: Path, test_frac: float = 0.3) -> dict:
    intents: dict[str, dict] = {}
    for f in sorted((gen_dir / "intents").glob("shard-*.jsonl")):
        for line in f.read_text().splitlines():
            if line.strip():
                r = json.loads(line)
                intents[r["iid"]] = r
    out = ROOT / "data" / version
    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(ROOT / "data" / base, out)
    existing: dict[str, set[str]] = {}
    for f in out.glob("*.jsonl"):
        for line in f.read_text().splitlines():
            r = json.loads(line)
            existing.setdefault(norm(r["text"]), set()).add(r["dsl"])
    new_train, new_test = [], []
    skipped = Counter()
    seen: set[str] = set()
    for f in sorted((gen_dir / "out").glob("shard-*.jsonl")):
        for line in f.read_text().splitlines():
            if not line.strip():
                continue
            r = json.loads(line)
            it = intents.get(r["iid"])
            if not it:
                skipped["unknown-intent"] += 1
                continue
            for i, t in enumerate(r["texts"]):
                t = " ".join(str(t).split())
                k = norm(t)
                if not t or len(t) > 60:
                    skipped["length"] += 1
                elif bad_numeric_order(t, it["dsl"]):
                    skipped["numeric-order"] += 1
                elif k == norm(it["canonical"]):
                    skipped["same-as-canonical"] += 1
                elif k in seen:
                    skipped["dup"] += 1
                elif existing.get(k) and it["dsl"] not in existing[k]:
                    skipped["conflicts-with-existing"] += 1
                else:
                    seen.add(k)
                    test = h("llm:" + it["iid"], 100) < int(test_frac * 100)
                    row = {
                        "id": f"l-{it['iid']}-{i}",
                        "text": t,
                        "dsl": it["dsl"],
                        "primary_tag": it["tag"],
                        "modifier_tags": [],
                        "source": "llm",
                        "template": "llm",
                        "group": it["iid"],
                        "parent_id": None,
                        "split": "test_llm" if test else "train",
                    }
                    (new_test if test else new_train).append(row)
    with (out / "train.jsonl").open("a") as f:
        for r in new_train:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    with (out / "test_llm.jsonl").open("w") as f:
        for r in new_test:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    meta = json.loads((out / "meta.json").read_text())
    meta.update(
        version=version,
        created=datetime.now(UTC).isoformat(timespec="seconds"),
        base=base,
        notes=f"{base} plus LLM paraphrases (Claude haiku subagents); "
        f"{len(new_test)} held out as test_llm",
    )
    meta["counts"]["train"] = meta["counts"].get("train", 0) + len(new_train)
    meta["counts"]["test_llm"] = len(new_test)
    meta["llm_skipped"] = dict(skipped)
    (out / "meta.json").write_text(json.dumps(meta, indent=2))
    return meta
