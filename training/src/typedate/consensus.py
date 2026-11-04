"""Consensus labels from two independent labelers (agree and neither unsure)."""

import json
import re
from pathlib import Path

from .evalsets import policy_flags, tag_from_dsl
from .train import resolved_equal


def _norm_dsl(dsl: str) -> str:
    """String-level cleanup of label variants: spaces, and one-digit day of month (D@4 -> D@04)."""
    dsl = " ".join(dsl.split())
    return re.sub(r"D@(\d)(?!\d)", r"D@0\1", dsl)


def _read(path: Path) -> dict[str, dict]:
    out = {}
    for line in path.read_text().splitlines():
        if line.strip():
            r = json.loads(line)
            r["dsl"] = _norm_dsl(r["dsl"])
            out[r["id"]] = r
    return out


def consensus(
    inputs: Path,
    label_a: Path,
    label_b: Path,
    out: Path,
    source: str,
    split: str,
    meta: Path | None = None,
) -> dict:
    metas = json.loads(meta.read_text()) if meta else {}
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
        if i in metas:
            row["web_source"] = metas[i].get("source")
            row["web_url"] = metas[i].get("url")
            row["web_license"] = metas[i].get("license")
        if policy_flags(row, legacy_v2=False):
            stats["policy_ambiguous"] += 1
            continue
        rows.append(row)
    stats["kept"] = len(rows)
    out.write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in rows))
    return stats
