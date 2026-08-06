import { formatDate } from '@/shared/utils/format-date.util';
import type { IGameCardDTO, IGameCardEntity, IGameDetailsDTO, IGameDetailsEntity } from '../model/types';

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

  mapGameDetails(dto: IGameDetailsDTO): IGameDetailsEntity {
    return {
      id: dto.id,
      title: dto.name,
      imageUrl: dto.background_image,
      description: dto.description_raw,
      subtitle: dto.developers?.[0] ? `by ${dto.developers[0].name}` : undefined,
      metadata: gameMapper.mapGameMetadata(dto),
      tags: dto.genres?.map((genre) => genre.name) || [],
      website: dto.website,
    };
  },

  mapGameMetadata(dto: IGameCardDTO): string[] {
    const metaData = [dto.rating ? `${dto.rating} ★` : '', dto.released ? `${formatDate(dto.released)}` : ''];
    return metaData.filter(Boolean);
  },
};
