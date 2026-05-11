import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    return NextResponse.json({ results: [], message: "AI jobs are processed via external workers" });
  } catch (error) {
    return NextResponse.json({ results: [], error: (error as Error).message });
  }
}

export async function POST(request: Request) {
  const { topic, type } = await request.json();
  
  return NextResponse.json({
    message: "Use Python worker to submit jobs",
    instructions: "python submit_job.py research 'printer rental dubai'",
    submitted_topic: topic,
    job_type: type
  });
}
