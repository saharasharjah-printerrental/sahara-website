import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const indexPath = path.join(process.cwd(), 'public/admin/index.html');
  
  try {
    const content = fs.readFileSync(indexPath, 'utf-8');
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch {
    return new NextResponse('CMS not found', { status: 404 });
  }
}