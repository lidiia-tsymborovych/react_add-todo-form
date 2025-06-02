import todosFromServer from '../api/todos';
import { Task } from '../entities/Task';

import { getUserById } from './getUserById';

export const ListOfTodos: Task[] = todosFromServer.map(todo => {
  const user = getUserById(todo.userId);

  return { ...todo, user };
});
