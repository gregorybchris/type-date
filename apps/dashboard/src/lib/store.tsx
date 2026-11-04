import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchDatasets, fetchRuns } from "./api";
import { defaultVersion } from "./evals";
import type { DatasetMeta, Run } from "./types";

interface Store {
  runs: Run[];
  datasets: DatasetMeta[];
  sampleRuns: boolean;
  sampleData: boolean;
  loading: boolean;
  error: string | null;
  reload: () => void;
  /** Selected eval version. Metrics in every view come from it. */
  version: string;
  setVersion: (v: string) => void;
  run: (id: string) => Run | undefined;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState({ runs: [] as Run[], datasets: [] as DatasetMeta[], sampleRuns: false, sampleData: false, loading: true, error: null as string | null });
  const [tick, setTick] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  useEffect(() => {
    const ctl = new AbortController();
    Promise.all([fetchRuns(ctl.signal), fetchDatasets(ctl.signal)])
      .then(([r, d]) =>
        setState({ runs: r.runs, datasets: d.datasets, sampleRuns: r.sample, sampleData: d.sample, loading: false, error: null }),
      )
      .catch((e: unknown) => {
        if (!ctl.signal.aborted) setState((s) => ({ ...s, loading: false, error: String(e) }));
      });
    return () => ctl.abort();
  }, [tick]);
  const reload = useCallback(() => setTick((t) => t + 1), []);
  const version = picked ?? defaultVersion(state.runs);
  const value = useMemo<Store>(
    () => ({ ...state, reload, version, setVersion: setPicked, run: (id) => state.runs.find((r) => r.config.id === id) }),
    [state, reload, version],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("StoreProvider missing");
  return s;
}
