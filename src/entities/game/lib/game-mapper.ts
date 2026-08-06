import { formatDate } from '@/shared/utils/format-date.util';
import type { IGameCardDTO, IGameCardEntity } from '../model/types';

export const gameMapper = {
  mapGameCard(dto: IGameCardDTO): IGameCardEntity {
    return {
      id: dto.id,
      title: dto.name,
      info: `${dto.rating} ★`,
      description: gameMapper.mapDescription(dto),
      imageUrl: dto.background_image,
      badge: gameMapper.mapGenre(dto.genres),
    };
  },

  mapGenre(dto: IGameCardDTO['genres']): IGameCardEntity['badge'] {
    return dto?.[0]?.name || 'Unknown';
  },

  mapDescription(dto: IGameCardDTO): IGameCardEntity['description'] {
    return `An exciting ${gameMapper.mapGenre(dto.genres)?.toLowerCase()} game released \n on ${formatDate(dto.released)}.`;
  },
};
