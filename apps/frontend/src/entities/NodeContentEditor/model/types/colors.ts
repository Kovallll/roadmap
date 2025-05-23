import { JSX } from 'react';

export type RGB = {
  b: number;
  g: number;
  r: number;
};
export type HSV = {
  h: number;
  s: number;
  v: number;
};
export type Color = {
  hex: string;
  hsv: HSV;
  rgb: RGB;
};

export type Position = {
  x: number;
  y: number;
};

export type MoveWrapperProps = {
  className?: string;
  style?: React.CSSProperties;
  onChange: (position: Position) => void;
  children: JSX.Element;
  skipAddingToHistoryStack: React.RefObject<boolean>;
};
