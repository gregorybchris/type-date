import { useEffect, useState } from "react";
import type {
  DatasetsResponse,
  ErrorQuery,
  ErrorsResponse,
  RunsResponse,
  SampleQuery,
  SamplesResponse,
} from "./types";

function qs(q: object): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(q)) if (v !== undefined && v !== "") p.set(k, String(v));
  const s = p.toString();
  return s ? `?${s}` : "";
}

async function get<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return (await res.json()) as T;
}

export const fetchRuns = (signal?: AbortSignal) => get<RunsResponse>("/api/runs", signal);
export const fetchDatasets = (signal?: AbortSignal) => get<DatasetsResponse>("/api/datasets", signal);
export const fetchErrors = (id: string, q: ErrorQuery, signal?: AbortSignal) =>
  get<ErrorsResponse>(`/api/runs/${id}/errors${qs(q)}`, signal);
export const fetchSamples = (version: string, q: SampleQuery, signal?: AbortSignal) =>
  get<SamplesResponse>(`/api/datasets/${version}/samples${qs(q)}`, signal);

export interface Async<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Runs `load` whenever `key` changes. Cancels the previous request. Keeps old data while loading. */
export function useAsync<T>(key: string, load: (signal: AbortSignal) => Promise<T>): Async<T> {
  const [state, setState] = useState<Async<T>>({ data: null, loading: true, error: null });
  useEffect(() => {
    const ctl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    load(ctl.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e: unknown) => {
        if (ctl.signal.aborted) return;
        setState((s) => ({ ...s, loading: false, error: String(e) }));
      });
    return () => ctl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return state;
}
