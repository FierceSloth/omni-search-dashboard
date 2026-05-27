import { useTheme } from '@/shared/lib/context/theme';
import { IconButton } from '@/shared/ui/icon-button';
import classNames from 'classnames';
import { type ReactNode } from 'react';

import moonIcon from '@shared/assets/svg/moon-icon.svg?raw';
import sunIcon from '@shared/assets/svg/sun-icon.svg?raw';

import styles from './theme-switcher.module.scss';

interface IProps {
  className?: string;
}

export function ThemeSwitcher({ className }: IProps): ReactNode {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <IconButton
      className={classNames(styles.themeSwitcher, className, {
        [styles.isDark]: isDark,
      })}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className={styles.iconContainer} dangerouslySetInnerHTML={{ __html: isDark ? moonIcon : sunIcon }} />
    </IconButton>
  );
}
