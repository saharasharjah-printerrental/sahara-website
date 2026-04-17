import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { z } from 'zod';

export const runtime = 'edge';

const inquirySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional().or(z.literal('')),
  company: z.string().max(200).optional().or(z.literal('')),
  service: z.string().max(100).optional().or(z.literal('')),
  message: z.string().min(1).max(5000),
});

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

export async function GET() {
  const db = getDB();

  if (!db) {
    return NextResponse.json({
      error: 'Database not configured',
      inquiries: []
    });
  }

  try {
    const result = await db.prepare('SELECT * FROM inquiries ORDER BY createdAt DESC').all();
    return NextResponse.json({ inquiries: result });
  } catch (error) {
    console.error('Inquiries GET Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch inquiries',
      inquiries: []
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors
      }, { status: 400 });
    }
    
    const data = parsed.data;
    const id = Date.now().toString();
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT INTO inquiries (id, name, email, phone, company, service, message, status, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.name,
      data.email,
      data.phone || '',
      data.company || '',
      data.service || '',
      data.message,
      'new',
      now
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Inquiries POST Error:', error);
    return NextResponse.json({
      error: 'Failed to create inquiry',
      details: String(error)
    }, { status: 500 });
  }
}
