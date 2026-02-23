# 🚀 Ikki xil Render akkauntida deployment qilish (Manual)

Agar loyihani ikki marta alohida (birida Backend, birida Frontend) ishga tushirmoqchi bo'lsangiz, quyidagi tartibda amalga oshiring:

## 1-QADAM: Backend (1-Akkauntda)
1. Renderda **+ New Web Service** ni bosing.
2. **Runtime**: `Python 3`
3. **Root Directory**: `backend/honey`
4. **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
5. **Start Command**: `python manage.py migrate && daphne -b 0.0.0.0 -p $PORT config.asgi:application`
6. **Environment Variables**:
   - `DATABASE_URL`: (Baza ulangan URL)
   - `SECRET_KEY`: (Ixtiyoriy maxfiy so'z)
   - `ALLOWED_HOSTS`: `*`
   - `FRONTEND_URL`: (Keyinroq 2-qadamdan keyin olasiz, masalan: `https://honey-front.onrender.com`)

---

## 2-QADAM: Frontend (2-Akkauntda)
1. Renderda **+ New Web Service** ni bosing.
2. **Runtime**: `Node`
3. **Root Directory**: `frontend`
4. **Build Command**: `npm install && npm run build`
5. **Start Command**: `npm start`
6. **Environment Variables**:
   - `VITE_API_URL`: (1-qadamda yaratilgan backend URL'ingiz, masalan: `https://honey-api.onrender.com`)
   - `PORT`: `10000` (yoki Render bergan default port)
   - `DATABASE_URL`: (1-akkauntdagi bazaning **External Connection String** manzilini qo'ying)

---

## 3-QADAM: "O'zaro bog'lash" (Muhim!)
1. Frontend akkauntidan olingan URLni (masalan: `honey-front.onrender.com`) Backend akkauntidagi `FRONTEND_URL` o'zgaruvchisiga yozib, **Save** qiling.
2. Shunda Backend boshqa akkauntdan kelayotgan so'rovlarga (CORS) ruxsat beradi.

---

### ✅ Natija
Ikkala servis ham alohida xotira (RAM) bilan ishlaydi, bir-biriga yuklama qilmaydi va tekin (Free) planda maksimal darajada barqaror ishlaydi.
