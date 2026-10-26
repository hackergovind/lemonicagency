"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ManifestoSection() {
  const containerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !quoteRef.current) return;

    const ctx = gsap.context(() => {
      // Quote entrance
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3-Column Grid entrance
      const columns = gridRef.current?.querySelectorAll(".narrative-col");
      if (columns && columns.length > 0) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
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
      id="philosophy"
      className="relative bg-[#f2f2f2] border-b border-[#1e1e1e]/10 py-28 sm:py-36 text-[#111111]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Vertical Hairline Divider leading into the section (1px #1e1e1e/10) */}
        <div className="w-[1px] h-20 bg-[#1e1e1e]/20 mx-auto mb-10" />

        {/* Section Pill */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1e1e1e]/15 bg-white text-[12px] font-satoshi uppercase tracking-widest text-[#111111] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            PHILOSOPHY // 01
          </span>
        </div>

        {/* Large-scale Quote (4xl to 7xl) using Clash Display + contrasting serif italic keyword */}
        <div className="text-center max-w-5xl mx-auto mb-20 sm:mb-24">
          <h2
            ref={quoteRef}
            className="font-clash text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.05em] leading-[0.95] text-[#111111]"
          >
            Digital systems engineered to{" "}
            <span className="font-serif-italic font-normal text-[#838282] lowercase">
              endure
            </span>
            , built around your business.
          </h2>
        </div>

        {/* 3-Column Informational Grid with 32px gaps (#1e1e1e/10 hairline borders) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#1e1e1e]/10"
        >
          <div className="narrative-col flex flex-col justify-between">
            <div>
              <div className="text-xs font-satoshi uppercase tracking-widest text-[#838282] font-semibold mb-3">
                [01 / PRINCIPLE]
              </div>
              <h3 className="font-clash text-2xl font-bold text-[#111111] mb-3 tracking-tight">
                Zero Fluff Engineering
              </h3>
              <p className="font-satoshi text-sm sm:text-base text-[#838282] leading-relaxed">
                We discard bloated themes, cookie-cutter templates, and speculative gimmicks. Every platform is architected in strictly typed Next.js with sub-second performance.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#1e1e1e]/10 text-xs font-satoshi uppercase tracking-wider text-[#111111] font-bold">
              Production Verified
            </div>
          </div>

          <div className="narrative-col flex flex-col justify-between">
            <div>
              <div className="text-xs font-satoshi uppercase tracking-widest text-[#838282] font-semibold mb-3">
                [02 / PRINCIPLE]
              </div>
              <h3 className="font-clash text-2xl font-bold text-[#111111] mb-3 tracking-tight">
                Deterministic Automation
              </h3>
              <p className="font-satoshi text-sm sm:text-base text-[#838282] leading-relaxed">
                We bridge your disconnected CRM, databases, and fulfillment pipelines. Autonomous background systems replace repetitive busywork with human review gates.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#1e1e1e]/10 text-xs font-satoshi uppercase tracking-wider text-[#111111] font-bold">
              Fail-Safe Execution
            </div>
          </div>

          <div className="narrative-col flex flex-col justify-between">
            <div>
              <div className="text-xs font-satoshi uppercase tracking-widest text-[#838282] font-semibold mb-3">
                [03 / PRINCIPLE]
              </div>
              <h3 className="font-clash text-2xl font-bold text-[#111111] mb-3 tracking-tight">
                Complete IP Ownership
              </h3>
              <p className="font-satoshi text-sm sm:text-base text-[#838282] leading-relaxed">
                Zero proprietary lock-in or subscription licensing gates. On delivery, 100% of Git repositories, database schemas, and infrastructure runbooks transfer to you.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#1e1e1e]/10 text-xs font-satoshi uppercase tracking-wider text-[#111111] font-bold">
              100% Client Handover
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
