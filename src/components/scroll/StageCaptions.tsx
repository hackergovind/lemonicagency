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

// 558 total frames:
//   Clip 1 (prompt1): frames 0-182  → progress 0.000 – 0.328
//   Clip 2 (prompt2): frames 183-365 → progress 0.328 – 0.655
//   Clip 3 (prompt3): frames 366-557 → progress 0.656 – 1.000
const CHAPTERS: Chapter[] = [
  {
    id: "brand",
    tag: "01 / WEBSITES & APPS",
    title: "Your brand deserves to stand out.",
    detail: "High-performance websites and apps built to convert visitors into clients.",
    start: 0.0,
    peak: 0.0,
    end: 0.20,
    align: "left"
  },
  {
    id: "ignite",
    tag: "02 / THE SPARK",
    title: "One idea. Set the market on fire.",
    detail: "We craft digital experiences that light up your audience and ignite growth.",
    start: 0.18,
    peak: 0.28,
    end: 0.40,
    align: "right"
  },
  {
    id: "automation",
    tag: "03 / AUTOMATION & AI",
    title: "Work smarter. Let the systems run.",
    detail: "Business automation, AI pipelines, and workflow engines that never sleep.",
    start: 0.38,
    peak: 0.50,
    end: 0.62,
    align: "left"
  },
  {
    id: "strategy",
    tag: "04 / STRATEGY",
    title: "Hard work meets smart strategy.",
    detail: "Security, SEO, and engineered growth — turning vision into measurable results.",
    start: 0.72,
    peak: 0.84,
    end: 0.96,
    align: "center"
  }
];

function calculateOpacity(progress: number, start: number, peak: number, end: number): number {
  if (progress < start || progress > end) return 0;

  // Chapter 1: starts at full opacity on page load
  if (start === peak) {
    const hold = 0.10;
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
                transform: `translateY(${yOffset}px)${ch.align === "center" ? " translateX(-50%)" : ""}`
              }}
            >
              <div className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#DDF45B] uppercase mb-3 sm:mb-4 flex items-center gap-2 md:justify-start justify-start">
                <span className="w-1 h-1 rounded-full bg-[#DDF45B] inline-block" />
                {ch.tag}
              </div>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#F6F6F0] leading-[1.1] tracking-tight mb-3 sm:mb-4 drop-shadow-2xl">
                {ch.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#C2C4B8] leading-relaxed font-sans max-w-sm drop-shadow-lg">
                {ch.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
