# 🧠 API REST - TODO List avec Authentification JWT

API REST complète permettant de gérer une liste de tâches (**CRUD**) avec **Node.js**, **Express**, **JWT** et **bcryptjs**.  
Chaque utilisateur possède ses propres tâches protégées par un **token JWT**.

---

## 🚀 Fonctionnalités

- ✅ Inscription et connexion d’utilisateurs avec **bcryptjs**
- ✅ Authentification par **JWT**
- ✅ Récupérer les tâches de l’utilisateur connecté
- ✅ Créer, modifier et supprimer ses propres tâches
- ✅ Validation complète des données
- ✅ Gestion des erreurs (400, 401, 403, 404, 500)
- ✅ Code propre, structuré et commenté

---

## 🧩 Structure d’une tâche

```json
{
  "id": "uuid",
  "title": "Faire les courses",
  "description": "Acheter du pain et du lait",
  "completed": false,
  "priority": "high",
  "dueDate": "2025-10-25",
  "createdAt": "2025-10-21T10:00:00Z",
  "userId": "uuid_utilisateur"
}
```

---

## ⚙️ Technologies utilisées

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [uuid](https://www.npmjs.com/package/uuid)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken (JWT)](https://www.npmjs.com/package/jsonwebtoken)

---

## 📦 Installation

1. **Cloner le dépôt**
   ```bash
   git clone git https://github.com/oumazizefeveo/API_REST_FEVEO.git
   cd API_REST_FEVEO
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur**
   ```bash
   node server.js
   ```
   👉 L’API sera accessible sur : [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentification

### 1️⃣ POST `/api/auth/register`
Créer un nouvel utilisateur.

**Body JSON :**
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Réponse :**
```json
{
  "message": "Utilisateur créé avec succès."
}
```

---

### 2️⃣ POST `/api/auth/login`
Connexion et génération du token JWT.

**Body JSON :**
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Réponse :**
```json
{
  "message": "Connexion réussie.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

🧩 **Le token JWT doit être utilisé pour toutes les routes `/api/tasks` protégées.**

---

## 📡 Routes des tâches (protégées par JWT)

### 🔒 Header obligatoire :
```
Authorization: Bearer <votre_token_JWT>
```

| Méthode | Endpoint | Description |
|----------|-----------|--------------|
| **GET** | `/api/tasks` | Récupère toutes les tâches de l’utilisateur connecté |
| **GET** | `/api/tasks/:id` | Récupère une tâche spécifique |
| **POST** | `/api/tasks` | Crée une nouvelle tâche |
| **PUT** | `/api/tasks/:id` | Met à jour une tâche |
| **DELETE** | `/api/tasks/:id` | Supprime une tâche |

---

## 🧪 Exemple de requête (Postman ou fetch)

**POST /api/tasks**  
Headers :
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
Content-Type: application/json
```

**Body JSON :**
```json
{
  "title": "Réviser Node.js",
  "description": "Étudier Express et JWT",
  "priority": "medium",
  "dueDate": "2025-11-01"
}
```

**Réponse :**
```json
{
  "message": "Tâche créée avec succès.",
  "task": { ... }
}
```

---

## 🧱 Structure du projet

```
📁 api-todo/
├── server.js           # Code principal du serveur Express
├── TaskList.js         # Tableau en mémoire des tâches
├── users.js            # Tableau en mémoire des utilisateurs
├── .env                # Clé secrète JWT
├── package.json        # Dépendances du projet
└── README.md           # Documentation
```

---

## 🛠️ Codes d’erreur gérés

| Code | Signification | Exemple |
|------|----------------|----------|
| **200** | Succès | Requête réussie |
| **201** | Création | Tâche créée |
| **400** | Mauvaise requête | Données invalides |
| **401** | Non authentifié | Token manquant |
| **403** | Interdit | Token invalide ou expiré |
| **404** | Non trouvé | Ressource absente |
| **500** | Erreur serveur | Problème interne |

---

## 📄 Licence

Ce projet est libre d’utilisation à des fins pédagogiques.  
Auteur : **Assane Oumazize**
