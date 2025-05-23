import { create } from 'zustand';

import { UserState } from './types';

import { createSelectors } from '@/shared/model';
import { User } from '@roadmap/user/types';

export const store = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clear: () => set({ user: null }),
}));

export const useUserStore = createSelectors(store);
