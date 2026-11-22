"""After the h15 stale-row relabeling: consensus, patch the open pools in place, write the
e17 change list, and split the sealed consensus rows by writer (w3 persona, w4 web).
Prints counts only.

Pool rows with a consensus label get it; pool rows without one are removed. Eval rows: the
same, as a change list for `td eval cut-zone --tag rel`.
"""

import json
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[2]
ext = root / "gen" / "external"
repo = root.parent
changes: dict = {"relabel": {}, "drop": []}
for kind in ("pool", "e16"):
    smap = json.loads((ext / f"rel-stale-{kind}-map.json").read_text())
    out = repo / "data" / "pool" / "rel" / f"stale_{kind}.jsonl"
    r = subprocess.run(
        [
            "uv",
            "run",
            "td",
            "data",
            "consensus",
            str(ext / f"rel-stale-{kind}-inputs.jsonl"),
            str(ext / f"rel-stale-{kind}-label-1.jsonl"),
            str(ext / f"rel-stale-{kind}-label-2.jsonl"),
            "--out",
            str(out),
            "--source",
            "rel-stale",
            "--split",
            "dev",
        ],
        cwd=root,
        capture_output=True,
        text=True,
    )
    print(kind, (r.stdout.strip().splitlines() or [r.stderr[-300:]])[-1])
    kept = {
        json.loads(x)["id"][2:]: json.loads(x)["dsl"]
        for x in out.read_text().splitlines()
        if x.strip()
    }
    out.unlink()
    if kind == "pool":
        by_file: dict = {}
        for k, v in smap.items():
            by_file.setdefault(v["file"], {})[v["id"]] = kept.get(k)
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
                        row = {**row, "dsl": rows[row["id"]], "relabeled": "rel"}
                        n_rel += 1
                new.append(row)
            path.write_text("".join(json.dumps(x, ensure_ascii=False) + "\n" for x in new))
            print("  ", f, "relabeled", n_rel, "dropped", n_drop)
    else:
        for k, v in smap.items():
            key = f"{Path(v['file']).stem}|{v['id']}"
            if k in kept:
                changes["relabel"][key] = kept[k]
            else:
                changes["drop"].append(key)
        (root / "gen" / "rel" / "e17-changes.json").write_text(json.dumps(changes))
        print("  e17 changes: relabel", len(changes["relabel"]), "drop", len(changes["drop"]))

# the sealed consensus rows, by writer
sealed = [
    json.loads(x)
    for x in (repo / "data/pool/rel/test_s01.jsonl").read_text().splitlines()
    if x.strip()
]
for name, prefix in (("writers", "r-rel-w3-"), ("web", "r-rel-w4-")):
    rows = [x for x in sealed if x["id"].startswith(prefix)]
    (repo / f"data/pool/rel/test_{name}.jsonl").write_text(
        "".join(json.dumps(x, ensure_ascii=False) + "\n" for x in rows)
    )
    print("sealed", name, len(rows))
