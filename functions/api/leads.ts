import { contact } from "../../src/content/site";
import { sendBrochureEmail } from "../_lib/brochure-email";
import { json, type Env } from "../_lib/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INTERESTS: readonly string[] = contact.interests;

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

/** Public endpoint the contact form posts to. */
export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: humans never see this field, so a value means a bot. Pretend it worked.
  if (clean(body.company, 200)) return json({ ok: true }, 201);

  const name = clean(body.name, 120);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);
  const interest = clean(body.interest, 60);
  const source = clean(body.source, 300);

  if (!name) return json({ error: "Please enter your name." }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: "Please enter a valid email." }, 400);
  if (interest && !INTERESTS.includes(interest)) return json({ error: "Invalid interest." }, 400);

  const { meta } = await env.DB.prepare(
    "INSERT INTO leads (name, email, phone, interest, source, user_agent) VALUES (?, ?, ?, ?, ?, ?)",
  )
    .bind(name, email, phone || null, interest || null, source || null, request.headers.get("user-agent")?.slice(0, 300) ?? null)
    .run();

  // Send after responding, so the visitor isn't kept waiting on the email provider.
  waitUntil(sendBrochureEmail(env, new URL(request.url).origin, { id: meta.last_row_id, name, email }));

  return json({ ok: true }, 201);
};
