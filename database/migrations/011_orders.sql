-- Migration 011: Orders table for the spare-parts checkout
-- Stores each placed order: customer + delivery details, line items (JSON),
-- totals, fulfilment status, and payment reference.

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  ref TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT DEFAULT '',
  customer_phone TEXT DEFAULT '',
  customer_company TEXT DEFAULT '',
  delivery_address TEXT DEFAULT '',
  emirate TEXT DEFAULT '',
  preferred_date TEXT DEFAULT '',
  instructions TEXT DEFAULT '',
  items TEXT DEFAULT '[]',
  subtotal REAL DEFAULT 0,
  total REAL DEFAULT 0,
  status TEXT DEFAULT 'pending',
  payment_provider TEXT DEFAULT '',
  payment_ref TEXT DEFAULT '',
  email_sent INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_ref ON orders(ref);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
