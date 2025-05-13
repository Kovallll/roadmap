import { memo, useEffect, useState } from 'react';

import { nodeColor } from '../lib';
import { CanvasProps, useCanvasHandlers, useNodeEdgeHandles } from '../model';
import styles from './styles.module.scss';

import { AlignLines } from '@/features/align/ui/AlignLines';
import { useNodeClipboard } from '@/features/hotkeys/lib';
import { useSaveWithShortcut } from '@/features/hotkeys/lib/hooks/useSaveWithShortcut';
import { useUndoRedo } from '@/features/hotkeys/lib/hooks/useUndoRedo';
import { useFlowStore } from '@/features/hotkeys/model';
import { useUnsaveChanges } from '@/features/unsave-changes/model';
import { edgeTypes, nodeLabels, nodeTypes } from '@/shared/lib';
import { useCanvasStore } from '@/shared/model';
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
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeOpen = (value: boolean) => {
    setIsOpen(value);
  };

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
  } = useNodeEdgeHandles(canvas, handleChangeOpen);

  const isSave = useCanvasStore.use.isSave();
  const isEdit = useCanvasStore.use.isEdit();

  useNodeClipboard();
  useUndoRedo();
  useSaveWithShortcut();
  useUnsaveChanges(!isSave);

  const resetUndoRedo = useFlowStore.use.reset();

  useEffect(() => {
    return () => {
      resetUndoRedo();
    };
  }, [resetUndoRedo]);

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
        nodesDraggable={isEdit}
        nodesConnectable={isEdit}
        fitView
      >
        <Background variant={BackgroundVariant.Lines} />
        <ComponentsSidebar nodeLabels={nodeLabels} />
        <NodeSidebar isOpen={isOpen} handleChangeOpen={handleChangeOpen} />
        <EdgeSidebar isOpen={isOpen} handleChangeOpen={handleChangeOpen} />
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <AlignLines />
      </ReactFlow>
    </div>
  );
};

export default memo(Canvas);
