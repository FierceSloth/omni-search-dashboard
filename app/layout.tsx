import { RefreshButton } from '@/features/refresh-data';
import { ThemeSwitcher } from '@/features/theme-switcher';
import { StoreProvider } from '@app/providers/store.provider';
import { ThemeProvider } from '@shared/lib/context/theme';

import type { ReactNode } from 'react';

import '../src/app/styles/style.scss';
import styles from '../src/app/ui/app.module.scss';

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>
            <div className={styles.ambientLight} data-testid="background" />

            <div className={styles.toolbar}>
              <ThemeSwitcher />
              <RefreshButton />
            </div>

            <div className={styles.container}>{children}</div>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
