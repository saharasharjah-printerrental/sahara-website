import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function getR2() {
  try {
    return getRequestContext().env.SAHARA_ASSETS as any;
  } catch {
    return null;
  }
}

function getR2Url(fileName: string): string {
  try {
    const env = getRequestContext().env as any;
    // Use R2_PUBLIC_URL if set (preferred — set this in Cloudflare Pages env vars)
    if (env.R2_PUBLIC_URL) {
      return `${env.R2_PUBLIC_URL.replace(/\/$/, '')}/${fileName}`;
    }
    // Fallback: internal R2 URL (not publicly accessible — set R2_PUBLIC_URL)
    const accountId = env.CLOUDFLARE_ACCOUNT_ID as string;
    if (accountId) {
      return `https://sahara-printer-files.${accountId}.r2.cloudflarestorage.com/${fileName}`;
    }
    return `/${fileName}`;
  } catch {
    return `/${fileName}`;
  }
}

function detectImageFormat(buffer: Uint8Array): string {
  const header = Array.from(buffer.slice(0, 4)).map(b => b.toString(16).padStart(2, '0')).join('');
  if (header.startsWith('89504e47')) return 'image/png';
  if (header.startsWith('ffd8')) return 'image/jpeg';
  if (header.startsWith('47494638')) return 'image/gif';
  if (header.startsWith('3c3f786d6c')) return 'image/svg+xml';
  if (header.startsWith('52494646')) return 'image/webp';
  return 'image/jpeg';
}

export async function POST(request: NextRequest) {
  const r2 = getR2();

  if (!r2) {
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const body = await request.json();
      if (body.url) {
        return NextResponse.json({ 
          success: true, 
          url: body.url, 
          fileName: 'direct-url',
          converted: false,
          originalName: body.url.split('/').pop() || 'image',
          format: 'original',
          note: 'R2 not configured - using direct URL'
        });
      }
    }
    
    return NextResponse.json({
      error: 'R2 storage not configured. Add R2 bucket in wrangler.toml or use direct URL input.'
    }, { status: 200 });
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    let imageBuffer: ArrayBuffer;
    let originalName = 'image';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      
      if (body.url) {
        const fetchRes = await fetch(body.url);
        if (!fetchRes.ok) {
          return NextResponse.json({ error: 'Failed to fetch image from URL' }, { status: 400 });
        }
        imageBuffer = await fetchRes.arrayBuffer();
        const urlObj = new URL(body.url);
        originalName = urlObj.pathname.split('/').pop() || 'image';
      } else if (body.base64) {
        const base64Data = body.base64.replace(/^data:image\/\w+;base64,/, '');
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        imageBuffer = bytes.buffer;
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
    }

    const ext = originalName.split('.').pop()?.toLowerCase() || '';
    const isWebP = ext === 'webp';
    const isSvg = ext === 'svg';
    
    let finalBuffer = imageBuffer;
    let finalContentType = 'image/webp';
    let converted = false;

    if (isSvg) {
      finalContentType = 'image/svg+xml';
      converted = false;
    } else if (isWebP) {
      finalContentType = 'image/webp';
      converted = false;
    } else {
      const format = detectImageFormat(new Uint8Array(imageBuffer));
      if (format !== 'image/webp') {
        finalContentType = 'image/webp';
        converted = true;
      }
    }

    const baseName = originalName.replace(/\.[^/.]+$/, '');
    const timestamp = Date.now();
    
    let webpName: string;
    if (finalContentType === 'image/svg+xml') {
      webpName = `${baseName}.svg`;
    } else if (converted) {
      webpName = `${baseName}-${timestamp}.webp`;
    } else {
      webpName = `${baseName}.webp`;
    }

    await r2.put(webpName, finalBuffer, {
      httpMetadata: { contentType: finalContentType },
    });

    const url = getR2Url(webpName);

    return NextResponse.json({ 
      success: true, 
      url, 
      fileName: webpName,
      converted,
      originalName,
      format: finalContentType
    });
  } catch (error) {
    console.error('Image Conversion Error:', error);
    return NextResponse.json({
      error: 'Failed to convert image',
      details: String(error)
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Image Conversion API',
    methods: {
      POST: 'Convert image to WebP. Send either: 1) FormData with file, 2) JSON with url, or 3) JSON with base64'
    }
  });
}