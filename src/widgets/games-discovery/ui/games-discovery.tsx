import { STORAGE_KEYS } from '@/shared/constants/local-storage';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { type ReactNode } from 'react';

import { AsyncStateRenderer } from '@/shared/ui/async-state-renderer';
import { CardPreview } from '@/shared/ui/card-preview';
import { Pagination } from '@/shared/ui/pagination';
import { SearchForm } from '@/shared/ui/search-form';
import { SelectedFlyout } from '@/widgets/selected-flyout';
import { ToggleSelectionCheckbox } from '@features/card-selection';

import { buildDetailsPath, ROUTE_PATHS } from '@/shared/constants/routes';
import { useLocalStorage } from '@/shared/lib/hooks/use-local-storage';

import { useGetGamesQuery } from '@/entities/game';

import styles from './games-discovery.module.scss';

interface IGamesEmptyStateProps {
  searchQuery: string;
}

interface IDiscoveryWidgetProps {
  children?: ReactNode;
}

function GamesEmptyState({ searchQuery }: IGamesEmptyStateProps): ReactNode {
  return (
    <div className={styles.emptyState}>
      {searchQuery ? `No games found for "${searchQuery}".` : 'No games available.'}
    </div>
  );
}

export function GamesDiscoveryWidget({ children }: IDiscoveryWidgetProps): ReactNode {
  const [savedQuery, setSavedQuery] = useLocalStorage(STORAGE_KEYS.SEARCH_QUERY, '');

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get('page')) || 1;
  const navigate = useRouter();

  const { data, isFetching, isError } = useGetGamesQuery({ query: savedQuery.trim(), page: currentPage });
  const { games = [], totalPages = 0 } = data || {};

  const handleSearchSubmit = (query: string): void => {
    if (savedQuery === query) {
      return;
    }

    setSavedQuery(query);
    void navigate.push(`${ROUTE_PATHS.HOME}?page=1`);
  };

  const handlePageChange = (page: number): void => {
    void navigate.push(`${ROUTE_PATHS.HOME}?page=${page}`);
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
        isLoading={isFetching}
        error={isError ? 'Failed to fetch games' : null}
        loadingText="Loading games..."
        isEmpty={games.length === 0}
        emptyNode={<GamesEmptyState searchQuery={savedQuery} />}
      >
        <div className={styles.splitLayout}>
          <div className={styles.listColumn}>
            <ul className={styles.gameList}>
              {games.map((game) => (
                <li key={game.id}>
                  <Link className={styles.link} href={`${buildDetailsPath(game.id)}?page=${currentPage}`}>
                    <CardPreview
                      {...game}
                      actionSlot={<ToggleSelectionCheckbox card={game} className={styles.checkbox} />}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.detailsColumn}>{children}</div>
        </div>

        <Pagination currentPage={currentPage} totalPage={totalPages} onPageChange={handlePageChange} />

        <SelectedFlyout />
      </AsyncStateRenderer>
    </div>
  );
}
