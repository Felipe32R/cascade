-- When the brochure email was accepted by Resend; NULL if not sent (or sending failed).
ALTER TABLE leads ADD COLUMN brochure_sent_at TEXT;
