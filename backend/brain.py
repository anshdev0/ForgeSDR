import os
from groq import Groq
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()

# Initialize the Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_outreach(company_data, value_prop):
    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system", 
                    "content": "You are a specialized SDR for AI startups. Your tone is: Peer-to-peer, zero-fluff, and observant. Never use 'I hope this finds you well' or 'In today's fast-paced world'."
                },
                {
                    "role": "user", 
                    "content": f"""
                    CONTEXT: {company_data}
                    MY PRODUCT: {value_prop}

                    TASK: Write a 3-sentence cold email.
                    - Sentence 1: A specific observation about their recent work (from context).
                    - Sentence 2: How my product solves a specific friction point they likely have.
                    - Sentence 3: A low-friction question (CTA).
                    
                    KEEP IT UNDER 60 WORDS.
                    """
                }
            ],
            temperature=0.5 # Lower temperature for more professional consistency
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"