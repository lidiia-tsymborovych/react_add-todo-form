import { Todo } from './Todo';
import { User } from './User';

export type Task = Todo & { user: User | null };
