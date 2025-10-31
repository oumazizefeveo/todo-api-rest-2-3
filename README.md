# API REST TODO - Exercices Feveo 2.2 & 2.3

API REST avec authentification JWT et MongoDB.

**Auteur:** Assane Oumazize  
**Repository:** https://github.com/oumazizefeveo/API_REST_FEVEO

---

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier .env
cp .env.example .env

# 3. Démarrer MongoDB
net start MongoDB

# 4. Lancer l'API
npm run dev
```

L'API est accessible sur **http://localhost:3000**

---

## Routes

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion (retourne JWT)
- `GET /api/auth/me` - Profil utilisateur

### Tâches (protégées par JWT)
- `GET /api/tasks` - Liste des tâches
- `GET /api/tasks/:id` - Détail d'une tâche
- `POST /api/tasks` - Créer une tâche
- `PUT /api/tasks/:id` - Modifier une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche

---

## Technologies

- Node.js + Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

## Tests

Importer le fichier `Postman_test` dans Postman pour tester l'API.

---

## Base de Données

```bash
# Créer un dump
npm run db:dump

# Restaurer un dump
npm run db:restore
```

---

## Structure

```
api_rest_final/
├── app.js
├── controllers/
├── middleware/
├── models/
├── routes/
├── scripts/
└── Postman_test
```

---

## Conformité

✅ Exercice 2.2 - Authentification JWT  
✅ Exercice 2.3 - MongoDB

---

**Licence:** Projet pédagogique Feveo
