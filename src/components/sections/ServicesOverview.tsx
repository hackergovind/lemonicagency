"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesOverview() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Capabilities", count: 8 },
    { id: "engineering", label: "Engineering", count: 3, slugs: ["web-development", "app-development", "software-development"] },
    { id: "growth", label: "Growth & SEO", count: 2, slugs: ["digital-marketing", "seo-optimization"] },
    { id: "systems", label: "AI & Security", count: 3, slugs: ["ai-automation", "cybersecurity", "bug-hunting"] },
  ];

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === "all") return true;
    const cat = categories.find((c) => c.id === activeCategory);
    return cat?.slugs?.includes(service.slug);
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Staggered cards entrance animation
      const cards = gridRef.current?.querySelectorAll(".service-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.07,
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
  }, [activeCategory]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 border-b border-[#2C2E26] bg-[#191A16] overflow-hidden"
      id="services"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#DDF45B]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20211B] border border-[#383A32] text-xs font-mono tracking-widest text-[#DDF45B] mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DDF45B] animate-pulse" />
              <span>CAPABILITIES SPECTRUM // 08 DISCIPLINES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F6F6F0] tracking-tight">
              Core Service Lines
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#C2C4B8] max-w-md font-sans">
            Each service operates with written specifications, explicit inclusion boundaries, and verified deliverables.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-4 border-b border-[#2C2E26]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? "bg-[#DDF45B] text-[#191A16] font-semibold shadow-lg shadow-[#DDF45B]/20 scale-105"
                  : "bg-[#20211B] text-[#A8AAA0] hover:text-[#F6F6F0] border border-[#383A32] hover:border-[#DDF45B]/50 hover:bg-[#262821]"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.id
                    ? "bg-[#191A16]/20 text-[#191A16] font-bold"
                    : "bg-[#2C2E26] text-[#A8AAA0]"
                }`}
              >
                0{cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* 8-Card Interactive Responsive Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {filteredServices.map((service) => {
            const globalIndex = SERVICES.findIndex((s) => s.slug === service.slug) + 1;
            return (
              <div
                key={service.slug}
                onMouseMove={handleMouseMove}
                className="service-card group relative bg-[#20211B] border border-[#383A32] hover:border-[#DDF45B] p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#DDF45B]/15 overflow-hidden shadow-lg shadow-black/40"
              >
                {/* Subtle top accent highlight */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#DDF45B]/30 to-transparent group-hover:via-[#DDF45B] transition-colors" />

                {/* Dynamic radial mouse glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(400px circle at var(--mouse-x, 100px) var(--mouse-y, 100px), rgba(221, 244, 91, 0.12), transparent 70%)",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs text-[#DDF45B] tracking-wider font-bold">
                      [{globalIndex < 10 ? `0${globalIndex}` : globalIndex}]
                    </span>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-[#DDF45B] px-2 py-0.5 rounded-full bg-[#191A16] border border-[#383A32] group-hover:border-[#DDF45B]/60 transition-colors">
                      {service.shortTitle || "Spec"}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-[#F6F6F0] mb-3 group-hover:text-[#DDF45B] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#C2C4B8] leading-relaxed mb-6 font-sans">
                    {service.summary}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-[#2C2E26] flex flex-col gap-3">
                  <div className="text-[11px] font-mono text-[#A8AAA0] leading-snug">
                    <span className="text-[#DDF45B] mr-1.5 font-bold">✓</span>
                    <span>{service.problemsSolved[0]?.slice(0, 68)}...</span>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center justify-between text-xs font-mono font-semibold text-[#F6F6F0] group-hover:text-[#DDF45B] transition-colors pt-2 border-t border-[#2C2E26]/50"
                  >
                    <span>View Specifications</span>
                    <span className="transform transition-transform group-hover:translate-x-1.5 text-[#DDF45B] font-bold">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Standard Highlights */}
        <div className="mt-16 pt-10 border-t border-[#2C2E26] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DDF45B] shadow-sm shadow-[#DDF45B]" />
            <span className="text-xs font-mono text-[#C2C4B8]">
              <strong className="text-[#F6F6F0]">100% Written Scope</strong> on every proposal
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DDF45B] shadow-sm shadow-[#DDF45B]" />
            <span className="text-xs font-mono text-[#C2C4B8]">
              <strong className="text-[#F6F6F0]">Direct Senior Engineers</strong> — no layers
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DDF45B] shadow-sm shadow-[#DDF45B]" />
            <span className="text-xs font-mono text-[#C2C4B8]">
              <strong className="text-[#F6F6F0]">Full Git Handover</strong> with zero lock-in
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
