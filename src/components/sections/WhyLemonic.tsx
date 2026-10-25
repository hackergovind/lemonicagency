export default function WhyLemonic() {
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

  return (
    <section className="py-24 md:py-32 border-b border-[#2C2E26] bg-[#191A16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#2C2E26]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#DDF45B] uppercase mb-3">
              <span>Operating Principles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F6F6F0]">
              Working Standards
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-[#8E9085] max-w-md">
            Concrete practices we hold ourselves to on every engagement. No vague marketing adjectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commitments.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-[#20211B] border border-[#2C2E26] flex flex-col justify-start"
            >
              <div className="w-2 h-2 rounded-full bg-[#DDF45B] mb-4" />
              <h3 className="text-base font-semibold text-[#F6F6F0] mb-2.5">
                {item.title}
              </h3>
              <p className="text-xs text-[#8E9085] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
