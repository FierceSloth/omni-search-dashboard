import { StoreProvider } from '@app/providers/store.provider';
import { ThemeProvider } from '@shared/lib/context/theme';
import type { JSX, ReactNode } from 'react';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body>
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
