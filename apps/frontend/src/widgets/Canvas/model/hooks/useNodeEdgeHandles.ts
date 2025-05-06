import { useCanvasStore, useSelectedNodeStore } from '@/shared/model/store';
import { useSelectedEdgeStore } from '@/widgets/EdgeSidebar/model';

import { Canvas } from '@roadmap/canvas/types';
import { Edge, Node, useEdgesState, useNodesState } from '@xyflow/react';
import { useCallback, useEffect } from 'react';

export const useNodeEdgeHandles = (canvas: Canvas) => {
  const [nodes, _, onNodesChange] = useNodesState(canvas.data?.nodes || []);
  const [edges, __, onEdgesChange] = useEdgesState(canvas.data?.edges || []);

  const setCanvasData = useCanvasStore.use.setCanvasData();

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
