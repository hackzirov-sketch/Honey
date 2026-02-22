@echo off
chcp 65001 >nul
color 0E
title 🍯 Honey Ecosystem — Launcher

echo.
echo  ╔══════════════════════════════════════════════════════╗
echo  ║         🍯  HONEY ECOSYSTEM  LAUNCHER  v2.0          ║
echo  ║              Backend + Frontend Starter              ║
echo  ╚══════════════════════════════════════════════════════╝
echo.

:: ── Papkani aniqlaymiz ────────────────────────────────────────
set ROOT=%~dp0
set BACKEND=%ROOT%backend\honey
set FRONTEND=%ROOT%frontend

:: ── [1] Python virtual environment tekshiruvi ────────────────
echo  [1/4] Tekshirilmoqda: Python venv...
if not exist "%BACKEND%\venv_win\Scripts\python.exe" (
    echo.
    echo  ╔══════════════════════════════════════════╗
    echo  ║  XATO: venv_win topilmadi!               ║
    echo  ║  Qiling:                                 ║
    echo  ║    cd backend\honey                      ║
    echo  ║    python -m venv venv_win               ║
    echo  ║    venv_win\Scripts\pip install -r requirements.txt ║
    echo  ╚══════════════════════════════════════════╝
    echo.
    pause
    exit /b 1
)
echo        [OK] venv_win topildi

:: ── [2] Node modules tekshiruvi ───────────────────────────────
echo  [2/4] Tekshirilmoqda: Node modules...
if not exist "%FRONTEND%\node_modules" (
    echo        [!] node_modules topilmadi. O'rnatilmoqda...
    cd /d "%FRONTEND%"
    call npm install
    cd /d "%ROOT%"
    echo        [OK] node_modules o'rnatildi
) else (
    echo        [OK] Node modules tayyor
)

:: ── [3] Django migratsiyalar ──────────────────────────────────
echo  [3/4] Django migratsiyalar tekshirilmoqda...
cd /d "%BACKEND%"
"%BACKEND%\venv_win\Scripts\python.exe" manage.py migrate --run-syncdb >nul 2>&1
if %errorlevel% neq 0 (
    echo        [OGOHLANTIRISH] Migratsiyada xatolik bo'ldi, davom etilmoqda...
) else (
    echo        [OK] Migratsiyalar yangilandi
)
cd /d "%ROOT%"

:: ── [4] Serverlarni ishga tushiramiz ──────────────────────────
echo  [4/4] Serverlar ishga tushirilmoqda...
echo.

start "HONEY-BACKEND" cmd /k "%ROOT%_run_backend.bat"
timeout /t 3 /nobreak >nul

start "HONEY-FRONTEND" cmd /k "%ROOT%_run_frontend.bat"
timeout /t 4 /nobreak >nul

:: ── Brauzer ───────────────────────────────────────────────────
echo  Brauzer ochilmoqda: http://localhost:5173
start "" "http://localhost:5173"

:: ── Xulosa ───────────────────────────────────────────────────
echo.
color 0A
echo  ╔══════════════════════════════════════════════════════╗
echo  ║   [OK] Honey Ecosystem muvaffaqiyatli ishga tushdi!  ║
echo  ╠══════════════════════════════════════════════════════╣
echo  ║   Frontend  --  http://localhost:5173               ║
echo  ║   Backend   --  http://localhost:8000               ║
echo  ║   Swagger   --  http://localhost:8000/swagger/      ║
echo  ╠══════════════════════════════════════════════════════╣
echo  ║   Serverlarni to'xtatish uchun ochilgan terminal    ║
echo  ║   oynalarni yoping yoki CTRL+C bosing.              ║
echo  ╚══════════════════════════════════════════════════════╝
echo.
pause
