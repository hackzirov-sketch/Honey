
import os
from google import genai
from google.genai import types as genai_types
from dotenv import load_dotenv
import unittest

load_dotenv()

class TestAIFinal(unittest.TestCase):
    def test_ai_final(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            self.skipTest("No GEMINI_API_KEY set")

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
            self.assertTrue(len(response.text) > 0)
        except Exception as e:
            print("Error with system instruction:", e)
            try:
                print("Retrying without config...")
                response = client.models.generate_content(
                    model=MODEL,
                    contents=message,
                )
                print("Response text:", response.text)
                self.assertTrue(len(response.text) > 0)
            except Exception as e2:
                print("Absolute error:", e2)
                self.fail(f"Absolute error: {e2}")

if __name__ == '__main__':
    unittest.main()
