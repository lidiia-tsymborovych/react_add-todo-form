import usersFromServer from '../api/users';
import { User } from '../entities/User';

export function getUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}
