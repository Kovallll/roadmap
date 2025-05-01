import { axiosInstance } from '@/app/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { User } from '@roadmap/user/types';

import { toast } from 'react-toastify';
import { useAuthStore } from '@/shared/model/store/authStore';

export const useLogin = () => {
  const setTokens = useAuthStore.use.setTokens();

  return useMutation({
    mutationFn: (user: User) => axiosInstance.post('/auth/login', user),
    onSuccess: (res) => {
      setTokens(res.data.access_token, res.data.refresh_token);
      toast.success('Авторизация прошла успешно');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Произошла неизвестная ошибка'
      );
    },
  });
};
