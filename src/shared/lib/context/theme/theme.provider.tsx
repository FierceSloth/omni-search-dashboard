import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext, type Theme } from './theme.context';

interface IProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: IProps): ReactNode {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
