import { useEffect, useRef } from 'react';
import { useReactFlow, Node } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { pasteOffset } from '../constants';

export const useNodeClipboard = () => {
  const { getNodes, setNodes } = useReactFlow();
  const clipboard = useRef<Node[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey;

      if (isCtrl && e.key === 'c') {
        const selected = getNodes().filter((n) => n.selected);
        clipboard.current = selected;
      }

      if (isCtrl && e.key === 'v') {
        const nodesToPaste = clipboard.current;
        if (!nodesToPaste.length) return;

        setNodes((nds) => {
          const unselected = nds.map((n) => ({ ...n, selected: false }));

          const pasted = nodesToPaste.map((node) => ({
            ...node,
            id: uuidv4(),
            position: {
              x: node.position.x + pasteOffset,
              y: node.position.y + pasteOffset,
            },
            selected: true,
          }));

          return [...unselected, ...pasted];
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [getNodes, setNodes]);
};
