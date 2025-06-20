import { theme } from '@/shared/styles/theme';
import { useThemeStore } from '../store/themeStore';

export const useTheme = () => {
  const themeName = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const colors = theme[themeName];
  const defaults = theme.default;

  return { themeName, colors, defaults, toggleTheme, setTheme };
};
