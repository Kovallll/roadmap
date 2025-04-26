import { Navigate, Outlet } from 'react-router-dom';

import { RoutePath } from './constants';

import { useAuthStore } from '@/features/auth/model';

export const PublicOnlyRoute = () => {
  const token = useAuthStore.use.accessToken();

  if (token) {
    return <Navigate to={RoutePath.USER_MAPS} replace />;
  }

  return <Outlet />;
};
