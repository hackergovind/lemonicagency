import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor
import cv2
import numpy as np
from PIL import Image

HERO_DIR = r"C:\Users\govin\.gemini\antigravity\scratch\lemonic-tech\public\frames\hero"

def create_mask():
    f50_path = os.path.join(HERO_DIR, "frame_050.webp")
    f50 = np.array(Image.open(f50_path).convert("RGB"))
    crop50 = f50[640:715, 1270:1340, 0].astype(np.int16)
    
    star_mask_crop = (crop50 > 25).astype(np.uint8) * 255
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    star_mask_crop = cv2.dilate(star_mask_crop, kernel, iterations=2)
    
    mask = np.zeros((810, 1440), dtype=np.uint8)
    mask[640:715, 1270:1340] = star_mask_crop
    return mask

def process_frame(args):
    idx, fpath, mask = args
    try:
        # Load WebP via PIL
        img_rgb = np.array(Image.open(fpath).convert("RGB"))
        img_bgr = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR)
        
        # Telea Inpainting on watermark area only
        clean_bgr = cv2.inpaint(img_bgr, mask, 4, cv2.INPAINT_TELEA)
        clean_rgb = cv2.cvtColor(clean_bgr, cv2.COLOR_BGR2RGB)
        
        # Save back to same WebP file with high quality (84)
        Image.fromarray(clean_rgb).save(fpath, "WEBP", quality=84, method=4)
        return idx, True
    except Exception as e:
        return idx, False

def main():
    print("[1/3] Creating exact watermark mask from calibration frame...")
    mask = create_mask()
    print(f"Mask created with {np.sum(mask > 0)} active watermark pixels.")
    
    # Collect all 385 frames
    frame_files = sorted([f for f in os.listdir(HERO_DIR) if f.startswith("frame_") and f.endswith(".webp")])
    total = len(frame_files)
    print(f"[2/3] Processing {total} frames with multi-threaded inpainting...")
    
    tasks = [(i, os.path.join(HERO_DIR, f), mask) for i, f in enumerate(frame_files)]
    
    t0 = time.time()
    completed = 0
    with ThreadPoolExecutor(max_workers=8) as executor:
        for idx, success in executor.map(process_frame, tasks):
            completed += 1
            if completed % 50 == 0 or completed == total:
                elapsed = time.time() - t0
                fps = completed / elapsed
                print(f"  Processed {completed}/{total} frames ({completed/total*100:.1f}%) - {fps:.1f} fps")
                
    total_time = time.time() - t0
    print(f"[3/3] Done! All {total} frames cleaned in {total_time:.1f}s.")

if __name__ == "__main__":
    main()
