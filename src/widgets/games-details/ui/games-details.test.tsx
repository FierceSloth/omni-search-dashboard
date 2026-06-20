import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { server } from '@/shared/api/msw/server';
import { ROUTE_PATHS } from '@/shared/constants/routes';
import { renderWithProviders } from '@/shared/lib/test-utils/render-with-providers';

import { GameDetailsWidget } from './games-details';

const mockNavigate = vi.fn();
const mockParams = { id: '3498' };
const mockSearchParams = new URLSearchParams('search=witcher&page=2');

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useParams: (): { id: string } => mockParams,
    useRouter: (): any => ({ push: mockNavigate }),
    useSearchParams: (): URLSearchParams => mockSearchParams,
  };
});

describe('GameDetailsWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loader with correct text during data fetching', async () => {
    renderWithProviders(<GameDetailsWidget />);
    expect(screen.getByText('Loading game details...')).toBeInTheDocument();

    await screen.findByRole('heading', { level: 2 });
  });

  it('should fetch details by id and render CardDetail', async () => {
    renderWithProviders(<GameDetailsWidget />);

    const titleElement = await screen.findByRole('heading', {
      level: 2,
      name: 'Grand Theft Auto V',
    });
    expect(titleElement).toBeInTheDocument();
  });

  it('should navigate back to home preserving search params when close button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<GameDetailsWidget />);

    await screen.findByRole('heading', { level: 2, name: 'Grand Theft Auto V' });

    const closeButton = screen.getByRole('button', { name: /close details/i });
    await user.click(closeButton);

    const expectedRedirectPath = `${ROUTE_PATHS.HOME}?${mockSearchParams.toString()}`;
    expect(mockNavigate).toHaveBeenCalledWith(expectedRedirectPath);
  });

  it('should render ErrorMessage if network request fails', async () => {
    server.use(
      http.get('https://api.rawg.io/api/games/:id', () => {
        return HttpResponse.error();
      })
    );

    renderWithProviders(<GameDetailsWidget />);

    const errorElement = await screen.findByText('Failed to fetch game details');
    expect(errorElement).toBeInTheDocument();
  });
});
