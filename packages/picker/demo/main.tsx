import { baselines } from "@type-date/baselines";
import { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { TypeDatePicker } from "../src";
import "../src/styles.css";
import "./demo.css";

function localToday(): string {
  const n = new Date();
  const p = (x: number) => String(x).padStart(2, "0");
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`;
}

/** Engines shown in the demo. The default is the best solution so far (see `specs/research/experiments`). */
const ENGINES = [
  {
    id: "heuristic-full-5",
    label: "Heuristic (full v5)",
    note: "exp-015 · 15.9 kB · 95.0% resolved on eval e4, 95.1% realistic, 90.2% hard external input",
  },
  {
    id: "heuristic-full-4",
    label: "Heuristic (full v4)",
    note: "exp-014 · 14.6 kB · 95.1% resolved on eval e3, 94.5% realistic, 89.9% hard external input",
  },
  {
    id: "heuristic-full-3",
    label: "Heuristic (full v3)",
    note: "exp-013 · 10.3 kB · 95.5% resolved on eval e2, 93.3% on realistic external input",
  },
  {
    id: "heuristic-full-2",
    label: "Heuristic (full v2)",
    note: "exp-009 · 8.8 kB · 94.9% resolved on eval e2, 70.7% on realistic external input",
  },
  { id: "heuristic-full", label: "Heuristic (full)", note: "exp-003 · 7.9 kB · 92.7% resolved on eval e2, 67.4% on realistic external input" },
  { id: "heuristic-small", label: "Heuristic (small)", note: "exp-002 · 3.5 kB · 61.6% resolved on e2" },
  { id: "chrono", label: "chrono-node", note: "exp-001 · 14.9 kB · 36.3% resolved on e2, no recurrence" },
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
];

const q = new URLSearchParams(location.search);
/** The real current date. `?today=YYYY-MM-DD` overrides it (used by the screenshot scripts). */
const TODAY = /^\d{4}-\d{2}-\d{2}$/.test(q.get("today") ?? "") ? (q.get("today") as string) : localToday();

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(q.get("theme") === "dark" ? "dark" : "light");
  const [weekStart, setWeekStart] = useState<0 | 1>(q.get("ws") === "0" ? 0 : 1);
  const [engineId, setEngineId] = useState<string>(q.get("engine") ?? "heuristic-full-5");
  const [last, setLast] = useState<{ dsl: string; ms: number } | null>(null);
  const [text, setText] = useState(q.get("q") ?? "");
  const engine = ENGINES.find((e) => e.id === engineId) ?? ENGINES[0];

  const parse = useCallback(
    async (t: string) => {
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
      <div className="demo-bar">
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Theme: {theme}</button>
        <button onClick={() => setWeekStart(weekStart ? 0 : 1)}>Week starts: {weekStart ? "Mon" : "Sun"}</button>
        <span>Today is {TODAY}.</span>
      </div>
      <div className="demo-bar" role="radiogroup" aria-label="Engine">
        {ENGINES.map((e) => (
          <button
            key={e.id}
            role="radio"
            aria-checked={e.id === engineId}
            data-active={e.id === engineId}
            onClick={() => setEngineId(e.id)}
          >
            {e.label}
          </button>
        ))}
      </div>
      <p className="demo-note">
        {engine.note}
        {last ? (
          <>
            {" "}
            · parsed to <code>{last.dsl}</code> in {last.ms.toFixed(2)} ms
          </>
        ) : null}
      </p>
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
      <p className="demo-try">
        Try:{" "}
        {EXAMPLES.map((ex) => (
          <button key={ex} className="demo-chip" onClick={() => setText(ex)}>
            {ex}
          </button>
        ))}
      </p>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
