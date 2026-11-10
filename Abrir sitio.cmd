@echo off
cd /d "%~dp0"
node abrir.mjs
if errorlevel 1 pause
