const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la création", details: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: "Tâche non trouvée" });
  res.json(updated);
};

exports.deleteTask = async (req, res) => {
  const deleted = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!deleted) return res.status(404).json({ error: "Tâche non trouvée" });
  res.json({ message: "Tâche supprimée" });
};
