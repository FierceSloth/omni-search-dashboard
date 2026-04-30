import { GameCard } from '@/components/ui/game-card';
import { SearchInput } from '@/components/ui/search-input/search-input';
import React, { Component, type ReactNode } from 'react';
import type { IGameCardEntity } from './common/types/types';

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

  private handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: event.target.value });
  };

  private handleSearchSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  public render(): ReactNode {
    const { searchQuery, games } = this.state;

    return (
      <div className={styles.panel}>
        <form className={styles.panelForm} onSubmit={this.handleSearchSubmit}>
          <SearchInput
            value={searchQuery}
            onChange={this.handleSearchChange}
            placeholder="Search for awesome games..."
          />
        </form>

        <div className={styles.gameList}>
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              imageUrl={game.imageUrl}
              released={game.released}
              genre={game.genre}
            />
          ))}
        </div>
      </div>
    );
  }
}
