"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesOverview() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Geometric icons for Swiss aesthetic
  const icons = [
    // 01: Web Dev (Grid / Rect)
    <svg key="1" className="w-6 h-6 stroke-[#111111]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>,
    // 02: App Dev (Phone / Layers)
    <svg key="2" className="w-6 h-6 stroke-[#111111]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <circle cx="12" cy="18" r="1" fill="#111111" />
    </svg>,
    // 03: Marketing (Crosshair / Target)
    <svg key="3" className="w-6 h-6 stroke-[#111111]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>,
    // 04: SEO (Compass / Diamond)
    <svg key="4" className="w-6 h-6 stroke-[#111111]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
      <polygon points="12 2 19 21 12 17 5 21 12 2" />
    </svg>,
    // 05: Software (Terminal / Cube)
    <svg key="5" className="w-6 h-6 stroke-[#111111]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>,
    // 06: AI Automation (Circuit / Hexagon)
    <svg key="6" className="w-6 h-6 stroke-[#111111]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>,
    // 07: SOC (Shield)
    <svg key="7" className="w-6 h-6 stroke-[#111111]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>,
    // 08: VAPT (Keyhole / Cross)
    <svg key="8" className="w-6 h-6 stroke-[#111111]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
      <circle cx="12" cy="10" r="3" />
      <path d="M12 13v5M10 18h4" />
      <rect x="4" y="4" width="16" height="16" rx="4" />
    </svg>,
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".service-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
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
      id="services"
      className="relative bg-[#f2f2f2] border-b border-[#1e1e1e]/10 py-24 sm:py-36 text-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1e1e1e]/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1e1e1e]/15 bg-white text-xs font-satoshi uppercase tracking-widest text-[#111111] font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span>DISCIPLINES // 08 CAPABILITIES</span>
            </div>
            <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.05em] text-[#111111]">
              Bespoke Services
            </h2>
          </div>
          <p className="font-satoshi text-sm sm:text-base text-[#838282] max-w-md mt-4 md:mt-0 leading-relaxed">
            Swiss precision across architecture, automations, and defense. Strict inclusion boundaries and verified deliverables.
          </p>
        </div>

        {/* 3-Column Grid of Bespoke Service Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {SERVICES.map((service, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <div
                key={service.slug}
                className="service-card group relative bg-transparent hover:bg-white border border-[#1e1e1e]/10 p-8 sm:p-9 rounded-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
              >
                <div>
                  {/* Top row: Number and 64x64px rotating geometric icon container */}
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-clash text-lg font-bold text-[#838282] tracking-tight">
                      [{num}]
                    </span>
                    <div className="w-16 h-16 rounded-sm border border-[#1e1e1e]/10 bg-white group-hover:bg-[#f2f2f2] flex items-center justify-center transition-transform duration-500 ease-out group-hover:rotate-12 shadow-sm">
                      {icons[index % icons.length]}
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="font-clash text-2xl font-bold text-[#111111] tracking-tight mb-3 group-hover:text-black leading-snug">
                    {service.title}
                  </h3>
                  <p className="font-satoshi text-sm text-[#838282] leading-relaxed mb-8">
                    {service.summary}
                  </p>
                </div>

                {/* Bottom CTA with arrow-right in tracking-wide bold Satoshi */}
                <div className="pt-6 border-t border-[#1e1e1e]/10 flex items-center justify-between">
                  <span className="font-satoshi text-xs uppercase tracking-widest text-[#838282] font-semibold">
                    {service.shortTitle || "Specification"}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 font-satoshi text-xs font-bold uppercase tracking-wider text-[#111111] group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Spec</span>
                    <svg className="w-3.5 h-3.5 stroke-[#111111]" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
