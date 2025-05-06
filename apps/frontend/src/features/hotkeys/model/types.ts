import { Edge, Node } from '@xyflow/react';

export type FlowState = {
  nodes: Node[];
  edges: Edge[];
  undoStack: { nodes: Node[]; edges: Edge[] }[];
  redoStack: { nodes: Node[]; edges: Edge[] }[];
  setNodes: (
    newNodes: Node[] | ((prev: Node[]) => Node[]),
    options?: UndoRedoOptions
  ) => void;
  setEdges: (
    newEdges: Edge[] | ((prev: Edge[]) => Edge[]),
    options?: UndoRedoOptions
  ) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
};

export type SetState<T> = T | ((prev: T) => T);
export type UndoRedoOptions = { undo?: boolean };
