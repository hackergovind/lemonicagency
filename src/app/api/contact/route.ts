import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getEmailProvider } from "@/lib/email/adapter";
import { logEnquiry } from "@/lib/email/logger";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please provide a valid email address").max(120),
  company: z.string().trim().max(100).optional().default(""),
  service: z.string().trim().min(1, "Please select a service"),
  projectDescription: z.string().trim().min(10, "Please describe your project in at least 10 characters").max(3000),
  budgetRange: z.string().trim().max(50).optional().default(""),
  timeline: z.string().trim().max(50).optional().default(""),
  consent: z.literal(true, {
    message: "You must accept the processing of your enquiry"
  }),
  _honeypot: z.string().optional()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Honeypot check: automated spam bots fill invisible fields
    if (body._honeypot && body._honeypot.trim().length > 0) {
      console.warn("[Spam Blocked] Honeypot trap triggered.");
      return NextResponse.json({ success: false, message: "Submission rejected" }, { status: 400 });
    }

    // 2. Validate payload schema
    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      const formattedErrors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: "Please correct the highlighted fields",
          errors: formattedErrors
        },
        { status: 422 }
      );
    }

    const data = parseResult.data;

    // 3. Prepare email dispatch
    const toEmail = process.env.CONTACT_TO_EMAIL || "hello@lemonic.tech";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@lemonic.tech";

    const emailSubject = `[Project Enquiry] ${data.service} - ${data.name}`;
    const emailBody = `
New Project Enquiry Received:

- Name: ${data.name}
- Work Email: ${data.email}
- Company/Website: ${data.company || "Not provided"}
- Service of Interest: ${data.service}
- Budget Range: ${data.budgetRange || "Flexible / Not decided"}
- Desired Timeline: ${data.timeline || "Flexible"}

Project Description:
${data.projectDescription}

Submitted at: ${new Date().toISOString()}
`.trim();

    const provider = getEmailProvider();
    const result = await provider.send({
      to: toEmail,
      from: fromEmail,
      subject: emailSubject,
      text: emailBody,
      replyTo: data.email
    });

    if (!result.success) {
      console.error("[Email Dispatch Failure]", result.error);
      return NextResponse.json(
        {
          success: false,
          message: "We encountered an issue submitting your message. Please contact us directly at hello@lemonic.tech."
        },
        { status: 503 }
      );
    }

    logEnquiry("DELIVERED_SUCCESSFULLY", data.email, data.service);

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been received. Our engineering team will review your specifications."
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    console.error("[Contact API Exception]", errorMsg);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your enquiry."
      },
      { status: 500 }
    );
  }
}
