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
import { useFlowStore } from '@/features/hotkeys/model';
import { v4 as uuidv4 } from 'uuid';

let isUndo = true;

export const useCanvasHandlers = () => {
  const { getNodes, getEdges, flowToScreenPosition, screenToFlowPosition } =
    useReactFlow();

  const setNodes = useFlowStore.use.setNodes();
  const setEdges = useFlowStore.use.setEdges();

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
      setNodes((nds) => [...nds, newNode], { undo: true });
    },
    [type, screenToFlowPosition, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onConnect: OnConnect = useCallback(
    ({ source, target, sourceHandle, targetHandle }) => {
      setEdges(
        (eds) =>
          addEdge(
            {
              source,
              target,
              sourceHandle,
              targetHandle,
              id: uuidv4(),
              type: 'custom',
            },
            eds
          ),
        { undo: true }
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
            id: uuidv4(),
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
      if (isUndo) {
        setNodes((nds) => nds.map((n) => (n.id === node.id ? node : n)), {
          undo: isUndo,
        });
        isUndo = false;
      }
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
    },
    [getNodes, flowToScreenPosition, setLines, setNodes, getClosestNodes]
  );

  const onNodeDragStop = useCallback(
    (_: React.MouseEvent) => {
      setLines([]);
      isUndo = true;
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
