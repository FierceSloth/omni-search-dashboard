import { ROUTE_PATHS } from '@/shared/constants/routes';
import { Header } from '@/shared/ui/header';
import { GamesDiscoveryWidget } from '@widgets/games-discovery';
import type { ReactNode } from 'react';

import styles from './main-page.module.scss';

export function MainPage({
  searchParams,
  children,
}: {
  searchParams: { [key: string]: string | undefined };
  children?: ReactNode;
}): ReactNode {
  return (
    <div className={styles.page}>
      <Header
        className={styles.headerWrapper}
        title="Omni Search Dashboard"
        subtitle="DIGITAL LIBRARY & GAME INSIGHTS"
        linkTo={ROUTE_PATHS.ABOUT}
        linkText="About Project →"
      />

      <main className={styles.main}>
        <GamesDiscoveryWidget searchParams={searchParams}>{children}</GamesDiscoveryWidget>
      </main>
    </div>
  );
}
