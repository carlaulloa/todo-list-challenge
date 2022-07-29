export const SERVICES_IDENTIFIERS = {
  TASK_REPOSITORY: Symbol.for('task.repository'),
  TASK_USECASE: Symbol.for('task.service'),
  TASK_CONTROLLER: Symbol.for('task.controller'),
  TASK_SEED: Symbol.for('task.seed'),

  TASK_STATE_REPOSITORY: Symbol.for('task-state.repository'),
  TASK_STATE_USECASE: Symbol.for('task-state.service'),
  TASK_STATE_CONTROLLER: Symbol.for('task-state.controller'),
  TASK_STATE_SEED: Symbol.for('task-state.seed'),
}