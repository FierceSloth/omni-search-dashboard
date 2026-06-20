'use client';

import { ROUTE_PATHS } from '@/shared/constants/routes';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { type ReactNode } from 'react';

import { AsyncStateRenderer } from '@/shared/ui/async-state-renderer';
import { CardDetail } from '@/shared/ui/card-detail';

import { useGetGameByIdQuery } from '@/entities/game';

import styles from './games-details.module.scss';

export function GameDetailsWidget(): ReactNode {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const searchParams = useSearchParams();
  const navigate = useRouter();

  const { data, isFetching, isError } = useGetGameByIdQuery(Number(id));
  const details = data;

  const handleClose = (): void => {
    void navigate.push(`${ROUTE_PATHS.HOME}?${searchParams?.toString() || ''}`);
  };

  return (
    <div className={styles.container}>
      <AsyncStateRenderer
        isLoading={isFetching}
        error={isError ? 'Failed to fetch game details' : null}
        loadingText="Loading game details..."
      >
        {details && (
          <CardDetail
            title={details.title}
            subtitle={details.subtitle}
            description={details.description}
            imageUrl={details.imageUrl}
            metadata={details.metadata}
            tags={details.tags}
            actionUrl={details.website}
            onClose={handleClose}
          />
        )}
      </AsyncStateRenderer>
    </div>
  );
}
