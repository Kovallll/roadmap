import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useFlowStore } from '../../model';
import { pasteOffset } from '../constants';

import { Node } from '@xyflow/react';
import { useCanvasStore } from '@/shared/model';

export const useNodeClipboard = () => {
  const clipboard = useRef<Node[]>([]);
  const offsetStep = useRef(0);

  const setNodes = useFlowStore.use.setNodes();
  const nodes = useFlowStore.use.nodes();
  const isEdit = useCanvasStore.use.isEdit();

  useEffect(() => {
    if (!isEdit) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey;

      const active = document.activeElement;
      const isInput =
        active?.tagName === 'INPUT' ||
        active?.tagName === 'TEXTAREA' ||
        (active as HTMLElement)?.isContentEditable;

      if (isInput) return;

      if (isCtrl && e.key === 'c') {
        const selected = nodes.filter((n) => n.selected);
        clipboard.current = selected;
        offsetStep.current = 0;
      }

      if (isCtrl && e.key === 'v') {
        const nodesToPaste = clipboard.current;
        if (!nodesToPaste.length) return;

        offsetStep.current += 0.4;

        const offset = pasteOffset * offsetStep.current;

        setNodes(
          (nds) => {
            const unselected = nds.map((n) => ({ ...n, selected: false }));

            const pasted = nodesToPaste.map((node) => ({
              ...node,
              id: uuidv4(),
              position: {
                x: node.position.x + offset,
                y: node.position.y + offset,
              },
              selected: true,
            }));

            return [...unselected, ...pasted];
          },
          { undo: true }
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nodes, setNodes]);
};
