# @type-date/picker

React datetime picker. The user types text such as "oct 2 to oct 5" or "every other sunday". The calendar and time list update as they type.

The parser runs in the browser and is bundled: no model, no network call, no server. It is the heuristic engine `h14` (see `specs/engines/h14.md`). Its rule sets load lazily on the first keystroke, and the entry file is about 14 kB gzipped. React is the only peer dependency.

## Install

```sh
npm install @type-date/picker react react-dom
```

## Use

```tsx
import { TypeDatePicker } from "@type-date/picker";
import "@type-date/picker/styles.css";

<TypeDatePicker onChange={(r) => console.log(r)} theme="system" weekStart={1} />
```

`onChange` receives a `Resolved` value: `mode` (`d`, `t` or `dt`), `kind` (`single`, `range`, `list` or `recurrence`) and the dates or recurrence. `summarize(r)` returns a plain-text description.

Other exports: `parse(text, today?)` is the built-in parser (text to a DSL line, see `specs/dsl.md`). Pass your own `parse` prop to replace it.

## Props

| Prop | Default | Notes |
|---|---|---|
| `parse` | built-in parser | `(text) => Promise<string>`, text to DSL line |
| `value`, `onChange` | none | `onChange` fires for parsed results and for clicks |
| `onConfirm`, `onEscape`, `onClear` | none | Enter (after flushing the debounce), Escape on an empty input, and clearing |
| `today` | local date | `YYYY-MM-DD` |
| `zone` | browser zone | The user's IANA zone, for example `America/New_York`. Used to pick among ambiguous abbreviations (IST, CST, BST) and to show a time typed in another zone as "your time" |
| `locale` | `navigator.language` | The user's locale, for example `en-IN`. Its region breaks ties between zone abbreviations |
| `weekStart` | `0` | 0 Sunday, 1 Monday |
| `timeFormat` | `"12h"` | `"12h"` or `"24h"` |
| `dateFormat` | `"mdy"` | `"mdy"` (Oct 2, 2027), `"dmy"` (2 Oct 2027) or `"iso"` (2027-10-02) |
| `debounceMs` | `120` | |
| `theme` | `"system"` | `light`, `dark`, or follow `prefers-color-scheme`. A `[data-theme=dark]` ancestor also works |
| `showRule` | `false` | Show the RRULE for repeating results |
| `autoFocus` | `false` | Focus the text input on mount |
| `placeholder`, `defaultText`, `className` | | |

Colors are CSS variables on `.td-root` (`--td-bg`, `--td-fg`, `--td-accent`, and so on). Override them to theme the picker; `apps/demo` has 16 examples.

## Behavior

- The `mode` of the result picks the panels: `d` calendar, `t` time list, `dt` both. Panels collapse with `grid-template-columns` and `grid-template-rows` transitions.
- Stale `parse` results are dropped. While a parse is pending, and when the output is `x`, the last good result stays on screen. After `x` the card is dimmed and shows a note.
- Clicking days and times edits the value. Drag across days, or shift-click, to select a range. Cmd or ctrl-click adds days to a list of dates. In a range, two plain day clicks set start and end. In a time range, the focused time field (start or end) takes the click. The AM/PM chip appears when the resolver guessed the meridiem.
- Recurrences mark occurrences with dots, and show the RRULE and the next three dates.
- Keyboard: Enter confirms, Escape clears the text, ArrowDown moves from the input into the calendar. In the grid: arrows move by day or week, PageUp and PageDown change month. In the time list: Up and Down, Enter.
- Motion is CSS only. Tokens: `--td-dur`, `--td-dur-slow`, `--td-ease-out`, `--td-ease-io`, `--td-ease-spring` (`linear()` with a cubic-bezier fallback). `prefers-reduced-motion` turns transitions and animations off.
- The font is `Inter, system-ui, sans-serif`. It is not bundled; set `font-family` on `.td-root` to change it.

## Mobile

- The root sizes to its container (`container-type: inline-size`, max 462px). Below 462px the layout is one column: the calendar fills the width and the time list becomes a horizontal strip under it (a vertical list in time-only mode).
- Touch devices and viewports up to 520px get 44px targets, a 16px input font (no iOS zoom), `touch-action: manipulation`, and hidden keyboard hints. Hover styles apply only under `@media (hover: hover)`.
- The search row is sticky. Under 520px the card is capped to the visual viewport (`--td-vvh`, set from `visualViewport`, fallback `100dvh`) and scrolls inside. On focus it scrolls to the top of the screen so the input and result stay above the keyboard.
- Range selection by tap: the first tap shows "Tap an end date", the second sets the range.
- Safe-area insets apply to the side padding and the footer.

## Scripts

| Command | What it does |
|---|---|
| `pnpm --filter @type-date/picker test` | Vitest and Testing Library |
| `pnpm --filter @type-date/picker build` | tsup build (ESM, bundled parser, d.ts) and minified CSS in `dist/` |
| `pnpm --filter @type-date/picker size` | gzip size against the budget (15 KiB JS, 4.5 KiB CSS); runs in CI |
| `pnpm --filter @type-date/picker test:pack` | Build, `npm pack`, install the tarball in a scratch project, bundle an app that uses it and load it in a browser. Does not publish |

The demo app is `apps/demo`. Screenshot scripts (`shots`, `shots:mobile`) live there.

## Pitfalls

- `playwright` `goto` waits for `load`, which hangs on the Google Fonts link in the demo. Use `waitUntil: "domcontentloaded"`.
- `@type-date/core` and `@type-date/baselines` are workspace sources, not published. `tsup` bundles them into `dist/`. Keep them out of `dependencies`, or the tarball will point at packages that do not exist on npm.

## License

MIT. See [LICENSE](LICENSE).
