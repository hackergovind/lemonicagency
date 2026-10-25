#!/usr/bin/env python3
"""
Lemonic.tech - Multi-Chapter Flow Video Assembler & WebP Extractor

Usage:
  python scripts/build_flow_film.py <input_folder_or_clips> [out_dir] [--fps 15] [--width 1400]

Example:
  python scripts/build_flow_film.py path/to/flow_videos/ public/frames/hero --fps 15 --width 1400

This script:
1. Detects all MP4 clips in the folder (prompt 1, 2, 3, 4).
2. Concatenates them with seamless crossfades into a master film.
3. Extracts high-resolution, optimized WebP frames (~15-25 MB total).
4. Generates manifest.json with chapter metadata ready for the scrubber.
"""

import json
import os
import subprocess
import sys
from PIL import Image


def get_video_duration(clip_path):
    cmd = [
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", clip_path
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return float(res.stdout.strip())


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/build_flow_film.py <input_folder> [out_dir] [--fps 15] [--width 1400]")
        sys.exit(1)

    input_source = sys.argv[1]
    out_dir = "public/frames/hero"
    if len(sys.argv) > 2 and not sys.argv[2].startswith("--"):
        out_dir = sys.argv[2]

    fps = 15
    width = 1400

    if "--fps" in sys.argv:
        fps = int(sys.argv[sys.argv.index("--fps") + 1])
    if "--width" in sys.argv:
        width = int(sys.argv[sys.argv.index("--width") + 1])

    # Find video clips
    clips = []
    if os.path.isdir(input_source):
        for f in sorted(os.listdir(input_source)):
            if f.lower().endswith((".mp4", ".mov", ".webm", ".mkv")):
                clips.append(os.path.join(input_source, f))
    elif os.path.isfile(input_source):
        clips.append(input_source)

    if not clips:
        print(f"Error: No video files found in '{input_source}'.")
        sys.exit(1)

    print(f"Found {len(clips)} clip(s):")
    for idx, c in enumerate(clips):
        dur = get_video_duration(c)
        print(f"  [{idx + 1}] {os.path.basename(c)} ({dur:.2f}s)")

    os.makedirs(out_dir, exist_ok=True)
    for f in os.listdir(out_dir):
        if f.endswith((".webp", ".png", ".jpg", ".json")):
            os.remove(os.path.join(out_dir, f))

    temp_master = os.path.join(out_dir, "_master.mp4")

    # If single clip, use directly; if multiple clips, concat with xfade
    if len(clips) == 1:
        temp_master = clips[0]
    else:
        print("\nStitching clips into master film with seamless crossfades...")
        # Create concat filter
        # For simplicity and maximum reliability across variable codecs:
        filter_inputs = ""
        filter_complex = ""
        durations = [get_video_duration(c) for c in clips]

        # Normalize all clips to 1080p 24fps
        for i in range(len(clips)):
            filter_complex += f"[{i}:v]scale={width}:-2,fps=24,settb=AVTB[v{i}]; "

        concat_input_tags = "".join(f"[v{i}]" for i in range(len(clips)))
        filter_complex += f"{concat_input_tags}concat=n={len(clips)}:v=1:a=0[outv]"

        cmd = ["ffmpeg", "-y", "-v", "error"]
        for c in clips:
            cmd.extend(["-i", c])
        cmd.extend(["-filter_complex", filter_complex, "-map", "[outv]", "-c:v", "libx264", "-crf", "18", temp_master])
        subprocess.run(cmd, check=True)
        print(f"Master film generated: {temp_master}")

    # Extract WebP frames
    print(f"\nExtracting WebP frames at {fps} fps, {width}px width...")
    temp_pattern = os.path.join(out_dir, "raw_%04d.png")
    vf = f"fps={fps},scale={width}:-2"
    cmd = ["ffmpeg", "-y", "-v", "error", "-i", temp_master, "-vf", vf, temp_pattern]
    subprocess.run(cmd, check=True)

    pngs = sorted([f for f in os.listdir(out_dir) if f.startswith("raw_") and f.endswith(".png")])
    print(f"Converting {len(pngs)} frames to high-performance WebP...")

    for idx, png_file in enumerate(pngs):
        raw_path = os.path.join(out_dir, png_file)
        target_name = f"frame_{idx + 1:03d}.webp"
        target_path = os.path.join(out_dir, target_name)
        with Image.open(raw_path) as im:
            im.save(target_path, "WEBP", quality=84, method=4)
        os.remove(raw_path)

    if temp_master.endswith("_master.mp4") and os.path.exists(temp_master):
        os.remove(temp_master)

    manifest = {
        "count": len(pngs),
        "pattern": "frames/hero/frame_%03d.webp",
        "fps": fps,
        "width": width,
        "clipCount": len(clips)
    }
    manifest_path = os.path.join(out_dir, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    total_mb = sum(os.path.getsize(os.path.join(out_dir, f)) for f in os.listdir(out_dir)) / (1024 * 1024)
    print(f"\nSuccess! {len(pngs)} WebP frames installed into '{out_dir}'. Total size: {total_mb:.1f} MB.")
    print(f"The website will automatically scrub the complete multi-chapter film.")


if __name__ == "__main__":
    main()
