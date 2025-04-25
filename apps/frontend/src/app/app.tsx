import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import styles from './app.module.scss';
import { router } from './router/config';

import '@xyflow/react/dist/style.css';
import { useAuthStore } from '@/features/auth/model/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  const logout = useAuthStore.use.logout();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');

    if (!token || !refresh) {
      logout();
    }
  }, [logout]);

  return (
    <div className={styles.app}>
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Suspense>
    </div>
  );
}
