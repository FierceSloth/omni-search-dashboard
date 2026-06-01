import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { RefreshButton } from '@/features/refresh-data';
import { ThemeSwitcher } from '@/features/theme-switcher';

import styles from './app.module.scss';

export function App(): ReactNode {
  return (
    <>
      <div className={styles.ambientLight} data-testid="background" />

      <div className={styles.toolbar}>
        <ThemeSwitcher />
        <RefreshButton />
      </div>

      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
