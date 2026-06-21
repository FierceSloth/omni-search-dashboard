import { Link } from '@/shared/config/i18n/navigation';
import { buildDetailsPath } from '@/shared/constants/routes';
import { type ReactNode } from 'react';

import { AsyncStateRenderer } from '@/shared/ui/async-state-renderer';
import { CardPreview } from '@/shared/ui/card-preview';
import { Pagination } from '@/shared/ui/pagination';
import { SearchForm } from '@/shared/ui/search-form';
import { SelectedFlyout } from '@/widgets/selected-flyout';
import { ToggleSelectionCheckbox } from '@features/card-selection';

import type { IGamesResponse } from '@/entities/game/model/responses';
import { gameMapper } from '@entities/game/lib/game-mapper';

import styles from './games-discovery.module.scss';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY as string;
const PAGE_SIZE = 20;

interface IGamesEmptyStateProps {
  searchQuery: string;
}

interface IDiscoveryWidgetProps {
  searchParams?: { [key: string]: string | undefined };
  children?: ReactNode;
}

function GamesEmptyState({ searchQuery }: IGamesEmptyStateProps): ReactNode {
  return (
    <div className={styles.emptyState}>
      {searchQuery ? `No games found for "${searchQuery}".` : 'No games available.'}
    </div>
  );
}

export async function GamesDiscoveryWidget({ searchParams, children }: IDiscoveryWidgetProps): Promise<ReactNode> {
  const searchQuery = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(searchQuery)}&page=${currentPage}&page_size=${PAGE_SIZE}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  const data = (await response.json()) as IGamesResponse;
  const games = data.results.map((dto) => gameMapper.mapGameCard(dto)) || [];
  const totalPages = Math.ceil((data.count || 0) / 20);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <SearchForm className={styles.form} defaultValue={searchQuery} placeholder="Search for awesome games..." />
      </div>

      <div className={styles.sectionHeader}>
        <p className={styles.sectionTitle}>Library</p>
        <p className={styles.resultsCount}>Viewing {games.length} entities</p>
      </div>

      <AsyncStateRenderer isEmpty={games.length === 0} emptyNode={<GamesEmptyState searchQuery={searchQuery} />}>
        <div className={styles.splitLayout}>
          <div className={styles.listColumn}>
            <ul className={styles.gameList}>
              {games.map((game) => (
                <li key={game.id}>
                  <Link
                    className={styles.link}
                    href={`${buildDetailsPath(game.id)}&page=${currentPage}${searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : ''}`}
                    scroll={false}
                  >
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

        <Pagination currentPage={currentPage} totalPage={totalPages} />
        <SelectedFlyout />
      </AsyncStateRenderer>
    </div>
  );
}
