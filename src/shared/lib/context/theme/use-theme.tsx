import { ThemeContext, type IThemeContext } from '@/shared/lib/context/theme/theme.context';
import { useContext } from 'react';

export function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme должен использоваться строго внутри ThemeProvider');
  }
  return context;
}
