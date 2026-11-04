# Idea: type-date

## Premise

A datetime picker component where the user types what they want. Examples:

- "oct 2 to oct 5"
- "every tuesday"
- "every other sunday"
- "last friday"
- "4 to 4:30"

A small language model running in the browser reads the text and emits a structured response. The component interprets that response and updates a datepicker. The dates and times in the picker change as the user types. Input is debounced, but updates must feel fast.

The model decides what the user wants. The picker shows only the relevant parts:

- time-only
- date-only
- datetime

## Goal

Ship an npm package with a React datetime picker component that:

- runs a tiny fine-tuned model in the browser
- is accurate on a very high share of inputs
- is fast and small enough to load and run on every keystroke
- looks and moves beautifully (see Design)

Before building, confirm whether this already exists. Research result: it does not. Existing tools are rule-based parsers (chrono-node, when, compromise-dates) or incomplete recurrence parsers (rrule.js `fromText`). No React picker parses free text live. No public in-browser fine-tuned model does this. See `specs/research/background/`.

## Decision log

- 2026-11-04: Model work is removed. Training, export, zero-shot runners, the ONNX engine package, the browser benchmark, the model runs (exp-004 to 008, 010 to 012), their artifacts and the Hugging Face cache were deleted. They are in git history. The Python project keeps only data and eval-set tooling. The dashboard compares heuristic engines only. Every engine is scored on every eval version.
- 2026-11-03: Model work is parked. After round 1 (see `specs/research/experiments/round-1-screening.md`) a hand-written heuristic parser beats every model we tried by a wide margin on accuracy, size, latency, and memory. The best scratch model reached about 59% on e5 against 95% for heuristic-full-5. Work now focuses on the heuristic, the DSL, the eval sets, and the picker. The model tooling was removed on 2026-11-04 (see below).

## Approach

Find a good off-the-shelf model (or train a tiny one) and fine-tune it locally. Build a dataset that maps typed date strings to the expected structure.

### Dataset

- Large variety in spelling, abbreviations, capitalization, typos, spacing. People type many different things.
- Each training and validation example carries tags, for example `basic-date`, `basic-date-range`, `basic-time-range`, `datetime-range`, `relative-date`.
- During training we look at which tags score poorly, do error analysis, and update the dataset.
- Generation: use Claude subagents. One set generates diverse prompts. Another set (or scripts) turns prompts into structured responses. Mix LLM generation with script generation for diversity. Iterate.
- Research online before starting.

### Iteration, not a single implementation

We are not building one implementation and stopping. We build an environment for iterating on:

- datasets
- output formats
- base models
- inference engines (try 2 or 3)
- quantization and other size/speed techniques

Track accuracy, latency, and memory for every experiment. Show a Pareto front so we can choose the best configuration for the use case.

### Non-model baselines

Also build heuristic (non-language-model) solutions, in a few variants that trade robustness against code size, memory, and latency. The Pareto front must show them next to the models. It may turn out that a heuristic is good enough. This is an empirical question.

### Research to do first

- Best structured output format for the model to predict.
- Best way to train tiny models that run in the browser.
- Best small models to fine-tune.
- Best way to create the dataset.
- New and popular libraries for animation of web components.

## Constraints

- Mobile is very important. The picker and the dashboard must be responsive to screen size and work well on phones. The model must be fast enough on standard smartphones today. Layout work follows this from the start. Phone speed is evaluated as we go (see `specs/plan.md`, "Mobile").

- Installable as a node package. Usable in React projects.
- Model runtime is not TensorFlow.js (poor fit for generative models). Try other engines (Transformers.js / ONNX Runtime Web, WebLLM, wllama, etc.).
- About 10GB of disk for the whole project. Do not keep every checkpoint.
- Training happens locally (MacBook M2, 16GB RAM).
- Commit to git as we go. No pushes. No GitHub remote.

## Developer dashboard

Stack: Vite, React, TypeScript, Tailwind (change if research says otherwise).

Requirements:

- Show the experiments being run. Each experiment has a number so progress over time is visible.
- For any trained model show latency, accuracy, memory, size, and more.
- Show a Pareto front of results across accuracy, latency, memory, and size.
- Drill down into error analysis. See which data the model fails on, by tag. Let the developer steer data generation.
- Try the date picker in the dashboard. Select a checkpoint for an experiment and run it in the browser. See how well it performs. Use this to build intuition about how to steer development and data generation.

## Design

- Reference images are in `design-ideas/` (gitignored). Study them closely and copy the look and feel of the widgets.
- Observed style (Untitled UI): off-white surfaces, 1px hairline borders, soft layered shadows, dotted separators, 8-12px radii, Inter, black primary buttons, indigo accent for labels and required marks, small keyboard-hint chips, painterly landscape backgrounds behind windows, a dark variant with warm gold highlights on selected dates and dots under days with events.
- The dashboard and the shipped datepicker share the same design language.
- Think about animation and motion. Use libraries to do it well. Research new and popular animation libraries. Apply the findings to the dashboard and to the shipped picker.

## Later: demo video

Once something works well, make a demo mp4. A human-like typist enters examples and the video shows how quickly the model updates the picker with the right settings. Not needed now. Plan: `specs/plan.md`, Phase 9.

## Process

- Developer preferences (uv, ruff, ty, pytest, typer; codify repeated actions as CLI commands and Makefile targets) are in `specs/conventions.md`.

- Create `specs/` with this file, plus `specs/research/` containing `experiments/` (one file per experiment) and `background/` (research findings as markdown).
- Maintain `CLAUDE.md` with prose preferences and pitfalls. Agents update it as they learn.
- Write concisely. No mannered or flowery prose.
- Plan, then run the research phase and the implementation phase autonomously.
