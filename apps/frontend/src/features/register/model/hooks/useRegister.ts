import { axiosInstance } from '@/app/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { User } from '@roadmap/user/types';
import { toast } from 'react-toastify';

export const useRegister = () => {
  return useMutation({
    mutationFn: (user: User) => axiosInstance.post('/auth/register', user),
    onSuccess: () => {
      toast.success('Регистрация прошла успешно');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Произошла неизвестная ошибка'
      );
    },
  });
};
