"""Versioned, immutable eval sets under evals/<version>/. See specs/research/eval-versioning.md."""

import hashlib
import json
import re
import shutil
from collections import defaultdict
from datetime import UTC, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
EVAL_SPLITS = ["val", "test_template", "test_noise", "test_llm", "test_external"]


def _read(path: Path) -> list[dict]:
    if not path.exists():
        return []
    return [json.loads(x) for x in path.read_text().splitlines() if x.strip()]


def _h(s: str) -> int:
    return int(hashlib.md5(s.encode()).hexdigest(), 16)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_eval(version: str) -> dict[str, list[dict]]:
    d = ROOT / "evals" / version
    return {s: rows for s in EVAL_SPLITS if (rows := _read(d / f"{s}.jsonl"))}


def _write(version: str, splits: dict[str, list[dict]], manifest: dict) -> dict:
    d = ROOT / "evals" / version
    if d.exists():
        raise SystemExit(f"evals/{version} exists. Eval versions are immutable; pick a new name.")
    d.mkdir(parents=True)
    files = {}
    for s, rows in splits.items():
        p = d / f"{s}.jsonl"
        p.write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in rows))
        files[s] = {"n": len(rows), "sha256": sha256(p)}
    manifest.update(version=version, created=datetime.now(UTC).isoformat(timespec="seconds"))
    manifest["files"] = files
    (d / "manifest.json").write_text(json.dumps(manifest, indent=2))
    return manifest


def create(version: str, from_dataset: str, parent: str | None, reason: str) -> dict:
    src = ROOT / "data" / from_dataset
    splits = {s: _read(src / f"{s}.jsonl") for s in EVAL_SPLITS}
    splits = {s: r for s, r in splits.items() if r}
    for rows in splits.values():
        for r in rows:
            r.pop("template", None)
    return _write(
        version,
        splits,
        {"parent": parent, "from_dataset": from_dataset, "reason": reason, "subset_of": None},
    )


def quick(version: str, of: str, quotas: dict[str, int]) -> dict:
    """Deterministic subset of an eval version, stratified by primary tag inside each split."""
    base = load_eval(of)
    out: dict[str, list[dict]] = {}
    for split, q in quotas.items():
        rows = base.get(split, [])
        by_tag: dict[str, list[dict]] = defaultdict(list)
        for r in sorted(rows, key=lambda r: _h(r["id"])):
            by_tag[r["primary_tag"]].append(r)
        picked: list[dict] = []
        i = 0
        tags = sorted(by_tag)
        while len(picked) < min(q, len(rows)):
            added = False
            for t in tags:
                if i < len(by_tag[t]) and len(picked) < q:
                    picked.append(by_tag[t][i])
                    added = True
            if not added:
                break
            i += 1
        out[split] = picked
    return _write(
        version,
        out,
        {"parent": None, "subset_of": of, "reason": f"fast screening subset of {of}",
         "quotas": quotas},
    )  # fmt: skip


def check_leak(dataset: str, eval_version: str) -> dict:
    train = {
        " ".join(r["text"].lower().split()) for r in _read(ROOT / "data" / dataset / "train.jsonl")
    }
    res = {}
    for s, rows in load_eval(eval_version).items():
        hits = [r["text"] for r in rows if " ".join(r["text"].lower().split()) in train]
        res[s] = {"n": len(rows), "leaked": len(hits), "examples": hits[:5]}
    return res


def decontaminate(base: str, version: str, eval_version: str) -> dict:
    """New train dataset: base minus rows whose normalized text appears in an eval version."""
    banned = set()
    for rows in load_eval(eval_version).values():
        banned |= {" ".join(r["text"].lower().split()) for r in rows}
    out = ROOT / "data" / version
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    train = _read(ROOT / "data" / base / "train.jsonl")
    kept = [r for r in train if " ".join(r["text"].lower().split()) not in banned]
    (out / "train.jsonl").write_text(
        "".join(json.dumps(r, ensure_ascii=False) + "\n" for r in kept)
    )
    meta = json.loads((ROOT / "data" / base / "meta.json").read_text())
    meta.update(
        version=version,
        created=datetime.now(UTC).isoformat(timespec="seconds"),
        base=base,
        decontaminated_against=eval_version,
        notes=f"{base} train rows minus {len(train) - len(kept)} rows whose lowercased text is in "
        f"eval {eval_version}. Train only; eval splits live in evals/{eval_version}.",
    )
    meta["counts"] = {"train": len(kept)}
    meta.pop("by_tag", None)
    (out / "meta.json").write_text(json.dumps(meta, indent=2))
    return {"train_before": len(train), "train_after": len(kept)}


def tag_from_dsl(dsl: str) -> str:
    """Coarse primary tag for rows that have no generator tag (externally written rows)."""
    if dsl == "x":
        return "non-date-noise"
    mode, _, body = dsl.partition(" ")
    if body.startswith("R "):
        return "recurrence"
    rng = ">" in body
    if mode == "t":
        return "time-range" if rng else "time-only"
    if mode == "dt":
        return "datetime-range" if rng else "datetime"
    if rng:
        return "basic-date-range"
    if body[:1] in "WMY" and body[1:2] in "+-@":
        return "period-relative"
    if body.startswith(("+", "-")):
        return "relative-offset"
    if "#" in body:
        return "nth-weekday-of-month"
    return "basic-date"


_MER = re.compile(
    r"\b(am|pm|a\.m\.?|p\.m\.?|noon|midnight|midday|morning|afternoon|evening|night|arvo|tonight)\b"
    r"|\d\s?[ap]\b|\d[ap]m",
    re.I,
)
_WD_START = re.compile(
    r"^\W*(on\s+)?(mon|tue|tues|wed|thu|thur|thurs|fri|sat|sun)[a-z]*\b"
    r"(?!.*\b(every|each|weekly|daily|until|till|for|x\d)\b)",
    re.I,
)


def policy_flags(row: dict) -> list[str]:
    """Label-policy classes in which the text does not determine the label (see exp-009 note)."""
    t, d = row["text"].lower(), row["dsl"]
    flags = []
    if re.search(r"(\d{2}:\d{2}|\d\?)", d):
        unknown = "?" in d
        stated = bool(_MER.search(t))
        if unknown and stated:
            flags.append("meridiem")
        elif not unknown and not stated:
            m = re.search(r"(?<!\d)(\d{1,2}):(\d{2})", t)
            if not m or not (
                int(m.group(1)) >= 13 or (len(m.group(1)) == 2 and m.group(1)[0] == "0")
            ):
                flags.append("meridiem")
    if d.startswith(("d R", "dt R")) and _WD_START.match(t):
        flags.append("on-weekday-recurrence")
    if re.search(r"(?<!\d)\d{1,2}\.\d{2}(?!\d)", row["text"]):
        flags.append("dotted-numeric")
    return flags


def cut_clean(version: str, parent: str, extra: dict[str, list[dict]], reason: str) -> dict:
    """New eval version: parent minus policy-ambiguous rows, plus new splits. Not a superset."""
    base = load_eval(parent)
    dropped: dict[str, dict[str, int]] = {}
    out: dict[str, list[dict]] = {}
    for sp, rows in base.items():
        keep = []
        cnt: dict[str, int] = defaultdict(int)
        for r in rows:
            fl = policy_flags(r)
            if fl:
                for f in fl:
                    cnt[f] += 1
                cnt["rows_dropped"] += 1
            else:
                keep.append(r)
        out[sp] = keep
        dropped[sp] = dict(cnt)
    out.update(extra)
    return _write(
        version,
        out,
        {"parent": parent, "subset_of": None, "reason": reason, "added_splits": sorted(extra),
         "dropped_by_policy": dropped, "comparable_with_parent": False},
    )  # fmt: skip


def extend(version: str, parent: str, extra: dict[str, list[dict]], reason: str) -> dict:
    """New eval version: parent rows unchanged plus new splits. Parent results stay comparable."""
    base = load_eval(parent)
    pm = json.loads((ROOT / "evals" / parent / "manifest.json").read_text())
    for s, info in pm["files"].items():
        if sha256(ROOT / "evals" / parent / f"{s}.jsonl") != info["sha256"]:
            raise SystemExit(f"evals/{parent}/{s}.jsonl was modified since it was cut")
    if set(extra) & set(base):
        raise SystemExit("extra splits must be new split names")
    return _write(
        version,
        {**base, **extra},
        {"parent": parent, "subset_of": None, "reason": reason, "added_splits": sorted(extra)},
    )


def coverage() -> None:
    """Print resolved accuracy per experiment and eval version. `-` means not scored."""
    from rich.console import Console
    from rich.table import Table

    versions = sorted(p.name for p in (ROOT / "evals").iterdir() if p.is_dir())
    t = Table(title="Resolved accuracy by eval version (- = not scored)")
    t.add_column("exp")
    t.add_column("title")
    for v in versions:
        t.add_column(v, justify="right")
    t.add_column("other")
    missing = 0
    for d in sorted((ROOT / "runs").glob("exp-*")):
        mp = d / "metrics.json"
        if not mp.exists():
            continue
        m = json.loads(mp.read_text())
        c = json.loads((d / "config.json").read_text())
        have = {}
        if m.get("eval", {}).get("version"):
            have[m["eval"]["version"]] = m["eval"]
        have.update(m.get("evals", {}))
        cells = []
        for v in versions:
            if v in have:
                cells.append(f"{100 * have[v]['resolved']:.1f}%")
            else:
                cells.append("[red]-[/red]")
                missing += 1
        other = ", ".join(k for k in have if k not in versions)
        t.add_row(c["id"], c.get("title", "")[:34], *cells, other)
    Console().print(t)
    Console().print(f"{missing} missing cells")


__all__ = [
    "cut_clean",
    "policy_flags",
    "extend",
    "tag_from_dsl",
    "create",
    "quick",
    "load_eval",
    "check_leak",
    "decontaminate",
]
