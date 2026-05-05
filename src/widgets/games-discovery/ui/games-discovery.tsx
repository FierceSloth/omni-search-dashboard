import { STORAGE_KEYS } from '@/shared/constants/local-storage';

import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { ErrorTrigger } from '@/shared/ui/error-trigger';
import { SearchForm } from '@/shared/ui/search-form';

import { GameService, type IGameCardEntity } from '@entities/game';

import { gameMapper } from '@/entities/game/lib/game-mapper';
import { ErrorMessage } from '@/shared/ui/error-message';
import React, { Component, type ReactNode } from 'react';
import styles from './games-discovery.module.scss';

interface IState {
  searchQuery: string;
  games: IGameCardEntity[];
  isLoading: boolean;
  error: string | null;
  hasFatalError: boolean;
}

export class GamesDiscoveryWidget extends Component<Record<string, never>, IState> {
  public state: IState = {
    searchQuery: localStorage.getItem(STORAGE_KEYS.SEARCH_QUERY) || '',
    games: [],
    isLoading: false,
    error: null,
    hasFatalError: false,
  };

  public componentDidMount(): void {
    void this.fetchGames();
  }

  private fetchGames = async (): Promise<void> => {
    const query = this.state.searchQuery.trim();

    this.setState({
      isLoading: true,
      error: null,
    });

    try {
      const games = await GameService.searchGames(query);
      const mappedGames = games.map((game) => gameMapper.mapGameCard(game));
      this.setState({ games: mappedGames });

      localStorage.setItem(STORAGE_KEYS.SEARCH_QUERY, query);
    } catch (error) {
      this.setState({ error: error instanceof Error ? error.message : 'Something went wrong', games: [] });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  private handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: event.target.value });
  };

  private handleSearchSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const query = this.state.searchQuery.trim();
    if (localStorage.getItem(STORAGE_KEYS.SEARCH_QUERY) === query) {
      return;
    }

    void this.fetchGames();
  };

  private triggerError = (): void => {
    this.setState({ hasFatalError: true });
  };

  public render(): ReactNode {
    const { searchQuery, games, isLoading, error, hasFatalError } = this.state;

    return (
      <div className={styles.container}>
        <Button className={styles.errorButton} type="button" onClick={this.triggerError}>
          Throw Test Error
        </Button>
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

        <ErrorTrigger shouldThrow={hasFatalError} />

        {error && <ErrorMessage title="Connection Lost" description={error} />}

        {isLoading ? (
          <div className={styles.loader}>Loading games...</div>
        ) : (
          <ul className={styles.gameList}>
            {games.map((game) => (
              <li key={game.id}>
                <Card {...game} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
