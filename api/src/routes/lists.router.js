const { Router } = require("express");
const { createList, deleteList, getListById, getListByUserId, updateList } = require("../controllers/lists.controller");

const listsRouter = Router();

listsRouter.get("/lists/:id", getListById);
listsRouter.get("/lists/user/:id_user", getListByUserId);
listsRouter.post("/lists", createList);
listsRouter.put("/lists/:id", updateList);
listsRouter.delete("/lists/:id", deleteList);

module.exports = listsRouter;