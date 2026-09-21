import type { Env, Lead } from "../../_lib/types";
import { leadFilters } from "./leads";

const COLUMNS = ["created_at", "name", "email", "phone", "interest", "status", "brochure_sent_at", "source"] as const;

const cell = (value: unknown) => {
  const text = value == null ? "" : String(value);
  // Quote every cell; prefix formula-like values so spreadsheets don't execute them.
  // Plain numbers such as "+1 876 555 0100" are left alone.
  const isNumber = /^[+-]?[\d\s().-]+$/.test(text);
  const safe = !isNumber && /^[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
};

/** CSV export of the (optionally filtered) leads, for mailing tools and spreadsheets. */
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const { where, params } = leadFilters(new URL(request.url));
  const { results } = await env.DB.prepare(`SELECT * FROM leads ${where} ORDER BY created_at DESC, id DESC`)
    .bind(...params)
    .all<Lead>();

  const rows = [COLUMNS.join(","), ...results.map((lead) => COLUMNS.map((c) => cell(lead[c])).join(","))];
  const date = new Date().toISOString().slice(0, 10);

  // BOM so Excel opens UTF-8 names correctly.
  return new Response("﻿" + rows.join("\r\n"), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="cascade-leads-${date}.csv"`,
      "cache-control": "no-store",
    },
  });
};
