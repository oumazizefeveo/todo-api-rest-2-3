@echo off
REM Script pour restaurer la base de données MongoDB depuis un dump
REM Utilisation: restore-db.bat

echo ========================================
echo Restauration du dump MongoDB
echo ========================================

REM Vérifier que le dossier dump existe
if not exist "..\dump\api_todo" (
    echo ✗ Erreur: Le dossier dump/api_todo n'existe pas
    echo Veuillez d'abord créer un dump avec dump-db.bat
    pause
    exit /b 1
)

REM Restaurer la base de données
mongorestore --db=api_todo ..\dump\api_todo

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✓ Base de données restaurée avec succès
    echo ========================================
) else (
    echo.
    echo ========================================
    echo ✗ Erreur lors de la restauration
    echo ========================================
)

pause
