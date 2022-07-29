import { Router } from "express";
import container from "../../bootstrap/container.bootstrap";
import { SERVICES_IDENTIFIERS } from "../../bootstrap/container.types";
import { ErrorHandler } from "../../helper/errors.handler";
import { Validators } from "../../shared/adapter/validator";
import { TaskController } from './task.controller';
import { schema } from "./task.schema";

const controller = container.get<TaskController>(
  SERVICES_IDENTIFIERS.TASK_CONTROLLER
);

export const route = Router();

route.post(
  "/", 
  Validators.validate(schema.INSERT),
  ErrorHandler.handleAsyncError(controller.insert.bind(controller))
);
route.put(
  "/:taskId", 
  Validators.validate(schema.UPDATE),
  ErrorHandler.handleAsyncError(controller.update.bind(controller))
);
route.delete(
  "/:taskId", 
  Validators.validate(schema.REMOVE),
  ErrorHandler.handleAsyncError(controller.remove.bind(controller))
);
route.get(
  '/paging',
  Validators.validate(schema.LIST_BY_PAGE),
  ErrorHandler.handleAsyncError(controller.list.bind(controller))
);
