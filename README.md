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

The parser has no model and no server. It is a set of rules that runs in the browser: 22 kB gzipped up front plus 34 kB of rules that load on the first keystroke, with a median of 0.3 ms per phrase.

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
| `tuesdays at 1:30 and thursdays at 3` | weekly, Tue 1:30 PM and Thu 3:00 PM (a time per weekday) |
| `every third tuesday and second monday` | monthly, 2nd Monday and 3rd Tuesday |
| `every other friday until jan` | every 2 weeks on Friday, ending before Jan 1 |

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

Each generation of the parser is an engine, `h1` to `h12`. They are compared with [chrono-node](https://github.com/wanasit/chrono), a widely used rule-based parser, on the same labeled phrases. Scores are the share of phrases that resolve to the same dates as the label, on eval set `e14` (15,972 phrases). `h12` is the engine the picker ships.

| Engine | All of e14 | Personas | Voice and booking | Formats and domain | Typos | Size, gzip | Median time |
|---|---:|---:|---:|---:|---:|---:|---:|
| chrono-node | 31.7% | 30.2% | 36.6% | 48.1% | 8.0% | 14.9 kB | 0.03 ms |
| `h1` | 70.5% | 50.1% | 57.2% | 39.6% | 23.5% | 7.9 kB | 0.04 ms |
| `h3` | 80.8% | 71.3% | 76.3% | 54.6% | 51.1% | 10.3 kB | 0.04 ms |
| `h5` | 83.1% | 74.6% | 75.3% | 70.0% | 55.0% | 15.9 kB | 0.03 ms |
| `h8` | 89.5% | 86.8% | 83.5% | 81.9% | 91.0% | 21.1 kB + 10.7 kB lazy | 0.10 ms |
| `h11` | 90.7% | 89.2% | 93.8% | 89.2% | 92.3% | 22.1 kB + 27.9 kB lazy | 0.27 ms |
| **`h12`** | **92.5%** | **91.0%** | **93.8%** | **89.2%** | **92.7%** | 22.2 kB + 33.7 kB lazy | 0.30 ms |

chrono-node returns one date or one range and has no recurrence output, so it scores low on repeating schedules. It is not built for typos either.

`h12` adds conjunctions of recurrences ("every third tuesday and second monday", "tuesdays at 1:30 and thursdays at 3") and start and end clauses on any recurrence ("every other friday until jan"). Against `h11` on e14 it fixes 302 phrases and breaks 8. See [`specs/engines/h12.md`](specs/engines/h12.md).

Where `h12` is weaker, by phrase kind (exact match):

| Kind | Phrases | h12 |
|---|---:|---:|
| Time only | 725 | 96.4% |
| Date ranges | 1,796 | 95.5% |
| Nth weekday of a month | 274 | 96.7% |
| Weekly recurrences | 2,741 | 93.1% |
| Relative offsets ("3 weeks from tomorrow") | 494 | 89.7% |
| Named holidays | 110 | 87.3% |
| Several nth weekdays ("every third tuesday and second monday") | 110 | 86.4% |
| Period-relative ("end of next quarter") | 186 | 83.3% |
| Recurrences with bounds ("starting in may for 10 occurrences") | 598 | 76.3% |

### Read these numbers with care

- Labels come from two independent labeling agents. A phrase is kept only if both agree and neither is unsure. Constructs the labelers found confusing are therefore under-represented, and real input will be harder than the table.
- Part of e12 is template-generated text, which is easy. The columns Personas, Voice and booking, Formats and domain, and Typos are phrases written by other people or agents for this project. They are the better guide.
- Some remaining misses are disagreements about what a phrase means, such as "by friday" (a deadline or a date), not parser bugs.
- `h12` was built against a set of labeled pools. On the two sealed conjunction splits it scores 79.1% (written by agents) and 69.2% (from web pages), against 47% and 54% for `h11`. Those splits are used up for tuning, so further rule work needs a new independent set.
- e14 follows a label policy change: `until` with a bare month, week, quarter or year ends the day before it starts ("every other friday until jan" stops before Jan 1), and `through` stays inclusive. Scores on e14 are not comparable with earlier eval versions.
- Eval sets are versioned and immutable. Every engine is scored on every version. Each new data round is split into an open half used for tuning and a sealed half used for the next eval version.

## Run it

```sh
pnpm install
make serve          # dashboard on :5173, picker demo on :5199
```

- The **demo** (`apps/demo`) has settings for 16 color themes, week start, and time and date format.
- The **dashboard** compares engines by eval version, split and phrase kind, plots size against accuracy, and lists errors.

## Use the picker

```sh
npm install @type-date/picker react react-dom
```

```tsx
import { TypeDatePicker } from "@type-date/picker";
import "@type-date/picker/styles.css";

<TypeDatePicker onChange={console.log} />;
```

The parser (engine `h12`) is bundled in the package. The package is not published to npm yet. See [`packages/picker/README.md`](packages/picker/README.md) for props and options.

## Repository

| Path | Contents |
|---|---|
| `packages/core` | DSL types, parser and resolver |
| `packages/baselines` | engines `h1` to `h12` and chrono-node wrapper; eval scripts |
| `packages/picker` | `@type-date/picker`, the React picker with the parser bundled (the npm package) |
| `apps/demo` | The demo site, a Vite app that uses the picker |
| `apps/dashboard` | engine comparison dashboard |
| `evals/eN` | immutable eval sets |
| `data/`, `training/` | labeled pools and the Python tooling that builds data and eval sets |
| `specs/` | DSL, design, per-engine notes, research |

Earlier work tried small neural models (seq2seq, SmolLM2, Qwen). They did not meet the size and speed limits and were removed. They remain in git history.

## Status

Works well on common phrases and many unusual ones. Known gaps:

- lunar and Orthodox holidays ("ramadan" returns not a date), fiscal and academic calendars;
- recurrences with several parts: alternatives ("M or W"), a month parity written as prose, a recurrence tied to another event, and the nth-to-last weekday for any n but last;
- bounded recurrences, the weakest kind in the table;
- some typo'd clock idioms;
- a time given with a date range ("oct 2 to oct 5 at 9am") shows the dates only.
