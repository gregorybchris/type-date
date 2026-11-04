"""Wall-time buckets for experiments. Written to runs/exp-NNN/timing.json."""

import json
import time
from collections import defaultdict
from contextlib import contextmanager
from datetime import UTC, datetime
from pathlib import Path


class Timer:
    """Accumulates seconds per named bucket. Names use `stage/part`."""

    def __init__(self) -> None:
        self.seconds: dict[str, float] = defaultdict(float)
        self.started = time.perf_counter()
        self.started_at = datetime.now(UTC).isoformat(timespec="seconds")
        self.extra: dict = {}

    @contextmanager
    def bucket(self, name: str):
        t0 = time.perf_counter()
        try:
            yield
        finally:
            self.seconds[name] += time.perf_counter() - t0

    def add(self, name: str, seconds: float) -> None:
        self.seconds[name] += seconds

    def to_dict(self) -> dict:
        total = time.perf_counter() - self.started
        buckets = {k: round(v, 3) for k, v in sorted(self.seconds.items())}
        top_level = {k: v for k, v in buckets.items() if "/" not in k}
        return {
            "stages": {
                "started_at": self.started_at,
                "finished_at": datetime.now(UTC).isoformat(timespec="seconds"),
            },
            "total_s": round(total, 3),
            "buckets": buckets,
            "unaccounted_s": round(total - sum(top_level.values()), 3),
            **self.extra,
        }


def merge_timing(run_dir: Path, stage: str, timer_dict: dict) -> None:
    """Merge one stage's timing (train, export, bench) into timing.json."""
    path = run_dir / "timing.json"
    data: dict = json.loads(path.read_text()) if path.exists() else {"stages": {}}
    data["stages"][stage] = timer_dict
    # roll up per-stage buckets with the stage name as prefix
    flat: dict[str, float] = {}
    total = 0.0
    for st, d in data["stages"].items():
        total += d.get("total_s", 0.0)
        for k, v in d.get("buckets", {}).items():
            flat[f"{st}.{k}"] = v
    data["total_s"] = round(total, 3)
    data["buckets"] = flat
    path.write_text(json.dumps(data, indent=2))
