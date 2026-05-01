import React, { Component, type ReactNode } from 'react';

import type { IGameCardEntity } from '@entities/game';
import { GameService } from '@entities/game';

import { GameCard } from '@entities/game/';
import { SearchInput } from '@shared/ui/search-input';

import styles from './search-panel.module.scss';

interface IState {
  searchQuery: string;
  games: IGameCardEntity[];
  isLoading: boolean;
  error: string | null;
}

export class SearchPanel extends Component<Record<string, never>, IState> {
  public state: IState = {
    searchQuery: '',
    games: [],
    isLoading: false,
    error: null,
  };

  public componentDidMount(): void {
    void this.fetchGames(' ');
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
    const value = event.target.value;
    this.setState({ searchQuery: value });

    void this.fetchGames(value);
  };

  private handleSearchSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  public render(): ReactNode {
    const { searchQuery, games, isLoading, error } = this.state;

    return (
      <div className={styles.panel}>
        <header className={styles.header}>
          <h1 className={styles.title}>Discovery</h1>

          <form className={styles.panelForm} onSubmit={this.handleSearchSubmit}>
            <SearchInput
              value={searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search for awesome games..."
            />
          </form>
        </header>

        <main className={styles.main}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Discover</div>
            <div className={styles.resultsCount}>Viewing {this.state.games.length} entities</div>
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
        </main>
      </div>
    );
  }
}
