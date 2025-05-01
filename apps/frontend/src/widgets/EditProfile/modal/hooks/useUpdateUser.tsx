import { toast } from 'react-toastify';

import { axiosInstance } from '@/app/api/axiosInstance';
import { User } from '@roadmap/user/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: Partial<User>) =>
      axiosInstance.patch(`users/${id}`, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getUser', id],
      });
      toast.success('Профиль обновлен успешно!');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Произошла неизвестная ошибка'
      );
    },
  });
};
