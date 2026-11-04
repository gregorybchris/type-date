import fs from "node:fs";
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { loadDatasets, loadRuns, queryErrors, querySamples, type Roots } from "./data";

const MIME: Record<string, string> = {
  ".json": "application/json",
  ".onnx": "application/octet-stream",
  ".wasm": "application/wasm",
  ".bin": "application/octet-stream",
  ".gguf": "application/octet-stream",
  ".txt": "text/plain",
  ".js": "text/javascript",
};

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

/** Dev-server API: /api/runs, /api/datasets, and static /artifacts/. */
export function typeDateApi(roots: Roots): Plugin {
  const artifacts = path.join(roots.repo, "artifacts");
  return {
    name: "type-date-api",
    configureServer(server) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next) => {
        const url = new URL(req.url ?? "/", "http://localhost");
        const p = url.pathname;
        const sp = url.searchParams;
        try {
          if (p === "/api/runs") return send(res, 200, loadRuns(roots));
          let m = p.match(/^\/api\/runs\/([^/]+)\/errors$/);
          if (m) {
            const out = queryErrors(roots, m[1]!, {
              offset: num(sp.get("offset")),
              limit: num(sp.get("limit")),
              tag: str(sp.get("tag")),
              modifier: str(sp.get("modifier")),
              split: str(sp.get("split")),
              q: str(sp.get("q")),
            });
            return out ? send(res, 200, out) : send(res, 404, { error: "run not found" });
          }
          if (p === "/api/datasets") return send(res, 200, loadDatasets(roots));
          m = p.match(/^\/api\/datasets\/([^/]+)\/samples$/);
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
            return out ? send(res, 200, out) : send(res, 404, { error: "dataset not found" });
          }
          if (p.startsWith("/artifacts/")) {
            const rel = decodeURIComponent(p.slice("/artifacts/".length));
            const file = path.resolve(artifacts, rel);
            if (!file.startsWith(artifacts + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
              res.statusCode = 404;
              return res.end("not found");
            }
            res.setHeader("content-type", MIME[path.extname(file)] ?? "application/octet-stream");
            return fs.createReadStream(file).pipe(res);
          }
        } catch (err) {
          return send(res, 500, { error: String(err) });
        }
        next();
      });
    },
  };
}
