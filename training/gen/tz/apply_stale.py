"""After the stale-row relabeling: consensus, then patch the tuning pools in place and write the e16 change list.

Pool rows with a consensus label get it; pool rows without one are removed. Eval rows: same, as a change list for `td eval cut-zone`.
"""

import json
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[2]
ext = root / "gen" / "external"
repo = root.parent
smap = json.loads((ext / "tz-stale-map.json").read_text())
changes = {"relabel": {}, "drop": []}
for kind, tag in (("pool", "sp"), ("eval", "se")):
    out = repo / "data" / "pool" / "tz" / f"stale_{kind}.jsonl"
    r = subprocess.run(
        [
            "uv",
            "run",
            "td",
            "data",
            "consensus",
            str(ext / f"tz-stale-{kind}-inputs.jsonl"),
            str(ext / f"tz-stale-{kind}-label-1.jsonl"),
            str(ext / f"tz-stale-{kind}-label-2.jsonl"),
            "--out",
            str(out),
            "--source",
            "tz-stale",
            "--split",
            "dev",
        ],
        cwd=root,
        capture_output=True,
        text=True,
    )
    print(kind, (r.stdout.strip().splitlines() or [r.stderr[-300:]])[-1])
    kept = {
        json.loads(l)["id"][2:]: json.loads(l)["dsl"]
        for l in out.read_text().splitlines()
        if l.strip()
    }
    ids = [k for k, v in smap.items() if k.startswith(tag)]
    if kind == "pool":
        by_file = {}
        for k in ids:
            by_file.setdefault(smap[k]["file"], {})[smap[k]["id"]] = kept.get(k)
        for f, rows in by_file.items():
            path = repo / f
            new, n_rel, n_drop = [], 0, 0
            for line in path.read_text().splitlines():
                if not line.strip():
                    continue
                row = json.loads(line)
                if row["id"] in rows:
                    if rows[row["id"]] is None:
                        n_drop += 1
                        continue
                    if rows[row["id"]] != row["dsl"]:
                        row = {**row, "dsl": rows[row["id"]], "relabeled": "zone"}
                        n_rel += 1
                new.append(row)
            path.write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in new))
            print("  ", f, "relabeled", n_rel, "dropped", n_drop)
    else:
        for k in ids:
            split = Path(smap[k]["file"]).stem
            key = f"{split}|{smap[k]['id']}"
            if k in kept:
                changes["relabel"][key] = kept[k]
            else:
                changes["drop"].append(key)
        (root / "gen" / "tz" / "e16-changes.json").write_text(json.dumps(changes))
        print("  e16 changes: relabel", len(changes["relabel"]), "drop", len(changes["drop"]))
