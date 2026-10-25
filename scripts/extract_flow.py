#!/usr/bin/env python3
"""
Lemonic.tech - Google Flow Video to WebP Frame Extractor

Usage:
  python scripts/extract_flow.py <flow_video.mp4> [out_dir] [--fps 12] [--width 1400]

Example:
  python scripts/extract_flow.py flow_generation.mp4 public/frames/hero --fps 12 --width 1400

This extracts frames using ffmpeg, encodes them as optimized WebP (~15-25MB total),
and generates a manifest.json ready for the Next.js canvas scrubber.
"""

import json
import os
import subprocess
import sys


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/extract_flow.py <video.mp4> [out_dir] [--fps 12] [--width 1400]")
        sys.exit(1)

    video_path = sys.argv[1]
    if not os.path.exists(video_path):
        print(f"Error: Video file '{video_path}' not found.")
        sys.exit(1)

    out_dir = "public/frames/hero"
    if len(sys.argv) > 2 and not sys.argv[2].startswith("--"):
        out_dir = sys.argv[2]

    fps = 12
    width = 1400

    if "--fps" in sys.argv:
        fps = int(sys.argv[sys.argv.index("--fps") + 1])
    if "--width" in sys.argv:
        width = int(sys.argv[sys.argv.index("--width") + 1])

    os.makedirs(out_dir, exist_ok=True)

    # Clean existing frames
    for f in os.listdir(out_dir):
        if f.endswith((".png", ".webp", ".jpg")):
            os.remove(os.path.join(out_dir, f))

    print(f"Extracting {video_path} -> {out_dir} at {fps} fps, {width}px width...")

    # Extract directly to WebP using ffmpeg with libwebp if supported, or via PNG conversion
    temp_pattern = os.path.join(out_dir, "raw_%04d.png")
    vf = f"fps={fps},scale={width}:-2"
    
    cmd = ["ffmpeg", "-y", "-v", "error", "-i", video_path, "-vf", vf, temp_pattern]
    subprocess.run(cmd, check=True)

    pngs = sorted([f for f in os.listdir(out_dir) if f.startswith("raw_") and f.endswith(".png")])
    if not pngs:
        print("Error: No frames extracted.")
        sys.exit(1)

    print(f"Extracted {len(pngs)} raw frames. Converting to optimized WebP...")

    try:
        from PIL import Image
        for idx, png_file in enumerate(pngs):
            raw_path = os.path.join(out_dir, png_file)
            target_name = f"frame_{idx + 1:03d}.webp"
            target_path = os.path.join(out_dir, target_name)
            with Image.open(raw_path) as im:
                im.save(target_path, "WEBP", quality=82, method=4)
            os.remove(raw_path)
    except ImportError:
        # Fallback to ffmpeg for webp conversion
        for idx, png_file in enumerate(pngs):
            raw_path = os.path.join(out_dir, png_file)
            target_name = f"frame_{idx + 1:03d}.webp"
            target_path = os.path.join(out_dir, target_name)
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", raw_path, "-c:v", "libwebp", "-quality", "82", target_path], check=True)
            os.remove(raw_path)

    # Write manifest
    name = os.path.basename(out_dir.rstrip("/\\"))
    manifest = {
        "count": len(pngs),
        "pattern": f"frames/{name}/frame_%03d.webp",
        "fps": fps,
        "width": width
    }
    manifest_path = os.path.join(out_dir, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    total_mb = sum(os.path.getsize(os.path.join(out_dir, f)) for f in os.listdir(out_dir)) / (1024 * 1024)
    print(f"Success! {len(pngs)} frames generated in '{out_dir}'. Total size: {total_mb:.1f} MB.")
    print(f"Manifest written to '{manifest_path}'. The website will automatically use these frames.")


if __name__ == "__main__":
    main()
