#!/bin/bash
# Script pour restaurer la base de données MongoDB depuis un dump
# Utilisation: ./restore-db.sh

echo "========================================"
echo "Restauration du dump MongoDB"
echo "========================================"

# Vérifier que le dossier dump existe
if [ ! -d "../dump/api_todo" ]; then
    echo "✗ Erreur: Le dossier dump/api_todo n'existe pas"
    echo "Veuillez d'abord créer un dump avec ./dump-db.sh"
    exit 1
fi

# Restaurer la base de données
mongorestore --db=api_todo ../dump/api_todo

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "✓ Base de données restaurée avec succès"
    echo "========================================"
else
    echo ""
    echo "========================================"
    echo "✗ Erreur lors de la restauration"
    echo "========================================"
    exit 1
fi
