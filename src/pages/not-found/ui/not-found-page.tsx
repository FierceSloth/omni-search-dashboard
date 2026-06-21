import { ROUTE_PATHS } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/button';
import type { ReactNode } from 'react';
import { Link } from '@/shared/config/i18n/navigation';

import RetryIcon from '@shared/assets/svg/retry-icon.svg?react';
import styles from './not-found-page.module.scss';

export function NotFoundPage(): ReactNode {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subTitle}>Page Not Found</h2>
      <p className={styles.description}>
        The path you sought has dissolved into the ether. Return to the collective or search for a new destination.
      </p>
      <Link href={ROUTE_PATHS.HOME}>
        <Button type="button">
          <RetryIcon className={styles.buttonIcon} />
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
