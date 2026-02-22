# Honey

## 🚀 Ishga tushirish (barcha komandalar bir joyda)

#### 1. Virtual muhit yaratish

```bash
python3 -m venv venv
```

#### 2. Virtual muhitni faollashtirish (MacOS / Linux)

```bash
source venv/bin/activate
```

##### 2. Windows uchun:

```bash
venv\Scripts\activate
```

##### 3. Kerakli kutubxonalarni o‘rnatish

```bash
pip install -r requirements.txt
```

##### 4. Migratsiyalarni yaratish

```bash
python3 manage.py makemigrations
```

##### 5. Migratsiyalarni bazaga qo‘llash

```bash
python3 manage.py migrate
```

##### 6. Superuser (admin) yaratish

```bash
python3 manage.py createsuperuser
```

##### 7. MacOS yoki Linux uchun:Backend serverni ishga tushirish

```bash
python3 manage.py runserver
```

##### 7. Windows uchun:Backend serverni ishga tushirish

```bash
python manage.py runserver
```