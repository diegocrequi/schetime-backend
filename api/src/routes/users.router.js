const { Router } = require("express");
const { signUp } = require("../controllers/user.controller");

const usersRouter = Router();

usersRouter.post('/signup', signUp);

module.exports = usersRouter;