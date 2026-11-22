#!/bin/sh
# Converts the demo recording to a GIF. Usage: demo-gif.sh in.ffconcat out.gif
# The input is the PNG frame list from demo-video.mjs (2x device pixels). Needs ffmpeg and gifsicle.
# Defaults (800 px, 12 fps, global palette, no dither, no lossy): 6.8 MB for 62 s. Dither added noise to flat UI colors.
# Env: GIF_FPS, GIF_WIDTH (README shows it at half this width, so it stays sharp on 2x screens), GIF_COLORS, GIF_LOSSY.
# GIF_PALETTE=single builds one palette per frame (keeps changing highlight colors; larger file).
set -e
IN="$1"; OUT="$2"; TMP="$(mktemp -t demogif).gif"
FPS="${GIF_FPS:-12}"; COLORS="${GIF_COLORS:-256}"; LOSSY="${GIF_LOSSY:-0}"; WIDTH="${GIF_WIDTH:-800}"
SRC="fps=$FPS,scale=$WIDTH:-1:flags=lanczos,split[a][b]"
if [ "${GIF_PALETTE:-global}" = "single" ]; then
  PAL="[a]palettegen=max_colors=$COLORS:stats_mode=single[p];[b][p]paletteuse=dither=none:new=1"
else
  PAL="[a]palettegen=max_colors=$COLORS:stats_mode=diff[p];[b][p]paletteuse=dither=none:diff_mode=rectangle"
fi
ffmpeg -loglevel error -y -f concat -safe 0 -i "$IN" -vf "$SRC;$PAL" "$TMP"
gifsicle -O3 --lossy="$LOSSY" "$TMP" -o "$OUT"
rm -f "$TMP"
ls -la "$OUT" | awk '{print $5, $9}'
