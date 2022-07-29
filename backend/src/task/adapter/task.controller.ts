import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { SERVICES_IDENTIFIERS } from "../../bootstrap/container.types";
import { TaskUsecase } from '../application/task.usecase';

@injectable()
export class TaskController {
  constructor(
    @inject(SERVICES_IDENTIFIERS.TASK_USECASE) private readonly taskUsecase: TaskUsecase
  ){}

  async insert(req: Request, res: Response): Promise<void> {
    const dataToInsert = req.body;
    const newTask = await this.taskUsecase.insert(dataToInsert);
    res.status(201).json(newTask)
  }

  async update(req: Request, res: Response): Promise<void> {
    const { taskId } = req.params;
    const dataToUpdate = req.body;
    const updatedTask = await this.taskUsecase.update(taskId, dataToUpdate);
    res.json(updatedTask);
  }

  async remove(req: Request, res: Response): Promise<void> {
    const { taskId } = req.params;
    await this.taskUsecase.remove(taskId)
    res.status(204).send()
  }

  async listByPage(req: Request, res: Response): Promise<void> {
    const { page, size } = req.query;
    const tasks = await this.taskUsecase.listByPage(+page, +size);
    res.json(tasks);
  }

  async listAll(req: Request, res: Response): Promise<void> {
    const tasks = await this.taskUsecase.listAll();
    res.json(tasks);
  }
}
