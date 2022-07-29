import { Router } from "express";
import container from "../../bootstrap/container.bootstrap";
import { SERVICES_IDENTIFIERS } from "../../bootstrap/container.types";
import { ErrorHandler } from "../../helper/errors.handler";
import { Validators } from "../../shared/adapter/validator";
import { TaskStateController } from './task-state.controller';
import { schema } from "./task-state.schema";

const controller = container.get<TaskStateController>(
  SERVICES_IDENTIFIERS.TASK_STATE_CONTROLLER
);

export const route = Router();

route.post(
  "/", 
  Validators.validate(schema.INSERT),
  ErrorHandler.handleAsyncError(controller.insert.bind(controller))
);
route.put(
  "/:taskStateId", 
  Validators.validate(schema.UPDATE),
  ErrorHandler.handleAsyncError(controller.update.bind(controller))
);
route.delete(
  "/:taskStateId", 
  Validators.validate(schema.REMOVE),
  ErrorHandler.handleAsyncError(controller.remove.bind(controller))
);
route.get(
  '/',
  ErrorHandler.handleAsyncError(controller.list.bind(controller))
);
