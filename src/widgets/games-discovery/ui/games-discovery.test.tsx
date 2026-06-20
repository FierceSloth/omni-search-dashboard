import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

import { server } from '@/shared/api/msw/server';
import { STORAGE_KEYS } from '@/shared/constants/local-storage';
import { renderWithProviders } from '@/shared/lib/test-utils/render-with-providers';

import { GamesDiscoveryWidget } from './games-discovery';

vi.mock('@/features/card-selection', () => ({
  ToggleSelectionCheckbox: (): ReactNode => <input type="checkbox" data-testid="mock-checkbox" />,
}));

vi.mock('@/widgets/selected-flyout/ui/selected-flyout', () => ({
  SelectedFlyout: (): ReactNode => <div data-testid="mock-flyout" />,
}));

vi.mock('next/navigation', () => ({
  useRouter: (): { push: Mock } => ({
    push: vi.fn(),
  }),
  useSearchParams: (): URLSearchParams => new URLSearchParams(''),
}));

describe('GamesDiscoveryWidget', () => {
  let setItemSpy: Mock;
  let getItemSpy: Mock;

  beforeEach(() => {
    setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch games on mount and render them', async () => {
    renderWithProviders(<GamesDiscoveryWidget />);

    const loadingElement = screen.getByText('Loading games...');
    expect(loadingElement).toBeInTheDocument();

    const gameTitle = await screen.findByText('Grand Theft Auto V');
    expect(gameTitle).toBeInTheDocument();
  });

  it('should read query from localStorage on initial render', async () => {
    const testQuery = 'Mario';
    getItemSpy.mockReturnValue(testQuery);

    renderWithProviders(<GamesDiscoveryWidget />);

    await screen.findByText('Grand Theft Auto V');
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(testQuery);
  });

  it('should fetch new games and update localStorage on form submit', async () => {
    const testQuery = 'Mario';
    const user = userEvent.setup();

    renderWithProviders(<GamesDiscoveryWidget />);
    await screen.findByText('Grand Theft Auto V');

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, testQuery);

    const submitButton = screen.getByRole('button', { name: /submit search/i });
    await user.click(submitButton);

    expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEYS.SEARCH_QUERY, testQuery);
  });

  it('should render ErrorMessage if API request fails', async () => {
    server.use(
      http.get('https://api.rawg.io/api/games', () => {
        return HttpResponse.error();
      })
    );

    renderWithProviders(<GamesDiscoveryWidget />);

    const errorElement = await screen.findByText('Failed to fetch games');
    expect(errorElement).toBeInTheDocument();
  });

  it('should render EmptyState if API returns no games without query', async () => {
    server.use(
      http.get('https://api.rawg.io/api/games', () => {
        return HttpResponse.json({ count: 0, results: [] });
      })
    );

    renderWithProviders(<GamesDiscoveryWidget />);

    const emptyStateElement = await screen.findByText('No games available.');
    expect(emptyStateElement).toBeInTheDocument();
  });

  it('should render EmptyState if API returns no games for query', async () => {
    const brokenQuery = 'test broken query';
    const user = userEvent.setup();

    server.use(
      http.get('https://api.rawg.io/api/games', () => {
        return HttpResponse.json({ count: 0, results: [] });
      })
    );

    renderWithProviders(<GamesDiscoveryWidget />);

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, brokenQuery);

    const submitButton = screen.getByRole('button', { name: /submit search/i });
    await user.click(submitButton);

    const emptyStateElement = await screen.findByText(`No games found for "${brokenQuery}".`);
    expect(emptyStateElement).toBeInTheDocument();
  });
});
