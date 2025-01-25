import { User } from '@src/types/types';

export function excludePassword(user: User): Omit<User, 'password'> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
