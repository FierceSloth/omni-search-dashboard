import { Component, type ReactNode } from 'react';

import { GamesDiscoveryWidget } from '@widgets/games-discovery';

import styles from './main-page.module.scss';

export class MainPage extends Component {
  public render(): ReactNode {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Discovery</h1>
        </header>

        <main className={styles.main}>
          <GamesDiscoveryWidget />
        </main>
      </div>
    );
  }
}
