import { baselines } from "@type-date/baselines";
import { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { TypeDatePicker } from "../src";
import "../src/styles.css";
import "./demo.css";

function localToday(): string {
  const n = new Date();
  const p = (x: number) => String(x).padStart(2, "0");
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`;
}

/** Engines shown in the demo. The default is the best solution so far (see `specs/engines`). */
const ENGINES = [
  {
    id: "h8",
    label: "h8",
    note: "21.9 kB + 10.7 kB lazy · typos, abbreviations, score and dozen counts, day of a relative month",
  },
  {
    id: "h7",
    label: "h7",
    note: "19.0 kB + 10.6 kB lazy · 93.1% exact on eval e7, 88.5% on sealed web phrases",
  },
  {
    id: "h6",
    label: "h6",
    note: "24.0 kB · 92.9% exact on eval e7, 83.3% on sealed web phrases",
  },
  {
    id: "h5",
    label: "h5",
    note: "15.9 kB · 95.0% resolved on eval e4, 95.1% realistic, 90.2% hard external input",
  },
  {
    id: "h4",
    label: "h4",
    note: "14.6 kB · 95.1% resolved on eval e3, 94.5% realistic, 89.9% hard external input",
  },
  {
    id: "h3",
    label: "h3",
    note: "10.3 kB · 95.5% resolved on eval e2, 93.3% on realistic external input",
  },
  {
    id: "h2",
    label: "h2",
    note: "8.8 kB · 94.9% resolved on eval e2, 70.7% on realistic external input",
  },
  { id: "h1", label: "h1", note: "7.9 kB · 92.7% resolved on eval e2, 67.4% on realistic external input" },
  { id: "chrono", label: "chrono", note: "chrono-node 2.10.3 · 14.9 kB · 36.3% resolved on e2, no recurrence" },
] as const;

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
];

/** DSL v2 lines for a few phrases. The heuristic engines do not produce v2 yet. Enabled with `?parse=v2demo`. */
const V2_DEMO: Record<string, string> = {
  "after 2pm": "t 14:00>",
  "before noon": "t >12:00",
  "after oct 5": "d 10-05>",
  "until friday": "d >fr",
  "by 9pm tonight": "dt >+0d 21:00",
  "the 15th": "d D@15",
  "the 31st": "d D@31",
  "3pm for 2 hours": "t 15:00>+2h",
  "tomorrow 9am for 90 min": "dt +1d 09:00>+90m",
  "11pm for 2 hours": "t 23:00>+2h",
  "oct 2, oct 9 and oct 16": "d 10-02,10-09,10-16",
  "nov 5 and 12 at 3pm": "dt 11-05,11-12 15:00",
  "tuesdays in march": "d R w/1 tu uM@03 sM@03",
  "mon tue wed over the past 6 weeks": "d R w/1 mo,tu,we u+0d s-6w",
  "first and third tuesday of every month": "d R m/1 tu#1,tu#3",
  "weekdays every august": "d R d/1 mo,tu,we,th,fr M@08",
  "standup every day 9:30 for 15 min": "dt R d/1 09:30>+15m",
  "this quarter": "d Q+0",
  "3 days before dec 15": "d 12-15~-3d",
  "3 business days from now": "d +3b",
};
const V2_CHIPS = Object.keys(V2_DEMO);

const q = new URLSearchParams(location.search);
const V2 = q.get("parse") === "v2demo";
/** The real current date. `?today=YYYY-MM-DD` overrides it (used by the screenshot scripts). */
const TODAY = /^\d{4}-\d{2}-\d{2}$/.test(q.get("today") ?? "") ? (q.get("today") as string) : localToday();

const STORE_KEY = "type-date-demo:v1";
interface Prefs {
  theme: "light" | "dark";
  weekStart: 0 | 1;
  engineId: string;
  details: boolean;
}
const DEFAULTS: Prefs = { theme: "light", weekStart: 1, engineId: "h8", details: false };

function loadPrefs(): Prefs {
  let saved: Partial<Prefs> = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORE_KEY) ?? "{}") ?? {};
  } catch {
    // storage blocked or corrupt: use defaults
  }
  // Old saved names were `heuristic-full-N`. Map them to `hN` and keep the other preferences.
  const legacy = /^heuristic-full-(\d)$/.exec(String(saved.engineId));
  if (legacy) saved.engineId = `h${legacy[1]}`;
  const engineOk = ENGINES.some((e) => e.id === saved.engineId);
  const base: Prefs = {
    theme: saved.theme === "dark" ? "dark" : "light",
    weekStart: saved.weekStart === 0 ? 0 : 1,
    engineId: engineOk ? (saved.engineId as string) : DEFAULTS.engineId,
    details: saved.details === true,
  };
  // URL parameters win over saved preferences (used by screenshot scripts and shared links)
  if (q.get("theme")) base.theme = q.get("theme") === "dark" ? "dark" : "light";
  if (q.get("ws")) base.weekStart = q.get("ws") === "0" ? 0 : 1;
  if (q.get("engine") && ENGINES.some((e) => e.id === q.get("engine"))) base.engineId = q.get("engine") as string;
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

function Settings(props: { prefs: Prefs; set: (p: Partial<Prefs>) => void; reset: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { prefs, set } = props;
  const open = () => ref.current?.showModal();
  const close = () => ref.current?.close();
  return (
    <>
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
          <Segmented
            label="Theme"
            value={prefs.theme}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
            onChange={(theme) => set({ theme })}
          />
        </div>
        <div className="demo-field">
          <span className="demo-label">Week starts on</span>
          <Segmented
            label="Week starts on"
            value={prefs.weekStart}
            options={[
              { value: 1, label: "Monday" },
              { value: 0, label: "Sunday" },
            ]}
            onChange={(weekStart) => set({ weekStart })}
          />
        </div>
        <div className="demo-field">
          <span className="demo-label">Parser</span>
          <div className="demo-engines" role="radiogroup" aria-label="Parser">
            {ENGINES.map((e) => (
              <button
                key={e.id}
                type="button"
                role="radio"
                aria-checked={e.id === prefs.engineId}
                className="demo-engine"
                onClick={() => set({ engineId: e.id })}
              >
                <span className="demo-engine-name">{e.label}</span>
                <span className="demo-engine-note">{e.note}</span>
              </button>
            ))}
          </div>
        </div>
        <label className="demo-check">
          <input type="checkbox" checked={prefs.details} onChange={(e) => set({ details: e.target.checked })} />
          <span>Show parse details under the picker</span>
        </label>
        <div className="demo-modal-foot">
          <span>Today is {TODAY}. Saved in this browser.</span>
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
  const { theme, weekStart, engineId, details } = prefs;
  const set = (p: Partial<Prefs>) => setPrefs((cur) => ({ ...cur, ...p }));
  useEffect(() => savePrefs(prefs), [prefs]);
  const [last, setLast] = useState<{ dsl: string; ms: number } | null>(null);
  const [text, setText] = useState(q.get("q") ?? "");
  const engine = ENGINES.find((e) => e.id === engineId) ?? ENGINES[0];

  const parse = useCallback(
    async (t: string) => {
      const hit = V2 ? V2_DEMO[t.trim().toLowerCase().replace(/\s+/g, " ")] : undefined;
      if (hit) {
        setLast({ dsl: hit, ms: 0 });
        return hit;
      }
      const e = baselines[engineId];
      if (!e) return "x";
      const r = await e.predict(t.trim().toLowerCase().replace(/\s+/g, " "), undefined, { today: TODAY });
      setLast({ dsl: r.dsl, ms: r.ms });
      return r.dsl;
    },
    [engineId],
  );

  return (
    <main className="demo" data-theme={theme}>
      <Settings prefs={prefs} set={set} reset={() => setPrefs(DEFAULTS)} />
      {/* key remounts the picker when the engine or example changes: the picker reads `defaultText` once */}
      <TypeDatePicker
        key={`${engineId}:${text}`}
        parse={parse}
        theme={theme}
        weekStart={weekStart}
        today={TODAY}
        defaultText={text}
        onConfirm={(r) => console.log("confirm", r)}
      />
      {details ? (
        <p className="demo-note">
          {engine.note}
          {last ? (
            <>
              {" "}
              · parsed to <code>{last.dsl}</code> in {last.ms.toFixed(2)} ms
            </>
          ) : null}
        </p>
      ) : null}
      <p className="demo-try">
        Try:{" "}
        {(V2 ? [...V2_CHIPS, ...EXAMPLES.slice(0, 4)] : EXAMPLES).map((ex) => (
          <button key={ex} className="demo-chip" onClick={() => setText(ex)}>
            {ex}
          </button>
        ))}
      </p>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
