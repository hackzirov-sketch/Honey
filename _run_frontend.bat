@echo off
chcp 65001 >nul
color 0B
title ⚡ HONEY FRONTEND — localhost:5173
echo.
echo  ╔════════════════════════════════════════╗
echo  ║   ⚡  HONEY FRONTEND  —  Port: 5173   ║
echo  ║   URL: http://localhost:5173           ║
echo  ╚════════════════════════════════════════╝
echo.
cd /d "%~dp0frontend"
npx vite --host 0.0.0.0 --port 5173
pause
