-- Migration 009: Create inquiries table with email delivery tracking
-- The inquiries table was never created on the remote D1, so /api/inquiries
-- and the get-quote flow silently failed to persist enquiries.
-- This creates it with email_sent + email_sent_at so the admin Enquiries
-- panel can show whether the quote-notification email was delivered.

CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  company TEXT DEFAULT '',
  service TEXT DEFAULT '',
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'new',
  notes TEXT DEFAULT '',
  email_sent INTEGER DEFAULT 0,
  email_sent_at TEXT DEFAULT '',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);
