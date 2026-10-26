#!/usr/bin/env python3
import json
import os
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor
import cv2
import numpy as np
from PIL import Image

CLIPS_DIR = r"L:\Project\video agency"
OUT_DIR = r"C:\Users\govin\.gemini\antigravity\scratch\lemonic-tech\public\frames\hero"
FPS = 24
WIDTH = 1280
HEIGHT = 720

def create_watermark_mask(w, h):
    # Scale coordinates proportionally to width & height
    scale_x = w / 1440.0
    scale_y = h / 810.0
    cx = int(round(1305 * scale_x))
    cy = int(round(675 * scale_y))
    rx = int(round(32 * scale_x))
    ry = int(round(32 * scale_y))
    
    mask = np.zeros((h, w), dtype=np.uint8)
    # Diamond points scaled
    pts = np.array([
        [cx, cy - ry],
        [cx + rx, cy],
        [cx, cy + ry],
        [cx - rx, cy]
    ], np.int32)
    cv2.fillPoly(mask, [pts], 255)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask = cv2.dilate(mask, kernel, iterations=2)
    return mask

def process_frame_watermark(args):
    fpath, mask = args
    try:
        img_rgb = np.array(Image.open(fpath).convert("RGB"))
        img_bgr = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR)
        clean_bgr = cv2.inpaint(img_bgr, mask, 4, cv2.INPAINT_TELEA)
        clean_rgb = cv2.cvtColor(clean_bgr, cv2.COLOR_BGR2RGB)
        Image.fromarray(clean_rgb).save(fpath, "WEBP", quality=80, method=4)
        return True
    except Exception as e:
        print(f"Error on {fpath}: {e}")
        return False

def main():
    print("=== [1/4] Preparing High-FPS Master Film (24 fps, no tail black fade) ===")
    clips = [
        os.path.join(CLIPS_DIR, "prompt1.mp4"),
        os.path.join(CLIPS_DIR, "prompt2.mp4"),
        os.path.join(CLIPS_DIR, "prompt3.mp4"),
        os.path.join(CLIPS_DIR, "prompt4.mp4")
    ]
    for c in clips:
        if not os.path.exists(c):
            print(f"Missing clip: {c}")
            sys.exit(1)
            
    os.makedirs(OUT_DIR, exist_ok=True)
    master_mp4 = os.path.join(OUT_DIR, "_master_24fps.mp4")
    
    # We trim prompt4 to 8.65s to prevent fading out to the black void
    # prompt1..3 use full 10.0s
    filter_complex = (
        f"[0:v]scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=decrease,pad={WIDTH}:{HEIGHT}:(ow-iw)/2:(oh-ih)/2,fps={FPS},settb=AVTB[v0]; "
        f"[1:v]scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=decrease,pad={WIDTH}:{HEIGHT}:(ow-iw)/2:(oh-ih)/2,fps={FPS},settb=AVTB[v1]; "
        f"[2:v]scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=decrease,pad={WIDTH}:{HEIGHT}:(ow-iw)/2:(oh-ih)/2,fps={FPS},settb=AVTB[v2]; "
        f"[3:v]trim=duration=8.65,scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=decrease,pad={WIDTH}:{HEIGHT}:(ow-iw)/2:(oh-ih)/2,fps={FPS},settb=AVTB[v3]; "
        f"[v0][v1][v2][v3]concat=n=4:v=1:a=0[outv]"
    )
    
    cmd = ["ffmpeg", "-y", "-v", "error"]
    for c in clips:
        cmd.extend(["-i", c])
    cmd.extend(["-filter_complex", filter_complex, "-map", "[outv]", "-c:v", "libx264", "-crf", "17", master_mp4])
    
    print("Stitching clips with ffmpeg...")
    subprocess.run(cmd, check=True)
    print("Master film built successfully!")
    
    print("\n=== [2/4] Extracting Full 24 FPS WebP Frames ===")
    # Clear existing frames
    for f in os.listdir(OUT_DIR):
        if f.startswith("frame_") and f.endswith(".webp"):
            os.remove(os.path.join(OUT_DIR, f))
            
    temp_pattern = os.path.join(OUT_DIR, "frame_%04d.png")
    cmd_extract = ["ffmpeg", "-y", "-v", "error", "-i", master_mp4, "-vf", f"fps={FPS}", temp_pattern]
    subprocess.run(cmd_extract, check=True)
    
    png_files = sorted([f for f in os.listdir(OUT_DIR) if f.startswith("frame_") and f.endswith(".png")])
    total_frames = len(png_files)
    print(f"Extracted {total_frames} raw frames at 24 fps. Converting to WebP...")
    
    webp_paths = []
    for idx, png_name in enumerate(png_files):
        src_png = os.path.join(OUT_DIR, png_name)
        target_webp = os.path.join(OUT_DIR, f"frame_{idx + 1:04d}.webp")
        with Image.open(src_png) as im:
            im.save(target_webp, "WEBP", quality=80, method=4)
        os.remove(src_png)
        webp_paths.append(target_webp)
        
    if os.path.exists(master_mp4):
        os.remove(master_mp4)
        
    print(f"Converted all {total_frames} frames to WebP.")
    
    print("\n=== [3/4] Batch Inpainting Gemini Watermark ===")
    mask = create_watermark_mask(WIDTH, HEIGHT)
    t0 = time.time()
    tasks = [(p, mask) for p in webp_paths]
    completed = 0
    with ThreadPoolExecutor(max_workers=8) as executor:
        for ok in executor.map(process_frame_watermark, tasks):
            completed += 1
            if completed % 100 == 0 or completed == total_frames:
                elapsed = time.time() - t0
                fps_rate = completed / elapsed
                print(f"  Cleaned {completed}/{total_frames} frames ({completed/total_frames*100:.1f}%) - {fps_rate:.1f} fps")
                
    print(f"All {total_frames} frames cleaned in {time.time() - t0:.1f}s.")
    
    print("\n=== [4/4] Writing Updated manifest.json ===")
    manifest = {
        "count": total_frames,
        "pattern": "frames/hero/frame_%04d.webp",
        "fps": FPS,
        "width": WIDTH,
        "height": HEIGHT,
        "clipCount": 4
    }
    with open(os.path.join(OUT_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
        
    total_mb = sum(os.path.getsize(os.path.join(OUT_DIR, f)) for f in os.listdir(OUT_DIR) if f.endswith(".webp")) / (1024 * 1024)
    print(f"Done! {total_frames} ultra-smooth 24fps frames installed ({total_mb:.1f} MB total).")

if __name__ == "__main__":
    main()
