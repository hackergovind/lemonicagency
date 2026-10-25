/**
 * Operational logger that masks personal identifiable information (PII)
 */
export function maskEmail(email: string): string {
  const parts = email.split("@");
  if (parts.length !== 2) return "***";
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : `${name[0]}***`;
  return `${maskedName}@${domain}`;
}

export function logEnquiry(action: string, email: string, service: string) {
  const safeEmail = maskEmail(email);
  const timestamp = new Date().toISOString();
  console.info(`[${timestamp}] [ENQUIRY_AUDIT] ${action} | Service: ${service} | Sender: ${safeEmail}`);
}
