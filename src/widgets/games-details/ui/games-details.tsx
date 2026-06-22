import { type ReactNode } from 'react';

import { CardDetail } from '@/shared/ui/card-detail';

import { gameMapper } from '@/entities/game';
import type { IGameDetailsDTO } from '@/entities/game/model/types';

import styles from './games-details.module.scss';

interface IProps {
  searchParams: { [key: string]: string | undefined };
}

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY as string;

export async function GameDetailsWidget({ searchParams }: IProps): Promise<ReactNode> {
  const gameId = Number(searchParams?.details);
  const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  const data = (await response.json()) as IGameDetailsDTO;
  const details = gameMapper.mapGameDetails(data);

  const closeHref = `?page=${searchParams.page || '1'}${searchParams.query ? `&query=${searchParams.query}` : ''}`;

  return (
    <div className={styles.container}>
      {details && (
        <CardDetail
          title={details.title}
          subtitle={details.subtitle}
          description={details.description}
          imageUrl={details.imageUrl}
          metadata={details.metadata}
          tags={details.tags}
          actionUrl={details.website}
          closeHref={closeHref}
        />
      )}
    </div>
  );
}
