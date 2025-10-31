@echo off
REM Script pour créer un dump de la base de données MongoDB
REM Utilisation: dump-db.bat

echo ========================================
echo Création du dump MongoDB
echo ========================================

REM Créer le dossier dump s'il n'existe pas
if not exist "..\dump" mkdir "..\dump"

REM Exporter la base de données
mongodump --db=api_todo --out=..\dump

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✓ Dump créé avec succès dans ./dump/
    echo ========================================
) else (
    echo.
    echo ========================================
    echo ✗ Erreur lors de la création du dump
    echo ========================================
)

pause
