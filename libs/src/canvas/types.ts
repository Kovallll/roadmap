import { ReactFlowJsonObject, Node, Edge } from '@xyflow/react';

export type Canvas = {
  id: string;
  userId: string;
  object: ReactFlowJsonObject<Node, Edge>;
  createdAt: string;
  updatedAt: string;
};
