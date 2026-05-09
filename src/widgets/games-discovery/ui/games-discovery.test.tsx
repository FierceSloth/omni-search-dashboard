import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

import { STORAGE_KEYS } from '@/shared/constants/local-storage';
import { ErrorBoundary } from '@/shared/ui/error-boundary';
import { GameService } from '@entities/game';
import { GamesDiscoveryWidget } from './games-discovery';

const mockGames = [
  {
    id: 3498,
    name: 'Grand Theft Auto V',
    background_image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
    released: '2013-09-17',
    rating: 4.47,
    genres: [{ name: 'Action' }, { name: 'Adventure' }],
  },
];

describe('GamesDiscoveryWidget', () => {
  let searchGamesSpy: Mock;
  let setItemSpy: Mock;
  let getItemSpy: Mock;

  beforeEach(() => {
    searchGamesSpy = vi.spyOn(GameService, 'searchGames').mockResolvedValue(mockGames);

    setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch games on mount and render them', async () => {
    render(<GamesDiscoveryWidget />);

    const loadingElement = screen.getByText('Loading games...');
    expect(loadingElement).toBeInTheDocument();

    const gameTitle = await screen.findByText('Grand Theft Auto V');
    expect(gameTitle).toBeInTheDocument();

    expect(searchGamesSpy).toHaveBeenCalledWith('');
    expect(searchGamesSpy).toHaveBeenCalledOnce();
  });

  it('should read query from localStorage on initial render', async () => {
    getItemSpy.mockReturnValue('Mario');

    render(<GamesDiscoveryWidget />);

    await screen.findByText('Grand Theft Auto V');

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Mario');

    expect(searchGamesSpy).toHaveBeenCalledWith('Mario');
  });

  it('should fetch new games and update localStorage on form submit', async () => {
    const user = userEvent.setup();
    render(<GamesDiscoveryWidget />);

    await screen.findByText('Grand Theft Auto V');

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Zelda');

    const submitButton = screen.getByRole('button', { name: /submit search/i });
    await user.click(submitButton);

    expect(searchGamesSpy).toHaveBeenCalledWith('Zelda');
    expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEYS.SEARCH_QUERY, 'Zelda');
  });

  it('should not fetch if search query is exactly the same as in localStorage', async () => {
    const user = userEvent.setup();
    getItemSpy.mockReturnValue('Witcher');

    render(<GamesDiscoveryWidget />);
    await screen.findByText('Grand Theft Auto V');

    searchGamesSpy.mockClear();

    const submitButton = screen.getByRole('button', { name: /submit search/i });
    await user.click(submitButton);

    expect(searchGamesSpy).not.toHaveBeenCalled();
  });

  it('should render ErrorMessage if API request fails', async () => {
    searchGamesSpy.mockRejectedValue(new Error('Network disconnected'));

    render(<GamesDiscoveryWidget />);

    const errorElement = await screen.findByText('Network disconnected');
    expect(errorElement).toBeInTheDocument();
  });

  it('should render ErrorMessage with default message if API request fails', async () => {
    searchGamesSpy.mockRejectedValue('Error');

    render(<GamesDiscoveryWidget />);

    const errorElement = await screen.findByText('Something went wrong');
    expect(errorElement).toBeInTheDocument();
  });

  it('should trigger fatal error when error button is clicked', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <GamesDiscoveryWidget />
      </ErrorBoundary>
    );

    const errorButton = screen.getByRole('button', { name: /throw test error/i });
    await user.click(errorButton);

    const errorElement = await screen.findByText('Something went wrong');
    expect(errorElement).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
