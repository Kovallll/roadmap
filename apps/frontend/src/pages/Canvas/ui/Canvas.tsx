import { memo } from 'react';

import {
  initialEdges,
  initialNodes,
  nodeColor,
  nodeLabels,
  nodeTypes,
} from '../lib';
import { useCanvasHandlers } from '../model';

import { useAlignLinesStore } from '@/features/Align/model';
import { AlignLines } from '@/features/Align/ui/AlignLines';
import { useNodeClipboard } from '@/features/Copy/lib/hooks/useNodeClipboard';
import { ComponentsSidebar } from '@/widgets/ComponentsSidebar/ui/ComponentsSidebar';
import { useSelectedEdgeStore } from '@/widgets/EdgeSidebar/model/store';
import { EdgeSidebar } from '@/widgets/EdgeSidebar/ui/EdgeSidebar';
import { useSelectedNodeStore } from '@/widgets/NodeSidebar/model/store';
import { NodeSidebar } from '@/widgets/NodeSidebar/ui/NodeSidebar';
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useNodeClipboard();

  const setSelectedNode = useSelectedNodeStore.use.setSelectedNode();
  const setSelectedEdge = useSelectedEdgeStore.use.setSelectedEdge();
  const setLines = useAlignLinesStore.use.setLines();

  const { onDrop, onDragOver, onConnect, onNodeDrag, onNodeDragStop } =
    useCanvasHandlers(setLines);

  const handleSelectEdge = (_: React.MouseEvent, edge: Edge) => {
    setSelectedNode(null);
    setSelectedEdge(edge);
  };

  const handleSelectNode = (_: React.MouseEvent, node: Node) => {
    setSelectedEdge(null);
    setSelectedNode(node);
  };

  const handleReset = () => {
    setSelectedEdge(null);
    setSelectedNode(null);
  };

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
