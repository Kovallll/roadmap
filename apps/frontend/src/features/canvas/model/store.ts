import { create } from 'zustand';
import { CanvasState } from './types';
import { createSelectors } from '@/shared/model/store';
import { CanvasData } from '@roadmap/canvas/types';

export const store = create<CanvasState>((set) => ({
  canvasData: null,
  setCanvasData: (canvasData: CanvasData) => set({ canvasData }),
}));

export const useCanvasStore = createSelectors(store);
