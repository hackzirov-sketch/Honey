@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"
set "ROOT=%cd%"

echo ==========================================
echo   Honey Full App Launcher
echo ==========================================
echo Root: %ROOT%
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js topilmadi. Iltimos Node.js o'rnating.
  goto :end
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm topilmadi. Iltimos Node.js ni qayta o'rnating.
  goto :end
)

if not exist "package.json" (
  echo [ERROR] package.json topilmadi. Faylni loyiha ildizida ishga tushiring.
  goto :end
)

if not exist "node_modules" (
  echo [INFO] node_modules yo'q. npm install boshlanmoqda...
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install muvaffaqiyatsiz tugadi.
    goto :end
  )
)

echo [INFO] Backend ishga tushirilmoqda: http://localhost:5000
start "Honey Backend (5000)" cmd /k "cd /d ""%ROOT%"" && npm run dev:server"

timeout /t 2 >nul

echo [INFO] Frontend ishga tushirilmoqda: http://localhost:3000
start "Honey Frontend (3000)" cmd /k "cd /d ""%ROOT%"" && npm run dev"

echo.
echo [OK] Ikki oynada ishga tushirildi:
echo      - Backend: npm run dev:server
echo      - Frontend: npm run dev
echo.
echo To'xtatish uchun ikkala cmd oynani yoping yoki Ctrl+C bosing.

:end
echo.
pause

