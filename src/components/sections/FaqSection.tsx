"use client";

import { useState } from "react";

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

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 border-b border-[#2C2E26] bg-[#191A16]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#DDF45B] uppercase mb-3">
            <span>Direct Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F6F6F0]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-[#8E9085]">
            Straightforward details on engagement boundaries, communication, and delivery.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-lg bg-[#20211B] border border-[#2C2E26] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-[#F6F6F0] hover:text-[#DDF45B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DDF45B]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="text-xs font-mono text-[#DDF45B] shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#8E9085] leading-relaxed border-t border-[#2C2E26]/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
