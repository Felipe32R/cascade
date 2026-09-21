import { useCallback, useEffect, useMemo, useState } from "react";

const STATUSES = ["new", "contacted", "archived"] as const;
type Status = (typeof STATUSES)[number];

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  created_at: string;
  status: Status;
  brochure_sent_at: string | null;
};

const formatDate = (value: string) =>
  // D1 stores UTC as "YYYY-MM-DD HH:MM:SS"; show it in the viewer's local time.
  new Date(`${value.replace(" ", "T")}Z`).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

/** Lead list for the sales team. Lives behind Cloudflare Access at /admin. */
export function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [status, setStatus] = useState<Status | "">("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useMemo(() => {
    const p = new URLSearchParams();
    if (status) p.set("status", status);
    if (query.trim()) p.set("q", query.trim());
    return p.toString();
  }, [status, query]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/leads?${params}`);
      if (!response.ok) throw new Error(response.status === 401 ? "You are not signed in." : "Could not load leads.");
      const data = (await response.json()) as { leads: Lead[] };
      setLeads(data.leads);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load leads.");
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    const t = window.setTimeout(load, 250);
    return () => window.clearTimeout(t);
  }, [load]);

  const updateStatus = async (lead: Lead, next: Status) => {
    setLeads((all) => all.map((l) => (l.id === lead.id ? { ...l, status: next } : l)));
    const response = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: lead.id, status: next }),
    });
    if (!response.ok) {
      setLeads((all) => all.map((l) => (l.id === lead.id ? { ...l, status: lead.status } : l)));
      setError("Could not update the status. Please try again.");
    }
  };

  return (
    <main className="admin">
      <header className="admin__head">
        <div>
          <p className="label">Cascade Residences</p>
          <h1 className="display display--md">Leads</h1>
        </div>
        <a className="btn btn--solid" href={`/api/admin/export?${params}`}>
          Export CSV
        </a>
      </header>

      <div className="admin__toolbar">
        <input
          className="admin__search"
          type="search"
          placeholder="Search name, email or phone"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="admin__select" value={status} onChange={(e) => setStatus(e.target.value as Status | "")}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="caption admin__count">
          {loading ? "Loading…" : `${leads.length} ${leads.length === 1 ? "lead" : "leads"}`}
        </span>
      </div>

      {error ? (
        <p className="admin__error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="admin__table-wrap">
        <table className="admin__table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Interest</th>
              <th>Brochure</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className={`is-${lead.status}`}>
                <td data-label="Date">{formatDate(lead.created_at)}</td>
                <td data-label="Name">{lead.name}</td>
                <td data-label="Email">
                  <a href={`mailto:${lead.email}`}>{lead.email}</a>
                </td>
                <td data-label="Phone">{lead.phone ? <a href={`tel:${lead.phone}`}>{lead.phone}</a> : "—"}</td>
                <td data-label="Interest">{lead.interest ?? "—"}</td>
                <td data-label="Brochure" title={lead.brochure_sent_at ? formatDate(lead.brochure_sent_at) : undefined}>
                  {lead.brochure_sent_at ? "Sent" : <span className="admin__muted">Not sent</span>}
                </td>
                <td data-label="Status">
                  <select
                    className="admin__select admin__select--inline"
                    value={lead.status}
                    onChange={(e) => updateStatus(lead, e.target.value as Status)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && !leads.length && !error ? <p className="admin__empty body-text">No leads yet.</p> : null}
      </div>
    </main>
  );
}
