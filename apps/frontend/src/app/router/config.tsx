import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { RoutePath } from './constants';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

const LoginPage = lazy(() => import('@/pages/Login/ui/Login'));
const RegisterPage = lazy(() => import('@/pages/Register/ui/RegisterPage'));
const MapPage = lazy(() => import('@/pages/Map/ui/MapPage'));
const UserMapsPage = lazy(() => import('@/pages/Profile/ui/UserMapsPage'));

export const router = createBrowserRouter([
  {
    path: RoutePath.ROOT,
    element: <Navigate to={RoutePath.LOGIN} replace />,
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: RoutePath.LOGIN,
        element: <LoginPage />,
      },
      {
        path: RoutePath.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: `${RoutePath.MAP}/:id`,
        element: <MapPage />,
      },
      {
        path: RoutePath.USER_MAPS,
        element: <UserMapsPage />,
      },
    ],
  },
  {
    path: RoutePath.NOT_FOUND,
    element: <div>404 Not Found</div>,
  },
]);
