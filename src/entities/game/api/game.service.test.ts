import { GameService } from '@/entities/game/api/game.service';
import { mockValidApiResponse } from '@/entities/game/model/mocks/responses.mock';
import { RawgClient } from '@/shared/api/rawg-client';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('GameService', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const expectedTotalPages = Math.ceil(mockValidApiResponse.count / 20);

  it('should call RawgClient with search query and return results', async () => {
    const fetchSpy = vi.spyOn(RawgClient, 'fetchData').mockResolvedValue(mockValidApiResponse);

    const result = await GameService.searchGames('GTA V');

    expect(fetchSpy).toHaveBeenCalledWith('/games?page=1&page_size=20&search=GTA%20V');

    expect(result).toEqual({
      games: mockValidApiResponse.results,
      totalPages: expectedTotalPages,
    });
  });

  it('should call RawgClient without search query with base endpoint', async () => {
    const fetchSpy = vi.spyOn(RawgClient, 'fetchData').mockResolvedValue(mockValidApiResponse);

    const result = await GameService.searchGames('');

    expect(fetchSpy).toHaveBeenCalledWith('/games?page=1&page_size=20');

    expect(result).toEqual({
      games: mockValidApiResponse.results,
      totalPages: expectedTotalPages,
    });
  });

  it('should call RawgClient with specific page', async () => {
    const fetchSpy = vi.spyOn(RawgClient, 'fetchData').mockResolvedValue(mockValidApiResponse);

    const result = await GameService.searchGames('Mario', 3);

    expect(fetchSpy).toHaveBeenCalledWith('/games?page=3&page_size=20&search=Mario');
    expect(result.games).toEqual(mockValidApiResponse.results);
  });

  it('should throw an error if RawgClient throws an error', async () => {
    const networkError = new Error('HTTP error!');
    vi.spyOn(RawgClient, 'fetchData').mockRejectedValue(networkError);

    await expect(GameService.searchGames('')).rejects.toThrow();
  });
});
