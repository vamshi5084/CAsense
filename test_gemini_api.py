import os
from google import genai
from google.genai import types

api_key = os.environ.get("GEMINI_API_KEY")
try:
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Say 'hello world' if you are working."
    )
    print("SUCCESS")
    print("RESPONSE:", response.text)
except Exception as e:
    print("ERROR:", str(e))
