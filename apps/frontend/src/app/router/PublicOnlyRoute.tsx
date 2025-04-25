import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/model';

export const PublicOnlyRoute = () => {
  const token = useAuthStore.use.accessToken();

  if (token) {
    return <Navigate to="/canvas" replace />;
  }

  return <Outlet />;
};
