import { GameService } from '@/entities/game/api/game.service';
import { mockValidApiResponse } from '@/entities/game/model/mocks/responses.mock';
import { RawgClient } from '@/shared/api/rawg-client';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('GameService', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should call RawgClient with search query and return results', async () => {
    const fetchSpy = vi.spyOn(RawgClient, 'fetchData').mockResolvedValue(mockValidApiResponse);

    const result = await GameService.searchGames('GTA V');

    expect(fetchSpy).toHaveBeenCalledWith('/games?search=GTA%20V');
    expect(result).toEqual(mockValidApiResponse.results);
  });

  it('should call RawgClient without search query with base endpoint', async () => {
    const fetchSpy = vi.spyOn(RawgClient, 'fetchData').mockResolvedValue(mockValidApiResponse);

    const result = await GameService.searchGames('');

    expect(fetchSpy).toHaveBeenCalledWith('/games');
    expect(result).toEqual(mockValidApiResponse.results);
  });

  it('should throw an error if RawgClient throws an error', async () => {
    const networkError = new Error('HTTP error!');

    vi.spyOn(RawgClient, 'fetchData').mockRejectedValue(networkError);

    await expect(GameService.searchGames('')).rejects.toThrow();
  });
});
