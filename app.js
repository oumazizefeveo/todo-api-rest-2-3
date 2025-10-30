/**
 * server.js
 * API REST + Authentification JWT (Exercice 2.2)
 *
 * Fonctionnalités :
 *  - CRUD des tâches (protégées par JWT)
 *  - Authentification des utilisateurs (register/login)
 *  - Profil utilisateur (/api/auth/me)
 *
 * Technologies :
 *  - Express
 *  - bcryptjs pour le hachage de mot de passe
 *  - jsonwebtoken pour la gestion des tokens
 *  - uuid pour les IDs uniques
 */

const express = require('express');
const bcrypt = require('bcryptjs');       // Pour hacher et comparer les mots de passe
const jwt = require('jsonwebtoken');      // Pour créer et vérifier les tokens JWT
const { v4: uuidv4 } = require('uuid');   // Pour générer des identifiants uniques

const app = express();
const port = 3000;

// Clé secrète pour signer les JWT (à garder secrète en production)
const JWT_SECRET = "ma_cle_secrete_ultra_securisee";

// Middleware pour parser le JSON
app.use(express.json());

/* =====================================================
   Stockage en mémoire (en prod : utiliser une base de données)
   ===================================================== */
let users = [];  // liste des utilisateurs
let tasks = [];  // liste des tâches (chaque tâche appartient à un utilisateur)

/* =====================================================
   🔐 Middleware d’authentification
   ===================================================== */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];   // Exemple: "Bearer eyJhbGciOi..."
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Token manquant, accès refusé." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token invalide ou expiré." });
    req.user = user; // Ajoute les infos de l'utilisateur au req (ex: id, email)
    next();
  });
}

/* =====================================================
   ⚙️ Validation des tâches
   ===================================================== */
const validPriorities = ["low", "medium", "high"];

function isValidISODateString(s) {
  if (typeof s !== "string") return false;
  const d = new Date(s);
  return !isNaN(d.getTime()) && d.toISOString().startsWith(s);
}

function validateTaskPayload(payload, { requireTitle = false } = {}) {
  const errors = [];

  if (requireTitle && (typeof payload.title !== 'string' || !payload.title.trim())) {
    errors.push("Le champ 'title' est requis et doit être une chaîne non vide.");
  }

  if ('completed' in payload && typeof payload.completed !== 'boolean') {
    errors.push("Le champ 'completed' doit être un booléen.");
  }

  if ('priority' in payload && !validPriorities.includes(payload.priority)) {
    errors.push(`Le champ 'priority' doit être parmi : ${validPriorities.join(', ')}`);
  }

  if ('dueDate' in payload && !isValidISODateString(payload.dueDate)) {
    errors.push("Le champ 'dueDate' doit être une date ISO valide.");
  }

  return errors;
}

/* =====================================================
   👤 Routes d’authentification
   ===================================================== */

/**
 * POST /api/auth/register
 * ➜ Inscription utilisateur
 */
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;

  // Vérifications simples
  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis." });
  }

  // Vérifie si l'utilisateur existe déjà
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "Un utilisateur avec cet email existe déjà." });
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Création de l’utilisateur
  const newUser = {
    id: uuidv4(),
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);

  res.status(201).json({ message: "Utilisateur créé avec succès." });
});

/**
 * POST /api/auth/login
 * ➜ Connexion utilisateur (retourne un JWT)
 */
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Recherche de l’utilisateur
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: "Utilisateur non trouvé." });

  // Vérification du mot de passe
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ error: "Mot de passe incorrect." });

  // Création du token JWT (expire dans 1h)
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: "Connexion réussie.", token });
});

/**
 * GET /api/auth/me
 * ➜ Retourne le profil de l’utilisateur connecté
 * (protégé par JWT)
 */
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

  res.json({
    id: user.id,
    email: user.email,
    createdAt: user.createdAt
  });
});

/* =====================================================
   ✅ Routes des tâches (protégées)
   ===================================================== */

/**
 * GET /api/tasks
 * ➜ Liste toutes les tâches appartenant à l'utilisateur connecté
 */
app.get('/api/tasks', authenticateToken, (req, res) => {
  const userTasks = tasks.filter(t => t.userId === req.user.id);
  res.json(userTasks);
});

/**
 * POST /api/tasks
 * ➜ Crée une nouvelle tâche pour l’utilisateur connecté
 */
app.post('/api/tasks', authenticateToken, (req, res) => {
  const payload = req.body;
  const errors = validateTaskPayload(payload, { requireTitle: true });
  if (errors.length > 0) return res.status(400).json({ errors });

  const newTask = {
    id: uuidv4(),
    userId: req.user.id,   // association à l'utilisateur connecté
    title: payload.title.trim(),
    description: payload.description || "",
    completed: payload.completed || false,
    priority: payload.priority || "medium",
    dueDate: payload.dueDate || null,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

/**
 * PUT /api/tasks/:id
 * ➜ Met à jour une tâche appartenant à l’utilisateur
 */
app.put('/api/tasks/:id', authenticateToken, (req, res) => {
  const task = tasks.find(t => t.id === req.params.id && t.userId === req.user.id);
  if (!task) return res.status(404).json({ error: "Tâche introuvable." });

  const errors = validateTaskPayload(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  // Mise à jour
  Object.assign(task, req.body);
  res.json({ message: "Tâche mise à jour.", task });
});

/**
 * DELETE /api/tasks/:id
 * ➜ Supprime une tâche appartenant à l’utilisateur
 */
app.delete('/api/tasks/:id', authenticateToken, (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id && t.userId === req.user.id);
  if (index === -1) return res.status(404).json({ error: "Tâche introuvable." });

  tasks.splice(index, 1);
  res.json({ message: "Tâche supprimée avec succès." });
});

/* =====================================================
   🚀 Lancement du serveur
   ===================================================== */
app.listen(port, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${port}`);
});
