export function isStaged(value: string): boolean {
  return value.startsWith('data:');
}

export async function persistImageIfStaged(value: string): Promise<string> {
  if (!value || !isStaged(value)) return value;
  const res = await fetch('/api/convert-image/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64: value, fileName: 'image' }),
  });
  if (!res.ok) throw new Error(`Image upload failed: ${res.status}`);
  const data = await res.json() as { url?: string };
  if (!data.url) throw new Error('Image upload returned no URL');
  return data.url;
}

export async function deleteRemoteImage(url: string): Promise<void> {
  if (!url || url.startsWith('data:')) return;
  try {
    await fetch(`/api/convert-image/?url=${encodeURIComponent(url)}`, { method: 'DELETE' });
  } catch { /* swallow — orphans tolerable, save failures are not */ }
}
