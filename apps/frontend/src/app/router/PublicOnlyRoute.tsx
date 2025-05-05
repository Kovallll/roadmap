import { Navigate, Outlet } from 'react-router-dom';

import { RoutePath } from '@/shared/model';
import { useAuthStore } from '@/shared/model';

export const PublicOnlyRoute = () => {
  const token = useAuthStore.use.accessToken();

  if (token) {
    return <Navigate to={RoutePath.PROFILE} replace />;
  }

  return <Outlet />;
};
