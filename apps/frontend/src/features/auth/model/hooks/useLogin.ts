import { axiosInstance } from '@/app/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { User } from '@roadmap/user/types';
import { useAuthStore } from '../store';

export const useLogin = () => {
  const setTokens = useAuthStore.use.setTokens();

  return useMutation({
    mutationFn: (user: User) => axiosInstance.post('/auth/login', user),
    onSuccess: (res) => {
      setTokens(res.data.access_token, res.data.refresh_token);
    },
  });
};
