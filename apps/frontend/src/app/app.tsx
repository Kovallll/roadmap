import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import styles from './app.module.scss';
import { AntdThemeProvider } from './provider/AntdThemeProvider';
import { ThemeProvider } from './provider/ThemeProvider';
import { router } from './router/config';

import '@xyflow/react/dist/style.css';
import { useUserStore } from '@/features/user/model';
import { LOCAL_STORAGE } from '@/shared/model';
import { useAuthStore } from '@/shared/model';
import { useThemeStore } from '@/shared/model/store/themeStore';
import { Spinner } from '@/shared/ui/Spinner/ui/Spinner';
import { Theme } from '@roadmap/user/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactFlowProvider } from '@xyflow/react';

const queryClient = new QueryClient();

export default function App() {
  const logout = useAuthStore.use.logout();
  const user = useUserStore.use.user();
  const setTheme = useThemeStore.use.setTheme();

  useEffect(() => {
    const theme = user?.theme as Theme;
    const localTheme = sessionStorage.getItem(LOCAL_STORAGE.THEME);
    if (localTheme) {
      setTheme(localTheme as Theme);
    }
    if (theme && !localTheme) {
      setTheme(theme);
    }
  }, [setTheme, user?.theme]);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    const refresh = localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);

    if (!token || !refresh) {
      logout();
    }
  }, [logout]);

  return (
    <div className={styles.app}>
      <ThemeProvider>
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
      </ThemeProvider>
    </div>
  );
}
