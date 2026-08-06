import { ThemeButton } from '@/shared/ui/theme-button/theme-button';
import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './app.module.scss';

export function App(): ReactNode {
  return (
    <>
      <div className={styles.ambientLight} data-testid="background" />
      <ThemeButton className={styles.themeButton} />

      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
