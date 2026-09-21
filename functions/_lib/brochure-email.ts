import { brand } from "../../src/content/site";
import type { Env } from "./types";

export const BROCHURE_PATH = "/brochure/cascade-residences-brochure.pdf";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function render(name: string, brochureUrl: string, siteUrl: string) {
  const firstName = name.split(/\s+/)[0];
  const subject = `Your ${brand.name} brochure`;

  const text = [
    `Dear ${firstName},`,
    "",
    `Thank you for your interest in ${brand.name}, ${brand.location}.`,
    "",
    `Download the full brochure here: ${brochureUrl}`,
    "",
    "A member of our team will be in touch shortly. If you have any questions in the meantime, simply reply to this email.",
    "",
    `${brand.name}`,
    siteUrl,
  ].join("\n");

  const n = escapeHtml(firstName);
  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f6f3ec;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f3ec;">
      <tr>
        <td align="center" style="padding:48px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;font-family:Helvetica,Arial,sans-serif;color:#191e1c;">
            <tr>
              <td style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8d938f;padding-bottom:28px;">
                ${escapeHtml(brand.name)} &middot; ${escapeHtml(brand.location)}
              </td>
            </tr>
            <tr>
              <td style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.25;padding-bottom:24px;">
                Your brochure is ready
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.7;color:#5b625f;padding-bottom:32px;">
                Dear ${n},<br /><br />
                Thank you for your interest in ${escapeHtml(brand.name)}. The full brochure, with the
                residences, floor plans and amenities, is available at the link below.
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:36px;">
                <a href="${brochureUrl}" style="display:inline-block;background:#191e1c;color:#f6f3ec;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:16px 28px;">
                  Download the brochure
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.7;color:#5b625f;padding-bottom:40px;border-bottom:1px solid #e2ded4;">
                A member of our team will be in touch shortly. If you have any questions in the
                meantime, simply reply to this email.
              </td>
            </tr>
            <tr>
              <td style="font-size:12px;line-height:1.7;color:#8d938f;padding-top:20px;">
                <a href="${siteUrl}" style="color:#8d938f;">${escapeHtml(new URL(siteUrl).host)}</a>
                &middot; <a href="mailto:${brand.email}" style="color:#8d938f;">${brand.email}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}

/**
 * Emails the brochure link to a new lead through Resend and records when it was sent.
 * Never throws: a failed email must not lose the lead, which is already stored.
 */
export async function sendBrochureEmail(env: Env, origin: string, lead: { id: number; name: string; email: string }) {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    console.warn("Brochure email skipped: RESEND_API_KEY or EMAIL_FROM is not set.");
    return;
  }

  const { subject, text, html } = render(lead.name, `${origin}${BROCHURE_PATH}`, `${origin}/`);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
        // Resend dedupes retries with the same key for 24h.
        "idempotency-key": `brochure-lead-${lead.id}`,
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: [lead.email],
        reply_to: brand.email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error(`Brochure email failed for lead ${lead.id}: ${response.status} ${await response.text()}`);
      return;
    }

    await env.DB.prepare("UPDATE leads SET brochure_sent_at = datetime('now') WHERE id = ?").bind(lead.id).run();
  } catch (err) {
    console.error(`Brochure email failed for lead ${lead.id}:`, err);
  }
}
