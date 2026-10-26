"use client";

interface StageCaptionsProps {
  progress: number;
}

interface Chapter {
  id: string;
  tag: string;
  echoWord: string;
  title: string;
  detail: string;
  start: number;
  peak: number;
  end: number;
  align: "left" | "right" | "center";
}

const CHAPTERS: Chapter[] = [
  {
    id: "brand",
    tag: "01 / ARCHITECTURE",
    echoWord: "STAND OUT",
    title: "Websites and systems built to command attention.",
    detail: "High-performance TypeScript platforms and clean API integrations engineered around your business.",
    start: 0.0,
    peak: 0.0,
    end: 0.22,
    align: "left"
  },
  {
    id: "ignite",
    tag: "02 / THE SPARK",
    echoWord: "IGNITE",
    title: "One idea. Set the entire market on fire.",
    detail: "Custom digital design and high-conversion engineering that turn passive visitors into buyers.",
    start: 0.20,
    peak: 0.32,
    end: 0.45,
    align: "right"
  },
  {
    id: "automation",
    tag: "03 / AUTOMATION",
    echoWord: "AUTOMATE",
    title: "Work smarter. Let the digital engine run.",
    detail: "Eliminating manual data transfer, connecting CRM databases, and deploying deterministic AI pipelines.",
    start: 0.42,
    peak: 0.54,
    end: 0.68,
    align: "left"
  },
  {
    id: "strategy",
    tag: "04 / STRATEGY",
    echoWord: "STRATEGY",
    title: "Hard work meets intelligent execution.",
    detail: "Engineering-led delivery, verified security boundaries, and zero speculative fluff.",
    start: 0.65,
    peak: 0.82,
    end: 0.96,
    align: "center"
  }
];

function calculateOpacity(progress: number, start: number, peak: number, end: number): number {
  if (progress < start || progress > end) return 0;

  if (start === peak) {
    const hold = 0.12;
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
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center px-6 sm:px-12 lg:px-20">
      <div className="w-full max-w-7xl mx-auto relative h-full flex items-center justify-center">
        {CHAPTERS.map((ch) => {
          const opacity = calculateOpacity(progress, ch.start, ch.peak, ch.end);
          if (opacity <= 0.01) return null;

          const yOffset = (1 - opacity) * 20;

          return (
            <div
              key={ch.id}
              className={`absolute transition-all duration-150 w-full flex flex-col ${
                ch.align === "left"
                  ? "items-start text-left left-0"
                  : ch.align === "right"
                  ? "items-end text-right right-0"
                  : "items-center text-center left-1/2 -translate-x-1/2"
              }`}
              style={{
                opacity,
                transform: `translateY(${yOffset}px)${ch.align === "center" ? " translateX(-50%)" : ""}`
              }}
            >
              {/* Massive Typographic Echo Stack (11vw / 180px) */}
              <div className="echo-stack font-clash text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-bold leading-[0.88] tracking-[-0.05em] mb-4 select-none drop-shadow-xl">
                {/* Layer 4: -0.16em offset in #d9d9d9 */}
                <span className="echo-layer echo-layer-4" aria-hidden="true">
                  {ch.echoWord}
                </span>
                {/* Layer 3: -0.12em offset in #d1d1d1 */}
                <span className="echo-layer echo-layer-3" aria-hidden="true">
                  {ch.echoWord}
                </span>
                {/* Layer 2: -0.08em offset in #c9c9c9 */}
                <span className="echo-layer echo-layer-2" aria-hidden="true">
                  {ch.echoWord}
                </span>
                {/* Layer 1: -0.04em offset in #bfbfbf */}
                <span className="echo-layer echo-layer-1" aria-hidden="true">
                  {ch.echoWord}
                </span>
                {/* Foreground layer */}
                <span className="echo-foreground text-[#f2f2f2] drop-shadow-2xl">
                  {ch.echoWord}
                </span>
              </div>

              {/* Swiss Subtitle Card */}
              <div className="max-w-xl p-5 sm:p-6 rounded-lg bg-[#111111]/85 backdrop-blur-md border border-white/10 shadow-2xl">
                <div className="inline-flex items-center gap-2 text-[11px] font-satoshi uppercase tracking-widest text-[#bfbfbf] mb-2 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f2f2f2]" />
                  <span>{ch.tag}</span>
                </div>
                <h3 className="font-clash text-xl sm:text-2xl text-[#f2f2f2] leading-snug mb-2 font-bold tracking-tight">
                  {ch.title}
                </h3>
                <p className="font-satoshi text-xs sm:text-sm text-[#b6b5b5] leading-relaxed">
                  {ch.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
