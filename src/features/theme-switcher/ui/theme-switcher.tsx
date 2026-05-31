import { useTheme } from '@/shared/lib/context/theme';
import { IconButton } from '@/shared/ui/icon-button';
import classNames from 'classnames';
import { type ReactNode } from 'react';

import MoonIcon from '@shared/assets/svg/moon-icon.svg?react';
import SunIcon from '@shared/assets/svg/sun-icon.svg?react';

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
      icon={isDark ? MoonIcon : SunIcon}
      iconContainerClassName={styles.iconContainer}
    />
  );
}
