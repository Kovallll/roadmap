import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { useUser } from '@/features/user/model';
import { useUserStore } from '@/features/user/model';
import { RoutePath } from '@/shared/model';
import { useAuthStore } from '@/shared/model';
import { Spinner } from '@/shared/ui/Spinner/ui/Spinner';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const setUser = useUserStore.use.setUser();
  const token = useAuthStore.use.accessToken();

  let decodedToken: { id: string } | null = null;
  try {
    if (token) {
      decodedToken = jwtDecode<{ id: string }>(token);
    }
  } catch (error) {
    console.error('Invalid token:', error);
    navigate(RoutePath.LOGIN);
  }

  const userId = decodedToken?.id;

  const { data, isSuccess } = useUser(userId ?? '');
  if (!isSuccess) {
    navigate(RoutePath.LOGIN);
  }
  useEffect(() => {
    if (token && data) {
      setUser(data);
    }
  }, [token, data, setUser, navigate]);

  if (!token || !data) {
    return <Spinner />;
  }

  return <>{children}</>;
};
