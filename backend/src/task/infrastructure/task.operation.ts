import { injectable } from 'inversify';
import { OperationRepository } from '../../shared/infrastructure/operation.repository';
import { TaskRepository } from '../application/task.repository';
import { Task } from '../entities/task.entity';

@injectable()
export class TaskOperation extends OperationRepository<Task> implements TaskRepository {
  constructor(){
    super(Task);
  }
}