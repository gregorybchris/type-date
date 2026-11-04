# Design

Reference images: `design-ideas/` (gitignored). They show Untitled UI style screens. Study them before UI work. Copy the look closely. Dashboard and picker share this language.

## What the references show

Light theme:
- Page and surfaces are warm off-white (`#fafafa` to `#f5f5f4`), cards are white. Sidebar is slightly darker than the content card.
- App windows float over painterly landscape images with large rounded outer corners (about 24px). The window has a thin light border and a soft large shadow.
- Borders are 1px hairlines in light gray (`#e5e5e5` range). Inputs and buttons have a 1px border, 8px radius, and a very subtle bottom shadow.
- Sections are separated by dotted lines (1px dotted, light gray), not solid rules.
- Text: Inter. Headings are medium weight, near black (`#171717`). Secondary text is mid gray (`#737373`). Small uppercase labels (JOINED, PLAN) use the indigo accent (`#4f46e5` range).
- Required marks are a small indigo asterisk.
- Primary button: near-black fill (`#171717`), white text, 8px radius. Secondary: white with a hairline border.
- Chips and badges: white or pale fill, hairline border, 6px radius ("Save 20%", "Pending", "Changes saved" with an indigo check).
- Keyboard hint chips: small rounded squares with a border holding a key glyph (arrow, enter, esc) followed by a gray label (navigate, open, close).
- Selected radio card: 1px dark border and a filled dark radio dot.
- Segmented tabs: a pill group with a white selected segment and hairline border.
- Sidebar items: icon plus label, 8px radius, selected item has a pale gray fill.

Datepicker (light):
- Popover card, 12px radius, hairline border, soft layered shadow.
- Header: month and year centered, small bordered square chevron buttons at the sides.
- Weekday row: `Mo Tu We Th Fr Sa Su` in gray. Week starts Monday in the references. Make it configurable.
- Day cells are about 44px squares with roughly 8px radius. Out-of-month days are lighter gray. Today and the hovered cell have a pale gray fill. The selected day has a stronger fill.
- Small dot under days that have events or markers (indigo in light, warm gold in dark).
- Beside the calendar, a time list in a scroll column: `8:00 AM`, `8:30 AM`, ... The selected time has a pale fill and darker text. Items near the edges fade out.
- Date and time inputs appear above as bordered fields: `[calendar icon] Sep 21, 2026` `10:00 AM` `to` `12:00 PM` `[calendar icon] Sep 21, 2026`. The focused field has an indigo 1px ring.
- Range picker (dark reference): left column of presets (Today, Yesterday, This week, Last week, ...), two month grids, footer with two date fields, a dash, Cancel and Apply buttons. Range days share a rounded rectangle fill that runs across weeks. Range endpoints use the gold accent text.

Dark theme:
- Window `#1c1c1c` to `#262626`, panels slightly lighter, hairline borders `#333` to `#3a3a3a`, text white and gray. Selected fills are `#333`. Accent for selected and dots is warm gold (`#c9a45c` range). Backgrounds behind windows are the same painterly images with a dark window on top.
- Dotted separators remain in dark.

Command palette (reference): search field with a magnifier, a list with small avatar tiles, a footer row of keyboard hints. Use this style for the picker's text input and result summary.

## Tokens (starting values; refine against the images)

- Font: Inter, 14px base, 13px for dense tables, 12px for labels. Numeric data uses tabular numbers.
- Radii: 6 (chips), 8 (inputs, buttons, cells), 12 (cards, popovers), 24 (outer window).
- Shadows: `0 1px 2px rgb(0 0 0 / 0.05)` on inputs. Popover: `0 12px 32px -8px rgb(0 0 0 / 0.12), 0 2px 6px rgb(0 0 0 / 0.06)`.
- Accent: indigo `#4f46e5` (light), gold `#c9a45c` (dark).
- Dotted separator: `border-top: 1px dotted #d4d4d4`.

## Motion

Details in `specs/research/background/animation-and-motion.md`.

- Picker: CSS only (transitions, `grid-template-rows` collapse, `linear()` spring easing, `@starting-style`). Budget about 15kB JS and 4kB CSS gzip.
- Dashboard: Motion (`LazyMotion`, `m`), `@number-flow/react`, Sonner for toasts, Vaul for drawers.
- Respect `prefers-reduced-motion`.
- Patterns: range fill grows and shrinks as text changes; month change slides when the parsed date is in another month; mode change (date only, time only, datetime) collapses and expands panels; time list scrolls to the selected time; updates are debounced so cells do not flicker.
