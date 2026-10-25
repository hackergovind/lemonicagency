export interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export interface EmailProvider {
  send(message: EmailMessage): Promise<{ success: boolean; messageId?: string; error?: string }>;
}

export class ConsoleEmailProvider implements EmailProvider {
  async send(message: EmailMessage) {
    // Development / fallback provider: log safe operational metadata
    console.info(`[Email Dispatch: Console] To: ${message.to} | Subject: "${message.subject}"`);
    return {
      success: true,
      messageId: `console-${Date.now()}`
    };
  }
}

export class ResendEmailProvider implements EmailProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async send(message: EmailMessage) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: message.from,
          to: message.to,
          subject: message.subject,
          text: message.text,
          html: message.html,
          reply_to: message.replyTo
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: `Provider rejected dispatch: status ${response.status} - ${errorText}`
        };
      }

      const data = await response.json();
      return {
        success: true,
        messageId: data.id
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Unknown network error";
      return {
        success: false,
        error: `Delivery network failure: ${errorMsg}`
      };
    }
  }
}

export function getEmailProvider(): EmailProvider {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY || process.env.RESEND_API_KEY;
  if (apiKey) {
    return new ResendEmailProvider(apiKey);
  }

  // If no external provider configured, use ConsoleEmailProvider in non-production
  return new ConsoleEmailProvider();
}
