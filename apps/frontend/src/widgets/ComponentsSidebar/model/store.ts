import { create } from 'zustand';
import { TypeStore } from './types';
import { createSelectors } from '@/shared/model';

export const store = create<TypeStore>((set) => ({
  type: null,
  setType: (type) => set({ type }),
}));

export const useTypeStore = createSelectors(store);
