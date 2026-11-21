#!/bin/sh
# Converts the demo video to a GIF. Usage: demo-gif.sh in.webm out.gif [start_seconds]
# Needs ffmpeg and gifsicle. Defaults: 8 fps, 256 colors, 400 px wide, lossy 100 (5.2 MB for 85 s with color changes).
# 32 colors lost the changing highlight colors; per-frame palettes (GIF_PALETTE=single) were 13 MB. A GIF cannot match H.264 (2 MB).
set -e
IN="$1"; OUT="$2"; TMP="$(mktemp -t demogif).gif"
FPS="${GIF_FPS:-8}"; COLORS="${GIF_COLORS:-256}"; LOSSY="${GIF_LOSSY:-100}"; DENOISE="${GIF_DENOISE:-10:10:15:15}"; WIDTH="${GIF_WIDTH:-400}"
# GIF_PALETTE=single builds one palette per frame (keeps changing highlight colors; larger file).
if [ "${GIF_PALETTE:-global}" = "single" ]; then
  ffmpeg -loglevel error -y -ss "${3:-0}" -i "$IN" -vf "fps=$FPS,hqdn3d=$DENOISE,scale=$WIDTH:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=$COLORS:stats_mode=single[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:new=1" "$TMP"
else
  ffmpeg -loglevel error -y -ss "${3:-0}" -i "$IN" -vf "fps=$FPS,hqdn3d=$DENOISE,scale=$WIDTH:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=$COLORS:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" "$TMP"
fi
gifsicle -O3 --lossy="$LOSSY" "$TMP" -o "$OUT"
rm -f "$TMP"
ls -la "$IN" "$OUT" | awk '{print $5, $9}'
