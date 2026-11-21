import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import { TypeDatePicker, summarize } from "@type-date/picker";
import type { DateFormat, TimeFormat, TypeDatePickerHandle } from "@type-date/picker";
import "@type-date/picker/styles.css";
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
  "tuesdays at 1:30 and thursdays at 3",
  "every first monday and last friday of the month",
  "tomorrow 3pm est",
  "9am tokyo time friday",
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
  // URL parameters win over saved preferences (shared links and screenshot scripts)
  const urlTheme = findTheme(q.get("theme"));
  if (urlTheme) base.theme = urlTheme.id;
  const ws = q.get("ws");
  if (ws === "0" || ws === "1") base.weekStart = ws === "1" ? 1 : 0;
  const tf = q.get("tf");
  if (tf === "12h" || tf === "24h") base.timeFormat = tf;
  const df = q.get("df");
  if (df === "mdy" || df === "dmy" || df === "iso") base.dateFormat = df;
  return base;
}

/**
 * The page URL for the current text and settings. A value equal to its default is left out,
 * so the default state is the bare URL. `today` is kept only when the page was opened with it.
 */
function shareUrl(text: string, p: Prefs): string {
  const u = new URLSearchParams();
  if (text.trim()) u.set("q", text);
  if (p.theme !== DEFAULTS.theme) u.set("theme", p.theme);
  if (p.weekStart !== DEFAULTS.weekStart) u.set("ws", String(p.weekStart));
  if (p.timeFormat !== DEFAULTS.timeFormat) u.set("tf", p.timeFormat);
  if (p.dateFormat !== DEFAULTS.dateFormat) u.set("df", p.dateFormat);
  if (q.get("today") === TODAY) u.set("today", TODAY);
  const s = u.toString().replace(/%20/g, "+");
  return location.origin + location.pathname + (s ? "?" + s : "") + location.hash;
}

/** Touch devices get the system share sheet; others copy the link. */
const prefersShareSheet = () => typeof navigator.share === "function" && matchMedia("(pointer: coarse)").matches;

function ShareButton(props: { url: () => string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const share = async () => {
    const url = props.url();
    if (prefersShareSheet()) {
      try {
        await navigator.share({ url });
        return;
      } catch (e) {
        if ((e as Error).name === "AbortError") return; // the user closed the sheet
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt("Copy this link", url);
    }
  };
  return (
    <button
      type="button"
      className="demo-gear demo-share"
      aria-label={copied ? "Link copied" : "Share link"}
      title={copied ? "Link copied" : "Share link"}
      data-copied={copied || undefined}
      onClick={share}
    >
      {copied ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v12" />
          <path d="m7.5 7.5 4.5-4.5 4.5 4.5" />
          <path d="M8 11H6.5A1.5 1.5 0 0 0 5 12.5v7A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5H16" />
        </svg>
      )}
    </button>
  );
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

/** "type-date" set in Plus Jakarta Sans (weight 650), converted to outlines so it does not depend on the font loading. */
const WORDMARK_TEXT = "M30.5 0.6Q21.6 0.6 16.7 -4.3Q11.8 -9.2 11.8 -18.2V-43.3H2.4V-54.2H3.6Q7.5 -54.2 9.7 -56.4Q11.8 -58.5 11.8 -62.4V-66.6H24V-54.2H36.4V-43.3H24V-18.8Q24 -16 24.9 -14.1Q25.9 -12.2 27.9 -11.2Q30 -10.2 33.1 -10.2Q33.9 -10.2 34.8 -10.2Q35.8 -10.4 36.7 -10.5V0Q35.4 0.2 33.6 0.4Q31.9 0.6 30.5 0.6Z M53 22Q50.9 22 48.8 21.7Q46.8 21.3 45.1 20.5V10.2Q46.4 10.5 48.2 10.8Q49.9 11.1 51.5 11.1Q56.1 11.1 58.3 9Q60.4 7 62.1 3.2L65.7 -5.2L65.5 5.1L42 -54.2H55.1L72 -9.6H67.5L84.4 -54.2H97.5L73.7 5.7Q71.7 10.7 68.8 14.4Q65.9 18.1 62 20Q58.1 22 53 22Z M104.9 20V-54.2H116.5V-43.2L115.2 -45.9Q118.1 -50.4 123 -52.9Q127.9 -55.4 134.3 -55.4Q142 -55.4 148.2 -51.7Q154.3 -47.9 157.9 -41.5Q161.6 -35.1 161.6 -27.1Q161.6 -19.2 158 -12.7Q154.4 -6.3 148.2 -2.5Q142.1 1.2 134.2 1.2Q128.1 1.2 123.1 -1.3Q118 -3.7 115.2 -8.4L117.1 -10.8V20ZM132.9 -10.1Q137.6 -10.1 141.2 -12.2Q144.8 -14.5 146.8 -18.3Q148.9 -22.2 148.9 -27.1Q148.9 -32.1 146.8 -35.9Q144.8 -39.7 141.2 -41.9Q137.6 -44.2 132.9 -44.2Q128.4 -44.2 124.8 -42Q121.2 -39.8 119.2 -35.9Q117.1 -32 117.1 -27.1Q117.1 -22.2 119.2 -18.3Q121.2 -14.5 124.8 -12.2Q128.4 -10.1 132.9 -10.1Z M197.6 1.2Q189.4 1.2 183.1 -2.6Q176.8 -6.4 173.3 -12.8Q169.8 -19.3 169.8 -27.2Q169.8 -35.4 173.4 -41.8Q176.9 -48.1 183 -51.8Q189.1 -55.4 196.7 -55.4Q202.9 -55.4 207.8 -53.3Q212.6 -51.2 215.9 -47.6Q219.3 -43.9 221.1 -39.2Q222.8 -34.4 222.8 -29.1Q222.8 -27.7 222.7 -26.2Q222.6 -24.8 222.2 -23.6H179.7V-33.1H215.3L209.5 -28.8Q210.5 -33.5 209 -37.2Q207.5 -41 204.3 -43.1Q201.1 -45.3 196.7 -45.3Q192.4 -45.3 189 -43.1Q185.7 -41 183.9 -36.9Q182.1 -32.9 182.5 -27.2Q182.1 -21.9 184 -17.9Q185.9 -13.9 189.5 -11.7Q193.1 -9.6 197.7 -9.6Q202.5 -9.6 205.7 -11.6Q209 -13.7 211 -17L220.9 -12.1Q219.3 -8.3 215.9 -5.3Q212.5 -2.2 207.8 -0.5Q203.2 1.2 197.6 1.2Z M235.5 -21.7V-32.5H276.8V-21.7Z M375.1 1.2Q369.5 1.2 365.3 -0.7Q361.1 -2.6 358.8 -6.1Q356.5 -9.6 356.5 -14.3Q356.5 -18.8 358.5 -22.3Q360.5 -25.8 364.6 -28.2Q368.8 -30.6 375.1 -31.6L393.4 -34.6V-25.2L377.4 -22.4Q373.3 -21.7 371.2 -19.8Q369.2 -17.8 369.2 -14.8Q369.2 -11.9 371.5 -10Q373.7 -8.2 377.2 -8.2Q381.5 -8.2 384.8 -10.1Q388.1 -12 389.9 -15.2Q391.8 -18.4 391.8 -22.3V-36.3Q391.8 -40 388.9 -42.5Q386.1 -44.9 381.4 -44.9Q377 -44.9 373.7 -42.6Q370.4 -40.3 368.9 -36.6L358.8 -41.6Q360.4 -45.7 363.8 -48.8Q367.2 -51.9 371.9 -53.7Q376.5 -55.4 381.8 -55.4Q388.3 -55.4 393.3 -53Q398.4 -50.6 401.2 -46.3Q404 -42 404 -36.3V0H392.4V-9.5L394.9 -9.5Q392.9 -6.1 390 -3.7Q387.1 -1.3 383.3 -0.1Q379.6 1.2 375.1 1.2Z M440.8 0.6Q431.9 0.6 427 -4.3Q422.1 -9.2 422.1 -18.2V-43.3H412.7V-54.2H413.9Q417.8 -54.2 420 -56.4Q422.1 -58.5 422.1 -62.4V-66.6H434.3V-54.2H446.7V-43.3H434.3V-18.8Q434.3 -16 435.2 -14.1Q436.2 -12.2 438.2 -11.2Q440.2 -10.2 443.4 -10.2Q444.2 -10.2 445.1 -10.2Q446.1 -10.4 447 -10.5V0Q445.7 0.2 443.9 0.4Q442.2 0.6 440.8 0.6Z M483.1 1.2Q474.9 1.2 468.6 -2.6Q462.3 -6.4 458.8 -12.8Q455.3 -19.3 455.3 -27.2Q455.3 -35.4 458.9 -41.8Q462.4 -48.1 468.5 -51.8Q474.6 -55.4 482.2 -55.4Q488.4 -55.4 493.3 -53.3Q498.1 -51.2 501.4 -47.6Q504.8 -43.9 506.6 -39.2Q508.3 -34.4 508.3 -29.1Q508.3 -27.7 508.2 -26.2Q508.1 -24.8 507.7 -23.6H465.2V-33.1H500.8L495 -28.8Q496 -33.5 494.5 -37.2Q493 -41 489.8 -43.1Q486.6 -45.3 482.2 -45.3Q477.9 -45.3 474.5 -43.1Q471.2 -41 469.4 -36.9Q467.6 -32.9 468 -27.2Q467.6 -21.9 469.5 -17.9Q471.4 -13.9 475 -11.7Q478.6 -9.6 483.2 -9.6Q488 -9.6 491.2 -11.6Q494.5 -13.7 496.5 -17L506.4 -12.1Q504.8 -8.3 501.4 -5.3Q498 -2.2 493.3 -0.5Q488.7 1.2 483.1 1.2Z";
const WORDMARK_D = "M316.8 1.2Q308.9 1.2 302.8 -2.5Q296.6 -6.3 293 -12.7Q289.4 -19.2 289.4 -27.1Q289.4 -35.1 293 -41.5Q296.6 -47.9 302.8 -51.7Q309 -55.4 316.7 -55.4Q323 -55.4 328 -52.9Q332.9 -50.4 335.8 -45.9L333.9 -43.2V-75.7H346.1V0H334.5V-10.8L335.8 -8.4Q333 -3.7 327.9 -1.3Q322.9 1.2 316.8 1.2ZM318 -10.1Q322.6 -10.1 326.2 -12.2Q329.8 -14.5 331.8 -18.3Q333.9 -22.2 333.9 -27.1Q333.9 -32 331.8 -35.9Q329.8 -39.8 326.2 -42Q322.6 -44.2 318 -44.2Q313.5 -44.2 309.8 -41.9Q306.2 -39.7 304.2 -35.9Q302.1 -32.1 302.1 -27.1Q302.1 -22.2 304.2 -18.3Q306.2 -14.5 309.8 -12.2Q313.4 -10.1 318 -10.1Z";
function Wordmark() {
  return (
    <div className="demo-brand">
      <svg className="demo-wordmark" viewBox="1 -77 509 101" role="img" aria-label="type-date">
        <path fill="currentColor" d={WORDMARK_TEXT} />
        <path fill="currentColor" d={WORDMARK_D} />
      </svg>
    </div>
  );
}

function Settings(props: { prefs: Prefs; set: (p: Partial<Prefs>) => void; reset: () => void; url: () => string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { prefs, set } = props;
  const open = () => ref.current?.showModal();
  const close = () => ref.current?.close();
  return (
    <>
      <Wordmark />
      <ShareButton url={props.url} />
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
  const picker = useRef<TypeDatePickerHandle>(null);
  const small = () => matchMedia("(max-width: 520px)").matches;
  const [text, setText] = useState(q.get("q") ?? "");
  const url = () => shareUrl(text, prefs);
  // Keep the address bar in step with the screen, so the bar can be copied too.
  useEffect(() => {
    const t = setTimeout(() => {
      const next = shareUrl(text, prefs);
      if (next === location.href) return;
      try {
        history.replaceState(history.state, "", next);
      } catch {
        // Safari rate-limits replaceState; the share button still builds the link
      }
    }, 300);
    return () => clearTimeout(t);
  }, [text, prefs]);

  return (
    <main className="demo" data-theme={theme.mode} style={themeVars(theme) as CSSProperties}>
      <Settings prefs={prefs} set={set} reset={() => setPrefs(DEFAULTS)} url={url} />
      <div className="demo-layout">
        <div
          className="demo-stage"
          onInput={(e) => {
            const el = e.target as HTMLElement;
            if (el instanceof HTMLInputElement && el.closest(".td-search")) setText(el.value);
          }}
        >
        <TypeDatePicker
          ref={picker}
          theme={theme.mode}
          weekStart={weekStart}
          timeFormat={timeFormat}
          dateFormat={dateFormat}
          today={TODAY}
          autoFocus={!small()}
          defaultText={text}
          onChange={() => setConfirmed(null)}
          onClear={() => {
            setConfirmed(null);
            setText("");
          }}
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
          <h2 className="demo-try-title">Or try one of these</h2>
          <div className="demo-chips">
            {EXAMPLES.map((ex) => (
              <button key={ex} type="button" className="demo-chip" onClick={() => {
                  picker.current?.setText(ex);
                  setText(ex);
                  if (!small()) picker.current?.focus();
                }}>
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
