import { STORAGE_KEYS } from '@/shared/constants/local-storage';
import { useEffect, useState, type ReactNode } from 'react';
import { Link, Outlet, useSearchParams } from 'react-router-dom';

import { AsyncStateRenderer } from '@/shared/ui/async-state-renderer';
import { Button } from '@/shared/ui/button';
import { CardList } from '@/shared/ui/card-list';
import { ErrorTrigger } from '@/shared/ui/error-trigger';
import { Pagination } from '@/shared/ui/pagination';
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
    const emptyNode = <div className={styles.emptyState}>No games found for {`"${savedQuery}"`}.</div>;
    const successNode = (
      <div className={styles.splitLayout}>
        <div className={styles.listColumn}>
          <ul className={styles.gameList}>
            {games.map((game) => (
              <li key={game.id}>
                <Link to={`/details/${game.id}?page=${currentPage}`}>
                  <CardList {...game} />
                </Link>
              </li>
            ))}
          </ul>

          <Pagination currentPage={currentPage} totalPage={totalPages} onPageChange={handlePageChange} />
        </div>

        <div className={styles.detailsColumn}>
          <Outlet />
        </div>
      </div>
    );

    return (
      <AsyncStateRenderer
        isLoading={isLoading}
        error={error}
        loadingText="Loading games..."
        isEmpty={games.length === 0}
        emptyNode={emptyNode}
      >
        {successNode}
      </AsyncStateRenderer>
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
        <p className={styles.sectionTitle}>Library</p>
        <p className={styles.resultsCount}>Viewing {games.length} entities</p>
      </div>

      <ErrorTrigger shouldThrow={hasFatalError} />

      {renderContent()}
    </div>
  );
}
