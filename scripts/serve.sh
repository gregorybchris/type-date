#!/bin/sh
# Keep the dashboard (5173) and picker demo (5199) running. Restarts them if they exit.
# Usage: scripts/serve.sh start|stop|status|logs
cd "$(dirname "$0")/.." || exit 1
RUN=.run
mkdir -p "$RUN"

supervise() { # name port command...
  name=$1; port=$2; shift 2
  if [ -f "$RUN/$name.pid" ] && kill -0 "$(cat "$RUN/$name.pid")" 2>/dev/null; then
    echo "$name supervisor already running"; return
  fi
  nohup sh -c "while true; do $* >> $RUN/$name.log 2>&1; echo \"[\$(date)] $name exited, restarting\" >> $RUN/$name.log; sleep 2; done" >/dev/null 2>&1 &
  echo $! > "$RUN/$name.pid"
  echo "$name supervisor started (port $port)"
}

case "$1" in
  start)
    supervise dashboard 5173 pnpm --filter @type-date/dashboard exec vite --host 0.0.0.0 --port 5173 --strictPort
    supervise picker 5199 pnpm --filter @type-date/picker exec vite --config demo/vite.config.ts --host 0.0.0.0 --port 5199 --strictPort
    ;;
  stop)
    for n in dashboard picker; do
      [ -f "$RUN/$n.pid" ] && kill "$(cat "$RUN/$n.pid")" 2>/dev/null && rm -f "$RUN/$n.pid"
    done
    pkill -f "vite.*--port 5173" 2>/dev/null; pkill -f "vite.*--port 5199" 2>/dev/null
    echo stopped
    ;;
  status)
    for p in 5173 5199; do
      printf "%s: " "$p"; curl -s -o /dev/null -w '%{http_code}\n' --max-time 3 "http://localhost:$p/" || echo down
    done
    ;;
  logs) tail -n 20 "$RUN"/*.log ;;
  *) echo "usage: $0 start|stop|status|logs"; exit 1 ;;
esac
