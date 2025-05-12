import { API_URL } from './constants';

import { axiosInstance } from '@/app/api/axiosInstance';
import { User } from '@roadmap/user/types';

export const getUser = async (id: string) => {
  const { data } = await axiosInstance.get<User>(`${API_URL}/${id}`);
  return data;
};
