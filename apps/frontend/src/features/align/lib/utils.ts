import { AlignmentLine } from '../model';

import { alignDiff } from '@/shared/lib';
import { Node, XYPosition } from '@xyflow/react';

export const checkAlignment = (
  movedNode: Node,
  nodes: Node[],
  handleChangeLines: (lines: AlignmentLine[]) => void,
  flowToScreenPosition: (flowPosition: XYPosition) => XYPosition
) => {
  const alignmentLines: AlignmentLine[] = [];

  const movedNodeWidth = movedNode.measured?.width ?? 0;
  const movedNodeHeight = movedNode.measured?.height ?? 0;

  const movedLeft = movedNode.position.x;
  const movedRight = movedLeft + movedNodeWidth;
  const movedTop = movedNode.position.y;
  const movedBottom = movedTop + movedNodeHeight;
  const movedCenterX = movedLeft + movedNodeWidth / 2;
  const movedCenterY = movedTop + movedNodeHeight / 2;

  nodes.forEach((node) => {
    if (node.id === movedNode.id || !node.measured) return;

    const nodeWidth = node.measured.width ?? 1;
    const nodeHeight = node.measured.height ?? 1;

    const nodeLeft = node.position.x;
    const nodeRight = nodeLeft + nodeWidth;
    const nodeTop = node.position.y;
    const nodeBottom = nodeTop + nodeHeight;
    const nodeCenterX = nodeLeft + nodeWidth / 2;
    const nodeCenterY = nodeTop + nodeHeight / 2;

    const checkAndAdd = (
      a: number,
      b: number,
      type: 'x' | 'y',
      flowPos: { x: number; y: number }
    ) => {
      if (Math.abs(a - b) < alignDiff) {
        const screenPos = flowToScreenPosition(flowPos);
        alignmentLines.push({
          type,
          value: type === 'x' ? screenPos.y : screenPos.x,
          axis: type === 'x' ? screenPos.x : screenPos.y,
        });
      }
    };

    checkAndAdd(movedLeft, nodeLeft, 'y', { x: nodeLeft, y: nodeTop });
    checkAndAdd(movedRight, nodeRight, 'y', { x: nodeRight, y: nodeTop });
    checkAndAdd(movedRight, nodeLeft, 'y', { x: nodeLeft, y: nodeTop });
    checkAndAdd(movedLeft, nodeRight, 'y', { x: nodeRight, y: nodeTop });

    checkAndAdd(movedCenterX, nodeCenterX, 'y', {
      x: nodeCenterX,
      y: nodeTop,
    });
    checkAndAdd(movedTop, nodeBottom, 'x', { x: nodeLeft, y: nodeBottom });
    checkAndAdd(movedBottom, nodeTop, 'x', { x: nodeLeft, y: nodeTop });

    checkAndAdd(movedTop, nodeTop, 'x', { x: nodeLeft, y: nodeTop });
    checkAndAdd(movedBottom, nodeBottom, 'x', { x: nodeLeft, y: nodeBottom });
    checkAndAdd(movedCenterY, nodeCenterY, 'x', {
      x: nodeLeft,
      y: nodeCenterY,
    });
  });

  handleChangeLines(alignmentLines);
};

export const getAlignPosition = (node: Node, otherNodes: Node[]) => {
  const newPosition = node.position;

  const nodeWidth = node.measured?.width ?? 0;
  const nodeHeight = node.measured?.height ?? 0;
  const nodeCenterX = newPosition.x + nodeWidth / 2;
  const nodeCenterY = newPosition.y + nodeHeight / 2;

  let isPositionChanged = false;

  for (const other of otherNodes) {
    const oWidth = other.measured?.width;
    const oHeight = other.measured?.height;
    if (!oWidth || !oHeight) continue;

    const oLeft = other.position.x;
    const oRight = oLeft + oWidth;
    const oTop = other.position.y;
    const oBottom = oTop + oHeight;
    const oCenterX = oLeft + oWidth / 2;
    const oCenterY = oTop + oHeight / 2;

    const horChecks: [number, number, () => number][] = [
      [newPosition.x, oRight, () => (newPosition.x = oRight)],
      [
        newPosition.x + nodeWidth,
        oRight,
        () => (newPosition.x = oRight - nodeWidth),
      ],
      [
        newPosition.x + nodeWidth,
        oLeft,
        () => (newPosition.x = oLeft - nodeWidth),
      ],
      [newPosition.x, oLeft, () => (newPosition.x = oLeft)],
    ];

    const vertChecks: [number, number, () => number][] = [
      [newPosition.y, oBottom, () => (newPosition.y = oBottom)],
      [
        newPosition.y + nodeHeight,
        oBottom,
        () => (newPosition.y = oBottom - nodeHeight),
      ],
      [
        newPosition.y + nodeHeight,
        oTop,
        () => (newPosition.y = oTop - nodeHeight),
      ],
      [newPosition.y, oTop, () => (newPosition.y = oTop)],
    ];

    for (const [a, b, apply] of [...horChecks, ...vertChecks]) {
      if (Math.abs(a - b) < alignDiff) {
        apply();
        isPositionChanged = true;
      }
    }

    if (Math.abs(nodeCenterX - oCenterX) < alignDiff) {
      newPosition.x = oCenterX - nodeWidth / 2;
      isPositionChanged = true;
    }

    if (Math.abs(nodeCenterY - oCenterY) < alignDiff) {
      newPosition.y = oCenterY - nodeHeight / 2;
      isPositionChanged = true;
    }
  }

  return { isPositionChanged, newPosition };
};
