import { create } from 'zustand';
import { CanvasState } from '../types';
import { createSelectors } from '@/shared/model';
import { Canvas, CanvasData } from '@roadmap/canvas/types';

export const canvasStore = create<CanvasState>((set) => ({
  canvas: null,
  setCanvas: (canvas: Canvas) => set({ canvas }),
  canvasData: null,
  setCanvasData: (canvasData: CanvasData) => set({ canvasData }),
  isEdit: false,
  setIsEdit: (isEdit: boolean) => set({ isEdit }),
}));

export const useCanvasStore = createSelectors(canvasStore);
