import { InternalNode, Node } from '@xyflow/react';
import { MIN_DISTANCE } from './constants';
import { ClosestNodeResult } from './types';

export const getClosestEdge = (
  internalNode: InternalNode<Node>,
  closestNodes: InternalNode<Node>[]
) => {
  const closestNode = closestNodes.reduce<ClosestNodeResult>(
    (res, n) => {
      if (n.id !== internalNode.id) {
        const dx =
          n.internals.positionAbsolute.x -
          internalNode.internals.positionAbsolute.x;
        const dy =
          n.internals.positionAbsolute.y -
          internalNode.internals.positionAbsolute.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < res.distance && d < MIN_DISTANCE) {
          res.distance = d;
          res.node = n;
        }
      }

      return res;
    },
    {
      distance: Number.MAX_VALUE,
      node: null,
    }
  );

  if (!closestNode.node) {
    return null;
  }

  const closeNodeIsSource =
    closestNode.node.internals.positionAbsolute.x <
    internalNode.internals.positionAbsolute.x;

  return {
    id: closeNodeIsSource
      ? `${closestNode.node.id}-${internalNode.id}`
      : `${internalNode.id}-${closestNode.node.id}`,
    source: closeNodeIsSource ? closestNode.node.id : internalNode.id,
    target: closeNodeIsSource ? internalNode.id : closestNode.node.id,
    className: '',
  };
};
