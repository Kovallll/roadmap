import { create } from 'zustand';
import { SelectedEdgeState } from './types';
import { createSelectors } from '@/shared/model';

export const store = create<SelectedEdgeState>((set) => ({
  selectedEdge: null,
  setSelectedEdge: (edge) => set({ selectedEdge: edge }),
}));

export const useSelectedEdgeStore = createSelectors(store);
