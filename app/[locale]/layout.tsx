import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';

import { RefreshButton } from '@/features/refresh-data';
import { ThemeSwitcher } from '@/features/theme-switcher';
import { StoreProvider } from '@app/providers/store.provider';
import { ThemeProvider } from '@shared/lib/context/theme';

import styles from '../../src/app/ui/app.module.scss';

export default async function LocaleLayout({ children }: { children: ReactNode }): Promise<ReactNode> {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
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
    </NextIntlClientProvider>
  );
}
