"use client";

interface StageCaptionsProps {
  progress: number;
}

interface Chapter {
  id: string;
  tag: string;
  title: string;
  detail: string;
  start: number;
  peak: number;
  end: number;
  align: "left" | "right" | "center";
}

const CHAPTERS: Chapter[] = [
  {
    id: "arch",
    tag: "01 / ARCHITECTURE",
    title: "Websites and applications built around your business.",
    detail: "High-performance TypeScript platforms, authenticated portals, and clean API integrations.",
    start: 0.0,
    peak: 0.12,
    end: 0.24,
    align: "left"
  },
  {
    id: "automation",
    tag: "02 / AUTOMATION",
    title: "Deterministic logic and practical AI pipelines.",
    detail: "Connecting business systems, eliminating repetitive tasks, and structuring data with human oversight.",
    start: 0.26,
    peak: 0.38,
    end: 0.49,
    align: "right"
  },
  {
    id: "security",
    tag: "03 / SECURITY DEFENSE",
    title: "Authorized VAPT and pragmatic SOC monitoring.",
    detail: "Methodical vulnerability assessments with reproducible proof, and structured alert triage.",
    start: 0.51,
    peak: 0.63,
    end: 0.74,
    align: "left"
  },
  {
    id: "synthesis",
    tag: "04 / INTEGRATED DELIVERY",
    title: "Engineering-led delivery. Zero speculation.",
    detail: "Clear scopes, documented handovers, and reliable technical capabilities.",
    start: 0.76,
    peak: 0.88,
    end: 1.0,
    align: "center"
  }
];

function calculateOpacity(progress: number, start: number, peak: number, end: number): number {
  if (progress < start || progress > end) return 0;
  if (progress <= peak) {
    return (progress - start) / (peak - start);
  }
  return 1 - (progress - peak) / (end - peak);
}

export default function StageCaptions({ progress }: StageCaptionsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center p-6 md:p-12 lg:p-16">
      <div className="w-full max-w-6xl mx-auto relative h-full flex items-center">
        {CHAPTERS.map((ch) => {
          const opacity = calculateOpacity(progress, ch.start, ch.peak, ch.end);
          if (opacity <= 0.01) return null;

          const yOffset = (1 - opacity) * 15;

          return (
            <div
              key={ch.id}
              className={`absolute transition-transform duration-75 max-w-lg ${
                ch.align === "left"
                  ? "left-0 text-left"
                  : ch.align === "right"
                  ? "right-0 text-left md:text-right ml-auto"
                  : "left-1/2 -translate-x-1/2 text-center"
              }`}
              style={{
                opacity,
                transform: `translateY(${yOffset}px)`
              }}
            >
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20211B]/90 border border-[#2C2E26] text-[11px] font-mono tracking-widest text-[#DDF45B] mb-3 ${
                  ch.align === "center" ? "mx-auto" : ""
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#DDF45B] animate-pulse" />
                {ch.tag}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#F6F6F0] leading-tight mb-3">
                {ch.title}
              </h2>
              <p className="text-sm md:text-base text-[#8E9085] leading-relaxed">
                {ch.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
