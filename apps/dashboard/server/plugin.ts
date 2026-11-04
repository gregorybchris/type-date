import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { evalSummary, loadEvalManifests, loadRuns, queryErrors, querySamples, type Roots } from "./data";

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(body));
}

function num(v: string | null): number | undefined {
  if (v === null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function str(v: string | null): string | undefined {
  return v ? v : undefined;
}

/** Dev-server API: runs, eval sets, failures. */
export function typeDateApi(roots: Roots): Plugin {
  return {
    name: "type-date-api",
    configureServer(server) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next) => {
        const url = new URL(req.url ?? "/", "http://localhost");
        const p = url.pathname;
        const sp = url.searchParams;
        try {
          if (p === "/api/runs") return send(res, 200, loadRuns(roots));
          if (p === "/api/evals") return send(res, 200, loadEvalManifests(roots));
          let m = p.match(/^\/api\/runs\/([^/]+)\/errors$/);
          if (m) {
            const out = queryErrors(roots, m[1]!, sp.get("version") ?? "", {
              offset: num(sp.get("offset")),
              limit: num(sp.get("limit")),
              tag: str(sp.get("tag")),
              modifier: str(sp.get("modifier")),
              split: str(sp.get("split")),
              q: str(sp.get("q")),
            });
            return out ? send(res, 200, out) : send(res, 404, { error: "run not found" });
          }
          m = p.match(/^\/api\/evals\/([^/]+)\/summary$/);
          if (m) {
            const out = evalSummary(roots, m[1]!);
            return out ? send(res, 200, out) : send(res, 404, { error: "eval not found" });
          }
          m = p.match(/^\/api\/evals\/([^/]+)\/samples$/);
          if (m) {
            const out = querySamples(roots, m[1]!, {
              offset: num(sp.get("offset")),
              limit: num(sp.get("limit")),
              tag: str(sp.get("tag")),
              modifier: str(sp.get("modifier")),
              split: str(sp.get("split")),
              source: str(sp.get("source")),
              q: str(sp.get("q")),
            });
            return out ? send(res, 200, out) : send(res, 404, { error: "eval not found" });
          }
        } catch (err) {
          return send(res, 500, { error: String(err) });
        }
        next();
      });
    },
  };
}
