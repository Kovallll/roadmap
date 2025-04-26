import { toast } from 'react-toastify';

import { createCanvas } from '../../api';

import { CreateCanvasDto } from '@roadmap/canvas/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateCanvas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (canvasData: CreateCanvasDto) => createCanvas(canvasData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCanvases'],
      });
      toast.success('Карта успешно создана');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Произошла неизвестная ошибка'
      );
    },
  });
};
