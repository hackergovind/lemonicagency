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
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: "top 75%",
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
      className="py-24 sm:py-32 md:py-40 border-b border-[#2C2E26] bg-[#191A16] relative overflow-hidden"
      id="process"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#2C2E26]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#DDF45B] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DDF45B] animate-pulse" />
              <span>DELIVERY PIPELINE // STAGE 0{activeStep} OF 04</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#F6F6F0]">
              How Engagements Proceed
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-[#8E9085] max-w-md font-sans">
            A disciplined, 4-stage engineering lifecycle focused on risk reduction, testable criteria, and verified deliverables.
          </p>
        </div>

        {/* Scroll-Scrubbed Laser Conduit */}
        <div className="relative mb-12 hidden lg:block">
          <div className="h-[2px] w-full bg-[#2C2E26]" />
          <div
            ref={laserTrackRef}
            className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#DDF45B] via-[#E8FA72] to-[#DDF45B] origin-left scale-x-0 shadow-lg shadow-[#DDF45B]/40"
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
                className={`process-card group relative p-7 sm:p-8 rounded-2xl bg-[#20211B] border transition-all duration-500 flex flex-col justify-between overflow-hidden ${
                  isActive
                    ? "border-[#DDF45B] shadow-xl shadow-[#DDF45B]/10 -translate-y-2"
                    : "border-[#2C2E26] hover:border-[#DDF45B]/50 hover:-translate-y-1"
                }`}
              >
                {/* Active Stage Pulsing Highlight */}
                {isActive && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#DDF45B] text-[#191A16] font-mono text-[10px] font-bold uppercase rounded-bl-xl tracking-wider">
                    ACTIVE STAGE
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`text-3xl font-mono font-bold transition-colors ${
                        isActive ? "text-[#DDF45B]" : "text-[#8E9085]"
                      }`}
                    >
                      {st.step}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DDF45B]/30 group-hover:bg-[#DDF45B] transition-colors" />
                  </div>

                  <h3 className="font-display text-2xl font-normal text-[#F6F6F0] group-hover:text-[#DDF45B] transition-colors mb-2 leading-snug">
                    {st.title}
                  </h3>

                  <p className="text-[11px] font-mono text-[#DDF45B] uppercase tracking-wider mb-4">
                    {st.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#8E9085] leading-relaxed mb-6 font-sans">
                    {st.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2C2E26]">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#8E9085] mb-3">
                    Verification Points:
                  </p>
                  <ul className="space-y-2 text-xs text-[#F6F6F0]/85 font-sans">
                    {st.checks.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#DDF45B] text-xs mt-0.5">•</span>
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
