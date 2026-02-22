
import requests
import json

def test_ai_endpoint():
    url = "http://localhost:8000/api/v1/chat/ai/chat/"
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQwMTU3OTUyLCJpYXQiOjE3NDAxNTQzNTIsImp0aSI6IjA0MTEwOTI1ZTFlMzRmNDFiZTExZjUwMWVlOWJjZGIyIiwidXNlcl9pZCI6IjA5NDQwMGY5LTJkOTAtNDZkYy04OTQwLTM0ZWI5MzE2MzdiMyJ9.wCwPHTQVHz5gXoprwC0CGkoouGP65nrA8orHvItA6p45LTJ"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    data = {"message": "Salom hamkor!"}
    
    print(f"Sending request to {url}...")
    try:
        response = requests.post(url, headers=headers, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_ai_endpoint()
