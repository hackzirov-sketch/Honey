@echo off
setlocal EnableExtensions
chcp 65001 >nul
color 0E
title Honey - Reset Admin

set "ROOT=%~dp0"
set "FRONTEND=%ROOT%frontend"

if not exist "%FRONTEND%\package.json" (
  color 0C
  echo [ERROR] frontend\package.json topilmadi.
  pause
  exit /b 1
)

where node >nul 2>&1
if errorlevel 1 (
  color 0C
  echo [ERROR] Node.js topilmadi.
  pause
  exit /b 1
)

cd /d "%FRONTEND%"

if not exist "node_modules" (
  echo node_modules yoq. npm install ishlayapti...
  call npm install
  if errorlevel 1 goto :fail
)

node script\reset-admin.cjs
if errorlevel 1 goto :fail

echo.
echo [OK] Admin tayyor.
pause
exit /b 0

:fail
color 0C
echo.
echo [ERROR] Admin reset bajarilmadi. Yuqoridagi xabarni tekshiring.
pause
exit /b 1
