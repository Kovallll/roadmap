import { Canvas, CanvasData } from '@roadmap/canvas/types';

export type SaveButtonProps = { canvas: Pick<Canvas, 'id' | 'data'> };
export type EditButtonProps = { canvas: Canvas };

export type CanvasState = {
  canvasData: CanvasData | null;
  setCanvasData: (canvasData: CanvasData) => void;
};
