@echo off
echo Starting development server...
start npm run dev
timeout /t 5 /nobreak > nul
echo Opening browser...
start http://localhost:8080
echo Development server started and browser opened.
