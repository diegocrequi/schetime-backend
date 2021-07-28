import express, {Application} from 'express';
import listsRouter from './routes/lists.router';
import tasksRouter from './routes/tasks.router';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(tasksRouter);
app.use(listsRouter);

const port: number = 3000;
app.listen(port, () => console.log("Listening on port", port));