import type { ReactNode } from 'react';

import { RefreshButton } from '@/features/refresh-data';
import { ThemeSwitcher } from '@/features/theme-switcher';
import { StoreProvider } from '@app/providers/store.provider';
import { ThemeProvider } from '@shared/lib/context/theme';

import { Manrope } from 'next/font/google';

import '../src/app/styles/style.scss';
import styles from '../src/app/ui/app.module.scss';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <html lang="en" className={manrope.variable}>
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
