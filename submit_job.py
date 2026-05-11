"""
Job submission helper - Use this to add jobs to the queue
"""
import json
import uuid
from datetime import datetime
from pathlib import Path

JOBS_DIR = Path("data/ai_jobs")

def submit_seo_research(topic):
    """Submit keyword research job."""
    job_id = str(uuid.uuid4())[:8]
    job = {
        "id": job_id,
        "type": "keyword_research",
        "topic": topic,
        "keywords": [],
        "submitted_at": datetime.now().isoformat()
    }
    JOBS_DIR.mkdir(parents=True, exist_ok=True)
    with open(JOBS_DIR / f"pending_{job_id}.json", "w") as f:
        json.dump(job, f, indent=2)
    return job_id

def submit_content_job(topic, keywords):
    """Submit content generation job."""
    job_id = str(uuid.uuid4())[:8]
    job = {
        "id": job_id,
        "type": "content_generation",
        "topic": topic,
        "keywords": keywords,
        "submitted_at": datetime.now().isoformat()
    }
    JOBS_DIR.mkdir(parents=True, exist_ok=True)
    with open(JOBS_DIR / f"pending_{job_id}.json", "w") as f:
        json.dump(job, f, indent=2)
    return job_id

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python submit_job.py <command> [args]")
        print("Commands:")
        print("  research <topic>     - Submit keyword research")
        print("  content <topic> <kw1,kw2> - Submit content generation")
        sys.exit(1)
    
    cmd = sys.argv[1]
    
    if cmd == "research" and len(sys.argv) > 2:
        job_id = submit_seo_research(sys.argv[2])
        print(f"Research job submitted: {job_id}")
    elif cmd == "content" and len(sys.argv) > 3:
        keywords = sys.argv[3].split(",")
        job_id = submit_content_job(sys.argv[2], keywords)
        print(f"Content job submitted: {job_id}")
    else:
        print("Invalid command")
