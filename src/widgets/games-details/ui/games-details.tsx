import { gameMapper, GameService } from '@/entities/game';
import type { IGameDetailsEntity } from '@/entities/game/model/types';
import { AsyncStateRenderer } from '@/shared/ui/async-state-renderer';
import { CardDetail } from '@/shared/ui/card-detail';
import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import styles from './games-details.module.scss';

export function GameDetailsWidget(): ReactNode {
  const [details, setDetails] = useState<IGameDetailsEntity | undefined>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const details = await GameService.getGameById(Number(id));
        const mappedDetails = gameMapper.mapGameDetails(details);

        setDetails(mappedDetails);
      } catch (error_) {
        setError(error_ instanceof Error ? error_.message : 'Something went wrong');
        setDetails(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchDetails();
  }, [id]);

  const handleClose = (): void => {
    void navigate(`/?${searchParams.toString()}`);
  };

  return (
    <div className={styles.container}>
      <AsyncStateRenderer isLoading={isLoading} error={error} loadingText="Loading game details...">
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
