import { NextResponse } from "next/server";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

const OUTPUT_DIR = join(process.cwd(), "data/ai_output");

export async function GET() {
  try {
    const files = await readdir(OUTPUT_DIR);
    const results = [];
    
    for (const file of files.filter(f => f.startsWith("result_") && f.endsWith(".json"))) {
      const content = await readFile(join(OUTPUT_DIR, file), "utf-8");
      results.push(JSON.parse(content));
    }
    
    results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ results: [], error: error.message });
  }
}

export async function POST(request) {
  const { topic, type, keywords } = await request.json();
  
  return NextResponse.json({
    message: "Use Python worker to submit jobs",
    instructions: "python submit_job.py research 'printer rental dubai'",
    submitted_topic: topic,
    job_type: type
  });
}
