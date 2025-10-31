// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const validateTask = require("../middleware/validateTask");
const taskController = require("../controllers/taskController");

// Routes CRUD des tâches
router.get("/", authenticateToken, taskController.getTasks);
router.get("/:id", authenticateToken, taskController.getTaskById);
router.post("/", authenticateToken, validateTask, taskController.createTask);
router.put("/:id", authenticateToken, validateTask, taskController.updateTask);
router.delete("/:id", authenticateToken, taskController.deleteTask);

module.exports = router;

