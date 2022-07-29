import { TaskStateSeed } from '../task-state/application/task-state.seed';
import { TaskSeed } from '../task/application/task.seed';
import container from './container.bootstrap';
import { SERVICES_IDENTIFIERS } from './container.types';
import yenv from 'yenv';

const env = yenv();

export interface ISeedBootstrap {
  initialize(): Promise<void>;
}

export class SeedBootstrap implements ISeedBootstrap {
  async initialize(): Promise<void> {

    if(env.NODE_ENV !== 'develop') {
      return;
    }    
    const taskStateSeed = container.get<TaskStateSeed>(
      SERVICES_IDENTIFIERS.TASK_STATE_SEED
    );
    await taskStateSeed.insertAll()
    const taskSeed = container.get<TaskSeed>(
      SERVICES_IDENTIFIERS.TASK_SEED
    );
    await taskSeed.insertAll()
    
  }

}