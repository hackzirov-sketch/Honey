# 🍯 HoneyFull — Full Stack Ishga Tushirish

## Tuzilma
```
HoneyFull/
├── backend/honey/      — Django 6.0 + DRF + Channels + Gemini AI
└── frontend/client/    — React + TypeScript + Vite
```

---

## 1. BACKEND (Django) — Terminal 1

```powershell
cd backend\honey
.\venv_win\Scripts\python.exe manage.py runserver 8000
```

✅ Backend: http://localhost:8000  
✅ Swagger: http://localhost:8000/swagger/  
✅ Admin:   http://localhost:8000/admin/

---

## 2. FRONTEND (Vite) — Terminal 2

```powershell
cd frontend
npm run dev:vite
```

✅ Frontend: http://localhost:5173

---

## API Endpoint'lar (to'liq ro'yxat)

| Endpoint | Method | Vazifa |
|---|---|---|
| `/api/v1/auth/register/` | POST | Ro'yxatdan o'tish |
| `/api/v1/auth/verify-email/` | POST | Email tasdiqlash (6 raqamli kod) |
| `/api/v1/auth/login/` | POST | Kirish → access + refresh token |
| `/api/v1/auth/logout/` | POST | Chiqish |
| `/api/v1/auth/token/refresh/` | POST | Token yangilash |
| `/api/v1/auth/google/` | GET | Google OAuth |
| `/api/v1/auth/profile/` | GET | Profil ma'lumotlari |
| `/api/v1/auth/profile/update/` | PATCH | Profilni yangilash |
| `/api/v1/auth/profile/stats/` | GET | Statistika |
| `/api/v1/library/books/` | GET | Barcha kitoblar |
| `/api/v1/library/books/{id}/` | GET | Kitob tafsiloti |
| `/api/v1/library/categories/` | GET | Kategoriyalar |
| `/api/v1/library/user-books/` | GET | Mening kitoblarim |
| `/api/v1/library/user-books/download/` | POST | Kitob yuklab olish |
| `/api/v1/library/user-books/{id}/` | DELETE | Kitob o'chirish |
| `/api/v1/chat/chats/` | GET | Chatlar ro'yxati |
| `/api/v1/chat/ai/chat/` | POST | Gemini AI bilan suhbat |
| `/api/v1/chat/ai/search/` | POST | AI qidiruv |

---

## Ulanish sxemasi

```
Browser (localhost:5173)
       ↓
   Vite Proxy (/api/v1/* → localhost:8000)
       ↓
   Django REST Framework
       ↓
   SQLite DB + Gemini AI
```

---

## Token saqlanish joyi

JWT tokenlar `localStorage` da saqlanadi:
- `honey_access_token` — qisqa muddatli (60 daqiqa)
- `honey_refresh_token` — uzoq muddatli (1 kun)
- `honey_user` — foydalanuvchi ma'lumotlari (JSON)
