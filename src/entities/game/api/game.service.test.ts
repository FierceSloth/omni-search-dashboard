import { GameService } from '@/entities/game/api/game.service';
import type { IGamesResponse } from '@/entities/game/model/responses';
import { RawgClient } from '@/shared/api/rawg-client';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('GameService', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const mockValidApiResponse: IGamesResponse = {
    count: 2,
    next: 'https://api.rawg.io/api/games?page=2',
    previous: null,
    results: [
      {
        id: 3498,
        name: 'Grand Theft Auto V',
        background_image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
        released: '2013-09-17',
        rating: 4.47,
        genres: [{ name: 'Action' }, { name: 'Adventure' }],
      },
      {
        id: 3328,
        name: 'The Witcher 3: Wild Hunt',
        background_image: 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
        released: '2015-05-18',
        rating: 4.66,
        genres: [{ name: 'Action' }, { name: 'RPG' }],
      },
    ],
  };

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
