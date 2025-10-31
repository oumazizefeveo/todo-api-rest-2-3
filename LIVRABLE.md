# 📦 LIVRABLE - Exercices 2.2 & 2.3 - API REST avec JWT et MongoDB

**Auteur:** Assane Oumazize  
**Date:** Octobre 2025  
**Formation:** Feveo - Développement Backend

---

## 📋 Résumé des Exercices

### ✅ Exercice 2.2 : Authentification JWT
**Objectif:** Ajouter un système d'authentification sécurisé avec JWT

**Réalisations:**
- ✅ Table/collection `users` avec schéma Mongoose
- ✅ Route `POST /api/auth/register` - Inscription avec hachage bcrypt
- ✅ Route `POST /api/auth/login` - Connexion avec génération JWT
- ✅ Route `GET /api/auth/me` - Profil utilisateur protégé
- ✅ Protection de toutes les routes `/api/tasks` avec middleware JWT
- ✅ Association tâche ↔ utilisateur via `userId`
- ✅ Sécurité : mots de passe hachés, tokens expirables

### ✅ Exercice 2.3 : Base de données MongoDB
**Objectif:** Remplacer le stockage en mémoire par MongoDB

**Réalisations:**
- ✅ MongoDB local configuré (`mongodb://127.0.0.1:27017/api_todo`)
- ✅ Mongoose installé et intégré
- ✅ Schémas Mongoose pour `User` et `Task`
- ✅ Toutes les opérations CRUD utilisent Mongoose
- ✅ Relation `user → tasks` (un utilisateur a plusieurs tâches)
- ✅ Scripts de dump/restore de la base de données

---

## 🗂️ Structure du Projet

```
📁 api_rest_final/
├── 📄 app.js                    # Point d'entrée du serveur
├── 📁 controllers/              # Logique métier
│   ├── authController.js        # Gestion authentification
│   └── taskController.js        # Gestion des tâches (CRUD)
├── 📁 middleware/               # Middlewares personnalisés
│   ├── authMiddleware.js        # Vérification JWT
│   └── validateTask.js          # Validation des données
├── 📁 models/                   # Schémas Mongoose
│   ├── User.js                  # Modèle utilisateur
│   └── Task.js                  # Modèle tâche
├── 📁 routes/                   # Définition des routes
│   ├── authRoutes.js            # Routes d'authentification
│   └── taskRoutes.js            # Routes des tâches
├── 📁 scripts/                  # Scripts utilitaires
│   ├── dump-db.bat              # Dump MongoDB (Windows)
│   ├── dump-db.sh               # Dump MongoDB (Linux/Mac)
│   ├── restore-db.bat           # Restore MongoDB (Windows)
│   └── restore-db.sh            # Restore MongoDB (Linux/Mac)
├── 📄 .env                      # Variables d'environnement (à créer)
├── 📄 .env.example              # Exemple de configuration
├── 📄 package.json              # Dépendances du projet
├── 📄 Postman_test              # Collection Postman
├── 📄 README.md                 # Documentation principale
└── 📄 LIVRABLE.md               # Ce document récapitulatif
```

---

## 🚀 Installation et Lancement

### 1. Prérequis
- Node.js 16+ installé
- MongoDB installé et démarré
- Git installé

### 2. Installation
```bash
# Cloner le repository
git clone https://github.com/oumazizefeveo/todo-api-rest-2-3.git
cd todo-api-rest-2-3

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs
```

### 3. Démarrer MongoDB
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

### 4. Lancer l'API
```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

L'API sera accessible sur : **http://localhost:3000**

---

## 🔐 Routes de l'API

### Authentification (non protégées)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Inscription d'un utilisateur |
| POST | `/api/auth/login` | Connexion (retourne un JWT) |

### Profil (protégé par JWT)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/auth/me` | Récupérer le profil utilisateur |

### Tâches (protégées par JWT)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tasks` | Récupérer toutes les tâches de l'utilisateur |
| GET | `/api/tasks/:id` | Récupérer une tâche spécifique |
| POST | `/api/tasks` | Créer une nouvelle tâche |
| PUT | `/api/tasks/:id` | Mettre à jour une tâche |
| DELETE | `/api/tasks/:id` | Supprimer une tâche |

---

## 🧪 Tests

### Avec Postman
1. Importer le fichier `Postman_test` dans Postman
2. Tester les routes dans l'ordre :
   - Register → Login → Get Tasks → Create Task → Update Task → Delete Task

### Avec Newman (CLI)
```bash
npm install -g newman
newman run Postman_test
```

---

## 💾 Gestion de la Base de Données

### Créer un dump
```bash
# Windows
scripts\dump-db.bat

# Linux/Mac
chmod +x scripts/dump-db.sh
./scripts/dump-db.sh

# Ou avec npm
npm run db:dump
```

### Restaurer un dump
```bash
# Windows
scripts\restore-db.bat

# Linux/Mac
chmod +x scripts/restore-db.sh
./scripts/restore-db.sh

# Ou avec npm
npm run db:restore
```

Le dump sera créé dans le dossier `dump/` à la racine du projet.

---

## 🔒 Sécurité Implémentée

### ✅ Authentification
- Mots de passe hachés avec **bcrypt** (10 rounds)
- Tokens JWT avec expiration (1h par défaut)
- Validation des tokens sur toutes les routes protégées

### ✅ Autorisation
- Chaque utilisateur ne peut accéder qu'à ses propres tâches
- Filtrage par `userId` dans toutes les requêtes
- Impossibilité de modifier l'`userId` d'une tâche

### ✅ Validation
- Validation des données entrantes (titre obligatoire, priorité valide, etc.)
- Gestion d'erreur complète avec codes HTTP appropriés
- Pas de fuite de données sensibles (password jamais retourné)

### ✅ Configuration
- Variables d'environnement externalisées (`.env`)
- Secrets non commitées (`.gitignore`)
- Middleware d'erreur global

---

## 📊 Technologies Utilisées

| Technologie | Version | Usage |
|-------------|---------|-------|
| Node.js | 16+ | Runtime JavaScript |
| Express.js | 5.1.0 | Framework web |
| MongoDB | 5+ | Base de données NoSQL |
| Mongoose | 8.19.2 | ODM pour MongoDB |
| jsonwebtoken | 9.0.2 | Génération et validation JWT |
| bcryptjs | 3.0.2 | Hachage de mots de passe |
| dotenv | 16.4.5 | Gestion variables d'environnement |
| uuid | 13.0.0 | Génération d'identifiants uniques |
| nodemon | 3.1.10 | Rechargement automatique (dev) |

---

## 📈 Améliorations Apportées

Au-delà des exigences minimales, ce projet inclut :

1. **Architecture MVC propre**
   - Séparation claire des responsabilités
   - Code modulaire et maintenable

2. **Gestion d'erreur robuste**
   - Try/catch sur toutes les opérations async
   - Middleware d'erreur global
   - Codes HTTP appropriés (400, 401, 403, 404, 500)

3. **Sécurité renforcée**
   - Pas de fuite de password dans les réponses
   - Protection contre la modification de l'userId
   - Validation stricte des données

4. **Documentation claire**
   - README.md simple et direct
   - LIVRABLE.md récapitulatif
   - Collection Postman avec exemples

5. **Scripts utilitaires**
   - Dump/restore MongoDB automatisés
   - Scripts npm pour faciliter le développement

6. **Types de données corrects**
   - Dates en type `Date` (pas `String`)
   - Validation Mongoose avec `runValidators`

---

## 📝 Livrables Fournis

### ✅ Code Source
- Repository GitHub : https://github.com/oumazizefeveo/todo-api-rest-2-3.git
- Code propre, commenté et structuré
- Architecture MVC complète

### ✅ Documentation
- `README.md` - Documentation principale
- `LIVRABLE.md` - Ce document récapitulatif
- `.env.example` - Template de configuration

### ✅ Base de Données
- Schémas Mongoose pour User et Task
- Scripts de dump/restore
- Instructions pour MongoDB local et Atlas

### ✅ Tests
- Collection Postman complète (`Postman_test`)
- Scénarios de test détaillés
- Support Newman pour tests automatisés

### ✅ Configuration
- `.env.example` avec toutes les variables nécessaires
- `.gitignore` pour la sécurité
- Scripts npm pour faciliter l'utilisation

---

## ✅ Conformité aux Exigences

### Exercice 2.2 - Authentification JWT
- [x] Reprise de l'API de l'exercice 2.1
- [x] Table/collection users créée
- [x] Route POST /api/auth/register implémentée
- [x] Route POST /api/auth/login implémentée (retourne JWT)
- [x] Route GET /api/auth/me implémentée (protégée)
- [x] Routes de tasks protégées avec JWT
- [x] Tâches associées aux utilisateurs
- [x] Mots de passe hachés avec bcrypt
- [x] Repository GitHub avec documentation

### Exercice 2.3 - MongoDB
- [x] MongoDB installé et configuré
- [x] Mongoose installé
- [x] Schéma Mongoose pour Users créé
- [x] Schéma Mongoose pour Tasks créé
- [x] Toutes les opérations en mémoire remplacées par DB
- [x] Relation user → tasks implémentée
- [x] Code fourni
- [x] Dump de la base de données fourni (scripts)

---

## 🎯 Points Forts du Projet

1. **Production-ready**
   - Configuration par variables d'environnement
   - Gestion d'erreur complète
   - Sécurité renforcée

2. **Maintenabilité**
   - Code propre et structuré
   - Architecture MVC claire
   - Documentation claire et concise

3. **Testabilité**
   - Collection Postman complète
   - Support Newman pour tests automatisés
   - Exemples de requêtes fournis

4. **Déployabilité**
   - Configuration via variables d'environnement
   - Scripts de dump/restore MongoDB
   - Prêt pour MongoDB Atlas

---

## 📞 Contact

**Auteur:** Assane Oumazize  
**Email:** oumazize.feveo@gmail.com
**GitHub:** https://github.com/oumazizefeveo  
**Repository:** https://github.com/oumazizefeveo/todo-api-rest-2-3.git

---

## 📄 Licence

Ce projet est réalisé dans un cadre pédagogique pour la formation Feveo.  
Libre d'utilisation à des fins éducatives.

---

**Date de livraison:** Octobre 2025  
**Statut:** ✅ Complet et fonctionnel
