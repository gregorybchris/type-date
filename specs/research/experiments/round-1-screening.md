# Round 1: broad screening

Question: before tuning anything, which family of solution is competitive: a library, a heuristic parser, a prompted pretrained LLM, a fine-tuned LLM, or a small model trained from scratch?

All rows are scored on eval e3 (10,948 rows: val, test_template, test_noise, test_llm, plus two realistic splits written by independent LLM writers and labeled by two agreeing labelers: test_external and test_external_hard). Accuracy is resolved match (same resolved dates over seven reference days). "realistic" is test_external, "hard" is test_external_hard.

| exp | title | family | size | all | realistic | hard | p50 ms |
|---|---|---|---|---|---|---|---|
| exp-001 | chrono-node + DSL adapter | library | 14.9 kB | 34.9 | 39.6 | 16.3 | 0.03 |
| exp-002 | heuristic-small (regex) | heuristic | 3.5 kB | 58.2 | 42.7 | 15.2 | 0.01 |
| exp-003 | heuristic-full (grammar, fuzzy) | heuristic | 7.9 kB | 87.5 | 67.4 | 22.0 | 0.12 |
| exp-004 | scratch enc-dec 8M (bugged) | enc-dec-scratch | 10.4 MB | 40.8 | 39.6 | 12.6 | 1564.90 |
| exp-005 | scratch enc-dec 10M R0 | enc-dec-scratch | 38.8 MB | 60.5 | 55.2 | 17.7 | - |
| exp-006 | SmolLM2-135M few-shot | zero-shot | 269.0 MB | 3.1 | 0.9 | 0.7 | - |
| exp-008 | Qwen2.5-0.5B few-shot | zero-shot | 988.1 MB | 9.0 | 11.0 | 7.6 | - |
| exp-009 | heuristic-full-2 | heuristic | 8.8 kB | 89.6 | 70.7 | 22.4 | 0.17 |
| exp-013 | heuristic-full-3 | heuristic | 10.3 kB | 94.3 | 93.3 | 78.8 | 0.07 |
| exp-014 | heuristic-full-4 | heuristic | 14.6 kB | 95.0 | 94.5 | 89.9 | 0.09 |

(Regenerate with `make results EVAL=e3`. Rows for runs still in progress are added when they finish.)

## What we learned so far

1. Library parsing alone (chrono-node) is weak on this task: it has no recurrence and does not match our label conventions (35% overall).
2. A hand-written heuristic is the strongest option by a wide margin so far. heuristic-full-4 is 95.0% overall, 94.5% on realistic input and 89.9% on hard input, in 14.6 kB gzipped and under 1 ms on a throttled phone profile.
3. The biggest gains came from data, not from cleverness: realistic LLM-written inputs with consensus labels lifted the realistic split from 71% (heuristic-full-2) to 93% (heuristic-full-3) and the hard split from 79% to 90% (heuristic-full-4).
4. Prompted tiny LLMs (135M to 500M parameters) with a few-shot prompt do not work on this DSL: 3 to 11% resolved.
5. The first scratch-trained model (10M parameters, 20 epochs on grammar data) reaches 60% overall and 55% on realistic input. It mixes up digits in dates. Training on realistic data and fine-tuning a pretrained model are being tested (exp-010 to exp-012).
6. Eval hygiene mattered: 3 to 29% of the first eval rows overlapped training text, and about 9% had label-policy ambiguities. Both were fixed by cutting new eval versions. See `specs/research/eval-versioning.md`.

## Caveats

- Test input comes from LLM writers and LLM labelers, not real users. The realistic and hard splits were never read by the author of the heuristics, but they share a source family with the data used to tune them.
- About 9% of hard-style inputs need DSL features v1 does not have (open ranges, day of month, durations). See `specs/research/dsl-gaps.md`.
