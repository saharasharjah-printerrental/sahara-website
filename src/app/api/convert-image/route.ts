import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

async function getCloudinaryConfig() {
  const ctx = getRequestContext() as any;
  const env = ctx?.env || {};
  let cloudName = env.CLOUDINARY_CLOUD_NAME || '';
  let apiKey = env.CLOUDINARY_API_KEY || '';
  let apiSecret = env.CLOUDINARY_API_SECRET || '';

  // Fall back to D1-stored credentials
  if ((!cloudName || !apiKey || !apiSecret) && env.DB) {
    try {
      const keys = ['cloudinary_cloud_name', 'cloudinary_api_key', 'cloudinary_api_secret'];
      const placeholders = keys.map(() => '?').join(',');
      const result = await env.DB.prepare(
        `SELECT key, value FROM settings WHERE key IN (${placeholders})`
      ).bind(...keys).all();
      const map: Record<string, string> = {};
      for (const r of result?.results ?? []) map[r.key] = r.value;
      if (!cloudName) cloudName = map['cloudinary_cloud_name'] || '';
      if (!apiKey) apiKey = map['cloudinary_api_key'] || '';
      if (!apiSecret) apiSecret = map['cloudinary_api_secret'] || '';
    } catch { /* D1 unavailable */ }
  }

  if (!cloudName || !apiKey || !apiSecret || cloudName.startsWith('YOUR_')) {
    return null;
  }
  return { cloudName, apiKey, apiSecret };
}

function getR2() {
  try {
    return getRequestContext().env.SAHARA_ASSETS as any;
  } catch {
    return null;
  }
}

async function uploadToR2(buffer: ArrayBuffer, fileName: string, contentType: string): Promise<string> {
  const r2 = getR2();
  if (!r2) {
    throw new Error('R2 storage not configured. Add SAHARA_ASSETS binding in wrangler.toml');
  }
  const key = `uploads/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  await r2.put(key, buffer, { httpMetadata: { contentType } });
  const env = getRequestContext().env as any;
  const r2PublicUrl = env.R2_PUBLIC_URL?.replace(/\/$/, '') || 'https://pub-b6b36705ad184591a1c89e16ce91b8b3.r2.dev';
  return `${r2PublicUrl}/${key}`;
}

function isWebPFormat(mimeType: string, fileName: string): boolean {
  // Check MIME type
  if (mimeType === 'image/webp') return true;
  // Check file extension
  if (fileName.toLowerCase().endsWith('.webp')) return true;
  // Check base64 data header
  return false;
}

async function uploadToCloudinary(
  buffer: ArrayBuffer,
  fileName: string,
  contentType: string,
  config: { cloudName: string; apiKey: string; apiSecret: string },
  alreadyWebP: boolean = false
): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = 'sahara-printer';
  const baseName = fileName.replace(/\.[^/.]+$/, '');
  // Ensure WebP extension if converting
  const webpFileName = alreadyWebP ? fileName : `${baseName}.webp`;
  const publicId = `${folder}/${baseName}-${timestamp}`;

  // Params must be sorted alphabetically for signature (include all non-file params)
  const paramParts: string[] = [
    `public_id=${publicId}`,
    `timestamp=${timestamp}`,
    ...(!alreadyWebP ? [`transformation=f_webp,q_auto`] : []),
  ];
  const signatureString = paramParts.join('&') + config.apiSecret;
  const msgBuffer = new TextEncoder().encode(signatureString);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  // Build multipart form
  const form = new FormData();
  // If already WebP, use the original content type, otherwise force WebP
  const uploadContentType = alreadyWebP ? contentType : 'image/webp';
  const blob = new Blob([buffer], { type: uploadContentType });
  form.append('file', blob, webpFileName);
  form.append('api_key', config.apiKey);
  form.append('timestamp', String(timestamp));
  form.append('signature', signature);
  form.append('public_id', publicId);

  // If not already WebP, request Cloudinary to convert to WebP
  if (!alreadyWebP) {
    form.append('transformation', 'f_webp,q_auto');
  }

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    { method: 'POST', body: form }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Cloudinary upload failed: ${err}`);
  }

  const data = await res.json() as any;
  return data.secure_url as string;
}

export async function POST(request: NextRequest) {
  const config = await getCloudinaryConfig();

  try {
    const contentType = request.headers.get('content-type') || '';
    let imageBuffer: ArrayBuffer;
    let originalName = 'image';
    let mimeType = 'image/jpeg';

    if (contentType.includes('application/json')) {
      const body = await request.json() as any;

      if (body.url) {
        const fetchRes = await fetch(body.url);
        if (!fetchRes.ok) {
          return NextResponse.json({ error: 'Failed to fetch image from URL' }, { status: 400 });
        }
        imageBuffer = await fetchRes.arrayBuffer();
        mimeType = fetchRes.headers.get('content-type') || 'image/jpeg';
        originalName = body.url.split('/').pop() || 'image';
      } else if (body.base64) {
        const base64Data = body.base64.replace(/^data:image\/\w+;base64,/, '');
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        imageBuffer = bytes.buffer;
        mimeType = body.base64.match(/^data:(image\/\w+);/)?.[1] || 'image/jpeg';
        originalName = body.fileName || 'image';
      } else {
        return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
      }
    } else {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }
      imageBuffer = await file.arrayBuffer();
      originalName = file.name;
      mimeType = file.type || 'image/jpeg';
    }

    const alreadyWebP = isWebPFormat(mimeType, originalName);
    let url: string;
    let source = 'cloudinary';

    if (config) {
      try {
        url = await uploadToCloudinary(imageBuffer, originalName, mimeType, config, alreadyWebP);
      } catch (cloudinaryErr) {
        console.warn('[Upload] Cloudinary failed, falling back to R2:', cloudinaryErr);
        url = await uploadToR2(imageBuffer, originalName, mimeType);
        source = 'r2';
      }
    } else {
      console.log('[Upload] Cloudinary not configured, using R2 fallback');
      url = await uploadToR2(imageBuffer, originalName, mimeType);
      source = 'r2';
    }

    return NextResponse.json({
      success: true,
      url,
      fileName: originalName,
      converted: !alreadyWebP,
      originalName,
      format: alreadyWebP ? mimeType : 'image/webp',
      source,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Image Upload API (Cloudinary)',
    methods: {
      POST: 'Upload image. Send either: 1) FormData with file, 2) JSON with url, or 3) JSON with base64',
      DELETE: 'Delete image by ?url=<encoded>. Handles R2 and Cloudinary URLs.',
    },
  });
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url).searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'url required' }, { status: 400 });

  const env = getRequestContext().env as any;
  const r2PublicBase = (env.R2_PUBLIC_URL || 'https://pub-b6b36705ad184591a1c89e16ce91b8b3.r2.dev').replace(/\/$/, '');

  // R2: URL starts with our public base
  if (url.startsWith(r2PublicBase + '/')) {
    const key = url.slice(r2PublicBase.length + 1);
    try {
      const r2 = env.SAHARA_ASSETS as any;
      if (r2) await r2.delete(key);
      return NextResponse.json({ success: true, source: 'r2', key });
    } catch (e) {
      return NextResponse.json({ error: 'R2 delete failed', details: String(e) }, { status: 500 });
    }
  }

  // Cloudinary: URL like https://res.cloudinary.com/{cloud}/image/upload/{maybe-version}/{publicId}.ext
  const cm = url.match(/res\.cloudinary\.com\/([^/]+)\/image\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
  if (cm) {
    const config = await getCloudinaryConfig();
    if (!config) return NextResponse.json({ error: 'Cloudinary not configured for delete' }, { status: 500 });
    const publicId = cm[2];
    const timestamp = Math.floor(Date.now() / 1000);
    const sigString = `public_id=${publicId}&timestamp=${timestamp}${config.apiSecret}`;
    const hashBuffer = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(sigString));
    const signature = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    const form = new FormData();
    form.append('public_id', publicId);
    form.append('timestamp', String(timestamp));
    form.append('signature', signature);
    form.append('api_key', config.apiKey);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/destroy`, { method: 'POST', body: form });
    if (!res.ok) return NextResponse.json({ error: 'Cloudinary destroy failed', details: await res.text() }, { status: 500 });
    return NextResponse.json({ success: true, source: 'cloudinary', publicId });
  }

  // Foreign URL (wikimedia, etc.) — no-op, we don't own it
  return NextResponse.json({ success: true, source: 'foreign', noop: true });
}
