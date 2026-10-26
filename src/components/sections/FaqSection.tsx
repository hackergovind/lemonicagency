"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What kinds of projects can Lemonic.tech take on?",
    answer: "We engineer production web applications, MVPs, technical marketing infrastructure, workflow automations, and scoped security testing (VAPT & SOC triage). We take on projects ranging from targeted integration sprints to multi-month product engineering builds."
  },
  {
    question: "Can I enquire about one service or a combination of services?",
    answer: "You can enquire about a single focused service (such as a VAPT penetration test or a Next.js website rebuild) or an integrated engagement (such as building a web app alongside automated CRM workflows and security monitoring)."
  },
  {
    question: "What information should I include in a project enquiry?",
    answer: "Helpful details include your current technical stack, the business problem you are solving, any existing documentation or repositories, your target timeframe, and any known technical constraints or compliance requirements."
  },
  {
    question: "How is the scope of a VAPT engagement agreed?",
    answer: "We execute a mutual Rules of Engagement (RoE) document defining target domains, IP addresses, APIs, testing windows, safe testing constraints, and authorized communication contacts before conducting any tests."
  },
  {
    question: "Can existing systems and tools be connected through automation?",
    answer: "Yes. As long as your existing software provides an API, webhook support, database access, or structured export capabilities, we can build reliable event-driven automations connecting them."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Yes. All production deployments include a 30-day warranty for in-scope code. Following launch, we offer structured maintenance retainers for security patches, infrastructure monitoring, and ongoing feature iterations."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (faqListRef.current) {
        gsap.fromTo(
          faqListRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: faqListRef.current,
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
      className="py-24 sm:py-32 md:py-40 border-b border-[#2C2E26] bg-[#191A16]"
      id="faq"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#DDF45B] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DDF45B] animate-pulse" />
            <span>Direct Answers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#F6F6F0]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-[#8E9085] font-sans">
            Straightforward details on engagement boundaries, communication, and delivery.
          </p>
        </div>

        <div ref={faqListRef} className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-xl bg-[#20211B] border border-[#2C2E26] overflow-hidden transition-all duration-300 hover:border-[#DDF45B]/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#DDF45B]"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg sm:text-xl text-[#F6F6F0] font-normal leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full bg-[#2C2E26] flex items-center justify-center text-[#DDF45B] shrink-0 text-sm font-mono transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-[#DDF45B] text-[#191A16]" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#8E9085] leading-relaxed border-t border-[#2C2E26]/40 font-sans">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
