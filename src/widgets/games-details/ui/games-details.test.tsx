import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { server } from '@/shared/api/msw/server';
import { renderWithProviders } from '@/shared/lib/test-utils/render-with-providers';

import { GameDetailsWidget } from './games-details';

describe('GameDetailsWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch details by id and render CardDetail', async () => {
    const ResolvedWidget = await GameDetailsWidget({ searchParams: { details: '3498', page: '2', query: 'witcher' } });
    renderWithProviders(ResolvedWidget);

    const titleElement = await screen.findByRole('heading', {
      level: 2,
      name: 'Grand Theft Auto V',
    });
    expect(titleElement).toBeInTheDocument();
  });

  it('should throw an error if network request fails', async () => {
    server.use(
      http.get('https://api.rawg.io/api/games/:id', () => {
        return HttpResponse.error();
      })
    );

    await expect(GameDetailsWidget({ searchParams: { details: '3498' } })).rejects.toThrow('Failed to fetch');
  });
});
