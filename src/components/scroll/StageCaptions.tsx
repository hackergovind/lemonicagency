"use client";

interface StageCaptionsProps {
  progress: number;
}

interface Chapter {
  id: string;
  tag: string;
  headline: string;
  subtitle: string;
  start: number;
  holdStart: number;
  holdEnd: number;
  end: number;
}

const CHAPTERS: Chapter[] = [
  {
    id: "architecture",
    tag: "01 // DIGITAL ARCHITECTURE",
    headline: "STAND OUT",
    subtitle: "High-performance digital platforms and bespoke systems engineered to command market attention.",
    start: 0.0,
    holdStart: 0.0,
    holdEnd: 0.22,
    end: 0.33,
  },
  {
    id: "spark",
    tag: "02 // CREATIVE SPARK",
    headline: "IGNITE",
    subtitle: "Transform bold ideas into industry wildfire through custom high-conversion digital design.",
    start: 0.30,
    holdStart: 0.40,
    holdEnd: 0.58,
    end: 0.68,
  },
  {
    id: "strategy",
    tag: "03 // TACTICAL DOMINANCE",
    headline: "COMMAND",
    subtitle: "Precision engineering, verified security boundaries, and resilient software built to endure.",
    start: 0.65,
    holdStart: 0.74,
    holdEnd: 0.88,
    end: 0.98,
  },
];

function calculateOpacity(
  progress: number,
  start: number,
  holdStart: number,
  holdEnd: number,
  end: number
): number {
  if (progress < start || progress > end) return 0;
  if (start === holdStart) {
    if (progress <= holdEnd) return 1;
    return Math.max(0, 1 - (progress - holdEnd) / (end - holdEnd));
  }
  if (progress < holdStart) {
    return Math.max(0, (progress - start) / (holdStart - start));
  }
  if (progress <= holdEnd) {
    return 1;
  }
  return Math.max(0, 1 - (progress - holdEnd) / (end - holdEnd));
}

export default function StageCaptions({ progress }: StageCaptionsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-4xl mx-auto relative flex items-center justify-center min-h-[320px]">
        {CHAPTERS.map((ch) => {
          const opacity = calculateOpacity(progress, ch.start, ch.holdStart, ch.holdEnd, ch.end);
          if (opacity <= 0.01) return null;

          const yOffset = (1 - opacity) * 20;
          const scale = 0.96 + opacity * 0.04;

          return (
            <div
              key={ch.id}
              className="absolute inset-x-0 mx-auto flex flex-col items-center text-center justify-center transition-all duration-150"
              style={{
                opacity,
                transform: `translateY(${yOffset}px) scale(${scale})`,
              }}
            >
              {/* Frosted Glass Container: High-end luxury feel, 100% legibility on any video frame */}
              <div className="flex flex-col items-center text-center max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-6 py-6 sm:px-10 sm:py-8 rounded-3xl bg-black/50 backdrop-blur-xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
                
                {/* Chapter Tag Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-satoshi font-semibold tracking-[0.22em] text-white/90 uppercase mb-3 sm:mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>{ch.tag}</span>
                </div>

                {/* Main Headline: Razor-sharp, perfectly sized, centered */}
                <h2 className="font-clash text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-[-0.04em] leading-[0.92] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] mb-3 sm:mb-4 select-none">
                  {ch.headline}
                </h2>

                {/* Subtitle with high-contrast clarity */}
                <p className="font-satoshi text-xs sm:text-base md:text-lg text-white/85 max-w-lg mx-auto font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {ch.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
