import { create } from 'zustand';

import { FlowState,SetState, UndoRedoOptions } from './types';

import { createSelectors } from '@/shared/model';
import { Edge, Node } from '@xyflow/react';

export const flowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  undoStack: [],
  redoStack: [],

  setNodes: (newNodes: SetState<Node[]>, options?: UndoRedoOptions) => {
    const { nodes, edges } = get();
    const nodesCopy = structuredClone(nodes);

    const updatedNodes =
      typeof newNodes === 'function' ? newNodes(nodesCopy) : newNodes;

    set({ nodes: updatedNodes });

    if (options?.undo) {
      set((state) => ({
        undoStack: [...state.undoStack, { nodes, edges }],
        redoStack: [],
      }));
    }
  },

  setEdges: (newEdges: SetState<Edge[]>, options?: UndoRedoOptions) => {
    const { nodes, edges } = get();
    const edgesCopy = structuredClone(edges);

    const updatedEdges =
      typeof newEdges === 'function' ? newEdges(edgesCopy) : newEdges;

    set({ edges: updatedEdges });

    if (options?.undo) {
      set((state) => ({
        undoStack: [...state.undoStack, { nodes, edges }],
        redoStack: [],
      }));
    }
  },

  undo: () => {
    const { undoStack, redoStack, nodes, edges } = get();
    if (undoStack.length === 0) return;

    const previous = undoStack[undoStack.length - 1];

    set({
      nodes: previous.nodes,
      edges: previous.edges,
      undoStack: undoStack.slice(0, -1),
      redoStack: [...redoStack, { nodes, edges }],
    });
  },

  redo: () => {
    const { undoStack, redoStack, nodes, edges } = get();
    if (redoStack.length === 0) return;

    const next = redoStack[redoStack.length - 1];

    set({
      nodes: next.nodes,
      edges: next.edges,
      undoStack: [...undoStack, { nodes, edges }],
      redoStack: redoStack.slice(0, -1),
    });
  },

  reset: () => {
    set({
      undoStack: [],
      redoStack: [],
    });
  },
}));

export const useFlowStore = createSelectors(flowStore);
