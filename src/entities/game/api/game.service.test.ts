import { GameService } from '@/entities/game/api/game.service';
import { mockGameDetailsResponse, mockValidApiResponse } from '@/entities/game/model/mocks/responses.mock';
import { RawgClient } from '@/shared/api/rawg-client';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('GameService', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('searchGames', () => {
    const expectedTotalPages = Math.ceil(mockValidApiResponse.count / 20);

    it('should call RawgClient with search query and return results', async () => {
      const testQuery = 'GTA V';
      const expectedEndpoint = `/games?page=1&page_size=20&search=${encodeURIComponent(testQuery)}`;
      const fetchSpy = vi.spyOn(RawgClient, 'fetchData').mockResolvedValue(mockValidApiResponse);

      const result = await GameService.searchGames(testQuery);

      expect(fetchSpy).toHaveBeenCalledWith(expectedEndpoint);
      expect(result).toEqual({
        games: mockValidApiResponse.results,
        totalPages: expectedTotalPages,
      });
    });

    it('should call RawgClient without search query with base endpoint', async () => {
      const emptyQuery = '';
      const expectedEndpoint = '/games?page=1&page_size=20';
      const fetchSpy = vi.spyOn(RawgClient, 'fetchData').mockResolvedValue(mockValidApiResponse);

      const result = await GameService.searchGames(emptyQuery);

      expect(fetchSpy).toHaveBeenCalledWith(expectedEndpoint);
      expect(result).toEqual({
        games: mockValidApiResponse.results,
        totalPages: expectedTotalPages,
      });
    });

    it('should call RawgClient with specific page', async () => {
      const testQuery = 'Mario';
      const testPage = 3;
      const expectedEndpoint = `/games?page=${testPage}&page_size=20&search=${encodeURIComponent(testQuery)}`;
      const fetchSpy = vi.spyOn(RawgClient, 'fetchData').mockResolvedValue(mockValidApiResponse);

      const result = await GameService.searchGames(testQuery, testPage);

      expect(fetchSpy).toHaveBeenCalledWith(expectedEndpoint);
      expect(result.games).toEqual(mockValidApiResponse.results);
    });

    it('should throw an error if RawgClient throws an error', async () => {
      const networkError = new Error('HTTP error!');
      vi.spyOn(RawgClient, 'fetchData').mockRejectedValue(networkError);

      await expect(GameService.searchGames('')).rejects.toThrow();
    });
  });

  describe('getGameById', () => {
    it('should call RawgClient with correct endpoint and return game details', async () => {
      const testId = mockGameDetailsResponse.id;
      const expectedEndpoint = `/games/${testId}`;
      const fetchSpy = vi.spyOn(RawgClient, 'fetchData').mockResolvedValue(mockGameDetailsResponse);

      const result = await GameService.getGameById(testId);

      expect(fetchSpy).toHaveBeenCalledWith(expectedEndpoint);
      expect(result).toEqual(mockGameDetailsResponse);
    });

    it('should throw an error if RawgClient fails to fetch game details', async () => {
      const testId = mockGameDetailsResponse.id;
      const expectedError = new Error('Not found');
      vi.spyOn(RawgClient, 'fetchData').mockRejectedValue(expectedError);

      await expect(GameService.getGameById(testId)).rejects.toThrow(expectedError);
    });
  });
});
