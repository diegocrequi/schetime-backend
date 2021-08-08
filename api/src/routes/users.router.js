const { Router } = require("express");

const usersRouter = Router();

usersRouter.post('/signup');

module.exports = usersRouter;