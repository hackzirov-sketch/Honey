@echo off
echo [Honey AI Ecosystem] Ilovani sozlash va ishga tushirish...

:: Node.js tekshirish
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Xato: Node.js topilmadi. https://nodejs.org/ saytidan o'rnating.
    pause
    exit /b
)

:: Kutubxonalarni o'rnatish
echo Kutubxonalar o'rnatilmoqda (npm install)...
call npm install

:: Ilovani ishga tushirish
echo Ilova ishga tushirilmoqda (npm run dev)...
call npm run dev

pause
