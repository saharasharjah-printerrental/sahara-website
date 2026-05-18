import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const env = getRequestContext().env as any;
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor') || undefined;
  const limit = 48;

  const images: { url: string; key: string; source: 'r2' | 'cloudinary'; uploadedAt?: string }[] = [];
  let nextCursor: string | undefined;

  // --- R2 ---
  if (env.SAHARA_ASSETS) {
    try {
      const r2PublicUrl = (env.R2_PUBLIC_URL || 'https://pub-b6b36705ad184591a1c89e16ce91b8b3.r2.dev').replace(/\/$/, '');
      const listed = await (env.SAHARA_ASSETS as any).list({ limit, cursor });
      for (const obj of listed.objects ?? []) {
        images.push({
          url: `${r2PublicUrl}/${obj.key}`,
          key: obj.key,
          source: 'r2',
          uploadedAt: obj.uploaded ? new Date(obj.uploaded).toISOString() : undefined,
        });
      }
      if (!listed.truncated && listed.cursor) nextCursor = listed.cursor;
      else if (listed.truncated) nextCursor = listed.cursor;
    } catch {
      // R2 unavailable — skip
    }
  }

  // --- Cloudinary ---
  let cn = env.CLOUDINARY_CLOUD_NAME || '';
  let ak = env.CLOUDINARY_API_KEY || '';
  let as = env.CLOUDINARY_API_SECRET || '';
  if ((!cn || !ak || !as) && env.DB) {
    try {
      const keys = ['cloudinary_cloud_name', 'cloudinary_api_key', 'cloudinary_api_secret'];
      const placeholders = keys.map(() => '?').join(',');
      const result = await env.DB.prepare(
        `SELECT key, value FROM settings WHERE key IN (${placeholders})`
      ).bind(...keys).all();
      const map: Record<string, string> = {};
      for (const r of result?.results ?? []) map[r.key] = r.value;
      if (!cn) cn = map['cloudinary_cloud_name'] || '';
      if (!ak) ak = map['cloudinary_api_key'] || '';
      if (!as) as = map['cloudinary_api_secret'] || '';
    } catch { /* D1 unavailable */ }
  }
  if (cn && ak && as && !cn.startsWith('YOUR_')) {
    try {
      const params = new URLSearchParams({
        resource_type: 'image',
        type: 'upload',
        prefix: 'sahara-printer',
        max_results: String(limit),
      });
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cn}/resources/image?${params}`,
        { headers: { Authorization: `Basic ${btoa(`${ak}:${as}`)}` } }
      );
      if (res.ok) {
        const data = await res.json() as any;
        for (const r of data.resources ?? []) {
          images.push({
            url: r.secure_url,
            key: r.public_id,
            source: 'cloudinary',
            uploadedAt: r.created_at,
          });
        }
      }
    } catch {
      // Cloudinary unavailable — skip
    }
  }

  // Sort newest first
  images.sort((a, b) => {
    const ta = a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0;
    const tb = b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0;
    return tb - ta;
  });

  return NextResponse.json({ images, nextCursor: nextCursor ?? null });
}
