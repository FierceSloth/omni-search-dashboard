import { useTheme } from '@/shared/lib/context/theme/use-theme';
import classNames from 'classnames';
import { type ReactNode } from 'react';

import moonIcon from '@shared/assets/svg/moon-icon.svg?raw';
import sunIcon from '@shared/assets/svg/sun-icon.svg?raw';

import styles from './theme-button.module.scss';

interface IProps {
  className?: string;
}

export function ThemeButton({ className }: IProps): ReactNode {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className={classNames(styles.toggleTheme, className, {
        [styles.isDark]: isDark,
      })}
      onClick={toggleTheme}
    >
      <div className={styles.iconWrapper} dangerouslySetInnerHTML={{ __html: isDark ? moonIcon : sunIcon }} />
    </button>
  );
}
