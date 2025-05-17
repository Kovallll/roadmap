import { useCallback, useEffect } from 'react';

import { useFlowStore } from '@/features/hotkeys/model';
import { useCanvasStore, useSelectedNodeStore } from '@/shared/model/store';
import { useSelectedEdgeStore } from '@/widgets/EdgeSidebar/model';
import { Canvas } from '@roadmap/canvas/types';
import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
} from '@xyflow/react';

export const useNodeEdgeHandles = (
  canvas: Canvas,
  handleChangeOpen: (value: boolean) => void
) => {
  const nodes = useFlowStore.use.nodes();
  const edges = useFlowStore.use.edges();
  const setNodes = useFlowStore.use.setNodes();
  const setEdges = useFlowStore.use.setEdges();

  const isEdit = useCanvasStore.use.isEdit();
  const setCanvasData = useCanvasStore.use.setCanvasData();
  const setCanvas = useCanvasStore.use.setCanvas();

  const setSelectedNode = useSelectedNodeStore.use.setSelectedNode();
  const setSelectedEdge = useSelectedEdgeStore.use.setSelectedEdge();

  useEffect(() => {
    setNodes(canvas.data?.nodes || []);
    setEdges(canvas.data?.edges || []);
  }, []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      const filteredChanges = isEdit
        ? changes
        : changes.filter((c) => c.type !== 'remove');
      setNodes((nds) => applyNodeChanges(filteredChanges, nds));
    },
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      const filteredChanges = isEdit
        ? changes
        : changes.filter((c) => c.type !== 'remove');
      setEdges((eds) => applyEdgeChanges(filteredChanges, eds));
    },
    [setEdges]
  );

  const handleSelectEdge = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      handleChangeOpen(true);
      setSelectedNode(null);
      setSelectedEdge(edge);
    },
    [setSelectedEdge, setSelectedNode]
  );

  const handleSelectNode = useCallback(
    (_: React.MouseEvent, node: Node) => {
      handleChangeOpen(true);
      setSelectedEdge(null);
      setSelectedNode(node);
    },
    [setSelectedEdge, setSelectedNode]
  );

  const handleReset = useCallback(() => {
    setSelectedEdge(null);
    setSelectedNode(null);
  }, [setSelectedEdge, setSelectedNode]);

  const handleIsValidConnection = () => {
    return true;
  };

  useEffect(() => {
    setCanvasData({ nodes, edges });
    setCanvas({ ...canvas, data: { ...canvas.data, nodes, edges } });
  }, [nodes, edges, setCanvasData]);

  return {
    handleSelectEdge,
    handleSelectNode,
    handleReset,
    handleIsValidConnection,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
  };
};
