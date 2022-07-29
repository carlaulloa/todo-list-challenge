import { RepositoryBase } from '../../shared/application/base.repository';
import { Task } from '../entities/task.entity';

export interface TaskRepository extends RepositoryBase<Task> {
}