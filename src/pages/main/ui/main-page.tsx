import { type ReactNode } from 'react';

import { GamesDiscoveryWidget } from '@widgets/games-discovery';

import styles from './main-page.module.scss';

export function MainPage(): ReactNode {
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
