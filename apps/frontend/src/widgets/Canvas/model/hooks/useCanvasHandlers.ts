import { useCallback } from 'react';

import {
  addEdge,
  Node,
  OnConnect,
  useReactFlow,
  useStoreApi,
} from '@xyflow/react';

import { useTypeStore } from '@/widgets/ComponentsSidebar/model/store';
import { createNode } from '@/shared/lib/utils';
import { AlignmentLine } from '@/features/Align/model';
import { checkAlignment, getAlignPosition } from '@/features/Align/lib';
import { getClosestEdge } from '@/features/proximityConnect/lib';

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
    getInternalNode,
  } = useReactFlow();
  const store = useStoreApi();

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
    [screenToFlowPosition, type, addNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onConnect: OnConnect = useCallback(
    ({ source, target, sourceHandle, targetHandle }) => {
      const nodes = getNodes();
      console.log(sourceHandle, targetHandle, nodes, 'onConnect');
      return setEdges((eds) =>
        nodes
          .filter((node) => node.id === source || node.selected)
          .reduce(
            (eds, node) =>
              addEdge(
                {
                  source: node.id,
                  target,
                  sourceHandle: sourceHandle,
                  targetHandle: targetHandle,
                },
                eds
              ),
            eds
          )
      );
    },
    []
  );

  const { nodeLookup } = store.getState();
  const closestNodes = Array.from(nodeLookup.values());

  const onNodeDrag = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const nodes = getNodes();
      const otherNodes = nodes.filter((n) => n.id !== node.id);

      const { isPositionChanged, newPosition } = getAlignPosition(
        node,
        otherNodes
      );

      if (isPositionChanged) {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === node.id ? { ...n, position: newPosition } : n
          )
        );
      }

      checkAlignment(node, nodes, handleChangeLines, flowToScreenPosition);

      const internalNode = getInternalNode(node.id);
      const closeEdge = internalNode
        ? getClosestEdge(internalNode, closestNodes)
        : null;

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp');

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target
          )
        ) {
          closeEdge.className = 'temp';
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [
      getNodes,
      setNodes,
      setEdges,
      flowToScreenPosition,
      handleChangeLines,
      closestNodes,
    ]
  );

  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, node: Node) => {
      handleChangeLines([]);
      const internalNode = getInternalNode(node.id);
      const closeEdge = internalNode
        ? getClosestEdge(internalNode, closestNodes)
        : null;

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp');

        if (
          closeEdge &&
          !nextEdges.find(
            (ne) =>
              ne.source === closeEdge.source && ne.target === closeEdge.target
          )
        ) {
          nextEdges.push(closeEdge);
        }

        return nextEdges;
      });
    },
    [getNodes, setEdges, handleChangeLines, closestNodes]
  );

  return { onDrop, onDragOver, onConnect, onNodeDrag, onNodeDragStop };
};
