import { RepositoryBase } from '../../shared/application/base.repository';
import { TaskState } from '../entities/task-state.entity';

export interface TaskStateRepository extends RepositoryBase<TaskState> {
}