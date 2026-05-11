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
    const gameTitle = await screen.findByText(mockGames[0].name);

    expect(loadingElement).toBeInTheDocument();
    expect(gameTitle).toBeInTheDocument();

    expect(searchGamesSpy).toHaveBeenCalledWith('');
    expect(searchGamesSpy).toHaveBeenCalledOnce();
  });

  it('should read query from localStorage on initial render', async () => {
    const testQuery = 'Mario';
    getItemSpy.mockReturnValue(testQuery);

    render(<GamesDiscoveryWidget />);

    await screen.findByText(mockGames[0].name);
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(testQuery);
    expect(searchGamesSpy).toHaveBeenCalledWith(testQuery);
  });

  it('should fetch new games and update localStorage on form submit', async () => {
    const testQuery = 'Mario';
    const user = userEvent.setup();
    render(<GamesDiscoveryWidget />);

    await screen.findByText(mockGames[0].name);

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, testQuery);

    const submitButton = screen.getByRole('button', { name: /submit search/i });
    await user.click(submitButton);

    expect(searchGamesSpy).toHaveBeenCalledWith(testQuery);
    expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEYS.SEARCH_QUERY, testQuery);
  });

  it('should not fetch if search query is exactly the same as in localStorage', async () => {
    const testQuery = 'Witcher';
    const user = userEvent.setup();
    getItemSpy.mockReturnValue(testQuery);

    render(<GamesDiscoveryWidget />);
    await screen.findByText(mockGames[0].name);

    searchGamesSpy.mockClear();

    const submitButton = screen.getByRole('button', { name: /submit search/i });
    await user.click(submitButton);

    expect(searchGamesSpy).not.toHaveBeenCalled();
  });

  it('should render ErrorMessage if API request fails', async () => {
    const errorText = 'Network disconnected';
    searchGamesSpy.mockRejectedValue(new Error(errorText));

    render(<GamesDiscoveryWidget />);

    const errorElement = await screen.findByText(errorText);
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
