import { Router } from "express";
import { createList, deleteList, getListById, getListByUserId, updateList } from "../controllers/lists.controller";

const listsRouter: Router = Router();

listsRouter.get("/lists/:id", getListById);
listsRouter.get("/lists/user/:id_user", getListByUserId);
listsRouter.post("/lists", createList);
listsRouter.put("/lists/:id", updateList);
listsRouter.delete("/lists/:id", deleteList);

export default listsRouter;