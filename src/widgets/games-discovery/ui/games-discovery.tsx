import { STORAGE_KEYS } from '@/shared/constants/local-storage';
import { useEffect, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { ErrorMessage } from '@/shared/ui/error-message';
import { ErrorTrigger } from '@/shared/ui/error-trigger';
import { Loader } from '@/shared/ui/loader/loader';
import { Pagination } from '@/shared/ui/pagination/pagination';
import { SearchForm } from '@/shared/ui/search-form';

import { gameMapper } from '@/entities/game';
import { useLocalStorage } from '@/shared/lib/hooks/use-local-storage';
import { GameService, type IGameCardEntity } from '@entities/game';

import styles from './games-discovery.module.scss';

export function GamesDiscoveryWidget(): ReactNode {
  const [games, setGames] = useState<IGameCardEntity[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasFatalError, setHasFatalError] = useState(false);

  const [savedQuery, setSavedQuery] = useLocalStorage(STORAGE_KEYS.SEARCH_QUERY, '');

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGames = async (): Promise<void> => {
      const currentQuery = savedQuery.trim();

      setIsLoading(true);
      setError(null);

      try {
        const { games, totalPages } = await GameService.searchGames(currentQuery, currentPage);
        const mappedGames = games.map((game) => gameMapper.mapGameCard(game));

        setGames(mappedGames);
        setTotalPages(totalPages);
      } catch (error_) {
        setError(error_ instanceof Error ? error_.message : 'Something went wrong');
        setGames([]);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchGames();
  }, [savedQuery, currentPage]);

  const handleSearchSubmit = (query: string): void => {
    if (savedQuery === query) {
      return;
    }

    setSavedQuery(query);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (page: number): void => {
    setSearchParams({ page: String(page) });
  };

  const triggerError = (): void => {
    setHasFatalError(true);
  };

  const renderContent = (): ReactNode => {
    if (isLoading) {
      return <Loader dataTestId="loader" text=" Loading games..." />;
    }

    if (error) {
      return <ErrorMessage title="Connection Lost" description={error} />;
    }

    if (games.length === 0) {
      return <div className={styles.emptyState}>No games found for {`"${savedQuery}"`}.</div>;
    }

    return (
      <>
        <ul className={styles.gameList}>
          {games.map((game) => (
            <li key={game.id}>
              <Card {...game} />
            </li>
          ))}
        </ul>

        <Pagination currentPage={currentPage} totalPage={totalPages} onPageChange={handlePageChange} />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <Button className={styles.errorButton} type="button" onClick={triggerError}>
        Throw Test Error
      </Button>
      <div className={styles.formWrapper}>
        <SearchForm
          className={styles.form}
          onSearch={handleSearchSubmit}
          defaultValue={savedQuery}
          placeholder="Search for awesome games..."
        />
      </div>

      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>Library</div>
        <div className={styles.resultsCount}>Viewing {games.length} entities</div>
      </div>

      <ErrorTrigger shouldThrow={hasFatalError} />

      {renderContent()}
    </div>
  );
}
