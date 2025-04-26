import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { RoutePath } from '../router/constants';

import { useAuthStore } from '@/features/auth/model';
import { useUser } from '@/features/user/model/hooks/useUser';
import { useUserStore } from '@/features/user/model/store';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const setUser = useUserStore.use.setUser();
  const token = useAuthStore.use.accessToken();

  let decodedToken: { username: string } | null = null;
  try {
    if (token) {
      decodedToken = jwtDecode<{ username: string }>(token);
    }
  } catch (error) {
    console.error('Invalid token:', error);
    navigate(RoutePath.LOGIN);
  }

  const userName = decodedToken?.username;

  const { data, isSuccess } = useUser(userName ?? '');
  if (!isSuccess) {
    navigate(RoutePath.LOGIN);
  }
  useEffect(() => {
    if (token && data) {
      setUser(data);
    }
  }, [token, data, setUser, navigate]);

  if (!token || !data) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
