import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delivery Approach & Standards",
  description: "How Lemonic.tech scopes, tests, deploys, and transfers ownership of digital products, automations, and security evaluations."
};

export default function ApproachPage() {
  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-[#191A16] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20211B] border border-[#2C2E26] text-xs font-mono tracking-widest text-[#DDF45B] mb-6">
            <span>METHODOLOGY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#F6F6F0] mb-6">
            Structured delivery with clear engineering boundaries.
          </h1>
          <p className="text-base sm:text-lg text-[#8E9085] leading-relaxed">
            Software projects fail when scopes are vague, assumptions are undocumented, and handovers are rushed. Our approach is grounded in disciplined technical planning, testable acceptance criteria, and full transparency.
          </p>
        </div>

        {/* 1. What we need before estimating */}
        <div className="mb-16 p-8 rounded-xl bg-[#20211B] border border-[#2C2E26]">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F6F6F0] mb-4">
            1. Information Required Before Work Is Estimated
          </h2>
          <p className="text-xs sm:text-sm text-[#8E9085] leading-relaxed mb-6">
            We do not guess timelines or provide arbitrary ballparks without understanding technical realities. Before quoting an engagement, we review:
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-[#F6F6F0]/90">
            <li className="flex items-start gap-2.5">
              <span className="text-[#DDF45B] mt-0.5">•</span>
              <span><strong>The Problem & Constraints:</strong> Specific business bottlenecks, user requirements, and mandatory completion deadlines.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#DDF45B] mt-0.5">•</span>
              <span><strong>Existing Infrastructure:</strong> Codebase state, API documentation, hosting environments, and access permissions.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#DDF45B] mt-0.5">•</span>
              <span><strong>Acceptance Criteria:</strong> Objective metrics or tests that confirm a feature or security evaluation is complete.</span>
            </li>
          </ul>
        </div>

        {/* 2. Documenting Scope, Exclusions, & Changes */}
        <div className="mb-16 p-8 rounded-xl bg-[#20211B] border border-[#2C2E26]">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F6F6F0] mb-4">
            2. Scope Documentation & Change Management
          </h2>
          <p className="text-xs sm:text-sm text-[#8E9085] leading-relaxed mb-4">
            Every engagement operates under a written Functional Specification detailing in-scope deliverables and explicit non-goals.
          </p>
          <div className="space-y-4 text-xs sm:text-sm text-[#8E9085] leading-relaxed">
            <p>
              <strong>When requirements evolve:</strong> If new requirements emerge during development, we do not ignore them or let them derail deadlines. We draft a lightweight Change Order describing the technical impact, timeline adjustment, and any cost difference, requiring written approval before execution.
            </p>
            <p>
              <strong>Dependencies:</strong> External third-party blockers (such as delayed client credentials or third-party API outages) are documented in weekly progress summaries.
            </p>
          </div>
        </div>

        {/* 3. Security Work Authorization */}
        <div className="mb-16 p-8 rounded-xl bg-[#20211B] border border-[#2C2E26]">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F6F6F0] mb-4">
            3. Authorization Framework for Security Services (VAPT & SOC)
          </h2>
          <p className="text-xs sm:text-sm text-[#8E9085] leading-relaxed mb-4">
            Security assessments require strict legal and ethical discipline. Before running scans or conducting manual penetration tests:
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-[#F6F6F0]/90">
            <li className="flex items-start gap-2.5">
              <span className="text-[#DDF45B] mt-0.5">•</span>
              <span><strong>Signed Rules of Engagement (RoE):</strong> Confirms your legal authority to commission testing on specified domains, subnets, and APIs.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#DDF45B] mt-0.5">•</span>
              <span><strong>Safe Testing Windows:</strong> Mutually agreed hours and notification channels to avoid disrupting business operations.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#DDF45B] mt-0.5">•</span>
              <span><strong>Exclusions:</strong> Strictly prohibits denial-of-service, social engineering, or targeting third-party cloud infrastructure outside target ownership.</span>
            </li>
          </ul>
        </div>

        {/* 4. Complete Handover */}
        <div className="mb-16 p-8 rounded-xl bg-[#20211B] border border-[#2C2E26]">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#F6F6F0] mb-4">
            4. Handover & Post-Launch Support
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-[#8E9085] leading-relaxed">
            <p>
              <strong>Ownership Transfer:</strong> Upon final settlement, we transfer full Git repository access, deployment credentials, environment variable configurations, and automated pipeline ownership.
            </p>
            <p>
              <strong>Warranty Period:</strong> We include a 30-day post-launch warranty on all in-scope code to triage any unanticipated edge-case defects.
            </p>
            <p>
              <strong>Ongoing Support:</strong> Following launch, clients can transition to structured monthly retainers for security patching, dependency upgrades, and ongoing iterative feature builds.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-10 rounded-xl bg-[#20211B] border border-[#2C2E26] text-center">
          <h3 className="text-xl font-semibold text-[#F6F6F0] mb-3">
            Have a project to discuss?
          </h3>
          <p className="text-sm text-[#8E9085] max-w-md mx-auto mb-6">
            Let us evaluate your business objectives and prepare a clear functional scope.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] transition-colors"
          >
            Initiate a Scoping Conversation
          </Link>
        </div>
      </div>
    </div>
  );
}
