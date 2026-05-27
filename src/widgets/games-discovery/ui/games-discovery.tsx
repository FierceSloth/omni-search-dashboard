import { STORAGE_KEYS } from '@/shared/constants/local-storage';
import { type ReactNode } from 'react';
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import { AsyncStateRenderer } from '@/shared/ui/async-state-renderer';
import { CardPreview } from '@/shared/ui/card-preview';
import { Pagination } from '@/shared/ui/pagination';
import { SearchForm } from '@/shared/ui/search-form';
import { SelectedFlyout } from '@/widgets/selected-flyout';
import { ToggleSelectionCheckbox } from '@features/card-selection';

import { buildDetailsPath, ROUTE_PATHS } from '@/shared/constants/routes';
import { useLocalStorage } from '@/shared/lib/hooks/use-local-storage';

import { gameMapper, type IGameCardEntity } from '@/entities/game';
import { useGetGamesQuery } from '@/entities/game';

import styles from './games-discovery.module.scss';

export function GamesDiscoveryWidget(): ReactNode {
  const [savedQuery, setSavedQuery] = useLocalStorage(STORAGE_KEYS.SEARCH_QUERY, '');

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const navigate = useNavigate();

  const { data, isLoading, isFetching, error } = useGetGamesQuery({ query: savedQuery.trim(), page: currentPage });
  const games: IGameCardEntity[] = data?.games.map((game) => gameMapper.mapGameCard(game)) || [];
  const totalPages = data?.totalPages || 0;

  const handleSearchSubmit = (query: string): void => {
    if (savedQuery === query) {
      return;
    }

    setSavedQuery(query);
    void navigate(`${ROUTE_PATHS.HOME}?page=1`);
  };

  const handlePageChange = (page: number): void => {
    void navigate(`${ROUTE_PATHS.HOME}?page=${page}`);
  };

  return (
    <div className={styles.container}>
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

      <AsyncStateRenderer
        isLoading={isLoading || isFetching}
        error={error ? 'Failed to fetch games' : null}
        loadingText="Loading games..."
        isEmpty={games.length === 0}
        emptyNode={<div className={styles.emptyState}>No games found for {`"${savedQuery}"`}.</div>}
      >
        <>
          <div className={styles.splitLayout}>
            <div className={styles.listColumn}>
              <ul className={styles.gameList}>
                {games.map((game) => (
                  <li key={game.id}>
                    <Link className={styles.link} to={`${buildDetailsPath(game.id)}?page=${currentPage}`}>
                      <CardPreview
                        {...game}
                        actionSlot={<ToggleSelectionCheckbox card={game} className={styles.checkbox} />}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.detailsColumn}>
              <Outlet />
            </div>
          </div>

          <Pagination currentPage={currentPage} totalPage={totalPages} onPageChange={handlePageChange} />

          <SelectedFlyout />
        </>
      </AsyncStateRenderer>
    </div>
  );
}
