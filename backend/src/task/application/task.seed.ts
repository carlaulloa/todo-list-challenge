import { inject, injectable } from "inversify";
import { SERVICES_IDENTIFIERS } from "../../bootstrap/container.types";
import { TaskRepository } from "./task.repository";

@injectable()
export class TaskSeed {
  constructor(
    @inject(SERVICES_IDENTIFIERS.TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository
  ) {}

  async insertAll(): Promise<void> {
    console.log("Removing tasks...");
    await this.taskRepository.removeMany({});
    console.log('Removed tasks')
  }
}
