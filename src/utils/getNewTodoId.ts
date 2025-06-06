import { TodoWithUser } from '../entities/TodoWithUser';

export function getNewTodoId(currentList: TodoWithUser[]): number {
  return Math.max(...currentList.map(todo => todo.id)) + 1;
}
