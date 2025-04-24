import { Node } from '@xyflow/react';

export interface SelectedNodeState {
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
}
