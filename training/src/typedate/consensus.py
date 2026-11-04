"""Consensus labels from two independent labelers (agree and neither unsure)."""

import json
from pathlib import Path

from .evalsets import policy_flags, tag_from_dsl
from .train import resolved_equal


def _read(path: Path) -> dict[str, dict]:
    return {json.loads(x)["id"]: json.loads(x) for x in path.read_text().splitlines() if x.strip()}


def consensus(
    inputs: Path, label_a: Path, label_b: Path, out: Path, source: str, split: str
) -> dict:
    ins = [json.loads(x) for x in inputs.read_text().splitlines() if x.strip()]
    a, b = _read(label_a), _read(label_b)
    ids = [r["id"] for r in ins if r["id"] in a and r["id"] in b]
    res = resolved_equal([{"exp": a[i]["dsl"], "pred": b[i]["dsl"]} for i in ids])
    rows, stats = [], {"inputs": len(ins), "labeled_by_both": len(ids), "agree": sum(res)}
    stats.update(unsure=0, policy_ambiguous=0, kept=0)
    by_id = {r["id"]: r for r in ins}
    for i, ok in zip(ids, res, strict=False):
        if not ok:
            continue
        if a[i].get("unsure") or b[i].get("unsure"):
            stats["unsure"] += 1
            continue
        row = {
            "id": f"r-{i}",
            "text": by_id[i]["text"],
            "dsl": a[i]["dsl"],
            "primary_tag": tag_from_dsl(a[i]["dsl"]),
            "modifier_tags": [],
            "source": source,
            "split": split,
            "parent_id": None,
            "group": f"real-{i}",
        }
        if policy_flags(row):
            stats["policy_ambiguous"] += 1
            continue
        rows.append(row)
    stats["kept"] = len(rows)
    out.write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in rows))
    return stats
