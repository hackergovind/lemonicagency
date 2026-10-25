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
    // If page is already scrolled past top, jump straight to 1
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

  // GSAP ScrollTrigger tracking
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
        <CanvasScrubber progress={progress} introProgress={introProgress} />

        {/* Stage Captions */}
        <StageCaptions progress={progress} />

        {/* Bottom Vignette Gradient */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#191A16] via-[#191A16]/80 to-transparent z-10 pointer-events-none" />

        {/* Bottom Stage Telemetry HUD & Scroll Indicator */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 flex items-center justify-between text-xs text-[#8E9085] font-mono">
          <div className="flex items-center gap-4">
            <span className="text-[#DDF45B] font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DDF45B] animate-ping inline-block" />
              CHAPTER [0{currentChapter}/04]
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              {[1, 2, 3, 4].map((ch) => (
                <div
                  key={ch}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    ch === currentChapter
                      ? "w-8 bg-[#DDF45B]"
                      : ch < currentChapter
                      ? "w-3 bg-[#DDF45B]/40"
                      : "w-3 bg-[#2C2E26]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Scroll Invitation (visible at landing) */}
          <div
            className={`transition-all duration-500 flex items-center gap-2 text-xs font-mono text-[#DDF45B] ${
              progress < 0.08 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <span className="tracking-widest">SCROLL TO EXPLORE</span>
            <svg
              className="w-4 h-4 animate-bounce text-[#DDF45B]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-[#8E9085]">
              SCRUB TELEMETRY: {(progress * 100).toFixed(1)}%
            </span>
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2C2E26] bg-[#20211B]/80 hover:bg-[#2C2E26] text-[#F6F6F0] transition-colors"
            >
              <span>Scope Project</span>
              <span className="text-[#DDF45B]">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
