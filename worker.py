"""
Sahara Background Worker - Multi-Provider Support
Supports: Ollama, OpenWebUI, OpenAI
"""

import json
import os
import time
import uuid
from datetime import datetime
from pathlib import Path
from crewai import Agent, Task, Crew, Process, LLM
from dotenv import load_dotenv

load_dotenv()

# Configuration
JOBS_DIR = Path("data/ai_jobs")
OUTPUT_DIR = Path("data/ai_output")
JOBS_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Get LLM provider
PROVIDER = os.getenv("LLM_PROVIDER", "ollama").lower()

def get_llm():
    """Get LLM based on provider configuration."""
    
    if PROVIDER == "openai":
        # Use OpenAI API
        return LLM(
            model="gpt-4o-mini",
            api_key=os.getenv("OPENAI_API_KEY")
        )
    
    elif PROVIDER == "openwebui":
        # Use OpenWebUI (OpenAI-compatible)
        base_url = os.getenv("OPENWEBUI_BASE_URL", "http://localhost:8080/v1")
        api_key = os.getenv("OPENWEBUI_API_KEY", "ollama")
        return LLM(
            model=os.getenv("OLLAMA_MODEL", "qwen3.5:latest"),
            base_url=base_url,
            api_key=api_key
        )
    
    else:
        # Default: Ollama
        return LLM(
            model=f"ollama/{os.getenv('OLLAMA_MODEL', 'qwen3.5:latest')}",
            base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        )

# Initialize LLM
print(f"Initializing LLM with provider: {PROVIDER}")
llm = get_llm()
print(f"LLM ready: {llm.model}")

# Define agents
seo_agent = Agent(
    role="SEO Expert",
    goal="Research and analyze keywords for UAE printer market",
    backstory="Expert in UAE B2B SEO and local search",
    llm=llm,
    verbose=False
)

content_agent = Agent(
    role="Content Writer",
    goal="Create SEO-optimized content for printer services",
    backstory="Professional B2B tech writer for UAE market",
    llm=llm,
    verbose=False
)

def load_jobs():
    jobs = []
    for file in JOBS_DIR.glob("*.json"):
        if file.name.startswith("pending_"):
            with open(file) as f:
                jobs.append(json.load(f))
    return jobs

def save_job_result(job_id, result):
    output_file = OUTPUT_DIR / f"result_{job_id}.json"
    with open(output_file, "w") as f:
        json.dump(result, f, indent=2)
    
    pending_file = JOBS_DIR / f"pending_{job_id}.json"
    if pending_file.exists():
        processed_file = JOBS_DIR / f"processed_{job_id}.json"
        pending_file.rename(processed_file)

def process_keyword_research(job):
    task = Task(
        description=f"""Research SEO keywords for: {job['topic']}
        
        Include:
        - Primary keywords (volume, competition)
        - Long-tail keywords  
        - UAE local modifiers
        - Return as JSON array with keyword, volume, competition fields.""",
        agent=seo_agent,
        expected_output="JSON array of keywords"
    )
    
    crew = Crew(agents=[seo_agent], tasks=[task], process=Process.sequential)
    result = crew.kickoff()
    
    return {
        "job_id": job["id"],
        "type": "keyword_research",
        "topic": job["topic"],
        "keywords": str(result),
        "timestamp": datetime.now().isoformat()
    }

def process_content_generation(job):
    task = Task(
        description=f"""Generate SEO content for: {job['topic']}

        Requirements:
        - 800-1200 words
        - Include target keywords: {', '.join(job.get('keywords', []))}
        - UAE market focus
        - AEO format with FAQ
        - Professional tone""",
        agent=content_agent,
        expected_output="SEO article in markdown"
    )
    
    crew = Crew(agents=[content_agent], tasks=[task], process=Process.sequential)
    result = crew.kickoff()
    
    return {
        "job_id": job["id"],
        "type": "content_generation",
        "topic": job["topic"],
        "content": str(result),
        "timestamp": datetime.now().isoformat()
    }

def process_job(job):
    job_type = job.get("type", "keyword_research")
    
    if job_type == "keyword_research":
        return process_keyword_research(job)
    elif job_type == "content_generation":
        return process_content_generation(job)
    else:
        return {"error": f"Unknown job type: {job_type}"}

def submit_job(topic, job_type="keyword_research", keywords=None):
    job_id = str(uuid.uuid4())[:8]
    job = {
        "id": job_id,
        "type": job_type,
        "topic": topic,
        "keywords": keywords or [],
        "submitted_at": datetime.now().isoformat()
    }
    
    job_file = JOBS_DIR / f"pending_{job_id}.json"
    with open(job_file, "w") as f:
        json.dump(job, f, indent=2)
    
    print(f"Job submitted: {job_id} - {job_type} - {topic}")
    return job_id

def run_worker():
    print(f"Worker started. Watching {JOBS_DIR} for jobs...")
    
    while True:
        jobs = load_jobs()
        
        if jobs:
            print(f"Found {len(jobs)} pending job(s)")
            for job in jobs:
                print(f"Processing: {job['id']} - {job['type']}")
                try:
                    result = process_job(job)
                    save_job_result(job["id"], result)
                    print(f"Completed: {job['id']}")
                except Exception as e:
                    print(f"Error processing {job['id']}: {e}")
        else:
            print("No pending jobs...")
        
        time.sleep(30)

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "--submit":
            topic = sys.argv[2] if len(sys.argv) > 2 else "printer rental UAE"
            job_type = sys.argv[3] if len(sys.argv) > 3 else "keyword_research"
            submit_job(topic, job_type)
        else:
            topics = sys.argv[1:]
            for topic in topics:
                submit_job(topic)
            run_worker()
    else:
        sample_topics = ["printer rental dubai", "photocopier lease sharjah"]
        for topic in sample_topics:
            submit_job(topic)
        run_worker()
