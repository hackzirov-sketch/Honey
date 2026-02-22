
import os
import django
import json

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from authentication.models import UserModel
from rest_framework_simplejwt.tokens import RefreshToken
from chat.ai_views import AIChatViewSet
from rest_framework.test import APIRequestFactory, force_authenticate

def test_internal():
    factory = APIRequestFactory()
    user = UserModel.objects.filter(username='admin').first()
    if not user:
        print("User admin not found")
        return
        
    view = AIChatViewSet.as_view({'post': 'chat'})
    request = factory.post('/api/v1/chat/ai/chat/', {'message': 'Salom'}, format='json')
    force_authenticate(request, user=user)
    
    print("Calling AIChatViewSet.chat internally...")
    response = view(request)
    print(f"Status Code: {response.status_code}")
    print(f"Data: {response.data}")

if __name__ == "__main__":
    test_internal()
