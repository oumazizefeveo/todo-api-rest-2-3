# 🧠 API REST - TODO List

API REST complète permettant de gérer une liste de tâches (**CRUD**) avec Node.js, Express et un stockage en mémoire.  
Ce projet est un exercice pédagogique visant à maîtriser la création d’une API RESTful avec validation et gestion d’erreurs.

---

## 🚀 Fonctionnalités

- ✅ Récupérer toutes les tâches  
- ✅ Récupérer une tâche par ID  
- ✅ Créer une nouvelle tâche  
- ✅ Modifier une tâche existante  
- ✅ Supprimer une tâche  
- ✅ Validation complète des données  
- ✅ Gestion des erreurs (400, 404, 500)  
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
  "createdAt": "2025-10-21T10:00:00Z"
}
```

---

## ⚙️ Technologies utilisées

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [uuid](https://www.npmjs.com/package/uuid)

---

## 📦 Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/<ton-utilisateur>/<ton-repo>.git
   cd <ton-repo>
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur**
   ```bash
   node app.js
   ```
   👉 L’API sera accessible sur : [http://localhost:3000](http://localhost:3000)

---

## 📡 Routes disponibles

| Méthode | Endpoint | Description | Exemple de réponse |
|----------|-----------|--------------|--------------------|
| **GET** | `/api/tasks` | Récupère toutes les tâches | `[ { ... }, { ... } ]` |
| **GET** | `/api/tasks/:id` | Récupère une tâche spécifique | `{ ... }` |
| **POST** | `/api/tasks` | Crée une nouvelle tâche | `{ message, task }` |
| **PUT** | `/api/tasks/:id` | Met à jour une tâche existante | `{ message, task }` |
| **DELETE** | `/api/tasks/:id` | Supprime une tâche existante | `{ message, deletedTask }` |

---

## 🧪 Tests avec Postman

Tu peux tester l’API avec [Postman](https://www.postman.com/) :  
1. Crée une **collection** avec les 5 requêtes ci-dessus.  
2. Envoie des données JSON pour `POST` et `PUT`, par exemple :

```json
{
  "title": "Réviser le cours d’API",
  "description": "Faire les exercices CRUD",
  "completed": false,
  "priority": "medium",
  "dueDate": "2025-11-01"
}
```

---

## 🧱 Structure du projet

```
📁 api-todo/
├── app.js              # Code principal du serveur Express
├── TaskList.js         # Tableau en mémoire des tâches
├── package.json        # Dépendances du projet
└── README.md           # Documentation
```

---

## 🛠️ Erreurs gérées

| Code | Signification | Exemple |
|------|----------------|----------|
| **400** | Mauvaise requête | Données invalides ou manquantes |
| **404** | Ressource non trouvée | ID inexistant |
| **500** | Erreur serveur | Problème interne du code |

---

## 📄 Licence

Ce projet est libre d’utilisation à des fins pédagogiques.  
Auteur : **Assane Oumazize**
