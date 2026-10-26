"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What kinds of projects does Lemonic take on?",
    answer: "We engineer production web applications, MVPs, technical marketing infrastructure, workflow automations, and scoped security testing (VAPT & SOC triage). We take on projects ranging from targeted integration sprints to multi-month product engineering builds."
  },
  {
    question: "Can I enquire about one service or an integrated engagement?",
    answer: "You can enquire about a single focused service (such as a Next.js web application rebuild or a VAPT penetration test) or an integrated engagement (such as engineering a web platform alongside automated CRM workflows and security monitoring)."
  },
  {
    question: "What information should I include in a project enquiry?",
    answer: "Helpful details include your current technical stack, the business problem you are solving, any existing documentation or repositories, your target timeframe, and any known technical constraints or compliance requirements."
  },
  {
    question: "How is the scope of a security assessment (VAPT) agreed?",
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
    <section className="py-24 sm:py-36 border-b border-[#1e1e1e]/10 bg-[#f2f2f2] relative text-[#111111]">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1e1e1e]/15 bg-white text-xs font-satoshi uppercase tracking-widest text-[#111111] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            <span>CLARITY // FAQ</span>
          </div>
          <h2 className="font-clash text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.05em] text-[#111111]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const num = String(index + 1).padStart(2, "0");

            return (
              <div
                key={index}
                className="border border-[#1e1e1e]/10 bg-white rounded-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-6 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-4">
                    <span className="font-clash text-sm text-[#838282] font-bold">
                      [{num}]
                    </span>
                    <span className="font-clash text-lg sm:text-xl font-bold text-[#111111] tracking-tight">
                      {faq.question}
                    </span>
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full border border-[#1e1e1e]/15 flex items-center justify-center font-satoshi text-base font-bold text-[#111111] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-45 bg-[#111111] text-[#f2f2f2]" : "bg-transparent"
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-7 sm:px-7 sm:pb-8 pt-0 font-satoshi text-sm sm:text-base text-[#838282] leading-relaxed border-t border-[#1e1e1e]/5">
                    <p className="pt-4">{faq.answer}</p>
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
