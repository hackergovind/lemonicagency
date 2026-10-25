"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/data/services";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    projectDescription: "",
    budgetRange: "",
    timeline: "",
    consent: false,
    _honeypot: ""
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  // Map query parameter safely to service selection
  useEffect(() => {
    if (initialService) {
      const match = SERVICES.find((s) => s.slug === initialService);
      if (match) {
        setFormData((prev) => ({ ...prev, service: match.title }));
      }
    }
  }, [initialService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear field-level error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmissionStatus("idle");
    setServerMessage("");
    setFieldErrors({});

    // Client-side quick check
    if (!formData.name.trim()) {
      setFieldErrors((prev) => ({ ...prev, name: ["Name is required"] }));
      setSubmitting(false);
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFieldErrors((prev) => ({ ...prev, email: ["A valid work email is required"] }));
      setSubmitting(false);
      return;
    }
    if (!formData.service) {
      setFieldErrors((prev) => ({ ...prev, service: ["Please select a service of interest"] }));
      setSubmitting(false);
      return;
    }
    if (formData.projectDescription.trim().length < 10) {
      setFieldErrors((prev) => ({
        ...prev,
        projectDescription: ["Please provide at least 10 characters describing your project"]
      }));
      setSubmitting(false);
      return;
    }
    if (!formData.consent) {
      setFieldErrors((prev) => ({
        ...prev,
        consent: ["You must agree to the processing of your enquiry"]
      }));
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmissionStatus("success");
        setServerMessage(data.message);
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          projectDescription: "",
          budgetRange: "",
          timeline: "",
          consent: false,
          _honeypot: ""
        });
      } else {
        setSubmissionStatus("error");
        setServerMessage(data.message || "Failed to submit enquiry.");
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      }
    } catch {
      setSubmissionStatus("error");
      setServerMessage("A network error occurred. Please reach out directly to hello@lemonic.tech.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#20211B] border border-[#2C2E26] rounded-xl p-6 sm:p-10 max-w-2xl mx-auto">
      {submissionStatus === "success" ? (
        <div className="py-12 text-center" role="status">
          <div className="w-12 h-12 rounded-full bg-[#DDF45B]/20 text-[#DDF45B] flex items-center justify-center mx-auto mb-4 text-xl">
            ✓
          </div>
          <h3 className="text-xl font-semibold text-[#F6F6F0] mb-2">
            Enquiry Received
          </h3>
          <p className="text-sm text-[#8E9085] max-w-md mx-auto mb-6">
            {serverMessage}
          </p>
          <button
            type="button"
            onClick={() => setSubmissionStatus("idle")}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] transition-colors"
          >
            Submit Another Note
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {submissionStatus === "error" && (
            <div
              className="p-4 rounded bg-red-950/40 border border-red-800/60 text-red-200 text-xs leading-relaxed"
              role="alert"
            >
              {serverMessage}
            </div>
          )}

          {/* Hidden Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="_honeypot">Leave this blank</label>
            <input
              type="text"
              id="_honeypot"
              name="_honeypot"
              value={formData._honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Name & Work Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono uppercase tracking-wider text-[#F6F6F0] mb-2"
              >
                Your Name <span className="text-[#DDF45B]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="w-full px-4 py-3 rounded bg-[#191A16] border border-[#2C2E26] text-sm text-[#F6F6F0] placeholder-[#8E9085]/60 focus:border-[#DDF45B] focus:outline-none transition-colors"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
              />
              {fieldErrors.name && (
                <p id="name-error" className="mt-1.5 text-xs text-red-400">
                  {fieldErrors.name[0]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-[#F6F6F0] mb-2"
              >
                Work Email <span className="text-[#DDF45B]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                className="w-full px-4 py-3 rounded bg-[#191A16] border border-[#2C2E26] text-sm text-[#F6F6F0] placeholder-[#8E9085]/60 focus:border-[#DDF45B] focus:outline-none transition-colors"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
              />
              {fieldErrors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-400">
                  {fieldErrors.email[0]}
                </p>
              )}
            </div>
          </div>

          {/* Company & Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="company"
                className="block text-xs font-mono uppercase tracking-wider text-[#F6F6F0] mb-2"
              >
                Company or Website
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Corp / acme.com"
                className="w-full px-4 py-3 rounded bg-[#191A16] border border-[#2C2E26] text-sm text-[#F6F6F0] placeholder-[#8E9085]/60 focus:border-[#DDF45B] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="block text-xs font-mono uppercase tracking-wider text-[#F6F6F0] mb-2"
              >
                Service of Interest <span className="text-[#DDF45B]">*</span>
              </label>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded bg-[#191A16] border border-[#2C2E26] text-sm text-[#F6F6F0] focus:border-[#DDF45B] focus:outline-none transition-colors"
                aria-invalid={Boolean(fieldErrors.service)}
                aria-describedby={fieldErrors.service ? "service-error" : undefined}
              >
                <option value="">Select a service line...</option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Not sure yet">Not sure yet / Multiple areas</option>
              </select>
              {fieldErrors.service && (
                <p id="service-error" className="mt-1.5 text-xs text-red-400">
                  {fieldErrors.service[0]}
                </p>
              )}
            </div>
          </div>

          {/* Budget & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="budgetRange"
                className="block text-xs font-mono uppercase tracking-wider text-[#F6F6F0] mb-2"
              >
                Budget Range
              </label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded bg-[#191A16] border border-[#2C2E26] text-sm text-[#F6F6F0] focus:border-[#DDF45B] focus:outline-none transition-colors"
              >
                <option value="">Flexible / Not decided</option>
                <option value="Under $10k">Under $10k</option>
                <option value="$10k - $25k">$10k - $25k</option>
                <option value="$25k - $50k">$25k - $50k</option>
                <option value="$50k+">$50k+</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="timeline"
                className="block text-xs font-mono uppercase tracking-wider text-[#F6F6F0] mb-2"
              >
                Desired Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded bg-[#191A16] border border-[#2C2E26] text-sm text-[#F6F6F0] focus:border-[#DDF45B] focus:outline-none transition-colors"
              >
                <option value="">Flexible</option>
                <option value="Immediately (within 2 weeks)">Immediately (within 2 weeks)</option>
                <option value="Within 1 - 2 months">Within 1 - 2 months</option>
                <option value="Planning for next quarter">Planning for next quarter</option>
              </select>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label
              htmlFor="projectDescription"
              className="block text-xs font-mono uppercase tracking-wider text-[#F6F6F0] mb-2"
            >
              Project or Problem Description <span className="text-[#DDF45B]">*</span>
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              required
              rows={4}
              value={formData.projectDescription}
              onChange={handleChange}
              placeholder="Outline your primary goals, current systems, technical requirements, and any known constraints..."
              className="w-full px-4 py-3 rounded bg-[#191A16] border border-[#2C2E26] text-sm text-[#F6F6F0] placeholder-[#8E9085]/60 focus:border-[#DDF45B] focus:outline-none transition-colors"
              aria-invalid={Boolean(fieldErrors.projectDescription)}
              aria-describedby={fieldErrors.projectDescription ? "desc-error" : undefined}
            />
            {fieldErrors.projectDescription && (
              <p id="desc-error" className="mt-1.5 text-xs text-red-400">
                {fieldErrors.projectDescription[0]}
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded bg-[#191A16] border-[#2C2E26] text-[#DDF45B] focus:ring-[#DDF45B]"
              aria-invalid={Boolean(fieldErrors.consent)}
            />
            <label htmlFor="consent" className="text-xs text-[#8E9085] leading-relaxed">
              I agree to the processing of this information to evaluate and respond to my project enquiry in accordance with the{" "}
              <Link href="/privacy" className="text-[#F6F6F0] hover:text-[#DDF45B] underline">
                Privacy Policy
              </Link>.
            </label>
          </div>
          {fieldErrors.consent && (
            <p className="text-xs text-red-400">
              {fieldErrors.consent[0]}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-[#191A16] bg-[#DDF45B] hover:bg-[#E8FA72] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {submitting ? "Transmitting Requirements..." : "Send Project Enquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
