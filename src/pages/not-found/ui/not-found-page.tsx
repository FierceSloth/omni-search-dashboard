import { Link } from '@/shared/config/i18n/navigation';
import { ROUTE_PATHS } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/button';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import RetryIcon from '@shared/assets/svg/retry-icon.svg?react';
import styles from './not-found-page.module.scss';

export function NotFoundPage(): ReactNode {
  const t = useTranslations('NotFoundPage');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subTitle}>{t('pageNotFound')}</h2>
      <p className={styles.description}>{t('description')}</p>
      <Link href={ROUTE_PATHS.HOME}>
        <Button type="button">
          <RetryIcon className={styles.buttonIcon} />
          {t('returnHome')}
        </Button>
      </Link>
    </div>
  );
}
