// middleware/validateTask.js

module.exports = function validateTask(req, res, next) {
  const { title, description, priority, dueDate } = req.body;

  // Vérifie la présence du titre
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Le titre est obligatoire et doit être une chaîne." });
  }

  // Vérifie la priorité
  const validPriorities = ["low", "medium", "high"];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: `La priorité doit être parmi : ${validPriorities.join(", ")}` });
  }

  // Vérifie la date d'échéance
  if (dueDate && isNaN(Date.parse(dueDate))) {
    return res.status(400).json({ error: "La date d'échéance (dueDate) doit être une date valide." });
  }

  // Vérifie la description
  if (description && typeof description !== "string") {
    return res.status(400).json({ error: "La description doit être une chaîne de caractères." });
  }

  // Tout est valide, on passe au contrôleur
  next();
};
