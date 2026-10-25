"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasScrubber from "./CanvasScrubber";
import StageCaptions from "./StageCaptions";
import Link from "next/link";

export default function HeroStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          setProgress(self.progress);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentChapter =
    progress < 0.25 ? 1 : progress < 0.5 ? 2 : progress < 0.75 ? 3 : 4;

  return (
    <section ref={containerRef} className="relative h-[380vh] bg-[#191A16]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Top Vignette Gradient */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#191A16] to-transparent z-10 pointer-events-none" />

        {/* Scrubber Canvas Stage (Procedural or WebP frames) */}
        <CanvasScrubber progress={progress} />

        {/* Stage Captions */}
        <StageCaptions progress={progress} />

        {/* Bottom Vignette Gradient */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#191A16] via-[#191A16]/80 to-transparent z-10 pointer-events-none" />

        {/* Bottom Stage Telemetry HUD */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 flex items-center justify-between text-xs text-[#8E9085] font-mono">
          <div className="flex items-center gap-4">
            <span className="text-[#DDF45B] font-semibold">
              CHAPTER [0{currentChapter}/04]
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    step === currentChapter
                      ? "w-8 bg-[#DDF45B]"
                      : step < currentChapter
                      ? "w-3 bg-[#8E9085]"
                      : "w-3 bg-[#2C2E26]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-[#8E9085]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DDF45B] animate-pulse" />
              <span>SCRUB TELEMETRY: {(progress * 100).toFixed(1)}%</span>
            </div>
            <Link
              href="/contact"
              className="px-3 py-1.5 rounded-full border border-[#2C2E26] hover:border-[#DDF45B] hover:text-[#F6F6F0] bg-[#20211B]/80 backdrop-blur transition-colors pointer-events-auto"
            >
              Start Consultation →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
