import { create } from 'zustand';
import { TypeStore } from './types';
import { createSelectors } from '@/shared/model/store';

export const store = create<TypeStore>((set) => ({
  type: null,
  setType: (type) => set({ type }),
}));

export const useTypeStore = createSelectors(store);
