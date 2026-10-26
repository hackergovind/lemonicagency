"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Resting start frame: Frame 66 (index 65) where the monolith is fully illuminated in 24fps
export const HERO_START_FRAME_INDEX = 65;

export function useFrameSequence(name: string) {
  const images = useRef<Map<number, HTMLImageElement>>(new Map());
  const countRef = useRef(0);
  const patternRef = useRef("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastProgress = useRef(0);
  const lastIntro = useRef(1);
  const lastIndex = useRef(HERO_START_FRAME_INDEX);
  const [hasFrames, setHasFrames] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUrlForIndex = useCallback((i: number) => {
    if (!patternRef.current) return "";
    let p = patternRef.current;
    if (p.includes("%04d")) {
      p = p.replace("%04d", String(i + 1).padStart(4, "0"));
    } else if (p.includes("%03d")) {
      p = p.replace("%03d", String(i + 1).padStart(3, "0"));
    }
    return p.startsWith("/") ? p : `/${p}`;
  }, []);

  const drawFrame = useCallback((
    canvas: HTMLCanvasElement | null,
    progress: number,
    introProgress: number = 1
  ) => {
    if (!canvas || countRef.current === 0) return false;
    canvasRef.current = canvas;
    lastProgress.current = progress;
    lastIntro.current = introProgress;

    const total = countRef.current;
    const startIndex = Math.min(HERO_START_FRAME_INDEX, total - 1);

    let targetIdx: number;
    if (progress <= 0 && introProgress < 1) {
      // Intro boot power-on animation: smoothly animate from frame 0 up to startIndex
      targetIdx = Math.round(startIndex * Math.max(0, Math.min(1, introProgress)));
    } else {
      // Scrub from startIndex (illuminated monolith) up to total - 1
      const availableRange = total - 1 - startIndex;
      const clampedP = Math.min(1, Math.max(0, progress));
      targetIdx = startIndex + Math.round(clampedP * availableRange);
    }

    lastIndex.current = targetIdx;

    // Sliding window preload: wider window for 24fps smoothness
    const WINDOW_AHEAD = 30;
    const WINDOW_BEHIND = 15;
    for (let d = -WINDOW_BEHIND; d <= WINDOW_AHEAD; d++) {
      const idx = targetIdx + d;
      if (idx >= 0 && idx < total && !images.current.has(idx)) {
        const img = new Image();
        img.decoding = "async";
        img.src = getUrlForIndex(idx);
        img.onload = () => {
          if (Math.abs(lastIndex.current - idx) <= 2 && canvasRef.current) {
            drawFrame(canvasRef.current, lastProgress.current, lastIntro.current);
          }
        };
        images.current.set(idx, img);
      }
    }

    // Memory garbage collection: evict images far outside window to keep mobile RAM light
    if (images.current.size > 140) {
      for (const [idx, img] of images.current.entries()) {
        if (Math.abs(idx - targetIdx) > 60) {
          img.src = "";
          images.current.delete(idx);
        }
      }
    }

    // Find nearest already loaded image
    let imgToDraw: HTMLImageElement | null = null;
    const direct = images.current.get(targetIdx);
    if (direct && direct.complete && direct.naturalWidth > 0) {
      imgToDraw = direct;
    } else {
      for (let offset = 1; offset < 35; offset++) {
        const prev = images.current.get(targetIdx - offset);
        if (prev && prev.complete && prev.naturalWidth > 0) {
          imgToDraw = prev;
          break;
        }
        const next = images.current.get(targetIdx + offset);
        if (next && next.complete && next.naturalWidth > 0) {
          imgToDraw = next;
          break;
        }
      }
    }

    if (!imgToDraw) return false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(canvas.clientWidth * dpr);
    const ch = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    const iw = imgToDraw.naturalWidth || imgToDraw.width;
    const ih = imgToDraw.naturalHeight || imgToDraw.height;
    if (iw === 0 || ih === 0) return false;

    // Responsive Canvas Scaling:
    // On mobile portrait (cw < ch), use 'cover' scaling so the video film fills the mobile screen gracefully.
    // On desktop landscape, use 'contain' so the full 16:9 cinematic framing is visible.
    const isPortrait = cw < ch;
    const s = isPortrait ? Math.max(cw / iw, ch / ih) : Math.min(cw / iw, ch / ih);
    const dw = Math.round(iw * s);
    const dh = Math.round(ih * s);
    const dx = Math.round((cw - dw) / 2);
    const dy = Math.round((ch - dh) / 2);

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(imgToDraw, dx, dy, dw, dh);
    return true;
  }, [getUrlForIndex]);

  useEffect(() => {
    let alive = true;

    async function initSequence() {
      try {
        const res = await fetch(`/frames/${name}/manifest.json`);
        if (!res.ok) {
          if (alive) {
            setHasFrames(false);
            setLoading(false);
          }
          return;
        }

        const m = await res.json();
        if (!alive || !m.count || m.count <= 0) {
          if (alive) {
            setHasFrames(false);
            setLoading(false);
          }
          return;
        }

        countRef.current = m.count;
        patternRef.current = m.pattern;

        // Preload key starting frames immediately:
        // Frame 0 (start of intro boot) and Frame 66 (resting illuminated hero frame)
        const priorityIndices = [
          0, 10, 25, 45, HERO_START_FRAME_INDEX, HERO_START_FRAME_INDEX + 1, HERO_START_FRAME_INDEX + 2,
          Math.round(m.count * 0.25), Math.round(m.count * 0.5), Math.round(m.count * 0.75), m.count - 1
        ];

        for (const i of priorityIndices) {
          if (i < m.count && !images.current.has(i)) {
            const img = new Image();
            img.decoding = "async";
            let p = m.pattern;
            if (p.includes("%04d")) {
              p = p.replace("%04d", String(i + 1).padStart(4, "0"));
            } else if (p.includes("%03d")) {
              p = p.replace("%03d", String(i + 1).padStart(3, "0"));
            }
            img.src = p.startsWith("/") ? p : `/${p}`;
            img.onload = () => {
              if (alive && i === HERO_START_FRAME_INDEX && canvasRef.current) {
                drawFrame(canvasRef.current, lastProgress.current, lastIntro.current);
              }
            };
            images.current.set(i, img);
          }
        }

        // Background progressive keyframe preload for buttery 60fps mobile scrolling
        const idlePreload = () => {
          if (!alive) return;
          const step = 12; // Every 12th frame (0.5s interval in 24fps)
          for (let k = 0; k < m.count; k += step) {
            if (!images.current.has(k)) {
              const keyImg = new Image();
              keyImg.decoding = "async";
              let p = m.pattern;
              if (p.includes("%04d")) {
                p = p.replace("%04d", String(k + 1).padStart(4, "0"));
              } else if (p.includes("%03d")) {
                p = p.replace("%03d", String(k + 1).padStart(3, "0"));
              }
              keyImg.src = p.startsWith("/") ? p : `/${p}`;
              images.current.set(k, keyImg);
            }
          }
        };

        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
          (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(idlePreload);
        } else {
          setTimeout(idlePreload, 300);
        }

        if (alive) {
          setHasFrames(true);
          setLoading(false);
        }
      } catch {
        if (alive) {
          setHasFrames(false);
          setLoading(false);
        }
      }
    }

    initSequence();

    const currentImages = images.current;
    return () => {
      alive = false;
      currentImages.forEach((img) => {
        img.src = "";
      });
      currentImages.clear();
    };
  }, [name, drawFrame]);

  return { hasFrames, loading, frameCount: countRef.current, draw: drawFrame };
}
