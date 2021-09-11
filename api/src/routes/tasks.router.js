const { Router } = require('express');
const { createTask, deleteTask, getTaskById, getTaskByListId, getTaskByUserId, getTasks, updateTask } = require('../controllers/tasks.controller');
const { authToken } = require('../utils/authUtils');

const tasksRouter = Router();

tasksRouter.get("/tasks/:id", getTaskById);
tasksRouter.get("/tasks/user/:id_user", getTaskByUserId);
tasksRouter.get("/tasks/list/:id_list", getTaskByListId);
tasksRouter.post("/tasks", createTask);
tasksRouter.put("/tasks/:id", updateTask);
tasksRouter.delete("/tasks/:id", deleteTask);

module.exports = tasksRouter;