#!/bin/sh
# Converts the demo video to a GIF. Usage: demo-gif.sh in.webm out.gif [start_seconds]
# Needs ffmpeg and gifsicle. Defaults: 10 fps, 32 colors, 450 px wide, lossy 150 (3.9 MB for 100 s).
# Full size at 15 fps, 128 colors, lossy 80 was 10.7 MB. A GIF cannot match the H.264 file (1.7 MB).
set -e
IN="$1"; OUT="$2"; TMP="$(mktemp -t demogif).gif"
FPS="${GIF_FPS:-10}"; COLORS="${GIF_COLORS:-32}"; LOSSY="${GIF_LOSSY:-150}"; DENOISE="${GIF_DENOISE:-12:12:18:18}"; WIDTH="${GIF_WIDTH:-450}"
ffmpeg -loglevel error -y -ss "${3:-0}" -i "$IN" -vf "fps=$FPS,hqdn3d=$DENOISE,scale=$WIDTH:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=$COLORS:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" "$TMP"
gifsicle -O3 --lossy="$LOSSY" "$TMP" -o "$OUT"
rm -f "$TMP"
ls -la "$IN" "$OUT" | awk '{print $5, $9}'
