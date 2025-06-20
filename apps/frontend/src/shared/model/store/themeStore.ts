import { create } from 'zustand';

import { ThemeState } from '../types';

import { createSelectors, LOCAL_STORAGE } from '@/shared/model';
import { Theme } from '@roadmap/user/types';

export const themeStore = create<ThemeState>((set) => ({
  theme: (sessionStorage.getItem(LOCAL_STORAGE.THEME) as Theme) ?? 'dark',
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      sessionStorage.setItem(LOCAL_STORAGE.THEME, newTheme);
      return {
        theme: newTheme,
      };
    }),
  setTheme: (theme) => set({ theme }),
}));

export const useThemeStore = createSelectors(themeStore);
