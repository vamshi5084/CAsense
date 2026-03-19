import os
from openai import OpenAI

# ──────────────── OPENAI CONFIG ──────────────── #
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    print("Warning: OPENAI_API_KEY not found in environment.")

try:
    openai_client = OpenAI(api_key=OPENAI_API_KEY)
    completion = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "Say 'hello world' if you are working."}],
        temperature=0.7
    )
    print("SUCCESS")
    print("RESPONSE:", completion.choices[0].message.content)
except Exception as e:
    print("ERROR:", str(e))
