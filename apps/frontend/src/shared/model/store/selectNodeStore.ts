import { create } from 'zustand';

import { createSelectors, SelectedNodeState } from '@/shared/model';

export const selectedNodeStore = create<SelectedNodeState>((set) => ({
  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),
}));

export const useSelectedNodeStore = createSelectors(selectedNodeStore);
