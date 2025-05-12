import { useEffect } from 'react';

import { useFlowStore } from '../../model';

export const useUndoRedo = () => {
  const undo = useFlowStore.use.undo();
  const redo = useFlowStore.use.redo();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrlKey = e.ctrlKey;
      if (ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      if (ctrlKey && (e.key === 'Z' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);
};
