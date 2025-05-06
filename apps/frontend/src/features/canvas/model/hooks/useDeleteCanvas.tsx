import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { deleteCanvas } from '../../api';

import { ApiResponseError } from '@/shared/model';
import { Canvas } from '@roadmap/canvas/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCanvas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (canvasId: Canvas['id']) => deleteCanvas(canvasId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCanvases'],
      });
      toast.success('Карта успешно удалена');
    },
    onError: (error: AxiosError<ApiResponseError>) => {
      toast.error(
        error.response?.data?.message || 'Произошла неизвестная ошибка'
      );
    },
  });
};
