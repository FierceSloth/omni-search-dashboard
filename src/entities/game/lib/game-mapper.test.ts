import type { IGameCardDTO } from '@/entities/game/model/types';
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
    it('should format description string correctly', () => {
      const mockDTO = {
        released: '2013-09-17',
        genres: [{ name: 'Action' }],
      } as IGameCardDTO;

      const result = 'An exciting action game released \n on Sep 17, 2013.';

      expect(gameMapper.mapDescription(mockDTO)).toBe(result);
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
        description: 'An exciting action game released \n on Sep 17, 2013.',
        imageUrl: mockDTO.background_image,
        badge: mockDTO.genres[0].name,
      };

      expect(gameMapper.mapGameCard(mockDTO)).toEqual(mockResult);
    });
  });
});
