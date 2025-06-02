import { User } from '../entities/User';
import usersFromServer from '../api/users';

export const getUserById = (userId: number): User | null =>
  usersFromServer.find(user => user.id === userId) || null;
