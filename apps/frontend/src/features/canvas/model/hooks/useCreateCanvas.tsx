import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { createCanvas } from '../../api';

import { ApiResponseError } from '@/shared/model';
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
    onError: (error: AxiosError<ApiResponseError>) => {
      toast.error(
        error.response?.data?.message || 'Произошла неизвестная ошибка'
      );
    },
  });
};
