import { createRoot } from "react-dom/client";
import { useState } from "react";
import { TypeDatePicker } from "../src";
import "../src/styles.css";
import "./demo.css";

/** Hard-coded phrases. A real app passes a model-backed parse. */
const PHRASES: Record<string, string> = {
  "sep 21": "d 09-21",
  "sep 21 10am to 12pm": "dt 09-21 10:00>12:00",
  "oct 2 to oct 5": "d 10-02>10-05",
  "jan 10 to jan 16 2027": "d 2027-01-10>2027-01-16",
  "tomorrow at 3pm": "dt +1d 15:00",
  "4 to 4:30": "t 4?>4:30?",
  noon: "t 12:00",
  "every other sunday": "d R w/2 su",
  "every weekday at 9": "dt R d/1 mo,tu,we,th,fr 9?",
  "monthly on the 15th": "d R m/1 d15",
  "next week": "d W+1",
  october: "d M@10",
  "next monday 9am to 5pm": "dt mo+1 09:00>17:00",
  "from 2pm tomorrow to 4pm friday": "dt +1d 14:00>fr 16:00",
};

const keys = Object.keys(PHRASES);
const parse = (text: string) =>
  new Promise<string>((resolve) => {
    const t = text.trim().toLowerCase();
    const hit = PHRASES[t] ?? PHRASES[keys.find((k) => k.startsWith(t)) ?? ""];
    setTimeout(() => resolve(hit ?? "x"), 40 + Math.random() * 120);
  });

const q = new URLSearchParams(location.search);

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(q.get("theme") === "dark" ? "dark" : "light");
  const [weekStart, setWeekStart] = useState<0 | 1>(q.get("ws") === "0" ? 0 : 1);
  return (
    <main className="demo" data-theme={theme}>
      <div className="demo-bar">
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Theme: {theme}</button>
        <button onClick={() => setWeekStart(weekStart ? 0 : 1)}>Week starts: {weekStart ? "Mon" : "Sun"}</button>
        <span>Today is fixed at 2026-09-14.</span>
      </div>
      <TypeDatePicker
        parse={parse}
        theme={theme}
        weekStart={weekStart}
        today="2026-09-14"
        defaultText={q.get("q") ?? ""}
        onConfirm={(r) => console.log("confirm", r)}
      />
      <p className="demo-try">Try: {keys.join(" · ")}</p>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
