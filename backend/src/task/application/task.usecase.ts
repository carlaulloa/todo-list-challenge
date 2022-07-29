import { id, inject, injectable } from "inversify";
import { SERVICES_IDENTIFIERS } from "../../bootstrap/container.types";
import { TaskRepository } from "./task.repository";
import { Task } from "../entities/task.entity";
import { TaskStateRepository } from "../../task-state/application/task-state.repository";
import { CustomError } from '../../helper/errors.handler';

@injectable()
export class TaskUsecase {
  constructor(
    @inject(SERVICES_IDENTIFIERS.TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
    @inject(SERVICES_IDENTIFIERS.TASK_STATE_REPOSITORY)
    private readonly taskStateRepository: TaskStateRepository
  ) {}

  async insert(data: Partial<Task>): Promise<any> {
    const { data: exists } = await this.taskStateRepository.listOne({ _id: data.state.id })
    if(!exists) {
      throw new CustomError(422, `El estado no existe.`)
    }
    const { _id: id, name } = exists;
    data.state = { id, name };
    const { data: task } = await this.taskRepository.insert(data);
    return task;
  }

  async update(taskId: string, data: Partial<Task>): Promise<any> {
    const { data: exists } = await this.taskStateRepository.listOne({ _id: data.state.id })
    if(!exists) {
      throw new CustomError(422, `El estado no existe.`)
    }
    const { _id: id, name } = exists;
    data.state = { id, name };
    const { data: task } = await this.taskRepository.update(
      {
        _id: taskId,
        isDeleted: false
      },
      data
    );
    return task;
  }

  async remove(taskId: string): Promise<any> {
    const { data: task } = await this.taskRepository.update({
      _id: taskId,
    }, {
      isDeleted: true,
      deletedAt: new Date()
    });
    return task;
  }

  async listByPage(page: number, size: number): Promise<any> {
    const { data: tasks } = await this.taskRepository.listByPage(
      {
        isDeleted: false,
      },
      {
        createdAt: "desc",
      },
      page,
      size
    );
    return tasks;
  }

  async listAll(): Promise<any> {
    const { data: tasks } = await this.taskRepository.list(
      {
        isDeleted: false,
      },
      {
        createdAt: "desc",
      },
    );
    return tasks;
  }
}
