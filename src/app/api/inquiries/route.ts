import { NextRequest, NextResponse } from 'next/server';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  status: string;
}

export async function GET() {
  const db = process.env.DB as any;
  
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
  const db = process.env.DB as any;
  
  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }
  
  try {
    const body: Inquiry = await request.json();
    const id = Date.now().toString();
    const now = new Date().toISOString();
    
    await db.prepare(`
      INSERT INTO inquiries (id, name, email, phone, company, service, message, status, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.name,
      body.email || '',
      body.phone || '',
      body.company || '',
      body.service || '',
      body.message || '',
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