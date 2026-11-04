# Eval set versioning

We may find that the eval sets do not cover the space of real inputs well. Then we cut a new eval version. We do this carefully, because every model must be scored on the same eval version to be comparable, and re-scoring is expensive.

## Layout

```
evals/<version>/        e1, e2, ...  (immutable once cut, committed to git)
  manifest.json         version, created, parent, reason, changelog, files {split: {n, sha256}}
  val.jsonl  test_template.jsonl  test_noise.jsonl  test_llm.jsonl  test_external.jsonl
data/<dataset>/         v001, v002, ... training data (train.jsonl, plus meta.json)
```

Eval sets are separate from training datasets. Training rows must not overlap eval rows (normalized text). `td eval check-leak` enforces this.

## Rules

1. Immutable. Never edit or delete rows in a cut eval version. The manifest has file hashes. A change means a new version.
2. Every metric records its eval version (`metrics.json` `eval.version`). Tables, charts, and the Pareto plot compare only within one eval version. The dashboard shows the version and refuses to mix versions silently.
3. Additive by default. Prefer `e(n+1)` = `e(n)` plus new rows. Then results from `e(n)` stay comparable on the shared part: report the old split names on the old rows and the new rows as extra splits (`test_new_*`). Only the new rows need scoring for old models.
4. Conservative cutting. A new version needs a written reason: a coverage gap shown by data (for example real user input that fails but is not represented, a missing tag family, a label policy change). Batch several reasons into one cut. Do not cut for a small tweak.
5. Policy changes that alter labels (for example the meaning of "next friday") are the most expensive. They change the expected answers, so the old and new versions are not comparable even on shared rows. Treat them as a full re-score.
6. Re-evaluate on cut. Retained experiments are re-scored on the new version (`td eval rerun`). Baselines re-run by code. This needs the checkpoint, so keep at least an fp16 or int8 checkpoint for every experiment that stays in comparisons. If a checkpoint was pruned, the experiment is marked `not re-evaluable` and shown greyed out under the new version.
7. Headline numbers always name the eval version. The default view uses the latest version for which an experiment has results.
8. Keep dataset (train) and eval versions independent. A new train dataset version does not change the eval version.

## Procedure to cut a new version

1. Write the reason and the planned additions in `evals/<new>/manifest.json` (`reason`, `changelog`).
2. Build the new rows (generator, LLM cells, hand-written, mined). Dedupe against all existing eval and train rows.
3. `td eval create <new> --parent <old>`: copies the old rows, adds the new ones, writes hashes.
4. `td eval check-leak <dataset> --eval <new>` for every train dataset still in use. Remove leaked rows from train, and record a new dataset version.
5. `td eval rerun <new> --all`: re-score retained experiments. Baselines: `make eval-baselines`.
6. Write `specs/research/experiments/evals-<new>.md`: why, what changed, how rankings moved.

## Costs

Scoring a model on about 12k rows takes about 20 s in PyTorch (MPS) plus the resolver pass. Browser re-scoring is slower and is only done for candidates on the Pareto front. A cut is therefore cheap in compute but must not be frequent, because history in the dashboard and in write-ups gets split across versions.
