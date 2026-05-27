import { ThemeSwitcher } from '@/features/theme-switcher';
import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './app.module.scss';

export function App(): ReactNode {
  return (
    <>
      <div className={styles.ambientLight} data-testid="background" />
      <ThemeSwitcher className={styles.themeSwitcher} />

      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
