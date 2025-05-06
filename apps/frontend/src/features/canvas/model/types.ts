import { Canvas } from '@roadmap/canvas/types';
import { ButtonProps } from 'antd';

export type SaveButtonProps = {
  canvas: Canvas;
} & ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
export type EditButtonProps = { canvasId: Canvas['id'] };
export type ViewButtonProps = { canvasId: Canvas['id'] };
export type DeleteButtonProps = { canvasId: Canvas['id'] };

export type SettingButtonProps = { canvas: Canvas };

export type CreateButtonProps = { userId: string };
