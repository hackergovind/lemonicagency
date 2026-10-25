"use client";

import { useEffect, useRef, useCallback } from "react";
import { useFrameSequence } from "@/lib/hooks/useFrameSequence";

interface CanvasScrubberProps {
  progress: number;
}

export default function CanvasScrubber({ progress }: CanvasScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { hasFrames, draw } = useFrameSequence("hero");

  // Procedural architectural stage fallback render loop
  const renderProceduralStage = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, p: number) => {
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const minDim = Math.min(width, height);

    // Background ambient dark gradient
    const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, minDim * 0.8);
    bgGrad.addColorStop(0, "rgba(32, 33, 27, 0.85)");
    bgGrad.addColorStop(0.6, "rgba(25, 26, 22, 0.95)");
    bgGrad.addColorStop(1, "rgba(18, 19, 15, 1)");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle isometric perspective grid
    ctx.strokeStyle = "rgba(44, 46, 38, 0.6)";
    ctx.lineWidth = 1;
    const gridSize = 48;
    const gridRows = 16;
    const gridCols = 24;

    ctx.save();
    ctx.translate(cx, cy + minDim * 0.28);
    ctx.scale(1, 0.45);
    ctx.rotate((p * 15 * Math.PI) / 180);

    for (let i = -gridRows; i <= gridRows; i++) {
      ctx.beginPath();
      ctx.moveTo(-gridCols * gridSize, i * gridSize);
      ctx.lineTo(gridCols * gridSize, i * gridSize);
      ctx.stroke();
    }
    for (let j = -gridCols; j <= gridCols; j++) {
      ctx.beginPath();
      ctx.moveTo(j * gridSize, -gridRows * gridSize);
      ctx.lineTo(j * gridSize, gridRows * gridSize);
      ctx.stroke();
    }
    ctx.restore();

    // Central Monolith / Digital Core Structure
    const boxW = minDim * 0.38;
    const boxH = minDim * 0.48;
    const boxX = cx - boxW / 2;
    const boxY = cy - boxH / 2 - 20;

    // Outer Chassis
    ctx.fillStyle = "#20211B";
    ctx.strokeStyle = "#383B30";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();

    // Interior Precision Substrate
    ctx.fillStyle = "#191A16";
    ctx.strokeStyle = "#2C2E26";
    ctx.beginPath();
    ctx.roundRect(boxX + 16, boxY + 16, boxW - 32, boxH - 32, 4);
    ctx.fill();
    ctx.stroke();

    // CHAPTER 1: Core Architecture & Laser Calibration (0.0 -> 0.25)
    if (p < 0.35) {
      const laserY = boxY + 20 + ((p / 0.25) * (boxH - 40));
      ctx.strokeStyle = "#DDF45B";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#DDF45B";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(boxX + 16, Math.min(laserY, boxY + boxH - 20));
      ctx.lineTo(boxX + boxW - 16, Math.min(laserY, boxY + boxH - 20));
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Coordinate telemetry marks
      ctx.fillStyle = "#8E9085";
      ctx.font = "10px monospace";
      ctx.fillText(`CORE.SYS // V:${(p * 4).toFixed(3)}`, boxX + 24, boxY + 36);
      ctx.fillText(`AXIS: [${Math.round(cx)}, ${Math.round(cy)}]`, boxX + 24, boxY + 50);
    }

    // CHAPTER 2: Automation & Data Flow Channels (0.22 -> 0.55)
    if (p >= 0.20 && p < 0.60) {
      const flowP = (p - 0.20) / 0.35;
      const busLines = 5;
      for (let b = 0; b < busLines; b++) {
        const busY = boxY + 70 + b * 40;
        ctx.strokeStyle = "#2C2E26";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(boxX + 28, busY);
        ctx.lineTo(boxX + boxW - 28, busY);
        ctx.stroke();

        // Pulsing data packet node along line
        const packetX = boxX + 28 + (((flowP * 3 + b * 0.25) % 1) * (boxW - 56));
        ctx.fillStyle = "#DDF45B";
        ctx.shadowColor = "#DDF45B";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(packetX, busY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = "#DDF45B";
      ctx.font = "10px monospace";
      ctx.fillText(`LOGIC_BUS: ACTIVE`, boxX + 24, boxY + boxH - 28);
    }

    // CHAPTER 3: Security & Protective Matrix Shield (0.45 -> 0.80)
    if (p >= 0.45 && p < 0.85) {
      const secP = (p - 0.45) / 0.35;
      ctx.strokeStyle = "rgba(221, 244, 91, 0.4)";
      ctx.lineWidth = 1;
      const shieldRadius = (minDim * 0.26) * Math.min(1, secP * 1.4);

      ctx.save();
      ctx.translate(cx, cy - 20);
      ctx.rotate((secP * 30 * Math.PI) / 180);

      // Hexagonal defense perimeter
      ctx.beginPath();
      for (let a = 0; a < 6; a++) {
        const angle = (a * 60 * Math.PI) / 180;
        const hx = Math.cos(angle) * shieldRadius;
        const hy = Math.sin(angle) * shieldRadius;
        if (a === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();

      // Corner lock ticks
      for (let a = 0; a < 6; a++) {
        const angle = (a * 60 * Math.PI) / 180;
        const hx = Math.cos(angle) * shieldRadius;
        const hy = Math.sin(angle) * shieldRadius;
        ctx.fillStyle = "#DDF45B";
        ctx.fillRect(hx - 2, hy - 2, 4, 4);
      }
      ctx.restore();

      ctx.fillStyle = "#DDF45B";
      ctx.font = "10px monospace";
      ctx.fillText(`VAPT_INTEGRITY: 100%`, boxX + 24, boxY + boxH - 42);
      ctx.fillText(`SOC_MONITOR: ARMED`, boxX + 24, boxY + boxH - 28);
    }

    // CHAPTER 4: Integrated Platform Synthesis (0.75 -> 1.0)
    if (p >= 0.70) {
      const synP = (p - 0.70) / 0.30;
      // High-sheen perimeter glow
      ctx.strokeStyle = `rgba(221, 244, 91, ${Math.min(1, synP * 1.5)})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(boxX - 2, boxY - 2, boxW + 4, boxH + 4);

      ctx.fillStyle = "#F6F6F0";
      ctx.font = "11px monospace";
      ctx.fillText(`LEMONIC.TECH // PLATFORM_READY`, boxX + 24, boxY + boxH - 28);
    }

    // Vignette border shading
    const vGrad = ctx.createRadialGradient(cx, cy, minDim * 0.45, cx, cy, minDim * 0.95);
    vGrad.addColorStop(0, "rgba(25, 26, 22, 0)");
    vGrad.addColorStop(1, "rgba(25, 26, 22, 0.95)");
    ctx.fillStyle = vGrad;
    ctx.fillRect(0, 0, width, height);
  }, []);

  // Scrub loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (hasFrames) {
      draw(canvas, progress);
    } else {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.round(canvas.clientWidth * dpr);
      const ch = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }
      const ctx = canvas.getContext("2d");
      if (ctx) {
        renderProceduralStage(ctx, cw, ch, progress);
      }
    }
  }, [progress, hasFrames, draw, renderProceduralStage]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
