import { create } from 'zustand';
import { UserState } from './types';
import { createSelectors } from '@/shared/model/store';
import { User } from '@roadmap/user/types';

export const store = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));

export const useUserStore = createSelectors(store);
