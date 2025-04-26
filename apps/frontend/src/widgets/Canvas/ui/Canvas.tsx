import { memo, useCallback, useEffect } from 'react';

import { nodeColor } from '../lib';
import { CanvasProps, useCanvasHandlers } from '../model';

import { useAlignLinesStore } from '@/features/Align/model';
import { AlignLines } from '@/features/Align/ui/AlignLines';
import { useCanvasStore } from '@/features/canvas/model/store';
import { useNodeClipboard } from '@/features/Copy/lib/hooks/useNodeClipboard';
import { nodeLabels, nodeTypes } from '@/shared/lib';
import { ComponentsSidebar } from '@/widgets/ComponentsSidebar/ui/ComponentsSidebar';
import { useSelectedEdgeStore } from '@/widgets/EdgeSidebar/model/store';
import { EdgeSidebar } from '@/widgets/EdgeSidebar/ui/EdgeSidebar';
import { useSelectedNodeStore } from '@/widgets/NodeSidebar/model/store';
import { NodeSidebar } from '@/widgets/NodeSidebar/ui/NodeSidebar';
import {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';

const Canvas = ({ canvas }: CanvasProps) => {
  const [nodes, _, onNodesChange] = useNodesState(canvas.data?.nodes || []);
  const [edges, __, onEdgesChange] = useEdgesState(canvas.data?.edges || []);

  const setCanvasData = useCanvasStore.use.setCanvasData();

  const setSelectedNode = useSelectedNodeStore.use.setSelectedNode();
  const setSelectedEdge = useSelectedEdgeStore.use.setSelectedEdge();
  const setLines = useAlignLinesStore.use.setLines();

  const { onDrop, onDragOver, onConnect, onNodeDrag, onNodeDragStop } =
    useCanvasHandlers(setLines);

  useNodeClipboard();

  useEffect(() => {
    setCanvasData({ nodes, edges });
  }, [nodes, edges, setCanvasData]);

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

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        onEdgeClick={handleSelectEdge}
        onNodeClick={handleSelectNode}
        onPaneClick={handleReset}
        connectionMode={ConnectionMode.Loose}
        isValidConnection={() => {
          return true;
        }}
        fitView
      >
        <Background variant={BackgroundVariant.Lines} />
        <ComponentsSidebar nodeLabels={nodeLabels} />
        <NodeSidebar />
        <EdgeSidebar />
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <AlignLines />
      </ReactFlow>
    </div>
  );
};

export default memo(Canvas);
