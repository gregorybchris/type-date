"""Run `td data consensus` for every tz label pair that exists. Prints counts only.
Pool files go to data/pool/tz/dev_pNN.jsonl and sealed files to data/pool/tz/test_sNN.jsonl."""

import glob
import json
import re
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[2]
ext = root / "gen" / "external"
meta = {}
for k in ("pool", "sealed"):
    meta.update(json.loads((ext / f"tz-{k}-meta.json").read_text()))
mp = root / "gen" / "tz" / "meta-for-consensus.json"
mp.write_text(
    json.dumps(
        {i: {"source": m["source"], "url": m["origin"], "license": ""} for i, m in meta.items()}
    )
)
for inp in sorted(glob.glob(str(ext / "tz-*-[0-9][0-9]-inputs.jsonl"))):
    m = re.search(r"tz-(pool|sealed)-(\d\d)-inputs", inp)
    kind, n = m.group(1), m.group(2)
    l1, l2 = inp.replace("-inputs", "-label-1"), inp.replace("-inputs", "-label-2")
    if not (Path(l1).exists() and Path(l2).exists()):
        print(kind, n, "waiting for labels")
        continue
    split = "dev" if kind == "pool" else "test"
    out = root.parent / "data" / "pool" / "tz" / f"{split}_{kind[0]}{n}.jsonl"
    r = subprocess.run(
        [
            "uv",
            "run",
            "td",
            "data",
            "consensus",
            inp,
            l1,
            l2,
            "--out",
            str(out),
            "--source",
            f"tz-{kind}",
            "--split",
            split,
            "--meta",
            str(mp),
        ],
        cwd=root,
        capture_output=True,
        text=True,
    )
    print(kind, n, (r.stdout.strip().splitlines() or [r.stderr[-300:]])[-1])
