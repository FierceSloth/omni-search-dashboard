import { ROUTE_PATHS } from '@/shared/constants/routes';
import { type ReactNode } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { AsyncStateRenderer } from '@/shared/ui/async-state-renderer';
import { CardDetail } from '@/shared/ui/card-detail';

import { useGetGameByIdQuery } from '@/entities/game';

import styles from './games-details.module.scss';

export function GameDetailsWidget(): ReactNode {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data, isFetching, isError } = useGetGameByIdQuery(Number(id));
  const details = data;

  const handleClose = (): void => {
    void navigate(`${ROUTE_PATHS.HOME}?${searchParams.toString()}`);
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
