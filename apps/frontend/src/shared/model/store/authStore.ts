import { create } from 'zustand';

import { LOCAL_STORAGE } from '../enums';
import { AuthState } from '../types';
import { createSelectors } from './createSelectors';

export const authStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN),
  refreshToken: localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN),
  setTokens: (access, refresh) => {
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, access);
    localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refresh);
    set({ accessToken: access, refreshToken: refresh });
  },
  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
    set({ accessToken: null, refreshToken: null });
  },
}));

export const useAuthStore = createSelectors(authStore);
