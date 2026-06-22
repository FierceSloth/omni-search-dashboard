'use client';

import classNames from 'classnames';
import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { IconButton } from '@/shared/ui/icon-button';

import RefreshIcon from '@shared/assets/svg/refresh-icon.svg?react';
import styles from './refresh-button.module.scss';

interface IProps {
  className?: string;
}

export function RefreshButton({ className }: IProps): ReactNode {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRefresh = (): void => {
    if (isAnimating) return;

    setIsAnimating(true);
    router.refresh();
  };

  return (
    <IconButton
      className={classNames(styles.refreshButton, className, {
        [styles.isRefreshing]: isAnimating,
      })}
      onClick={handleRefresh}
      onAnimationEnd={() => setIsAnimating(false)}
      aria-label="Refresh data"
      icon={RefreshIcon}
      iconContainerClassName={styles.iconContainer}
    />
  );
}
