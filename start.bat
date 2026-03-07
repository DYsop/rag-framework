@echo off
REM ══════════════════════════════════════════════════
REM RAG-Framework · Start-Script
REM Doppelklick zum Starten der GUI
REM ══════════════════════════════════════════════════

echo.
echo  RAG Intelligence Platform
echo  ==========================
echo.

REM Prüfe ob Node installiert ist
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  FEHLER: Node.js nicht gefunden!
    echo  Bitte installieren: https://nodejs.org
    pause
    exit /b 1
)

REM Prüfe ob node_modules vorhanden
if not exist "frontend\node_modules" (
    echo  Installiere Abhängigkeiten...
    cd frontend
    call npm install
    call npm install recharts
    cd ..
    echo  [OK] Installation abgeschlossen
)

echo  Starte Frontend...
echo  GUI öffnet sich unter: http://localhost:5173
echo.
cd frontend
start http://localhost:5173
npm run dev
