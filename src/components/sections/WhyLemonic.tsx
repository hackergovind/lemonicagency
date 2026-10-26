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
      className="py-24 sm:py-36 border-b border-[#1e1e1e]/10 bg-[#f2f2f2] relative overflow-hidden text-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1e1e1e]/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1e1e1e]/15 bg-white text-xs font-satoshi uppercase tracking-widest text-[#111111] font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span>PRINCIPLES // STANDARDS</span>
            </div>
            <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.05em] text-[#111111]">
              Operating Standards
            </h2>
          </div>
          <p className="font-satoshi text-sm sm:text-base text-[#838282] max-w-md mt-4 md:mt-0 leading-relaxed">
            Concrete practices we hold ourselves to on every engagement. No vague marketing adjectives.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {commitments.map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-sm bg-transparent hover:bg-white border border-[#1e1e1e]/10 transition-all duration-300 flex flex-col justify-between hover:shadow-lg hover:shadow-black/5"
            >
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="font-clash text-sm font-bold text-[#838282]">
                    [0{index + 1}]
                  </span>
                  <span className="text-[11px] font-satoshi uppercase tracking-widest text-[#838282] font-semibold">
                    STANDARD
                  </span>
                </div>
                <h3 className="font-clash text-2xl font-bold text-[#111111] mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="font-satoshi text-sm text-[#838282] leading-relaxed">
                  {item.detail}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#1e1e1e]/10 text-[11px] font-satoshi uppercase tracking-widest font-bold text-[#111111]">
                Enforced on All Builds
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
