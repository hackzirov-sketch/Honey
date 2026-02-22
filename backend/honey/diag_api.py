
import os
import django
import sys

# Django muhitini sozlash
sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from authentication.models import UserModel
from rest_framework_simplejwt.tokens import RefreshToken
import requests

def test_api():
    # Test foydalanuvchisini olish/yaratish
    user, _ = UserModel.objects.get_or_create(username="test_diagnostic", email="test@honey.uz")
    if _: user.set_password("testpass123"); user.save()
    
    # Token olish
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    
    print(f"Access Token: {access_token[:20]}...")
    
    # API ga so'rov yuborish
    url = "http://127.0.0.1:8000/api/v1/chat/ai/chat/"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    data = {"message": "Salom"}
    
    try:
        response = requests.post(url, json=data, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_api()
