import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

import { gameMapper, GameService } from '@/entities/game';
import { ROUTE_PATHS } from '@/shared/constants/routes';
import { GameDetailsWidget } from './games-details';

const mockNavigate = vi.fn();
const mockParams = { id: '3498' };
const mockSearchParams = new URLSearchParams('search=witcher&page=2');

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: (): { id: string } => mockParams,
    useNavigate: (): Mock => mockNavigate,
    useSearchParams: (): [URLSearchParams] => [mockSearchParams],
  };
});

const mockApiDetailsResponse = {
  id: 3498,
  name: 'Grand Theft Auto V',
  description_raw: 'An open world game.',
  background_image: 'https://example.com/gta.jpg',
  rating: 4.47,
  released: '2013-09-17',
  genres: [{ name: 'Action' }],
  developers: [{ name: 'Rockstar' }],
  website: 'https://rockstargames.com',
};

describe('GameDetailsWidget', () => {
  let getGameByIdSpy: Mock;

  beforeEach(() => {
    vi.clearAllMocks();

    getGameByIdSpy = vi.spyOn(GameService, 'getGameById').mockResolvedValue(mockApiDetailsResponse);
  });

  it('should show loader with correct text during data fetching', async () => {
    const loadingText = 'Loading game details...';

    render(
      <MemoryRouter>
        <GameDetailsWidget />
      </MemoryRouter>
    );

    expect(screen.getByText(loadingText)).toBeInTheDocument();

    await screen.findByRole('heading', { level: 2 });
  });

  it('should fetch details by id, map them, and render CardDetail', async () => {
    const mappedData = gameMapper.mapGameDetails(mockApiDetailsResponse);
    const expectedTitle = mappedData.title;

    render(
      <MemoryRouter>
        <GameDetailsWidget />
      </MemoryRouter>
    );

    expect(getGameByIdSpy).toHaveBeenCalledWith(Number(mockParams.id));

    const titleElement = await screen.findByRole('heading', { level: 2, name: expectedTitle });
    expect(titleElement).toBeInTheDocument();
  });

  it('should navigate back to home preserving search params when close button is clicked', async () => {
    const user = userEvent.setup();
    const mappedData = gameMapper.mapGameDetails(mockApiDetailsResponse);

    render(
      <MemoryRouter>
        <GameDetailsWidget />
      </MemoryRouter>
    );

    await screen.findByRole('heading', { level: 2, name: mappedData.title });

    const closeButton = screen.getByRole('button', { name: /close details/i });
    await user.click(closeButton);

    const expectedRedirectPath = `${ROUTE_PATHS.HOME}?${mockSearchParams.toString()}`;

    expect(mockNavigate).toHaveBeenCalledWith(expectedRedirectPath);
  });

  it('should render ErrorMessage if service request fails', async () => {
    const apiErrorText = 'API rate limit exceeded';
    getGameByIdSpy.mockRejectedValue(new Error(apiErrorText));

    render(
      <MemoryRouter>
        <GameDetailsWidget />
      </MemoryRouter>
    );

    const errorElement = await screen.findByText(apiErrorText);
    expect(errorElement).toBeInTheDocument();

    expect(screen.getByText('Connection Lost')).toBeInTheDocument();
  });
});
