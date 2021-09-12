const { Router } = require("express");
const { signUp, logIn, updateUserData, deleteUser, updateUserPassword } = require("../controllers/users.controller");
const { authToken } = require("../utils/authUtils");

const usersRouter = Router();

usersRouter.post("/signup", signUp);
usersRouter.post("/login", logIn);
usersRouter.put("/users/data", authToken, updateUserData);
usersRouter.put("/users/password", authToken, updateUserPassword);
usersRouter.delete("/users", authToken, deleteUser);

module.exports = usersRouter;