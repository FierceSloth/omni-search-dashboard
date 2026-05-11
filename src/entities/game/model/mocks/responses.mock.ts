import type { IGamesResponse } from '@/entities/game/model/responses';

export const mockValidApiResponse: IGamesResponse = {
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
