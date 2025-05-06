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
import { useCallback, useEffect } from 'react';

export const useNodeEdgeHandles = (canvas: Canvas) => {
  const nodes = useFlowStore.use.nodes();
  const edges = useFlowStore.use.edges();
  const setNodes = useFlowStore.use.setNodes();
  const setEdges = useFlowStore.use.setEdges();

  useEffect(() => {
    setNodes(canvas.data?.nodes || []);
    setEdges(canvas.data?.edges || []);
  }, []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );
  const setCanvasData = useCanvasStore.use.setCanvasData();
  const setCanvas = useCanvasStore.use.setCanvas();

  const setSelectedNode = useSelectedNodeStore.use.setSelectedNode();
  const setSelectedEdge = useSelectedEdgeStore.use.setSelectedEdge();

  const handleSelectEdge = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      setSelectedNode(null);
      setSelectedEdge(edge);
    },
    [setSelectedEdge, setSelectedNode]
  );

  const handleSelectNode = useCallback(
    (_: React.MouseEvent, node: Node) => {
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
