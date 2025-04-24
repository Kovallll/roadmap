import { Edge } from '@xyflow/react';

export interface SelectedEdgeState {
  selectedEdge: Edge | null;
  setSelectedEdge: (edge: Edge | null) => void;
}
