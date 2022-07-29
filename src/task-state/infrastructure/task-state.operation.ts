import { injectable } from 'inversify';
import { OperationRepository } from '../../shared/infrastructure/operation.repository';
import { TaskStateRepository } from '../application/task-state.repository';
import { TaskState } from '../entities/task-state.entity';

@injectable()
export class TaskStateOperation extends OperationRepository<TaskState> implements TaskStateRepository {
  constructor(){
    super(TaskState);
  }
}