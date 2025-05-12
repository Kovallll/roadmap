import { Edge,Node } from '@xyflow/react';

export type CanvasData = {
  nodes: Node[];
  edges: Edge[];
};

export type Canvas = {
  id: string;
  userId: string;
  title: string;
  data: CanvasData | null;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateCanvasDto = Pick<Canvas, 'userId' | 'title' | 'description'>;
