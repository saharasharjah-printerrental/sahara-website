import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

async function getCloudinaryCreds(env: any): Promise<{ cn: string; ak: string; as: string }> {
  let cn = env.CLOUDINARY_CLOUD_NAME || '';
  let ak = env.CLOUDINARY_API_KEY || '';
  let as = env.CLOUDINARY_API_SECRET || '';

  // Fall back to D1-stored credentials if env vars are missing
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
  return { cn, ak, as };
}

export async function GET() {
  let env: any;
  try {
    env = getRequestContext().env;
  } catch {
    return NextResponse.json({
      cloudinary: { status: 'missing', reason: 'CF environment not available' },
      r2: { status: 'missing', reason: 'CF environment not available' },
    });
  }
  const { cn, ak, as } = await getCloudinaryCreds(env);

  // --- Cloudinary ---
  let cloudinaryStatus: 'ok' | 'error' | 'missing' = 'missing';
  let cloudinaryReason: string | undefined;

  if (!cn || !ak || !as || cn.startsWith('YOUR_')) {
    cloudinaryStatus = 'missing';
    cloudinaryReason = !cn ? 'CLOUDINARY_CLOUD_NAME not set' : !ak ? 'CLOUDINARY_API_KEY not set' : !as ? 'CLOUDINARY_API_SECRET not set' : 'Placeholder values detected';
  } else {
    try {
      const pingRes = await fetch(`https://api.cloudinary.com/v1_1/${cn}/ping`, {
        headers: { Authorization: `Basic ${btoa(`${ak}:${as}`)}` },
      });
      if (pingRes.ok) {
        cloudinaryStatus = 'ok';
      } else {
        cloudinaryStatus = 'error';
        cloudinaryReason = `HTTP ${pingRes.status}: ${await pingRes.text()}`;
      }
    } catch (e) {
      cloudinaryStatus = 'error';
      cloudinaryReason = String(e);
    }
  }

  // --- R2 ---
  let r2Status: 'ok' | 'error' | 'missing' = 'missing';
  let r2Reason: string | undefined;
  const r2PublicUrl: string | null = env.R2_PUBLIC_URL || null;

  if (!env.SAHARA_ASSETS) {
    r2Status = 'missing';
    r2Reason = 'SAHARA_ASSETS R2 binding not found';
  } else {
    try {
      await (env.SAHARA_ASSETS as any).list({ limit: 1 });
      r2Status = 'ok';
    } catch (e) {
      r2Status = 'error';
      r2Reason = String(e);
    }
  }

  return NextResponse.json({
    cloudinary: { status: cloudinaryStatus, reason: cloudinaryReason, cloudName: cn || null },
    r2: { status: r2Status, reason: r2Reason, publicUrl: r2PublicUrl },
  });
}
