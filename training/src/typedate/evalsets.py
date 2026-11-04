"""Versioned, immutable eval sets under evals/<version>/. See specs/research/eval-versioning.md."""

import hashlib
import json
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


__all__ = ["create", "quick", "load_eval", "check_leak", "decontaminate"]
