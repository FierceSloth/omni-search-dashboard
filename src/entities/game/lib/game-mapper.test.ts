import type { IGameCardDTO, IGameDetailsDTO } from '@/entities/game/model/types';
import { formatDate } from '@/shared/utils/format-date.util';
import { describe, expect, it } from 'vitest';
import { gameMapper } from './game-mapper';

describe('GameMapper', () => {
  describe('mapGenre', () => {
    it('should return the first genre name if genres array is valid', () => {
      const genreMock = [{ name: 'Action' }, { name: 'RPG' }];
      const genreResult = genreMock[0].name;

      expect(gameMapper.mapGenre(genreMock)).toBe(genreResult);
    });

    it('should return "Unknown" if genres array is empty', () => {
      expect(gameMapper.mapGenre([])).toBe('Unknown');
    });
  });

  describe('mapDescription', () => {
    it('should format description string correctly using dynamic data', () => {
      const mockDTO = {
        released: '2013-09-17',
        genres: [{ name: 'Action' }],
      } as IGameCardDTO;

      const expectedGenre = mockDTO.genres[0].name.toLowerCase();
      const expectedDate = formatDate(mockDTO.released);
      const expectedResult = `An exciting ${expectedGenre} game released \n on ${expectedDate}.`;

      expect(gameMapper.mapDescription(mockDTO)).toBe(expectedResult);
    });
  });

  describe('mapGameCard', () => {
    it('should map DTO to GameCardEntity correctly', () => {
      const mockDTO = {
        id: 3498,
        name: 'Grand Theft Auto V',
        background_image: 'https://media.rawg.io/media/games/example.jpg',
        released: '2013-09-17',
        rating: 4.47,
        genres: [{ name: 'Action' }, { name: 'Adventure' }],
      };

      const mockResult = {
        id: mockDTO.id,
        title: mockDTO.name,
        info: `${mockDTO.rating} ★`,
        description: gameMapper.mapDescription(mockDTO),
        imageUrl: mockDTO.background_image,
        badge: mockDTO.genres[0].name,
      };

      expect(gameMapper.mapGameCard(mockDTO)).toEqual(mockResult);
    });
  });

  describe('mapGameDetails', () => {
    it('should map DTO to GameDetailsEntity correctly with all fields present', () => {
      const mockDTO = {
        id: 3498,
        name: 'Grand Theft Auto V',
        description_raw: 'An open world game.',
        background_image: 'https://example.com/image.jpg',
        rating: 4.47,
        released: '2013-09-17',
        genres: [{ name: 'Action' }],
        developers: [{ name: 'Rockstar North' }],
        website: 'https://rockstargames.com/V/',
      };

      const mockResult = {
        id: mockDTO.id,
        title: mockDTO.name,
        imageUrl: mockDTO.background_image,
        description: mockDTO.description_raw,
        subtitle: `by ${mockDTO.developers[0].name}`,
        metadata: gameMapper.mapGameMetadata(mockDTO),
        tags: [mockDTO.genres[0].name],
        website: mockDTO.website,
      };

      expect(gameMapper.mapGameDetails(mockDTO)).toEqual(mockResult);
    });

    it('should handle missing developers without throwing errors', () => {
      const mockDTO = {
        id: 1,
        name: 'Indie Game',
        developers: [],
      } as unknown as IGameDetailsDTO;

      const result = gameMapper.mapGameDetails(mockDTO);

      expect(result.subtitle).toBeUndefined();
    });
  });

  describe('mapGameMetadata', () => {
    it('should return array with rating and date if both are provided', () => {
      const mockDTO = {
        rating: 4.5,
        released: '2013-09-17',
      } as IGameCardDTO;

      const expectedDate = formatDate(mockDTO.released);

      expect(gameMapper.mapGameMetadata(mockDTO)).toEqual([`${mockDTO.rating} ★`, expectedDate]);
    });

    it('should filter out empty values if rating or released is missing', () => {
      const mockDTONoRating = { released: '2013-09-17' } as IGameCardDTO;
      const mockDTONoDate = { rating: 4.5 } as IGameCardDTO;
      const mockEmpty = {} as IGameCardDTO;

      expect(gameMapper.mapGameMetadata(mockDTONoRating)).toEqual([formatDate(mockDTONoRating.released)]);
      expect(gameMapper.mapGameMetadata(mockDTONoDate)).toEqual([`${mockDTONoDate.rating} ★`]);
      expect(gameMapper.mapGameMetadata(mockEmpty)).toEqual([]);
    });
  });
});
