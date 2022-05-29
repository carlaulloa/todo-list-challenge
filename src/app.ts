import express from 'express';
import { ErrorHandler } from './helper/errors.handler';
import { route as routeAuth } from './auth/adapter/auth.route';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/auth', routeAuth);

app.use(ErrorHandler.handlePathNotFound);
app.use(ErrorHandler.handleGenericErrors);

export default app;