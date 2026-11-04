import { useCallback, useEffect, useState } from "react";

export interface Route {
  /** First path segment: experiments, pareto, errors, playground, data. */
  view: string;
  /** Second segment, usually an id. */
  id: string;
  params: URLSearchParams;
}

function parse(): Route {
  const h = window.location.hash.replace(/^#\/?/, "");
  const [path = "", query = ""] = h.split("?");
  const [view = "experiments", id = ""] = path.split("/");
  return { view: view || "experiments", id, params: new URLSearchParams(query) };
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
