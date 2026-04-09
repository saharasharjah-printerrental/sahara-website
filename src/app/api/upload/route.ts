import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const r2 = process.env.SAHARA_ASSETS as any;
  
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
    const buffer = Buffer.from(bytes);
    
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const contentType = file.type || 'application/octet-stream';
    
    await r2.put(fileName, buffer, {
      httpMetadata: {
        contentType,
      },
    });
    
    const r2Domain = `https://sahara-printer-files.${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;
    const url = `${r2Domain}/${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      url,
      fileName
    });
  } catch (error) {
    console.error('R2 Upload Error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file',
      details: String(error)
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const r2 = process.env.SAHARA_ASSETS as any;
  
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