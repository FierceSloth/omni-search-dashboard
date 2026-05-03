import React, { Component, type ReactNode } from 'react';

import { SearchForm } from '@/shared/ui/search-form';
import { GameCard, GameService, type IGameCardEntity } from '@entities/game';

import { debounce } from '@/shared/utils/debounce.util';
import styles from './games-discovery.module.scss';

interface IState {
  searchQuery: string;
  games: IGameCardEntity[];
  isLoading: boolean;
  error: string | null;
}

const debounceTimeout = 500;

export class GamesDiscoveryWidget extends Component<Record<string, never>, IState> {
  public state: IState = {
    searchQuery: '',
    games: [],
    isLoading: false,
    error: null,
  };

  private debouncedFetch = debounce<string, (query: string) => void>((query: string) => {
    void this.fetchGames(query);
  }, debounceTimeout);

  public componentDidMount(): void {
    void this.fetchGames();
  }

  public componentDidUpdate(_previousProps: Record<string, never>, previousState: IState): void {
    if (this.state.searchQuery === previousState.searchQuery) {
      return;
    }

    if (this.state.searchQuery !== previousState.searchQuery) {
      this.debouncedFetch(this.state.searchQuery);
    }
  }

  private fetchGames = async (query: string = ''): Promise<void> => {
    this.setState({ isLoading: true, error: null });

    try {
      const games = await GameService.searchGames(query);
      this.setState({ games });
    } catch (error) {
      this.setState({ error: error instanceof Error ? error.message : 'Something went wrong' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  private handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: event.target.value.trimStart() });
  };

  private handleSearchSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const trimmedQuery = this.state.searchQuery.trim();

    this.setState({ searchQuery: trimmedQuery });
    void this.fetchGames(trimmedQuery); // ? Bypassing the debounce
  };

  public render(): ReactNode {
    const { searchQuery, games, isLoading, error } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <SearchForm
            className={styles.form}
            onSubmit={this.handleSearchSubmit}
            onChange={this.handleSearchChange}
            placeholder="Search for awesome games..."
            value={searchQuery}
          />
        </div>

        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Library</div>
          <div className={styles.resultsCount}>Viewing {games.length} entities</div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {isLoading ? (
          <div className={styles.loader}>Loading games...</div>
        ) : (
          <ul className={styles.gameList}>
            {games.map((game) => (
              <li key={game.id}>
                <GameCard {...game} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
