import { Canvas, CanvasData } from '@roadmap/canvas/types';
import { ButtonProps } from 'antd';

export type SaveButtonProps = {
  canvas: Canvas;
} & ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
export type EditButtonProps = { canvas: Canvas };

export type CanvasState = {
  canvasData: CanvasData | null;
  setCanvasData: (canvasData: CanvasData) => void;
};

export type SettingButtonProps = { canvas: Canvas };

export type CreateButtonProps = { userId: string };
