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
  const [introProgress, setIntroProgress] = useState(0);

  // Initial power-on boot sequence on page load
  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollY > 15) {
      setIntroProgress(1);
      return;
    }

    const state = { p: 0 };
    const tween = gsap.to(state, {
      p: 1,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        setIntroProgress(state.p);
      }
    });

    const onScroll = () => {
      if (window.scrollY > 5) {
        tween.kill();
        setIntroProgress(1);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      tween.kill();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // GSAP ScrollTrigger tracking with 1.0s silky smooth inertia scrub
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.0, // Silky smooth inertia scrub for high-fps 24fps frames
        onUpdate: (self) => {
          setProgress(self.progress);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentChapter =
    progress < 0.25 ? 1 : progress < 0.5 ? 2 : progress < 0.75 ? 3 : 4;

  // Finishing calculation: fade out telemetry smoothly before the section ends
  const hudOpacity = progress > 0.90 ? Math.max(0, 1 - (progress - 0.90) / 0.08) : 1;

  return (
    <section ref={containerRef} className="relative h-[360vh] bg-[#191A16]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Top Vignette Gradient */}
        <div className="absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-[#191A16] via-[#191A16]/60 to-transparent z-10 pointer-events-none" />

        {/* Scrubber Canvas Stage (Procedural or WebP frames) */}
        <CanvasScrubber progress={progress} introProgress={introProgress} />

        {/* Stage Captions */}
        <StageCaptions progress={progress} />

        {/* Bottom Vignette Gradient: Seamless bridge into Manifesto */}
        <div className="absolute bottom-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-t from-[#191A16] via-[#191A16]/80 to-transparent z-10 pointer-events-none" />

        {/* Floating Scroll Prompt (Visible on Landing) */}
        <div
          className={`absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 flex flex-col items-center gap-1.5 pointer-events-none ${
            progress < 0.08 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#DDF45B] font-medium uppercase drop-shadow">
            Scroll to explore
          </span>
          <svg
            className="w-4 h-4 animate-bounce text-[#DDF45B]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Bottom Stage Telemetry HUD: Gracefully dissolves out near 100% so it never collides with next section */}
        <div
          className="absolute bottom-0 inset-x-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 flex items-center justify-between text-[11px] sm:text-xs text-[#8E9085] font-mono pointer-events-none transition-opacity duration-300"
          style={{ opacity: hudOpacity }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[#DDF45B] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DDF45B] animate-ping inline-block" />
              CH [0{currentChapter}/04]
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              {[1, 2, 3, 4].map((ch) => (
                <div
                  key={ch}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    ch === currentChapter
                      ? "w-7 bg-[#DDF45B]"
                      : ch < currentChapter
                      ? "w-2.5 bg-[#DDF45B]/40"
                      : "w-2.5 bg-[#2C2E26]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#8E9085]">
              SCRUB: {(progress * 100).toFixed(0)}%
            </span>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#2C2E26] bg-[#20211B]/80 hover:bg-[#2C2E26] text-[#F6F6F0] transition-colors text-xs pointer-events-auto"
            >
              <span>Scope</span>
              <span className="text-[#DDF45B]">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
