"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhyLemonic() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const commitments = [
    {
      title: "Full Code & Asset Ownership",
      detail: "Upon project completion and invoice settlement, all repository code, schemas, and configurations belong entirely to your company. No proprietary lock-in or licensing gates."
    },
    {
      title: "Strict Written Boundaries",
      detail: "For security assessments and SOC triage, we work exclusively within explicit, signed Rules of Engagement. We define test windows and safe testing constraints before executing any commands."
    },
    {
      title: "Type Safety & Automated Verification",
      detail: "We write clean, strictly typed TypeScript with unit and integration test coverage. Core workflows are tested against simulated failures before deployment."
    },
    {
      title: "Documented Operational Runbooks",
      detail: "Every project concludes with environment documentation, build steps, webhook mapping, and troubleshooting procedures so your team can maintain the system independently."
    },
    {
      title: "Deterministic AI Guardrails",
      detail: "We deploy language models with strict schema validators, confidence thresholds, and human review gates for consequential actions. We never assume AI output is automatically correct."
    },
    {
      title: "Honest Commercial Reporting",
      detail: "We provide truthful technical reports, CVSS vulnerability severity ratings, and accurate telemetry. We never invent metrics, falsify uptime, or promise guaranteed search rankings."
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 md:py-40 border-b border-[#2C2E26] bg-[#191A16] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#2C2E26]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20211B] border border-[#383A32] text-xs font-mono tracking-widest text-[#DDF45B] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DDF45B] animate-pulse" />
              <span>Operating Principles</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#F6F6F0]">
              Working Standards
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-[#C2C4B8] max-w-md font-sans">
            Concrete practices we hold ourselves to on every engagement. No vague marketing adjectives.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {commitments.map((item, index) => (
            <div
              key={index}
              className="group p-7 rounded-2xl bg-[#20211B] border border-[#383A32] hover:border-[#DDF45B] transition-all duration-300 flex flex-col justify-start hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#DDF45B]/10 shadow-lg shadow-black/40"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#DDF45B] group-hover:scale-125 transition-transform" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#DDF45B] font-semibold">
                  Standard [0{index + 1}]
                </span>
              </div>
              <h3 className="font-display text-2xl font-normal text-[#F6F6F0] group-hover:text-[#DDF45B] transition-colors mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#C2C4B8] leading-relaxed font-sans">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
