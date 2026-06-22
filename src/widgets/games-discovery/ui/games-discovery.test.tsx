import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { server } from '@/shared/api/msw/server';
import { renderWithProviders } from '@/shared/lib/test-utils/render-with-providers';

import { GamesDiscoveryWidget } from './games-discovery';

vi.mock('@/features/card-selection', () => ({
  ToggleSelectionCheckbox: (): JSX.Element => <input type="checkbox" data-testid="mock-checkbox" />,
}));

vi.mock('@/widgets/selected-flyout/ui/selected-flyout', () => ({
  SelectedFlyout: (): JSX.Element => <div data-testid="mock-flyout" />,
}));

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => key),
  getRequestConfig: vi.fn(),
}));

describe('GamesDiscoveryWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch games and render them', async () => {
    const ResolvedWidget = await GamesDiscoveryWidget({ searchParams: {} });
    renderWithProviders(ResolvedWidget);

    const gameTitle = await screen.findByText('Grand Theft Auto V');
    expect(gameTitle).toBeInTheDocument();
  });

  it('should throw an error if API request fails', async () => {
    server.use(
      http.get('https://api.rawg.io/api/games', () => {
        return HttpResponse.error();
      })
    );

    await expect(GamesDiscoveryWidget({ searchParams: {} })).rejects.toThrow('Failed to fetch');
  });

  it('should render EmptyState if API returns no games without query', async () => {
    server.use(
      http.get('https://api.rawg.io/api/games', () => {
        return HttpResponse.json({ count: 0, results: [] });
      })
    );

    const ResolvedWidget = await GamesDiscoveryWidget({ searchParams: {} });
    renderWithProviders(ResolvedWidget);

    const emptyStateElement = await screen.findByText('No games available.');
    expect(emptyStateElement).toBeInTheDocument();
  });

  it('should render EmptyState if API returns no games for query', async () => {
    const brokenQuery = 'test broken query';

    server.use(
      http.get('https://api.rawg.io/api/games', () => {
        return HttpResponse.json({ count: 0, results: [] });
      })
    );

    const ResolvedWidget = await GamesDiscoveryWidget({ searchParams: { query: brokenQuery } });
    renderWithProviders(ResolvedWidget);

    const emptyStateElement = await screen.findByText(`No games found for "${brokenQuery}".`);
    expect(emptyStateElement).toBeInTheDocument();
  });
});
