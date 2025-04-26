import { InternalNode, Node } from '@xyflow/react';

export type ClosestNodeResult = {
  distance: number;
  node: InternalNode<Node> | null;
};
