import { TaskStateSeed } from '../task-state/application/task-state.seed';
import { TaskSeed } from '../task/application/task.seed';
import container from './container.bootstrap';
import { SERVICES_IDENTIFIERS } from './container.types';

export interface ISeedBootstrap {
  initializeAll(): Promise<void>;
  initializeTaskStates(): Promise<any>;
  initializeTasks(): Promise<any>;
}

export class SeedBootstrap implements ISeedBootstrap {
  async initializeAll(): Promise<void> {
    await this.initializeTaskStates();
    await this.initializeTasks();
  }

  async initializeTaskStates(): Promise<any> {
    const envs = ['develop', 'test']

    if(!envs.includes(process.env.NODE_ENV)) {
      return;
    }    
    const taskStateSeed = container.get<TaskStateSeed>(
      SERVICES_IDENTIFIERS.TASK_STATE_SEED
    );
    return await taskStateSeed.insertAll()
  }

  async initializeTasks(): Promise<any> {
    const envs = ['develop', 'test']

    if(!envs.includes(process.env.NODE_ENV)) {
      return;
    }    
    const taskSeed = container.get<TaskSeed>(
      SERVICES_IDENTIFIERS.TASK_SEED
    );
    await taskSeed.insertAll()
  }

}