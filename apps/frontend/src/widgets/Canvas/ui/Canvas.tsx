import { memo } from 'react';

import { nodeColor } from '../lib';
import { CanvasProps, useCanvasHandlers, useNodeEdgeHandles } from '../model';
import styles from './styles.module.scss';

import { AlignLines } from '@/features/align/ui/AlignLines';
import { useNodeClipboard } from '@/features/copy/lib';
import { edgeTypes, nodeLabels, nodeTypes } from '@/shared/lib';
import { ComponentsSidebar } from '@/widgets/ComponentsSidebar/ui/ComponentsSidebar';
import { EdgeSidebar } from '@/widgets/EdgeSidebar/ui/EdgeSidebar';
import { NodeSidebar } from '@/widgets/NodeSidebar/ui/NodeSidebar';
import {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  MiniMap,
  ReactFlow,
} from '@xyflow/react';

const Canvas = ({ canvas }: CanvasProps) => {
  const {
    onDrop,
    onDragOver,
    onConnect,
    onNodeDrag,
    onNodeDragStop,
    onNodesDelete,
  } = useCanvasHandlers();

  const {
    handleIsValidConnection,
    handleReset,
    handleSelectEdge,
    handleSelectNode,
    edges,
    nodes,
    onEdgesChange,
    onNodesChange,
  } = useNodeEdgeHandles(canvas);

  useNodeClipboard();

  return (
    <div className={styles.container}>
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
        edgeTypes={edgeTypes}
        onEdgeClick={handleSelectEdge}
        onNodeClick={handleSelectNode}
        onPaneClick={handleReset}
        onNodesDelete={onNodesDelete}
        connectionMode={ConnectionMode.Loose}
        isValidConnection={handleIsValidConnection}
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
