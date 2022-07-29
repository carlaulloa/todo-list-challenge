import express from 'express';
import { ErrorHandler } from './helper/errors.handler';
import { route as taskRoutes } from './task/adapter/task.route';
import { route as taskStateRoutes } from './task-state/adapter/task-state.route';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/v1/tasks', taskRoutes)
app.use('/v1/task-states', taskStateRoutes)

app.use(ErrorHandler.handlePathNotFound);
app.use(ErrorHandler.handleGenericErrors);

export default app;