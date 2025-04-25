import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

const LoginPage = lazy(() => import('@/pages/Login/ui/Login'));
const RegisterPage = lazy(() => import('@/pages/Register/ui/RegisterPage'));
const CanvasPage = lazy(() => import('@/pages/Canvas/ui/Canvas'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/canvas',
        element: <CanvasPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]);
