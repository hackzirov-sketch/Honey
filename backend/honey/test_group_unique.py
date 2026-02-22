
import os
import django
import json
import uuid

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from authentication.models import UserModel
from chat.views import GroupViewSet
from rest_framework.test import APIRequestFactory, force_authenticate

def test_group_create_unique():
    factory = APIRequestFactory()
    user = UserModel.objects.filter(username='admin').first()
    
    view = GroupViewSet.as_view({'post': 'create'})
    unique_name = f"Group {uuid.uuid4().hex[:6]}"
    data = {
        "name": unique_name,
        "description": "Description",
        "group_type": "group",
        "is_public": True
    }
    request = factory.post('/api/v1/chat/groups/', data, format='json')
    force_authenticate(request, user=user)
    
    print(f"Creating group: {unique_name}")
    response = view(request)
    print(f"Status Code: {response.status_code}")
    print(f"Data: {response.data}")

if __name__ == "__main__":
    test_group_create_unique()
