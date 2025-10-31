/**
 * server.js
 * API REST + Authentification JWT (version MongoDB)
 *
 * Fonctionnalités :
 *  - CRUD des tâches (protégées par JWT)
 *  - Authentification des utilisateurs (register/login)
 *  - Profil utilisateur (/api/auth/me)
 *  - Stockage dans MongoDB (via Mongoose)
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

// ====================================================
// 🔌 Connexion à MongoDB
// ====================================================
mongoose.connect('mongodb://127.0.0.1:27017/api_todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connecté à MongoDB"))
.catch(err => console.error("❌ Erreur de connexion à MongoDB :", err));

// ====================================================
// 📦 Imports des modèles
// ====================================================
const User = require('./models/User');
const Task = require('./models/Task');

// ====================================================
// ⚙️ Initialisation serveur
// ====================================================
const app = express();
const port = 3000;
const JWT_SECRET = "ma_cle_secrete_ultra_securisee";

app.use(express.json());

// ====================================================
// 🔐 Middleware d'authentification
// ====================================================
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Token manquant, accès refusé." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token invalide ou expiré." });
    req.user = user;
    next();
  });
}

// ====================================================
// ✅ Validation de tâche
// ====================================================
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

// ====================================================
// 👤 Authentification
// ====================================================

/**
 * POST /api/auth/register
 */
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email et mot de passe requis." });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Un utilisateur avec cet email existe déjà." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      _id: uuidv4(),
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    });

    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

/**
 * POST /api/auth/login
 */
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Utilisateur non trouvé." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: "Mot de passe incorrect." });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Connexion réussie.", token });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

/**
 * GET /api/auth/me
 */
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// ====================================================
// 🧾 Routes des tâches
// ====================================================

/**
 * GET /api/tasks
 */
app.get('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const userTasks = await Task.find({ userId: req.user.id });
    res.json(userTasks);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

/**
 * POST /api/tasks
 */
app.post('/api/tasks', authenticateToken, async (req, res) => {
  const payload = req.body;
  const errors = validateTaskPayload(payload, { requireTitle: true });
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const newTask = new Task({
      _id: uuidv4(),
      userId: req.user.id,
      title: payload.title.trim(),
      description: payload.description || "",
      completed: payload.completed || false,
      priority: payload.priority || "medium",
      dueDate: payload.dueDate || null,
      createdAt: new Date().toISOString()
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

/**
 * PUT /api/tasks/:id
 */
app.put('/api/tasks/:id', authenticateToken, async (req, res) => {
  const errors = validateTaskPayload(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Tâche introuvable." });
    res.json({ message: "Tâche mise à jour.", task });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

/**
 * DELETE /api/tasks/:id
 */
app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: "Tâche introuvable." });
    res.json({ message: "Tâche supprimée avec succès." });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// ====================================================
// 🚀 Lancement du serveur
// ====================================================
app.listen(port, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${port}`);
});
