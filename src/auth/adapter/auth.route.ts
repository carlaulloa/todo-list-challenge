import { Router } from "express";
import container from "../../bootstrap/container.bootstrap";
import { SERVICES_IDENTIFIERS } from "../../bootstrap/container.types";
import { AuthController } from "./auth.controller";
import { ErrorHandler } from "../../helper/errors.handler";
import { Validators } from "../../shared/adapter/validator";
import { schema } from "./auth.schema";

const controller = container.get<AuthController>(
  SERVICES_IDENTIFIERS.AUTH_CONTROLLER
);

export const route = Router();

route.post(
  "/login", 
  Validators.validate(schema.LOGIN),
  ErrorHandler.handleAsyncError(controller.login.bind(controller))
);
route.get(
  '/new-access-token/:refreshToken',
  Validators.validate(schema.REFRESH_TOKEN),
  ErrorHandler.handleAsyncError(controller.getNewAccessToken.bind(controller))
);
