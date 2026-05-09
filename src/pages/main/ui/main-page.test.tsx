import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { MainPage } from './main-page';

vi.mock('@widgets/games-discovery', () => ({
  GamesDiscoveryWidget: (): ReactNode => <div data-testid="mock-games-discovery" />,
}));

describe('MainPage Component', () => {
  it('should render the page layout correctly', () => {
    render(<MainPage />);

    const titleElement = screen.getByRole('heading', { name: /discovery/i });
    expect(titleElement).toBeInTheDocument();

    const widgetMock = screen.getByTestId('mock-games-discovery');
    expect(widgetMock).toBeInTheDocument();
  });
});
