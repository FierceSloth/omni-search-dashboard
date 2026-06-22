import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { MainPage } from './main-page';

vi.mock('@widgets/games-discovery', () => ({
  GamesDiscoveryWidget: (): ReactNode => <div data-testid="mock-games-discovery" />,
}));
vi.mock('@shared/ui/header', () => ({
  Header: (): ReactNode => <div data-testid="mock-header" />,
}));

import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../../messages/en.json';

describe('MainPage Component', () => {
  it('should render the page layout correctly', () => {
    render(
      <NextIntlClientProvider messages={messages} locale="en">
        <MainPage />
      </NextIntlClientProvider>
    );

    const headerElement = screen.getByTestId('mock-header');
    const widgetMock = screen.getByTestId('mock-games-discovery');

    expect(headerElement).toBeInTheDocument();
    expect(widgetMock).toBeInTheDocument();
  });
});
