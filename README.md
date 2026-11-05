<h1 align="center">type-date</h1>

<p align="center">
A date and time picker you type into.<br>
Just type <code>oct 2 to oct 5</code> or <code>every other sunday</code> and the calendar updates in real time.
</p>

<p align="center">
  <img src="docs/media/demo-colors.gif" alt="Typing ten phrases into the picker, from oct 2 to oct 5 to four score and seven years ago, with the theme and highlight color changing each time" width="400">
</p>

## The idea

Most date pickers make you click through a calendar. Most natural-language date libraries return one date and give up on ranges and repeating schedules. type-date reads free text, decides whether you meant a date, a time, a range or a recurrence, and shows only the matching panels. It updates on every keystroke.

The parser has no model and no server. It is a set of rules that runs in the browser: about 22 kB gzipped, with a median of 0.3 ms per phrase.

## What it understands

| You type | It means |
|---|---|
| `oct 2 to oct 5` | Oct 2 through Oct 5 |
| `next monday 9am to 5pm` | one day, 9:00 to 17:00 |
| `every other sunday` | every 2 weeks on Sunday |
| `last friday of the month` | the last Friday of this month |
| `every weekday for two weeks` | Mon to Fri, 10 occurrences |
| `a couple weeks from next tuesday` | 2 weeks after next Tuesday |
| `thanksgiving` | 4th Thursday of November |
| `mwf 10-10:50` | Mon, Wed, Fri, 10:00 to 10:50 |
| `13th of last month` | day 13 of the previous month |
| `four score and seven years ago` | 87 years back |
| `every thrus` | every Thursday (typos and abbreviations are handled) |

## How it works

```
text  ->  parser  ->  DSL line  ->  resolver  ->  dates  ->  picker
"every other sunday"   d R w/2 su
```

1. **Parser.** Rules turn text into one line of a small DSL ([`specs/dsl.md`](specs/dsl.md)). A line is a mode (`d`, `t`, `dt`, or `x` for "not a date") and a body.
2. **Resolver.** `@type-date/core` turns the line into concrete dates relative to today.
3. **Picker.** `@type-date/picker` is a React component. The mode picks the panels. Clicking a day or time edits the result. Motion is CSS only.

The parser is separate from the picker. Any function from text to a DSL line works as `parse`.

## Results

Each generation of the parser is an engine, `h1` to `h11`. They are compared with [chrono-node](https://github.com/wanasit/chrono), a widely used rule-based parser, on the same labeled phrases. Scores are the share of phrases that resolve to the same dates as the label, on eval set `e12` (15,081 phrases).

| Engine | All of e12 | Personas | Voice and booking | Formats and domain | Typos | Size, gzip | Median time |
|---|---:|---:|---:|---:|---:|---:|---:|
| chrono-node | 34.2% | 30.7% | 36.6% | 48.1% | 8.2% | 14.9 kB | 0.03 ms |
| `h1` | 73.4% | 50.3% | 57.2% | 40.0% | 23.8% | 7.9 kB | 0.04 ms |
| `h3` | 83.7% | 71.5% | 76.3% | 55.4% | 51.4% | 10.3 kB | 0.04 ms |
| `h5` | 86.1% | 74.8% | 75.3% | 70.0% | 56.3% | 15.9 kB | 0.03 ms |
| `h8` | 92.3% | 87.6% | 83.5% | 81.9% | 91.6% | 21.1 kB | 0.10 ms |
| **`h11`** | **93.4%** | **90.1%** | **93.8%** | **89.2%** | **92.8%** | 22.1 kB + 27.9 kB lazy | 0.27 ms |

chrono-node returns one date or one range and has no recurrence output, so it scores low on repeating schedules. It is not built for typos either.

Where `h11` is weaker, by phrase kind (exact match):

| Kind | Phrases | h11 |
|---|---:|---:|
| Time only | 724 | 96.5% |
| Date ranges | 1,795 | 95.5% |
| Nth weekday of a month | 266 | 97.0% |
| Weekly recurrences | 2,741 | 92.7% |
| Relative offsets ("3 weeks from tomorrow") | 492 | 89.6% |
| Named holidays | 110 | 87.3% |
| Period-relative ("end of next quarter") | 180 | 82.2% |
| Recurrences with bounds ("starting in may for 10 occurrences") | 247 | 73.7% |

### Read these numbers with care

- Labels come from two independent labeling agents. A phrase is kept only if both agree and neither is unsure. Constructs the labelers found confusing are therefore under-represented, and real input will be harder than the table.
- Part of e12 is template-generated text, which is easy. The columns Personas, Voice and booking, Formats and domain, and Typos are phrases written by other people or agents for this project. They are the better guide.
- Some remaining misses are disagreements about what a phrase means, such as "by friday" (a deadline or a date), not parser bugs.
- Eval sets are versioned and immutable. Every engine is scored on every version. Each new data round is split into an open half used for tuning and a sealed half used for the next eval version.

## Run it

```sh
pnpm install
make serve          # dashboard on :5173, picker demo on :5199
```

- The **demo** has a settings panel (gear icon) to switch parser generations and see the parsed line.
- The **dashboard** compares engines by eval version, split and phrase kind, plots size against accuracy, and lists errors.
- The packages are not published to npm yet. To use the picker, pass any `parse(text) => Promise<string>`; see [`packages/picker/README.md`](packages/picker/README.md).

```tsx
import { baselines } from "@type-date/baselines";
import { TypeDatePicker } from "@type-date/picker";
import "@type-date/picker/styles.css";

const parse = async (text: string) => (await baselines.h11.predict(text)).dsl;

<TypeDatePicker parse={parse} onChange={console.log} />;
```

## Repository

| Path | Contents |
|---|---|
| `packages/core` | DSL types, parser and resolver |
| `packages/baselines` | engines `h1` to `h11` and chrono-node wrapper; eval scripts |
| `packages/picker` | React picker and demo |
| `apps/dashboard` | engine comparison dashboard |
| `evals/eN` | immutable eval sets |
| `data/`, `training/` | labeled pools and the Python tooling that builds data and eval sets |
| `specs/` | DSL, design, per-engine notes, research |

Earlier work tried small neural models (seq2seq, SmolLM2, Qwen). They did not meet the size and speed limits and were removed. They remain in git history.

## Status

Works well on common phrases and many unusual ones. Known gaps: lunar and Orthodox holidays, fiscal and academic calendars, some typo'd clock idioms, and bounded recurrences. Some phrases drop a time when combined with a date range ("oct 2 to oct 5 at 9am" shows the dates only).
