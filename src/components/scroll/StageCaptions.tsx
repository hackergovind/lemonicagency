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
    peak: 0.0, // Peak at 0.0: Fully visible right upon landing!
    end: 0.22,
    align: "left"
  },
  {
    id: "automation",
    tag: "02 / AUTOMATION",
    title: "Deterministic logic and practical AI pipelines.",
    detail: "Connecting business systems, eliminating repetitive tasks, and structuring data with human oversight.",
    start: 0.25,
    peak: 0.37,
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
  
  // Chapter 1 hero special case: Starts at 100% opacity on page landing
  if (start === peak) {
    const hold = 0.12; // Hold 100% opacity through first 12% scroll
    if (progress <= hold) return 1;
    return Math.max(0, 1 - (progress - hold) / (end - hold));
  }
  
  if (progress <= peak) {
    return Math.max(0, (progress - start) / (peak - start));
  }
  return Math.max(0, 1 - (progress - peak) / (end - peak));
}

export default function StageCaptions({ progress }: StageCaptionsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-end pb-24 sm:pb-28 md:items-center md:pb-0 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="w-full max-w-6xl mx-auto relative h-full flex items-end pb-20 sm:pb-24 md:items-center md:pb-0">
        {CHAPTERS.map((ch) => {
          const opacity = calculateOpacity(progress, ch.start, ch.peak, ch.end);
          if (opacity <= 0.01) return null;

          const yOffset = (1 - opacity) * 15;

          return (
            <div
              key={ch.id}
              className={`absolute transition-all duration-150 w-full max-w-xs sm:max-w-md md:max-w-xl p-4 sm:p-6 md:p-0 rounded-2xl md:rounded-none bg-[#191A16]/75 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border border-[#2C2E26]/60 md:border-none shadow-2xl md:shadow-none ${
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
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20211B]/95 border border-[#2C2E26] text-[10px] sm:text-[11px] font-mono tracking-widest text-[#DDF45B] mb-2.5 sm:mb-3.5 shadow-md backdrop-blur-md ${
                  ch.align === "center" ? "mx-auto" : ""
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#DDF45B] animate-pulse" />
                {ch.tag}
              </div>
              <h2 className="font-display font-normal text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#F6F6F0] leading-[1.12] mb-2 sm:mb-3.5 drop-shadow-md">
                {ch.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#A8AAA0] leading-relaxed max-w-md font-sans">
                {ch.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
