import { axiosInstance } from '@/app/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { User } from '@roadmap/user/types';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ApiResponseError } from '@/shared/model';

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
