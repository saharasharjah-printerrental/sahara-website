-- Records which transport actually delivered each email (smtp | resend),
-- so Admin -> Inquiries/Orders can show whether Gmail SMTP or the Resend
-- fallback handled a given message.
ALTER TABLE inquiries ADD COLUMN email_provider TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN email_provider TEXT DEFAULT '';
