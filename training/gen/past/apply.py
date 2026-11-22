"""After the h17 (past holidays) labeling: check label files, run consensus, write the open pool,
patch the stale lunar pool rows in place, and write the e19 change list and sealed split.
Prints counts only.

Stale rows with a consensus label get it; stale rows without one are removed (pool) or dropped
(eval change list for `td eval cut-zone --tag past`).
"""

import json
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[2]
ext = root / "gen" / "external"
repo = root.parent
scratch = ext / "past-tmp"
scratch.mkdir(exist_ok=True)


def rows(p: Path) -> list[dict]:
    return [json.loads(line) for line in p.read_text().splitlines() if line]


def consensus(name: str, out: Path, source: str, split: str) -> list[dict]:
    inp = ext / f"past-{name}-inputs.jsonl"
    ids = [r["id"] for r in rows(inp)]
    for k in (1, 2):
        lab = [r["id"] for r in rows(ext / f"past-{name}-label-{k}.jsonl")]
        assert lab == ids, f"{name} label-{k}: id order differs"
    r = subprocess.run(
        [
            "uv",
            "run",
            "td",
            "data",
            "consensus",
            str(inp),
            str(ext / f"past-{name}-label-1.jsonl"),
            str(ext / f"past-{name}-label-2.jsonl"),
            "--out",
            str(out),
            "--source",
            source,
            "--split",
            split,
        ],
        capture_output=True,
        text=True,
        check=True,
        cwd=root,
    )
    print(name, r.stdout.strip().splitlines()[-1])
    return rows(out)


# open pool
pool_dir = repo / "data" / "pool" / "past"
pool_dir.mkdir(parents=True, exist_ok=True)
consensus("pool-01", pool_dir / "dev_p01.jsonl", "past-pool", "dev")

# sealed split
sealed = consensus("sealed-01", scratch / "test_past.jsonl", "past-sealed", "test_past")
with (scratch / "test_past.jsonl").open("w") as f:
    for r in sealed:
        r["split"] = "test_past"
        f.write(json.dumps(r, ensure_ascii=False) + "\n")
print("test_past", len(sealed))

# stale rows
changes: dict = {"relabel": {}, "drop": []}
for kind in ("pool", "e18"):
    smap = json.loads((ext / f"past-stale-{kind}-map.json").read_text())
    kept = consensus(f"stale-{kind}", scratch / f"stale-{kind}.jsonl", "past-stale", "x")
    got = {r["id"].removeprefix("r-"): r["dsl"] for r in kept}
    if kind == "pool":
        by_file: dict[str, dict[str, str | None]] = {}
        for sid, ref in smap.items():
            by_file.setdefault(ref["file"], {})[ref["id"]] = got.get(sid)
        for file, fix in by_file.items():
            p = repo / file
            out, n_re, n_drop = [], 0, 0
            for r in rows(p):
                if r["id"] in fix:
                    if fix[r["id"]] is None:
                        n_drop += 1
                        continue
                    r["dsl"] = fix[r["id"]]
                    n_re += 1
                out.append(r)
            p.write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in out))
            print(f"pool {file}: relabeled {n_re}, removed {n_drop}")
    else:
        for sid, ref in smap.items():
            split = ref["file"].removesuffix(".jsonl")
            key = f"{split}|{ref['id']}"
            if got.get(sid) is None:
                changes["drop"].append(key)
            else:
                changes["relabel"][key] = got[sid]
        print(f"e18: relabel {len(changes['relabel'])}, drop {len(changes['drop'])}")
(ext / "past-e19-changes.json").write_text(json.dumps(changes, indent=1))
