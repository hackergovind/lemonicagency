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
      },
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

  // GSAP ScrollTrigger tracking with silky smooth scrub
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
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentChapter = progress < 0.33 ? 1 : progress < 0.66 ? 2 : 3;
  const hudOpacity = progress > 0.94 ? Math.max(0, 1 - (progress - 0.94) / 0.05) : 1;

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-[#0e0e0e]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Top Vignette Gradient: Blends behind the navigation */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/85 via-black/40 to-transparent z-10 pointer-events-none" />

        {/* Scrubber Canvas Stage (WebP frames from L:\agency) */}
        <CanvasScrubber progress={progress} introProgress={introProgress} />

        {/* Stage Captions: Clean, Centered, Legible */}
        <StageCaptions progress={progress} />

        {/* Bottom Dark Vignette during video playback: Preserves video clarity without milky haze */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />

        {/* Bottom White Bridge: Cross-fades into #f2f2f2 ONLY at the very end of scroll */}
        <div
          className="absolute bottom-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-t from-[#f2f2f2] via-[#f2f2f2]/85 to-transparent z-10 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: progress < 0.82 ? 0 : Math.min(1, (progress - 0.82) / 0.16),
          }}
        />

        {/* Floating Scroll Prompt */}
        <div
          className={`absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 flex flex-col items-center gap-2 pointer-events-none ${
            progress < 0.08 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="text-[11px] font-satoshi tracking-[0.25em] text-white/90 font-bold uppercase px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-xl">
            Scroll to explore
          </span>
          <svg
            className="w-4 h-4 animate-bounce text-white/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Bottom Stage Telemetry HUD: Sleek dark glass aesthetic */}
        <div
          className="absolute bottom-0 inset-x-0 z-30 max-w-7xl mx-auto px-6 sm:px-10 pb-5 sm:pb-6 flex items-center justify-between text-xs text-white font-satoshi pointer-events-none transition-opacity duration-300"
          style={{ opacity: hudOpacity }}
        >
          <div className="flex items-center gap-3">
            <span className="font-clash font-bold tracking-tight text-white flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
              CH [0{currentChapter}/03]
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              {[1, 2, 3].map((ch) => (
                <div
                  key={ch}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    ch === currentChapter
                      ? "w-8 bg-white"
                      : ch < currentChapter
                      ? "w-2.5 bg-white/50"
                      : "w-2.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-satoshi text-xs font-semibold uppercase tracking-wider text-white/90 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-lg">
              SCRUB: {(progress * 100).toFixed(0)}%
            </span>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white text-white hover:text-black transition-all text-xs font-semibold uppercase tracking-wider pointer-events-auto backdrop-blur-md shadow-lg"
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
