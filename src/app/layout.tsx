import { StoreProvider } from '@/app/_providers/store.provider';
import { ThemeProvider } from '@/shared/lib/context/theme';
import '@app/_styles/style.scss';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }): ReactNode {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
