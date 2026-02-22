
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def test_user_style():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("No API Key")
        return
        
    genai.configure(api_key=api_key)
    print("Testing models/gemini-2.5-flash with google.generativeai...")
    try:
        model = genai.GenerativeModel('models/gemini-2.5-flash')
        response = model.generate_content("Hello")
        print("SUCCESS!")
        print(response.text)
    except Exception as e:
        print(f"FAILED: {e}")

if __name__ == "__main__":
    test_user_style()
