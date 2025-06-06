import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';
import { Todo } from './Todo';
import { User } from './User';

export type TodoWithUser = Todo & { user: User | null };

export const todoList: TodoWithUser[] = todosFromServer.map(todo => {
  const user: User =
    usersFromServer.find(({ id }) => id === todo.userId) || null;

  return { ...todo, user };
});
