const uuid = require('uuid');
const uuidv4 = uuid.v4;

const tasks = [
  {
    id: uuidv4(),
    title: "Exemple: Faire les courses",
    description: "Acheter du pain et du lait",
    completed: false,
    priority: "high",
    dueDate: "2025-10-25",
    createdAt: new Date().toISOString(),
    userId: "uuid_utilisateur"
  }
];

module.exports = tasks;