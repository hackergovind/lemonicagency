export default function DeliveryProcess() {
  const steps = [
    {
      step: "01",
      title: "Understand",
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
      summary: "Transfer repository ownership, environment configurations, reproducible vulnerability findings, and agreed documentation.",
      checks: [
        "Comprehensive code and configuration handover",
        "Operational runbooks for ongoing team maintenance",
        "Agreed post-launch warranty or support retainers"
      ]
    }
  ];

  return (
    <section className="py-24 md:py-32 border-b border-[#2C2E26] bg-[#191A16]" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#2C2E26]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#DDF45B] uppercase mb-3">
              <span>Delivery Framework</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F6F6F0]">
              How Engagements Proceed
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-[#8E9085] max-w-md">
            A disciplined, 4-stage engineering lifecycle focused on risk reduction, testable criteria, and verified deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div
              key={st.step}
              className="p-6 rounded-lg bg-[#20211B] border border-[#2C2E26] flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-mono font-bold text-[#DDF45B] mb-3">
                  {st.step}
                </div>
                <h3 className="text-lg font-semibold text-[#F6F6F0] mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-[#8E9085] leading-relaxed mb-6">
                  {st.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#2C2E26]">
                <p className="text-[10px] font-mono uppercase text-[#8E9085] mb-2">
                  Key Verification Points:
                </p>
                <ul className="space-y-1.5 text-xs text-[#F6F6F0]/80">
                  {st.checks.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#DDF45B] text-[10px] mt-0.5">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
