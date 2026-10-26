"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AsymmetricalShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".showcase-card");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="relative bg-[#f2f2f2] border-b border-[#1e1e1e]/10 py-24 sm:py-32 overflow-hidden text-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1e1e1e]/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1e1e1e]/15 bg-white text-xs font-satoshi uppercase tracking-widest text-[#111111] font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span>SHOWCASE // ASYMMETRICAL EDITORIAL</span>
            </div>
            <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.05em] text-[#111111]">
              Selected Artifacts
            </h2>
          </div>
          <p className="font-satoshi text-sm sm:text-base text-[#838282] max-w-md mt-4 md:mt-0 leading-relaxed">
            High-contrast visual executions. Micro-interactions utilize 700ms cubic-bezier reveals and scale transformations.
          </p>
        </div>

        {/* 12-Column Asymmetrical Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* 1. Large 8-column rectangular card with rounded-sm corners */}
          <div className="showcase-card md:col-span-8 group relative bg-white border border-[#1e1e1e]/10 rounded-sm overflow-hidden p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="relative h-72 sm:h-96 w-full rounded-sm overflow-hidden mb-6 bg-[#111111]">
              <Image
                src="/frames/hero/frame_0001.webp"
                alt="Creative Direction & Digital Architecture"
                fill
                className="object-cover grayscale-[0.20] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#111111]/80 backdrop-blur-sm text-[11px] font-satoshi uppercase tracking-widest text-[#f2f2f2] font-semibold rounded-full border border-white/10">
                01 / BRAND SYSTEM
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-clash text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                  Unconventional Digital Presences
                </h3>
                <p className="font-satoshi text-xs sm:text-sm text-[#838282] mt-1">
                  Bold editorial styling engineered to make premium brands stand out.
                </p>
              </div>
              <span className="font-satoshi text-xs uppercase tracking-wider font-bold text-[#111111] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Explore <span>→</span>
              </span>
            </div>
          </div>

          {/* 2. Vertical 4-column pill-shaped card (height: 500px, rounded-full, center overlay) */}
          <div className="showcase-card md:col-span-4 group relative h-[500px] rounded-full overflow-hidden border border-[#1e1e1e]/15 shadow-sm bg-[#111111]">
            <Image
              src="/frames/hero/frame_0180.webp"
              alt="Pill-shaped Vertical Showcase"
              fill
              className="object-cover grayscale-[0.20] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
            />
            {/* Center Circular Overlay that becomes visible on hover */}
            <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
              <div className="w-40 h-40 rounded-full border border-white/60 bg-[#111111]/85 backdrop-blur-md flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-95 group-hover:scale-100">
                <span className="font-satoshi text-[11px] uppercase tracking-widest text-[#bfbfbf] font-semibold">
                  ARTIFACT // 02
                </span>
                <span className="font-clash text-base font-bold text-[#f2f2f2] mt-1">
                  The Creative Spark
                </span>
                <span className="font-satoshi text-[10px] text-[#d9d9d9] mt-1 underline">
                  View Detail
                </span>
              </div>
            </div>
          </div>

          {/* 3. Circular 5-column aspect-square image */}
          <div className="showcase-card md:col-span-5 flex justify-center">
            <div className="group relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border border-[#1e1e1e]/15 shadow-md bg-[#111111]">
              <Image
                src="/frames/hero/frame_0300.webp"
                alt="Automated Systems & Workflows"
                fill
                className="object-cover grayscale-[0.20] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-satoshi text-xs uppercase tracking-widest font-bold text-[#f2f2f2] px-4 py-1.5 rounded-full bg-[#111111] border border-white/20">
                  03 / Deterministic Core
                </span>
              </div>
            </div>
          </div>

          {/* 4. Wide 7-column rectangle */}
          <div className="showcase-card md:col-span-7 group relative bg-white border border-[#1e1e1e]/10 rounded-sm overflow-hidden p-6 sm:p-8 shadow-sm">
            <div className="relative h-64 sm:h-80 w-full rounded-sm overflow-hidden mb-6 bg-[#111111]">
              <Image
                src="/frames/hero/frame_0500.webp"
                alt="Smart Strategy & Delivery"
                fill
                className="object-cover grayscale-[0.20] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#111111]/80 backdrop-blur-sm text-[11px] font-satoshi uppercase tracking-widest text-[#f2f2f2] font-semibold rounded-full border border-white/10">
                04 / STRATEGY
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-clash text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                  Hard Work Meets Smart Strategy
                </h3>
                <p className="font-satoshi text-xs sm:text-sm text-[#838282] mt-1">
                  Turning digital vision into measurable commercial outcomes.
                </p>
              </div>
              <span className="font-satoshi text-xs uppercase tracking-wider font-bold text-[#111111] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Explore <span>→</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
