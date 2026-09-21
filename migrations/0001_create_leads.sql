-- Leads captured by the contact form on the home page.
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interest TEXT,
  source TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL DEFAULT 'new' -- new | contacted | archived
);

CREATE INDEX idx_leads_created_at ON leads (created_at);
CREATE INDEX idx_leads_status ON leads (status);
