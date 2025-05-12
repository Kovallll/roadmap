import { create } from 'zustand';

import { AlignLinesState } from './types';

import { createSelectors } from '@/shared/model';

export const store = create<AlignLinesState>((set) => ({
  lines: [],
  setLines: (lines) => set({ lines }),
}));

export const useAlignLinesStore = createSelectors(store);
