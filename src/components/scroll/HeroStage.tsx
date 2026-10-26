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
      duration: 1.0,
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
        scrub: 1.0,
        onUpdate: (self) => {
          setProgress(self.progress);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentChapter = progress < 0.35 ? 1 : progress < 0.70 ? 2 : 3;
  const hudOpacity = progress > 0.92 ? Math.max(0, 1 - (progress - 0.92) / 0.06) : 1;

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-[#111111]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Top Vignette Gradient */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#111111]/90 to-transparent z-10 pointer-events-none" />

        {/* Scrubber Canvas Stage (WebP frames from L:\agency) */}
        <CanvasScrubber progress={progress} introProgress={introProgress} />

        {/* Stage Captions with massive Echo Stack */}
        <StageCaptions progress={progress} />

        {/* Bottom Vignette Gradient: Seamless bridge into Swiss #f2f2f2 background */}
        <div className="absolute bottom-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-t from-[#f2f2f2] via-[#f2f2f2]/60 to-transparent z-10 pointer-events-none" />

        {/* Floating Scroll Prompt */}
        <div
          className={`absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 flex flex-col items-center gap-2 pointer-events-none ${
            progress < 0.08 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="text-[11px] font-satoshi tracking-[0.25em] text-[#111111] font-bold uppercase px-3 py-1 rounded-full bg-[#f2f2f2]/90 backdrop-blur-sm border border-[#1e1e1e]/15 shadow-md">
            Scroll to explore
          </span>
          <svg
            className="w-4 h-4 animate-bounce text-[#111111]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Bottom Stage Telemetry HUD */}
        <div
          className="absolute bottom-0 inset-x-0 z-30 max-w-7xl mx-auto px-6 sm:px-10 pb-5 sm:pb-6 flex items-center justify-between text-xs text-[#111111] font-satoshi pointer-events-none transition-opacity duration-300"
          style={{ opacity: hudOpacity }}
        >
          <div className="flex items-center gap-3">
            <span className="font-clash font-bold tracking-tight text-[#111111] flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2f2f2]/90 backdrop-blur-md border border-[#1e1e1e]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] animate-ping inline-block" />
              CH [0{currentChapter}/03]
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              {[1, 2, 3].map((ch) => (
                <div
                  key={ch}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    ch === currentChapter
                      ? "w-8 bg-[#111111]"
                      : ch < currentChapter
                      ? "w-2.5 bg-[#111111]/40"
                      : "w-2.5 bg-[#1e1e1e]/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-satoshi text-xs font-semibold uppercase tracking-wider text-[#111111] px-3 py-1 rounded-full bg-[#f2f2f2]/90 backdrop-blur-md border border-[#1e1e1e]/10">
              SCRUB: {(progress * 100).toFixed(0)}%
            </span>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1e1e1e] bg-[#111111] hover:bg-transparent text-[#f2f2f2] hover:text-[#111111] transition-all text-xs font-semibold uppercase tracking-wider pointer-events-auto"
            >
              <span>Scope</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
