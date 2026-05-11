"""
Sahara Website AI Agent - crewAI with Ollama Integration

This script demonstrates how to use crewAI with Ollama to generate
SEO content and analysis for the Sahara printer website.

Usage:
    python crewai_sahara.py "Generate SEO keywords for printer rental in Dubai"
"""

from crewai import Agent, Task, Crew, Process
from langchain_ollama import ChatOllama
import os

# Configure Ollama - uses your already-installed models
llm = ChatOllama(
    model="qwen3.5:latest",  # Uses your Qwen model
    base_url="http://localhost:11434",
    temperature=0.7
)

# Define SEO Research Agent
seo_researcher = Agent(
    role="UAE Printer Market SEO Expert",
    goal="Research and identify high-value SEO keywords for printer rental and services in UAE",
    backstory="""You are an expert SEO analyst specializing in the UAE market.
    You have deep knowledge of:
    - Printer rental industry in Dubai, Abu Dhabi, Sharjah
    - B2B marketing in UAE
    - Local search patterns
    - Competitor analysis""",
    llm=llm,
    verbose=True
)

# Define Content Writer Agent
content_writer = Agent(
    role="Technical Content Writer",
    goal="Create SEO-optimized content for printer services in UAE",
    backstory="""You are a professional B2B content writer specializing in
    office equipment and technology. You write compelling copy that
    converts leads into customers.""",
    llm=llm,
    verbose=True
)

# Define Analytics Agent
analytics_agent = Agent(
    role="Business Analyst",
    goal="Analyze website performance and provide optimization recommendations",
    backstory="""You analyze business websites and provide data-driven
    recommendations for improvement.""",
    llm=llm,
    verbose=True
)


def research_keywords(topic: str) -> str:
    """Research SEO keywords for a given topic."""

    task = Task(
        description=f"""Research high-value SEO keywords for: {topic}

        Focus on:
        - Primary keywords (high volume)
        - Long-tail keywords (high intent)
        - Local UAE modifiers (Dubai, Sharjah, Abu Dhabi, JAFZA, SAIF Zone)
        - Service-specific terms (rental, AMC, repair, lease)

        Return a JSON list of keywords with search volume estimates.""",
        agent=seo_researcher,
        expected_output="JSON list of keywords with search volume and competition"
    )

    crew = Crew(
        agents=[seo_researcher],
        tasks=[task],
        process=Process.sequential
    )

    result = crew.kickoff()
    return result


def generate_content(topic: str, keywords: list) -> str:
    """Generate SEO-optimized content."""

    task = Task(
        description=f"""Generate SEO-optimized content for: {topic}

        Target keywords: {', '.join(keywords)}

        Requirements:
        - 800-1200 words
        - Include UAE-specific references
        - AEO (Answer Engine Optimization) format
        - FAQ section with Q&A pairs
        - Include pricing ranges in AED
        - Professional B2B tone""",
        agent=content_writer,
        expected_output="SEO-optimized article in markdown format"
    )

    crew = Crew(
        agents=[content_writer],
        tasks=[task],
        process=Process.sequential
    )

    result = crew.kickoff()
    return result


def analyze_website(url: str) -> str:
    """Analyze a website and provide SEO recommendations."""

    task = Task(
        description=f"""Analyze {url} for SEO performance.

        Provide:
        - Technical SEO issues
        - Content gaps
        - Keyword opportunities
        - Schema markup recommendations
        - Local SEO improvements for UAE""",
        agent=analytics_agent,
        expected_output="Detailed SEO audit report"
    )

    crew = Crew(
        agents=[analytics_agent],
        tasks=[task],
        process=Process.sequential
    )

    result = crew.kickoff()
    return result


def full_campaign(topic: str):
    """Run a full SEO campaign - research, content, and analysis."""

    print(f"\n{'='*60}")
    print(f"Starting SEO Campaign: {topic}")
    print(f"{'='*60}\n")

    # Step 1: Research keywords
    print("Step 1: Researching keywords...")
    keywords_result = research_keywords(topic)
    print(f"\nKeywords: {keywords_result}\n")

    # Step 2: Generate content
    print("Step 2: Generating content...")
    # Extract keywords from result (simplified)
    keywords = ["printer rental dubai", "photocopier lease uae", "printer amc dubai"]
    content_result = generate_content(topic, keywords)
    print(f"\nContent generated:\n{content_result}\n")

    # Step 3: Analyze (would use actual URL in production)
    print("Step 3: Website analysis...")
    # analysis = analyze_website("https://saharaoffice.com")

    print(f"\n{'='*60}")
    print("Campaign Complete!")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        topic = sys.argv[1]
    else:
        topic = "printer rental services in UAE"

    full_campaign(topic)
