import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET() {
  const env = getRequestContext().env as any;
  const cn = env.CLOUDINARY_CLOUD_NAME;
  const ak = env.CLOUDINARY_API_KEY;
  const as = env.CLOUDINARY_API_SECRET;
  const cloudinary =
    !cn || !ak || !as ? 'missing'
    : cn.startsWith('YOUR_') ? 'placeholder'
    : 'ok';
  return NextResponse.json({
    cloudinary,
    cloudName: cn || null,
    r2: env.SAHARA_ASSETS ? 'ok' : 'missing',
    publicUrl: env.R2_PUBLIC_URL || null,
  });
}
