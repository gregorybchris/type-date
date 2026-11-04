# Round 1: broad screening

Question: before tuning anything, which family of solution is competitive: a library, a heuristic parser, a prompted pretrained LLM, a fine-tuned LLM, or a small model trained from scratch?

All rows are scored on eval e5 (e3 plus two public-phrase splits) (10,948 rows: val, test_template, test_noise, test_llm, plus two realistic splits written by independent LLM writers and labeled by two agreeing labelers: test_external and test_external_hard). Accuracy is resolved match (same resolved dates over seven reference days). "realistic" is test_external, "hard" is test_external_hard.

| exp | title | family | size | all | realistic | hard | p50 ms |
|---|---|---|---|---|---|---|---|
| exp-001 | chrono-node + DSL adapter | library | 14.9 kB | 36.1 | 39.6 | 16.3 | 0.03 |
| exp-002 | heuristic-small (regex) | heuristic | 3.5 kB | 57.9 | 42.7 | 15.2 | 0.01 |
| exp-003 | heuristic-full (grammar, fuzzy) | heuristic | 7.9 kB | 86.5 | 67.4 | 22.0 | 0.12 |
| exp-005 | scratch enc-dec 10M R0 | enc-dec-scratch | 38.8 MB | 59.4 | 55.2 | 17.7 | - |
| exp-009 | heuristic-full-2 | heuristic | 8.8 kB | 88.5 | 70.7 | 22.4 | 0.17 |
| exp-010 | SmolLM2-135M fine-tuned (8k rows) | finetune | 269.0 MB | 71.9 | 74.1 | 63.8 | - |
| exp-011 | scratch enc-dec, 6 epochs, v005 | enc-dec-scratch | 38.8 MB | 55.5 | 61.9 | 24.4 | - |
| exp-012 | scratch enc-dec, digit tokens, 6 epochs | enc-dec-scratch | 38.8 MB | 38.5 | 57.3 | 17.3 | - |
| exp-013 | heuristic-full-3 | heuristic | 10.3 kB | 93.5 | 93.3 | 78.8 | 0.07 |
| exp-014 | heuristic-full-4 | heuristic | 14.6 kB | 94.3 | 94.5 | 89.9 | 0.09 |
| exp-015 | heuristic-full-5 | heuristic | 15.9 kB | 94.8 | 95.1 | 90.2 | 0.10 |

(Regenerate with `make results EVAL=e5`. Rows for runs still in progress are added when they finish.)

## What we learned so far

1. Library parsing alone (chrono-node) is weak on this task: it has no recurrence and does not match our label conventions (35% overall).
2. A hand-written heuristic is the strongest option by a wide margin so far. heuristic-full-4 is 95.0% overall, 94.5% on realistic input and 89.9% on hard input, in 14.6 kB gzipped and under 1 ms on a throttled phone profile.
3. The biggest gains came from data, not from cleverness: realistic LLM-written inputs with consensus labels lifted the realistic split from 71% (heuristic-full-2) to 93% (heuristic-full-3) and the hard split from 79% to 90% (heuristic-full-4).
4. Prompted tiny LLMs (135M to 500M parameters) with a few-shot prompt do not work on this DSL: 3 to 11% resolved.
5. exp-010 (SmolLM2-135M fully fine-tuned for one epoch on 8k rows) reaches 71.9% resolved on e5: better than the scratch models and still 23 points behind the heuristic, at 270 MB. Model work was parked after this round (see `specs/idea.md`, decision log).
6. The first scratch-trained model (10M parameters, 20 epochs on grammar data) reaches 60% overall and 55% on realistic input. It mixes up digits in dates. Training on realistic data and fine-tuning a pretrained model are being tested (exp-010 to exp-012).
7. Eval hygiene mattered: 3 to 29% of the first eval rows overlapped training text, and about 9% had label-policy ambiguities. Both were fixed by cutting new eval versions. See `specs/research/eval-versioning.md`.

## Generalization check on developer-written phrases (eval e4)

e4 adds `test_public`: 218 phrases mined from chrono-node's public test suite (written by library developers, relabeled with our DSL by two agreeing labelers). Resolved accuracy there: chrono-node 71.6%, heuristic-full-4 67.9%, heuristic-full-3 64.2%, heuristic-full 44.0%. Our heuristics score 94% on LLM-written input but about 68% on developer-written phrases. The gap comes from formats our data never covered: year-first and ISO-like dates (`2012/8/10`, `09-JAN-2017`), two-digit years, `later` / `next day` relative forms, and invalid dates that must return `x` (`February 30`). A formats-focused data round followed (see `specs/research/dsl-gaps.md`). Caveat: the example formats in that round's writer brief were chosen after looking at heuristic-full-4's failures on test_public, so `test_public` is a development set from exp-015 on, not an independent test. A fresh public set (`test_public2`, e5) replaces it as the independent check. chrono-node's number is flattered because these phrases come from its own tests.

## Caveats

- Test input comes from LLM writers and LLM labelers, not real users. The realistic and hard splits were never read by the author of the heuristics, but they share a source family with the data used to tune them.
- About 9% of hard-style inputs need DSL features v1 does not have (open ranges, day of month, durations). See `specs/research/dsl-gaps.md`.
