import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/model';

export const ProtectedRoute = () => {
  const token = useAuthStore.use.accessToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
