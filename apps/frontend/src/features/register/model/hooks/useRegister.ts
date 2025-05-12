import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { axiosInstance } from '@/app/api/axiosInstance';
import { ApiResponseError } from '@/shared/model';
import { User } from '@roadmap/user/types';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  return useMutation({
    mutationFn: (user: User) => axiosInstance.post('/auth/register', user),
    onSuccess: () => {
      toast.success('Регистрация прошла успешно');
    },
    onError: (error: AxiosError<ApiResponseError>) => {
      toast.error(
        error.response?.data?.message || 'Произошла неизвестная ошибка'
      );
    },
  });
};
