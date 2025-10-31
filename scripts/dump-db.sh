#!/bin/bash
# Script pour créer un dump de la base de données MongoDB
# Utilisation: ./dump-db.sh

echo "========================================"
echo "Création du dump MongoDB"
echo "========================================"

# Créer le dossier dump s'il n'existe pas
mkdir -p ../dump

# Exporter la base de données
mongodump --db=api_todo --out=../dump

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "✓ Dump créé avec succès dans ./dump/"
    echo "========================================"
else
    echo ""
    echo "========================================"
    echo "✗ Erreur lors de la création du dump"
    echo "========================================"
    exit 1
fi
