import { useCallback, useRef } from 'react';

import {
  addEdge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
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
    getEdges,
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

      const sidebarEl = document.getElementById('sidebar');

      const { clientX, clientY } = event;
      const dropTarget = document.elementFromPoint(clientX, clientY);

      if (sidebarEl && sidebarEl.contains(dropTarget)) {
        return;
      }

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
      setEdges((eds) =>
        addEdge(
          {
            source,
            target,
            sourceHandle,
            targetHandle,
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onNodesDelete = useCallback((deleted: Node[]) => {
    const nodes = getNodes();
    const edges = getEdges();
    setEdges(
      deleted.reduce((acc, node) => {
        const incomers = getIncomers(node, nodes, edges);
        const outgoers = getOutgoers(node, nodes, edges);
        const connectedEdges = getConnectedEdges([node], edges);

        const remainingEdges = acc.filter(
          (edge) => !connectedEdges.includes(edge)
        );

        const createdEdges = incomers.flatMap(({ id: source }) =>
          outgoers.map(({ id: target }) => ({
            id: `${source}->${target}`,
            source,
            target,
          }))
        );

        return [...remainingEdges, ...createdEdges];
      }, edges)
    );
  }, []);

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

  return {
    onDrop,
    onDragOver,
    onConnect,
    onNodeDrag,
    onNodeDragStop,
    onNodesDelete,
  };
};
