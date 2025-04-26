import { User } from '@roadmap/user/types';

export type UserState = {
  user: User | null;
  setUser: (user: User) => void;
};
