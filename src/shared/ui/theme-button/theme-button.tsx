import { useTheme } from '@/shared/lib/context/theme/use-theme';
import { type ReactNode } from 'react';

import styles from './theme-button.module.scss';

export function ThemeButton(): ReactNode {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.toggleTheme} onClick={toggleTheme}>
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
