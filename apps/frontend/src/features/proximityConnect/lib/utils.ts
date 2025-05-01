import { InternalNode, Node, Edge } from '@xyflow/react';
import { MIN_DISTANCE } from './constants';
import { ClosestNodeResult } from './types';

const getHandlesByDirection = (dx: number, dy: number) => {
  const horizontal = Math.abs(dx) > Math.abs(dy);
  if (horizontal) {
    return dx > 0
      ? { sourceHandle: 'right', targetHandle: 'left' }
      : { sourceHandle: 'left', targetHandle: 'right' };
  } else {
    return dy > 0
      ? { sourceHandle: 'bottom', targetHandle: 'top' }
      : { sourceHandle: 'top', targetHandle: 'bottom' };
  }
};

export const getClosestEdge = (
  internalNode: InternalNode<Node>,
  closestNodes: InternalNode<Node>[]
): Edge | null => {
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

  if (!closestNode.node) return null;

  const sourceNode = internalNode;
  const targetNode = closestNode.node;

  const dx =
    targetNode.internals.positionAbsolute.x -
    sourceNode.internals.positionAbsolute.x;
  const dy =
    targetNode.internals.positionAbsolute.y -
    sourceNode.internals.positionAbsolute.y;

  const { sourceHandle, targetHandle } = getHandlesByDirection(dx, dy);

  return {
    id: `${sourceNode.id}-${targetNode.id}`,
    source: sourceNode.id,
    target: targetNode.id,
    sourceHandle,
    targetHandle,
    className: '',
  };
};
