import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import styles from './app.module.scss';
import { AntdThemeProvider } from './provider/AntdThemeProvider';
import { router } from './router/config';

import '@xyflow/react/dist/style.css';
import { LOCAL_STORAGE } from '@/shared/model';
import { useAuthStore } from '@/shared/model';
import { Spinner } from '@/shared/ui/Spinner/ui/Spinner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactFlowProvider } from '@xyflow/react';

const queryClient = new QueryClient();

export default function App() {
  const logout = useAuthStore.use.logout();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    const refresh = localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);

    if (!token || !refresh) {
      logout();
    }
  }, [logout]);

  return (
    <div className={styles.app}>
      <ReactFlowProvider>
        <AntdThemeProvider>
          <Suspense fallback={<Spinner />}>
            <QueryClientProvider client={queryClient}>
              <ToastContainer />
              <RouterProvider router={router} />
            </QueryClientProvider>
          </Suspense>
        </AntdThemeProvider>
      </ReactFlowProvider>
    </div>
  );
}
