import { axiosInstance } from '@/app/api/axiosInstance';
import { API_URL } from './constants';
import { User } from '@roadmap/user/types';

export const getUser = async (userName: string) => {
  const { data } = await axiosInstance.get<User>(`${API_URL}/${userName}`);
  return data;
};
