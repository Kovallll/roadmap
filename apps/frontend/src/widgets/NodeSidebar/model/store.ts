import { create } from 'zustand';
import { SelectedNodeState } from './types';
import { createSelectors } from '@/shared/model';

export const store = create<SelectedNodeState>((set) => ({
  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),
}));

export const useSelectedNodeStore = createSelectors(store);
