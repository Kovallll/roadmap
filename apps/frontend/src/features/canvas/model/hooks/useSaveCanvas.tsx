import { toast } from 'react-toastify';

import { saveCanvas } from '../../api';

import { Canvas } from '@roadmap/canvas/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSaveCanvas = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (canvas: Pick<Canvas, 'id' | 'data'>) => {
      if (!canvas.data) {
        throw new Error('Canvas data cannot be null or undefined');
      }
      return saveCanvas(canvas.id, canvas.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCanvas', id],
      });
      toast.success('Карта успешно сохранена');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Произошла неизвестная ошибка'
      );
    },
  });
};
