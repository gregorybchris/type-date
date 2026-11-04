import { LEGACY_ENGINE } from "./engines";
import { useCallback, useEffect, useState } from "react";

export interface Route {
  /** First path segment: engines, pareto, errors, playground, data. */
  view: string;
  /** Second segment, usually an id. */
  id: string;
  params: URLSearchParams;
}

function parse(): Route {
  const h = window.location.hash.replace(/^#\/?/, "");
  const [path = "", query = ""] = h.split("?");
  const [view = "engines", id = ""] = path.split("/");
  const params = new URLSearchParams(query);
  // Old links: #/experiments, #/experiments/exp-018, #/errors/exp-018, #/playground?exp=exp-018.
  const legacy = view === "experiments";
  const exp = params.get("exp");
  if (exp) {
    params.delete("exp");
    params.set("engine", LEGACY_ENGINE[exp] ?? exp);
  }
  return { view: legacy ? "engines" : view || "engines", id: LEGACY_ENGINE[id] ?? id, params };
}

export function href(view: string, id?: string, params?: Record<string, string | undefined>): string {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params ?? {})) if (v) q.set(k, v);
  const qs = q.toString();
  return `#/${view}${id ? `/${id}` : ""}${qs ? `?${qs}` : ""}`;
}

export function navigate(to: string) {
  window.location.hash = to.replace(/^#/, "");
}

export function useRoute(): Route {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => setRoute(parse());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

/** Update query params in place without adding history entries. */
export function useSetParams() {
  return useCallback((patch: Record<string, string | undefined>) => {
    const r = parse();
    for (const [k, v] of Object.entries(patch)) {
      if (v) r.params.set(k, v);
      else r.params.delete(k);
    }
    const qs = r.params.toString();
    const base = `#/${r.view}${r.id ? `/${r.id}` : ""}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(null, "", base);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);
}
