import { useCallback } from 'react';
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

import { useTypeStore } from '@/widgets/ComponentsSidebar/model';
import { createNode } from '@/shared/lib';
import { useAlignLinesStore } from '@/features/align/model';
import { checkAlignment, getAlignPosition } from '@/features/align/lib';
import { getClosestEdge } from '@/features/proximityConnect/lib';

export const useCanvasHandlers = () => {
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

  const setLines = useAlignLinesStore.use.setLines();

  const store = useStoreApi();
  const type = useTypeStore.use.type();

  const getClosestNodes = () =>
    Array.from(store.getState().nodeLookup.values());

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!type) return;

      const sidebarEl = document.getElementById('sidebar');
      if (
        sidebarEl?.contains(
          document.elementFromPoint(event.clientX, event.clientY)
        )
      )
        return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = createNode(type, position);
      addNodes(newNode);
    },
    [type, screenToFlowPosition, addNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onConnect: OnConnect = useCallback(
    ({ source, target, sourceHandle, targetHandle }) => {
      setEdges((eds) =>
        addEdge({ source, target, sourceHandle, targetHandle }, eds)
      );
    },
    [setEdges]
  );

  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      const nodes = getNodes();
      const edges = getEdges();

      const updatedEdges = deleted.reduce((acc, node) => {
        const incomers = getIncomers(node, nodes, edges);
        const outgoers = getOutgoers(node, nodes, edges);
        const connected = getConnectedEdges([node], edges);

        const remaining = acc.filter((e) => !connected.includes(e));
        const newEdges = incomers.flatMap(({ id: source }) =>
          outgoers.map(({ id: target }) => ({
            id: `${source}->${target}`,
            source,
            target,
          }))
        );

        return [...remaining, ...newEdges];
      }, edges);

      setEdges(updatedEdges);
    },
    [getNodes, getEdges, setEdges]
  );

  const onNodeDrag = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const nodes = getNodes();
      const others = nodes.filter((n) => n.id !== node.id);

      const { isPositionChanged, newPosition } = getAlignPosition(node, others);
      if (isPositionChanged) {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === node.id ? { ...n, position: newPosition } : n
          )
        );
      }

      checkAlignment(node, nodes, setLines, flowToScreenPosition);
      const internalNode = getInternalNode(node.id);
      const closeEdge = internalNode
        ? getClosestEdge(internalNode, getClosestNodes())
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
      setLines,
      getClosestNodes,
    ]
  );

  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setLines([]);
      const internalNode = getInternalNode(node.id);
      const closeEdge = internalNode
        ? getClosestEdge(internalNode, getClosestNodes())
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
    [getNodes, setEdges, setLines, getClosestNodes]
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
