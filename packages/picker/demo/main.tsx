import h11 from "@type-date/baselines/h11";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import { TypeDatePicker, summarize } from "../src";
import type { DateFormat, TimeFormat } from "../src";
import "../src/styles.css";
import "./demo.css";
import { DEFAULT_THEME, THEMES, findTheme, themeVars } from "./themes";

function localToday(): string {
  const n = new Date();
  const p = (x: number) => String(x).padStart(2, "0");
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`;
}

const EXAMPLES = [
  "oct 2 to oct 5",
  "every other sunday",
  "last friday",
  "4 to 4:30",
  "tomorrow at 3pm",
  "next monday 9am to 5pm",
  "every weekday at 9",
  "first monday of march",
  "monthly on the 15th",
  "dec 28 to jan 3",
  "every other friday until dec 31",
  "noon",
  "four score and seven years ago",
  "13th of last month",
  "may the fourth be with you",
  "pi day",
  "next leap day",
  "next friday the 13th",
];

const q = new URLSearchParams(location.search);
/** The real current date. `?today=YYYY-MM-DD` overrides it (used by the screenshot scripts). */
const TODAY = /^\d{4}-\d{2}-\d{2}$/.test(q.get("today") ?? "") ? (q.get("today") as string) : localToday();

const STORE_KEY = "type-date-demo:v2";
interface Prefs {
  /** A theme id from themes.ts. */
  theme: string;
  weekStart: 0 | 1;
  timeFormat: TimeFormat;
  dateFormat: DateFormat;
}

/** 12h or 24h, and day or month first, as the browser locale writes them. */
function localeFormats(): { timeFormat: TimeFormat; dateFormat: DateFormat } {
  try {
    const lang = navigator.language;
    const hour12 = new Intl.DateTimeFormat(lang, { hour: "numeric" }).resolvedOptions().hour12;
    const order = new Intl.DateTimeFormat(lang, { year: "numeric", month: "numeric", day: "numeric" })
      .formatToParts(new Date(2000, 0, 2))
      .map((p) => p.type)
      .filter((t) => t === "year" || t === "month" || t === "day");
    const dateFormat: DateFormat = order[0] === "year" ? "iso" : order[0] === "day" ? "dmy" : "mdy";
    return { timeFormat: hour12 ? "12h" : "24h", dateFormat };
  } catch {
    return { timeFormat: "12h", dateFormat: "mdy" };
  }
}
const DEFAULTS: Prefs = { theme: DEFAULT_THEME, weekStart: 0, ...localeFormats() };

function loadPrefs(): Prefs {
  let saved: Partial<Prefs> = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORE_KEY) ?? "{}") ?? {};
  } catch {
    // storage blocked or corrupt: use defaults
  }
  const base: Prefs = {
    theme: findTheme(saved.theme)?.id ?? DEFAULT_THEME,
    weekStart: saved.weekStart === 1 ? 1 : 0,
    timeFormat: saved.timeFormat === "12h" || saved.timeFormat === "24h" ? saved.timeFormat : DEFAULTS.timeFormat,
    dateFormat:
      saved.dateFormat === "mdy" || saved.dateFormat === "dmy" || saved.dateFormat === "iso" ? saved.dateFormat : DEFAULTS.dateFormat,
  };
  // URL parameters win over saved preferences (used by screenshot scripts and shared links)
  const urlTheme = findTheme(q.get("theme"));
  if (urlTheme) base.theme = urlTheme.id;
  if (q.get("ws")) base.weekStart = q.get("ws") === "1" ? 1 : 0;
  return base;
}

function savePrefs(p: Prefs) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(p));
  } catch {
    // storage blocked: preferences last for this visit only
  }
}

function Segmented<T extends string | number>(props: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="demo-seg" role="radiogroup" aria-label={props.label}>
      {props.options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={o.value === props.value}
          onClick={() => props.onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** "type-date" drawn as rounded strokes, like the favicon. The stem of the d is the yellow cursor. */
function Wordmark() {
  return (
    <svg
      className="demo-wordmark"
      viewBox="-2 -2 142 33"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="type-date"
    >
      {/* t */}
      <path d="M4.5 2v13q0 4 4.5 4M0 8h9" />
      {/* y */}
      <path d="M16 8l5.5 12M27 8l-6.5 17q-1 2.500-3.500 2.500" />
      {/* p */}
      <path d="M32 8v20" />
      <circle cx="38" cy="14" r="6" />
      {/* e */}
      <path d="M49 14h12A6 6 0 1 0 59.240 18.240" />
      {/* - */}
      <path d="M66 14h6" />
      {/* d */}
      <circle cx="83" cy="14" r="6" />
      <path d="M89 0v20" stroke="#f59e0b" />
      {/* a */}
      <circle cx="100" cy="14" r="6" />
      <path d="M106 8v12" />
      {/* t */}
      <path d="M115.500 2v13q0 4 4.500 4M111 8h9" />
      {/* e */}
      <path d="M126 14h12A6 6 0 1 0 136.240 18.240" />
    </svg>
  );
}

function Settings(props: { prefs: Prefs; set: (p: Partial<Prefs>) => void; reset: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { prefs, set } = props;
  const open = () => ref.current?.showModal();
  const close = () => ref.current?.close();
  return (
    <>
      <Wordmark />
      <a
        className="demo-gear demo-github"
        href="https://github.com/gregorybchris/type-date"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="type-date on GitHub"
      >
        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      </a>
      <button type="button" className="demo-gear" aria-label="Settings" onClick={open}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      </button>
      <dialog
        ref={ref}
        className="demo-modal"
        aria-labelledby="demo-settings-title"
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
      >
        <div className="demo-modal-head">
          <h2 id="demo-settings-title">Settings</h2>
          <button type="button" className="demo-x" aria-label="Close" onClick={close}>
            ×
          </button>
        </div>
        <div className="demo-field">
          <span className="demo-label">Theme</span>
          <div className="demo-themes" role="radiogroup" aria-label="Theme">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={t.id === prefs.theme}
                className="demo-theme"
                style={themeVars(t) as CSSProperties}
                onClick={() => set({ theme: t.id })}
              >
                <span className="demo-theme-swatch">
                  <span className="demo-theme-card">
                    <i />
                    <b />
                  </span>
                </span>
                {t.name}
              </button>
            ))}
          </div>
        </div>
        <div className="demo-field">
          <span className="demo-label">Week starts on</span>
          <Segmented
            label="Week starts on"
            value={prefs.weekStart}
            options={[
              { value: 0, label: "Sunday" },
              { value: 1, label: "Monday" },
            ]}
            onChange={(weekStart) => set({ weekStart })}
          />
        </div>
        <div className="demo-field">
          <span className="demo-label">Time format</span>
          <Segmented
            label="Time format"
            value={prefs.timeFormat}
            options={[
              { value: "12h", label: "3:30 PM" },
              { value: "24h", label: "15:30" },
            ]}
            onChange={(timeFormat) => set({ timeFormat })}
          />
        </div>
        <div className="demo-field">
          <span className="demo-label">Date format</span>
          <Segmented
            label="Date format"
            value={prefs.dateFormat}
            options={[
              { value: "mdy", label: "Oct 2, 2027" },
              { value: "dmy", label: "2 Oct 2027" },
              { value: "iso", label: "2027-10-02" },
            ]}
            onChange={(dateFormat) => set({ dateFormat })}
          />
        </div>
        <div className="demo-modal-foot">
          <span>Saved in this browser.</span>
          <button type="button" className="demo-link" onClick={props.reset}>
            Reset
          </button>
        </div>
      </dialog>
    </>
  );
}

function App() {
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);
  const { weekStart, timeFormat, dateFormat } = prefs;
  const theme = findTheme(prefs.theme) ?? THEMES[0]!;
  const set = (p: Partial<Prefs>) => setPrefs((cur) => ({ ...cur, ...p }));
  useEffect(() => savePrefs(prefs), [prefs]);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [text, setText] = useState(q.get("q") ?? "");

  const parse = useCallback(async (t: string) => {
    const r = await h11.predict(t.trim().toLowerCase().replace(/\s+/g, " "), undefined, { today: TODAY });
    return r.dsl;
  }, []);

  return (
    <main className="demo" data-theme={theme.mode} style={themeVars(theme) as CSSProperties}>
      <Settings prefs={prefs} set={set} reset={() => setPrefs(DEFAULTS)} />
      <div className="demo-layout">
        <div className="demo-stage">
        {/* key remounts the picker when an example is chosen: the picker reads `defaultText` once */}
        <TypeDatePicker
          key={text}
          parse={parse}
          theme={theme.mode}
          weekStart={weekStart}
          timeFormat={timeFormat}
          dateFormat={dateFormat}
          today={TODAY}
          autoFocus={!matchMedia("(max-width: 520px)").matches}
          defaultText={text}
          onChange={() => setConfirmed(null)}
          onClear={() => setConfirmed(null)}
          onConfirm={(r) => setConfirmed(r ? summarize(r) : null)}
        />
        {confirmed ? (
          <div className="demo-confirmed" role="status">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>
              <strong>Confirmed</strong> {confirmed}
            </span>
          </div>
        ) : null}
        </div>
        <section className="demo-try" aria-label="Examples">
          <div className="demo-try-head">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
              <path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z" />
            </svg>
            <h2>Try an example</h2>
          </div>
          <div className="demo-chips">
            {EXAMPLES.map((ex) => (
              <button key={ex} type="button" className="demo-chip" onClick={() => setText(ex)}>
                {ex}
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
