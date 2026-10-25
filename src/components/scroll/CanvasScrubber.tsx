"use client";

import { useEffect, useRef, useCallback } from "react";
import { useFrameSequence } from "@/lib/hooks/useFrameSequence";

interface CanvasScrubberProps {
  progress: number;
  introProgress?: number;
}

export default function CanvasScrubber({ progress, introProgress = 1 }: CanvasScrubberProps) {
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

    // Outer Monolith Body
    ctx.fillStyle = "rgba(25, 26, 22, 0.95)";
    ctx.strokeStyle = "rgba(44, 46, 38, 0.9)";
    ctx.lineWidth = 1.5;
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    // Architectural Corner Brackets
    const bLen = 14;
    ctx.strokeStyle = "#DDF45B";
    ctx.lineWidth = 2;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(boxX, boxY + bLen);
    ctx.lineTo(boxX, boxY);
    ctx.lineTo(boxX + bLen, boxY);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(boxX + boxW - bLen, boxY);
    ctx.lineTo(boxX + boxW, boxY);
    ctx.lineTo(boxX + boxW, boxY + bLen);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(boxX, boxY + boxH - bLen);
    ctx.lineTo(boxX, boxY + boxH);
    ctx.lineTo(boxX + bLen, boxY + boxH);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(boxX + boxW - bLen, boxY + boxH);
    ctx.lineTo(boxX + boxW, boxY + boxH);
    ctx.lineTo(boxX + boxW, boxY + boxH - bLen);
    ctx.stroke();

    // CHAPTER 1: Engineering Architecture (Active from 0.0)
    const archP = Math.max(0.2, Math.min(1, p / 0.25));
    ctx.strokeStyle = `rgba(221, 244, 91, ${0.4 + archP * 0.6})`;
    ctx.lineWidth = 1.5;
    const midY = boxY + boxH * 0.45;
    ctx.beginPath();
    ctx.moveTo(boxX + 20, midY);
    ctx.lineTo(boxX + boxW * 0.45, midY);
    ctx.lineTo(boxX + boxW * 0.55, midY - 24);
    ctx.lineTo(boxX + boxW - 20, midY - 24);
    ctx.stroke();

    // Glowing bus lines
    ctx.fillStyle = "#DDF45B";
    ctx.fillRect(boxX + 20, midY - 3, 6, 6);
    ctx.fillRect(boxX + boxW - 26, midY - 27, 6, 6);

    ctx.fillStyle = "#8E9085";
    ctx.font = "10px monospace";
    ctx.fillText(`CORE_SYS: READY`, boxX + 24, boxY + 28);
    ctx.fillText(`FRAME_INDEX: ${Math.round(p * 384)}`, boxX + 24, boxY + 44);

    // CHAPTER 2: Deterministic Automation Circuits (0.25 -> 0.50)
    if (p >= 0.20) {
      const autoP = Math.min(1, (p - 0.20) / 0.25);
      ctx.strokeStyle = `rgba(221, 244, 91, ${autoP * 0.9})`;
      ctx.lineWidth = 1.5;

      const cY1 = boxY + boxH * 0.6;
      ctx.beginPath();
      ctx.moveTo(boxX + 20, cY1);
      ctx.lineTo(boxX + boxW * 0.35, cY1);
      ctx.lineTo(boxX + boxW * 0.5, cY1 + 20);
      ctx.lineTo(boxX + boxW - 20, cY1 + 20);
      ctx.stroke();

      const pulseOffset = (p * 800) % (boxW - 40);
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(boxX + 20 + pulseOffset, cY1 + (pulseOffset > boxW * 0.35 ? 10 : 0), 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#DDF45B";
      ctx.font = "10px monospace";
      ctx.fillText(`AI_PIPELINE: ACTIVE`, boxX + 24, boxY + boxH - 60);
    }

    // CHAPTER 3: Security & VAPT Perimeter Shield (0.50 -> 0.75)
    if (p >= 0.45) {
      const secP = Math.min(1, (p - 0.45) / 0.25);
      const shieldR = minDim * 0.24;

      ctx.strokeStyle = `rgba(221, 244, 91, ${secP * 0.8})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy - 20, shieldR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#DDF45B";
      ctx.font = "10px monospace";
      ctx.fillText(`VAPT_INTEGRITY: 100%`, boxX + 24, boxY + boxH - 42);
      ctx.fillText(`SOC_MONITOR: ARMED`, boxX + 24, boxY + boxH - 28);
    }

    // CHAPTER 4: Integrated Platform Synthesis (0.75 -> 1.0)
    if (p >= 0.70) {
      const synP = (p - 0.70) / 0.30;
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
      draw(canvas, progress, introProgress);
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
  }, [progress, introProgress, hasFrames, draw, renderProceduralStage]);

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
