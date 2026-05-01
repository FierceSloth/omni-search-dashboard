import type { IGameCardDTO, IGameCardEntity } from '../model/types';

export const gameMapper = {
  mapGameCard(dto: IGameCardDTO): IGameCardEntity {
    return {
      id: dto.id,
      title: dto.name,
      rating: dto.rating,
      released: dto.released,
      imageUrl: dto.background_image,
      genre: gameMapper.mapGenre(dto.genres),
    };
  },

  mapGenre(dto: IGameCardDTO['genres']): IGameCardEntity['genre'] {
    return dto?.[0]?.name || 'Unkown';
  },
};
