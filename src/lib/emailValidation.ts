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

const BLOCKED_LOCAL_PARTS = new Set([
  'test', 'fake', 'noreply', 'no-reply', 'nobody', 'null', 'undefined',
  'example', 'sample', 'demo', 'admin', 'user', 'temp', 'temporary',
  'placeholder', 'dummy', 'invalid',
]);

const DOMAIN_TYPOS: Record<string, string> = {
  'gamil.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gmial.com': 'gmail.com',
  'gmaill.com': 'gmail.com', 'gnail.com': 'gmail.com', 'gmai.com': 'gmail.com',
  'gmail.co': 'gmail.com', 'gmailcom': 'gmail.com',
  'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com', 'yhoo.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com', 'yahooo.co': 'yahoo.com',
  'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com', 'hotnail.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com', 'hotmil.com': 'hotmail.com',
  'outllook.com': 'outlook.com', 'outlok.com': 'outlook.com', 'outlookk.com': 'outlook.com',
};

// UAE mobile numbers: 9 digits after +971, prefix 50/52/54/55/56/58
const UAE_MOBILE_REGEX = /^5[02456]\d{7}$/;

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const lower = email.toLowerCase().trim();
  if (!lower) return { valid: false, error: 'Email address is required' };
  if (!EMAIL_REGEX.test(lower)) return { valid: false, error: 'Please enter a valid email address' };

  const [localPart, domain] = lower.split('@');

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { valid: false, error: 'Disposable email addresses are not accepted. Please use your work or personal email.' };
  }
  if (BLOCKED_LOCAL_PARTS.has(localPart)) {
    return { valid: false, error: 'Please enter your real email address' };
  }
  if (DOMAIN_TYPOS[domain]) {
    return { valid: false, error: `Did you mean @${DOMAIN_TYPOS[domain]}?` };
  }

  return { valid: true };
}

export function validateUAEPhone(phone: string): { valid: boolean; error?: string } {
  if (!phone) return { valid: false, error: 'Phone number is required' };
  const digits = phone.replace(/[\s\-().+]/g, '');
  const normalized = digits.replace(/^(00971|971)/, '');
  if (!UAE_MOBILE_REGEX.test(normalized)) {
    return { valid: false, error: 'Enter a valid UAE mobile number (e.g. +971 50 123 4567). Supported prefixes: 050, 052, 054, 055, 056, 058.' };
  }
  return { valid: true };
}
