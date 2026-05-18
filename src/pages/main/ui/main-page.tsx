import { type ReactNode } from 'react';

import { GamesDiscoveryWidget } from '@widgets/games-discovery';

import { ROUTE_PATHS } from '@/shared/constants/routes';
import { Link } from 'react-router-dom';
import styles from './main-page.module.scss';

export function MainPage(): ReactNode {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to={ROUTE_PATHS.ABOUT} className={styles.aboutLink}>
          About Project →
        </Link>
        <h1 className={styles.title}>Omni Search Dashboard</h1>
        <p className={styles.subtitle}>DIGITAL LIBRARY & GAME INSIGHTS</p>
      </header>

      <main className={styles.main}>
        <GamesDiscoveryWidget />
      </main>
    </div>
  );
}
