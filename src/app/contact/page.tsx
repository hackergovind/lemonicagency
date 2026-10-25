import { Suspense } from "react";
import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Project Enquiries",
  description: "Discuss your web development, automation, or cybersecurity project with the Lemonic.tech engineering team."
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-[#191A16] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20211B] border border-[#2C2E26] text-xs font-mono tracking-widest text-[#DDF45B] mb-6">
            <span>PROJECT ENQUIRY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F6F6F0] mb-4">
            Discuss your technical requirements.
          </h1>
          <p className="text-sm sm:text-base text-[#8E9085] leading-relaxed">
            Every submission is reviewed directly by an engineer. We evaluate project scope, technical feasibility, and architectural requirements before scheduling a scoping call.
          </p>
        </div>

        {/* Suspense-wrapped form */}
        <Suspense
          fallback={
            <div className="p-12 text-center text-xs font-mono text-[#8E9085] bg-[#20211B] rounded-xl border border-[#2C2E26]">
              Initializing contact form...
            </div>
          }
        >
          <ContactForm />
        </Suspense>

        {/* Alternate direct contact info */}
        <div className="mt-12 text-center text-xs text-[#8E9085] space-y-1">
          <p>
            Prefer direct email? Reach our engineering team at{" "}
            <a href="mailto:hello@lemonic.tech" className="text-[#F6F6F0] hover:text-[#DDF45B] underline">
              hello@lemonic.tech
            </a>
          </p>
          <p>We typically review and respond within 1–2 business days.</p>
        </div>
      </div>
    </div>
  );
}
