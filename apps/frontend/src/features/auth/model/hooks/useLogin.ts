import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { axiosInstance } from '@/app/api/axiosInstance';
import { ApiResponseError, useAuthStore } from '@/shared/model';
import { User } from '@roadmap/user/types';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const setTokens = useAuthStore.use.setTokens();

  return useMutation({
    mutationFn: (user: User) => axiosInstance.post('/auth/login', user),
    onSuccess: (res) => {
      setTokens(res.data.access_token, res.data.refresh_token);
      toast.success('Авторизация прошла успешно');
    },
    onError: (error: AxiosError<ApiResponseError>) => {
      toast.error(
        error.response?.data?.message || 'Произошла неизвестная ошибка'
      );
    },
  });
};
