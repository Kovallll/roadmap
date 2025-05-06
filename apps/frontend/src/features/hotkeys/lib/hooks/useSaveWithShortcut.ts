import { useEffect } from 'react';
import { useSaveCanvas } from '@/features/canvas/model';
import { useCanvasStore } from '@/shared/model';

export const useSaveWithShortcut = () => {
  const canvas = useCanvasStore.use.canvas();
  const { mutate } = useSaveCanvas(canvas?.id ?? '');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const isSave = (isMac && e.metaKey) || (!isMac && e.ctrlKey);

      if (isSave && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (canvas?.id) {
          mutate(canvas);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas, mutate]);
};
