import React, { Component, type ReactNode } from 'react';

import { SearchForm } from '@/shared/ui/search-form';
import { GameCard, GameService, type IGameCardEntity } from '@entities/game';

import { STORAGE_KEYS } from '@/shared/constants/local-storage';
import styles from './games-discovery.module.scss';

interface IState {
  searchQuery: string;
  lastSearchedQuery: string;
  games: IGameCardEntity[];
  isLoading: boolean;
  error: string | null;
}

export class GamesDiscoveryWidget extends Component<Record<string, never>, IState> {
  public state: IState = {
    searchQuery: localStorage.getItem(STORAGE_KEYS.SEARCH_QUERY) || '',
    lastSearchedQuery: localStorage.getItem(STORAGE_KEYS.SEARCH_QUERY) || '',
    games: [],
    isLoading: false,
    error: null,
  };

  public componentDidMount(): void {
    void this.fetchGames(this.state.searchQuery);
  }

  private fetchGames = async (query: string = ''): Promise<void> => {
    const trimmedQuery = query.trim();

    this.setState({
      isLoading: true,
      error: null,
      lastSearchedQuery: trimmedQuery,
    });

    try {
      const games = await GameService.searchGames(trimmedQuery);
      this.setState({ games });
    } catch (error) {
      this.setState({ error: error instanceof Error ? error.message : 'Something went wrong' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  private handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: event.target.value });
  };

  private handleSearchSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const trimmedQuery = this.state.searchQuery.trim();
    if (this.state.lastSearchedQuery === trimmedQuery) {
      return;
    }

    localStorage.setItem(STORAGE_KEYS.SEARCH_QUERY, trimmedQuery);
    void this.fetchGames(trimmedQuery);
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
