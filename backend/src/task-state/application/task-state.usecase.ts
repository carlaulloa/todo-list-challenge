import { inject, injectable } from "inversify";
import { SERVICES_IDENTIFIERS } from "../../bootstrap/container.types";
import { TaskState } from "../entities/task-state.entity";
import { TaskStateRepository } from "./task-state.repository";
import { EntityHelper } from "../../helper/entity.helper";
import { CustomError } from "../../helper/errors.handler";

@injectable()
export class TaskStateUsecase {
  constructor(
    @inject(SERVICES_IDENTIFIERS.TASK_STATE_REPOSITORY)
    private readonly taskStateRepository: TaskStateRepository
  ) {}

  async insert(data: Partial<TaskState>): Promise<any> {
    const alias = EntityHelper.getAliasFromString(data.name);
    const { data: exists } = await this.taskStateRepository.listOne({
      alias,
      isDeleted: false,
    });
    if (exists) {
      throw new CustomError(422, "El estado ya existe.");
    }
    const { data: taskState } = await this.taskStateRepository.insert({
      ...data,
      alias,
    });
    return taskState;
  }

  async update(taskId: string, data: Partial<TaskState>): Promise<any> {
    const alias = EntityHelper.getAliasFromString(data.name);
    const { data: exists } = await this.taskStateRepository.listOne({
      _id: { $ne: taskId },
      alias,
      isDeleted: false,
    });
    if (exists) {
      throw new CustomError(422, "El estado a actualizar ya existe");
    }
    const { data: taskState } = await this.taskStateRepository.update(
      {
        _id: taskId,
        isDeleted: false,
      },
      { ...data, alias }
    );

    return taskState;
  }

  async remove(taskId: string): Promise<any> {
    const { data: taskState } = await this.taskStateRepository.update(
      {
        _id: taskId,
      },
      {
        isDeleted: true,
        deletedAt: new Date(),
      }
    );
    return taskState;
  }

  async list(): Promise<any> {
    const { data: taskStates } = await this.taskStateRepository.list(
      {
        isDeleted: false,
      },
      {}
    );
    return taskStates;
  }
}
