import { Router } from 'express';
import { createTask, deleteTask, getTaskById, getTaskByListId, getTaskByUserId, getTasks, updateTask } from '../controllers/tasks.controller';

const tasksRouter = Router();

tasksRouter.get("/tasks", getTasks);
tasksRouter.get("/tasks/:id", getTaskById);
tasksRouter.get("/tasks/user/:id_user", getTaskByUserId);
tasksRouter.get("/tasks/list/:id_list", getTaskByListId);
tasksRouter.post("/tasks", createTask);
tasksRouter.put("/tasks/:id", updateTask);
tasksRouter.delete("/tasks/:id", deleteTask);

export default tasksRouter;