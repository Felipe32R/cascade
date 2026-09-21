import { LEAD_STATUSES, json, type Env, type Lead, type LeadStatus } from "../../_lib/types";

/** Builds the WHERE clause shared by the list and the CSV export. */
export function leadFilters(url: URL): { where: string; params: string[] } {
  const clauses: string[] = [];
  const params: string[] = [];

  const status = url.searchParams.get("status");
  if (status && LEAD_STATUSES.includes(status as LeadStatus)) {
    clauses.push("status = ?");
    params.push(status);
  }

  const q = url.searchParams.get("q")?.trim();
  if (q) {
    clauses.push("(name LIKE ? OR email LIKE ? OR phone LIKE ?)");
    const like = `%${q}%`;
    params.push(like, like, like);
  }

  return { where: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", params };
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const { where, params } = leadFilters(new URL(request.url));
  const { results } = await env.DB.prepare(`SELECT * FROM leads ${where} ORDER BY created_at DESC, id DESC`)
    .bind(...params)
    .all<Lead>();
  return json({ leads: results });
};

export const onRequestPatch: PagesFunction<Env> = async ({ request, env }) => {
  let body: { id?: unknown; status?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const id = Number(body.id);
  if (!Number.isInteger(id) || !LEAD_STATUSES.includes(body.status as LeadStatus)) {
    return json({ error: "Invalid id or status." }, 400);
  }

  const { meta } = await env.DB.prepare("UPDATE leads SET status = ? WHERE id = ?").bind(body.status, id).run();
  if (!meta.changes) return json({ error: "Lead not found." }, 404);
  return json({ ok: true });
};
