
import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

def test_2_5():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("No API Key")
        return

    client = genai.Client(api_key=api_key)
    print(f"Testing gemini-2.5-flash...")
    try:
        # Try both with and without models/ prefix
        for m in ["gemini-2.5-flash", "models/gemini-2.5-flash"]:
            print(f"Trying {m}...")
            try:
                resp = client.models.generate_content(model=m, contents="Hi")
                print(f"  SUCCESS! Response: {resp.text[:20]}")
                return
            except Exception as e:
                print(f"  FAILED: {e}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_2_5()
