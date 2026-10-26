"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesOverview() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !trackRef.current) return;

    // Only apply horizontal scroll pinning on desktop (lg: >= 1024px)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      if (!track) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth + 120;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          pin: true,
          scrub: 1.0,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          }
        }
      });

      tl.to(track, {
        x: -totalScrollWidth,
        ease: "none"
      });

      if (progressBarRef.current) {
        tl.to(
          progressBarRef.current,
          {
            scaleX: 1,
            ease: "none"
          },
          0
        );
      }
    });

    // Mobile / Tablet vertical scroll entrance animation
    mm.add("(max-width: 1023px)", () => {
      const cards = trackRef.current?.querySelectorAll(".service-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

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
      className="relative min-h-screen bg-[#191A16] border-b border-[#2C2E26] overflow-hidden flex flex-col justify-between py-16 lg:py-20"
      id="services"
    >
      {/* Top Header Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 lg:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#2C2E26]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#DDF45B] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DDF45B] animate-pulse" />
              <span>CAPABILITIES SPECTRUM // 08 DISCIPLINES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#F6F6F0]">
              Core Service Lines
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <p className="text-sm md:text-base text-[#8E9085] max-w-md font-sans mb-1">
              Each service operates with written specifications, explicit inclusion boundaries, and verified deliverables.
            </p>
            <span className="hidden lg:inline-block text-[11px] font-mono text-[#DDF45B]">
              [SCROLL TO GLIDE THROUGH CAPABILITIES]
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track (Desktop) / Vertical Grid (Mobile) */}
      <div className="w-full flex-grow flex items-center overflow-visible px-4 sm:px-6 lg:px-12">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-6 w-full lg:w-max items-stretch"
        >
          {SERVICES.map((service, index) => {
            const indexString = String(index + 1).padStart(2, "0");

            return (
              <div
                key={service.slug}
                onMouseMove={handleMouseMove}
                className="service-card group relative p-7 sm:p-8 rounded-2xl bg-[#20211B] border border-[#2C2E26] hover:border-[#DDF45B]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl hover:shadow-[#DDF45B]/5 w-full lg:w-[420px] shrink-0"
              >
                {/* Radial Cursor Spotlight Layer */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(221, 244, 91, 0.08), transparent 40%)`
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between text-xs font-mono text-[#8E9085] mb-6">
                    <span className="text-[#DDF45B] font-semibold text-sm group-hover:scale-110 transition-transform inline-block">
                      [{indexString}]
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#A8AAA0] px-2.5 py-1 rounded bg-[#191A16] border border-[#2C2E26]">
                      {service.shortTitle}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#F6F6F0] group-hover:text-[#DDF45B] transition-colors mb-4 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#8E9085] leading-relaxed mb-6 font-sans">
                    {service.summary}
                  </p>

                  <div className="pt-4 border-t border-[#2C2E26] mb-6">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#8E9085] mb-2">
                      Primary Problem Solved:
                    </p>
                    <p className="text-xs text-[#F6F6F0]/90 leading-relaxed font-sans">
                      {service.problemsSolved[0]}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="relative z-10 inline-flex items-center justify-between text-xs font-mono text-[#DDF45B] group-hover:text-[#E8FA72] pt-4 border-t border-[#2C2E26]/50 transition-all"
                >
                  <span className="tracking-widest uppercase">Explore Capability</span>
                  <span className="transform group-hover:translate-x-2 transition-transform text-base">
                    →
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Horizontal Scrub Telemetry (Desktop) */}
      <div className="hidden lg:block max-w-7xl mx-auto px-8 w-full mt-8">
        <div className="flex items-center justify-between text-xs font-mono text-[#8E9085] mb-2">
          <span className="text-[#DDF45B]">
            DISCIPLINE [0{Math.min(8, Math.floor(scrollProgress * 8) + 1)}/08]
          </span>
          <span>
            SPECTRUM PROGRESS: {(scrollProgress * 100).toFixed(0)}%
          </span>
        </div>
        <div className="h-[2px] w-full bg-[#2C2E26] rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#DDF45B]/40 to-[#DDF45B] origin-left scale-x-0"
          />
        </div>
      </div>
    </section>
  );
}
