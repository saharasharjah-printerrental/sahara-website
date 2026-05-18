import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET() {
  const env = getRequestContext().env as any;
  const cn = env.CLOUDINARY_CLOUD_NAME;
  const ak = env.CLOUDINARY_API_KEY;
  const as = env.CLOUDINARY_API_SECRET;

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
