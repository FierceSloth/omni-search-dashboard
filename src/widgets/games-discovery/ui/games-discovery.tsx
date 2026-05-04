import { STORAGE_KEYS } from '@/shared/constants/local-storage';

import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { ErrorBoundary } from '@/shared/ui/error-boundary';
import { ErrorTrigger } from '@/shared/ui/error-trigger';
import { SearchForm } from '@/shared/ui/search-form';

import { GameService, type IGameCardEntity } from '@entities/game';

import { gameMapper } from '@/entities/game/lib/game-mapper';
import { ErrorMessage } from '@/shared/ui/error-message';
import React, { Component, type ReactNode } from 'react';
import styles from './games-discovery.module.scss';

interface IState {
  searchQuery: string;
  lastSearchedQuery: string;
  games: IGameCardEntity[];
  isLoading: boolean;
  error: string | null;
  hasFatalError: boolean;
}

export class GamesDiscoveryWidget extends Component<Record<string, never>, IState> {
  public state: IState = {
    searchQuery: localStorage.getItem(STORAGE_KEYS.SEARCH_QUERY) || '',
    lastSearchedQuery: localStorage.getItem(STORAGE_KEYS.SEARCH_QUERY) || '',
    games: [],
    isLoading: false,
    error: null,
    hasFatalError: false,
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
      const mappedGames = games.map((game) => gameMapper.mapGameCard(game));
      this.setState({ games: mappedGames });
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

        <ErrorBoundary>
          <ErrorTrigger shouldThrow={hasFatalError} />

          {error && (
            <ErrorMessage
              title="Connection Lost"
              description={error}
              onRetry={() => void this.fetchGames(this.state.lastSearchedQuery)}
            />
          )}

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
        </ErrorBoundary>
      </div>
    );
  }
}
