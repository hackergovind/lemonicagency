"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DeliveryProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const laserTrackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: "01",
      title: "Understand",
      tagline: "Problem definition & infrastructure inventory",
      summary: "Define the core problem, user requirements, technical constraints, infrastructure access, and measurable success criteria.",
      checks: [
        "Inventory existing tools, codebases, and databases",
        "Document authentication and permission boundaries",
        "Clarify target timelines and internal stakeholder roles"
      ]
    },
    {
      step: "02",
      title: "Scope",
      tagline: "Written specifications & boundary signoff",
      summary: "Agree on explicit deliverables, technical exclusions, external dependencies, review milestones, and intellectual property ownership.",
      checks: [
        "Establish functional specifications and data schemas",
        "Define non-goals to prevent project creep",
        "Formalize security Rules of Engagement (for VAPT/SOC)"
      ]
    },
    {
      step: "03",
      title: "Build or Assess",
      tagline: "Continuous verification & staged checkpoints",
      summary: "Implement the agreed software, automations, or security evaluations systematically with test coverage and staged review checkpoints.",
      checks: [
        "Continuous type-checking, linting, and automated testing",
        "Staging environment deployments for client verification",
        "Safe, non-destructive methodologies on authorized perimeters"
      ]
    },
    {
      step: "04",
      title: "Handover & Support",
      tagline: "100% IP transfer & operational runbooks",
      summary: "Transfer repository ownership, environment configurations, reproducible vulnerability findings, and agreed documentation.",
      checks: [
        "Comprehensive code and configuration handover",
        "Operational runbooks for ongoing team maintenance",
        "Agreed post-launch warranty or support retainers"
      ]
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || !stepsContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate laser line growing with scroll
      if (laserTrackRef.current) {
        gsap.fromTo(
          laserTrackRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: "top 75%",
              end: "bottom 85%",
              scrub: true,
              onUpdate: (self) => {
                const s = Math.min(4, Math.floor(self.progress * 4) + 1);
                setActiveStep(s);
              }
            }
          }
        );
      }

      // Staggered cards entrance with scroll
      const cards = stepsContainerRef.current?.querySelectorAll(".process-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-36 border-b border-[#1e1e1e]/10 bg-[#f2f2f2] relative overflow-hidden text-[#111111]"
      id="process"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1e1e1e]/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1e1e1e]/15 bg-white text-xs font-satoshi uppercase tracking-widest text-[#111111] font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span>LIFECYCLE // STAGE 0{activeStep} OF 04</span>
            </div>
            <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.05em] text-[#111111]">
              How Engagements Proceed
            </h2>
          </div>
          <p className="font-satoshi text-sm sm:text-base text-[#838282] max-w-md mt-4 md:mt-0 leading-relaxed">
            A disciplined, 4-stage engineering lifecycle focused on risk reduction, testable criteria, and verified deliverables.
          </p>
        </div>

        {/* Scroll-Scrubbed Conduit */}
        <div className="relative mb-12 hidden lg:block">
          <div className="h-[1px] w-full bg-[#1e1e1e]/10" />
          <div
            ref={laserTrackRef}
            className="absolute top-0 inset-x-0 h-[2px] bg-[#111111] origin-left scale-x-0 shadow-sm"
          />
        </div>

        {/* 4 Process Cards */}
        <div
          ref={stepsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((st, index) => {
            const isActive = activeStep === index + 1;

            return (
              <div
                key={st.step}
                className={`process-card group relative p-7 sm:p-8 rounded-sm border transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? "bg-white border-[#111111] shadow-xl shadow-black/5 -translate-y-1.5"
                    : "bg-transparent border-[#1e1e1e]/10 hover:bg-white hover:border-[#1e1e1e]/30"
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#111111] text-[#f2f2f2] font-satoshi text-[10px] font-bold uppercase rounded-bl-sm tracking-wider">
                    ACTIVE
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`text-3xl font-clash font-bold transition-colors ${
                        isActive ? "text-[#111111]" : "text-[#838282]"
                      }`}
                    >
                      {st.step}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isActive ? "bg-[#111111]" : "bg-[#838282]/30"}`} />
                  </div>

                  <h3 className="font-clash text-2xl font-bold text-[#111111] mb-2 leading-snug">
                    {st.title}
                  </h3>

                  <p className="text-[11px] font-satoshi text-[#838282] uppercase tracking-wider mb-4 font-semibold">
                    {st.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#838282] leading-relaxed mb-6 font-satoshi">
                    {st.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1e1e1e]/10">
                  <p className="text-[10px] font-satoshi uppercase tracking-wider text-[#111111] font-bold mb-3">
                    Verification Points:
                  </p>
                  <ul className="space-y-2 text-xs text-[#111111]/80 font-satoshi">
                    {st.checks.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#111111] text-xs mt-0.5">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
