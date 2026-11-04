"""Shared helpers: repo root, JSONL reading, resolved-date comparison with the TS resolver."""

import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]


def load_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    return [json.loads(line) for line in path.read_text().splitlines() if line.strip()]


def resolved_equal(pairs: list[dict]) -> list[bool]:
    """Compare resolved dates of expected and predicted DSL using the TS resolver."""
    script = ROOT / "packages/core/scripts/score-resolved.ts"
    proc = subprocess.run(
        ["pnpm", "exec", "tsx", str(script)],
        input=json.dumps(pairs),
        capture_output=True,
        text=True,
        cwd=ROOT / "packages/core",
        check=True,
    )
    return json.loads(proc.stdout)
