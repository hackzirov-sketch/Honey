@echo off
chcp 65001 >nul
color 0A
title 🍯 HONEY BACKEND — localhost:8000
echo.
echo  ╔════════════════════════════════════════╗
echo  ║   🍯  HONEY BACKEND  —  Port: 8000    ║
echo  ║   API:     http://localhost:8000       ║
echo  ║   Swagger: http://localhost:8000/swagger/  ║
echo  ╚════════════════════════════════════════╝
echo.
cd /d "%~dp0backend\honey"
venv_win\Scripts\python.exe manage.py runserver 0.0.0.0:8000
pause
