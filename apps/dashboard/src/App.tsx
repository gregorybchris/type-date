import * as RT from "@radix-ui/react-tooltip";
import { AnimatePresence, LazyMotion, MotionConfig, m } from "motion/react";
import { Bug, ChartScatter, Database, FlaskConical, Moon, Play, Sun } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Toaster } from "sonner";
import { CommandPalette, type Command } from "./components/CommandPalette";
import { BottomNav, Sidebar, TopBar } from "./components/Shell";
import { Empty } from "./components/ui/misc";
import { href, navigate, useRoute } from "./lib/router";
import { StoreProvider, useStore } from "./lib/store";
import { ThemeProvider, useTheme } from "./lib/theme";
import { DataView } from "./views/DataView";
import { ErrorsView } from "./views/ErrorsView";
import { ExperimentDetail } from "./views/ExperimentDetail";
import { ExperimentsView } from "./views/ExperimentsView";
import { ParetoView } from "./views/ParetoView";
import { PlaygroundView } from "./views/PlaygroundView";

const loadFeatures = () => import("./features").then((r) => r.default);

function Crumbs({ view, id }: { view: string; id: string }) {
  const names: Record<string, string> = { experiments: "Experiments", pareto: "Pareto front", errors: "Error analysis", playground: "Playground", data: "Data" };
  return (
    <span>
      <a className="hover:text-fg" href={href(view)}>{names[view] ?? view}</a>
      {id && <span className="text-fg"> / {id}</span>}
    </span>
  );
}

function Routes() {
  const route = useRoute();
  const { loading, error, runs } = useStore();
  const { toggle, theme } = useTheme();
  const [palette, setPalette] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [route.view, route.id]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = [
      { id: "n-exp", label: "Experiments", group: "Views", icon: <FlaskConical />, run: () => navigate(href("experiments")) },
      { id: "n-par", label: "Pareto front", group: "Views", icon: <ChartScatter />, run: () => navigate(href("pareto")) },
      { id: "n-err", label: "Error analysis", group: "Views", icon: <Bug />, run: () => navigate(href("errors")) },
      { id: "n-play", label: "Playground", group: "Views", icon: <Play />, run: () => navigate(href("playground")) },
      { id: "n-data", label: "Data", group: "Views", icon: <Database />, run: () => navigate(href("data")) },
      { id: "a-theme", label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme", group: "Actions", icon: theme === "dark" ? <Sun /> : <Moon />, run: toggle },
    ];
    const exps: Command[] = [...runs].reverse().map((r) => ({
      id: r.config.id,
      label: r.config.id,
      hint: r.config.title,
      group: "Experiments",
      icon: <FlaskConical />,
      run: () => navigate(href("experiments", r.config.id)),
    }));
    return [...nav, ...exps];
  }, [runs, theme, toggle]);

  let page: React.ReactNode;
  if (loading && runs.length === 0) page = <Empty>Loading</Empty>;
  else if (error) page = <Empty>Could not load data: {error}</Empty>;
  else
    switch (route.view) {
      case "pareto":
        page = <ParetoView />;
        break;
      case "errors":
        page = <ErrorsView id={route.id} params={route.params} />;
        break;
      case "playground":
        page = <PlaygroundView params={route.params} />;
        break;
      case "data":
        page = <DataView params={route.params} />;
        break;
      default:
        page = route.id ? <ExperimentDetail id={route.id} params={route.params} /> : <ExperimentsView />;
    }

  return (
    <>
      <div className="fixed inset-x-0 top-0 flex h-dvh flex-col overflow-hidden bg-window md:inset-5 md:h-auto md:flex-row md:rounded-[24px] md:border md:border-white/60 md:shadow-[var(--shadow-window)] md:dark:border-white/10 xl:inset-8">
        <Sidebar view={route.view} />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface md:my-2 md:mr-2 md:rounded-[16px] md:border md:border-border">
          <TopBar view={route.view} onPalette={() => setPalette(true)} crumbs={<Crumbs view={route.view} id={route.id} />} />
          <div ref={scroller} className="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={`${route.view}/${route.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto w-full max-w-[1280px] px-4 py-5 md:px-6 md:py-6"
              >
                {page}
              </m.div>
            </AnimatePresence>
          </div>
        </main>
        <BottomNav view={route.view} />
      </div>
      <CommandPalette open={palette} onOpenChange={setPalette} commands={commands} />
      <Toaster position="bottom-right" theme={theme} mobileOffset={{ bottom: "calc(76px + env(safe-area-inset-bottom))", left: 12, right: 12 }} toastOptions={{ style: { fontFamily: "var(--font-sans)", fontSize: 13, borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--fg)" } }} />
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={loadFeatures} strict>
          <RT.Provider>
            <StoreProvider>
              <Routes />
            </StoreProvider>
          </RT.Provider>
        </LazyMotion>
      </MotionConfig>
    </ThemeProvider>
  );
}
