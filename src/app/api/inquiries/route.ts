import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { z } from 'zod';
import { sendQuoteNotification } from '../send-email/email-service';

export const runtime = 'edge';

const inquirySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional().or(z.literal('')),
  company: z.string().max(200).optional().or(z.literal('')),
  service: z.string().max(100).optional().or(z.literal('')),
  message: z.string().max(5000).optional().or(z.literal('')),
  notes: z.string().max(2000).optional().or(z.literal('')),
  estimatedRange: z.string().max(50).optional().or(z.literal('')),
});

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

async function getNotificationEmail(db: any): Promise<string> {
  try {
    const result = await db.prepare(
      "SELECT value FROM settings WHERE key = 'notification_email'"
    ).first();
    return result?.value || 'info@saharaprinter.com';
  } catch {
    return 'info@saharaprinter.com';
  }
}

export async function GET() {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured', inquiries: [] });
  }

  try {
    const result = await db.prepare('SELECT * FROM inquiries ORDER BY createdAt DESC').all();
    return NextResponse.json({ inquiries: result });
  } catch (error) {
    console.error('Inquiries GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries', inquiries: [] }, { status: 500 });
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
        details: parsed.error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const data = parsed.data;
    const id = Date.now().toString();
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT INTO inquiries (id, name, email, phone, company, service, message, status, notes, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.name,
      data.email,
      data.phone || '',
      data.company || '',
      data.service || '',
      data.message || '',
      'new',
      data.notes || '',
      now
    );

    // Fire-and-forget email notification (don't block the response)
    const notificationEmail = await getNotificationEmail(db);
    sendQuoteNotification({
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone || '',
      customerCompany: data.company || '',
      configuration: data.service || '',
      message: data.message || '',
      estimatedRange: data.estimatedRange || 'Contact for pricing',
      notificationEmail,
    }).catch(err => console.error('Email notification error:', err));

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Inquiries POST Error:', error);
    return NextResponse.json({ error: 'Failed to create inquiry', details: String(error) }, { status: 500 });
  }
}
