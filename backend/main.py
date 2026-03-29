from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from crawl4ai import AsyncWebCrawler
from groq import Groq
import os
import json
import asyncio
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

async def pick_best_links(homepage_markdown: str, base_url: str):
    prompt = f"Identify 3 important internal URLs for research from {base_url}. Return ONLY a JSON list of absolute URLs. Content: {homepage_markdown[:4000]}"
    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        raw_json = json.loads(completion.choices[0].message.content)
        for key in raw_json:
            if isinstance(raw_json[key], list): return raw_json[key][:3]
        return []
    except:
        return [f"{base_url}/blog", f"{base_url}/about"]

async def process_single_company(url, value_prop, mode):
    url = url.strip().rstrip('/')
    async with AsyncWebCrawler() as crawler:
        hp_result = await crawler.arun(url=url)
        context = hp_result.markdown if hp_result.success else ""
        
        if mode == "deep" and hp_result.success:
            targets = await pick_best_links(hp_result.markdown, url)
            # Parallel scraping of sub-pages
            tasks = [crawler.arun(url=t) for t in targets]
            results = await asyncio.gather(*tasks)
            for r in results:
                if r.success:
                    context += f"\n\n--- RESEARCH ---\n{r.markdown[:1500]}"

    sys_msg = "You are an elite SDR. Analyze the research and provide a JSON response."
    user_msg = f"RESEARCH: {context}\nMY PROP: {value_prop}\nRETURN JSON WITH: 'pitch' (2-sentence email) and 'refined_prop' (1-sentence optimized value prop)."

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "system", "content": sys_msg}, {"role": "user", "content": user_msg}],
        response_format={"type": "json_object"}
    )
    return {**json.loads(completion.choices[0].message.content), "url": url}

@app.post("/generate")
async def generate_outreach(request: Request):
    data = await request.json()
    urls = data.get("url", "").split(",")
    value_prop = data.get("value_prop")
    mode = data.get("mode", "quick")

    # Run all company research tasks in parallel
    tasks = [process_single_company(u, value_prop, mode) for u in urls if u.strip()]
    results = await asyncio.gather(*tasks)
    
    return results # Returns a list of results for Bulk Mode