import { STORAGE_KEYS } from '@/shared/constants/local-storage';
import { GameService } from '@entities/game';
import { render, screen, type RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { GamesDiscoveryWidget } from './games-discovery';

vi.mock('@/features/card-selection', () => ({
  ToggleSelectionCheckbox: (): ReactNode => <input type="checkbox" data-testid="mock-checkbox" />,
}));

vi.mock('@/widgets/selected-flyout/ui/selected-flyout', () => ({
  SelectedFlyout: (): ReactNode => <div data-testid="mock-flyout" />,
}));

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

const renderWithRouter = (ui: React.ReactElement): RenderResult => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('GamesDiscoveryWidget', () => {
  let searchGamesSpy: Mock;
  let setItemSpy: Mock;
  let getItemSpy: Mock;

  beforeEach(() => {
    searchGamesSpy = vi.spyOn(GameService, 'searchGames').mockResolvedValue({
      games: mockGames,
      totalPages: 1,
    });

    setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch games on mount and render them', async () => {
    renderWithRouter(<GamesDiscoveryWidget />);

    const loadingElement = screen.getByTestId('loader');
    expect(loadingElement).toBeInTheDocument();

    const gameTitle = await screen.findByText(mockGames[0].name);
    expect(gameTitle).toBeInTheDocument();

    expect(searchGamesSpy).toHaveBeenCalledWith('', 1);
  });

  it('should read query from localStorage on initial render', async () => {
    const testQuery = 'Mario';
    getItemSpy.mockReturnValue(testQuery);

    renderWithRouter(<GamesDiscoveryWidget />);

    await screen.findByText(mockGames[0].name);
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(testQuery);
    expect(searchGamesSpy).toHaveBeenCalledWith(testQuery, 1);
  });

  it('should fetch new games and update localStorage on form submit', async () => {
    const testQuery = 'Mario';
    const user = userEvent.setup();
    renderWithRouter(<GamesDiscoveryWidget />);

    await screen.findByText(mockGames[0].name);

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, testQuery);

    const submitButton = screen.getByRole('button', { name: /submit search/i });
    await user.click(submitButton);

    expect(searchGamesSpy).toHaveBeenCalledWith(testQuery, 1);
    expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEYS.SEARCH_QUERY, testQuery);
  });

  it('should not fetch if search query is exactly the same as in localStorage', async () => {
    const testQuery = 'Witcher';
    const user = userEvent.setup();
    getItemSpy.mockReturnValue(testQuery);

    renderWithRouter(<GamesDiscoveryWidget />);
    await screen.findByText(mockGames[0].name);

    searchGamesSpy.mockClear();

    const submitButton = screen.getByRole('button', { name: /submit search/i });
    await user.click(submitButton);

    expect(searchGamesSpy).not.toHaveBeenCalled();
  });

  it('should render ErrorMessage if API request fails', async () => {
    const errorText = 'Network disconnected';
    searchGamesSpy.mockRejectedValue(new Error(errorText));

    renderWithRouter(<GamesDiscoveryWidget />);

    const errorElement = await screen.findByText(errorText);
    expect(errorElement).toBeInTheDocument();
  });
});
