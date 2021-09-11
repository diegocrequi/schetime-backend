const express = require('express');
const listsRouter = require('./routes/lists.router');
const tasksRouter = require('./routes/tasks.router');
const usersRouter = require('./routes/users.router');

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(tasksRouter);
app.use(listsRouter);
app.use(usersRouter);

const port = 3000;
app.listen(port, () => console.log("Listening on port", port));