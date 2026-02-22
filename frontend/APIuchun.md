# 🍯 Honey Ecosystem — Django Backend API Hujjati

> Bu hujjat **Django backend dasturchilari** uchun yozilgan.  
> Frontend React (Vite + TypeScript) da yozilgan va quyidagi endpointlarni kutadi.

---

## 📌 Umumiy Qoidalar

### Base URL
```
Development:  http://localhost:8000
Production:   https://api.yourdomain.com
```

### Barcha so'rovlar uchun Header
```http
Content-Type: application/json
```

### Auth talab qiladigan so'rovlar uchun qo'shimcha Header
```http
Authorization: Bearer <access_token>
```

### Javob formati (muvaffaqiyatli)
```json
{
  "...": "..."
}
```

### Xato javobi formati
Django REST Framework standart xato formatidan foydalaning:
```json
{
  "detail": "Xato matni"
}
```
yoki
```json
{
  "field_name": ["Xato matni"]
}
```

---

## ⚙️ Django Sozlamalari

### 1. O'rnatish kerak bo'lgan paketlar
```bash
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers
```

### 2. `settings.py`
```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',
    'your_app',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ENG BIRINCHI bo'lishi shart!
    'django.middleware.common.CommonMiddleware',
    ...
]

# CORS sozlamalari (frontend URL)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5000",   # Express dev server
    "http://localhost:5173",   # Vite dev server
    "https://yourdomain.com",  # Production
]

CORS_ALLOW_CREDENTIALS = True  # Cookie/session uchun

# JWT sozlamalari
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# DRF sozlamalari
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}
```

### 3. `urls.py` (asosiy)
```python
from django.urls import path, include

urlpatterns = [
    path('api/auth/',  include('accounts.urls')),
    path('api/',       include('core.urls')),
]
```

---

## 🔐 Auth Endpointlari

### `POST /api/auth/register/`
Yangi foydalanuvchi ro'yxatdan o'tkazish.

**Permission:** Hamma (AllowAny)

**Request:**
```json
{
  "email": "user@example.com",
  "password": "StrongPass123",
  "username": "ahmadjon",
  "fullName": "Ahmadjon Toshmatov",
  "role": "parent"
}
```

**Response `201`:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "ahmadjon",
  "fullName": "Ahmadjon Toshmatov",
  "role": "parent",
  "createdAt": "2025-02-20T12:00:00Z"
}
```

**Xatolar:**
| Kod | Sabab |
|-----|-------|
| `400` | Email allaqachon mavjud yoki maydon xato |

---

### `POST /api/auth/login/`
Kirish — JWT token olish.

**Permission:** Hamma (AllowAny)

**Request:**
```json
{
  "email": "user@example.com",
  "password": "StrongPass123"
}
```

**Response `200`:**
```json
{
  "access": "eyJhbGci...",
  "refresh": "eyJhbGci...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "Ahmadjon Toshmatov",
    "role": "parent"
  }
}
```

**Xatolar:**
| Kod | Sabab |
|-----|-------|
| `401` | Email yoki parol noto'g'ri |

---

### `POST /api/auth/token/refresh/`
Access tokenni yangilash.

**Permission:** Hamma (AllowAny)

**Request:**
```json
{
  "refresh": "eyJhbGci..."
}
```

**Response `200`:**
```json
{
  "access": "eyJhbGci..."
}
```

---

### `POST /api/auth/logout/`
Chiqish — refresh tokenni bekor qilish.

**Permission:** Autentifikatsiya kerak

**Request:**
```json
{
  "refresh": "eyJhbGci..."
}
```

**Response `200`:**
```json
{
  "detail": "Muvaffaqiyatli chiqildi."
}
```

---

### `GET /api/auth/me/`
Joriy foydalanuvchi ma'lumotlari.

**Permission:** Autentifikatsiya kerak

**Response `200`:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "ahmadjon",
  "fullName": "Ahmadjon Toshmatov",
  "role": "parent",
  "picture": "https://...",
  "phone": "+998901234567",
  "createdAt": "2025-02-20T12:00:00Z"
}
```

---

## 🤖 AI Endpointlari

> Bu endpointlar Gemini AI bilan ishlaydi.  
> Django tomonda Gemini SDK yoki OpenAI SDK ishlatishingiz mumkin.

### `POST /api/chat/`
AI bilan suhbat.

**Permission:** Autentifikatsiya kerak

**Request:**
```json
{
  "message": "Bolam matematikani yaxshi o'qishi uchun nima qilsam bo'ladi?",
  "systemInstruction": "Siz Honey platformasining aqlli yordamchisiz."
}
```

**Response `200`:**
```json
{
  "text": "Bolangiz uchun eng yaxshi usullardan biri..."
}
```

---

### `POST /api/search/`
Ta'limiy kontent qidirish (ixtiyoriy: Google Search bilan).

**Permission:** Autentifikatsiya kerak

**Request:**
```json
{
  "query": "bolalar uchun matematika o'yinlari"
}
```

**Response `200`:**
```json
{
  "text": "Matematika o'yinlari haqida ma'lumot...",
  "sources": [
    {
      "title": "Manbaning nomi",
      "url": "https://example.com"
    }
  ]
}
```

---

### `POST /api/improve/`
Matnni AI yordamida yaxshilash.

**Permission:** Autentifikatsiya kerak

**Request:**
```json
{
  "text": "bu matnni yaxshila"
}
```

**Response `200`:**
```json
{
  "text": "Ushbu matnni yaxshilab bering degan so'rov..."
}
```

---

## 👨‍👩‍👧 Foydalanuvchi Profili

### `GET /api/profile/`
**Permission:** Autentifikatsiya kerak

**Response `200`:**
```json
{
  "id": 1,
  "fullName": "Ahmadjon Toshmatov",
  "email": "user@example.com",
  "phone": "+998901234567",
  "picture": "https://...",
  "role": "parent",
  "childrenCount": 2
}
```

---

### `PUT /api/profile/`
Profilni yangilash.

**Permission:** Autentifikatsiya kerak

**Request:**
```json
{
  "fullName": "Yangi Ism",
  "phone": "+998901234567",
  "picture": "https://..."
}
```

**Response `200`:** (yangilangan profil)

---

## 👶 Bolalar

### `GET /api/children/`
**Permission:** Autentifikatsiya kerak (faqat o'z bolalari)

**Response `200`:**
```json
[
  {
    "id": 1,
    "name": "Ali",
    "age": 8,
    "grade": 2,
    "avatar": "https://...",
    "points": 150,
    "level": "Beginner"
  }
]
```

---

### `POST /api/children/`
Yangi bola qo'shish.

**Request:**
```json
{
  "name": "Vali",
  "age": 10,
  "grade": 4,
  "avatar": "https://..."
}
```

**Response `201`:** (yaratilgan bola)

---

### `GET /api/children/{id}/`
### `PUT /api/children/{id}/`
### `DELETE /api/children/{id}/`
**Permission:** Faqat bola egasi

---

## 📚 Kurslar

### `GET /api/courses/`
**Permission:** Autentifikatsiya kerak

**Query params:**
- `?category=math` — kategoriya bo'yicha filter
- `?grade=3` — sinf bo'yicha filter
- `?search=algebra` — qidiruv

**Response `200`:**
```json
[
  {
    "id": 1,
    "title": "Arifmetika asoslari",
    "description": "...",
    "category": "math",
    "grade": 3,
    "thumbnail": "https://...",
    "duration": "2 soat",
    "lessonsCount": 12,
    "rating": 4.8
  }
]
```

---

### `GET /api/courses/{id}/`
**Response `200`:**
```json
{
  "id": 1,
  "title": "Arifmetika asoslari",
  "description": "...",
  "lessons": [
    {
      "id": 1,
      "title": "1-dars: Sonlar",
      "duration": "10 daqiqa",
      "videoUrl": "https://..."
    }
  ]
}
```

---

## 📖 Kutubxona (Kitoblar)

### `GET /api/library/`
**Permission:** Autentifikatsiya kerak

**Response `200`:**
```json
[
  {
    "id": 1,
    "title": "Matematika 3-sinf",
    "author": "Muallif ismi",
    "cover": "https://...",
    "category": "math",
    "grade": 3,
    "fileUrl": "https://...",
    "isDownloaded": false
  }
]
```

---

### `GET /api/books/{id}/`
### `POST /api/books/{id}/download/` — Kitobni yuklab olish belgisi
### `DELETE /api/books/{id}/download/` — Yuklab olishni bekor qilish

---

## ✅ Vazifalar

### `GET /api/tasks/`
**Permission:** Autentifikatsiya kerak

**Response `200`:**
```json
[
  {
    "id": 1,
    "title": "10 ta misolni yecish",
    "subject": "math",
    "childId": 1,
    "dueDate": "2025-02-25",
    "isCompleted": false,
    "points": 20
  }
]
```

---

### `POST /api/tasks/`
**Request:**
```json
{
  "title": "Kitob o'qish",
  "subject": "reading",
  "childId": 1,
  "dueDate": "2025-02-25",
  "points": 10
}
```

---

### `PATCH /api/tasks/{id}/`
Vazifani yakunlash:
```json
{
  "isCompleted": true
}
```

---

### `DELETE /api/tasks/{id}/`

---

## 🏆 Yutuqlar (Achievements)

### `GET /api/achievements/`
**Permission:** Autentifikatsiya kerak

**Response `200`:**
```json
[
  {
    "id": 1,
    "title": "Birinchi kitob",
    "description": "Birinchi kitobni o'qib tugating",
    "icon": "📚",
    "isUnlocked": true,
    "unlockedAt": "2025-02-15T10:00:00Z",
    "points": 50
  }
]
```

---

## 📊 Statistika

### `GET /api/stats/`
**Permission:** Autentifikatsiya kerak

**Response `200`:**
```json
{
  "totalChildren": 2,
  "totalPoints": 350,
  "completedTasks": 15,
  "pendingTasks": 3,
  "coursesEnrolled": 4,
  "booksRead": 7,
  "weeklyActivity": [
    { "day": "Dush", "points": 20 },
    { "day": "Sesh", "points": 35 },
    { "day": "Chor", "points": 15 },
    { "day": "Pay",  "points": 50 },
    { "day": "Jum",  "points": 30 },
    { "day": "Shan", "points": 10 },
    { "day": "Yak",  "points": 5  }
  ]
}
```

---

## 🔢 HTTP Status Kodlari

| Kod | Ma'nosi | Qachon ishlatiladi |
|-----|---------|-------------------|
| `200` | OK | Muvaffaqiyatli GET, PUT, PATCH |
| `201` | Created | Muvaffaqiyatli POST |
| `204` | No Content | Muvaffaqiyatli DELETE |
| `400` | Bad Request | Xato ma'lumot yuborilgan |
| `401` | Unauthorized | Token yo'q yoki noto'g'ri |
| `403` | Forbidden | Ruxsat yo'q |
| `404` | Not Found | Ob'ekt topilmadi |
| `500` | Server Error | Server ichki xatosi |

---

## 🚀 Frontend bilan Ulash

### Qadam 1 — `.env` faylini o'zgartiring
```env
# HoneyEcosystemAI/.env
VITE_API_URL=http://localhost:8000
```

### Qadam 2 — Frontend ni rebuild qiling
```bash
npm run dev
```

### Qadam 3 — Test qiling
Brauzerda `http://localhost:5000` ni ochib, login qilib ko'ring.

---

## 📞 Savollar uchun

Agar endpointlarda noaniqlik bo'lsa yoki frontenddan qanday ma'lumot kelayotganini ko'rmoqchi bo'lsangiz:

```typescript
// client/src/config/api.config.ts
// Bu fayldagi API_ENDPOINTS ni ko'ring — barcha URL'lar shu yerda
```

---

*Hujjat yaratildi: 2026-02-20*  
*Loyiha: Honey Ecosystem AI Platform*
