import { Canvas, CanvasData } from '@roadmap/canvas/types';
import { NodeProps, Node } from '@xyflow/react';

export type BaseNodeProps = {
  nodeProps: NodeProps;
  className?: string;
  children?: React.ReactNode;
};

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
};

export type ListItem = { id: string; label: string };

export type TextAreaProps = {
  data?: Record<string, unknown>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export type ApiResponseError = {
  statusCode: number;
  message: string;
};

export interface SelectedNodeState {
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
}

export type CanvasState = {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas) => void;
  canvasData: CanvasData | null;
  setCanvasData: (canvasData: CanvasData) => void;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
};

export type Styles = { [x: string]: string | number };

export type NodeStatusType = { color: string; value: string };
