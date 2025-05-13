import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { saveCanvas } from '../../api';

import { ApiResponseError, useCanvasStore } from '@/shared/model';
import { Canvas } from '@roadmap/canvas/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSaveCanvas = (id: string, notify = true) => {
  const queryClient = useQueryClient();
  const setIsSave = useCanvasStore.use.setIsSave();

  return useMutation({
    mutationFn: (canvas: Canvas) => saveCanvas(canvas),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCanvas', id],
      });
      queryClient.invalidateQueries({
        queryKey: ['getCanvases'],
      });
      if (notify) toast.success('Карта успешно сохранена');
      setIsSave(true);
    },
    onError: (error: AxiosError<ApiResponseError>) => {
      toast.error(
        error.response?.data?.message || 'Произошла неизвестная ошибка'
      );
    },
  });
};
