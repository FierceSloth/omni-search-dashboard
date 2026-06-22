import { ROUTE_PATHS } from '@/shared/constants/routes';
import { Header } from '@/shared/ui/header';
import { GamesDiscoveryWidget } from '@widgets/games-discovery';
import type { ReactNode } from 'react';

import styles from './main-page.module.scss';
import { useTranslations } from 'next-intl';

export function MainPage({
  searchParams,
  children,
}: {
  searchParams: { [key: string]: string | undefined };
  children?: ReactNode;
}): ReactNode {
  const t = useTranslations('MainPage');

  return (
    <div className={styles.page}>
      <Header
        className={styles.headerWrapper}
        title={t('title')}
        subtitle={t('subtitle')}
        linkTo={ROUTE_PATHS.ABOUT}
        linkText={t('aboutLink')}
      />

      <main className={styles.main}>
        <GamesDiscoveryWidget searchParams={searchParams}>{children}</GamesDiscoveryWidget>
      </main>
    </div>
  );
}
