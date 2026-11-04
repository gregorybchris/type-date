#!/bin/sh
# Converts the demo video to a GIF. Usage: demo-gif.sh in.webm out.gif
# Needs ffmpeg and gifsicle. Settings were picked by comparing file sizes; see specs/conventions.md.
set -e
IN="$1"; OUT="$2"; TMP="$(mktemp -t demogif).gif"
FPS="${GIF_FPS:-15}"; COLORS="${GIF_COLORS:-128}"; LOSSY="${GIF_LOSSY:-80}"; DENOISE="${GIF_DENOISE:-4:4:6:6}"; WIDTH="${GIF_WIDTH:-526}"
ffmpeg -loglevel error -y -i "$IN" -vf "fps=$FPS,hqdn3d=$DENOISE,scale=$WIDTH:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=$COLORS:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" "$TMP"
gifsicle -O3 --lossy="$LOSSY" "$TMP" -o "$OUT"
rm -f "$TMP"
ls -la "$IN" "$OUT" | awk '{print $5, $9}'
