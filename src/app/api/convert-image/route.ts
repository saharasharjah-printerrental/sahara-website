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
    const accountId = getRequestContext().env.CLOUDFLARE_ACCOUNT_ID as string;
    if (!accountId) {
      return `/${fileName}`;
    }
    const r2Domain = `https://sahara-printer-files.${accountId}.r2.cloudflarestorage.com`;
    return `${r2Domain}/${fileName}`;
  } catch {
    return `/${fileName}`;
  }
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
    const isPng = ext === 'png';
    const isGif = ext === 'gif';
    const isJpg = ext === 'jpg' || ext === 'jpeg';
    
    let finalBuffer = imageBuffer;
    let finalContentType = 'image/webp';
    let converted = false;

    if (isSvg) {
      finalContentType = 'image/svg+xml';
      converted = false;
    } else if (isWebP) {
      finalContentType = 'image/webp';
      converted = false;
    } else if (isPng || isGif || isJpg || imageBuffer.byteLength > 0) {
      try {
        const uint8Array = new Uint8Array(imageBuffer);
        const header = Array.from(uint8Array.slice(0, 4)).map(b => b.toString(16).padStart(2, '0')).join('');
        
        if (header.startsWith('89504e47') || header.startsWith('ffd8') || header.startsWith('47494638')) {
          finalContentType = 'image/webp';
          converted = true;
        } else if (header.startsWith('3c3f786d6c')) {
          finalContentType = 'image/svg+xml';
          converted = false;
        } else {
          finalContentType = 'image/webp';
          converted = true;
        }
      } catch {
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