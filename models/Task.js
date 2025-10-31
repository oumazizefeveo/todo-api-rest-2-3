const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // UUID
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: String },
  createdAt: { type: String, default: new Date().toISOString() }
});

module.exports = mongoose.model('Task', TaskSchema);
