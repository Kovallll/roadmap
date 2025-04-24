import { create } from 'zustand';
import { createSelectors } from '@/shared/model/store';
import { AlignLinesState } from './types';

export const store = create<AlignLinesState>((set) => ({
  lines: [],
  setLines: (lines) => set({ lines }),
}));

export const useAlignLinesStore = createSelectors(store);
