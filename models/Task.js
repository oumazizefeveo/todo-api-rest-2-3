const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const TaskSchema = new mongoose.Schema({
  _id: { type: String, required: true, default: uuidv4 }, // UUID
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
