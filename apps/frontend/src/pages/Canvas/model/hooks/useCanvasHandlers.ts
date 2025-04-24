import { useCallback } from 'react';

import { addEdge, Connection, Node, useReactFlow } from '@xyflow/react';
import { checkAlignment, getAlignPosition } from '@/features/Align/lib';
import { AlignmentLine } from '@/features/Align/model/types';
import { useTypeStore } from '@/widgets/ComponentsSidebar/model/store';
import { createNode } from '@/shared/lib/utils';

export const useCanvasHandlers = (
  handleChangeLines: (lines: AlignmentLine[]) => void
) => {
  const {
    setEdges,
    getNodes,
    setNodes,
    addNodes,
    flowToScreenPosition,
    screenToFlowPosition,
  } = useReactFlow();
  const type = useTypeStore.use.type();

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = createNode(type, position);

      addNodes(newNode);
    },
    [screenToFlowPosition, type]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  const onNodeDragStop = useCallback(() => {
    handleChangeLines([]);
  }, []);

  const onNodeDrag = (_: React.MouseEvent, node: Node) => {
    const nodes = getNodes();
    const otherNodes = nodes.filter((n) => n.id !== node.id);

    const { isPositionChanged, newPosition } = getAlignPosition(
      node,
      otherNodes
    );

    if (isPositionChanged) {
      setNodes((nds) =>
        nds.map((n) => (n.id === node.id ? { ...n, position: newPosition } : n))
      );
    }
    checkAlignment(node, nodes, handleChangeLines, flowToScreenPosition);
  };

  return { onDrop, onDragOver, onConnect, onNodeDrag, onNodeDragStop };
};
