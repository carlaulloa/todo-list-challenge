import "reflect-metadata";
import { Container } from "inversify";
import { SERVICES_IDENTIFIERS } from "./container.types";
import { TaskController } from "../task/adapter/task.controller";
import { TaskUsecase } from "../task/application/task.usecase";
import { TaskRepository } from "../task/application/task.repository";
import { TaskOperation } from "../task/infrastructure/task.operation";
import { TaskStateRepository } from '../task-state/application/task-state.repository';
import { TaskStateOperation } from '../task-state/infrastructure/task-state.operation';
import { TaskStateUsecase } from "../task-state/application/task-state.usecase";
import { TaskStateController } from "../task-state/adapter/task-state.controller";
import { TaskStateSeed } from '../task-state/application/task-state.seed';
import { TaskSeed } from "../task/application/task.seed";

let container = new Container();

container
  .bind<TaskRepository>(SERVICES_IDENTIFIERS.TASK_REPOSITORY)
  .to(TaskOperation);
container.bind<TaskUsecase>(SERVICES_IDENTIFIERS.TASK_USECASE).to(TaskUsecase);
container
  .bind<TaskController>(SERVICES_IDENTIFIERS.TASK_CONTROLLER)
  .to(TaskController);
container
  .bind<TaskSeed>(SERVICES_IDENTIFIERS.TASK_SEED)
  .to(TaskSeed);

container
  .bind<TaskStateRepository>(SERVICES_IDENTIFIERS.TASK_STATE_REPOSITORY)
  .to(TaskStateOperation);
container.bind<TaskStateUsecase>(SERVICES_IDENTIFIERS.TASK_STATE_USECASE).to(TaskStateUsecase);
container
  .bind<TaskStateController>(SERVICES_IDENTIFIERS.TASK_STATE_CONTROLLER)
  .to(TaskStateController);
container
  .bind<TaskStateSeed>(SERVICES_IDENTIFIERS.TASK_STATE_SEED)
  .to(TaskStateSeed);

export default container;
