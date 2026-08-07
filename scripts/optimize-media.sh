#!/usr/bin/env bash
# Encode a raw phone video into the web-ready clip + poster pair that
# content/photos.ts expects. Usage:
#
#   ./scripts/optimize-media.sh path/to/raw.mov some-clip-name
#
# writes public/photos/some-clip-name.mp4 and public/photos/some-clip-name.jpg
set -euo pipefail

if [ $# -lt 2 ]; then
  echo "usage: $0 <input-video> <output-name>" >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found — install it first (e.g. brew install ffmpeg)" >&2
  exit 1
fi

INPUT="$1"
NAME="$2"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/photos"
mkdir -p "$OUT_DIR"

MP4_OUT="$OUT_DIR/$NAME.mp4"
POSTER_OUT="$OUT_DIR/$NAME.jpg"

echo "encoding $INPUT -> $MP4_OUT"
ffmpeg -y -i "$INPUT" \
  -vf "scale='min(1600,iw)':-2" \
  -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  "$MP4_OUT"

echo "extracting poster -> $POSTER_OUT"
ffmpeg -y -i "$MP4_OUT" -frames:v 1 -q:v 3 "$POSTER_OUT"

WIDTH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$MP4_OUT")
HEIGHT=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$MP4_OUT")

cat <<EOF

done. add this to content/photos.ts:

  {
    id: "$NAME",
    type: "video",
    src: "/photos/$NAME.mp4",
    poster: "/photos/$NAME.jpg",
    alt: "TODO: describe what's happening in the clip.",
    width: $WIDTH,
    height: $HEIGHT,
  },
EOF
