# Idea: type-date

## Premise

A datetime picker component where the user types what they want. Examples:

- "oct 2 to oct 5"
- "every tuesday"
- "every other sunday"
- "last friday"
- "4 to 4:30"

A small parser running in the browser reads the text and emits a line of the DSL (`specs/dsl.md`). The component resolves it to dates and updates a datepicker. The dates and times in the picker change as the user types. Input is debounced, but updates must feel fast.

The parser decides what the user wants. The picker shows only the relevant parts:

- time-only
- date-only
- datetime

## Goal

Ship an npm package with a React datetime picker component that:

- parses free text in the browser, with no server
- is accurate on a very high share of inputs
- is fast and small enough to run on every keystroke
- looks and moves beautifully (see Design)

Before building, we checked whether this exists. It does not. Existing tools are rule-based parsers (chrono-node, when, compromise-dates) or incomplete recurrence parsers (rrule.js `fromText`). No React picker parses free text live. See `specs/research/background/`.

## Decision log

- 2026-11-04: The experiments concept was removed. There is one method, heuristic parser engines, iterated by generation. Engines are named `h1` to `h8`, and `chrono` is the third-party comparison. `runs/<engine>/` replaces `runs/exp-NNN/`, and `specs/engines/` replaces `specs/research/experiments/`.
- 2026-11-04: Model work is removed. Training, export, zero-shot runners, the ONNX engine package, the browser benchmark, the model runs (exp-004 to 008, 010 to 012), their artifacts and the Hugging Face cache were deleted. They are in git history. The Python project keeps only data and eval-set tooling. The dashboard compares heuristic engines only. Every engine is scored on every eval version.
- 2026-11-03: Model work is parked. After round 1 (its note is deleted) a hand-written heuristic parser beat every model we tried by a wide margin on accuracy, size, latency, and memory. The best scratch model reached about 59% on e5 against 95% for heuristic-full-5. Work now focuses on the heuristic, the DSL, the eval sets, and the picker. The model tooling was removed on 2026-11-04 (see below).

## Method

Heuristic parser engines, iterated by generation (`h1`, `h2`, ...), compared with chrono-node as the third-party baseline. Every engine is scored on every eval version. Track accuracy, size and latency, and show a Pareto front. Plan: `specs/plan.md`.

## Constraints

- Mobile is very important. The picker and the dashboard must be responsive and work well on phones.
- Installable as a node package. Usable in React projects.
- About 10GB of disk for the whole project.
- Commit to git as we go. No pushes. No GitHub remote.

## Developer dashboard

Stack: Vite, React, TypeScript, Tailwind.

- Show the engines, with accuracy, latency and size for each.
- Show a Pareto front of accuracy against size and latency.
- Drill down into error analysis by tag, to steer data generation and rule writing.
- Try the picker in the dashboard with any engine.

## Design

- Reference images are in `design-ideas/` (gitignored). Study them closely and copy the look and feel of the widgets.
- Observed style (Untitled UI): off-white surfaces, 1px hairline borders, soft layered shadows, dotted separators, 8-12px radii, Inter, black primary buttons, indigo accent for labels and required marks, small keyboard-hint chips, painterly landscape backgrounds behind windows, a dark variant with warm gold highlights on selected dates and dots under days with events.
- The dashboard and the shipped datepicker share the same design language.

## Later: demo video

Once something works well, make a demo mp4. A human-like typist enters examples and the video shows how quickly the picker updates. Plan: `specs/plan.md`.

## Process

- Developer preferences (uv, ruff, ty, pytest, typer; codify repeated actions as CLI commands and Makefile targets) are in `specs/conventions.md`.
- Maintain `CLAUDE.md` with prose preferences and pitfalls. Agents update it as they learn.
- Write concisely. No mannered or flowery prose.
