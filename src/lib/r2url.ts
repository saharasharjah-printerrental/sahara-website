const PRIVATE = /https:\/\/sahara-printer-files\.[^/]+\.r2\.cloudflarestorage\.com\//;
const PUBLIC = 'https://pub-b6b36705ad184591a1c89e16ce91b8b3.r2.dev/';

export function normalizeR2Url(url: string | null | undefined): string {
  if (!url) return '';
  return url.replace(PRIVATE, PUBLIC);
}
