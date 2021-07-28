import { Router } from "express";
import { getListById, getListByUserId } from "../controllers/lists.controller";

const listsRouter: Router = Router();

listsRouter.get("/lists/:id", getListById);
listsRouter.get("/lists/user/:id_user", getListByUserId);

export default listsRouter;