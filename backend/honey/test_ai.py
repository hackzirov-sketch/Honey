
import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

def find_working_models():
    api_key = os.getenv("GEMINI_API_KEY")
    client = genai.Client(api_key=api_key)
    
    print("Listing models using client.models.list()...")
    try:
        models = client.models.list()
        working = []
        for m in models:
            name = m.name
            # Simplified name if it has models/ prefix
            short_name = name.replace("models/", "")
            print(f"Checking {short_name}...")
            
            # Skip models that don't support generateContent
            if "generateContent" not in m.supported_generation_methods:
                continue
                
            try:
                # Use a very short timeout/request
                resp = client.models.generate_content(model=short_name, contents="Test")
                if resp.text:
                    print(f"  --> WORKING!")
                    working.append(short_name)
            except Exception as e:
                print(f"  --> Failed: {str(e)[:50]}")
        
        print("\n--- Summary of Working Models ---")
        for w in working:
            print(w)
            
    except Exception as e:
        print(f"Error listing models: {e}")

if __name__ == "__main__":
    find_working_models()
