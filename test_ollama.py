import os
from dotenv import load_dotenv
load_dotenv()
from crewai import LLM

llm = LLM(
    model="ollama/" + os.getenv('OLLAMA_MODEL', 'qwen3.5:latest'),
    base_url=os.getenv('OLLAMA_BASE_URL', 'http://localhost:11434')
)
print(f'Model: {llm.model}')
print('Ollama connected!')
