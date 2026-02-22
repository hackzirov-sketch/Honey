
import os
from google import genai
from google.genai import types as genai_types
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

MODEL = "models/gemini-2.5-flash"
message = "Salom"
system_instruction = "Siz aqlli yordamchisiz."

try:
    config = genai_types.GenerateContentConfig(
        system_instruction=system_instruction,
    )
    print("Sending request with system instruction...")
    response = client.models.generate_content(
        model=MODEL,
        contents=message,
        config=config,
    )
    print("Response text:", response.text)
except Exception as e:
    print("Error with system instruction:", e)
    try:
        print("Retrying without config...")
        response = client.models.generate_content(
            model=MODEL,
            contents=message,
        )
        print("Response text:", response.text)
    except Exception as e2:
        print("Absolute error:", e2)
