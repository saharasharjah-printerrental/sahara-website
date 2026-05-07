import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function getCloudinaryConfig() {
  try {
    const env = getRequestContext().env as any;
    return {
      cloudName: env.CLOUDINARY_CLOUD_NAME as string,
      apiKey: env.CLOUDINARY_API_KEY as string,
      apiSecret: env.CLOUDINARY_API_SECRET as string,
    };
  } catch {
    return null;
  }
}

async function uploadToCloudinary(
  buffer: ArrayBuffer,
  fileName: string,
  contentType: string,
  config: { cloudName: string; apiKey: string; apiSecret: string }
): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = 'sahara-printer';
  const publicId = `${folder}/${fileName.replace(/\.[^/.]+$/, '')}-${timestamp}`;

  // Params must be sorted alphabetically for signature
  const signatureString = `public_id=${publicId}&timestamp=${timestamp}${config.apiSecret}`;
  const msgBuffer = new TextEncoder().encode(signatureString);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  // Build multipart form
  const form = new FormData();
  const blob = new Blob([buffer], { type: contentType });
  form.append('file', blob, fileName);
  form.append('api_key', config.apiKey);
  form.append('timestamp', String(timestamp));
  form.append('signature', signature);
  form.append('public_id', publicId);

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
  const config = getCloudinaryConfig();

  if (!config?.cloudName || !config?.apiKey || !config?.apiSecret || config.cloudName.startsWith('YOUR_')) {
    return NextResponse.json(
      { error: 'Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in Cloudflare Pages environment variables.' },
      { status: 503 }
    );
  }

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

    const url = await uploadToCloudinary(imageBuffer, originalName, mimeType, config);

    return NextResponse.json({
      success: true,
      url,
      fileName: originalName,
      converted: false,
      originalName,
      format: mimeType,
    });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
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
    },
  });
}
