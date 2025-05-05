import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { AuthProvider } from '../provider/AuthProvider';

import { RoutePath } from '@/shared/model';
import { useAuthStore } from '@/shared/model';

export const ProtectedRoute = () => {
  const token = useAuthStore.use.accessToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to={RoutePath.LOGIN} state={{ from: location }} replace />;
  }

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
