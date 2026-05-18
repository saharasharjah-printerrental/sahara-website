import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function getR2() {
  try {
    return getRequestContext().env.SAHARA_ASSETS as any;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const r2 = getR2();

  if (!r2) {
    return NextResponse.json({
      error: 'R2 storage not configured. Add R2 bucket in wrangler.toml'
    }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const baseName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const key = `uploads/${baseName}`;
    const contentType = file.type || 'application/octet-stream';

    await r2.put(key, bytes, {
      httpMetadata: { contentType },
    });

    const env = getRequestContext().env as any;
    const R2_CDN = 'https://pub-b6b36705ad184591a1c89e16ce91b8b3.r2.dev';
    const r2PublicUrl = (env.R2_PUBLIC_URL as string | undefined)?.replace(/\/$/, '') ?? R2_CDN;
    const url = `${r2PublicUrl}/${key}`;

    return NextResponse.json({ success: true, url, fileName: key });
  } catch (error) {
    console.error('R2 Upload Error:', error);
    return NextResponse.json({
      error: 'Failed to upload file',
      details: String(error)
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const r2 = getR2();

  if (!r2) {
    return NextResponse.json({ error: 'R2 not configured' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json({ error: 'No fileName provided' }, { status: 400 });
    }

    await r2.delete(fileName);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('R2 Delete Error:', error);
    return NextResponse.json({
      error: 'Failed to delete file',
      details: String(error)
    }, { status: 500 });
  }
}
