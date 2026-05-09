import type { IGameCardDTO } from '@/entities/game/model/types';
import { describe, expect, it } from 'vitest';
import { gameMapper } from './game-mapper';

describe('GameMapper', () => {
  describe('mapGenre', () => {
    it('should return the first genre name if genres array is valid', () => {
      const genreMock = [{ name: 'Action' }, { name: 'RPG' }];
      expect(gameMapper.mapGenre(genreMock)).toBe('Action');
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

      expect(gameMapper.mapDescription(mockDTO)).toBe('An exciting action game released \n on Sep 17, 2013.');
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
        id: 3498,
        title: 'Grand Theft Auto V',
        imageUrl: 'https://media.rawg.io/media/games/example.jpg',
        description: 'An exciting action game released \n on Sep 17, 2013.',
        info: '4.47 ★',
        badge: 'Action',
      };

      expect(gameMapper.mapGameCard(mockDTO)).toEqual(mockResult);
    });
  });
});
