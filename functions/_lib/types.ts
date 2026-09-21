export interface Env {
  DB: D1Database;
  /** Secret. Without it, leads are still saved but no brochure email is sent. */
  RESEND_API_KEY?: string;
  /** Sender, e.g. "Cascade Residences <brochure@your-domain.com>". */
  EMAIL_FROM?: string;
}

export const LEAD_STATUSES = ["new", "contacted", "archived"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  source: string | null;
  user_agent: string | null;
  created_at: string;
  status: LeadStatus;
  brochure_sent_at: string | null;
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
