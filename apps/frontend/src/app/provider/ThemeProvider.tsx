import { useEffect } from 'react';

import { useThemeStore } from '@/shared/model/store/themeStore';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore.use.theme();

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return <>{children}</>;
};
