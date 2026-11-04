# Animation and Motion Research

Date: 2026-11-03. Scope: motion libraries, headless UI, charts, and motion patterns for the type-date picker (npm package) and the ML dashboard.

Confidence notes. Sizes marked (official) come from vendor docs. Sizes marked (3rd) come from aggregator or blog pages and are approximate. Items marked (verify) were not confirmed in this research. Run `bundlejs.com` or `size-limit` on the exact imports before locking a version. Exact latest version numbers were not checked; pin whatever `npm view <pkg> version` returns at install time.

## 1. Summary of decisions

- Shipped picker: CSS only. No runtime animation dependency. Use CSS transitions, `grid-template-rows` collapse, `linear()` spring easing, `@starting-style`, and optional View Transitions as progressive enhancement. Respect `prefers-reduced-motion`.
- Dashboard: Motion (`motion/react`) with `LazyMotion` + `m`, `@number-flow/react` for metrics, Sonner for toasts, Vaul for mobile drawers, Tailwind v4 with `tw-animate-css`.
- Headless layer: React Aria Components for the picker's accessible calendar semantics (optional peer), or a fully custom calendar with Radix/Base UI Popover for the dashboard.
- Charts: visx (or d3 + canvas) for the Pareto scatter, ECharts (modular) as the low-effort alternative.

## 2. Motion library comparison

| Library | Size (gzip) | Tree-shake | React 19 | Layout / shared element | Springs | Gestures | Reduced motion | Fit |
|---|---|---|---|---|---|---|---|---|
| Motion (`motion/react`, ex Framer Motion) | `motion` 43 kb; `m` + `LazyMotion` about 5 kb initial; `domAnimation` +24 kb; `domMax` +38 kb; `useAnimate` mini 3.3 kb; hybrid 23 kb (official) | Good with `m`; any plain `motion.*` use defeats it | Yes (verify exact range) | Yes: `layout`, `layoutId`, `AnimatePresence`. Needs `domMax` | Yes, built in | Yes: drag, hover, tap, pan (`domMax` for drag) | `MotionConfig reducedMotion="user"` | Dashboard: yes. Picker: no, too heavy |
| React Spring | about 20-30 kb (3rd, verify) | Moderate | Yes (verify) | No built-in layout animation | Yes, core strength | via `@use-gesture` (extra) | Manual | Skip. Motion covers the same ground |
| GSAP | core about 25-30 kb (3rd, verify); plugins extra | Per plugin | Works via `@gsap/react` `useGSAP` | Flip plugin does FLIP | Not physics springs by default | Draggable, Observer plugins | Manual via `gsap.matchMedia()` | Dashboard only if timelines or SplitText are needed. License: free for commercial use since Webflow acquisition, with a clause barring use in tools that compete with Webflow's no-code animation builder. Check before using in a published library |
| Auto-Animate | about 2-3 kb (3rd, verify) | Yes | Yes | Auto FLIP on add/remove/move of children | No | No | Honors `prefers-reduced-motion` (verify) | Good for dashboard lists and table row reorders. Tiny |
| Rive | runtime about 150+ kb wasm (3rd, verify) | n/a | Yes | n/a | State machines | Pointer inputs | Manual | Skip. Not needed |
| Lottie (`lottie-web`, `dotlottie-react`) | 50-250 kb (3rd, verify) | Poor | Yes | n/a | n/a | n/a | Manual | Skip, except empty-state art on the dashboard |
| Theatre.js | Large | Partial | Yes | n/a | Timeline editor | n/a | Manual | Skip. Authoring tool, not needed |
| Vaul | about 5-8 kb plus Radix Dialog (3rd, verify) | Yes | Yes | n/a | CSS spring-like | Drag to dismiss | Manual | Dashboard mobile drawer for the picker. Shipped picker: do not depend on it |
| Sonner | about 4-5 kb (3rd, verify) | Yes | Yes | Stacked toasts | CSS | Swipe dismiss | Yes (verify) | Dashboard toasts |
| `@number-flow/react` | about 9 kb added (3rd); 18 kb minified in one listing, version 0.6.0 (3rd). Conflicting; measure | Yes | React 16-19 per listing (3rd) | Digit-level transitions | CSS `linear()`-based | n/a | `respectMotionPreference` defaults to true (official docs) | Dashboard metrics. Not for picker |
| Magic UI / Aceternity | Copy-paste components, built on Motion or CSS | Per component | Yes | Varies | Varies | Varies | Often missing | Source of ideas only. Many effects are decorative. Audit reduced-motion before copying |
| Radix / React Aria | Behavior only, not animation | Yes | Yes | Presence-aware unmount (Radix `Presence`, RAC `isExiting` data attribute) | n/a | Press, focus, drag (RAC) | RAC exposes `data-entering` / `data-exiting` for CSS animation | See section 4 |
| `tailwindcss-animate` / `tw-animate-css` | CSS only, 0 JS | Tailwind purges unused | n/a | n/a | n/a | n/a | Use `motion-safe:` / `motion-reduce:` variants | `tw-animate-css` is the Tailwind v4 replacement for `tailwindcss-animate`. Use in dashboard |
| View Transitions API | 0 kb | n/a | `document.startViewTransition` wrapper. React has experimental `<ViewTransition>` (verify stable status) | Yes: shared element via `view-transition-name` | CSS easing | n/a | Gate with media query | Progressive enhancement for mode switches and drill-down. Same-document is broadly available; Firefox cross-document limited (verify on caniuse) |
| CSS scroll-driven animations | 0 kb | n/a | n/a | n/a | n/a | n/a | Gate with `@media` | MDN marks `scroll()` as Baseline 2026 "newly available". Use for sticky header shadows and scroll-linked fades. Use `@supports` fallback |
| CSS `linear()` easing | 0 kb | n/a | n/a | n/a | Approximates spring and bounce | n/a | Remove under reduced motion | Chrome 113, Firefox 112, Safari 17.2. Use in the picker |
| FLIP (manual) | 0.2 kb helper | n/a | n/a | Manual | Any | n/a | Manual | Use for the range highlight if needed. Prefer Motion `layout` on dashboard |
| Popmotion | Legacy; Motion superseded it | | | | | | | Skip |
| anime.js v4 | about 24.5 kb full (3rd); modular imports smaller | Yes, v4 is modular | Framework-agnostic | No layout animation | Springs in v4 | Draggable | Manual | Skip. No advantage over Motion for React |
| Lenis | about 3-4 kb (3rd, verify) | Yes | Yes (`lenis/react`) | n/a | Smooth scroll | n/a | Must disable for reduced motion | Skip. Smooth scroll hurts a data dashboard and breaks native scroll expectations |

## 3. Suitability for the shipped picker

Constraints: small bundle, no hard dependency, works in SSR, respects user motion settings, themeable via CSS variables.

Rules:
1. Zero runtime animation dependencies. Animations are CSS transitions and keyframes driven by `data-*` attributes (`data-state`, `data-range-position`, `data-direction`).
2. Animate only `transform`, `opacity`, `grid-template-rows`, `background-color`, `box-shadow`. Avoid animating `height`, `width`, `top`, `left`.
3. Ship a `@media (prefers-reduced-motion: reduce)` block that sets durations to about 0 or swaps movement for opacity fades.
4. Expose `--td-duration-*` and `--td-ease-*` CSS custom properties so consumers can override.
5. Optional enhancement: if `document.startViewTransition` exists and the user has not set reduced motion, wrap month and mode changes. Fall back to CSS transitions. Keep it opt-in via a prop, because a global view transition can interfere with host page animations.
6. Do not import Motion in the package. If a consumer wants Motion, expose `data-*` attributes and class hooks, and optionally a `renderMonthGrid` slot.

Spring easing as CSS custom properties (generate with the Linear Easing Generator, https://linear-easing-generator.netlify.app/):

```css
:root {
  --td-ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --td-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  /* Approximate spring, slight overshoot. Generate real points with the tool. */
  --td-ease-spring: linear(0, 0.22 6%, 0.7 15%, 1.04 27%, 1.04 36%, 0.99 50%, 1 70%, 1);
}
@media (prefers-reduced-motion: reduce) {
  :root { --td-dur-scale: 0; }
}
```

## 4. Headless component libraries

| Library | Dates | Size note | Animation hooks | Notes |
|---|---|---|---|---|
| React Aria Components (Adobe) | Full set: Calendar, RangeCalendar, DatePicker, DateRangePicker, DateField, TimeField | About 74 kb gzip for full react-aria in one comparison (3rd). `@internationalized/date` is a separate dependency about 11 kb in the same comparison | `data-entering`, `data-exiting`, `data-selected`, `data-focus-visible`; best a11y (screen reader announcements, month-boundary focus, locale) | Best choice if the picker should reuse tested calendar a11y. Heavy for a small package. Use as optional peer or study for ARIA patterns (grid role, `aria-selected`, `aria-live` month announcement) |
| Radix UI Primitives | No date components | Small per primitive | `data-state` + `Presence` | Use Popover, Dialog, Tabs, Toggle Group for dashboard |
| Base UI (MUI/Radix/Floating UI authors) | No date primitives | Small | `data-starting-style` / `data-ending-style` for CSS transitions | Good modern primitives. Pair with custom calendar |
| shadcn/ui | Date picker recipe built on `react-day-picker` | Copy-paste, no runtime lock-in | Uses `tw-animate-css` classes | Use for dashboard scaffolding. Now supports both Radix and Base UI variants (verify) |
| Ark UI | Date Picker, built on Zag.js state machines | Moderate | `data-state` attributes | Framework-agnostic. Good if Vue or Solid ports are planned |
| `react-day-picker` | Calendar only, no natural-language input | About 10-15 kb (3rd, verify) | Class hooks | Candidate engine for the dashboard embedded copy only |

Recommendation: the picker's own calendar grid and time list are custom (the product needs live preview from parsed text, which no library provides). Borrow ARIA patterns from React Aria. Dashboard uses Radix or Base UI primitives via shadcn/ui for dialogs, popovers, tabs, tables.

## 5. Charting libraries (Pareto front scatter)

| Library | Size (gzip) | Renderer | Transitions | Fit |
|---|---|---|---|---|
| visx | `xychart` about 49 kb (3rd) | SVG | Via `@visx/react-spring` or Motion | Best control for custom Pareto front with a step line, dominated points faded, hover and brush. SVG limits points to a few thousand |
| d3 (scale, shape, transition, delaunay) | about 10-30 kb depending on modules | SVG or canvas | `d3-transition`, or drive with Motion | Use for scales and Delaunay hover hit-testing. Combine with canvas for large N |
| Recharts 3 | about 157-172 kb (3rd), about 97-113 kb without React | SVG | Built-in `isAnimationActive`, `animationDuration`, `animationEasing` | Fastest to build. Heavy and slow with many points |
| ECharts | about 153-177 kb full, modular imports far smaller (3rd) | Canvas or SVG | Built-in `animationDurationUpdate`, `universalTransition` | Best for large N (100k+ with `large` mode), brush, zoom, dataZoom. Good dashboard default |
| uPlot | about 22 kb (3rd) | Canvas | None built in | Best for time series (loss curves). Scatter is limited |
| Observable Plot | about 30-40 kb with d3 (verify) | SVG | None built in (static) | Good for quick exploratory plots. Weak for interactive transitions |

Recommendation: visx + d3-delaunay for the Pareto plot if points are under about 5k, with Motion for point enter/exit and front-line morph. If experiments exceed 10k points, use ECharts (modular, canvas) with `universalTransition`. Use uPlot for training-curve line charts if added later. Chart transitions: animate position changes 300-500 ms, `ease-out`; do not animate on every hover; skip animation on initial render of more than 1k points.

## 6. Motion design for date pickers and live-updating calendars

Principle: the text field is the source of truth. The calendar is a live preview. Motion should confirm what changed, not draw attention to itself. Keep every transition under 300 ms and interruptible.

### 6.1 Selection range grows and shrinks as text changes
- Render range cells as a continuous background band, not per-cell pills with gaps. Use `::before` on each day cell with `inset-inline` extending to cell edges for in-range days.
- Cell fill transitions with `background-color 120ms ease-out`. Do not stagger by cell index. Staggering reads as lag when the user types.
- Endpoints: `transform: scale(0.92) -> 1` over 160 ms with `--td-ease-spring` on first appearance only.
- Alternative for a single moving highlight: one absolutely positioned element animated with `transform: translate()`. Use Motion `layoutId` on dashboard only. In the picker use FLIP-free CSS: position the highlight via CSS variables `--col` and `--row` and transition `transform`.
- If the range jumps more than one row, cross-fade (120 ms) rather than slide.

### 6.2 Month transitions when the parsed date jumps months
- Adjacent month (+/- 1): slide 16-24 px with 10-15% opacity change, 200 ms, `--td-ease-out`. Direction follows sign of the jump.
- Jump of 2+ months or across years: cross-fade 150 ms with no slide. Long slides imply false distance.
- Update the month label with a 120 ms vertical fade; announce via `aria-live="polite"` (once, after debounce).
- Keep the outgoing grid in the DOM only during the transition. Set `inert` on it.
- Do not animate if a previous transition is in flight and a new parse arrives; snap the old one and start the new one.

### 6.3 Mode switching (date-only, time-only, datetime)
- Use `grid-template-rows: 0fr -> 1fr` with `overflow: hidden` on the inner wrapper to expand and collapse the time list panel. 220 ms, `--td-ease-in-out`. No height measurement needed.
- Fade panel content `opacity 0 -> 1` with 60 ms delay on expand; fade out first (100 ms) on collapse.
- Date-only to datetime: calendar stays put; time list slides in from the side (`translateX(8px) -> 0`). Avoid resizing the calendar.
- Popover width change: animate `width` only if unavoidable. Prefer fixed popover width for all modes and let the time column appear in reserved space.
- Optional: View Transitions with `view-transition-name: td-calendar` and `td-time` for shared-element continuity.

### 6.4 Debounced updates without jank
- Two-stage pipeline: parse immediately on each keystroke (cheap, synchronous), commit visual transitions after 80-120 ms of idle. Keep input echo immediate.
- Use `useDeferredValue` or `startTransition` for the calendar subtree so typing never blocks.
- Only trigger a month slide after the parsed month is stable for 120 ms. Cell highlight changes can apply immediately.
- Ignore invalid or partial parses: keep the last valid state and show a subtle dotted-border state on the input rather than clearing the calendar.
- Avoid layout thrash: all animated properties are compositor-friendly. Use `will-change: transform` only during active transitions.
- Test with 6x CPU throttle in Chrome DevTools. Target no long tasks over 50 ms while typing.

### 6.5 Number tickers for metrics (dashboard)
- `@number-flow/react` with `transformTiming={{ duration: 500, easing: 'cubic-bezier(0.22,1,0.36,1)' }}`, `spinTiming` of about 600 ms, `trend` default, `format` via `Intl.NumberFormat` options. `respectMotionPreference` stays true.
- Tick only when the value changes by at least the displayed precision. Debounce streaming updates to at most 2 per second.
- Wrap in a fixed-width tabular-nums container to avoid layout shift (`font-variant-numeric: tabular-nums`).

### 6.6 Chart transitions (dashboard)
- Filter or axis change: points move 400 ms, `ease-out`. Entering points fade and scale from 0.6, 200 ms. Exiting points fade 150 ms.
- Pareto front line: morph with path interpolation (d3 `interpolatePath` or recompute step points), 400 ms.
- Hover: dim non-hovered points to 0.35 opacity, 100 ms. Selected point gets ring (scale 1.4) with spring.
- Drill-down panel: slide in from right 240 ms, or Vaul bottom sheet on mobile. Use `layoutId` from the point to the panel header only if the point is visible; otherwise plain slide.

## 7. Recommended stacks

### 7.1 Shipped picker (`type-date`)
- React 19 as peer (support ^18 || ^19).
- Runtime dependencies: none for animation. Date parsing library as already decided elsewhere.
- Styling: plain CSS file with custom properties, plus optional Tailwind preset. Light and dark themes via `[data-theme]`; gold accent token for selected dates in dark.
- Animation: CSS only (`transition`, `@keyframes`, `linear()`, `grid-template-rows`, `@starting-style` for popover entry, `interpolate-size` optional where supported).
- Enhancement: opt-in View Transitions.
- Accessibility reference: React Aria patterns (not a dependency).
- Size budget: target under 15 kb gzip JS plus under 4 kb CSS. Enforce with `size-limit` in CI.

### 7.2 Dashboard
- Vite + React 19 + TypeScript + Tailwind v4 (latest 4.x).
- `motion` (latest 12.x; verify) using `LazyMotion` with `domMax` only if drag or layout animation is needed, else `domAnimation`; use `m.*` and `strict`. Wrap app in `<MotionConfig reducedMotion="user">`.
- `@number-flow/react` (latest).
- `sonner` (latest), `vaul` (latest).
- `tw-animate-css` (latest) for enter/exit utility classes.
- shadcn/ui with Radix or Base UI primitives; `react-aria-components` only if the embedded picker needs it.
- `@formkit/auto-animate` for table and list reorders (optional).
- Charts: `@visx/*` + `d3-scale`, `d3-delaunay`; ECharts (`echarts` modular, `use()` registration) if point counts are large. TanStack Table for tables.
- Embedded picker: import `type-date` from the workspace. Do not wrap it in Motion; it animates itself with CSS.

## 8. Motion patterns to implement

Easing tokens:
- `ease-out`: `cubic-bezier(0.22, 1, 0.36, 1)`
- `ease-in-out`: `cubic-bezier(0.65, 0, 0.35, 1)`
- `ease-in`: `cubic-bezier(0.55, 0, 1, 0.45)` for exits
- Spring (Motion): `{ type: "spring", stiffness: 500, damping: 35, mass: 1 }` for small UI (chips, buttons); `{ stiffness: 300, damping: 30 }` for panels; `{ stiffness: 170, damping: 26 }` for drill-down sheets. Use `bounce: 0.15` / `duration: 0.35` form if using the Motion duration-based spring.
- Spring (CSS): `linear()` generated for stiffness 400, damping 30 (overshoot under 4%).

| Pattern | Duration | Easing | Notes |
|---|---|---|---|
| Hover / press on buttons, day cells | 100-120 ms | ease-out | Press: `scale(0.97)` |
| Focus ring appear | 80 ms | ease-out | Ring via `box-shadow`, never removed for keyboard users |
| Day-cell fill (selection, range) | 120 ms | ease-out | No stagger |
| Range endpoint pop | 160 ms | CSS spring | First appearance only |
| Month slide (adjacent) | 200 ms | ease-out | 16-24 px, direction by sign |
| Month cross-fade (jump) | 150 ms | linear | No slide |
| Month label swap | 120 ms | ease-out | 4 px vertical offset |
| Time panel expand/collapse | 220 ms | ease-in-out | `grid-template-rows` |
| Time list item highlight | 100 ms | ease-out | Auto-scroll to selected with `scrollIntoView({block:"nearest", behavior: reducedMotion ? "auto" : "smooth"})` |
| Popover open | 160 ms | ease-out | `opacity 0->1`, `translateY(-4px)->0`, `scale(0.98)->1`; origin from trigger |
| Popover close | 100 ms | ease-in | Shorter than open |
| Tooltip / keyboard-hint chip | 120 ms, 400 ms open delay | ease-out | |
| Input invalid-parse state | 150 ms | ease-out | Border to dotted, color shift. No shake |
| Toast (Sonner) | default (about 400 ms) | Sonner default | Swipe dismiss |
| Drill-down panel | 240 ms | spring 300/30 | Slide from right |
| Mobile sheet (Vaul) | spring 170/26 | | Drag to dismiss |
| Number ticker | 500 ms transform, 600 ms spin | ease-out | Max 2 updates/s |
| Chart point move | 400 ms | ease-out | |
| Chart point enter / exit | 200 / 150 ms | ease-out / ease-in | |
| Skeleton shimmer | 1.5 s loop | linear | Disable under reduced motion |
| Theme switch (light/dark) | 150 ms on `background-color`, `color`, `border-color` | ease-out | Or View Transition cross-fade |

Reduced motion rules:
- CSS: under `prefers-reduced-motion: reduce`, set transition durations to 0-1 ms for transforms and keep opacity fades at 100 ms or less.
- Motion: `reducedMotion="user"` disables transform and layout animations, keeps opacity.
- NumberFlow: leave `respectMotionPreference` true.
- Disable parallax, shimmer loops, auto-scroll smooth behavior, and Lenis-style scroll hijacking.
- Test with OS setting enabled. Add a Playwright project with `reducedMotion: "reduce"`.

Performance rules:
- Animate `transform` and `opacity` only on large surfaces.
- Avoid `filter: blur` animation on large areas, especially the painterly backgrounds; render those as static images.
- Cap simultaneous animated elements around 100 (month grid is 42 cells; animate the grid container, not cells, for month changes).
- Use `content-visibility: auto` for off-screen dashboard panels.
- Measure with Chrome Performance panel; target 60 fps and INP under 200 ms.

## 9. Open items (verify before implementation)
- Exact current versions and gzip sizes of Motion, NumberFlow, Sonner, Vaul, Auto-Animate with bundlejs.
- React's `<ViewTransition>` component status in the React 19.x line.
- Firefox status for cross-document View Transitions and scroll-driven animations on caniuse.
- GSAP standard license wording if GSAP is ever used in a published library.
- Whether `interpolate-size` and `@starting-style` are available in all target browsers.

## 10. Sources
- Motion bundle size: https://motion.dev/docs/react-reduce-bundle-size
- NumberFlow docs: https://number-flow.barvian.me/ ; npm: https://npmjs.com/package/@number-flow/react
- GSAP free announcement: https://webflow.com/blog/gsap-becomes-free ; license: https://gsap.com/community/standard-license/
- anime.js v4 listing: https://devpick.pages.dev/pkg/animejs ; https://www.mintlify.com/juliangarnier/anime/installation
- CSS linear(): https://developer.chrome.com/docs/css-ui/css-linear-easing-function
- Linear easing generator: https://linear-easing-generator.netlify.app/
- View Transition API (MDN): https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- Scroll-driven animations (MDN): https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll
- Headless library comparisons: https://www.untitledui.com/blog/base-ui-vs-react-aria ; https://www.greatfrontend.com/blog/top-headless-ui-libraries-for-react-in-2026 ; https://www.pkgpulse.com/guides/base-ui-vs-radix-ui-vs-ark-ui-guide-for-headless-react-components-2026
- Chart library sizes: https://tanstack.com/charts/latest/docs/comparison ; https://chartts.pages.dev/blog/best-lightweight-chart-libraries
