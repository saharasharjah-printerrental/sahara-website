const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', 'guerrillamail.com', 'yopmail.com',
  'throwam.com', 'trashmail.com', 'sharklasers.com', 'grr.la',
  'spam4.me', 'dispostable.com', 'fakeinbox.com', 'maildrop.cc',
  'mailnull.com', 'spamgourmet.com', 'trashmail.at', 'wegwerfemail.de',
  'guerrillamail.info', 'guerrillamailblock.com', 'binkmail.com', 'bob.email',
  'throwaway.email', 'tempr.email', 'getairmail.com', 'mailexpire.com',
  'spamgourmet.net', 'spamgourmet.org', 'spamgourmet.com', 'spamherelots.com',
  'trashmail.io', 'trashmail.me', 'trashmail.net', 'trashmail.org',
]);

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const lower = email.toLowerCase().trim();
  if (!lower) return { valid: false, error: 'Email address is required' };
  if (!EMAIL_REGEX.test(lower)) return { valid: false, error: 'Please enter a valid email address' };
  const domain = lower.split('@')[1];
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { valid: false, error: 'Disposable email addresses are not accepted. Please use your work or personal email.' };
  }
  return { valid: true };
}
