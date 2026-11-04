import { Bug, ChartScatter, Database, FlaskConical, Moon, Play, Search, Sun, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Tip } from "@/components/ui/tooltip";
import { VersionSelect } from "@/components/VersionSelect";
import { href } from "@/lib/router";
import { useStore } from "@/lib/store";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export const NAV = [
  { view: "experiments", label: "Experiments", icon: FlaskConical },
  { view: "pareto", label: "Pareto front", icon: ChartScatter },
  { view: "errors", label: "Error analysis", icon: Bug },
  { view: "playground", label: "Playground", icon: Play },
  { view: "outer-loop", label: "Outer loop", icon: Timer },
  { view: "data", label: "Data", icon: Database },
] as const;

function Logo() {
  return (
    <div className="flex items-center gap-2 px-2">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
        <rect x="1" y="3" width="20" height="18" rx="5" fill="var(--primary)" />
        <rect x="1" y="3" width="20" height="6" rx="3" fill="var(--accent)" />
        <path d="M6 14h3M11 14h5" stroke="var(--primary-fg)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="hidden text-[15px] font-semibold tracking-tight lg:inline">type-date</span>
    </div>
  );
}

export function BottomNav({ view }: { view: string }) {
  return (
    <nav
      aria-label="Views"
      className="dotted-t flex shrink-0 items-stretch justify-around bg-sidebar px-1 pt-1 md:hidden"
      style={{ paddingBottom: "max(4px, env(safe-area-inset-bottom))" }}
    >
      {NAV.map((n) => {
        const on = view === n.view;
        const Icon = n.icon;
        return (
          <a
            key={n.view}
            href={href(n.view)}
            aria-current={on ? "page" : undefined}
            className={cn("flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-field text-[10.5px] font-medium", on ? "bg-hover text-fg" : "text-muted")}
          >
            <Icon className="size-5" strokeWidth={1.75} />
            <span className="truncate">{n.label.split(" ")[0]}</span>
          </a>
        );
      })}
    </nav>
  );
}

export function Sidebar({ view }: { view: string }) {
  const { runs } = useStore();
  return (
    <aside className="hidden w-[60px] shrink-0 flex-col px-2.5 pb-3 pt-3 md:flex lg:w-[228px] lg:px-3">
      <div className="mb-4 flex items-center gap-1.5 px-2 pt-0.5" aria-hidden>
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </div>
      <Logo />
      <nav className="mt-5 flex flex-col gap-0.5">
        {NAV.map((n) => {
          const on = view === n.view;
          const Icon = n.icon;
          return (
            <a
              key={n.view}
              href={href(n.view)}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex h-9 items-center gap-2.5 rounded-field px-2.5 text-[14px] font-medium transition-colors",
                on ? "bg-hover text-fg" : "text-muted hover:bg-hover/60 hover:text-fg",
              )}
            >
              <Icon className={cn("size-[18px] shrink-0", on ? "text-fg" : "text-subtle")} strokeWidth={1.75} />
              <span className="hidden lg:inline">{n.label}</span>
            </a>
          );
        })}
      </nav>
      <div className="mt-auto hidden px-1 lg:block">
        <div className="dotted-t mb-3" />
        <div className="px-1.5 text-[12px] text-subtle">
          {runs.length} experiments, latest exp-{String(Math.max(0, ...runs.map((r) => r.config.number))).padStart(3, "0")}
        </div>
      </div>
    </aside>
  );
}

export function TopBar({ onPalette, crumbs, view }: { onPalette: () => void; crumbs: React.ReactNode; view: string }) {
  const { theme, toggle } = useTheme();
  const { sampleRuns, sampleData } = useStore();
  const isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.platform);
  return (
    <div className="dotted-b sticky top-0 z-20 flex h-12 shrink-0 items-center justify-between gap-2 bg-surface/90 px-3 backdrop-blur md:px-5" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="min-w-0 truncate text-[13px] text-muted">{crumbs}</div>
      <div className="flex items-center gap-2">
        {["experiments", "pareto", "errors"].includes(view) && <VersionSelect />}
        {(view === "data" ? sampleData : sampleRuns) && (
          <Tip label={view === "data" ? "No datasets in data/ yet. Showing generated fixtures from apps/dashboard/fixtures." : "No experiments in runs/ yet. Showing generated fixtures from apps/dashboard/fixtures."}>
            <Badge tone="warn" className="cursor-default">Sample<span className="hidden sm:inline">&nbsp;data</span></Badge>
          </Tip>
        )}
        <Button variant="secondary" onClick={onPalette} className="gap-2 px-2 text-muted sm:px-3" aria-label="Open quick switcher">
          <Search />
          <span className="hidden sm:inline">Search</span>
          <span className="hidden gap-1 sm:flex"><Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd><Kbd>K</Kbd></span>
        </Button>
        <Tip label={theme === "dark" ? "Light theme" : "Dark theme"}>
          <Button variant="secondary" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </Tip>
      </div>
    </div>
  );
}
