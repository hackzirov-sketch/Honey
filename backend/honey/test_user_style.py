
import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

def test_user_style():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("No API Key")
        return
        
    client = genai.Client(api_key=api_key)
    print("Testing models/gemini-2.5-flash with google.genai...")
    try:
        response = client.models.generate_content(
            model='models/gemini-2.5-flash',
            contents="Hello"
        )
        print("SUCCESS!")
        print(response.text)
    except Exception as e:
        print(f"FAILED: {e}")

if __name__ == "__main__":
    test_user_style()
