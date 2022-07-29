import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { SERVICES_IDENTIFIERS } from "../../bootstrap/container.types";
import { TaskStateUsecase } from "../application/task-state.usecase";

@injectable()
export class TaskStateController {
  constructor(
    @inject(SERVICES_IDENTIFIERS.TASK_STATE_USECASE) private readonly taskStateUsecase: TaskStateUsecase
  ){}

  async insert(req: Request, res: Response): Promise<void> {
    const dataToInsert = req.body;
    const newTaskState = await this.taskStateUsecase.insert(dataToInsert);
    res.status(201).json(newTaskState)
  }

  async update(req: Request, res: Response): Promise<void> {
    const { taskStateId } = req.params;
    const dataToUpdate = req.body;
    const updatedTaskState = await this.taskStateUsecase.update(taskStateId, dataToUpdate);
    res.json(updatedTaskState);
  }

  async remove(req: Request, res: Response): Promise<void> {
    const { taskStateId } = req.params;
    await this.taskStateUsecase.remove(taskStateId)
    res.status(204)
  }

  async list(req: Request, res: Response): Promise<void> {
    const taskStates = await this.taskStateUsecase.list();
    res.json(taskStates);
  }
}
