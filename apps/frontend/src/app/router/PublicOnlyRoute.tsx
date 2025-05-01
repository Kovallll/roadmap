import { Navigate, Outlet } from 'react-router-dom';

import { RoutePath } from './constants';

import { useAuthStore } from '@/shared/model/store/authStore';

export const PublicOnlyRoute = () => {
  const token = useAuthStore.use.accessToken();

  if (token) {
    return <Navigate to={RoutePath.PROFILE} replace />;
  }

  return <Outlet />;
};
