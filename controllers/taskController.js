const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des tâches", details: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: "Tâche introuvable" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération de la tâche", details: err.message });
  }
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
  try {
    // Empêcher la modification de l'userId
    const { userId, _id, ...updateData } = req.body;
    
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Tâche non trouvée" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la mise à jour", details: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ error: "Tâche non trouvée" });
    res.json({ message: "Tâche supprimée" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression", details: err.message });
  }
};
