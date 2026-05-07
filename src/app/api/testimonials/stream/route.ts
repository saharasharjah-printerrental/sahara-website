import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarUrl: string;
  avatarAlt: string;
  isActive: number;
  sortOrder: number;
}

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
    return new NextResponse(
      new ReadableStream({
        start(controller) {
          controller.enqueue(`data: ${JSON.stringify({ type: 'error', message: 'Database not configured' })}\n\n`);
          controller.close();
        }
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      }
    );
  }

  let lastCount = 0;
  let lastModified = '';
  
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial data
      try {
        const result = await db.prepare(
          'SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC'
        ).all();
        
        lastCount = result.length;
        lastModified = new Date().toISOString();
        
        const initData = `data: ${JSON.stringify({ type: 'init', data: result })}\n\n`;
        controller.enqueue(initData);
      } catch (error) {
        console.error('SSE init error:', error);
      }

      // Poll every 3 seconds for changes
      const interval = setInterval(async () => {
        try {
          const result = await db.prepare(
            'SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC'
          ).all();
          
          const currentCount = result.length;
          const now = new Date().toISOString();
          
          // Check if data changed (count or modification time)
          if (currentCount !== lastCount || now !== lastModified) {
            lastCount = currentCount;
            lastModified = now;
            
            const updateData = `data: ${JSON.stringify({ type: 'update', data: result })}\n\n`;
            controller.enqueue(updateData);
          }
          
          // Send heartbeat every 30 seconds
          const heartbeat = `: heartbeat ${Date.now()}\n\n`;
          controller.enqueue(heartbeat);
          
        } catch (error) {
          console.error('SSE poll error:', error);
        }
      }, 3000);

      // Cleanup on close
      return () => clearInterval(interval);
    },

    cancel() {
      // Called when the client closes the connection
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable Nginx buffering
    },
  });
}
