import React, { Component, type ReactNode } from 'react';

import { GameCard, GameService, type IGameCardEntity } from '@entities/game';
import { SearchInput } from '@shared/ui/search-input';

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
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  public componentDidMount(): void {
    void this.fetchGames(' ');
  }

  public componentDidUpdate(_previousProps: Record<string, never>, previousState: IState): void {
    if (this.state.searchQuery === previousState.searchQuery) {
      return;
    }

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      void this.fetchGames(this.state.searchQuery);
    }, debounceTimeout);
  }

  public componentWillUnmount(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

  private fetchGames = async (query: string): Promise<void> => {
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
    this.setState({ searchQuery: event.target.value });
  };

  private handleSearchSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  public render(): ReactNode {
    const { searchQuery, games, isLoading, error } = this.state;

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSearchSubmit}>
          <SearchInput
            value={searchQuery}
            onChange={this.handleSearchChange}
            placeholder="Search for awesome games..."
          />
        </form>

        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Library</div>
          <div className={styles.resultsCount}>Viewing {games.length} entities</div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {isLoading ? (
          <div className={styles.loader}>Loading games...</div>
        ) : (
          <div className={styles.gameList}>
            {games.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        )}
      </div>
    );
  }
}
