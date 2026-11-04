import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchDatasets, fetchRuns } from "./api";
import type { DatasetMeta, Run } from "./types";

interface Store {
  runs: Run[];
  datasets: DatasetMeta[];
  sampleRuns: boolean;
  sampleData: boolean;
  loading: boolean;
  error: string | null;
  reload: () => void;
  run: (id: string) => Run | undefined;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState({ runs: [] as Run[], datasets: [] as DatasetMeta[], sampleRuns: false, sampleData: false, loading: true, error: null as string | null });
  const [tick, setTick] = useState(0);
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
  const value = useMemo<Store>(
    () => ({ ...state, reload, run: (id) => state.runs.find((r) => r.config.id === id) }),
    [state, reload],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("StoreProvider missing");
  return s;
}
