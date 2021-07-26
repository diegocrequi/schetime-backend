import express, {Application} from 'express';
import tasksRouter from './routes/tasks.router';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(tasksRouter);

const port: number = 3000;
app.listen(port, () => console.log("Listening on port", port));