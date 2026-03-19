from google import genai
import os

API_KEY = os.environ.get("GEMINI_API_KEY")

def test_gemini():
    try:
        client = genai.Client(api_key=API_KEY)
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents='Hi'
        )
        print("SUCCESS:", response.text)
    except Exception as e:
        print("ERROR:", str(e))

if __name__ == "__main__":
    test_gemini()
