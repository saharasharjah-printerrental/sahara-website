// Resend HTTP API transport — the failover path when Gmail SMTP (worker-mailer
// over cloudflare:sockets) throws. Plain fetch, no SDK needed, so it stays
// edge-safe without any webpack externals wrangling.
export interface ResendConfig {
  apiKey: string;
  fromName: string;
  fromEmail: string;
}

export async function sendViaResend(
  config: ResendConfig,
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${config.fromName} <${config.fromEmail}>`,
      to: [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend API ${res.status}: ${body.slice(0, 300)}`);
  }
}
