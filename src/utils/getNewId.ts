import { Task } from '../entities/Task';

export const getNewId = (allTasks: Task[]) => {
  return Math.max(0, ...allTasks.map(task => task.id)) + 1;
};
