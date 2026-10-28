@echo off
chcp 65001 >nul
title 礼品中心 - 启动服务
echo ========================================================
echo   🎁 礼品中心 - 礼品选择与营销宣传图智能工坊
echo ========================================================
echo.
cd /d "%~dp0"

where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [✔] 检测到 Python 环境，正在启动本地服务...
    python server.py
) else (
    echo [i] 未检测到 Python 命令，直接使用系统默认浏览器打开...
    start "" "index.html"
)
pause
