import { toast } from 'react-toastify';

import { saveCanvas } from '../../api';

import { Canvas } from '@roadmap/canvas/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSaveCanvas = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (canvas: Canvas) => saveCanvas(canvas),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCanvas', id],
      });
      queryClient.invalidateQueries({
        queryKey: ['getCanvases'],
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
