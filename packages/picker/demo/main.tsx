import h11 from "@type-date/baselines/h11";
import { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { TypeDatePicker, summarize } from "../src";
import "../src/styles.css";
import "./demo.css";

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
  theme: "light" | "dark";
  weekStart: 0 | 1;
}
const DEFAULTS: Prefs = { theme: "light", weekStart: 0 };

function loadPrefs(): Prefs {
  let saved: Partial<Prefs> = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORE_KEY) ?? "{}") ?? {};
  } catch {
    // storage blocked or corrupt: use defaults
  }
  const base: Prefs = {
    theme: saved.theme === "dark" ? "dark" : "light",
    weekStart: saved.weekStart === 1 ? 1 : 0,
  };
  // URL parameters win over saved preferences (used by screenshot scripts and shared links)
  if (q.get("theme")) base.theme = q.get("theme") === "dark" ? "dark" : "light";
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
              { value: 0, label: "Sunday" },
              { value: 1, label: "Monday" },
            ]}
            onChange={(weekStart) => set({ weekStart })}
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
  const { theme, weekStart } = prefs;
  const set = (p: Partial<Prefs>) => setPrefs((cur) => ({ ...cur, ...p }));
  useEffect(() => savePrefs(prefs), [prefs]);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [text, setText] = useState(q.get("q") ?? "");

  const parse = useCallback(async (t: string) => {
    const r = await h11.predict(t.trim().toLowerCase().replace(/\s+/g, " "), undefined, { today: TODAY });
    return r.dsl;
  }, []);

  return (
    <main className="demo" data-theme={theme}>
      <Settings prefs={prefs} set={set} reset={() => setPrefs(DEFAULTS)} />
      <div className="demo-layout">
        <div className="demo-stage">
        {/* key remounts the picker when an example is chosen: the picker reads `defaultText` once */}
        <TypeDatePicker
          key={text}
          parse={parse}
          theme={theme}
          weekStart={weekStart}
          today={TODAY}
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
