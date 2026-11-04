# @type-date/picker

React datetime picker. The user types text such as "oct 2 to oct 5" or "every other sunday". The calendar and time list update as they type.

The picker does not include a model. You pass `parse(text) => Promise<string>`, which returns a DSL line (see `specs/dsl.md`). `@type-date/core` resolves the line into dates.

## Use

```tsx
import { TypeDatePicker } from "@type-date/picker";
import "@type-date/picker/styles.css";

<TypeDatePicker parse={myParse} onChange={(r) => console.log(r)} theme="system" weekStart={1} />
```

## Props

| Prop | Default | Notes |
|---|---|---|
| `parse` | required | text to DSL line |
| `value`, `onChange` | none | `Resolved` from `@type-date/core`. `onChange` fires for parsed results and for clicks |
| `onConfirm`, `onEscape` | none | Enter (after flushing the debounce) and Escape on an empty input |
| `today` | local date | `YYYY-MM-DD` |
| `weekStart` | `0` | 0 Sunday, 1 Monday |
| `debounceMs` | `120` | |
| `theme` | `"system"` | `light`, `dark`, or follow `prefers-color-scheme`. A `[data-theme=dark]` ancestor also works |
| `placeholder`, `defaultText`, `className` | | |

## Behavior

- The `mode` of the result picks the panels: `d` calendar, `t` time list, `dt` both. Panels collapse with `grid-template-columns` and `grid-template-rows` transitions.
- Stale `parse` results are dropped. While a parse is pending, and when the output is `x`, the last good result stays on screen. After `x` the card is dimmed and shows a note.
- Clicking days and times edits the value. In a range, two day clicks set start and end. In a time range, the focused time field (start or end) takes the click. The AM/PM chip appears when the resolver guessed the meridiem.
- Recurrences mark occurrences with dots, and show the RRULE and the next three dates.
- Keyboard: Enter confirms, Escape clears the text, ArrowDown moves from the input into the calendar. In the grid: arrows move by day or week, PageUp and PageDown change month. In the time list: Up and Down, Enter.
- Motion is CSS only. Tokens: `--td-dur`, `--td-dur-slow`, `--td-ease-out`, `--td-ease-io`, `--td-ease-spring` (`linear()` with a cubic-bezier fallback). `prefers-reduced-motion` turns transitions and animations off.
- The font is `Inter, system-ui, sans-serif`. It is not bundled.

## Mobile

- The root sizes to its container (`container-type: inline-size`, max 462px). Below 462px the layout is one column: the calendar fills the width and the time list becomes a horizontal strip under it (a vertical list in time-only mode).
- Touch devices and viewports up to 520px get 44px targets, a 16px input font (no iOS zoom), `touch-action: manipulation`, and hidden keyboard hints. Hover styles apply only under `@media (hover: hover)`.
- The search row is sticky. Under 520px the card is capped to the visual viewport (`--td-vvh`, set from `visualViewport`, fallback `100dvh`) and scrolls inside. On focus it scrolls to the top of the screen so the input and result stay above the keyboard.
- Range selection by tap: the first tap shows "Tap an end date", the second sets the range.
- Safe-area insets apply to the side padding and the footer.

## Scripts

| Command | What it does |
|---|---|
| `pnpm --filter @type-date/picker dev` | Demo at http://localhost:5199 (stub `parse`, fixed today 2026-09-14) |
| `pnpm --filter @type-date/picker test` | Vitest and Testing Library |
| `pnpm --filter @type-date/picker build` | Vite library build, d.ts, minified CSS in `dist/` |
| `pnpm --filter @type-date/picker size` | gzip size against the budget (15 kB JS, 4 kB CSS) |
| `pnpm --filter @type-date/picker shots:mobile <dir>` | Screenshots at 360, 390, 768, 1024 in both themes. Fails on horizontal overflow or touch targets under 44px |
| `pnpm --filter @type-date/picker shots <dir>` | Playwright screenshots of the demo, both themes |

## Picker pitfalls

- `vite` was run with the demo `root`; `playwright` `goto` waits for `load`, which hangs on the Google Fonts link in the demo. Use `waitUntil: "domcontentloaded"`.
- macOS `sed -i` needs `-i ''`. Edit files with a script or an editor tool instead.
- React 18 has no `inert` prop. Panels set the `inert` attribute through a ref (`inertRef` in `TypeDatePicker.tsx`).
- Smooth `scrollTo` in the time list is cut short by Playwright `fullPage` screenshots. Wait about 1.5s before capturing.
- A size-changing card (mode change) cannot be its own container for container queries. The picker uses an outer `.td-root` container and an inner `.td-card`.
- `cat > file` without a heredoc in a shell call waits on stdin and hangs the tool.
- `@type-date/core` ships TypeScript source (`main` is `src/index.ts`). The picker build leaves it external, so publishing needs a built core.
