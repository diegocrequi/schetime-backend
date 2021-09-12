const { Router } = require('express');
const { createTask, deleteTask, getTaskById, getTaskByListId, getTaskByUserId, getTasks, updateTask } = require('../controllers/tasks.controller');
const { authToken } = require('../utils/authUtils');

const tasksRouter = Router();

tasksRouter.get("/tasks/",authToken, getTaskByUserId);
tasksRouter.get("/tasks/:id",authToken, getTaskById);
tasksRouter.get("/tasks/list/:id_list",authToken, getTaskByListId);
tasksRouter.post("/tasks", authToken, createTask);
tasksRouter.put("/tasks/:id", authToken, updateTask);
tasksRouter.delete("/tasks/:id", authToken, deleteTask);

module.exports = tasksRouter;