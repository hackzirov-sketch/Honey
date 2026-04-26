@echo off
setlocal EnableExtensions
chcp 65001 >nul
color 0A
title Honey - Single TypeScript Service

set "ROOT=%~dp0"
set "FRONTEND=%ROOT%"
set "MODE=%~1"
if "%MODE%"=="" set "MODE=dev"

echo.
echo ============================================================
echo   Honey Launcher
echo   Single Node + TypeScript service
echo ============================================================
echo.

if not exist "%FRONTEND%package.json" (
  color 0C
  echo [ERROR] package.json topilmadi.
  echo Papka: %FRONTEND%
  echo.
  pause
  exit /b 1
)

where node >nul 2>&1
if errorlevel 1 (
  color 0C
  echo [ERROR] Node.js topilmadi. Node.js LTS ornating.
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  color 0C
  echo [ERROR] npm topilmadi. Node.js ni qayta ornating.
  echo.
  pause
  exit /b 1
)

cd /d "%FRONTEND%"

echo [1/4] Node version:
node -v
echo.

echo [2/4] Dependencies tekshirilmoqda...
if not exist "node_modules" (
  echo node_modules yoq. npm install ishlayapti...
  call npm install
  if errorlevel 1 goto :fail
) else (
  echo node_modules tayyor.
)
echo.

if /I "%MODE%"=="check" goto :check
if /I "%MODE%"=="prod" goto :prod
if /I "%MODE%"=="production" goto :prod
if /I "%MODE%"=="legacy" goto :legacy
if /I "%MODE%"=="dev" goto :dev

color 0E
echo [WARN] Nomalum mode: %MODE%
echo Ishlatish:
echo   start.bat        - local dev single service
echo   start.bat prod   - Renderga yaqin production build + start
echo   start.bat check  - TypeScript check
echo   start.bat legacy - eski Django + Vite ikki server sxemasi
echo.
pause
exit /b 1

:check
echo [3/4] TypeScript check...
call npm run check
if errorlevel 1 goto :fail
echo.
echo [OK] Check muvaffaqiyatli tugadi.
pause
exit /b 0

:prod
set "PORT=%PORT%"
if "%PORT%"=="" set "PORT=10000"
call :pick_port
set "SQLITE_PATH=%SQLITE_PATH%"
if "%SQLITE_PATH%"=="" set "SQLITE_PATH=%FRONTEND%data\honey.sqlite"

echo [3/4] Production build...
call npm run build
if errorlevel 1 goto :fail

echo.
echo [4/4] Production server ishga tushmoqda...
echo URL: http://localhost:%PORT%
echo API: http://localhost:%PORT%/api/v1
echo Health: http://localhost:%PORT%/health
echo.
start "" "http://localhost:%PORT%"
call npm start
goto :end

:dev
set "PORT=%PORT%"
if "%PORT%"=="" set "PORT=5000"
call :pick_port
set "SQLITE_PATH=%SQLITE_PATH%"
if "%SQLITE_PATH%"=="" set "SQLITE_PATH=%FRONTEND%data\honey.sqlite"

echo [3/4] Local data path:
echo %SQLITE_PATH%
echo.
echo [4/4] Dev server ishga tushmoqda...
echo URL: http://localhost:%PORT%
echo API: http://localhost:%PORT%/api/v1
echo Health: http://localhost:%PORT%/health
echo.
start "" "http://localhost:%PORT%"
call npm run dev
goto :end

:legacy
echo [3/4] Legacy mode: Django ta'qiqlangan. Bu faqat TypeScript single-node.
pause
exit /b 0

:fail
color 0C
echo.
echo [ERROR] Buyruq bajarilmadi. Yuqoridagi xabarni tekshiring.
pause
exit /b 1

:end
echo.
echo Server toxtadi.
pause
exit /b 0

:pick_port
for /f %%P in ('powershell -NoProfile -Command "$p=[int]$env:PORT; while (Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue) { $p++ }; Write-Output $p"') do set "PORT=%%P"
exit /b 0
