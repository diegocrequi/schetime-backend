const { Router } = require("express");
const { createList, deleteList, getListById, getListByUserId, updateList } = require("../controllers/lists.controller");
const { authToken } = require("../utils/authUtils");

const listsRouter = Router();

listsRouter.get("/lists", authToken, getListByUserId);
listsRouter.get("/lists/:id", authToken, getListById);
listsRouter.post("/lists", authToken, createList);
listsRouter.put("/lists/:id", authToken, updateList);
listsRouter.delete("/lists/:id", authToken, deleteList);

module.exports = listsRouter;