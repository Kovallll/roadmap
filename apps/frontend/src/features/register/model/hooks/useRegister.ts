import { axiosInstance } from '@/app/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { User } from '@roadmap/user/types';

export const useRegister = () => {
  return useMutation({
    mutationFn: (user: User) => axiosInstance.post('/auth/register', user),
  });
};
